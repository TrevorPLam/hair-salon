# PATCH PLAN — Configuration Hardening

**Specific changes to implement, in priority order.**

**Date:** February 9, 2026

---

## Overview

This document lists all patches needed to harden the configuration. Patches are grouped by phase and include exact file paths, before/after content, and risk assessment.

## Phase 1: Critical Security & Quality Gates (1-2 hours)

### Patch 1.1: Update CONFIG.md Version Claims

**File:** [CONFIG.md](CONFIG.md)

**Issue:** Outdated version claims in documentation.

**Changes:**

| Line | Current | Correct | Reason |
|------|---------|---------|--------|
| 6 | "pnpm 9.15.4" | "pnpm 10.29.2" | Actual packageManager version |
| 7 | "TypeScript 5.9.3" | "TypeScript 5.7.2" | Actual package.json version |
| 24 | "lucide-react 0.544.0" | "lucide-react 0.344.0" | Actual version (0.544 doesn't exist) |
| 26 | "tailwind-merge 2.7.0" | "tailwind-merge 2.6.1" | Actual version (2.7 doesn't exist) |

**Time:** 5 minutes  
**Risk:** 🟢 **Low** — Documentation only  
**Rollback:** Revert file from git  

**Proof:**
```bash
# Verify current versions
grep -A2 '"packageManager"' package.json
grep '"typescript"' package.json
grep '"lucide-react"' apps/web/package.json
grep '"tailwind-merge"' apps/web/package.json
```

---

### Patch 1.2: Update Root package.json @typescript-eslint Versions

**File:** [package.json](package.json) (root)

**Issue:** Root claims @typescript-eslint 8.55.0 (doesn't exist); packages use 8.19.1.

**Changes:**

```diff
// package.json lines 20-21
- "@typescript-eslint/eslint-plugin": "^8.55.0",
- "@typescript-eslint/parser": "^8.55.0",
+ "@typescript-eslint/eslint-plugin": "8.19.1",
+ "@typescript-eslint/parser": "8.19.1",
```

**Why:** 
- Version 8.55.0 doesn't exist (caret ^8.55.0 allows 8.55.0+ which was never released)
- Packages ui and utils use 8.19.1 exactly
- pnpm-lock.yaml enforces 8.19.1 anyway
- Monorepo best practice: exact pins, not ranges

**Time:** 5 minutes  
**Risk:** 🟢 **Low** — Already effectively pinned by lock  
**Rollback:** Revert and re-run `pnpm install`  

---

### Patch 1.3: Create `.env.example` Template

**File:** `.env.example` (new)

**Content:**

```bash
# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=

# Sentry Auth (optional, for server-side error reporting)
# SENTRY_AUTH_TOKEN=

# CRM Integration (optional)
# HUBSPOT_PORTAL_ID=
# HUBSPOT_FORM_ID=
# HUBSPOT_API_KEY=

# Database & Auth (optional, if using Supabase)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Why:**
- Developers know which environment variables are available
- Template for setting up local development
- Documentation for team onboarding
- Prevents build-time surprises from missing vars

**Time:** 5 minutes  
**Risk:** 🟢 **Low** — Non-code, documentation only  
**Rollback:** Delete file  

---

### Patch 1.4: Create `.pnpmrc` Configuration

**File:** `.pnpmrc` (new)

**Content:**

```pnpm
# Strict peer dependency resolution
# Fails if a package declares peer deps that aren't installed
strict-peer-dependencies=true

# Auto-install declared peer dependencies
auto-install-peers=true

# Monorepo isolation: don't hoist packages above package directories
shamefully-hoist=false

# Use frozen lock file (don't update) in CI/Docker
prefer-frozen-lockfile=true

# Use pnpm's symlink node_modules strategy
node-linker=pnpm

# Enable recursive install across all workspace packages
recursive-install=true
```

**Why:**
- Enforces monorepo best practices
- Prevents React duplication in @repo/ui
- Ensures reproducible installs in CI
- Documents pnpm behavior explicitly

**Time:** 5 minutes  
**Risk:** 🟢 **Low** — Makes existing behavior explicit  
**Rollback:** Delete file (pnpm defaults are already good)  

---

### Patch 1.5: Create `.npmrc` Registry Configuration

**File:** `.npmrc` (new)

**Content:**

```ini
registry=https://registry.npmjs.org/
```

**Why:**
- Explicitly pins npm registry (supply chain clarity)
- Prevents accidental registry changes
- Documents intended registry
- Simplifies troubleshooting

**Time:** 2 minutes  
**Risk:** 🟢 **Low** — Explicit version of default  
**Rollback:** Delete file  

---

### Patch 1.6: Create GitHub Actions CI Workflow

**File:** `.github/workflows/ci.yml` (new)

**Content:**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

permissions:
  contents: read

jobs:
  ci:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 10.29.2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test
        continue-on-error: true

```

**Why:**
- Prevents broken code from merging to main
- Catches lint/type errors before they reach developers
- Verifies build succeeds
- Provides confidence in deployments

**Time:** 15 minutes  
**Risk:** 🟢 **Low** — Read-only workflow, no side effects  
**Rollback:** Delete file  

**Notes:**
- `continue-on-error: true` on test because test script just echoes placeholder (will implement in Phase 2)
- Matrix uses Node 20.x (matches engines field)
- Locked to pnpm 10.29.2 (matches packageManager)

---

### Patch 1.7: Create GitHub Dependabot Configuration

**File:** `.github/dependabot.yml` (new)

**Content:**

```yaml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: "03:00"
    reviewers:
      - your-github-username
    commit-message:
      prefix: "chore(deps):"
    allow:
      - dependency-type: all
    groups:
      patch:
        dependency-type: patch
        update-types:
          - patch
      minor:
        dependency-type: minor
        update-types:
          - minor

  # GitHub Actions
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: "04:00"
    reviewers:
      - your-github-username
    commit-message:
      prefix: "chore(ci):"

```

**Why:**
- Auto-creates PRs for dependency updates
- Security patches discovered and updated weekly
- Reduces manual dependency management burden
- Groups patch and minor updates separately

**Time:** 10 minutes  
**Risk:** 🟢 **Low** — Auto-creates PRs only (manual merge)  
**Rollback:** Delete file  

**Notes:**
- Replace `your-github-username` with actual GitHub username
- Schedule: Monday 3 AM UTC (customize as needed)
- Grouped updates reduce PR spam

---

### Patch 1.8: Enable GitHub Secret Scanning (Admin Setting)

**Manual Step (Not a file patch)**

**Action:** In GitHub repo settings:
1. Navigate to **Settings** → **Security and analysis**
2. Enable **Secret scanning** (if using GitHub Advanced Security)
3. Or: Install **GitGuardian** app from GitHub Marketplace

**Why:**
- Prevents accidentally committed secrets (API keys, tokens, credentials)
- Blocks push containing known secret patterns
- Critical for security compliance

**Time:** 5 minutes (admin only)  
**Risk:** 🟢 **Low** — Can be tested before enforcement  
**Rollback:** Disable in settings  

**Alternative (Free):** Use GitGuardian:
- Create `.github/workflows/secret-scan.yml`
- Signup for free GitGuardian API key
- Runs on every push/PR

---

## Phase 2: Testing & Maintenance (4-6 hours)

### Patch 2.1: Consolidate ESLint Configs

**Files Affected:**
- `packages/config/package.json` (modify workspaces)
- `packages/config/eslint-config/package.json` (new)
- `packages/config/eslint-config/library.js` (new)
- `packages/config/eslint-config/next.js` (new)
- `apps/web/eslint.config.mjs` (update to extend shared)
- `packages/ui/eslint.config.mjs` (update to extend shared)
- `packages/utils/eslint.config.mjs` (update to extend shared)

**Time:** 30 minutes + testing  
**Risk:** 🟡 **Medium** — Changes linting behavior; requires full test  
**Rollback:** Revert all 7 files from git  

**Note:** Implementation provided in Phase 2 details below.

---

### Patch 2.2: Implement Jest Testing Framework

**Files:**
- `package.json` (add scripts)
- `jest.config.js` (new)
- `jest.setup.js` (new)

**Changes:**

```json
// package.json (root)
"scripts": {
  "test": "jest --coverage --passWithNoTests"
}
```

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
};
```

**Time:** 1-2 hours  
**Risk:** 🟡 **Medium** — New dependencies, requires testing  
**Rollback:** Delete files, revert package.json  

---

### Patch 2.3: Update Turbo Task Configuration

**File:** `turbo.json`

**Change:** Add test task to pipeline

```diff
  "tasks": {
    ...
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "**/__tests__/**", "jest.config.js"]
    }
  }
```

**Time:** 5 minutes  
**Risk:** 🟢 **Low** — Just adds task metadata  
**Rollback:** Revert file  

---

## Phase 3: Developer Experience (2-3 hours)

### Patch 3.1: Setup Git Pre-commit Hooks (Husky)

**Files:**
- `.husky/pre-commit` (new)
- `.git/hooks/pre-commit` (installed)

**Time:** 20 minutes  
**Risk:** 🟢 **Low** — Local developer only  
**Rollback:** Delete .husky directory  

**Note:** Optional; improves productivity but not required.

---

### Patch 3.2: Create Issue & PR Templates

**Files:**
- `.github/ISSUE_TEMPLATE/bug_report.md` (new)
- `.github/ISSUE_TEMPLATE/feature_request.md` (new)
- `.github/pull_request_template.md` (new)

**Time:** 15 minutes  
**Risk:** 🟢 **Low** — Non-functional templates only  
**Rollback:** Delete files  

---

### Patch 3.3: Setup GitHub CODEOWNERS

**File:** `.github/CODEOWNERS` (new)

**Content:**

```
# Default owner for all files
* @yourname

# Specific owners for critical paths
/apps/web/** @yourname
/packages/** @yourname
/.github/workflows/** @yourname
/turbo.json @yourname
```

**Time:** 10 minutes  
**Risk:** 🟢 **Low** — Administrative setup only  
**Rollback:** Delete file  

---

## Implementation Checklist

### Before Starting

- [ ] All files committed (clean git state)
- [ ] Team aware of changes
- [ ] Test environment ready

### Phase 1 Execution (1-2 hours)

- [ ] Patch 1.1: Update CONFIG.md (5 min)
- [ ] Patch 1.2: Update package.json @typescript-eslint (5 min)
- [ ] Patch 1.3: Create .env.example (5 min)
- [ ] Patch 1.4: Create .pnpmrc (5 min)
- [ ] Patch 1.5: Create .npmrc (2 min)
- [ ] Patch 1.6: Create GitHub Actions CI (15 min)
- [ ] Patch 1.7: Create dependabot.yml (10 min)
- [ ] Patch 1.8: Enable secret scanning (5 min admin)
- [ ] **Verify:** `pnpm install && pnpm build && pnpm lint` (10 min)
- [ ] **Commit:** `git commit -m "chore: security & quality gates"`

### Phase 2 Execution (4-6 hours)

- [ ] Patch 2.1: Consolidate ESLint configs (30 min + 1 hr testing)
- [ ] Patch 2.2: Implement Jest (1-2 hours)
- [ ] Patch 2.3: Update turbo.json (5 min)
- [ ] **Verify:** `pnpm test` runs and CI passes (30 min)
- [ ] **Commit:** `git commit -m "test: add pytest infrastructure"`

### Phase 3 Execution (2-3 hours)

- [ ] Patch 3.1: Setup Husky (20 min)
- [ ] Patch 3.2: Create templates (15 min)
- [ ] Patch 3.3: Setup CODEOWNERS (10 min)
- [ ] **Verify:** Workflows trigger correctly (15 min)
- [ ] **Commit:** `git commit -m "chore: developer experience improvements"`

### Final Step

- [ ] Create PR from feature branch → main
- [ ] GitHub Actions CI runs and passes ✅
- [ ] Code review → Merge
- [ ] Tag release: `git tag -a v1.0.1 -m "Configuration hardening"`

---

## Rollback Procedures

Each patch can be rolled back independently:

```bash
# Rollback single patch
git revert <commit-hash>

# Rollback entire phase
git reset --hard <before-phase-SHA>

# Rollback everything
git reset --hard origin/main
```

---

## Testing After Each Patch

```bash
# After every patch, run:

# 1. Verify install
pnpm install --frozen-lockfile

# 2. Verify build
pnpm build

# 3. Verify lint
pnpm lint

# 4. Verify type-check
pnpm type-check

# 5. Verify test (Phase 2+)
pnpm test

# 6. Verify dev server
pnpm dev
  # Navigate to http://localhost:3000
  # Check homepage loads
  # Stop with Ctrl+C
```

---

## Success Criteria

### After Phase 1
- ✅ All files created and committed
- ✅ CI/CD workflow runs on all PRs
- ✅ Lint/build/type-check pass in CI
- ✅ GitHub Dependabot creating PRs
- ✅ SECRET SCANNING enabled and active

### After Phase 2
- ✅ Tests run (pnpm test)
- ✅ CI includes test step
- ✅ ESLint configs consolidated
- ✅ Build/lint/test all pass

### After Phase 3
- ✅ Pre-commit hooks configured
- ✅ Issue/PR templates in place
- ✅ CODEOWNERS assigned
- ✅ All optional polish complete

---

## Effort Summary

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **1** | 8 config files + security setup | 1-2 hours | 🔴 CRITICAL |
| **2** | Testing + config consolidation | 4-6 hours | 🟠 HIGH |
| **3** | Hooks + templates + governance | 2-3 hours | 🟢 LOW |
| **Total** | Complete hardening | **7-11 hours** | — |

---

## Questions?

See detailed analysis:
- Conflicts: [CONFIG_CONFLICTS.md](CONFIG_CONFLICTS.md)
- Versions: [CONFIG_VERSIONS.md](CONFIG_VERSIONS.md)
- Gaps: [CONFIG_GAPS.md](CONFIG_GAPS.md)
- Map: [CONFIG_MAP.md](CONFIG_MAP.md)

