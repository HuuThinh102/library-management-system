import { DataModel } from '@toolpad/core';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      usr: string;
      email?: string | null;
      role: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
  }

  interface User extends DataModel{
    id: string;
    usr: string;
    email?: string | null;
    role: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface JWT {
    id: string;
    usr: string;
    email?: string | null;
    role: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
