/**
 * @repo/ui — Shared UI Component Library
 *
 * Themeable components driven by CSS custom properties.
 * Each site defines its own palette in globals.css; components adapt automatically.
 */

// Layout
export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';
export { Section } from './components/Section';
export type { SectionProps } from './components/Section';

// Primitives
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
export { Card } from './components/Card';
export type { CardProps } from './components/Card';

// Form
export { Input } from './components/Input';
export type { InputProps } from './components/Input';
export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';
export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

// Disclosure
export { Accordion } from './components/Accordion';
export type { AccordionItem, AccordionProps } from './components/Accordion';
