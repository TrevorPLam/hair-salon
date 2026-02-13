import * as React from 'react';
import { cn } from '@repo/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message from validation */
  error?: string;
  /** Whether validation passed (shows success styling) */
  isValid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, isValid, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="ml-0.5 text-destructive">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-destructive focus-visible:ring-destructive'
              : isValid
                ? 'border-primary focus-visible:ring-primary'
                : 'border-input',
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
