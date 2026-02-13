'use client';

import * as React from 'react';
import { cn } from '@repo/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow multiple items open at once */
  multiple?: boolean;
}

export function Accordion({ items, multiple = false, className, ...props }: AccordionProps) {
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      className={cn('divide-y divide-border rounded-lg border border-border', className)}
      {...props}
    >
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const id = `accordion-${index}`;
        return (
          <div key={index}>
            <button
              type="button"
              id={`${id}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${id}-content`}
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span>{item.question}</span>
              <svg
                className={cn(
                  'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`${id}-content`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 pb-4' : 'max-h-0'
              )}
            >
              <div className="px-6 text-muted-foreground leading-relaxed">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
