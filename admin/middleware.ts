import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  // Nếu đã login mà vào / hoặc /login => redirect tới /librarians
  if (accessToken && (pathname === '/' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/librarians', req.url));
  }

  // Nếu chưa login mà vào /librarians => redirect tới /login
  if (!accessToken && pathname.startsWith('/librarians')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/librarians/:path*'],
};
