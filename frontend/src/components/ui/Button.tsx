import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function Button({ variant = 'primary', className, ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants: Record<string, string> = {
    primary: 'bg-sky-600 text-white hover:bg-sky-500 focus-visible:ring-sky-500',
    secondary:
      'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500',
  };

  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

