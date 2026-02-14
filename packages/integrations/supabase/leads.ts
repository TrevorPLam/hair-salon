/**
 * Supabase lead management utilities.
 *
 * **2026 Best Practices Applied:**
 * - Provides backward compatibility with existing code
 * - Uses new client pattern for consistency
 * - Includes comprehensive JSDoc documentation
 * - Maintains existing function signatures
 * - Implements proper error handling
 *
 * @deprecated Use client.ts directly for new implementations
 */

import { logError, logInfo, withServerSpan } from '@repo/infra/env';
import type { SupabaseLeadRow } from './types';

const SUPABASE_LEADS_PATH = '/rest/v1/leads';

/**
 * @deprecated Use supabaseClient from client.ts
 */
export function buildSupabaseHeaders(): Record<string, string> {
  const url = process.env.SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
  };
}

/**
 * @deprecated Use supabaseClient.url from client.ts
 */
export function getSupabaseLeadsUrl(): string {
  const url = process.env.SUPABASE_URL || '';
  return `${url}${SUPABASE_LEADS_PATH}`;
}

/**
 * @deprecated Use insertLead from client.ts
 */
export function createSupabaseInsertError(status: number, errorText: string): Error {
  return new Error(`Supabase insert failed with status ${status}: ${errorText}`);
}

/**
 * @deprecated Use updateLead from client.ts
 */
export function createSupabaseUpdateError(status: number): Error {
  return new Error(`Supabase update failed with status ${status}`);
}

/**
 * Inserts a lead into Supabase with tracing.
 * Maintains backward compatibility with existing code.
 *
 * @param payload - Lead data to insert
 * @returns Created lead record
 * @throws {Error} When insertion fails
 *
 * @deprecated Use insertLead from client.ts with client parameter
 */
export async function insertSupabaseLead(
  payload: Record<string, unknown>
): Promise<SupabaseLeadRow> {
  return withServerSpan(
    {
      name: 'supabase.insert',
      op: 'db.supabase',
      attributes: {
        email: payload.email as string,
        name: payload.name as string,
      },
    },
    async () => {
      const url = `${process.env.SUPABASE_URL || ''}${SUPABASE_LEADS_PATH}`;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([payload]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logError('Supabase lead insert failed', undefined, { status: response.status });
        throw createSupabaseInsertError(response.status, errorText);
      }

      const lead = (await response.json()) as SupabaseLeadRow;
      logInfo('Supabase lead inserted successfully', {
        leadId: lead.id,
        email: payload.email,
      });
      return lead;
    }
  );
}

/**
 * Updates a lead in Supabase with tracing.
 * Maintains backward compatibility with existing code.
 *
 * @param leadId - ID of lead to update
 * @param updates - Lead data to update
 * @returns Promise that resolves when update is complete
 * @throws {Error} When update fails
 *
 * @deprecated Use updateLead from client.ts with client parameter
 */
export async function updateSupabaseLead(
  leadId: string,
  updates: Record<string, unknown>
): Promise<void> {
  return withServerSpan(
    {
      name: 'supabase.update',
      op: 'db.supabase',
      attributes: {
        leadId,
        updateKeys: Object.keys(updates).join(', '),
      },
    },
    async () => {
      const url = `${process.env.SUPABASE_URL || ''}/rest/v1/leads?id=eq.${leadId}`;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        logError('Supabase lead update failed', undefined, { status: response.status });
        throw createSupabaseUpdateError(response.status);
      }

      logInfo('Supabase lead updated successfully', {
        leadId,
        updates: Object.keys(updates),
      });
    }
  );
}
