/**
 * @file packages/ui/src/components/Button.tsx
 * @role runtime
 * @summary Shared button component with variants and sizes.
 *
 * @entrypoints
 * - Button
 *
 * @exports
 * - default Button
 * - ButtonProps
 *
 * @depends_on
 * - External: react
 * - Internal: @repo/utils (cn)
 *
 * @used_by
 * - apps/web and packages/ui consumers
 *
 * @runtime
 * - environment: shared
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import React from 'react';
import { cn } from '@repo/utils';

// Gradient-free button styles with size/variant tokens to keep hair salon pages consistent
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'medium', children, ...props }, ref) => {
    // Base styles applied to all variants
    const baseStyles =
      'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific styling
    const variants = {
      primary: 'bg-teal hover:bg-teal-dark text-white',
      secondary: 'bg-transparent hover:bg-off-white text-charcoal border-2 border-charcoal',
      text: 'text-teal hover:text-teal-dark bg-transparent',
    };

    // Size-specific styling
    const sizes = {
      small: 'py-2 px-4 text-sm',
      medium: 'py-3 px-6 text-base',
      large: 'py-4 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
