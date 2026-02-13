/**
 * @file templates/hair-salon/lib/__tests__/env-setup.ts
 * @role test
 * @summary Sets required env vars for env validation tests.
 *
 * @entrypoints
 * - Test setup for env.test.ts
 *
 * @exports
 * - None
 *
 * @depends_on
 * - Node: process.env
 *
 * @used_by
 * - templates/hair-salon/lib/__tests__/env.test.ts
 *
 * @runtime
 * - environment: test
 * - side_effects: mutates process.env
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

Object.assign(process.env, {
  NODE_ENV: 'test',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  NEXT_PUBLIC_SITE_NAME: 'Test Hair Salon',
  // Note: Supabase and HubSpot variables are optional in test mode
  // They will be set by individual tests that need them
  // Booking provider variables for testing
  MINDBODY_ENABLED: 'false',
  VAGARO_ENABLED: 'false',
  SQUARE_ENABLED: 'false',
});

// Export for Jest compatibility
module.exports = {};
