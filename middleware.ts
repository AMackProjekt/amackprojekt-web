import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get user location from headers (Azure Static Web Apps provides these)
  const country = request.headers.get("x-ms-client-principal-country") || 
                  request.headers.get("x-vercel-ip-country") || "US";
  const city = request.headers.get("x-ms-client-principal-city") || 
               request.headers.get("x-vercel-ip-city") || "Unknown";
  const region = request.headers.get("x-ms-client-principal-region") || 
                 request.headers.get("x-vercel-ip-country-region") || "Unknown";

  // Set cookies for personalization
  response.cookies.set("user-country", country, { path: "/" });
  response.cookies.set("user-city", city, { path: "/" });
  response.cookies.set("user-region", region, { path: "/" });

  // Add custom headers for the app to access
  response.headers.set("x-user-country", country);
  response.headers.set("x-user-city", city);
  response.headers.set("x-user-region", region);

  // Track returning visitors
  const hasVisited = request.cookies.get("has-visited");
  if (!hasVisited) {
    response.cookies.set("has-visited", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    response.cookies.set("first-visit", new Date().toISOString(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  // Set last visit timestamp
  response.cookies.set("last-visit", new Date().toISOString(), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|logos|videos).*)",
  ],
};
