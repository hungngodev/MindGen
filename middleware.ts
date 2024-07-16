import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/lib/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('auth')) {
    return NextResponse.next();
  }
  const { nextUrl, headers } = request;
  const url = nextUrl.clone();

  if (process.env.NODE_ENV === 'development') {
    if (url.pathname.startsWith('/api')) {
      url.hostname = '127.0.0.1';
      url.protocol = 'http:';
      url.port = '5328';
    }
  }
  const response = NextResponse.rewrite(url);
  const cookie = headers.get('cookie');
  const session = await getServerSession(authConfig);
  console.log('session', session);
  response.headers.set(
    'Cookie',
    `username=hello` + (cookie ? `; ${cookie}` : '')
  );
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
