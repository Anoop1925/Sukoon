import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy middleware for adding cache headers to responses
 * Implements caching strategies for different types of content
 * Note: Renamed from middleware.ts to proxy.ts per Next.js convention
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Cache API routes with shorter duration
  if (pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=120'
    );
  }

  // Cache therapy pages with revalidation
  if (pathname.startsWith('/therapies/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // Cache home page with shorter duration
  if (pathname === '/') {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=3600'
    );
  }

  // Cache other pages
  if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
