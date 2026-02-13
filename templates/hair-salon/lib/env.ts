/**
 * @file templates/hair-salon/lib/env.ts
 * @role runtime
 * @summary Server-only environment validation and access helpers.
 *
 * @entrypoints
 * - validatedEnv
 * - getNodeEnvironment
 * - isProduction
 * - isDevelopment
 * - isTest
 *
 * @exports
 * - validatedEnv and environment helpers
 *
 * @depends_on
 * - External: zod
 * - Internal: server-only
 *
 * @used_by
 * - server actions, adapters, and middleware
 *
 * @runtime
 * - environment: server
 * - side_effects: throws on invalid env
 *
 * @invariants
 * - Only server-safe vars included
 *
 * @issues
 * - [severity:low] Requires restart to pick up env changes.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import 'server-only';

import { z } from 'zod';

/**
 * Environment variable schema with validation rules.
 *
 * **Public Variables (NEXT_PUBLIC_*):**
 * - Exposed to browser (accessible in client components)
 * - Never include secrets or API keys
 * - Used for site URL, analytics IDs, feature flags
 *
 * **Server-Only Variables:**
 * - Only accessible in server components and API routes
 * - Use for API keys, database credentials, secrets
 * - Never exposed to browser
 *
 * **Required vs Optional:**
 * - Optional: Has `.optional()` or `.default()` (graceful fallback)
 * - Required: No fallback (throws error if missing)
 *
 * **Validation Rules:**
 * - URLs validated with `.url()` (must be valid HTTP/HTTPS URL)
 * - Emails validated with `.email()` (must be valid email format)
 * - Enums validated with `.enum()` (must match allowed values)
 */
const createEnvSchema = () =>
  z.object({
    /**
     * Public site URL (no trailing slash).
     * Used for absolute URLs in sitemap, OG tags, canonical URLs.
     *
     * @default 'http://localhost:3000' (development)
     * @example 'https://hairsalon.example.com' (production)
     */
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

    /**
     * Public site name for branding.
     * Used in page titles, OG tags, meta descriptions.
     *
     * @default 'Hair Salon Template'
     */
    NEXT_PUBLIC_SITE_NAME: z.string().default('Hair Salon Template'),

    /**
     * Analytics tracking ID (optional).
     * Used by lib/analytics.ts for event tracking.
     *
     * @optional
     * @example 'G-XXXXXXXXXX' (Google Analytics)
     * @example 'vercel-analytics' (Vercel Analytics)
     */
    NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),

    /**
     * Node environment (development, production, test).
     *
     * @default 'development'
     */
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    /**
     * Upstash Redis REST URL for distributed rate limiting (optional).
     * If not set, falls back to in-memory rate limiting (single instance only).
     *
     * @optional
     * @see {@link https://upstash.com/docs/redis/overall/getstarted Upstash Redis}
     */
    UPSTASH_REDIS_REST_URL: z.string().optional(),

    /**
     * Upstash Redis REST token for distributed rate limiting (optional).
     * Must be set together with UPSTASH_REDIS_REST_URL.
     *
     * @optional
     */
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    /**
     * Supabase project URL (optional at build time; validated at runtime point of use).
     * Used for server-side lead storage.
     *
     * @example 'https://xyzcompany.supabase.co'
     */
    SUPABASE_URL: z.string().trim().url().optional(),

    /**
     * Supabase service role key (optional at build time; validated at runtime point of use).
     * Grants elevated access; never expose to client.
     */
    SUPABASE_SERVICE_ROLE_KEY: z.string().trim().min(1).optional(),

    /**
     * HubSpot private app token (optional at build time; validated at runtime point of use).
     * Used for CRM sync.
     */
    HUBSPOT_PRIVATE_APP_TOKEN: z.string().trim().min(1).optional(),

    /**
     * Mindbody API key (optional, server-only).
     * Used for external booking provider integration.
     */
    MINDBODY_API_KEY: z.string().trim().min(1).optional(),

    /**
     * Mindbody business ID (optional, server-only).
     * Used for external booking provider integration.
     */
    MINDBODY_BUSINESS_ID: z.string().trim().min(1).optional(),

    /**
     * Vagaro API key (optional, server-only).
     * Used for external booking provider integration.
     */
    VAGARO_API_KEY: z.string().trim().min(1).optional(),

    /**
     * Vagaro business ID (optional, server-only).
     * Used for external booking provider integration.
     */
    VAGARO_BUSINESS_ID: z.string().trim().min(1).optional(),

    /**
     * Square API key (optional, server-only).
     * Used for external booking provider integration.
     */
    SQUARE_API_KEY: z.string().trim().min(1).optional(),

    /**
     * Square business ID (optional, server-only).
     * Used for external booking provider integration.
     */
    SQUARE_BUSINESS_ID: z.string().trim().min(1).optional(),
  });

const envSchema = createEnvSchema();

/**
 * Validate environment variables at module load time.
 *
 * **Behavior:**
 * - Reads from process.env
 * - Validates against envSchema
 * - Applies defaults for optional variables
 * - Throws descriptive error on validation failure
 *
 * **Error Handling:**
 * - Logs field-specific errors to console
 * - Throws error to stop application startup
 * - Prevents running with invalid configuration
 *
 * **Example Error Output:**
 * ```
 * ❌ Invalid environment variables: {
 *   NEXT_PUBLIC_SITE_URL: ['Invalid URL'],
 *   SUPABASE_URL: ['Invalid url']
 * }
 * ```
 */
const env = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  NODE_ENV: process.env.NODE_ENV,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  HUBSPOT_PRIVATE_APP_TOKEN: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  MINDBODY_API_KEY: process.env.MINDBODY_API_KEY,
  MINDBODY_BUSINESS_ID: process.env.MINDBODY_BUSINESS_ID,
  VAGARO_API_KEY: process.env.VAGARO_API_KEY,
  VAGARO_BUSINESS_ID: process.env.VAGARO_BUSINESS_ID,
  SQUARE_API_KEY: process.env.SQUARE_API_KEY,
  SQUARE_BUSINESS_ID: process.env.SQUARE_BUSINESS_ID,
});

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

/**
 * Validated environment variables with type safety.
 *
 * **Type Safety:**
 * - TypeScript knows which variables are required vs optional
 * - Autocomplete available for all variables
 * - Compile-time checking for typos
 *
 * **Usage:**
 * ```typescript
 * import { validatedEnv } from './env'
 *
 * // Required variables (always string)
 * const siteUrl = validatedEnv.NEXT_PUBLIC_SITE_URL
 *
 * // Optional variables (string | undefined)
 * const hubspotToken = validatedEnv.HUBSPOT_PRIVATE_APP_TOKEN
 * ```
 */
export const validatedEnv = env.data;

/**
 * Production safety check: Enforce Upstash Redis in production (Issue #005 - ENFORCED).
 * Skipped during `next build` (NEXT_PHASE=phase-production-build) since these
 * are runtime-only concerns.
 *
 * @throws {Error} If Redis not configured in production runtime
 */
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
if (validatedEnv.NODE_ENV === 'production' && !isBuildPhase) {
  if (!validatedEnv.UPSTASH_REDIS_REST_URL || !validatedEnv.UPSTASH_REDIS_REST_TOKEN) {
    console.error('❌ Production Error: Upstash Redis required for distributed rate limiting');
    console.error('Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production');
    console.error('\nWhy this is required:');
    console.error('- In-memory rate limiting only works in single-instance deployments');
    console.error('- Multi-instance production needs distributed rate limiting');
    console.error('- Without Redis, rate limits can be bypassed across instances');
    console.error('\nHow to fix:');
    console.error('1. Create Upstash Redis database at https://upstash.com');
    console.error('2. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
    console.error('3. Redeploy application');
    throw new Error('Upstash Redis required in production for rate limiting');
  }
}

/**
 * ```typescript
 * import { validatedEnv } from './env'
 *
 * // Required variables (always string)
 * const siteUrl = validatedEnv.NEXT_PUBLIC_SITE_URL
 *
 * // Required variables (always string)
 * const hubspotToken = validatedEnv.HUBSPOT_PRIVATE_APP_TOKEN
 * ```
 */
/**
 * Get current Node environment.
 *
 * @returns 'development' | 'production' | 'test'
 */
export const getNodeEnvironment = () => process.env.NODE_ENV || validatedEnv.NODE_ENV;

/**
 * Check if running in production.
 *
 * **Use cases:**
 * - Enable production-only features (analytics, Sentry)
 * - Apply production-only headers (HSTS)
 * - Hide dev-only logging
 *
 * @returns true if NODE_ENV === 'production'
 */
export const isProduction = () => getNodeEnvironment() === 'production';

/**
 * Check if running in development.
 *
 * **Use cases:**
 * - Enable dev-only logging
 * - Show dev-only UI (debug panels)
 * - Skip external API calls (use mocks)
 *
 * @returns true if NODE_ENV === 'development'
 */
export const isDevelopment = () => getNodeEnvironment() === 'development';

/**
 * Check if running in test mode.
 *
 * **Use cases:**
 * - Disable external API calls in tests
 * - Use test-specific configuration
 * - Skip analytics tracking
 *
 * @returns true if NODE_ENV === 'test'
 */
export const isTest = () => getNodeEnvironment() === 'test';
