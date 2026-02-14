# Design System

## Design System Overview

This document defines the design system for the hair salon application, ensuring consistency, accessibility, and brand cohesion across all components.

## Typography Scale

### Font Family
```css
/* Primary font family */
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;

/* Secondary font family */
--font-secondary: 'Playfair Display', Georgia, serif;

/* Monospace font */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
```css
/* Fluid typography scale */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);    /* 12px */
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);      /* 14px */
--text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);   /* 16px */
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);      /* 18px */
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);        /* 20px */
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);         /* 24px */
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem);    /* 30px */
--text-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3rem);          /* 36px */
--text-5xl: clamp(3rem, 2.4rem + 3vw, 4rem);                  /* 48px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
--leading-loose: 2;
```

## Spacing System

### Spacing Scale
```css
/* 8pt grid system */
--space-0: 0;          /* 0px */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Component Spacing
```css
/* Consistent component spacing */
--component-padding: var(--space-4);
--component-margin: var(--space-6);
--section-padding: var(--space-12);
--container-padding: var(--space-6);
```

## Color System

### Primary Colors
```css
/* Brand colors */
--color-primary-50: #fef2f2;
--color-primary-100: #fde8e8;
--color-primary-200: #fbd5d5;
--color-primary-300: #f8b4b4;
--color-primary-400: #f38888;
--color-primary-500: #ef4444;  /* Primary brand color */
--color-primary-600: #dc2626;
--color-primary-700: #b91c1c;
--color-primary-800: #991b1b;
--color-primary-900: #7f1d1d;
```

### Neutral Colors
```css
/* Gray scale */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Semantic Colors
```css
/* Success */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-600: #16a34a;

/* Warning */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* Error */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;

/* Info */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
```

### Surface Colors
```css
/* Background and surface colors */
--color-background: #ffffff;
--color-surface: #f9fafb;
--color-surface-alt: #f3f4f6;
--color-border: #e5e7eb;
--color-border-focus: var(--color-primary-500);
--color-text-primary: var(--color-gray-900);
--color-text-secondary: var(--color-gray-600);
--color-text-muted: var(--color-gray-400);
```

## Motion Design

### Animation Durations
```css
/* Animation timing */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
```

### Easing Functions
```css
/* Easing curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Presets
```css
/* Common animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}
```

## Layout Grid

### Container System
```css
/* Responsive containers */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Max widths */
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1280px; }
.container-2xl { max-width: 1536px; }
```

### Grid System
```css
/* 12-column grid system */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
}

/* Responsive grid */
.grid-sm { 
  grid-template-columns: repeat(6, 1fr); 
  gap: var(--space-2);
}

.grid-md { 
  grid-template-columns: repeat(8, 1fr); 
  gap: var(--space-3);
}

.grid-lg { 
  grid-template-columns: repeat(12, 1fr); 
  gap: var(--space-4);
}
```

### Flexbox Utilities
```css
/* Flex utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
```

## Component Design Rules

### Button System
```css
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  line-height: var(--leading-tight);
  border-radius: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  text-decoration: none;
  min-height: 44px; /* WCAG touch target */
}

/* Button variants */
.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  transform: translateY(-1px);
}

/* Button sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  min-height: 36px;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
  min-height: 52px;
}
```

### Form System
```css
/* Form field styles */
.form-field {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background);
  transition: border-color var(--duration-normal) var(--ease-out);
  min-height: 44px;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input:invalid {
  border-color: var(--color-error-500);
}

.form-error {
  font-size: var(--text-sm);
  color: var(--color-error-600);
  margin-top: var(--space-1);
}
```

### Card System
```css
/* Card component */
.card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-content {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

## Accessibility Standards

### Contrast Ratios
```css
/* WCAG AA compliant contrast ratios */
--contrast-ratio-aa: 4.5;  /* Normal text */
--contrast-ratio-aa-large: 3;  /* Large text (18px+) */
--contrast-ratio-aaa: 7;    /* Enhanced contrast */
--contrast-ratio-aaa-large: 4.5; /* Enhanced large text */
```

### Focus Styles
```css
/* Accessible focus indicators */
.focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-500);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### Screen Reader Support
```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Announce dynamic content to screen readers */
.announcement {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

## Responsive Design

### Breakpoint System
```css
/* Mobile-first breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* Media queries */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile-First Patterns
```css
/* Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: var(--space-4);
  font-size: var(--text-base);
}

@media (min-width: 768px) {
  .component {
    /* Tablet and up */
    padding: var(--space-6);
    font-size: var(--text-lg);
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop and up */
    padding: var(--space-8);
    font-size: var(--text-xl);
  }
}
```

## Usage Guidelines

### Component Composition
```typescript
// Example: Using design tokens in React
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Button({ variant = 'primary', size = 'md', children, className }: ButtonProps) {
  const baseClasses = 'btn'
  const variantClasses = `btn-${variant}`
  const sizeClasses = `btn-${size}`
  
  return (
    <button className={cn(baseClasses, variantClasses, sizeClasses, className)}>
      {children}
    </button>
  )
}
```

### Design Token Usage
```css
/* Always use design tokens, never hardcode values */
.correct {
  padding: var(--space-4);
  color: var(--color-primary-500);
  font-size: var(--text-base);
}

.incorrect {
  padding: 16px;  /* Use var(--space-4) */
  color: #ef4444; /* Use var(--color-primary-500) */
  font-size: 16px;   /* Use var(--text-base) */
}
```

This design system ensures consistency, accessibility, and maintainability across all components and pages.
