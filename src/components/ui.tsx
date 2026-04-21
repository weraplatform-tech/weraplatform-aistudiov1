import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }
>(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-md',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-900 focus:ring-slate-500 shadow-sm',
    outline: 'border-2 border-slate-300 text-slate-800 hover:bg-slate-50 focus:ring-slate-300',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:bg-slate-100',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:bg-slate-200 disabled:text-slate-500 disabled:border-transparent',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

export const Card = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => (
  <div className={cn('bg-white rounded-xl shadow-sm border border-slate-200 text-slate-900 overflow-hidden', className)} {...props}>
    {children}
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
