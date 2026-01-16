import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer } from '../../utils/cosmos';
import { hashPassword, generateToken } from '../../utils/auth';
import { config } from '../../config';

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export async function authSignup(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as SignupRequest;
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return {
        status: 400,
        jsonBody: { error: 'Email, password, and name are required' }
      };
    }

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
    return {
      status: 500,
      jsonBody: { error: 'Internal server error' }
    };
  }
}

app.http('auth-signup', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'auth/signup',
  handler: authSignup
});
