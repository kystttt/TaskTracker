import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useIsAdmin } from './AuthProvider';

export function AdminRoute() {
  const { isAuthenticated } = useAuth();
  const isAdmin = useIsAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
}

