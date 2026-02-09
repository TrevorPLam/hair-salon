# Complete Configuration & Dependency Audit

**Date:** February 9, 2026  
**Project:** hair-salon-template (Monorepo)

---

## 1. ROOT LEVEL CONFIGURATION

### Package Manager
- **Tool:** pnpm v9.15.4 (specified in package.json)
- **Workspace Config:** pnpm-workspace.yaml
  - Workspaces: `apps/*`, `packages/*`

### Root package.json
- **Name:** hair-salon-template
- **Version:** 1.0.0
- **Dependencies:**
  - turbo: `^1.10.0`
  - prettier: `^3.2.5`
  - typescript: `^5.0.0`

### Build System
- **Tool:** Turborepo
- **Config:** turbo.json
- **Pipeline Tasks:** dev, build, lint, type-check, test, format, format:check
- **Note:** Test task references jest.config.js but none exists

### TypeScript (Root)
- **Config Files:**
  - tsconfig.json (composite root, empty files/include)
  - tsconfig.base.json (shared base config)
- **Compiler Options:**
  - target: ES2022
  - module: ESNext
  - moduleResolution: bundler
  - jsx: preserve
  - strict: true
  - noUncheckedIndexedAccess: true

### Code Quality
- **Prettier:** v3.2.5
  - Config: .prettierrc.js
  - printWidth: 80, tabWidth: 2, semi: true, singleQuote: false
- **EditorConfig:** .editorconfig
  - indent: 2 spaces, lf line endings
- **Markdown Lint:** .markdownlint.json

### Docker
- **Config:** docker-compose.yml
- **Version:** 3.8
- **Service:** web (port 3000)
- **Note:** References Dockerfile in apps/web (not verified if exists)

---

## 2. APPS/WEB CONFIGURATION

### package.json
- **Name:** @repo/web
- **Framework:** Next.js
- **Dependencies:**
  - next: `^14.0.0`
  - react: `^18.0.0`
  - react-dom: `^18.0.0`
  - lucide-react: `^0.263.1`
  - clsx: `^2.0.0`
  - tailwind-merge: `^2.0.0`
  - @repo/ui: `workspace:*`
- **DevDependencies:**
  - @types/node: `^20.0.0`
  - @types/react: `^18.0.0`
  - @types/react-dom: `^18.0.0`
  - typescript: `^5.0.0`
  - tailwindcss: `^3.3.0`
  - autoprefixer: `^10.4.16`
  - postcss: `^8.4.31`
  - eslint: `^8.0.0`
  - eslint-config-next: `^14.0.0`

### Next.js Config
- **File:** next.config.js
- **transpilePackages:** ['@repo/ui', '@repo/utils']

### TypeScript Config
- **File:** tsconfig.json
- **Extends:** ../../tsconfig.base.json
- **Paths:**
  - @/*: ./*
  - @repo/ui: ../../packages/ui
  - @repo/utils: ../../packages/utils
- **Plugins:** next
- **allowJs:** true
- **noEmit:** true
- **incremental:** true

### Tailwind Config
- **File:** tailwind.config.js
- **Content Paths:**
  - ./pages/**/*.{js,ts,jsx,tsx,mdx}
  - ./components/**/*.{js,ts,jsx,tsx,mdx}
  - ./app/**/*.{js,ts,jsx,tsx,mdx}
  - ../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}

### PostCSS Config
- **File:** postcss.config.js (NEWLY CREATED)
- **Plugins:** tailwindcss, autoprefixer

### ESLint Config
- **File:** .eslintrc.json (NEWLY CREATED)
- **Extends:** next/core-web-vitals

---

## 3. PACKAGES/CONFIG

### package.json
- **Name:** @repo/config
- **Workspaces:** typescript-config (ONLY)
- **Note:** Originally referenced eslint-config and jest-config but they don't exist

### packages/config/typescript-config
- **Name:** @repo/typescript-config
- **Files:** base.json, react.json, node.json
- **Peer Dependencies:** typescript ^5.0.0
- **Configs:**
  - base.json: ES2022, ESNext, bundler resolution, strict mode
  - react.json: extends base, jsx: preserve
  - node.json: extends base, NodeNext module resolution

---

## 4. PACKAGES/UI

### package.json
- **Name:** @repo/ui
- **Main:** ./src/components/index.ts
- **Dependencies:**
  - @repo/utils: `workspace:*`
  - react: `^18.0.0`
- **DevDependencies:**
  - @types/react: `^18.0.0`
  - typescript: `^5.0.0`
  - eslint: `^8.0.0`
  - @typescript-eslint/eslint-plugin: `^6.0.0`
  - @typescript-eslint/parser: `^6.0.0`

### TypeScript Config
- **File:** tsconfig.json (NEWLY CREATED)
- **Extends:** ../../tsconfig.base.json
- **jsx:** react-jsx
- **outDir:** ./dist
- **rootDir:** ./src

### ESLint Config
- **File:** .eslintrc.json (NEWLY CREATED)
- **Parser:** @typescript-eslint/parser
- **Extends:** eslint:recommended, plugin:@typescript-eslint/recommended
- **Plugins:** @typescript-eslint

---

## 5. PACKAGES/UTILS

### package.json
- **Name:** @repo/utils
- **Main:** ./src/index.ts
- **Dependencies:**
  - clsx: `^2.0.0`
  - tailwind-merge: `^2.0.0`
- **DevDependencies:**
  - typescript: `^5.0.0`
  - eslint: `^8.0.0`
  - @typescript-eslint/eslint-plugin: `^6.0.0`
  - @typescript-eslint/parser: `^6.0.0`

### TypeScript Config
- **File:** tsconfig.json (NEWLY CREATED)
- **Extends:** ../../tsconfig.base.json
- **outDir:** ./dist
- **rootDir:** ./src

### ESLint Config
- **File:** .eslintrc.json (NEWLY CREATED)
- **Parser:** @typescript-eslint/parser
- **Extends:** eslint:recommended, plugin:@typescript-eslint/recommended
- **Plugins:** @typescript-eslint

---

## 6. CRITICAL ISSUES IDENTIFIED

### Version Specification Issues
1. **Overly broad version ranges:** All dependencies use `^` which allows minor version updates
2. **No lock file visible:** Cannot verify actual installed versions
3. **Inconsistent React versions:** React specified as `^18.0.0` (could be 18.0.0 - 18.9.9)

### Missing Configurations
1. ~~ESLint configs~~ (NOW CREATED)
2. ~~PostCSS config~~ (NOW CREATED)
3. ~~TypeScript configs for packages~~ (NOW CREATED)
4. Jest configuration (referenced in turbo.json but doesn't exist)
5. Dockerfile (referenced in docker-compose.yml)

### Workspace Issues
1. **@repo/ui dependency:** Added to apps/web but backup shows it wasn't there originally
2. **packages/config workspaces:** References non-existent eslint-config and jest-config

### Potential Compatibility Issues
1. **Turbo v1.10.0:** Very old version (current is 2.x)
2. **Next.js v14.0.0:** Specified as ^14.0.0 (14.0.0 was released Nov 2023)
3. **ESLint v8.x:** ESLint 9.x is current
4. **lucide-react v0.263.1:** Specific old version
5. **TypeScript moduleResolution: bundler:** Requires TypeScript 5.0+

### Configuration Conflicts
1. **TypeScript jsx setting:**
   - packages/ui: react-jsx
   - apps/web: preserve (correct for Next.js)
   - base configs: preserve
2. **Module resolution:**
   - Most configs: bundler
   - node.json: NodeNext (inconsistent)

---

## 7. NEXT STEPS REQUIRED

1. Research current stable versions for all dependencies
2. Check compatibility matrix for:
   - Next.js 14.x + React 18.x + TypeScript 5.x
   - Turbo 1.x vs 2.x breaking changes
   - ESLint 8.x vs 9.x
   - pnpm 9.x compatibility
3. Verify workspace dependency resolution
4. Create missing Jest configuration or remove from turbo.json
5. Verify Dockerfile exists or remove docker-compose.yml


---

## 8. CURRENT VERSION RESEARCH (February 2026)

### Package Manager
- **pnpm 9.15.4:** CURRENT (released late 2024)
  - Status: Stable and actively maintained
  - Known Issues: Some workspace dependency resolution edge cases in v9
  - Recommendation: KEEP - this is a recent stable version

### Build Tools
- **Turborepo:**
  - Current in project: v1.10.0 (released ~2022)
  - Latest stable: v2.2+ (as of Feb 2026)
  - **CRITICAL:** Turborepo 2.0 was released June 2024 with major breaking changes
  - Breaking changes include:
    - New terminal UI and log streaming
    - Changed cache behavior
    - Updated configuration schema
    - Performance improvements (3.5x faster full builds, 8x faster incremental)
  - Recommendation: **MAJOR UPGRADE NEEDED** but requires migration planning

### JavaScript/TypeScript
- **TypeScript:**
  - Current in project: ^5.0.0 (could be 5.0.0 - 5.9.x)
  - Latest stable: TypeScript 5.9 (released August 2025)
  - TypeScript 6.0/7.0 planned for early 2026 (native Go implementation)
  - Recommendation: **UPDATE to 5.9.x** before 6.0 drops, pin to ~5.9.0

### React Ecosystem
- **React:**
  - Current in project: ^18.0.0 (could be 18.0.0 - 18.9.x)
  - Latest stable: React 18.3.x (stable), React 19.2 (released Dec 2024)
  - React 19 includes: Actions, improved Server Components, new hooks
  - Next.js 14 requires React 18.2.0 minimum
  - Recommendation: **UPDATE to 18.3.x** (latest 18.x), consider React 19 migration

- **Next.js:**
  - Current in project: ^14.0.0 (Nov 2023 release)
  - Latest stable: Next.js 16.1 (released ~Jan 2026)
  - Next.js 15 and 16 include major changes:
    - Turbopack as default bundler
    - React 19 support
    - Cache Components and use cache directive
    - Partial Pre-Rendering (PPR) stable
  - Recommendation: **MAJOR UPGRADE NEEDED** - 14.0.0 is 2+ years old

### Styling
- **Tailwind CSS:**
  - Current in project: ^3.3.0 (released ~2023)
  - Latest stable: Tailwind CSS v4.0 (released Jan 2025)
  - **CRITICAL:** Tailwind v4 is a complete rewrite
  - Breaking changes:
    - 100x faster incremental builds
    - New CSS-first configuration (@theme directive)
    - Dynamic utility values
    - Requires migration from v3 config format
    - Some users report 37% larger CSS bundles
  - v3 LTS available for legacy support
  - Recommendation: **STAY ON v3.4.x** until v4 stabilizes, or plan major migration

- **PostCSS:** v8.4.31 (current is 8.4.x) - OK
- **Autoprefixer:** v10.4.16 (current is 10.4.x) - OK

### Linting
- **ESLint:**
  - Current in project: ^8.0.0 (could be 8.0.0 - 8.57.x)
  - Latest stable: ESLint 10.0.0 (released Feb 2026)
  - ESLint 9.0 (April 2024): Flat config system mandatory
  - ESLint 10.0 (Feb 2026): Removed eslintrc completely
  - **CRITICAL:** .eslintrc.json format is DEPRECATED
  - Recommendation: **MAJOR UPGRADE NEEDED** - migrate to flat config (eslint.config.js)

- **@typescript-eslint:**
  - Current in project: ^6.0.0
  - Latest: v8.x (for ESLint 9+)
  - Recommendation: **UPDATE to v8.x** with ESLint migration

### Icons
- **lucide-react:**
  - Current in project: v0.263.1 (very old, ~2023)
  - Latest stable: v0.544.x (as of Feb 2026)
  - No major breaking changes, just new icons added
  - Recommendation: **UPDATE to latest** - safe upgrade

### Utilities
- **clsx:** v2.0.0 - Current stable is 2.x - OK
- **tailwind-merge:** v2.0.0 - Current stable is 2.x - OK

---

## 9. COMPATIBILITY MATRIX

### Current Stack Compatibility Issues

| Package | Current | Latest | Compatible? | Issue |
|---------|---------|--------|-------------|-------|
| pnpm | 9.15.4 | 9.15.x | ✅ YES | None |
| turbo | 1.10.0 | 2.2.x | ❌ NO | Major version behind, breaking changes |
| typescript | ^5.0.0 | 5.9.x | ⚠️ PARTIAL | Should pin to specific 5.x version |
| react | ^18.0.0 | 18.3.x / 19.2 | ⚠️ PARTIAL | Too broad range, should update |
| react-dom | ^18.0.0 | 18.3.x / 19.2 | ⚠️ PARTIAL | Must match react version |
| next | ^14.0.0 | 16.1 | ❌ NO | 2 major versions behind |
| eslint | ^8.0.0 | 10.0.0 | ❌ NO | Config format deprecated |
| eslint-config-next | ^14.0.0 | 16.x | ⚠️ PARTIAL | Should match Next.js version |
| tailwindcss | ^3.3.0 | 4.0 / 3.4 LTS | ⚠️ PARTIAL | v4 has breaking changes |
| lucide-react | 0.263.1 | 0.544.x | ⚠️ PARTIAL | Very outdated but compatible |
| @types/react | ^18.0.0 | 18.3.x / 19.x | ⚠️ PARTIAL | Should match react version |
| @types/node | ^20.0.0 | 22.x | ⚠️ PARTIAL | Node 20 is LTS, OK but could update |

### Version Range Issues

**CRITICAL PROBLEM:** All dependencies use `^` (caret) ranges which allow:
- Minor version updates (18.0.0 → 18.9.9)
- Patch version updates (18.0.0 → 18.0.99)

This creates **non-deterministic builds** across environments even with a lock file.

**Example Issues:**
- `"react": "^18.0.0"` could install 18.0.0, 18.2.0, or 18.3.1
- `"next": "^14.0.0"` could install 14.0.0 or 14.2.15
- Different team members may have different versions

---

## 10. RECOMMENDED MIGRATION PATH

### Phase 1: Stabilize Current Stack (IMMEDIATE)
1. **Pin all dependency versions** - Remove `^` and `~` prefixes
2. **Update within current major versions:**
   - typescript: `5.9.3` (latest 5.x)
   - react + react-dom: `18.3.1` (latest 18.x)
   - @types/react: `18.3.12`
   - @types/react-dom: `18.3.1`
   - next: `14.2.18` (latest 14.x)
   - eslint-config-next: `14.2.18`
   - tailwindcss: `3.4.17` (latest 3.x LTS)
   - lucide-react: `0.544.0`
   - @types/node: `20.17.9` (latest Node 20 LTS types)

### Phase 2: ESLint Migration (HIGH PRIORITY)
1. Migrate from .eslintrc.json to eslint.config.js (flat config)
2. Update eslint to 9.x or 10.x
3. Update @typescript-eslint packages to 8.x
4. Test all lint rules still work

### Phase 3: Turborepo Upgrade (MEDIUM PRIORITY)
1. Review Turborepo 2.0 migration guide
2. Update turbo.json configuration schema
3. Test all pipeline tasks
4. Update to turbo 2.2.x

### Phase 4: Next.js Major Upgrade (PLAN CAREFULLY)
1. Upgrade Next.js 14 → 15 → 16
2. May require React 19 upgrade
3. Review breaking changes for each version
4. Test all routes, API endpoints, middleware

### Phase 5: Tailwind v4 (OPTIONAL - EVALUATE)
1. Assess if v4 benefits outweigh migration cost
2. Consider staying on v3 LTS
3. If migrating, rewrite tailwind.config.js to CSS-first format

---

## 11. CRITICAL ACTIONS REQUIRED

### Before ANY npm/pnpm install:
1. ✅ Create backup of current package.json files
2. ✅ Document current working state
3. ✅ Pin all versions (remove ^ and ~)
4. ✅ Run pnpm install to generate fresh lock file
5. ✅ Test build process works
6. ✅ Commit lock file to version control

### Immediate Fixes Needed:
1. **ESLint configuration is using DEPRECATED format**
   - .eslintrc.json will not work with ESLint 10+
   - Must migrate to eslint.config.js

2. **Turbo version is 2 years old**
   - Missing performance improvements
   - May have security vulnerabilities

3. **Next.js is 2 major versions behind**
   - Missing critical features and security patches
   - React 19 support unavailable

4. **Version ranges are too broad**
   - Non-deterministic builds
   - Potential for breaking changes in CI/CD

---

## 12. RISK ASSESSMENT

### HIGH RISK (Address Immediately)
- ❌ ESLint using deprecated config format
- ❌ Turborepo 2 years out of date
- ❌ Broad version ranges causing non-deterministic builds
- ❌ Next.js 2 major versions behind

### MEDIUM RISK (Address Soon)
- ⚠️ React 18.0.0 range too broad (should be 18.3.x)
- ⚠️ TypeScript 5.0.0 range too broad (should be 5.9.x)
- ⚠️ lucide-react very outdated (100+ versions behind)

### LOW RISK (Monitor)
- ℹ️ Tailwind CSS v3.3 (v3.4 LTS available, v4 has breaking changes)
- ℹ️ Node types could be updated to v22
- ℹ️ PostCSS and Autoprefixer slightly behind

---

## 13. FINAL RECOMMENDATIONS

**DO NOT RUN `pnpm install` UNTIL:**
1. All package.json files have pinned versions (no ^ or ~)
2. Migration plan is approved
3. Backup/branch is created

**RECOMMENDED IMMEDIATE ACTION:**
Create a new branch and update all package.json files with pinned versions from Phase 1, then test thoroughly before proceeding with major upgrades.

**ESTIMATED EFFORT:**
- Phase 1 (Stabilize): 2-4 hours
- Phase 2 (ESLint): 4-8 hours
- Phase 3 (Turbo): 2-4 hours
- Phase 4 (Next.js): 16-40 hours (complex)
- Phase 5 (Tailwind v4): 8-16 hours (optional)

**Total: 32-72 hours of development + testing time**
