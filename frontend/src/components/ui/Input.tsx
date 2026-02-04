import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { label, error, className, ...props },
    ref
) {
    return (
        <label className="flex flex-col gap-1 text-sm">
            {label && <span className="text-slate-200">{label}</span>}
            <input
                ref={ref}
                className={clsx(
                    'rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500',
                    className,
                )}
                {...props}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </label>
    );
});
