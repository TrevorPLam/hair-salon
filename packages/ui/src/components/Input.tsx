/**
 * @file packages/ui/src/components/Input.tsx
 * @role runtime
 * @summary Labeled input with validation styling.
 *
 * @entrypoints
 * - Input
 *
 * @exports
 * - default Input
 * - InputProps
 *
 * @depends_on
 * - External: react
 * - External: lucide-react
 * - Internal: @repo/utils (cn)
 *
 * @used_by
 * - Contact and booking forms
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

import React, { useId } from 'react';
import { cn } from '@repo/utils';
import { CheckCircle2 } from 'lucide-react';

// Labeled input with optional validation state and success icon for form UX consistency
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, isValid, type = 'text', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || props.name || generatedId;

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-slate font-semibold mb-2" htmlFor={inputId}>
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-off-white text-charcoal transition-all placeholder:text-slate',
              'focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none',
              error && 'border-error focus:border-error focus:ring-error/20',
              !error && isValid && 'border-success focus:border-success focus:ring-success/20',
              !error && !isValid && 'border-gray-300',
              isValid && 'pr-10',
              className
            )}
            {...props}
          />
          {isValid && !error && (
            <CheckCircle2
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success"
              aria-hidden="true"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
