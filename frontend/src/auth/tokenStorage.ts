import { ACCESS_TOKEN_KEY } from '../utils/constants';

export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string | null): void;
  clear(): void;
}

class LocalStorageTokenStorage implements TokenStorage {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  setToken(token: string | null): void {
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export const tokenStorage: TokenStorage = new LocalStorageTokenStorage();

