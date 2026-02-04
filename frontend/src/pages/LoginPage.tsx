import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { login } from '../api/authApi';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../auth/AuthProvider';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { login: setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
  });

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
        <h1 className="text-xl font-semibold text-slate-100">Login</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
        >
          <Input
            label="Username"
            {...register('username')}
            error={errors.username?.message}
            autoComplete="username"
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="current-password"
          />
          {mutation.isError && (
            <div className="text-sm text-red-400">
              Invalid credentials or server error.
            </div>
          )}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-xs text-slate-400">
          No account?{' '}
          <Link to="/register" className="text-sky-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </Layout>
  );
}

