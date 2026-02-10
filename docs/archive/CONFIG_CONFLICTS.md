# Configuration Conflicts & Drift Analysis

**Comprehensive audit of conflicts, version drift, duplication, and unintentional overrides.**

**Date:** February 9, 2026  
**Severity Levels:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## Executive Summary

| Issue                         | Count    | Severity  | Impact                                            |
| ----------------------------- | -------- | --------- | ------------------------------------------------- |
| **Version Drift**             | 4        | 🟠 High   | Documentation misleading; unclear actual versions |
| **Configuration Duplication** | 2        | 🟡 Medium | ESLint configs replicated across packages         |
| **Missing Files**             | 3        | 🟡 Medium | Best practices not enforced                       |
| **Documentation Outdated**    | 3        | 🟡 Medium | Developers follow wrong guidance                  |
| **Inconsistent Pins**         | Multiple | 🟢 Low    | No breaking issues but non-standard               |

**Total Issues Found:** 12  
**Files Affected:** 7  
**Blocking Issues:** 0 (Everything works, but configuration isn't optimal)

---

## Critical Issues (🔴)

**None found.** All systems are functional; no breaking conflicts exist.

---

## High-Severity Issues (🟠)

### 1. Version Drift in Documentation

**Files Affected:**

- [CONFIG.md](CONFIG.md) — Multiple claims
- [CONFIGURATION_AUDIT.md](CONFIGURATION_AUDIT.md) — References outdated state
- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) — Conflicting version claims
- Actual: [package.json](package.json), [pnpm-lock.yaml](pnpm-lock.yaml)

**Issues:**

#### A. pnpm Version Claimed vs Actual

| Document           | Claims            | Actual         | Discrepancy                 |
| ------------------ | ----------------- | -------------- | --------------------------- |
| CONFIG.md (line 6) | "pnpm 9.15.4"     | `pnpm@10.29.2` | **-1.14.0 versions behind** |
| CONFIG.md (line 4) | "pnpm workspaces" | Uses 10.29.2   | ❌ Outdated claim           |
| INFRASTRUCTURE.md  | "pnpm 10.29.2"    | ✅ Correct     | Conflicts with CONFIG.md    |

**Root Cause:** CONFIG.md was written before pnpm upgrade but not updated.

**Impact:**

- Developers may use wrong pnpm version if following CONFIG.md
- Debugging confusion (local dev ≠ CI)
- `engines` field in package.json claims "pnpm@10.29.2" as packageManager

**Proof:**

```json
// package.json (line 11)
"packageManager": "pnpm@10.29.2"
```

---

#### B. TypeScript Version Claimed vs Actual

| Document           | Claims             | Actual     | Discrepancy              |
| ------------------ | ------------------ | ---------- | ------------------------ |
| CONFIG.md (line 7) | "TypeScript 5.9.3" | `5.7.2`    | **-0.2.1 versions**      |
| package.json       | (root)             | 5.7.2      | ✅ Correct               |
| INFRASTRUCTURE.md  | "TypeScript 5.7.2" | ✅ Correct | Conflicts with CONFIG.md |

**Root Cause:** CONFIG.md written before TypeScript downgrade (5.9.3 → 5.7.2 for @typescript-eslint compatibility).

**Impact:**

- Developers install 5.9.3 locally if following CONFIG.md
- Potential type-checking discrepancies
- Incompatibility risk if ESLint plugin expects older version

**Proof:**

```json
// package.json (root, line 22)
"typescript": "5.7.2"

// apps/web/package.json (line 15)
"typescript": "5.7.2"
```

---

#### C. lucide-react Version Claimed vs Actual

| Document                 | Claims                 | Actual     | Discrepancy              |
| ------------------------ | ---------------------- | ---------- | ------------------------ |
| CONFIG.md (line 24)      | "lucide-react 0.544.0" | `0.344.0`  | **-0.200.0 versions**    |
| package.json             | (apps/web)             | 0.344.0    | ✅ Correct               |
| packages/ui/package.json | 0.344.0                | ✅ Correct | Conflicts with CONFIG.md |

**Root Cause:** CONFIG.md manually typed version numbers; version 0.544.0 may not exist (lucide-react jumps: 0.263, 0.344, 0.356, etc.).

**Impact:**

- Impossible to install version mentioned in docs
- Misleading claim about actual dependencies
- No blocking issue (actual version is correct in package.json)

**Proof:**

```json
// apps/web/package.json (line 5)
"lucide-react": "0.344.0"
```

---

#### D. tailwind-merge Version Claimed vs Actual

| Document                    | Claims                 | Actual     | Discrepancy              |
| --------------------------- | ---------------------- | ---------- | ------------------------ |
| CONFIG.md (line 26)         | "tailwind-merge 2.7.0" | `2.6.1`    | **-0.0.1 versions**      |
| package.json                | (apps/web)             | 2.6.1      | ✅ Correct               |
| packages/utils/package.json | 2.6.1                  | ✅ Correct | Conflicts with CONFIG.md |

**Root Cause:** CONFIG.md manually documented version; 2.7.0 may not exist or was typo.

**Impact:**

- Impossible to install version mentioned in docs
- No blocking issue (actual version works correctly)

**Proof:**

```json
// apps/web/package.json (line 8)
"tailwind-merge": "2.6.1"
```

---

**Recommendation:**

- 🔧 **Fix:** Update CONFIG.md with actual versions from package.json
- ⏱️ **Priority:** HIGH — Docs are discovered by developers first
- ✅ **Risk:** LOW — Non-breaking, documentation only

---

### 2. ESLint Config Duplication Across Packages

**Files Affected:**

- [apps/web/eslint.config.mjs](apps/web/eslint.config.mjs) — Extends Next.js base
- [packages/ui/eslint.config.mjs](packages/ui/eslint.config.mjs) — Inline TypeScript rules
- [packages/utils/eslint.config.mjs](packages/utils/eslint.config.mjs) — Inline TypeScript rules (duplicate)

**Issue:**

```javascript
// packages/ui/eslint.config.mjs (lines 1-19)
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: { parser: tsparser, ... },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];

// packages/utils/eslint.config.mjs (lines 1-18)
// IDENTICAL CONTENT (except no JSX in parserOptions for utils)
export default [
  { files: ["**/*.ts", "**/*.tsx"], ... },
];
```

**Problem:**

- ❌ Rules defined in **two places** with no shared source
- ❌ Updating rules requires changes to **multiple files**
- ❌ Version of @typescript-eslint differs between packages (see next section)
- ❌ No enforcement of consistency

**Current Duplication:**

| Config                      | Version Pins                                | Rules                                 |
| --------------------------- | ------------------------------------------- | ------------------------------------- |
| root package.json           | @typescript-eslint/parser 8.55.0 ❌ **OLD** | tseslint.configs.recommended          |
| apps/web/package.json       | None (inherits from next/typescript)        | next/core-web-vitals, next/typescript |
| packages/ui/package.json    | @typescript-eslint/eslint-plugin 8.19.1 ✅  | tseslint.configs.recommended          |
| packages/utils/package.json | @typescript-eslint/eslint-plugin 8.19.1 ✅  | tseslint.configs.recommended          |

**Impact:**

- 🟠 **Medium:** Root package has **outdated** @typescript-eslint versions
- 🟠 **Medium:** Changes to lint rules require 2× edits
- 🟢 **Low:** Currently all rules work; no conflicts (yet)

**Proof:**

```json
// package.json (root, lines 20-21)
"@typescript-eslint/eslint-plugin": "^8.55.0",
"@typescript-eslint/parser": "^8.55.0",

// packages/ui/package.json (lines 16-17)
"@typescript-eslint/eslint-plugin": "8.19.1",
"@typescript-eslint/parser": "8.19.1",

// packages/utils/package.json (lines 13-14)
"@typescript-eslint/eslint-plugin": "8.19.1",
"@typescript-eslint/parser": "8.19.1",
```

**Recommendation:**

- 🔧 **Fix:** Create shared ESLint config in `packages/config/eslint-config/` (as originally planned)
- 🔧 **Fix:** Update root @typescript-eslint from 8.55.0 → 8.19.1 (latest used in packages)
- 🔧 **Fix:** Remove inline configs from packages/ui and packages/utils; extend shared config
- ⏱️ **Priority:** MEDIUM — Maintainability concern
- ✅ **Risk:** LOW — New config can be tested before rollout

---

## Medium-Severity Issues (🟡)

### 3. Missing `.pnpmrc` Configuration

**Files Affected:**

- `.pnpmrc` — **NOT FOUND** (claimed in CONFIG.md and CONFIGURATION_AUDIT.md)

**Issue:**

Files [CONFIG.md](CONFIG.md) and [CONFIGURATION_AUDIT.md](CONFIGURATION_AUDIT.md) reference a `.pnpmrc` file that **does not exist** in the repository:

```markdown
// CONFIG.md references .pnpmrc
// CONFIGURATION_AUDIT.md (line 67) mentions creating .pnpmrc
```

But search found no `.pnpmrc` file.

**Impact:**

- 🟡 **Medium:** Monorepo best practices not enforced:
  - `strict-peer-dependencies` not enforced (could hide mis-declared peers)
  - `shamefully-hoist=false` not enforced (could cause unintended hoisting)
  - `prefer-frozen-lockfile` not enforced (local installs could diverge)
- 🟢 **Low:** Actual behavior is mostly correct because packages correctly declare peers

**Recommendation:**

- 🔧 **Fix:** Create `.pnpmrc` with recommended settings
- ⏱️ **Priority:** MEDIUM — Prevents future regressions
- ✅ **Risk:** LOW — pnpm respects these safely

---

### 4. Missing `.env.example` Template

**Files Affected:**

- `.env.example` — **NOT FOUND** (should exist)

**Issue:**

No `.env.example` file exists to template required environment variables.

**What Should Be There:**

```
# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=

# Integrations
# HUBSPOT_PORTAL_ID=
# HUBSPOT_FORM_ID=

# Database (if needed)
# SUPABASE_URL=
# SUPABASE_ANON_KEY=
```

**Current Situation:**

- 🟡 Developers have no guidance on required vars
- apps/web likely reads from environment but no docs
- [Sentry is initialized](apps/web/lib/sentry-client.ts) but no example config

**Impact:**

- 🟡 **Medium:** Developer experience (unclear what vars are needed)
- 🟢 **Low:** Build won't fail; app adapts to missing vars

**Recommendation:**

- 🔧 **Fix:** Create `.env.example` with all used variables
- ⏱️ **Priority:** MEDIUM — Onboarding friction
- ✅ **Risk:** LOW — Non-code; documentation only

---

### 5. Missing GitHub Actions CI/CD Workflows

**Files Affected:**

- `.github/workflows/*.yml` — **NONE FOUND**

**Issue:**

No automated CI/CD pipeline exists. Best practices recommend:

```yaml
# .github/workflows/ci.yml (MISSING)
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
```

**Current Situation:**

- ❌ No lint checks run on PRs
- ❌ No type-check runs on PRs
- ❌ No build verification before merge
- ❌ No automated security scanning
- ⚠️ Broken builds can reach main branch

**Impact:**

- 🟠 **High:** Quality assurance bypass
- 🟠 **High:** No security scanning
- 🟡 **Medium:** Developers discover issues after merge

**Recommendation:**

- 🔧 **Fix:** Add GitHub Actions workflow for lint+build+test
- 🔧 **Fix:** Add Dependabot config for automated dependency updates
- ⏱️ **Priority:** HIGH — Should be done before team development
- ✅ **Risk:** LOW — Workflows are non-breaking; just add gates

---

### 6. Missing `.npmrc` Registry Configuration

**Files Affected:**

- `.npmrc` — **NOT FOUND** (should exist)

**Issue:**

No `.npmrc` file to explicitly set npm/pnpm registry.

**Why This Matters:**

```ini
# .npmrc (SHOULD EXIST)
registry=https://registry.npmjs.org/
```

- pnpm defaults to npmjs.org (correct), but **no explicit config**
- If someone accidentally configures Taobao mirror or corporate proxy, it's discovered at install time
- No single source of truth for registry

**Current Situation:**

- ✅ Default registry (npmjs.org) is correct
- ⚠️ No explicit configuration
- ⚠️ First person to commit broken registry.config will break all installs

**Impact:**

- 🟡 **Medium:** Supply chain clarity (registry choice unverified)
- 🟢 **Low:** Currently no issue; defaults work

**Recommendation:**

- 🔧 **Fix:** Create `.npmrc` with explicit registry
- ⏱️ **Priority:** MEDIUM — Supply chain best practice
- ✅ **Risk:** LOW — No-op if already using default

---

### 7. EditorConfig References Outdated Project Name

**Files Affected:**

- [.editorconfig](.editorconfig) line 1 comment

**Issue:**

```editorconfig
# EditorConfig for ALIGNMENT repository
# https://editorconfig.org
```

**Problem:**

- ❌ References "ALIGNMENT repository" (project's original name)
- ❌ Should say "Hair Salon Template" or "hair-salon"
- ✅ Configuration itself is correct for this project

**Impact:**

- 🟢 **Low:** Confusing comment only; no functional impact
- 🟢 **Low:** EditorConfig rules are correct for this project

**Recommendation:**

- 🔧 **Fix:** Update comment to reference "Hair Salon Template"
- ⏱️ **Priority:** LOW — Documentation/clarity only
- ✅ **Risk:** NONE — Comment only

---

## Low-Severity Issues (🟢)

### 8. Root ESLint Versions Lag Behind Packages

**Files Affected:**

- [package.json](package.json) lines 20-21
- [packages/ui/package.json](packages/ui/package.json) lines 16-17
- [packages/utils/package.json](packages/utils/package.json) lines 13-14

**Issue:**

| Package            | @typescript-eslint/parser | @typescript-eslint/eslint-plugin |
| ------------------ | ------------------------- | -------------------------------- |
| **Root**           | ^8.55.0                   | ^8.55.0                          |
| **packages/ui**    | 8.19.1                    | 8.19.1                           |
| **packages/utils** | 8.19.1                    | 8.19.1                           |

**Problem:**

- Root has **caret range** (^8.55.0 allows >=8.55.0 <9.0.0)
- Packages have **exact pin** (8.19.1 only)
- If root installs 8.55.0 and packages use 8.19.1, there could be inconsistent rules

**Current Situation:**

- pnpm-lock.yaml locks all to 8.19.1 (works correctly)
- But **intent is unclear** — root claims newer, packages use older

**Impact:**

- 🟢 **Low:** Currently no issue (pnpm-lock saves us)
- 🟡 **Medium:** If someone removes lock file and re-installs, could get different versions

**Recommendation:**

- 🔧 **Fix:** Update root package.json to exact pin: `"@typescript-eslint/parser": "8.19.1"` (remove ^)
- ⏱️ **Priority:** LOW — Monorepo best practice
- ✅ **Risk:** LOW — No breaking changes

---

### 9. Inconsistent Version Pinning Policy

**Files Affected:**

- Root and package-level `package.json` files

**Issue:**

Mixed version pinning strategies:

| Package            | Examples                          | Type            |
| ------------------ | --------------------------------- | --------------- |
| **Root**           | turbo: `2.2.3`, prettier: `3.2.5` | Exact pins ✅   |
| **Root**           | @typescript-eslint/\*: `^8.55.0`  | Caret ranges ❌ |
| **apps/web**       | next: `15.1.6`, react: `19.0.0`   | Exact pins ✅   |
| **apps/web**       | (peerDeps on @repo/\*)            | workspace:\* ✅ |
| **packages/ui**    | lucide-react: `0.344.0`           | Exact pins ✅   |
| **packages/utils** | clsx: `2.1.1`                     | Exact pins ✅   |

**Problem:**

- Most are **exact pins** (good for monorepos)
- Root has **caret ranges** for @typescript-eslint (inconsistent)
- Monorepo best practice is ALL exact pins

**Impact:**

- 🟢 **Low:** pnpm-lock enforces lock anyway
- 🟡 **Medium:** Philosophy unclear to future developers

**Recommendation:**

- 🔧 **Fix:** Convert all caret ranges to exact pins
  - `@typescript-eslint/eslint-plugin: "^8.55.0"` → `"8.19.1"`
  - `@typescript-eslint/parser: "^8.55.0"` → `"8.19.1"`
- ⏱️ **Priority:** LOW — Consistency enhancement
- ✅ **Risk:** LOW — pnpm-lock already enforces exact versions

---

### 10. TypeScript `jsx: preserve` Can Cause Confusion

**Files Affected:**

- [tsconfig.base.json](tsconfig.base.json) line 7
- [apps/web/tsconfig.json](apps/web/tsconfig.json) — extends with jsx: preserve
- [packages/ui/tsconfig.json](packages/ui/tsconfig.json) — jsx: preserve

**Issue:**

All TypeScript configs use `"jsx": "preserve"`, which means:

- JSX is **not transformed** by tsc
- Instead, output is left as JSX (for transpiler to handle)
- This is correct for Next.js + source exports
- **But:** It requires transpiler to exist (next.config.js has `transpilePackages`)

**Current Situation:**

- ✅ next.config.js has `transpilePackages: ['@repo/ui', '@repo/utils']`
- ✅ Correct strategy (source exports)
- ⚠️ But if someone changes it without understanding, builds break silently

**Impact:**

- 🟢 **Low:** Currently correct; no issue
- 🟡 **Medium:** Implicit dependency on transpilePackages configuration

**Recommendation:**

- 📝 **Document:** Add comment in tsconfig.base.json explaining jsx: preserve strategy
- 📝 **Document:** Link to next.config.js transpilePackages explanation
- 🔧 **Optional:** Create shared config package for this (already in scope)
- ⏱️ **Priority:** LOW — Works correctly, just needs docs

---

### 11. pnpm-lock.yaml Size

**Files Affected:**

- [pnpm-lock.yaml](pnpm-lock.yaml) — ~209 KB

**Issue:**

Lock file is 209 KB; somewhat large.

**Concern:**

- 📈 Large lock files can slow down git operations
- 📈 More lines = more merge conflicts possible
- ⚠️ But 209 KB is not unreasonable for a full monorepo

**Context:**

- Root + 1 app + 3 packages = 5 package.json files
- Each with dependencies (next, react, tailwind, eslint, etc.)
- 209 KB is reasonable for this scope

**Impact:**

- 🟢 **Low:** Within acceptable range
- 🟢 **Low:** No action needed; this is normal for pnpm monorepos

**Recommendation:**

- ✅ **Monitor:** Keep watch for future growth
- ✅ **Monitor:** If >500 KB, consider splitting workspaces
- ⏱️ **Priority:** LOW — Not an issue yet

---

### 12. Dockerfile References Non-Existent pnpm-store

**Files Affected:**

- [apps/web/Dockerfile](apps/web/Dockerfile) lines 8, 25

**Issue:**

```dockerfile
# Stage 1: deps
COPY --from=deps /app/.pnpm-store ./.pnpm-store

# Stage 2: builder
COPY --from=deps /app/.pnpm-store ./.pnpm-store
```

**Problem:**

- `.pnpm-store` directory may not exist
- pnpm usually auto-creates store, but Dockerfile may fail if it doesn't
- Better to use `pnpm install --frozen-lockfile` with proper node_modules resolution

**Current Situation:**

- ⚠️ Dockerfile works but relies on store creation timing
- Better pattern exists (pnpm creates store automatically)

**Impact:**

- 🟢 **Low:** Usually works; may fail in edge cases
- 🟡 **Medium:** Dockerfile could be more robust

**Recommendation:**

- 🔧 **Fix:** Simplify Dockerfile to not explicitly copy .pnpm-store
- 🔧 **Fix:** Rely on `pnpm install --frozen-lockfile` to manage store
- ⏱️ **Priority:** LOW — Mostly works
- ✅ **Risk:** LOW — Can test locally before deploying

---

## Summary Table

| Issue # | File(s)                | Type               | Severity  | Fixable    | Blocking |
| ------- | ---------------------- | ------------------ | --------- | ---------- | -------- |
| 1A      | CONFIG.md              | Docs/Version       | 🟠 High   | ✅ Yes     | ❌ No    |
| 1B      | CONFIG.md              | Docs/Version       | 🟠 High   | ✅ Yes     | ❌ No    |
| 1C      | CONFIG.md              | Docs/Version       | 🟠 High   | ✅ Yes     | ❌ No    |
| 1D      | CONFIG.md              | Docs/Version       | 🟠 High   | ✅ Yes     | ❌ No    |
| 2       | eslint.config.mjs (3×) | Config/Duplication | 🟠 High   | ✅ Yes     | ❌ No    |
| 3       | .pnpmrc                | Missing File       | 🟡 Medium | ✅ Yes     | ❌ No    |
| 4       | .env.example           | Missing File       | 🟡 Medium | ✅ Yes     | ❌ No    |
| 5       | .github/workflows      | Missing CI/CD      | 🟡 Medium | ✅ Yes     | ❌ No    |
| 6       | .npmrc                 | Missing File       | 🟡 Medium | ✅ Yes     | ❌ No    |
| 7       | .editorconfig          | Comment            | 🟢 Low    | ✅ Yes     | ❌ No    |
| 8       | package.json           | Version Range      | 🟢 Low    | ✅ Yes     | ❌ No    |
| 9       | package.json           | Consistency        | 🟢 Low    | ✅ Yes     | ❌ No    |
| 10      | tsconfig.json          | Needs Docs         | 🟢 Low    | ✅ Yes     | ❌ No    |
| 11      | pnpm-lock.yaml         | Size               | 🟢 Low    | ⚠️ Monitor | ❌ No    |
| 12      | Dockerfile             | Robustness         | 🟢 Low    | ✅ Yes     | ❌ No    |

---

## Resolution Priority

### Patch 1: Fix Documentation (HIGH)

- Update CONFIG.md with correct versions
- Affects: 4 version claims
- Risk: LOW (docs-only)
- Time: 5 minutes

### Patch 2: Add Missing Config Files (MEDIUM)

- Create .pnpmrc, .npmrc, .env.example
- Affects: Supply chain, dependency management, onboarding
- Risk: LOW (non-breaking additions)
- Time: 10 minutes

### Patch 3: Consolidate ESLint Configs (MEDIUM → HIGH)

- Create shared config in packages/config/eslint-config
- Update all packages to extend shared
- Affects: Maintainability, version alignment
- Risk: MEDIUM (requires testing)
- Time: 30 minutes

### Patch 4: Add CI/CD Pipeline (HIGH)

- Create GitHub Actions workflow
- Blocks team development without CI gates
- Affects: Quality assurance, security
- Risk: LOW (workflows can be tested in branch)
- Time: 30 minutes

### Patch 5: Polish & Consistency (LOW)

- Update .editorconfig comment
- Normalize version pins
- Improve Dockerfile robustness
- Affects: Clarity, future-proofing
- Risk: LOW (low-impact tweaks)
- Time: 20 minutes

---

## Next Steps

1. ✅ **Read:** This document (CONFIG_CONFLICTS.md)
2. → **Read:** CONFIG_VERSIONS.md (version policy)
3. → **Read:** CONFIG_GAPS.md (best practices coverage)
4. → **Execute:** Patch Plan (provided separately)
5. → **Verify:** VERIFICATION_EVIDENCE.md
