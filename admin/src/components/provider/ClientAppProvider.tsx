'use client';

import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { Toaster } from 'react-hot-toast';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import Cookies from 'js-cookie';
/* eslint-disable  @typescript-eslint/no-explicit-any */

type ClientAppProviderProps = {
    children: React.ReactNode;
    navigation: any[];
    session: Session | null;
};

export default function ClientAppProvider({
    children,
    navigation,
    session,
}: ClientAppProviderProps) {

    // Create the authentication object
    const authentication = React.useMemo(() => ({
        isAuthenticated: () => {
            const isAuth = Boolean(session?.user);
            console.log("isAuthenticated check:", isAuth);
            return isAuth;
        },
        getUser: () => {
            if (!session?.user) {

                return null;
            }

            const user = {
                name: session.user.name || session.user.email || 'User',
                email: session.user.email || '',
            };


            return user;
        },
        signOut: () => {
            try {

                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                signOut({ callbackUrl: '/login' });
            } catch (error) {
                console.error('Lỗi khi đăng xuất:', error);
            }
        },
        signIn: () => signIn(),
    }), [session]);

    return (
        <NextAppProvider
            navigation={navigation}
            branding={{ title: 'Admin' }}
            session={session}
            authentication={authentication}
        >
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
            <Toaster position="top-right" reverseOrder={false} />
        </NextAppProvider>
    );
}