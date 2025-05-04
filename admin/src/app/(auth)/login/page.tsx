'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Divider, Link } from '@mui/material';
import toast from 'react-hot-toast';
import Loading from '@/components/common/Loading';

type LoginFormInputs = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        const result = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false,
        });
        setLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else if (result?.ok) {
            toast.success('Login successful!');
            router.push('/dashboard');
        } else {
            toast.error('Unknown login error');
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
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
                        <Link href="/forgot-password" variant="body2" underline="hover">
                            Forgot password?
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <Loading size={20} text='Loading...' /> : 'Login'}
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
