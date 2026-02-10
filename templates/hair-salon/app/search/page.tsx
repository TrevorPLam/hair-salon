/**
 * @file apps/web/app/search/page.tsx
 * @role runtime
 * @summary Search page that renders the site search experience.
 *
 * @entrypoints
 * - Route: /search
 *
 * @exports
 * - dynamic
 * - metadata
 * - default SearchRoute
 *
 * @depends_on
 * - External: react (Suspense)
 * - External: next (Metadata)
 * - Internal: @/features/search/components/SearchPage
 * - Internal: @/lib/search (getSearchIndex)
 *
 * @used_by
 * - Next.js app router
 *
 * @runtime
 * - environment: server
 * - side_effects: reads search index
 *
 * @data_flow
 * - inputs: search index data
 * - outputs: search UI
 *
 * @invariants
 * - Search index should be generated and current
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @verification
 * - Visit /search and confirm results render.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchPage from '@/features/search/components/SearchPage';
import { getSearchIndex } from '@/lib/search';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Search | Hair Salon Template',
  description: 'Search blog posts, services, and hair care resources across the site.',
};

export default async function SearchRoute() {
  const items = await getSearchIndex();

  return (
    <Suspense>
      <SearchPage items={items} />
    </Suspense>
  );
}
