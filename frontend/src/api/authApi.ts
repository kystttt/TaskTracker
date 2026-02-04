import api from './httpClient';
import type { AuthTokens } from '../types/auth';

interface AuthRequest {
  username: string;
  password: string;
}

export async function login(data: AuthRequest): Promise<AuthTokens> {
  const res = await api.post<AuthTokens>('/auth/login', data);
  return res.data;
}

export async function registerUser(data: AuthRequest): Promise<AuthTokens> {
  const res = await api.post<AuthTokens>('/auth/register', data);
  return res.data;
}

