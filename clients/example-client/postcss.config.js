/**
 * @file apps/web/postcss.config.js
 * @role config
 * @summary PostCSS configuration for Tailwind and Autoprefixer.
 *
 * @entrypoints
 * - module.exports
 *
 * @exports
 * - PostCSS config
 *
 * @depends_on
 * - External: tailwindcss
 * - External: autoprefixer
 *
 * @used_by
 * - Next.js build pipeline
 *
 * @runtime
 * - environment: build
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
