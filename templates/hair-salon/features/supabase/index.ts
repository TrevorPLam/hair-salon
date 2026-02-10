/**
 * @file apps/web/features/supabase/index.ts
 * @role runtime
 * @summary Supabase feature public exports.
 *
 * @entrypoints
 * - Module barrel
 *
 * @exports
 * - supabase lead helpers
 *
 * @depends_on
 * - Internal: ./lib/supabase-leads
 *
 * @used_by
 * - apps/web/lib/actions.ts
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export * from './lib/supabase-leads';
