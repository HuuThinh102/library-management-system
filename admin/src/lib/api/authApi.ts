import { AuthResponse } from '@/types/auth';

export async function loginWithCredentials(
  username: string,
  password: string
): Promise<AuthResponse> {
  console.log('Sending to API:', { usr: username, pwd: password });
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usr: username, pwd: password }),
  });

  const text = await response.text();
  console.log('API Response:', { status: response.status, body: text });
  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}: ${text}`);
  }

  return JSON.parse(text);
}

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  const text = await response.text();
  console.log('Google API Response:', { status: response.status, body: text });
  if (!response.ok) {
    throw new Error(`Google login failed with status ${response.status}: ${text}`);
  }

  return JSON.parse(text);
}