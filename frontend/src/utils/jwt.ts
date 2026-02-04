import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '../types/auth';

export function decodeJwt(token: string | null): JwtPayload | null {
  if (!token) return null;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Decoded JWT', decoded);
    }
    return decoded;
  } catch {
    return null;
  }
}

export function hasRole(payload: JwtPayload | null, role: string): boolean {
  if (!payload?.roles) return false;
  return payload.roles.includes(role as any);
}

