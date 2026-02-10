/**
 * @file apps/web/lib/actions.ts
 * @role runtime
 * @summary Server action barrel for contact submissions.
 *
 * @entrypoints
 * - submitContactForm
 *
 * @exports
 * - submitContactForm
 *
 * @depends_on
 * - Internal: ./actions/submit
 *
 * @used_by
 * - apps/web/features/contact/components/ContactForm.tsx
 *
 * @runtime
 * - environment: server
 * - side_effects: server action execution
 *
 * @data_flow
 * - inputs: contact form payload
 * - outputs: submission result
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export { submitContactForm } from './actions/submit';
