import { HttpRequest, HttpResponseInit } from '@azure/functions';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Simple in-memory rate limiter (consider Redis for production)
export function checkRateLimit(request: HttpRequest, maxRequests: number = 10, windowMs: number = 60000): HttpResponseInit | null {
  const clientId = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  
  let entry = rateLimitStore.get(clientId);
  
  if (!entry || now > entry.resetTime) {
    entry = { count: 0, resetTime: now + windowMs };
    rateLimitStore.set(clientId, entry);
  }
  
  entry.count++;
  
  if (entry.count > maxRequests) {
    return {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(entry.resetTime).toISOString()
      },
      jsonBody: { error: 'Too many requests. Please try again later.' }
    };
  }
  
  return null;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 300000);
