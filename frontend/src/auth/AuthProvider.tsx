import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthContextValue } from './auth.types';
import { tokenStorage } from './tokenStorage';
import { decodeJwt, hasRole } from '../utils/jwt';
import { registerLogoutHandler } from '../api/httpClient';
import type { Role } from '../types/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => tokenStorage.getToken());
  const [payload, setPayload] = useState(() => decodeJwt(token));
  const navigate = useNavigate();

  useEffect(() => {
    registerLogoutHandler(() => {
      setToken(null);
      setPayload(null);
      tokenStorage.clear();
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  const login = (newToken: string) => {
    tokenStorage.setToken(newToken);
    setToken(newToken);
    setPayload(decodeJwt(newToken));
    navigate('/tasks', { replace: true });
  };

  const logout = () => {
    tokenStorage.clear();
    setToken(null);
    setPayload(null);
    navigate('/login', { replace: true });
  };

  const roles: Role[] = (payload?.roles ?? []) as Role[];

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      payload,
      isAuthenticated: !!token && !!payload,
      roles,
      login,
      logout,
    }),
    [token, payload, roles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useIsAdmin() {
  const { payload } = useAuth();
  return hasRole(payload, 'ROLE_ADMIN');
}

