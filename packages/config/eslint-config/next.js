/**
 * Next.js specific ESLint configuration.
 *
 * @module eslint-config/next
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Next.js-specific ESLint configuration extending base library config.
 * Adds Next.js framework rules and Core Web Vitals linting.
 *
 * **CONFIGURATION FORMAT**: ESLint v9 flat config with legacy compatibility
 * - Uses FlatCompat to bridge legacy .eslintrc format to flat config
 * - Enables Next.js specific rules that aren't available in flat config yet
 *
 * **EXTENDED CONFIGURATIONS**:
 * - next/core-web-vitals: Performance and accessibility rules
 * - next/typescript: TypeScript-specific Next.js rules
 * - Base library config: Shared TypeScript/React rules
 *
 * **TARGET USAGE**: apps/web (Next.js application)
 * - Applied to Next.js app directory and pages
 * - Enforces Next.js best practices and performance guidelines
 *
 * **NEXT.JS RULES INCLUDED**:
 * - Image optimization (next/image usage)
 * - Link component usage (next/link)
 * - Script component usage (next/script)
 * - Head component usage (next/head)
 * - Core Web Vitals compliance
 *
 * **USAGE**:
 * ```js
 * import nextConfig from '@repo/eslint-config/next'
 *
 * export default nextConfig
 * ```
 *
 * **AI ITERATION HINTS**:
 * - This config is specifically for Next.js apps only
 * - Library packages should use library.js config instead
 * - FlatCompat enables legacy Next.js configs in modern ESLint
 *
 * **DEPENDENCIES**:
 * - @eslint/eslintrc: FlatCompat for legacy config compatibility
 * - ./library.js: Base configuration for all packages
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Provide Next.js-specific linting rules
 * - Extend base library configuration with framework rules
 * - Enforce Core Web Vitals and performance best practices
 *
 * **Features:**
 * - Next.js framework-specific linting
 * - Core Web Vitals compliance checking
 * - TypeScript support for Next.js patterns
 * - Image and Link component optimization rules
 *
 * **Configuration Details:**
 * - Extends base library configuration
 * - Adds Next.js core-web-vitals rules
 * - Adds Next.js TypeScript-specific rules
 * - Uses FlatCompat for legacy compatibility
 *
 * **Next.js Rules:**
 * - Proper usage of next/image for optimization
 * - Correct next/link implementation
 * - next/script placement and usage
 * - next/head best practices
 * - Performance and accessibility guidelines
 *
 * **Usage Scope:**
 * - Intended for Next.js applications only
 * - Library packages should use base library config
 * - Ensures framework-specific best practices
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
