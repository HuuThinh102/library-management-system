import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Middleware token:', token);

  if (token && token.accessToken && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token || !token.accessToken && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};