// // Third-party Imports
// import { cookies } from 'next/headers';

// import CredentialProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// import type { RequestInternal, User } from "next-auth";

// import { LoginApi, LoginGoogleApi, getLoggedUserApi, getUserInfoApi } from '@/repository/auth/auth';
// import { encodeToken, encodeJsonData } from './crypto';

// const maxAgeTimeCookie = 30 * 24 * 60 * 60; // 30 days



// const setCookie = async (cookieKey: string, value: string) => {
//   const cookiesStore = await cookies();

//   cookiesStore.set(cookieKey, value, { maxAge: maxAgeTimeCookie });
// };

// export const authOptions = {
//   providers: [
//     CredentialProvider({
//       name: 'Credentials',
//       type: 'credentials',
//       credentials: {},

//       async authorize(
//         credentials: Record<string, string> | undefined,
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
//       ): Promise<User | null> {
//         if (!credentials) {
//           console.error("Missing credentials");

//           return null;
//         }

//         const { usr, pwd } = credentials;

//         if (!usr || !pwd) {
//           console.error("Missing username or password");

//           return null;
//         }

//         try {
//           const res = await LoginApi({ usr, pwd });

//           if (res?.status !== 200) {

//             return null;
//           }

//           const accessToken = res?.data?.message?.access_token ?? '';
//           const refreshToken = res?.data?.message?.refresh_token ?? '';

//           if (typeof accessToken === 'string') {
//             if (accessToken) {
//               await setCookie('token', encodeToken(accessToken)!);
//               (await cookies()).set('refreshToken', encodeToken(refreshToken as string)!, { maxAge: maxAgeTimeCookie });

//             }
//           }

//           await setCookie("is-user-logged", "true");

//           return {
//             id: usr,
//             name: res?.data?.full_name,
//             email: res?.data?.email || "",
//             image: res?.data?.avatar || "",
//           };
//         } catch (e: any) {

//           if (e.code == 'ECONNREFUSED') {
//             await setCookie('error-message', 'error_connect');
//           }

//           await setCookie("is-user-logged", "false");

//           return null;
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],

//   session: {
//     strategy: 'jwt' as const,
//     maxAge: maxAgeTimeCookie,
//   },

//   pages: {
//     signIn: '/login',
//   },

//   callbacks: {
//     async jwt({ token, user, account }: any) {
//       if (user) {

//         token.name = user.full_name || user.name;

//         if (account && account.provider === 'google') {
//           if (!token.email || !account.id_token) {

//             return token;
//           }

//           try {
//             const res = await LoginGoogleApi({
//               emailUser: token.email,
//               tokenUser: account.id_token,
//             });

//             if (res?.status === 200) {

//               const enToken = encodeToken(res?.data?.message?.access_token)

//               const refreshToken = res?.data?.message?.refresh_token ? encodeToken(res?.data?.message?.refresh_token) : '';

//               (await cookies()).set('refreshToken', refreshToken as string, { maxAge: maxAgeTimeCookie });

//               (await cookies()).set('token', enToken as string, { maxAge: maxAgeTimeCookie });

//               // Lấy LoggedUser
//               const data = await getLoggedUserApi(enToken as string);

//               await setCookie('user_email', data?.data?.message || null)

//               //Lấy UserInfo
//               const dataUserInfo = await getUserInfoApi(data?.data?.message, enToken)

//               await setCookie('user_info', encodeJsonData(dataUserInfo.data.data) || '')

//               await setCookie('is-user-logged', 'true',);
//             }
//             else {
//               console.error('Google login failed with status:', res?.status);
//               await setCookie('error-message', 'gmail_not_found');
//             }
//           } catch (error: any) {
//             // console.error('Google login error:', error);
//             await setCookie('error-message', 'gmail_not_found');
//           }
//         }
//       }

//       return token;
//     },
//     async session({ session, token }: any) {
//       if (session.user) {
//         session.user.name = token.name;
//       }


//       return session;
//     },
//     async signIn({ account }: any) {
//       if (account?.provider === 'google' || account?.provider === 'credentials') {

//         return true;
//       }


//       return '/login';
//     },
//   },
// };

// export default authOptions;
