import * as React from 'react';
import { cn } from '@repo/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render as */
  as?: 'section' | 'div' | 'aside';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Tag = 'section', ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={cn('py-16 md:py-20', className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';
