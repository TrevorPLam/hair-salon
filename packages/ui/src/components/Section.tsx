/**
 * @file packages/ui/src/components/Section.tsx
 * @role runtime
 * @summary Section wrapper with standardized vertical spacing.
 *
 * @entrypoints
 * - Section
 *
 * @exports
 * - default Section
 * - SectionProps
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

// Section shell that standardizes vertical rhythm across pages
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn('py-16 md:py-24', className)} {...props}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
