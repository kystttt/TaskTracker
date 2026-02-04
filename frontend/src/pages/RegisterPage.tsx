import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../auth/AuthProvider';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 chars'),
});

type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
  const { login: setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
  });

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
        <h1 className="text-xl font-semibold text-slate-100">Register</h1>
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
            autoComplete="new-password"
          />
          {mutation.isError && (
            <div className="text-sm text-red-400">Registration failed.</div>
          )}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}

