# Project Structure

## Monorepo Layout

```
├── templates/
│   ├── hair-salon/             # Hair salon template (Next.js 15)
│   └── shared/                 # Shared template components
├── clients/
│   └── example-client/         # Reference client implementation
├── packages/
│   ├── ui/                     # Shared React components
│   ├── utils/                  # Shared utilities
│   └── config/                 # Shared configs (ESLint, TS)
├── docs/                       # Documentation
├── infrastructure/             # Deployment configs
└── scripts/                    # Utility scripts
```

## Template Structure (templates/hair-salon/)

### App Router Organization

```
app/
├── about/
├── blog/
│   └── [slug]/
├── book/
├── contact/
├── gallery/
├── pricing/
├── privacy/
├── search/
├── services/
│   ├── haircuts/
│   ├── coloring/
│   ├── treatments/
│   └── special-occasions/
├── team/
├── terms/
├── api/                        # API routes
├── layout.tsx                  # Root layout
├── page.tsx                    # Home page
└── globals.css                 # Global styles
```

### Feature-Based Architecture

Features are organized in `templates/hair-salon/features/` with consistent structure:

```
features/
└── {feature-name}/
    ├── index.ts                # Public exports
    ├── components/             # Feature components
    ├── lib/                    # Business logic, utilities
    └── api/                    # API handlers (optional)
```

Examples: `analytics/`, `blog/`, `contact/`, `services/`, `search/`, `supabase/`

### Shared Components

```
components/
├── ui/                         # Base UI components (Button, etc.)
└── *.tsx                       # Layout components (Navigation, Footer, etc.)
```

## Shared Packages

### @repo/ui

- Exports reusable React components
- Entry: `src/components/index.ts`
- React as peer dependency

### @repo/utils

- Utility functions (cn for className merging, etc.)
- Entry: `src/index.ts`
- Framework agnostic

### @repo/config

- Shared ESLint and TypeScript configurations
- Consumed by apps and packages

## Path Aliases

```typescript
'@/*'; // Maps to template/client app root (e.g., templates/hair-salon/*)
'@repo/ui'; // Shared UI components
'@repo/utils'; // Shared utilities
```

## Naming Conventions

- **Files:** kebab-case for regular files, PascalCase for React components
- **Components:** PascalCase (e.g., `BlogPostContent.tsx`)
- **Utilities:** camelCase (e.g., `blog-images.ts`)
- **Packages:** `@repo/{package-name}`, `@templates/{template-name}`, `@clients/{client-name}` namespace
- **Features:** kebab-case directories (e.g., `special-occasions/`)

## Configuration Files

- **Root:** Workspace-level configs (turbo.json, tsconfig.base.json)
- **Apps/Packages:** Extend from root configs
- **ESLint:** Flat config format (eslint.config.mjs)
- **TypeScript:** Extends tsconfig.base.json with path mappings

## Import Rules

- Use path aliases (`@/` prefix) for internal app imports
- Use `@repo/*` for shared package imports
- Prefer named exports over default exports
- Keep feature imports isolated (use index.ts for public API)
