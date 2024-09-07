import { Session, User as typeUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '@/lib/mongodb';
import User from '@/models/user/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credenciais não fornecidas');
        }
        await db.connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (
            !user ||
            !(await bcrypt.compare(credentials.password, user.password))
          ) {
            throw new Error('Email ou senha incorretos');
          }
          await db.disconnect();
          return user;
        } catch (err) {
          console.error('Erro durante a autenticação:', err);
          throw err;
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: typeUser }) {
      if (user) {
        token.isActive = user.isActive;
        token._id = user._id;
        token.last_name = user.last_name;
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session && session.user) {
        if (
          typeof token.last_name === 'string' &&
          typeof token._id === 'string'
        ) {
          session.user.last_name = token.last_name;
          session.user._id = token._id;
        } else {
          console.error('token.lastName is not a string');
        }
      }
      console.log(session);

      return session;
    },
  },
  pages: {
    signIn: '/cadastrar',
    error: '/entrar',
  },
};
