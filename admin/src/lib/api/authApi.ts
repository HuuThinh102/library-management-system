import axios from './axios';
import { AuthResponse } from '@/types/auth';

export async function loginWithCredentials(
  username: string,
  password: string
): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>('/api/v1/auth/login', {
    usr: username,
    pwd: password,
  });

  return response.data;
}

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>('/api/v1/auth/google', {
    idToken,
  });

  return response.data;
}
