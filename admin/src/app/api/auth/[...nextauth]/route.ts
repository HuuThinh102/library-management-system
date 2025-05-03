import NextAuth, { AuthOptions } from 'next-auth';
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
          console.log('Missing credentials:', credentials);
          throw new Error('Missing credentials');
        }

        try {
          const response = await loginWithCredentials(
            credentials.username,
            credentials.password
          );
          console.log('API response from loginWithCredentials:', response);

          if (response.user && response.user.primarykey && response.user.usr) {
            return {
              id: response.user.primarykey.toString(), // Chuyển primarykey thành string
              name: response.user.fname,
              email: response.user.email,
              usr: response.user.usr,
              role: response.user.role,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            };
          }
          console.log('Invalid response format:', response);
          throw new Error('Invalid credentials');
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Login failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT Callback:', { user, account });
      if (user) {
        token.id = user.id;
        token.usr = user.usr;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      if (account?.provider === 'google' && account.id_token) {
        try {
          const response = await loginWithGoogle(account.id_token);
          console.log('Google API Response:', response);
          if (response.user && response.user.primarykey) {
            token.id = response.user.primarykey.toString();
            token.name = response.user.fname;
            token.email = response.user.email;
            token.usr = response.user.usr;
            token.role = response.user.role;
            token.accessToken = response.accessToken;
            token.refreshToken = response.refreshToken;
          }
        } catch (error) {
          console.error('Google login error:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback:', { session, token });
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.usr = token.usr as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string | undefined;
        session.user.refreshToken = token.refreshToken as string | undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      if (url.includes('/api/auth/callback') || url.includes('/login')) {
        return `${baseUrl}/dashboard`;
      }
      return url;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };