/**
 * @file packages/ui/src/components/Card.tsx
 * @role runtime
 * @summary Card container with variant styling.
 *
 * @entrypoints
 * - Card
 *
 * @exports
 * - default Card
 * - CardProps
 *
 * @depends_on
 * - External: react
 * - Internal: @repo/utils (cn)
 *
 * @used_by
 * - apps/web pages and components
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

// Lightweight wrapper for hair salon cards; variants tune padding/shadow for service vs testimonial blocks
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'service' | 'testimonial';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'bg-off-white rounded-xl border border-gray-200';

    const variants = {
      default: 'shadow-md p-6 hover:shadow-lg transition-shadow',
      service: 'shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-1',
      testimonial: 'p-8',
    };

    return (
      <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
