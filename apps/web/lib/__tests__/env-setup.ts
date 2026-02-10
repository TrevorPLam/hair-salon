/**
 * @file apps/web/lib/__tests__/env-setup.ts
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
 * - apps/web/lib/__tests__/env.test.ts
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

process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_SITE_NAME = 'Test Hair Salon';
process.env.SUPABASE_URL = 'https://test-project.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-secret-key-123';
process.env.HUBSPOT_PRIVATE_APP_TOKEN = 'pat-test-token-abc';
