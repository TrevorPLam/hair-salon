/**
 * @file templates/hair-salon/tailwind.config.js
 * @summary Tailwind CSS configuration for the hair salon template.
 *
 * Uses the shared preset from @repo/config for semantic color tokens.
 * Site-specific palette is defined via CSS variables in globals.css.
 */

const sharedPreset = require('@repo/config/tailwind-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};
