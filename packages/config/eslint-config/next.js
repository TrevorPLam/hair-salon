/**
 * @file packages/config/eslint-config/next.js
 * @role config
 * @summary Next.js ESLint flat config with FlatCompat.
 *
 * @entrypoints
 * - Default export (flat config array)
 *
 * @exports
 * - ESLint config array
 *
 * @depends_on
 * - External: @eslint/eslintrc (FlatCompat)
 *
 * @used_by
 * - apps/web
 *
 * @runtime
 * - environment: build
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @changes
 * - 2026-02-10: Removed baseConfig import to fix plugin conflict; @typescript-eslint plugin now defined only once by Next.js configs
 * - 2026-02-10: Updated console rule to allow info/warn/error (was warn/error only)
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-10
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat for legacy config compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Next.js specific ESLint configuration using flat config format for ESLint v9+
// Uses Next.js built-in configs which already include TypeScript support
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Allow unused variables with underscore prefix (common for unused parameters)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Restrict console usage to info, warnings and errors only
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
];

export default eslintConfig;
