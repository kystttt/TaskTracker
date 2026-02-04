import clsx from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  variant?: 'default' | 'success' | 'warning';
  children: ReactNode;
}

export function Badge({ variant = 'default', children }: Props) {
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
  const variants: Record<string, string> = {
    default: 'bg-slate-800 text-slate-100',
    success: 'bg-emerald-700 text-emerald-100',
    warning: 'bg-amber-700 text-amber-100',
  };

  return <span className={clsx(base, variants[variant])}>{children}</span>;
}

