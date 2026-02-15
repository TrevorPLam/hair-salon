// File: packages/config/eslint-config/boundaries.js  [TRACE:FILE=packages.config.eslint.boundaries]
// Purpose: Enforces monorepo module boundaries via no-restricted-imports. Prevents deep internal
//          imports (@repo/*/src/*), cross-template imports, and package-to-template dependencies.
//
// Exports / Entry: Rule config object merged into next.js and library.js configs
// Used by: All workspace packages and templates via @repo/eslint-config
//
// Invariants:
// - Must block @repo/*/src/* (deep internal paths)
// - Must block relative imports that escape package boundaries
// - Aligned with docs/architecture/module-boundaries.md
//
// Status: @public
// Related Tasks: 0.11
// Last Updated: 2026-02-14

/**
 * ESLint no-restricted-imports configuration for monorepo boundary enforcement.
 * Blocks imports that bypass package public APIs or violate the dependency matrix.
 *
 * @see docs/architecture/module-boundaries.md
 */
export const boundaryRules = {
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['@repo/*/src', '@repo/*/src/*'],
          message:
            'Use package public API (e.g. @repo/ui, @repo/utils) instead of deep /src/ imports. See docs/architecture/module-boundaries.md.',
        },
        {
          group: ['**/packages/**', '**/templates/**'],
          message:
            'Use @repo/* workspace packages instead of relative paths across package boundaries. See docs/architecture/module-boundaries.md.',
        },
      ],
    },
  ],
};
