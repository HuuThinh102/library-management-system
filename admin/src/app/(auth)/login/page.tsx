'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Divider, Link } from '@mui/material';
import toast from 'react-hot-toast';
import Loading from '@/components/common/Loading';
import Cookies from 'js-cookie';
import { getSession } from 'next-auth/react';
import { encrypt } from '@/utils/encrypt';

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
            try {
                const jsonPart = result.error.split(':').slice(1).join(':').trim();
                const parsed = JSON.parse(jsonPart);
                toast.error(parsed.error);
            } catch (e) {
                console.error('Lỗi khi parse error:', e);
                toast.error('Đăng nhập thất bại');
            }
        } else if (result?.ok) {
            const session = await getSession();

            if (session?.user.accessToken && session?.user.refreshToken) {
                Cookies.set('access_token', encrypt(session.user.accessToken), { secure: true, sameSite: 'strict' });
                Cookies.set('refresh_token', encrypt(session.user.refreshToken), { secure: true, sameSite: 'strict' });
            }

            toast.success('Đăng nhập thành công');
            router.push('/librarians');
        } else {
            toast.error('Lỗi đăng nhập');
        }

    };

    const handleGoogleLogin = async () => {
        await signIn('google', { callbackUrl: '/librarians' });
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
                    ĐĂNG NHẬP
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        {...register('username', { required: 'Vui lòng nhập Username' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password', { required: 'Vui lòng nhập Password' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
                        <Link href="/forgot-password" variant="body2" underline="hover">
                            Quên mật khẩu?
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <Loading size={20} text=' Đang tải...' /> : 'Đăng nhập'}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>hoặc</Divider>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleGoogleLogin}
                >
                    Đăng nhập bằng Google
                </Button>
            </Paper>
        </Box>
    );
}
