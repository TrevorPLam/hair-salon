/**
 * @file packages/ui/eslint.config.mjs
 * @role config
 * @summary ESLint config for UI package using shared library rules.
 *
 * @entrypoints
 * - Default export (flat config array)
 *
 * @exports
 * - ESLint config
 *
 * @depends_on
 * - Internal: @repo/eslint-config
 *
 * @used_by
 * - ESLint runner
 *
 * @runtime
 * - environment: build
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

// Extend from shared base ESLint configuration
import config from '@repo/eslint-config';

export default config;
