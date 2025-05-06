import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { loginWithCredentials, loginWithGoogle } from '@/lib/api/authApi';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Thiếu thông tin đăng nhập');
        }

        const response = await loginWithCredentials(credentials.username, credentials.password);

        if (response && response.primarykey && response.usr) {
          return {
            id: response.primarykey.toString(),
            name: response.fname,
            email: response.email,
            usr: response.usr,
            role: response.role,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          };
        }

        throw new Error('Invalid credentials');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.usr = user.usr;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      if (account?.provider === 'google' && account.id_token) {
        const response = await loginWithGoogle(account.id_token);
        if (response?.primarykey) {
          token.id = response.primarykey.toString();
          token.name = response.fname;
          token.email = response.email;
          token.usr = response.usr;
          token.role = response.role;
          token.accessToken = response.accessToken;
          token.refreshToken = response.refreshToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.usr = token.usr as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/api/auth/callback') || url.includes('/login')) {
        return `${baseUrl}/librarians`;
      }
      return url;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
