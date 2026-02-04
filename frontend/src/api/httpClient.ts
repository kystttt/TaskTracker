import axios from 'axios';
import { tokenStorage } from '../auth/tokenStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

let logoutHandler: (() => void) | null = null;

export function registerLogoutHandler(handler: () => void) {
  logoutHandler = handler;
}

api.interceptors.request.use((config) => {
  const isAuthRequest = config.url?.startsWith('/auth');
  const token = tokenStorage.getToken();

  if (!isAuthRequest && token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      if (logoutHandler) {
        logoutHandler();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;

