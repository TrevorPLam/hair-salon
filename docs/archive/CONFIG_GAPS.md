# Configuration Gaps & Best Practices Coverage

**Assessment of missing best practices and recommended coverage.**

**Date:** February 9, 2026

---

## Quick Summary

| Best Practice              | Current Status            | Risk                   | Priority     |
| -------------------------- | ------------------------- | ---------------------- | ------------ |
| **Reproducible Installs**  | ✅ pnpm-lock.yaml exists  | 🟢 Low                 | N/A          |
| **Formatting**             | ✅ Prettier configured    | 🟢 Low                 | N/A          |
| **Linting**                | ✅ ESLint configured      | 🟡 Medium (duplicated) | Medium       |
| **Type Checking**          | ✅ TypeScript strict mode | 🟢 Low                 | N/A          |
| **Testing**                | 🟠 **Not configured**     | 🔴 High                | **HIGH**     |
| **Build**                  | ✅ Turbo + Next.js        | 🟢 Low                 | N/A          |
| **CI/CD Pipeline**         | 🟠 **Missing**            | 🔴 Critical            | **CRITICAL** |
| **Dependency Updates**     | 🟠 **Not automated**      | 🟡 Medium              | **HIGH**     |
| **Security Scanning**      | 🟠 **Not configured**     | 🔴 Critical            | **CRITICAL** |
| **Secret Scanning**        | 🟠 **Not configured**     | 🔴 Critical            | **CRITICAL** |
| **Environment Management** | 🟠 **No template**        | 🟡 Medium              | **MEDIUM**   |
| **npm Registry Pinning**   | 🟠 **Implicit**           | 🟡 Medium              | **MEDIUM**   |
| **pnpm Config**            | 🟠 **Missing**            | 🟡 Medium              | **MEDIUM**   |
| **Git Hooks (Optional)**   | 🟠 **Not configured**     | 🟢 Low                 | Low          |
| **Code ownership**         | 🟠 **Not configured**     | 🟢 Low                 | Low          |

---

## Critical Gaps (🔴)

### 1. CI/CD Pipeline — GitHub Actions Workflows

**Status:** ⚠️ **MISSING — BLOCKING TEAM DEVELOPMENT**

**What's Missing:**

No `.github/workflows/*.yml` files exist.

**Required Workflows:**

#### A. Lint & Build Verification (ci.yml)

```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10.29.2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
```

**Why This Matters:**

- ❌ No checks prevent broken code from merging
- ❌ Each developer must run commands locally (easy to skip)
- ❌ CI enforcement ensures consistency

**Impact:**

- 🔴 **CRITICAL:** Any team member can break main branch
- 🔴 **CRITICAL:** No quality gate before production
- 🔴 **CRITICAL:** Build failures discovered post-merge

**Recommendation:**

- Create `.github/workflows/ci.yml` immediately
- Block merging until CI passes
- Add to `.github/workflows/ci.yml` PR checks

**Time to Implement:** 15 minutes

---

### 2. Dependency Security Scanning

**Status:** ⚠️ **MISSING — NO VULNERABILITY DETECTION**

**What's Missing:**

No automated scanning for known vulnerabilities in dependencies.

**Options:**

#### A. GitHub Dependabot (Recommended)

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    reviewers:
      - '@me'
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

#### B. npm Audit in CI

```bash
npm audit --audit-level=moderate
```

#### C. Snyk Integration

- Third-party service with more detailed reporting
- Free tier available

**Why This Matters:**

- 🔴 **CRITICAL:** Zero-day vulnerabilities in dependencies undetected
- 🔴 **CRITICAL:** No alerts for security updates
- 🟠 **HIGH:** Regular audits needed for compliance (SOC 2, ISO 27001)

**Impact:**

- 🔴 **CRITICAL:** Vulnerability in dependency reaches production
- 🟠 **HIGH:** Regulatory/compliance violations
- 🟠 **HIGH:** Supply chain risk

**Recommendation:**

- Enable GitHub Dependabot (built-in, free, requires ~5 minutes setup)
- Auto-create PRs for security updates
- Auto-create PRs for minor/patch updates
- Review/merge monthly

**Time to Implement:** 10 minutes

---

### 3. Secret Scanning

**Status:** ⚠️ **MISSING — NO CREDENTIAL PROTECTION**

**What's Missing:**

No automated detection of accidentally committed secrets (API keys, tokens, credentials).

**Options:**

#### A. GitHub Secret Scanning (Enterprise) / GitGuardian (Free)

```yaml
# .github/workflows/secret-scan.yml
name: Secret Scanning
on: [push, pull_request]
jobs:
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: GitGuardian/ggshield-action@master
        env:
          GITHUB_PUSH_BEFORE_SHA: ${{ github.event.before }}
          GITHUB_PUSH_BASE_REF: ${{ github.base_ref }}
          GITHUB_PULL_BASE_SHA: ${{ github.event.pull_request.base.sha }}
          GITHUB_DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}
```

#### B. Pre-commit Hooks (Local)

```bash
# Via Husky + lint-staged (optional)
git hook: detect-secrets
```

**Why This Matters:**

- 🔴 **CRITICAL:** Exposed API keys can compromise integrations (HubSpot, Sentry, Supabase)
- 🔴 **CRITICAL:** Database credentials compromise data
- 🔴 **CRITICAL:** OAuth tokens allow unauthorized access

**Impact:**

- 🔴 **CRITICAL:** Attacker gains access to external services
- 🔴 **CRITICAL:** Data breach risk
- 🟠 **HIGH:** Breach notification requirements (GDPR, CCPA)

**Recommendation:**

- Enable GitHub Advanced Security (if available) or use GitGuardian free tier
- Block commits containing known secret patterns
- Rotate any exposed credentials immediately

**Time to Implement:** 20 minutes setup + 10 min OAuth token rotation

---

## High-Severity Gaps (🟠)

### 4. Testing Infrastructure

**Status:** ⚠️ **PARTIALLY MISSING — NO UNIT/INTEGRATION TESTS**

**Current State:**

```json
// apps/web/package.json
"test": "echo 'No tests configured yet' && exit 0"
```

**What's Missing:**

- ❌ Unit test framework (Jest, Vitest)
- ❌ Component test framework (React Testing Library)
- ❌ E2E test framework (Playwright, Cypress)
- ❌ Test coverage baseline
- ❌ Test script in Turbo pipeline

**Required Additions:**

#### A. Unit Testing Setup

**Install:**

```bash
pnpm add -w --save-dev jest @testing-library/react @testing-library/jest-dom ts-node
```

**Create jest.config.js:**

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
};
```

**Create jest.setup.js:**

```javascript
import '@testing-library/jest-dom';
```

**package.json script:**

```json
"test": "jest --coverage"
```

#### B. E2E Testing Setup

**Install:**

```bash
pnpm add -w --save-dev @playwright/test
```

**Create playwright.config.ts:**

```typescript
export default {
  testDir: 'e2e',
  webServer: {
    command: 'pnpm dev',
    port: 3000,
  },
};
```

**Sample E2E test:**

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Hair Salon/);
});
```

**Why This Matters:**

- 🟡 **MEDIUM:** No regression detection (changes break features silently)
- 🟡 **MEDIUM:** Manual testing burden
- 🟡 **MEDIUM:** Confidence in deployments low

**Impact:**

- 🟡 **MEDIUM:** Broken features reach production
- 🟠 **HIGH:** Team velocity decreases (more QA time)
- 🟠 **HIGH:** Bug fixes introduce new bugs (no safety net)

**Recommendation:**

- Start with critical path tests (E2E for main features)
- Add unit tests for utilities and components incrementally
- Aim for 70%+ coverage within 3 months

**Time to Implement:**

- Setup: 30 minutes
- Initial tests: 2-4 hours depending on scope

---

### 5. Environment Variable Management

**Status:** ⚠️ **MISSING — NO TEMPLATE/SCHEMA**

**Current State:**

- ❌ No `.env.example` file
- ❌ No schema validation for required vars
- ✅ Sentry, Supabase configs referenced in code but not documented

**What's Missing:**

#### A. .env.example Template

```bash
# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_AUTH_TOKEN=

# CRM & Email
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_ID=
HUBSPOT_API_KEY=

# Database & Auth
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Service
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### B. Environment Schema Validation

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

**Why This Matters:**

- 🟡 **MEDIUM:** Developers don't know which vars are required
- 🟡 **MEDIUM:** Missing var discovered at runtime (not startup)
- 🟡 **MEDIUM:** Different behavior local vs CI vs prod

**Impact:**

- 🟡 **MEDIUM:** Onboarding friction (what vars do I need?)
- 🟠 **HIGH:** Features fail silently when vars missing (Sentry, GA don't error)
- 🟠 **HIGH:** Deployment failures caught late

**Recommendation:**

- Create `.env.example` immediately (10 minutes)
- Add env schema validation in lib (20 minutes)
- Document in CONTRIBUTING.md

**Time to Implement:** 30 minutes

---

### 6. Dependency Update Automation

**Status:** ⚠️ **MISSING — NO AUTOMATED PRs**

**Current State:**

- ❌ Dependabot not configured
- ❌ Renovate not configured
- Manual updates only

**What's Missing:**

#### A. Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '02:00'
    reviewers: [your-github-username]
    allow:
      - dependency-type: all
    commit-message:
      prefix: 'chore(deps):'

  # GitHub Actions
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
    reviewers: [your-github-username]
```

**Why This Matters:**

- 🟡 **MEDIUM:** Dependency updates forgotten (manual reminder burden)
- 🟡 **MEDIUM:** Security patches delayed (waiting for developer review)
- 🟡 **MEDIUM:** Version drift (teammates use different versions)

**Impact:**

- 🟡 **MEDIUM:** Outdated dependencies accumulate
- 🟠 **HIGH:** Security vulnerabilities not patched promptly
- 🟠 **HIGH:** Dependency conflicts increase over time

**Recommendation:**

- Enable GitHub Dependabot (5 minutes setup)
- Auto-group patch updates (reduces PR spam)
- Configure auto-merge for green builds (optional)

**Time to Implement:** 10 minutes

---

### 7. pnpm Configuration File

**Status:** ⚠️ **MISSING — BEST PRACTICES NOT ENFORCED**

**Current State:**

- ❌ `.pnpmrc` not found
- ❌ Defaults used (permissive for monorepos)

**What's Missing:**

```ini
# .pnpmrc
# Strict peer dependency resolution
strict-peer-dependencies=true

# Auto-install peer dependencies
auto-install-peers=true

# Don't hoist packages (monorepo isolation)
shamefully-hoist=false

# Use frozen lock file in CI (prevent divergence)
prefer-frozen-lockfile=true

# Symlink strategy for monorepos
node-linker=pnpm

# Enable recursive install
recursive-install=true
```

**Why This Matters:**

- 🟡 **MEDIUM:** Developers can accidentally break isolation
- 🟡 **MEDIUM:** Peer dependencies not enforced (React duplication risk)
- 🟡 **MEDIUM:** Lock file can be bypassed locally

**Impact:**

- 🟡 **MEDIUM:** Monorepo best practices not enforced
- 🟡 **MEDIUM:** Developers install different packages locally
- 🟠 **HIGH:** "Works on my machine" issues

**Recommendation:**

- Create `.pnpmrc` immediately (5 minutes)
- Document in CONTRIBUTING.md (2 minutes)

**Time to Implement:** 10 minutes

---

### 8. npm Registry Pinning

**Status:** ⚠️ **MISSING — IMPLICIT NOT EXPLICIT**

**Current State:**

- ✅ Uses default npmjs.org (correct)
- ❌ No explicit `.npmrc` configuration

**What's Missing:**

```ini
# .npmrc
registry=https://registry.npmjs.org/
```

**Why This Matters:**

- 🟡 **MEDIUM:** Supply chain clarity (which registry is used?)
- 🟡 **MEDIUM:** Corporate proxy settings not documented
- 🟡 **MEDIUM:** If someone misconfigures, it's discovered at install time

**Impact:**

- 🟢 **Low:** Currently correct defaults
- 🟡 **MEDIUM:** Future misconfiguration risk

**Recommendation:**

- Create `.npmrc` with explicit registry (5 minutes)
- Document in CONTRIBUTING.md

**Time to Implement:** 10 minutes

---

## Medium-Severity Gaps (🟡)

### 9. Git Hooks (Optional but Recommended)

**Status:** ⚠️ **NOT CONFIGURED — OPTIONAL**

**What's Missing:**

Pre-commit hooks to catch issues before they're committed.

**Options:**

#### A. Husky + lint-staged (Recommended)

```bash
pnpm add -w --save-dev husky lint-staged

npx husky install

# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**package.json:**

```json
"lint-staged": {
  "*.{ts,tsx}": "eslint --fix",
  "*.{ts,tsx,js,jsx,json,md}": "prettier --write"
}
```

**Why This Matters:**

- 🟢 **Low (optional):** Catches lint/format issues before commit
- 🟢 **Low (optional):** Ensures consistent commit quality

**Impact:**

- 🟢 **Low:** Nice-to-have; not critical
- 🟢 **Low:** Improves developer experience

**Recommendation:**

- Optional; defer until team growth
- When added, auto-fix on commit (lint --fix)

**Time to Implement:** 20 minutes

---

### 10. Code Ownership & CODEOWNERS

**Status:** ⚠️ **NOT CONFIGURED — OPTIONAL**

**What's Missing:**

```
# .github/CODEOWNERS
# Default owner for all files
* @yourname

# Specific owners for critical paths
/apps/web/* @yourname @teammate
/packages/config/* @yourname
/.github/workflows/* @yourname
```

**Why This Matters:**

- 🟢 **Low (optional):** Auto-assign code reviews
- 🟢 **Low (optional):** Enforce approval requirements for critical paths

**Impact:**

- 🟢 **Low:** Nice-to-have; not critical
- 🟢 **Low:** Improves review process at scale

**Recommendation:**

- Optional; defer until team grows (3+ people)

**Time to Implement:** 10 minutes

---

### 11. GitHub Issue Templates & PR Templates

**Status:** ⚠️ **NOT CONFIGURED — OPTIONAL**

**What's Missing:**

```yaml
# .github/ISSUE_TEMPLATE/bug_report.md
name: Bug Report
about: Report a bug
labels: bug

## Describe the bug

## Steps to reproduce

## Expected behavior

## Actual behavior

## Environment
- Node version:
- pnpm version:
```

```yaml
# .github/pull_request_template.md
## Description

## Related Issue

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
```

**Why This Matters:**

- 🟢 **Low (optional):** Standardizes issue/PR format
- 🟢 **Low (optional):** Improves clarity

**Impact:**

- 🟢 **Low:** Nice-to-have

**Recommendation:**

- Optional; can be added later

**Time to Implement:** 15 minutes

---

## Summary of Required vs Optional

### 🔴 **CRITICAL** (Must Have Before Team Development)

| Gap                                 | Time   | Blocker |
| ----------------------------------- | ------ | ------- |
| **1. GitHub Actions CI Workflows**  | 15 min | ✅ Yes  |
| **2. Dependency Security Scanning** | 10 min | ✅ Yes  |
| **3. Secret Scanning**              | 20 min | ✅ Yes  |

---

### 🟠 **HIGH** (Should Have Before Production)

| Gap                           | Time      | Blocker                       |
| ----------------------------- | --------- | ----------------------------- |
| **4. Testing Infrastructure** | 2-4 hours | ❌ No (but should start soon) |
| **5. Environment Variables**  | 30 min    | ⚠️ Defer to next sprint       |
| **6. Dependency Automation**  | 10 min    | ⚠️ Should have                |
| **7. pnpm Config**            | 10 min    | ⚠️ Should have                |
| **8. npm Registry**           | 5 min     | ⚠️ Should have                |

---

### 🟢 **OPTIONAL** (Nice to Have)

| Gap                        | Time   | Blocker |
| -------------------------- | ------ | ------- |
| **9. Git Hooks**           | 20 min | ❌ No   |
| **10. CODEOWNERS**         | 10 min | ❌ No   |
| **11. Issue/PR Templates** | 15 min | ❌ No   |

---

## Recommended Implementation Order

### Phase 1: Security & Quality (1 Day)

1. Create `.github/workflows/ci.yml` (15 min)
2. Setup Dependabot (10 min)
3. Setup secret scanning (20 min)
4. Create `.env.example` (10 min)
5. Create `.pnpmrc` (5 min)
6. Create `.npmrc` (5 min)

**Total:** ~65 minutes

### Phase 2: Team Enablement (1 Week)

1. Implement Jest + testing setup (1-2 hours)
2. Write initial test examples (2-3 hours)
3. Document in CONTRIBUTING.md (1 hour)

**Total:** ~4-6 hours

### Phase 3: Developer Experience (2 Weeks)

1. Setup Husky + lint-staged (20 min)
2. Create issue/PR templates (15 min)
3. Setup GitHub CODEOWNERS (10 min)

**Total:** ~45 minutes

---

## Risk Summary

### Blocking Deployment

- ❌ No CI/CD pipeline → builds untested
- ❌ No secret scanning → credentials exposed
- ❌ No dependency scanning → vulnerabilities undetected

### Slowing Team Productivity

- ❌ No tests → manual QA overhead
- ❌ No environment template → onboarding friction
- ⚠️ No git hooks → lint failures after commit

### Long-Term Maintenance Burden

- ❌ No dependency automation → version drift accumulates
- ⚠️ No CODEOWNERS → unclear review paths
- ⚠️ No templates → inconsistent issue reporting

---

## Next Steps

1. Implement Phase 1 before team development starts (critical)
2. Implement Phase 2 within first month (high priority)
3. Implement Phase 3 as team grows (polish)

See **PATCH_PLAN.md** for specific fix implementations.
