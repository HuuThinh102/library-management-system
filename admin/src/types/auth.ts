export interface User {
    primarykey: number;
    usr: string;
    fname: string;
    email: string;
    role: string;
}
  
export interface AuthResponse {
    user: User;
    accessToken?: string;
    refreshToken?: string;
}
  