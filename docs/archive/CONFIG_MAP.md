# Configuration Map — Hair Salon Template Monorepo

**Complete inventory of all configuration files, their purpose, ownership, and precedence order.**

**Last Updated:** February 9, 2026

---

## Summary

| Category                     | Files                                                      | Owner                 | Precedence                     |
| ---------------------------- | ---------------------------------------------------------- | --------------------- | ------------------------------ |
| **Runtime/Tooling**          | `package.json`, `.npmrc`                                   | pnpm/Node.js          | Root defines all versions      |
| **Package Management**       | `pnpm-workspace.yaml`, `pnpm-lock.yaml`                    | pnpm                  | Workspace config + frozen lock |
| **TypeScript**               | `tsconfig.base.json`, `tsconfig.json`, per-package configs | TypeScript CLI        | Base → extends → overrides     |
| **Linting**                  | `eslint.config.mjs` (3 copies), `.eslintignore`            | ESLint v9             | Per-package > shared config    |
| **Formatting**               | `.prettierrc`, `.prettierignore`                           | Prettier              | Single source of truth (root)  |
| **Build/Task Orchestration** | `turbo.json`                                               | Turbo                 | Defines all task pipelines     |
| **Code Editor**              | `.editorconfig`, `.vscode/*` (optional)                    | EditorConfig standard | Local IDE overrides            |
| **Containerization**         | `Dockerfile`, `docker-compose.yml`                         | Docker                | App-specific build rules       |
| **Documentation**            | `CONFIG.md`, `CONTRIBUTING.md`, `README.md`, etc.          | Team                  | Reference, not enforced        |
| **Git**                      | `.gitignore`, `.gitattributes` (if exists)                 | Git standard          | Repository-wide                |

---

## Detailed Configuration Inventory

### 1. **Runtime & Package Manager Configuration**

#### `package.json` (Root)

- **Path:** `c:\dev\hair-salon\package.json`
- **Category:** Runtime / Package Manager
- **Purpose:**
  - Defines Node.js and pnpm version constraints via `engines` field
  - Declares workspace packages (`apps/*`, `packages/*`)
  - Root-level devDependencies (turbo, prettier, typescript, ESLint plugins)
  - Monorepo scripts (dev, build, lint, type-check, test, format)
- **Owner System:** pnpm + Turbo
- **Precedence:** **HIGHEST** — all apps/packages inherit unless explicitly overridden
- **Key Properties:**
  ```
  engines: { node: ">=20.0.0" }
  packageManager: "pnpm@10.29.2"
  workspaces: ["apps/*", "packages/*"]
  devDependencies: turbo 2.2.3, prettier 3.2.5, typescript 5.7.2, @typescript-eslint/*
  ```
- **Precedence Logic:**
  - Apps/packages can override via their own `package.json`
  - `engines` field enforced by package managers (pnpm respects this)

---

#### `.npmrc`

- **Path:** Root (if exists) — Not found
- **Category:** Package Manager
- **Purpose:** npm/pnpm registry and install behavior config
- **Status:** ⚠️ **MISSING** — Should exist to pin registry
- **Recommended Content:**
  ```
  registry=https://registry.npmjs.org/
  ```

---

#### `pnpm-workspace.yaml`

- **Path:** `c:\dev\hair-salon\pnpm-workspace.yaml`
- **Category:** Package Manager
- **Purpose:** Declares workspace package paths for pnpm
- **Owner System:** pnpm
- **Content:**
  ```yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```
- **Precedence:** Non-overridable; defines workspace structure

---

#### `pnpm-lock.yaml`

- **Path:** `c:\dev\hair-salon\pnpm-lock.yaml`
- **Category:** Package Manager
- **Purpose:** Frozen dependency lock file for reproducible installs
- **Owner System:** pnpm (auto-generated, **MUST be committed**)
- **Precedence:** Used by `pnpm install --frozen-lockfile` in CI/Docker
- **Size:** ~209 KB (reasonable for monorepo)
- **Status:** ✅ Present and committed

---

#### `.pnpmrc` (Optional)

- **Path:** Root — **NOT FOUND**
- **Category:** Package Manager
- **Purpose:** pnpm behavior configuration (peer deps, hoisting, lockfile handling)
- **Status:** ⚠️ **MISSING** — Recommended for strict monorepo settings
- **Recommended Content:**
  ```pnpm
  strict-peer-dependencies=true
  auto-install-peers=true
  shamefully-hoist=false
  prefer-frozen-lockfile=true
  ```

---

### 2. **TypeScript Configuration**

#### `tsconfig.base.json` (Root, Base)

- **Path:** `c:\dev\hair-salon\tsconfig.base.json`
- **Category:** TypeScript
- **Purpose:** Base TypeScript compiler options (extends to all packages)
- **Owner System:** TypeScript
- **Precedence:** **FIRST** — All other tsconfigs extend this
- **Key Options:**
  ```json
  {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true
  }
  ```
- **Inheritance Chain:** `tsconfig.base.json` ← `tsconfig.json` (root) ← per-package configs

---

#### `tsconfig.json` (Root, Composite)

- **Path:** `c:\dev\hair-salon\tsconfig.json`
- **Category:** TypeScript
- **Purpose:** Root composite config for monorepo builds
- **Extends:** `tsconfig.base.json`
- **Precedence:** **SECOND** — Used by Turbo to orchestrate package builds
- **Key Options:**
  ```json
  {
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
      "composite": true,
      "baseUrl": "."
    },
    "files": [],
    "include": [],
    "exclude": ["node_modules", "dist", "build", ".next", "**/*.test.ts", "**/*.test.tsx"]
  }
  ```

---

#### Package-Level TypeScript Configs

| Package            | Path                           | Extends                    | Key Differences                                                                  |
| ------------------ | ------------------------------ | -------------------------- | -------------------------------------------------------------------------------- |
| **apps/web**       | `apps/web/tsconfig.json`       | `../../tsconfig.base.json` | `jsx: preserve`, path aliases (`@/*`, `@repo/ui`, `@repo/utils`), Next.js plugin |
| **packages/ui**    | `packages/ui/tsconfig.json`    | `../../tsconfig.base.json` | `jsx: preserve`, `outDir: ./dist`                                                |
| **packages/utils** | `packages/utils/tsconfig.json` | `../../tsconfig.base.json` | `outDir: ./dist`, no JSX                                                         |

- **Precedence:** Base → Per-package (overrides only what's needed)
- **Conflicts:** ⚠️ Inconsistent `jsx` settings (see Conflicts section)

---

### 3. **ESLint Configuration**

#### `apps/web/eslint.config.mjs`

- **Path:** `c:\dev\hair-salon\apps\web\eslint.config.mjs`
- **Category:** Linting
- **Purpose:** ESLint v9 flat config for Next.js app
- **Owner System:** ESLint v9+ (flat config format)
- **Extends:** `next/core-web-vitals`, `next/typescript`
- **Uses FlatCompat:** For compatibility with legacy extends
- **Key Rules:**
  ```javascript
  [...compat.extends('next/core-web-vitals', 'next/typescript')];
  ```
- **Precedence:** **FIRST-MATCH** — ESLint reads bottom-up; later rules override

---

#### `packages/ui/eslint.config.mjs`

- **Path:** `c:\dev\hair-salon\packages/ui/eslint.config.mjs`
- **Category:** Linting
- **Purpose:** ESLint config for React component library
- **Configuration:** Inline TypeScript rules, **NOT shared**
- **Duplication Alert:** ⚠️ Duplicates TypeScript rule config from packages/utils
- **Key Rules:**
  ```javascript
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  }
  ```

---

#### `packages/utils/eslint.config.mjs`

- **Path:** `c:\dev\hair-salon\packages/utils/eslint.config.mjs`
- **Category:** Linting
- **Purpose:** ESLint config for utility library
- **Configuration:** Similar to packages/ui, **NOT shared**
- **Duplication Alert:** ⚠️ Identical rule setup as packages/ui (no JSX)
- **Key Rules:** Same as packages/ui but without JSX handling

---

#### `.eslintignore`

- **Path:** `c:\dev\hair-salon\.eslintignore`
- **Category:** Linting
- **Purpose:** Excludes directories from linting (improves performance)
- **Owner System:** ESLint
- **Precedence:** Non-overridable; affects all runs
- **Ignores:**
  ```
  node_modules/, dist/, build/, .next/, .turbo/
  coverage/, *.tsbuildinfo, next-env.d.ts
  pnpm-lock.yaml, .env*, .vscode/, .idea/
  ```

---

### 4. **Prettier Configuration**

#### `.prettierrc` (JSON)

- **Path:** `c:\dev\hair-salon\.prettierrc`
- **Category:** Code Formatting
- **Purpose:** Code formatter configuration (single source of truth)
- **Owner System:** Prettier
- **Precedence:** **GLOBAL** — Applied to all files unless ignored
- **Configuration:**
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 100,
    "tabWidth": 2,
    "useTabs": false,
    "arrowParens": "always",
    "endOfLine": "lf"
  }
  ```

---

#### `.prettierignore`

- **Path:** `c:\dev\hair-salon\.prettierignore`
- **Category:** Code Formatting
- **Purpose:** Excludes files from formatting
- **Precedence:** Non-overridable
- **Ignores:** `node_modules/`, `dist/`, `.next/`, `pnpm-lock.yaml`, `.env*`, generated files

---

### 5. **Build & Task Orchestration**

#### `turbo.json`

- **Path:** `c:\dev\hair-salon\turbo.json`
- **Category:** Build System
- **Purpose:** Defines Turbo monorepo task pipeline, caching, and dependencies
- **Owner System:** Turbo 2.2.3
- **Precedence:** **SINGLE SOURCE OF TRUTH** for all task orchestration
- **Key Tasks:**
  | Task | Dependencies | Cache | Persistent |
  |------|--------------|-------|-----------|
  | `build` | `^build` | `.next/**`, `dist/**` | No |
  | `dev` | (none) | None | **Yes** (long-running) |
  | `lint` | `^lint` | None | No |
  | `type-check` | `^type-check` | None | No |
  | `test` | `^build` | `coverage/**` | No |
  | `format` | (none) | None | No |
  | `format:check` | (none) | None | No |

- **Caching Logic:**
  - `build` depends on `^build` (dependencies first, then current package)
  - Cache respects input files and outputs listed
  - Non-cached tasks (lint, format) run fresh every time

---

### 6. **Code Editor & Development**

#### `.editorconfig`

- **Path:** `c:\dev\hair-salon\.editorconfig`
- **Category:** Editor Config
- **Purpose:** IDE-agnostic code style configuration
- **Owner System:** EditorConfig standard
- **Precedence:** Local IDE config overrides this (warning: it's configured at root level but can be overridden)
- **Configuration:**
  ```
  [*] charset = utf-8, indent_size = 2
  [*.md] trim_trailing_whitespace = false
  [*.py] indent_size = 4
  [*.sh] indent_size = 4
  [Makefile] indent_style = tab
  ```
- **Status:** ⚠️ References "ALIGNMENT repository" in comment (outdated)

---

#### `.vscode/settings.json` (Optional)

- **Path:** `.vscode/settings.json` (if tracked)
- **Category:** IDE Configuration
- **Purpose:** VS Code workspace settings (auto-format, linting, debugging)
- **Precedence:** Local machine settings override this
- **Status:** ✅ Recommended to create for consistent dev experience

---

#### `.vscode/extensions.json` (Optional)

- **Path:** `.vscode/extensions.json` (if tracked)
- **Category:** IDE Configuration
- **Purpose:** Recommended VS Code extensions list
- **Precedence:** Non-enforcing; users choose to install
- **Status:** ✅ Recommended to create

---

### 7. **Containerization**

#### `Dockerfile` (app-level)

- **Path:** `c:\dev\hair-salon\apps/web/Dockerfile`
- **Category:** Container
- **Purpose:** Multi-stage Docker build for production Next.js deployment
- **Owner System:** Docker
- **Precedence:** Standalone; overrides image contents
- **Build Stages:**
  1. **deps** — Install all dependencies (pnpm monorepo)
  2. **builder** — Compile Next.js app and workspace packages
  3. **runtime** — Final lightweight image with only necessary files
- **Key Points:**
  ```dockerfile
  FROM node:20-alpine AS deps
  FROM node:20-alpine AS builder
  FROM node:20-alpine AS runtime
  ENV NODE_ENV=production
  EXPOSE 3000
  CMD ["node", "apps/web/server.js"]
  ```
- **Size Optimization:** Multi-stage reduces final image from ~1.5GB to ~150MB

---

#### `docker-compose.yml`

- **Path:** `c:\dev\hair-salon\docker-compose.yml`
- **Category:** Container Orchestration
- **Purpose:** Local development environment with hot reload
- **Owner System:** Docker Compose
- **Precedence:** Overrides other container configs for local dev
- **Services:**
  - **web:** Next.js app on port 3000, volume mounts for hot reload
- **Environment:** `NODE_ENV=development`

---

### 8. **Git Configuration**

#### `.gitignore`

- **Path:** Not explicitly shown, but referenced
- **Category:** Version Control
- **Purpose:** Excludes files from tracking
- **Owner System:** Git standard
- **Should Exclude:**
  ```
  node_modules/, .pnpm-store/, *.pnpm-lock
  dist/, build/, .next/, .turbo/
  .env.local, .env*.local
  .vscode/, .idea/
  *.log, .DS_Store
  ```
- **Status:** Should be verified

---

#### `.gitattributes` (Optional)

- **Path:** Not found
- **Category:** Version Control
- **Purpose:** Line ending and file handling rules (cross-platform)
- **Status:** ✅ Recommended to create for Windows/Mac/Linux compatibility

---

### 9. **Environment & Secrets**

#### `.env.example`

- **Path:** Should exist at root
- **Category:** Environment Configuration
- **Purpose:** Template for environment variables (safe to commit)
- **Owner System:** Team convention
- **Status:** ⚠️ **Status unknown** — Not seen in listing
- **Should Include:**

  ```
  # Analytics
  NEXT_PUBLIC_GA_ID=
  NEXT_PUBLIC_SENTRY_DSN=

  # CMS/Integrations
  # HUBSPOT_PORTAL_ID=
  # HUBSPOT_FORM_ID=

  # Database
  # SUPABASE_URL=
  # SUPABASE_ANON_KEY=
  ```

---

### 10. **CI/CD & Automation**

#### GitHub Actions Workflows

- **Path:** `.github/workflows/*.yml`
- **Category:** CI/CD
- **Status:** ⚠️ **MISSING** — No workflows found
- **Should Include:**
  - Build on PR (lint, type-check, build, test)
  - Publish on tag/release
  - Dependency update automation
  - Security scanning

---

#### Dependabot Config

- **Path:** `.github/dependabot.yml`
- **Category:** Dependency Management
- **Status:** ⚠️ **MISSING** — No automation for dependency updates
- **Recommended:** Enable for auto-PRs on outdated deps

---

#### Renovate Config

- **Path:** `renovate.json`
- **Category:** Dependency Management
- **Status:** ⚠️ **MISSING** — Alternative to Dependabot
- **Recommended:** Use one of Dependabot OR Renovate

---

### 11. **Package-Level Configurations**

#### `apps/web/package.json`

- **Purpose:** Next.js app dependencies and scripts
- **Scripts:** `dev`, `build`, `start`, `lint`, `type-check`, `test`
- **Key Dependencies:**
  - Next.js 15.1.6
  - React 19.0.0, react-dom 19.0.0
  - @repo/ui (workspace:_), @repo/utils (workspace:_)
  - zod 3.22.4, @sentry/nextjs 8.0.0
  - Tailwind CSS 3.4.17
- **Precedence:** Overrides root for Next.js-specific settings

---

#### `apps/web/next.config.js`

- **Purpose:** Next.js runtime configuration
- **Key Settings:**
  ```javascript
  transpilePackages: ['@repo/ui', '@repo/utils'],
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false }
  ```
- **Precedence:** Next.js-specific; overrides `next` package behavior

---

#### `apps/web/tailwind.config.js`

- **Purpose:** Tailwind CSS configuration
- **Content Paths:** `./app/**`, `./components/**`, `./features/**`, `../../packages/ui/src/**`
- **Precedence:** Tailwind-specific; overrides defaults

---

#### `apps/web/postcss.config.js`

- **Purpose:** PostCSS plugin configuration
- **Plugins:** `tailwindcss`, `autoprefixer`
- **Precedence:** Tailwind CSS pipeline

---

#### `packages/ui/package.json`

- **Purpose:** Shared React component library
- **Key Properties:**
  - Exports: `./src/components/index.ts`
  - peerDependencies: React ^19.0.0, react-dom ^19.0.0
  - Dependencies: @repo/utils (workspace:\*), lucide-react 0.344.0
- **Precedence:** Consumed by apps/web (transitive dependencies)

---

#### `packages/utils/package.json`

- **Purpose:** Shared utility functions
- **Key Properties:**
  - Exports: `./src/index.ts`
  - Dependencies: clsx 2.1.1, tailwind-merge 2.6.1
- **Precedence:** Consumed by @repo/ui and apps/web

---

#### `packages/config/package.json`

- **Purpose:** Shared configuration packages workspace
- **Workspaces:** `eslint-config`, `typescript-config`
- **Status:** ⚠️ `eslint-config` claimed in CONFIGURATION_AUDIT.md but not in actual workspaces field

---

### 12. **Documentation**

#### `CONFIG.md`

- **Path:** `c:\dev\hair-salon\CONFIG.md`
- **Purpose:** Detailed configuration reference
- **Owner:** Team documentation
- **Status:** ✅ Exists, comprehensive but **OUTDATED** (version claims differ from actual)

---

#### `CONTRIBUTING.md`

- **Path:** `c:\dev\hair-salon\CONTRIBUTING.md`
- **Purpose:** Development guidelines
- **Status:** ✅ Present and updated for hair-salon project

---

#### `CONFIGURATION_AUDIT.md`

- **Path:** `c:\dev\hair-salon\CONFIGURATION_AUDIT.md`
- **Purpose:** Change log from previous audit
- **Status:** ⚠️ References files that don't exist or are outdated

---

#### `INFRASTRUCTURE.md`

- **Path:** `c:\dev\hair-salon\INFRASTRUCTURE.md`
- **Purpose:** Infrastructure verification checklist
- **Status:** ⚠️ References outdated versions and missing files

---

#### `README.md`

- **Purpose:** Quick start and project overview
- **Status:** Should be verified for current versions

---

---

## Precedence & Conflict Resolution Reference

### ESLint Rule Precedence (Lowest to Highest)

1. ESLint defaults
2. Shared config base (if used)
3. Per-package config file
4. CLI flags (highest — overrides config)

### TypeScript Precedence (Lowest to Highest)

1. TypeScript defaults
2. `tsconfig.base.json` (root)
3. Per-package `tsconfig.json` (extends base)
4. CLI `--compilerOptions` flags

### Prettier Precedence (Lowest to Highest)

1. Prettier defaults
2. `.prettierrc` (root — single source of truth)
3. CLI `--config` flag
4. Editor auto-format settings

### Package Version Precedence (Lowest to Highest)

1. Root `package.json` devDependencies
2. Per-package `package.json` dependencies
3. `engines` field constraints
4. `pnpm-lock.yaml` (frozen pin — highest)

---

## Usage Summary

| Task                     | Config File                          | How It Works                         |
| ------------------------ | ------------------------------------ | ------------------------------------ |
| **Install dependencies** | `package.json`, `pnpm-lock.yaml`     | pnpm reads lock → exact install      |
| **Run lint**             | `eslint.config.mjs`, `.eslintignore` | ESLint per-package config            |
| **Format code**          | `.prettierrc`                        | Global Prettier config               |
| **Type check**           | `tsconfig*.json`                     | tsc follows extends chain            |
| **Build**                | `turbo.json`, per-package scripts    | Turbo orchestrates task order        |
| **Run locally**          | `docker-compose.yml`                 | Docker mounts volumes for hot reload |
| **Deploy**               | `Dockerfile`                         | Multi-stage production build         |
| **Set up IDE**           | `.editorconfig`, `.vscode/*`         | IDE reads and applies settings       |

---

## Next Steps

1. **Verify each config file exists** as listed
2. **Resolve outdated documentation** (versions in CONFIG.md don't match package.json)
3. **Create missing files** (.npmrc, .env.example, CI workflows)
4. **Eliminate duplication** in ESLint configs across packages
5. **Add automation** (Dependabot, GitHub Actions)

See **CONFIG_CONFLICTS.md** and **CONFIG_GAPS.md** for detailed issues and fixes.
