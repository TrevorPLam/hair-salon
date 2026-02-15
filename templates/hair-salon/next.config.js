/** @type {import('next').NextConfig} */
const nextConfig = {
  // [Task 0.16] Re-enabled standalone output — required for Docker deployments.
  // Standalone output bundles all dependencies into .next/standalone for minimal container size.
  // Note: If developing locally on Windows with symlink issues, use `next dev` (which ignores this).
  output: 'standalone',
  // [Task 1.5.4] Suppress X-Powered-By header to avoid tech stack disclosure
  poweredByHeader: false,
  // Include all workspace packages that need transpilation
  transpilePackages: ['@repo/ui', '@repo/utils', '@repo/infra', '@repo/integrations-analytics', '@repo/integrations-hubspot', '@repo/integrations-supabase', '@repo/shared'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
