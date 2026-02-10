/**
 * @file packages/ui/src/components/index.ts
 * @role runtime
 * @summary UI component barrel exports.
 *
 * @entrypoints
 * - Component package public API
 *
 * @exports
 * - Accordion
 * - Button
 * - Card
 * - Container
 * - Input
 * - Section
 * - Select
 * - Skeleton
 * - Textarea
 *
 * @depends_on
 * - Internal: component modules
 *
 * @used_by
 * - apps/web and other packages
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

export { default as Accordion, type AccordionItem } from './Accordion';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Container } from './Container';
export { default as Input } from './Input';
export { default as Section } from './Section';
export { default as Select } from './Select';
export { default as Skeleton } from './Skeleton';
export { default as Textarea } from './Textarea';
