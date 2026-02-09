# Configuration Documentation

This document explains the configuration setup for the Hair Salon Template monorepo and follows industry best practices.

## Overview

This is a **pnpm workspaces monorepo** using modern tooling:

- **pnpm 9.15.4** - Fast, disk-efficient package manager
- **Node.js** >=20.0.0 (enforced via engines field)
- **TypeScript 5.9.3** - Static typing with strict mode
- **ESLint 9** - Flat config system (ESLint v9+)
- **Prettier 3.2.5** - Code formatting
- **Turbo 2.2.3** - Build system and task runner
- **Next.js 15.1.6** - React framework
- **React 19.0.0** - UI library
- **Tailwind CSS 3.4.17** - Utility-first CSS

## Package Structure

### Apps

- **apps/web** - Main hair salon marketing website (Next.js 15 + React 19)

### Packages

- **packages/ui** - Shared React UI component library
  - Exports React components from source (via TypeScript)
  - Declares React/React-DOM as peerDependencies
  - Depends on @repo/utils
  
- **packages/utils** - Shared utility functions
  - No external React dependency
  - Exports utility functions from source
  
- **packages/config** - Shared configuration packages
  - **packages/config/typescript-config/** - Shared TypeScript configurations
    - `base.json` - Base configuration (ES2022, bundler module resolution)
    - `react.json` - React-specific configuration
    - `node.json` - Node.js-specific configuration
  - **packages/config/eslint-config/** - Shared ESLint configurations
    - `library.js` - Base config for libraries
    - `next.js` - Next.js-specific config using flat config format

## Key Configuration Files

### Root Level

#### `package.json`
- Defines workspace structure
- Enforces pnpm 9.15.4 and Node >=20.0.0 via `engines` field
- Root-level dependencies: turbo, prettier, typescript
- Workspace scripts for dev, build, lint, type-check, test

#### `pnpm-workspace.yaml`
- Declares workspace packages: `apps/*` and `packages/*`

#### `.pnpmrc`
- pnpm configuration enforcing strict peer dependencies
- Disables shameful hoist (monorepo best practice)
- Enables auto-install-peers and frozen lock files

#### `tsconfig.json` & `tsconfig.base.json`
- `tsconfig.base.json` - Base configuration with strict mode enabled
- `tsconfig.json` - Root composite config extending base
- Apps and packages extend these configurations

#### `turbo.json`
- Defines task pipeline and caching behavior
- Tasks: `build`, `dev`, `lint`, `type-check`, `test`, `format`
- `build` task depends on `^build` (dependencies first)
- `dev` is persistent and not cached
- `lint` depends on `^lint`

#### `.prettierrc`
- Consistent code formatting across monorepo
- Semi-colons, single quotes, 100 char line width, trailing commas

#### `.prettierignore`
- Excludes node_modules, build outputs, lock files

#### `.eslintignore`
- Excludes build outputs and generated files

#### `docker-compose.yml`
- Development environment with Next.js app on port 3000
- Volume mounts for hot reload
- Uses Dockerfile in apps/web/

#### `apps/web/Dockerfile`
- Multi-stage build (deps → builder → runtime)
- Production-ready Node.js Alpine base
- Outputs Next.js standalone output

### App Level: apps/web

#### `package.json`
- Name: `@repo/web`
- Depends on:
  - **next** 15.1.6 (web framework)
  - **react** 19.0.0, **react-dom** 19.0.0 (UI library)
  - **@repo/ui** workspace:* (internal component library)
  - **@repo/utils** workspace:* (internal utilities)
  - **lucide-react** 0.544.0 (icons)
  - **clsx** 2.1.1 (conditional class names)
  - **tailwind-merge** 2.7.0 (Tailwind utilities)

#### `tsconfig.json`
- Extends `../../tsconfig.base.json`
- Includes path aliases:
  - `@/*` → app root files
  - `@repo/ui` → packages/ui/src
  - `@repo/utils` → packages/utils/src
- Next.js plugin included for better type checking

#### `next.config.js`
- `transpilePackages: ['@repo/ui', '@repo/utils']`
  - Allows Next.js to build these packages from source (TypeScript)
  - Required because these packages export source files, not built output
- `eslint.ignoreDuringBuilds: false` - Enforce linting during build
- `typescript.ignoreBuildErrors: false` - Enforce type checking during build

#### `eslint.config.mjs`
- Flat config format (ESLint v9+)
- Extends Next.js core web vitals and TypeScript configs
- Uses `@eslint/eslintrc` FlatCompat for compatibility

#### `postcss.config.js`
- Tailwind CSS and Autoprefixer plugins

#### `tailwind.config.js`
- Content paths configured to scan app, components, features, and packages/ui
- Extends theme (can be customized)

### Package Level: packages/ui

#### `package.json`
- Name: `@repo/ui`
- **dependencies**: `@repo/utils` (as workspace:*)
- **peerDependencies**: `react ^19.0.0`, `react-dom ^19.0.0`
  - Apps must provide React (prevents duplicate instances)
- **devDependencies**: react, react-dom (for local development), typescript, eslint

#### `tsconfig.json`
- Extends `../../tsconfig.base.json`

### Package Level: packages/utils

#### `package.json`
- Name: `@repo/utils`
- **dependencies**: clsx, tailwind-merge
- **devDependencies**: typescript, eslint

### Package Level: packages/config

#### `package.json`
- Declares workspaces: eslint-config, typescript-config

#### `packages/config/typescript-config/package.json`
- Provides shared TypeScript configurations
- Files: base.json, react.json, node.json
- Peer dependency: typescript 5.9.3

#### `packages/config/eslint-config/package.json` (NEW)
- Provides shared ESLint configurations
- Exports:
  - `.` → library.js (base config)
  - `.next` → next.js (Next.js config)

## Dependency Management Rules

1. **React in @repo/ui**
   - Declared as `peerDependencies` so consuming apps provide React
   - Declared as `devDependencies` for local development/testing
   - Prevents duplicate React instances across the monorepo

2. **Internal packages**
   - Referenced using `workspace:*` protocol
   - Allows pnpm to resolve to local versions immediately
   - Symlinks are created during install

3. **Version pinning**
   - All versions are exact (no caret ^ or tilde ~)
   - Ensures consistent behavior across environments
   - Update entire monorepo together

4. **TypeScript**
   - All packages use v5.9.3 (exact match)
   - Centralized in root devDependencies (can be inherited or referenced)

## Build and Development

### Development

```bash
# Install dependencies
pnpm install

# Start dev server (all packages)
pnpm dev

# Next.js dev server runs on http://localhost:3000
```

### Building

```bash
# Build all packages (respects dependency order via Turbo)
pnpm build

# Build specific package
pnpm -F @repo/web build
```

### Linting and Type Checking

```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm type-check

# Format code
pnpm format
```

## Docker

```bash
# Build and run with docker-compose
docker-compose up -d

# Access on http://localhost:3000
```

## Lock File

- `pnpm-lock.yaml` should be committed to git
- Ensures reproducible installs across environments
- Do NOT manually edit—update via `pnpm install` or `pnpm add`

## Best Practices Applied

1. **workspace:* protocol** - Internal package resolution without version numbers
2. **Exact version pinning** - No caret/tilde ranges in monorepo
3. **peerDependencies** - React in ui package prevents duplication
4. **Strict TypeScript** - noUnusedLocals, noUnusedParameters enabled
5. **ESLint v9 flat config** - Modern, simpler config format
6. **Turbo caching** - Cache build outputs for speed
7. **Prettier integration** - Consistent code formatting
8. **Monorepo documentation** - This guide ensures clarity

## Troubleshooting

**Dependencies not resolving?**
- Delete `node_modules` and `pnpm-lock.yaml`
- Run `pnpm install` fresh
- Check `.pnpmrc` settings

**React version conflicts?**
- Verify @repo/ui exports React as peerDependency
- Ensure apps/web provides compatible React version
- Check `transpilePackages` in next.config.js

**TypeScript errors?**
- Verify tsconfig.json path aliases are correct
- Check that @repo/ui and @repo/utils exports exist
- Run `pnpm type-check` for full diagnostics

**ESLint errors during build?**
- Check eslint.config.mjs syntax
- Verify all config files are in place
- Run `pnpm lint` to diagnose

---

**Last updated:** February 2026
