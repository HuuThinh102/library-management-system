'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Divider } from '@mui/material';
import toast from 'react-hot-toast';
import Loading from '@/components/common/Loading';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else if (result?.ok) {
            toast.success('Login sucessfull!')
            router.push('/dashboard');
        } else {
            setError('Unknown login error');
        }
    };

    const handleGoogleLogin = async () => {
        await signIn('google', { callbackUrl: '/dashboard' });
    };

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
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Admin Login
                </Typography>
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleCredentialsLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <Loading size={20} /> : 'Login'}
                    </Button>
                </form>
                <Divider sx={{ my: 2 }}>or</Divider>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </Button>
            </Paper>
        </Box>
    );
}