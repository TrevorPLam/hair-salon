/**
 * @file apps/web/components/SkipToContent.tsx
 * @role runtime
 * @summary Accessibility skip link to jump to main content.
 *
 * @entrypoints
 * - Used by root layout
 *
 * @exports
 * - default SkipToContent
 *
 * @depends_on
 * - None
 *
 * @used_by
 * - apps/web/app/layout.tsx
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @data_flow
 * - inputs: none
 * - outputs: anchor link
 *
 * @invariants
 * - Target id must exist (#main-content)
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @verification
 * - Tab to skip link and confirm focus jumps to main content.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
