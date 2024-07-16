import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('auth')) {
    return NextResponse.next();
  }
  console.log('passing middleware');
  const { nextUrl: url, headers } = request;
  console.log('my URL', url.pathname);
  console.log('My Cookies', headers.get('cookie'));
  if (process.env.NODE_ENV === 'development') {
    if (url.pathname.startsWith('/api')) {
      url.hostname = '127.0.0.1';
      url.port = '5328';
    }
  }

  return NextResponse.rewrite(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
