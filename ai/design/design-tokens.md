# Design Tokens

## Design Token System

This document defines the design tokens used throughout the hair salon application, providing a single source of truth for all design values.

## Color Tokens

### Primary Brand Colors
```css
/* Primary palette - coral/red theme */
--color-primary-50: #fef2f2;
--color-primary-100: #fde8e8;
--color-primary-200: #fbd5d5;
--color-primary-300: #f8b4b4;
--color-primary-400: #f38888;
--color-primary-500: #ef4444;  /* Main brand color */
--color-primary-600: #dc2626;
--color-primary-700: #b91c1c;
--color-primary-800: #991b1b;
--color-primary-900: #7f1d1d;

/* Primary semantic mappings */
--color-primary: var(--color-primary-500);
--color-primary-hover: var(--color-primary-600);
--color-primary-active: var(--color-primary-700);
--color-primary-foreground: #ffffff;
```

### Neutral Colors
```css
/* Gray scale for text and backgrounds */
--color-neutral-50: #f9fafb;
--color-neutral-100: #f3f4f6;
--color-neutral-200: #e5e7eb;
--color-neutral-300: #d1d5db;
--color-neutral-400: #9ca3af;
--color-neutral-500: #6b7280;
--color-neutral-600: #4b5563;
--color-neutral-700: #374151;
--color-neutral-800: #1f2937;
--color-neutral-900: #111827;

/* Neutral semantic mappings */
--color-background: var(--color-neutral-50);
--color-surface: var(--color-neutral-100);
--color-surface-alt: var(--color-neutral-200);
--color-border: var(--color-neutral-200);
--color-border-hover: var(--color-neutral-300);
--color-text-primary: var(--color-neutral-900);
--color-text-secondary: var(--color-neutral-600);
--color-text-muted: var(--color-neutral-400);
--color-text-inverse: #ffffff;
```

### Semantic Colors
```css
/* Success colors - green theme */
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-200: #bbf7d0;
--color-success-300: #86efac;
--color-success-400: #4ade80;
--color-success-500: #22c55e;  /* Main success color */
--color-success-600: #16a34a;
--color-success-700: #15803d;
--color-success-800: #166534;
--color-success-900: #14532d;

/* Success semantic mappings */
--color-success: var(--color-success-500);
--color-success-hover: var(--color-success-600);
--color-success-foreground: #ffffff;

/* Warning colors - amber theme */
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-200: #fde68a;
--color-warning-300: #fcd34d;
--color-warning-400: #fbbf24;
--color-warning-500: #f59e0b;  /* Main warning color */
--color-warning-600: #d97706;
--color-warning-700: #b45309;
--color-warning-800: #92400e;
--color-warning-900: #78350f;

/* Warning semantic mappings */
--color-warning: var(--color-warning-500);
--color-warning-hover: var(--color-warning-600);
--color-warning-foreground: #ffffff;

/* Error colors - red theme */
--color-error-50: #fef2f2;
--color-error-100: #fee2e2;
--color-error-200: #fecaca;
--color-error-300: #fca5a5;
--color-error-400: #f87171;
--color-error-500: #ef4444;  /* Main error color */
--color-error-600: #dc2626;
--color-error-700: #b91c1c;
--color-error-800: #991b1b;
--color-error-900: #7f1d1d;

/* Error semantic mappings */
--color-error: var(--color-error-500);
--color-error-hover: var(--color-error-600);
--color-error-foreground: #ffffff;

/* Info colors - blue theme */
--color-info-50: #eff6ff;
--color-info-100: #dbeafe;
--color-info-200: #bfdbfe;
--color-info-300: #93c5fd;
--color-info-400: #60a5fa;
--color-info-500: #3b82f6;  /* Main info color */
--color-info-600: #2563eb;
--color-info-700: #1d4ed8;
--color-info-800: #1e40af;
--color-info-900: #1e3a8a;

/* Info semantic mappings */
--color-info: var(--color-info-500);
--color-info-hover: var(--color-info-600);
--color-info-foreground: #ffffff;
```

## Typography Tokens

### Font Families
```css
/* Font family tokens */
--font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;

/* Font family semantic mappings */
--font-family-primary: var(--font-family-sans);
--font-family-secondary: var(--font-family-serif);
--font-family-code: var(--font-family-mono);
```

### Font Sizes
```css
/* Fluid typography scale */
--font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);     /* 14px */
--font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);      /* 16px */
--font-size-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);   /* 18px */
--font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);      /* 20px */
--font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);        /* 24px */
--font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);         /* 30px */
--font-size-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem);    /* 36px */
--font-size-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3rem);          /* 48px */
--font-size-5xl: clamp(3rem, 2.4rem + 3vw, 4rem);                  /* 64px */

/* Font size semantic mappings */
--font-size-caption: var(--font-size-xs);
--font-size-body: var(--font-size-base);
--font-size-heading: var(--font-size-2xl);
--font-size-display: var(--font-size-4xl);
```

### Font Weights
```css
/* Font weight tokens */
--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;

/* Font weight semantic mappings */
--font-weight-body: var(--font-weight-normal);
--font-weight-heading: var(--font-weight-semibold);
--font-weight-emphasis: var(--font-weight-bold);
```

### Line Heights
```css
/* Line height tokens */
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;

/* Line height semantic mappings */
--line-height-body: var(--line-height-normal);
--line-height-heading: var(--line-height-tight);
--line-height-caption: var(--line-height-snug);
```

### Letter Spacing
```css
/* Letter spacing tokens */
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0em;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;

/* Letter spacing semantic mappings */
--letter-spacing-heading: var(--letter-spacing-tight);
--letter-spacing-body: var(--letter-spacing-normal);
--letter-spacing-caption: var(--letter-spacing-wide);
```

## Spacing Tokens

### Spacing Scale
```css
/* 8pt grid system */
--space-0: 0;
--space-px: 1px;
--space-0_5: 0.125rem;   /* 2px */
--space-1: 0.25rem;      /* 4px */
--space-1_5: 0.375rem;   /* 6px */
--space-2: 0.5rem;       /* 8px */
--space-2_5: 0.625rem;   /* 10px */
--space-3: 0.75rem;      /* 12px */
--space-3_5: 0.875rem;   /* 14px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-7: 1.75rem;      /* 28px */
--space-8: 2rem;         /* 32px */
--space-9: 2.25rem;      /* 36px */
--space-10: 2.5rem;      /* 40px */
--space-11: 2.75rem;      /* 44px */
--space-12: 3rem;         /* 48px */
--space-14: 3.5rem;      /* 56px */
--space-16: 4rem;         /* 64px */
--space-20: 5rem;         /* 80px */
--space-24: 6rem;         /* 96px */
--space-28: 7rem;         /* 112px */
--space-32: 8rem;         /* 128px */
--space-36: 9rem;         /* 144px */
--space-40: 10rem;        /* 160px */
--space-44: 11rem;       /* 176px */
--space-48: 12rem;       /* 192px */
--space-52: 13rem;       /* 208px */
--space-56: 14rem;       /* 224px */
--space-60: 15rem;       /* 240px */
--space-64: 16rem;       /* 256px */
--space-72: 18rem;       /* 288px */
--space-80: 20rem;       /* 320px */
--space-96: 24rem;       /* 384px */
```

### Spacing Semantic Mappings
```css
/* Component spacing */
--spacing-component-padding: var(--space-4);
--spacing-component-margin: var(--space-6);
--spacing-section-padding: var(--space-12);
--spacing-container-padding: var(--space-6);
--spacing-grid-gap: var(--space-4);

/* Layout spacing */
--spacing-header-height: 4rem;
--spacing-footer-height: 6rem;
--spacing-sidebar-width: 16rem;
--spacing-content-max-width: 80rem;
```

## Border Radius Tokens

### Border Radius Scale
```css
/* Border radius tokens */
--radius-none: 0;
--radius-sm: 0.125rem;     /* 2px */
--radius-base: 0.25rem;    /* 4px */
--radius-md: 0.375rem;     /* 6px */
--radius-lg: 0.5rem;       /* 8px */
--radius-xl: 0.75rem;      /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;

/* Border radius semantic mappings */
--radius-button: var(--radius-lg);
--radius-card: var(--radius-xl);
--radius-input: var(--radius-base);
--radius-modal: var(--radius-2xl);
--radius-avatar: var(--radius-full);
```

## Shadow Tokens

### Shadow Scale
```css
/* Shadow tokens */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

/* Shadow semantic mappings */
--shadow-card: var(--shadow-base);
--shadow-modal: var(--shadow-xl);
--shadow-dropdown: var(--shadow-lg);
--shadow-button: var(--shadow-sm);
--shadow-focus: 0 0 0 3px rgba(239, 68, 68, 0.1);
```

## Animation Tokens

### Duration Tokens
```css
/* Animation duration tokens */
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;

/* Duration semantic mappings */
--duration-fast: var(--duration-150);
--duration-normal: var(--duration-250);
--duration-slow: var(--duration-350);
--duration-slower: var(--duration-500);
```

### Easing Tokens
```css
/* Easing function tokens */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-back-in: cubic-bezier(0.6, -0.28, 0.735, 0.045);
--ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-back-in-out: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic-out: cubic-bezier(0.05, 0.7, 0.1, 1);
--ease-bounce-out: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Easing semantic mappings */
--ease-default: var(--ease-out);
--ease-enter: var(--ease-out);
--ease-exit: var(--ease-in);
--ease-emphasis: var(--ease-back-out);
```

## Breakpoint Tokens

### Responsive Breakpoints
```css
/* Breakpoint tokens */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* Breakpoint semantic mappings */
--breakpoint-mobile: var(--breakpoint-sm);
--breakpoint-tablet: var(--breakpoint-md);
--breakpoint-desktop: var(--breakpoint-lg);
--breakpoint-wide: var(--breakpoint-xl);
--breakpoint-ultrawide: var(--breakpoint-2xl);
```

## Z-Index Tokens

### Z-Index Scale
```css
/* Z-index tokens */
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-toast: 1080;
--z-index-skip-link: 9999;

/* Z-index semantic mappings */
--z-index-base: 1;
--z-index-content: 2;
--z-index-header: 10;
--z-index-sidebar: 20;
--z-index-overlay: 30;
--z-index-navigation: 40;
```

## Usage Examples

### CSS Custom Properties
```css
/* Using tokens in CSS */
.component {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  padding: var(--spacing-component-padding);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  transition: all var(--duration-normal) var(--ease-default);
}

@media (min-width: var(--breakpoint-md)) {
  .component {
    padding: var(--spacing-component-margin);
  }
}
```

### JavaScript/TypeScript
```typescript
// Using tokens in JavaScript
export const tokens = {
  colors: {
    primary: 'var(--color-primary)',
    background: 'var(--color-background)',
    text: 'var(--color-text-primary)',
  },
  spacing: {
    component: 'var(--spacing-component-padding)',
    section: 'var(--spacing-section-padding)',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  }
}

// React component example
interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Component({ variant = 'primary', size = 'md' }: ComponentProps) {
  const styles = {
    backgroundColor: `var(--color-${variant})`,
    padding: `var(--spacing-${size})`,
    borderRadius: `var(--radius-${size})`,
  }
  
  return <div style={styles}>...</div>
}
```

This token system provides a comprehensive foundation for consistent design implementation across the application.
