/**
 * @file templates/hair-salon/next.config.js
 * @role config
 * @summary Next.js build configuration for the web app.
 *
 * @entrypoints
 * - nextConfig
 *
 * @exports
 * - module.exports
 *
 * @depends_on
 * - External: next
 *
 * @used_by
 * - Next.js build and dev server
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/utils'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
