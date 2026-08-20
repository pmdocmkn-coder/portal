import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, type = 'text', ...props }, ref) => {
    // If it's a hidden, file, or checkbox/radio, don't apply the heavy styling by default
    if (type === 'hidden' || type === 'file' || type === 'checkbox' || type === 'radio') {
      return <input type={type} ref={ref} className={className} {...props} />;
    }

    return (
      <input
        type={type}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl border ${
          error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
        } focus:outline-none focus:ring-2 transition-all text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
