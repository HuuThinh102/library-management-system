import { setCookie } from 'cookies-next';
import instance from '@/repository/auth/axios';

interface LoginResponse {
  primarykey: number;
  usr: string;
  role: string;
  email: string;
  fname: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (usr: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await instance.post<LoginResponse>('/api/v1/auth/login', {
      usr,
      password,
    });

    const user = response.data;

    // Lưu access token và refresh token vào cookie
    setCookie('accessToken', user.accessToken);
    setCookie('refreshToken', user.refreshToken);

    return user;
  } catch (error) {
    throw new Error('Đăng nhập thất bại');
  }
};
