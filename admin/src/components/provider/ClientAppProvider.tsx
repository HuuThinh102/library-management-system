'use client';

import * as React from 'react';
import { AppProvider } from '@toolpad/core';
import { Toaster } from 'react-hot-toast';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
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
    const authentication = {
        isAuthenticated: (session: Session | null) => !!session?.user,
        getUser: (session: Session | null) =>
            session?.user
                ? {
                    name: session.user.name || session.user.email || 'User',
                    email: session.user.email || '',
                }
                : null,
        signOut: () => signOut(),
        signIn: () => signIn(),
    };

    return (
        <AppProvider
            navigation={navigation}
            branding={{ title: 'Admin' }}
            session={session}
            authentication={authentication}
        >
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
            <Toaster position="top-right" reverseOrder={false} />
        </AppProvider>
    );
}