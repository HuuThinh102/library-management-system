import axios from 'axios';
import Cookies from 'js-cookie';
import { decrypt, encrypt } from '@/utils/encrypt';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Nếu lỗi là do access_token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenEncrypted = Cookies.get('refresh_token');
        if (!refreshTokenEncrypted) throw new Error('Missing refresh token');

        const refreshToken = decrypt(refreshTokenEncrypted);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const { access_token: newAccessToken, refresh_token: newRefreshToken } = res.data;

        // Cập nhật cookie
        Cookies.set('access_token', encrypt(newAccessToken), { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', encrypt(newRefreshToken), { secure: true, sameSite: 'strict' });

        // Gắn access_token mới vào request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Gửi lại request
        return axios(originalRequest);
      } catch {
        // Nếu refresh token cũng hết hạn => logout
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
