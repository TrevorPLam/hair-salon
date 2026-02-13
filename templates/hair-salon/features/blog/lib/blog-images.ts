/**
 * @file templates/hair-salon/features/blog/lib/blog-images.ts
 * @role runtime
 * @summary Resolve blog image URLs from public assets.
 *
 * @entrypoints
 * - Used by blog post page
 *
 * @exports
 * - getBlogPostImageUrl
 *
 * @depends_on
 * - Node: fs, path
 *
 * @used_by
 * - templates/hair-salon/app/blog/[slug]/page.tsx
 *
 * @runtime
 * - environment: server
 * - side_effects: filesystem reads
 *
 * @data_flow
 * - inputs: baseUrl, slug
 * - outputs: image URL or null
 *
 * @invariants
 * - Public assets should exist for image URLs
 *
 * @issues
 * - [severity:low] Uses fs; requires Node runtime/static generation.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import fs from 'fs';
import path from 'path';

const BLOG_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'] as const;
const DEFAULT_BLOG_IMAGE = 'og-image.jpg';

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, '');

const hasPublicAsset = (relativePath: string) => {
  const absolutePath = path.join(process.cwd(), 'public', relativePath);
  return fs.existsSync(absolutePath);
};

export const getBlogPostImageUrl = (baseUrl: string, slug: string): string | null => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  // WHY: Prefer per-post assets when available, but fall back to a shared OG image.
  for (const extension of BLOG_IMAGE_EXTENSIONS) {
    const candidate = `blog/${slug}.${extension}`;
    if (hasPublicAsset(candidate)) {
      return `${normalizedBaseUrl}/${candidate}`;
    }
  }

  if (hasPublicAsset(DEFAULT_BLOG_IMAGE)) {
    return `${normalizedBaseUrl}/${DEFAULT_BLOG_IMAGE}`;
  }

  return null;
};
