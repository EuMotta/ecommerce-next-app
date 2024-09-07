import 'next-auth/jwt';
import 'next-auth';

declare module 'next-auth' {
  interface User {
    _id: string;
    isActive: boolean;
    last_name: string;
  }
  interface Session {
    user?: User;
  }
}
