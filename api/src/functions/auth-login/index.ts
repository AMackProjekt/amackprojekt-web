import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer } from '../../utils/cosmos';
import { comparePassword, generateToken } from '../../utils/auth';
import { config } from '../../config';

interface LoginRequest {
  email: string;
  password: string;
}

export async function authLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as LoginRequest;
    const { email, password } = body;

    if (!email || !password) {
      return {
        status: 400,
        jsonBody: { error: 'Email and password are required' }
      };
    }

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
    return {
      status: 500,
      jsonBody: { error: 'Internal server error' }
    };
  }
}

app.http('auth-login', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'auth/login',
  handler: authLogin
});
