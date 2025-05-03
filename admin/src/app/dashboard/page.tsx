import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h2" gutterBottom>
                    Welcome, {session.user.name}!
                </Typography>
                <Typography variant="body1">
                    This is the Admin Dashboard.
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Username: {session.user.usr}
                </Typography>
                <Typography variant="body2">
                    Role: {session.user.role}
                </Typography>
                {session.user.accessToken && (
                    <Typography variant="body2">
                        Access Token: {session.user.accessToken}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}