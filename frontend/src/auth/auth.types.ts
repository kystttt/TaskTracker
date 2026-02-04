import type { JwtPayload, Role } from '../types/auth';

export interface AuthState {
  token: string | null;
  payload: JwtPayload | null;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  roles: Role[];
  login: (token: string) => void;
  logout: () => void;
}

