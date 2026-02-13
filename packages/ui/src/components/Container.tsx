import * as React from 'react';
import { cn } from '@repo/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width variant */
  size?: 'default' | 'narrow' | 'wide';
}

const sizeStyles: Record<string, string> = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-screen-2xl',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
