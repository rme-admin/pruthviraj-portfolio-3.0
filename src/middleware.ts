import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function will be called for every request that matches the matcher
export function middleware(request: NextRequest) {
  // 1. Get the authentication token from the user's cookies
  const authToken = request.cookies.get('authToken')?.value;

  // 2. Get the path the user is trying to access
  const { pathname } = request.nextUrl;

  // 3. Define the login page URL
  const loginUrl = new URL('/auth/login', request.url);

  // --- Main Logic ---

  // If the user does NOT have a token and is trying to access any admin page...
  if (!authToken && pathname.startsWith('/admin')) {
    // ...redirect them to the login page immediately.
    return NextResponse.redirect(loginUrl);
  }

  // If the user HAS a token and is trying to access the login page...
  if (authToken && pathname.startsWith('/auth/login')) {
    // ...redirect them to a default admin page (e.g., my-info)
    // This prevents logged-in users from seeing the login screen again.
    return NextResponse.redirect(new URL('/admin/my-info', request.url));
  }

  // If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

// 4. The Matcher: Specify which routes this middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};