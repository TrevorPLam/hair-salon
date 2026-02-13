/**
 * @file templates/hair-salon/app/loading.tsx
 * @role runtime
 * @summary Global loading UI for route-level suspense boundaries.
 *
 * @entrypoints
 * - Next.js App Router loading state
 *
 * @exports
 * - default Loading
 *
 * @depends_on
 * - External: React
 *
 * @used_by
 * - App Router when route segments are pending
 *
 * @runtime
 * - environment: client
 * - side_effects: none
 *
 * @data_flow
 * - inputs: none
 * - outputs: loading UI
 *
 * @invariants
 * - Spinner and copy should remain minimal to avoid layout shift
 *
 * @gotchas
 * - Uses Tailwind classes; ensure global styles include these utilities
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @opportunities
 * - Align colors with design tokens if palette changes
 *
 * @verification
 * - Trigger suspense (slow network) and confirm loading UI renders
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner placeholder shown during Suspense boundaries */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading copy keeps layout stable while pages hydrate */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we prepare your content</p>
      </div>
    </div>
  );
}
