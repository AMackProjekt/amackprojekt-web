import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer } from '../../utils/cosmos';
import { comparePassword, generateToken } from '../../utils/auth';
import { config } from '../../config';
import { loginSchema, validateRequest } from '../../utils/validation';
import { checkRateLimit } from '../../utils/rateLimit';

export async function authLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    // Rate limiting: 5 attempts per minute
    const rateLimitResponse = checkRateLimit(request, 5, 60000);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    
    // Validate input
    const validation = validateRequest(loginSchema, body);
    if (!validation.success) {
      return {
        status: 400,
        jsonBody: { error: 'Validation failed', details: validation.errors }
      };
    }

    const { email, password } = validation.data;

    const container = await getContainer(config.cosmosDb.containers.users);
    
    // Find user
    const { resources: users } = await container.items
      .query({
        query: 'SELECT * FROM c WHERE c.email = @email',
        parameters: [{ name: '@email', value: email }]
      })
      .fetchAll();

    if (users.length === 0) {
      return {
        status: 401,
        jsonBody: { error: 'Invalid credentials' }
      };
    }

    const user = users[0];

    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return {
        status: 401,
        jsonBody: { error: 'Invalid credentials' }
      };
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email, name: user.name });

    return {
      status: 200,
      jsonBody: {
        user: { id: user.id, email: user.email, name: user.name },
        token
      }
    };
  } catch (error) {
    context.error('Login error:', error);
    // Don't leak internal error details
    return {
      status: 500,
      jsonBody: { error: 'An error occurred during login. Please try again.' }
    };
  }
}

app.http('auth-login', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'auth/login',
  handler: authLogin
});
