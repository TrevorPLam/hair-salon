/**
 * Supabase integration package barrel exports.
 *
 * **2026 Best Practices Applied:**
 * - Provides clean barrel exports for the package
 * - Includes comprehensive JSDoc documentation
 * - Organizes exports by functionality
 * - Follows monorepo package patterns
 *
 * @example
 * ```typescript
 * import {
 *   createSupabaseClient,
 *   insertLead,
 *   updateLead,
 *   supabaseClient
 * } from '@repo/integrations-supabase';
 * import type { SupabaseLeadRow, SupabaseClientConfig } from '@repo/integrations-supabase/types';
 *
 * const client = createSupabaseClient();
 * const lead = await insertLead(client, { name: 'John Doe', email: 'john@example.com' });
 * ```
 */

// Client exports
// [Task 0.24] Added getSupabaseClient; supabaseClient kept for backward compat (deprecated)
export { insertLead, updateLead, getSupabaseClient, supabaseClient } from './client';
// [Task 0.24] SupabaseClientConfig now re-exported from types.ts (removed duplicate from client.ts)
export type { SupabaseClientConfig } from './types';

// Lead management exports (backward compatibility)
export {
  insertSupabaseLead,
  updateSupabaseLead,
  buildSupabaseHeaders,
  getSupabaseLeadsUrl,
  createSupabaseInsertError,
  createSupabaseUpdateError,
} from './leads';

// Type exports
export type {
  SupabaseLeadRow,
  SupabaseLeadInsert,
  SupabaseLeadUpdate,
  SupabaseApiResponse,
} from './types';
