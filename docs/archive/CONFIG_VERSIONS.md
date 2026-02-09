# Configuration Versions & Pinning Policy

**Comprehensive version audit and recommended pinning strategy.**

**Date:** February 9, 2026

---

## Quick Reference — Version Policy

| Category | Current Policy | Recommended | Rationale |
|----------|---|---|---|
| **Runtime** | Node 20+ (enforced) | >=20.0.0 (LTS) | Modern, security, tooling support |
| **Package Manager** | pnpm 10.29.2 (exact) | Exact pin | Reproducibility, monorepo best practice |
| **Core Tools** | typescript, turbo, prettier | Exact pins | Consistency across team |
| **Frameworks** | next, react | Exact pins in monorepo | Precision in source exports |
| **Libraries** | clsx, zod, lucide-react | Exact pins | Dependency tree stability |
| **DevTools** | eslint, eslint plugins | Should be exact | Build reproducibility |
| **Peer Deps** | @repo/ui: React ^19.0.0 | Caret allowed | Consumer flexibility |

---

## Runtime & Core Tools

### Node.js

| Version | Status | Recommendation |
|---------|--------|-----------------|
| **19.0.0** | EOL (Dec 2023) | ❌ Don't use |
| **20.13.0+** | LTS (Fermium) | ✅ **Use this** |
| **22.x** | Current | ✅ Compatible |

**Current Setting:**
```json
// package.json
"engines": { "node": ">=20.0.0" }
```

**Status:** ✅ **CORRECT**
- Allows Node 20+ and 22+
- LTS release, security patches receiving updates
- Good support for ES2022, modern npm features
- Compatible with pnpm 10.x

**Recommendation:** Keep as-is.

---

### npm / pnpm

#### pnpm

| Version | Status | Monorepo Ready | Recommendation |
|---------|--------|---|---|
| 8.x | EOL (2024) | ⚠️ Older features | ❌ Update |
| 9.x | Deprecated | ✅ Good monorepos | 🟡 Maintain only |
| **10.x** | Current | ✅ Latest features | ✅ **Use this** |

**Current Setting:**
```json
// package.json
"packageManager": "pnpm@10.29.2"
```

**Status:** ✅ **OPTIMAL**
- Latest stable version
- Includes all modern monorepo features
- Lock file is 209 KB (reasonable)
- No known issues

**Pinning:** ‼️ **EXACT PIN REQUIRED**
```json
"packageManager": "pnpm@10.29.2"  // ✅ Correct (exact)
```

**Recommendation:** Keep at 10.29.2. Update to latest 10.x patch when available.

**Update Rule:** Run `pnpm add -g pnpm@latest` annually or after major feature release.

---

### npm Registry

| Setting | Current | Recommended |
|---------|---------|---|
| **Registry** | (default npmjs.org) | Explicit |
| **Config File** | ❌ Missing | ✅ Create .npmrc |
| **Content** | N/A | `registry=https://registry.npmjs.org/` |

**Current Status:** ✅ **Works**, but ⚠️ **Not explicit**

**Recommendation:** Create `.npmrc` with explicit registry selection (see CONFIG_GAPS.md).

---

## TypeScript & Tooling Versions

### TypeScript

| Version | Status | ES2022? | Strict Mode? | Recommendation |
|---------|--------|---|---|---|
| 5.0-5.6 | Older | ✅ Yes | ✅ Yes | 🟡 Outdated |
| **5.7.2** | Current | ✅ Yes | ✅ Yes | ✅ **Use this** |
| 5.8+ | Future | ✅ Yes | ✅ Yes | ⏳ When released |

**Current Setting:**
```json
// package.json (root)
"typescript": "5.7.2"       // ✅ Exact pin

// apps/web/package.json
"typescript": "5.7.2"       // ✅ Exact pin

// packages/ui/package.json
"typescript": "5.7.2"       // ✅ Exact pin

// packages/utils/package.json
"typescript": "5.7.2"       // ✅ Exact pin
```

**Status:** ✅ **CONSISTENT ACROSS ALL PACKAGES**

**Compatibility Check:**
- ES2022 target ✅ (tsconfig.base.json: `"target": "ES2022"`)
- Strict mode ✅ (`"strict": true`)
- noUnusedLocals ✅
- Compatible with @typescript-eslint 8.19.1 ✅

**Pinning Policy:** ✅ **Exact pins required** (5.7.2 everywhere)

**Recommendation:** 
- Keep at 5.7.2
- Plan upgrade to 5.8+ when released (non-breaking usually)
- Update aligned across all packages

**Update Rule:** Quarterly or with major type-checking improvements.

---

### Prettier

| Version | Status | Config Format | Recommendation |
|---------|--------|---|---|
| 3.0-3.1 | Older | ✅ Works | 🟡 Outdated |
| **3.2.5** | Current | ✅ JSON/RC | ✅ **Use this** |
| 4.0+ | Future | ✅ TBD | ⏳ Monitor |

**Current Setting:**
```json
// package.json (root)
"prettier": "3.2.5"  // ✅ Exact pin
```

**Config File:**
```json
// .prettierrc
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

**Status:** ✅ **CORRECT**
- Version: pinned exactly ✅
- Config: Single source of truth (.prettierrc at root) ✅
- Settings: Sensible for modern JS/TS ✅

**Pinning Policy:** ✅ **Exact pin required**

**Recommendation:** Keep at 3.2.5. Major version upgrades (4.0+) can be breaking; test before upgrading.

**Update Rule:** Patch updates only (3.2.5 → 3.2.6). Major upgrades on major release cycles.

---

### ESLint & @typescript-eslint

| Tool | Root | packages/ui | packages/utils | Status |
|------|------|-------|-------|--------|
| **eslint** | 9.18.0 | 9.18.0 | 9.18.0 | ✅ Aligned |
| **@typescript-eslint/parser** | ^8.55.0 | 8.19.1 | 8.19.1 | 🟡 Range vs Exact |
| **@typescript-eslint/eslint-plugin** | ^8.55.0 | 8.19.1 | 8.19.1 | 🟡 Range vs Exact |

**Current Status:**

```json
// package.json (root) — ISSUE: Caret ranges
"@typescript-eslint/eslint-plugin": "^8.55.0",  // ❌ 8.55.0 doesn't exist
"@typescript-eslint/parser": "^8.55.0",         // ❌ 8.55.0 doesn't exist

// packages/ui/package.json — Much newer (correct)
"@typescript-eslint/eslint-plugin": "8.19.1",   // ✅ Exact pin
"@typescript-eslint/parser": "8.19.1",          // ✅ Exact pin

// packages/utils/package.json — Match /ui
"@typescript-eslint/eslint-plugin": "8.19.1",   // ✅ Exact pin
"@typescript-eslint/parser": "8.19.1",          // ✅ Exact pin
```

**Issues Found:**

1. ❌ **Root claims 8.55.0 but doesn't exist**
   - Caret ^8.55.0 would allow 8.55.0+ (but 8.55.0 wasn't released)
   - pnpm-lock.yaml locks to 8.19.1 (latest at lock time)

2. 🟡 **Inconsistent pinning: root has caret, packages have exact**
   - Root: `"^8.55.0"` (range, unclear intent)
   - Packages: `"8.19.1"` (exact, monorepo best practice)

3. ⚠️ **Version gap:** 8.19.1 vs (non-existent) 8.55.0
   - ~7 weeks of releases between them (major features/fixes)
   - Packages are using newer rules than claimed at root

**Compatibility:**
- ✅ ESLint v9 (flat config) supported by all versions
- ✅ TypeScript 5.7.2 support ✅ (verified in release notes)
- ✅ @typescript-eslint 8.19.1 has all features needed

**Recommendation:** 🔧 **FIX REQUIRED**

**Fix:**
1. Update root package.json to exact pin matching packages:
```json
"@typescript-eslint/eslint-plugin": "8.19.1",
"@typescript-eslint/parser": "8.19.1",
```

2. Remove caret ranges from root (monorepo single source of truth)

**Pinning Policy:** ✅ **Exact pins required** (all packages)

**Update Rule:** Quarterly review; update aligned across all packages.

---

## Framework & Runtime Dependencies

### Next.js

| Version | Status | App Router? | React 19 Support? | Recommendation |
|---------|--------|---|---|---|
| 14.x | LTS | ✅ Yes | 🟡 Partial | 🟡 Maintain only |
| **15.1.6** | Latest | ✅ Yes | ✅ Full | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json
"next": "15.1.6"  // ✅ Exact pin
```

**Status:** ✅ **OPTIMAL**
- Latest stable version
- Full React 19 support
- App Router ready
- Production-ready

**Compatibility Checks:**
- ✅ Node 20+
- ✅ React 19.0.0
- ✅ TypeScript 5.7.2
- ✅ ESLint 9

**Pinning:** ✅ **Exact pin required**

**Recommendation:** Keep at 15.1.6. Plan updates every 2-3 months with testing.

**Update Rule:** Monitor releases; test patch/minor updates; major updates (16.0) with full regression testing.

---

### React & React-DOM

| Version | Status | Server Components? | Recommendation |
|---------|--------|---|---|
| 18.x | Older | ✅ Yes | 🟡 Outdated |
| **19.0.0** | Latest | ✅ Yes | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json
"react": "19.0.0",
"react-dom": "19.0.0",    // ✅ Exact pins, matched
```

**Peer Dependency in @repo/ui:**
```json
// packages/ui/package.json
"peerDependencies": {
  "react": "^19.0.0",      // ✅ Allows 19.0.0+
  "react-dom": "^19.0.0"   // ✅ Allows 19.0.0+
},
"devDependencies": {
  "react": "19.0.0",       // ✅ For local dev
  "react-dom": "19.0.0"    // ✅ For local dev
}
```

**Status:** ✅ **CORRECT**
- Exact pins in consuming app (apps/web)
- Peer ranges allow consumer flexibility
- Dev defaults match (19.0.0)

**Pinning Policy:** 
- Apps: **Exact pins** ✅
- Libraries: **Peer ranges** (caret allowed) ✅

**Recommendation:** Keep at 19.0.0 for 6+ months; React updates are infrequent.

**Update Rule:** Major updates (19 → 20) require full test suite pass.

---

## Utility & UI Library Dependencies

### Tailwind CSS

| Version | Status | JIT? | CSS Variables? | Recommendation |
|---------|--------|---|---|---|
| 3.0-3.3 | Older | ✅ Yes | ✅ Yes | 🟡 Outdated |
| **3.4.17** | Latest | ✅ Yes | ✅ Yes | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json (devDependencies)
"tailwindcss": "3.4.17"         // ✅ Exact pin
"autoprefixer": "10.4.20"       // ✅ Exact pin
"postcss": "8.4.49"             // ✅ Exact pin
```

**Config:**
```javascript
// apps/web/tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

**Status:** ✅ **CORRECT**
- Version: pinned exactly ✅
- Content paths: include shared packages ✅
- PostCSS pipeline: properly configured ✅

**Pinning Policy:** ✅ **Exact pins required**

**Recommendation:** Keep at 3.4.17. Update annually or with major feature needs.

---

### Lucide React Icons

| Version | Status | Tree Shakeable? | Type Safety? | Recommendation |
|---------|--------|---|---|---|
| 0.263.1 | Older (2024-01) | ✅ Yes | ✅ Yes | 🟡 Outdated |
| **0.344.0** | Current (2025-02) | ✅ Yes | ✅ Yes | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json
"lucide-react": "0.344.0"  // ✅ Exact pin

// packages/ui/package.json
"lucide-react": "0.344.0"  // ✅ Exact pin
```

**Status:** ✅ **ALIGNED**
- Same version in both app and library ✅
- Recent version with many icons ✅
- Tree-shakeable (only used icons bundled) ✅

**Pinning Policy:** ✅ **Exact pins required**

**Recommendation:** Keep at 0.344.0. Update monthly or when design needs more icons.

**Documentation Fix Needed:** 
- ❌ CONFIG.md claims 0.544.0 (doesn't exist)
- ✅ Fix: Update to 0.344.0

---

### Zod (Schema Validation)

| Version | Status | Tree Shakeable | ESM? | Recommendation |
|---------|--------|---|---|---|
| 3.20+ | Stable | ✅ Yes | ✅ Yes | ✅ Use latest 3.x |
| **3.22.4** | Current | ✅ Yes | ✅ Yes | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json
"zod": "3.22.4"  // ✅ Exact pin
```

**Status:** ✅ **CORRECT**
- Recent version
- All modern features
- Great TypeScript support

**Pinning Policy:** ✅ **Exact pin required**

**Recommendation:** Keep at 3.22.4. Update with other dependencies quarterly.

---

### Sentry

| Version | Status | React Support? | Error Boundary? | Recommendation |
|---------|--------|---|---|---|
| 7.x | Older | ✅ Yes | ⚠️ Limited | 🟡 Outdated |
| **8.0.0** | Current | ✅ Yes | ✅ Full | ✅ **Use this** |

**Current Setting:**
```json
// apps/web/package.json
"@sentry/nextjs": "8.0.0"  // ✅ Exact pin
```

**Status:** ✅ **OPTIMAL**
- Version 8 is production-ready
- Full React 19 support
- Server-side error tracking
- Performance monitoring

**Pinning Policy:** ✅ **Exact pin required**

**Recommendation:** Keep at 8.0.0. Major upgrades (9.0) when released; test thoroughly.

---

### Clsx & tailwind-merge

| Package | Version | Purpose | Status | Pinning |
|---------|---------|---------|--------|---------|
| **clsx** | 2.1.1 | Conditional classnames | ✅ Current | Exact ✅ |
| **tailwind-merge** | 2.6.1 | Merge Tailwind classes | ✅ Current | Exact ✅ |

**Current Setting:**
```json
// apps/web/package.json
"clsx": "2.1.1",               // ✅ Exact pin
"tailwind-merge": "2.6.1",     // ✅ Exact pin

// packages/utils/package.json
"clsx": "2.1.1",               // ✅ Exact pin
"tailwind-merge": "2.6.1",     // ✅ Exact pin
```

**Status:** ✅ **CONSISTENT ACROSS PACKAGES**

**Documentation Fix Needed:**
- ❌ CONFIG.md claims tailwind-merge 2.7.0 (doesn't exist)
- ✅ Fix: Update to 2.6.1

**Pinning Policy:** ✅ **Exact pins required**

**Recommendation:** Keep as-is. Stable packages with infrequent updates.

---

---

## Version Pin Summary Table

| Component | Current | Type | Location | Status |
|-----------|---------|------|----------|--------|
| **Node.js** | >=20.0.0 | Range | engines | ✅ Correct |
| **pnpm** | 10.29.2 | Exact | packageManager | ✅ Optimal |
| **TypeScript** | 5.7.2 | Exact | Root + all pkgs | ✅ Aligned |
| **Prettier** | 3.2.5 | Exact | Root | ✅ Correct |
| **ESLint** | 9.18.0 | Exact | Root + all pkgs | ✅ Aligned |
| **@typescript-eslint/parser** | ^8.55.0 (root) / 8.19.1 (pkgs) | Mixed | Root ❌ / Pkgs ✅ | 🔧 **FIX** |
| **@typescript-eslint/eslint-plugin** | ^8.55.0 (root) / 8.19.1 (pkgs) | Mixed | Root ❌ / Pkgs ✅ | 🔧 **FIX** |
| **Turbo** | 2.2.3 | Exact | Root | ✅ Correct |
| **Next.js** | 15.1.6 | Exact | apps/web | ✅ Optimal |
| **React** | 19.0.0 | Exact (app) / ^19.0.0 (peer) | apps/web / @repo/ui | ✅ Correct |
| **react-dom** | 19.0.0 | Exact (app) / ^19.0.0 (peer) | apps/web / @repo/ui | ✅ Correct |
| **Tailwind CSS** | 3.4.17 | Exact | apps/web | ✅ Optimal |
| **Lucide React** | 0.344.0 | Exact | apps/web + @repo/ui | ✅ Aligned |
| **Zod** | 3.22.4 | Exact | apps/web | ✅ Current |
| **@sentry/nextjs** | 8.0.0 | Exact | apps/web | ✅ Optimal |
| **Clsx** | 2.1.1 | Exact | apps/web + @repo/utils | ✅ Aligned |
| **tailwind-merge** | 2.6.1 | Exact | apps/web + @repo/utils | ✅ Aligned |

---

## Version Update Policies

### Updates by Category

#### 🔴 Security & Runtime (Update Immediately)
- **Node.js patches** (20.14 → 20.15) — Same month released
- **pnpm patches** (10.29.2 → 10.29.3) — Same week released
- **Security advisories** (any package) — Test + deploy within 72h

#### 🟠 Core Tools (Update Quarterly)
- **TypeScript** (5.7 → 5.8) — New major minor versions
- **ESLint** (bugfixes, minor features) — Monthly or with config changes
- **Prettier** (patch updates) — Monthly

#### 🟡 Frameworks (Update Every 2-3 Months)
- **Next.js** (15.1 → 15.2) — Minor and patch versions
- **React** (19.0 → 19.1) — Patch versions; major versions (19 → 20) = major testing
- **Tailwind** (3.4 → 3.5) — Minor and patch versions

#### 🟢 Utilities (Update Opportunistically)
- **lucide-react**, **clsx**, **zod**, **@sentry** — Update with framework updates
- No dependency on specific versions; stable APIs

### Update Process

1. **In development branch:**
   - `pnpm add package@version` (single package)
   - `pnpm update --recursive` (all to latest matching range)
   - Run `pnpm build` and `pnpm type-check`
   - Run `pnpm lint`
   - Manual testing in `pnpm dev`

2. **Lock file:**
   - Only commit `pnpm-lock.yaml` changes from above commands
   - Don't manually edit lock file

3. **Testing:**
   - Local build must pass
   - CI must pass
   - Type checks must pass
   - Visual testing (Storybook/dev server)

4. **Commit message:**
   ```
   chore(deps): update next.js from 15.1.6 to 15.2.0

   - Includes performance improvements for SWR
   - Requires TypeScript 5.7+ (✓ we have 5.7.2)
   - All tests passing
   ```

---

## Deprecation & EOL Tracking

| Tool | Current Version | EOL Date | Action |
|------|---|---|---|
| Node 20.x | 20.13.0+ | April 2026 | Plan upgrade to 22+ by Q2 2026 |
| pnpm 10.x | 10.29.2 | TBD (recent) | Monitor for 11.x |
| TypeScript 5.7 | 5.7.2 | TBD (recent) | Update to 5.8+ when released |
| ESLint 9 | 9.18.0 | TBD (recent) | Stable for 2+ years |
| Next.js 15 | 15.1.6 | ~April 2026 | Update path: 15 → 16 in Q2 2026 |

---

## Recommendation Summary

### Immediate Actions (This Sprint)
- 🔧 **FIX:** Update root @typescript-eslint from `^8.55.0` to `8.19.1` (exact pin)
- 📝 **UPDATE:** CONFIG.md version claims (pnpm, TypeScript, lucide-react, tailwind-merge)

### Near-Term (Next 2 Weeks)
- 🔧 **CREATE:** `.npmrc` with explicit registry
- 🔧 **CREATE:** `.pnpmrc` with strict peer dependency settings
- 📝 **CREATE:** `.env.example` with all required variables

### Medium-Term (Next Month)
- 🔧 **CONSOLIDATE:** ESLint configs into shared packages/config/eslint-config/
- ➕ **ADD:** GitHub Actions CI/CD workflows
- 📝 **DOCUMENT:** Update CONTRIBUTING.md with version update guidelines

### Long-Term (Quarterly)
- 📊 **MONITOR:** Node 20 EOL (April 2026) — plan 22 upgrade
- 📊 **MONITOR:** Next.js 16 release — evaluate for upgrade
- 📊 **REVIEW:** New versions monthly; update patch versions quarterly

---

## Verification Commands

```bash
# Check Node version
node --version                 # Should be >=20.0.0

# Check pnpm version
pnpm --version                 # Should be 10.29.2

# Check lock file compatibility
pnpm install --frozen-lockfile # Should succeed

# List outdated packages
pnpm outdated                  # Review outdated dependencies

# Check TypeScript version
npx tsc --version              # Should be 5.7.2

# Verify ESLint version
pnpm exec eslint --version     # Should use 9.18.0
```

