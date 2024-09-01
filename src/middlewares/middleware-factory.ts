import { NextMiddleware } from 'next/server';
/* Função para agrupar os middlewares */
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
