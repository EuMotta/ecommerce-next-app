import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { env } from '@/lib/env';

import { MiddlewareFactory } from './middleware-factory';

export const auth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const token = await getToken({
      req: request,
      secret: env.NEXTAUTH_SECRET,
    });
    const session = token;
    const protectedRoutes = ['/cart'];
    const authRoutes = ['/entrar', '/cadastrar'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

    if (!session && isProtectedRoute) {
      const absoluteURL = new URL('/entrar', request.nextUrl.origin);
      return NextResponse.rewrite(absoluteURL.toString());
    }
    if (session && isAuthRoute) {
      const absoluteURL = new URL('/product', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    return next(request, _next);
  };
};
