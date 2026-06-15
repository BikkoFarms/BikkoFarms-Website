import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-ring cursor-pointer select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';
    
    // Variant styles
    const variants = {
      primary: 'bg-brand-green-600 hover:bg-brand-green-700 text-white shadow-md hover:shadow-lg hover:shadow-brand-green-700/10',
      secondary: 'bg-brand-amber-600 hover:bg-brand-amber-700 text-white shadow-md hover:shadow-lg hover:shadow-brand-amber-700/10',
      outline: 'border border-neutral-border bg-transparent hover:bg-neutral-border text-neutral-fg',
      ghost: 'bg-transparent hover:bg-neutral-border/50 text-neutral-fg',
    };
    
    // Size styles
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-lg rounded-xl',
    };
    
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
