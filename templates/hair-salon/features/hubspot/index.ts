/**
 * @file templates/hair-salon/features/hubspot/index.ts
 * @role runtime
 * @summary HubSpot feature public exports.
 *
 * @entrypoints
 * - Module barrel
 *
 * @exports
 * - hubspot client helpers
 *
 * @depends_on
 * - Internal: ./lib/hubspot-client
 *
 * @used_by
 * - templates/hair-salon/lib/actions.ts
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export * from './lib/hubspot-client';
