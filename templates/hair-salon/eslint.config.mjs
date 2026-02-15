// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { boundaryRules } from '@repo/eslint-config/boundaries';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-console': 'off',
      ...boundaryRules,
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);
