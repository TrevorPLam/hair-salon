/**
 * @file templates/hair-salon/lib/env.public.ts
 * @role runtime
 * @summary Validates and exposes NEXT_PUBLIC_* environment variables.
 *
 * @entrypoints
 * - validatedPublicEnv
 * - getPublicBaseUrl
 *
 * @exports
 * - validatedPublicEnv
 * - getPublicBaseUrl
 *
 * @depends_on
 * - External: zod
 *
 * @used_by
 * - Metadata routes, layout, and client components
 *
 * @runtime
 * - environment: shared
 * - side_effects: throws on invalid public env
 *
 * @invariants
 * - Only NEXT_PUBLIC_* vars allowed
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Hair Salon Template'),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
});

const publicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});

if (!publicEnv.success) {
  console.error('❌ Invalid public environment variables:', publicEnv.error.flatten().fieldErrors);
  throw new Error('Invalid public environment variables');
}

export const validatedPublicEnv = publicEnv.data;

// Base URL helper for metadata/routes; stays public-only to avoid leaking secrets into client bundles
export const getPublicBaseUrl = () => validatedPublicEnv.NEXT_PUBLIC_SITE_URL;
