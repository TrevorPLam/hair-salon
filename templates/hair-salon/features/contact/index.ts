/**
 * @file templates/hair-salon/features/contact/index.ts
 * @role runtime
 * @summary Contact feature public exports.
 *
 * @entrypoints
 * - Module barrel
 *
 * @exports
 * - contactFormSchema
 * - ContactForm
 *
 * @depends_on
 * - Internal: ./lib/contact-form-schema
 * - Internal: ./components/ContactForm
 *
 * @used_by
 * - templates/hair-salon/app/contact/page.tsx
 *
 * @runtime
 * - environment: shared
 * - side_effects: none
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export * from './lib/contact-form-schema';
export { default as ContactForm } from './components/ContactForm';
