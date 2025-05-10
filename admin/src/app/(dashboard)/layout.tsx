import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

export default async function DashboardPage(props: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <DashboardLayout>
            {props.children}
        </DashboardLayout>
    );
}
