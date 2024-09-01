import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { MiddlewareFactory } from './middleware-factory';

export const auth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    /* Troque a session pelo auth desejado */
    const session = false;
    const protectedRoutes = ['/private'];
    const authRoutes = ['/entrar', '/cadastrar', '/'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

    if (!session && isProtectedRoute) {
      const absoluteURL = new URL('/nao-autorizado', request.nextUrl.origin);
      return NextResponse.rewrite(absoluteURL.toString());
    }
    if (session && isAuthRoute) {
      const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    return next(request, _next);
  };
};
