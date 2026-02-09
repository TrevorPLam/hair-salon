/**
 * Base ESLint configuration for library packages.
 *
 * @module eslint-config/library
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Base ESLint configuration for TypeScript/TSX library packages.
 * Provides consistent linting rules across all packages in the monorepo.
 *
 * **CONFIGURATION FORMAT**: ESLint v9 flat config (new format)
 * - Uses array-based configuration instead of legacy .eslintrc format
 * - Compatible with modern ESLint tooling
 *
 * **TARGET FILES**: **/*.{ts,tsx}
 * - Applies to all TypeScript and TSX files
 * - Used by packages/ui, packages/utils, and other library packages
 *
 * **PARSER CONFIGURATION**:
 * - TypeScript parser with JSX support
 * - ES2022 module syntax
 * - Browser, ES2022, and Node globals available
 *
 * **KEY RULES**:
 * - TypeScript ESLint recommended rules
 * - Unused variables allowed with underscore prefix (_variable)
 * - Console warnings allowed (warn/error), console.log blocked
 *
 * **USAGE**:
 * ```js
 * import baseConfig from '@repo/eslint-config/library'
 *
 * export default [
 *   ...baseConfig,
 *   // Additional package-specific rules
 * ]
 * ```
 *
 * **AI ITERATION HINTS**:
 * - Adding new package? Extend this config for consistency
 * - Custom rules? Add after spreading baseConfig
 * - Rule changes affect all consuming packages
 *
 * **DEPENDENCIES**:
 * - @typescript-eslint/eslint-plugin: TypeScript linting rules
 * - @typescript-eslint/parser: TypeScript parser for ESLint
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Provide consistent linting standards for library packages
 * - Enforce TypeScript best practices
 * - Enable JSX support for React components
 *
 * **Features:**
 * - TypeScript ESLint recommended rules
 * - ES2022 syntax support
 * - Browser and Node environment globals
 * - Unused variable detection with underscore exception
 * - Console usage restrictions (warn/error only)
 *
 * **Configuration Details:**
 * - Parser: TypeScript with JSX support
 * - ECMAScript version: 2022
 * - Source type: Modules (ESM)
 * - Globals: browser, es2022, node
 *
 * **Rule Overrides:**
 * - `@typescript-eslint/no-unused-vars`: Allows unused variables starting with _
 * - `no-console`: Allows console.warn/error, blocks console.log
 *
 * **Usage in Monorepo:**
 * - Base configuration for all library packages
 * - Extended by Next.js configuration for web app
 * - Ensures consistent code quality across packages
 */

// Base ESLint configuration for library packages (ESLint v9 flat config)
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
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
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Allow unused variables with underscore prefix (common for unused parameters)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      // Restrict console usage to warnings and errors only
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
