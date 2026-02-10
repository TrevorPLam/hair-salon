/**
 * @file packages/ui/src/components/Container.tsx
 * @role runtime
 * @summary Max-width container wrapper for layouts.
 *
 * @entrypoints
 * - Container
 *
 * @exports
 * - default Container
 * - ContainerProps
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

// Max-width wrapper to align page content with consistent horizontal padding
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('max-w-7xl mx-auto px-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
