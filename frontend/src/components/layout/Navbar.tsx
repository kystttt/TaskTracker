import { NavLink } from 'react-router-dom';
import { useAuth, useIsAdmin } from '../../auth/AuthProvider';
import { Button } from '../ui/Button';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const isAdmin = useIsAdmin();

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-sky-400">TaskTracker</span>
        {isAuthenticated && (
          <>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-sky-300' : 'text-slate-300 hover:text-sky-300'}`
              }
            >
              Tasks
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin/tasks"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-sky-300' : 'text-slate-300 hover:text-sky-300'
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </>
        )}
      </div>
      {isAuthenticated && (
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      )}
    </nav>
  );
}

