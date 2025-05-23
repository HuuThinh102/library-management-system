import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';
import ClientAppProvider from '@/components/provider/ClientAppProvider';
import { NAVIGATION } from '@/config/navigation';


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="vi">
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: false }}>
                    <React.Suspense fallback={<LinearProgress />}>
                        <ClientAppProvider navigation={NAVIGATION} session={session}>
                            {children}
                        </ClientAppProvider>
                    </React.Suspense>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}