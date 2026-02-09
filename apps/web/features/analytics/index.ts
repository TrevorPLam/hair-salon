/**
 * @file apps/web/features/analytics/index.ts
 * @role runtime
 * @summary Analytics feature public exports.
 *
 * @entrypoints
 * - Module barrel
 *
 * @exports
 * - analytics helpers
 * - analytics consent helpers
 *
 * @depends_on
 * - Internal: ./lib/analytics
 * - Internal: ./lib/analytics-consent
 *
 * @used_by
 * - Analytics consumers in app and lib
 *
 * @runtime
 * - environment: shared
 * - side_effects: none
 *
 * @data_flow
 * - inputs: none
 * - outputs: re-exports
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export * from './lib/analytics';
export * from './lib/analytics-consent';
