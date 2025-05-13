import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { withoutSuffix } from '@/utils/string';

const HOME_PAGE_URL = process.env.NEXT_HOME_PAGE ?? '/home';

export default withAuth(
  function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isUserLoggedIn = request.cookies.get('is-user-logged')?.value;

    const guestRoutes = ['login', 'register', 'forgot-password', 'send-email-success'];
    const sharedRoutes = ['shared-route'];

    const isGuestRoute = guestRoutes.some(route => pathname.includes(route));
    const isSharedRoute = sharedRoutes.some(route => pathname.includes(route));
    const isRoot = pathname === '/' || pathname === '';

    // Nếu chưa đăng nhập và không phải guest/shared, redirect về login
    if (!isUserLoggedIn && !isGuestRoute && !isSharedRoute) {
      let redirectUrl = '/login';
      if (!isRoot) {
        redirectUrl += `?${new URLSearchParams({
          redirectTo: withoutSuffix(pathname, '/'),
        })}`;
      }
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Nếu đã đăng nhập mà vào guest route hoặc root thì về trang chính
    if (isUserLoggedIn && (isGuestRoute || isRoot)) {
      return NextResponse.redirect(new URL(HOME_PAGE_URL, request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Luôn chạy middleware, kiểm tra login bên trong
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|json|txt|woff|woff2|eot|ttf|otf)$).*)',
  ],
};
