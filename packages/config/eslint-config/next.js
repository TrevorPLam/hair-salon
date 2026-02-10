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
 * - Internal: ./library.js
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
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from './library.js';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat for legacy config compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Next.js specific ESLint configuration using flat config format for ESLint v9+
// Extends base library config and adds Next.js-specific rules
const eslintConfig = [...baseConfig, ...compat.extends('next/core-web-vitals', 'next/typescript')];

export default eslintConfig;
