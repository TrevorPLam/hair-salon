/**
 * Root Jest configuration for monorepo.
 *
 * Handles testing across all packages:
 * - apps/web (Next.js app)
 * - packages/ui (React components)
 * - packages/utils (Pure utilities)
 */

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/?(*.)+(spec|test).{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    // Web app
    'apps/web/lib/**/*.{ts,tsx}',
    'apps/web/components/**/*.{ts,tsx}',
    'apps/web/features/**/*.{ts,tsx}',
    // UI library
    'packages/ui/src/**/*.{ts,tsx}',
    // Utils library
    'packages/utils/src/**/*.{ts,tsx}',
    // Exclude
    '!**/*.d.ts',
    '!**/index.ts', // Re-exports
    '!**/index.tsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.next',
    'dist',
  ],
  moduleNameMapper: {
    '^@repo/ui$': '<rootDir>/packages/ui/src/index.ts',
    '^@repo/utils$': '<rootDir>/packages/utils/src/index.ts',
    '^@/(.*)$': '<rootDir>/apps/web/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '.next', 'dist'],
}
