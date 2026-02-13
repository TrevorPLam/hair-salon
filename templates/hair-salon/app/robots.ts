/**
 * @file templates/hair-salon/app/robots.ts
 * @role runtime
 * @summary Generates robots.txt metadata for crawlers.
 *
 * @entrypoints
 * - Route: /robots.txt (Next.js metadata route)
 *
 * @exports
 * - default robots
 *
 * @depends_on
 * - Internal: templates/hair-salon/lib/env.public.ts
 * - External: next (MetadataRoute)
 *
 * @used_by
 * - Search engine crawlers and Next.js metadata routing
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @data_flow
 * - inputs: public base URL
 * - outputs: robots rules and sitemap URL
 *
 * @invariants
 * - sitemap must match templates/hair-salon/app/sitemap.ts output
 *
 * @gotchas
 * - Disallow list should align with actual private routes
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @opportunities
 * - Add explicit rules per bot if needed
 *
 * @verification
 * - Visit /robots.txt and confirm sitemap URL and rules
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { MetadataRoute } from 'next';
import { getPublicBaseUrl } from '@/lib/env.public';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicBaseUrl();

  // Default policy: allow everything except API/admin paths; keep sitemap in sync with sitemap.ts
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
