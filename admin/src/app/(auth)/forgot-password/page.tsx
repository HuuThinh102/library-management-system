'use client';

import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';

type ForgotPasswordFormInputs = {
    email: string;
};

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormInputs>();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: ForgotPasswordFormInputs) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email }),
            });

            if (response.ok) {
                toast.success('Vui lòng kiểm tra email để nhận mật khẩu mới.');
                router.push('/login')
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Gửi yêu cầu tạo lại mật khẩu thất bại');
            }
        } catch {
            toast.error('Lỗi không thể tạo mật khẩu mới.');
        } finally {
            setLoading(false);
        }
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
                    QUÊN MẬT KHẨU
                </Typography>

                <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                    Nhập email để nhận được mật khẩu mới.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register('email', {
                            required: 'Vui lòng nhập Email',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <Loading size={20} text=' Đang gửi...' /> : 'Gửi yêu cầu'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
