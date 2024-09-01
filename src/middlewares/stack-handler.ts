import { NextMiddleware, NextResponse } from 'next/server';

import { MiddlewareFactory } from './middleware-factory';
/* Função para juntar os middlewares */
export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
