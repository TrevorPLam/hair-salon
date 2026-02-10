/**
 * @file packages/config/eslint-config/library.js
 * @role config
 * @summary Base ESLint flat config for library packages.
 *
 * @entrypoints
 * - Default export (flat config array)
 *
 * @exports
 * - ESLint config array
 *
 * @depends_on
 * - External: @typescript-eslint/eslint-plugin
 * - External: @typescript-eslint/parser
 *
 * @used_by
 * - packages/ui, packages/utils, and other library packages
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

// Base ESLint configuration for library packages (ESLint v9 flat config)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2022: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Allow unused variables with underscore prefix (common for unused parameters)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Restrict console usage to warnings and errors only
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
