import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { subscribeToMailchimp, sendWelcomeEmail } from '../../utils/mailchimp.js';

// Simple rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function waitlistSubscribe(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const allowed = checkRateLimit(clientIp, 5, 3600000); // 5 requests per hour

    if (!allowed) {
      return {
        status: 429,
        jsonBody: {
          success: false,
          message: 'Too many requests. Please try again later.'
        }
      };
    }

    const body = await request.json() as { email?: string; firstName?: string; lastName?: string; source?: string };
    const { email, firstName, lastName, source } = body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Valid email address is required'
        }
      };
    }

    // Subscribe to Mailchimp
    const subscribeResult = await subscribeToMailchimp({
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      tags: ['waitlist-2026', source || 'direct']
    });

    if (!subscribeResult.success) {
      return {
        status: 400,
        jsonBody: subscribeResult
      };
    }

    // Send welcome email
    await sendWelcomeEmail(email, firstName);

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: `Welcome! Check your email for the Innovation Roadmap PDF.`,
        email
      }
    };
  } catch (error) {
    context.error('Waitlist subscription error:', error);

    return {
      status: 500,
      jsonBody: {
        success: false,
        message: 'An error occurred while processing your request'
      }
    };
  }
}

app.http('waitlistSubscribe', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'waitlist/subscribe',
  handler: waitlistSubscribe
});
