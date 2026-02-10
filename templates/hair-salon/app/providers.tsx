/**
 * @file apps/web/app/providers.tsx
 * @role runtime
 * @summary Client-only wrapper for global UI providers and error boundaries.
 *
 * @entrypoints
 * - Used by apps/web/app/layout.tsx
 *
 * @exports
 * - default Providers
 *
 * @depends_on
 * - Internal: apps/web/components/ErrorBoundary.tsx
 * - Internal: apps/web/components/Breadcrumbs.tsx
 *
 * @used_by
 * - apps/web/app/layout.tsx
 *
 * @runtime
 * - environment: client
 * - side_effects: global error boundary and breadcrumb rendering
 *
 * @data_flow
 * - inputs: children (page content)
 * - outputs: wrapped client UI
 *
 * @invariants
 * - ErrorBoundary should remain outermost to catch render errors
 *
 * @gotchas
 * - Must remain a client component to use ErrorBoundary
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @opportunities
 * - Add additional client providers inside the ErrorBoundary
 *
 * @verification
 * - Navigate pages and confirm breadcrumbs render and errors are caught
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

'use client';

import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Breadcrumbs from '@/components/Breadcrumbs';

// Client-only shell that wires global ErrorBoundary and breadcrumb trail around all pages
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Breadcrumbs provide global navigation context above page content. */}
        <Breadcrumbs />
        {children}
      </div>
    </ErrorBoundary>
  );
}
