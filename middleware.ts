import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decode } from 'next-auth/jwt';

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
  console.log(cookie);
  const sessionToken = cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('next-auth.session-token'))
    ?.split('=')[1];

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXT_AUTH_SECRET || '',
  });
  console.log(decoded);
  response.headers.set(
    'Cookie',
    `username=hello` + (cookie ? `; ${cookie}` : '')
  );
  return response;
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => token?.role === 'admin',
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
// This function can be marked `async` if using `await` inside

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
