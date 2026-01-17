import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer } from '../../utils/cosmos';
import { hashPassword, generateToken } from '../../utils/auth';
import { config } from '../../config';
import { signupSchema, validateRequest } from '../../utils/validation';
import { checkRateLimit } from '../../utils/rateLimit';

export async function authSignup(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    // Rate limiting: 3 signups per hour per IP
    const rateLimitResponse = checkRateLimit(request, 3, 3600000);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    
    // Validate input
    const validation = validateRequest(signupSchema, body);
    if (!validation.success) {
      return {
        status: 400,
        jsonBody: { error: 'Validation failed', details: validation.errors }
      };
    }

    const { email, password, name } = validation.data;

    const container = await getContainer(config.cosmosDb.containers.users);
    
    // Check if user exists
    const { resources: existingUsers } = await container.items
      .query({
        query: 'SELECT * FROM c WHERE c.email = @email',
        parameters: [{ name: '@email', value: email }]
      })
      .fetchAll();

    if (existingUsers.length > 0) {
      return {
        status: 409,
        jsonBody: { error: 'User already exists' }
      };
    }

    // Create new user
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await container.items.create(newUser);

    // Generate JWT token
    const token = generateToken({ id: userId, email, name });

    return {
      status: 201,
      jsonBody: {
        user: { id: userId, email, name },
        token
      }
    };
  } catch (error) {
    context.error('Signup error:', error);
    // Don't leak internal error details
    return {
      status: 500,
      jsonBody: { error: 'An error occurred during signup. Please try again.' }
    };
  }
}

app.http('auth-signup', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'auth/signup',
  handler: authSignup
});
