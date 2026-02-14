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
export { insertLead, updateLead, supabaseClient, type SupabaseClientConfig } from './client';

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
