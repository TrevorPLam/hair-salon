/**
 * @file apps/web/app/sitemap.ts
 * @role runtime
 * @summary Generates sitemap.xml with static routes and blog posts.
 *
 * @entrypoints
 * - Route: /sitemap.xml (Next.js metadata route)
 *
 * @exports
 * - default sitemap
 *
 * @depends_on
 * - Internal: apps/web/lib/env.public.ts
 * - Internal: @/lib/blog (alias; verify target file)
 * - External: next (MetadataRoute)
 *
 * @used_by
 * - Search engines and Next.js metadata routing
 *
 * @runtime
 * - environment: server
 * - side_effects: reads blog posts for dynamic routes
 *
 * @data_flow
 * - inputs: public base URL, blog post list
 * - outputs: sitemap entries
 *
 * @invariants
 * - Static routes should match actual app routes
 *
 * @gotchas
 * - Blog import alias must resolve to the real blog module
 *
 * @issues
 * - [severity:med] @/lib/blog appears unresolved; verify alias mapping and file location.
 *
 * @opportunities
 * - Consider centralizing static routes to avoid drift
 *
 * @verification
 * - Visit /sitemap.xml and confirm static + blog URLs are present
 *
 * @status
 * - confidence: medium
 * - last_audited: 2026-02-09
 */

import { MetadataRoute } from 'next';
// TODO(verify): Ensure @/lib/blog resolves to the blog module in features/blog.
import { getAllPosts } from '@/lib/blog';
import { getPublicBaseUrl } from '@/lib/env.public';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicBaseUrl();

  // Static + dynamic content (blog). Update when adding routes so search/sitemap stay in sync.
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/haircuts`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/coloring`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/treatments`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/special-occasions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  // Blog post pages
  const posts = getAllPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
