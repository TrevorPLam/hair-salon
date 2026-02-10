/**
 * @file packages/ui/src/components/Textarea.tsx
 * @role runtime
 * @summary Labeled textarea with validation styling.
 *
 * @entrypoints
 * - Textarea
 *
 * @exports
 * - default Textarea
 * - TextareaProps
 *
 * @depends_on
 * - External: react
 * - External: lucide-react
 * - Internal: @repo/utils (cn)
 *
 * @used_by
 * - Contact form and booking form
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

// Textarea sibling to Input with identical validation/success affordances for multi-line fields
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, isValid, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || props.name || generatedId;

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-slate font-semibold mb-2" htmlFor={textareaId}>
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-off-white text-charcoal transition-all placeholder:text-slate resize-y',
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
              className="absolute right-3 top-3 w-5 h-5 text-success"
              aria-hidden="true"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
