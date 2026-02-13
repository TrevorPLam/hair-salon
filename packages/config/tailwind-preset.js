/**
 * Shared Tailwind CSS preset for all marketing website templates.
 *
 * Maps semantic utility classes (bg-primary, text-foreground, etc.) to CSS
 * custom properties. Each site defines its own palette by setting these
 * variables in globals.css — components never change, only the variables.
 *
 * Usage in a template's tailwind.config.js:
 *   const sharedPreset = require('@repo/config/tailwind-preset');
 *   module.exports = { presets: [sharedPreset], content: [...] };
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },

        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },

        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },

        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },

        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },

        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },

      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        md: 'calc(var(--radius) + 2px)',
        sm: 'calc(var(--radius) - 2px)',
      },

      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
    },
  },
};
