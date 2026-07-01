import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard and all sub-routes
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token || !isValidSessionToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
