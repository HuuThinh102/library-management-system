import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;
    console.log(accessToken,'oooooooooooooooooooooooooo');
    
    const { pathname } = req.nextUrl;

    if (accessToken && (pathname === '/' || pathname === '/login')) {
      return NextResponse.redirect(new URL('/librarians', req.url));
    }

    if (!accessToken && pathname.startsWith('/librarians')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};