export interface AuthResponse {
    primarykey: number;
    usr: string;
    fname: string;
    email: string;
    role: string;
    accessToken?: string;
    refreshToken?: string;
}
