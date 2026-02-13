import * as React from 'react';
import { cn } from '@repo/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'text';
  size?: 'small' | 'medium' | 'large';
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
  ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
  text: 'bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline',
};

const sizeStyles: Record<string, string> = {
  small: 'h-8 px-3 text-sm',
  medium: 'h-10 px-5 text-base',
  large: 'h-12 px-8 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'medium', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
