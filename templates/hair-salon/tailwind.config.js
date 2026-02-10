/**
 * @file apps/web/tailwind.config.js
 * @role config
 * @summary Tailwind CSS configuration for the web app.
 *
 * @entrypoints
 * - module.exports
 *
 * @exports
 * - Tailwind config
 *
 * @depends_on
 * - External: tailwindcss
 *
 * @used_by
 * - PostCSS/Tailwind build pipeline
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': 'var(--off-white)',
        charcoal: 'var(--charcoal)',
        slate: 'var(--slate)',
        teal: 'var(--teal)',
        'teal-dark': 'var(--teal-dark)',
        'teal-light': 'var(--teal-light)',
      },
    },
  },
  plugins: [],
};
