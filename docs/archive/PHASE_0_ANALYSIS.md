# Phase 0 Foundation Analysis

**Date:** 2026-02-13  
**Purpose:** Deep codebase analysis to determine if any Phase 0 (foundation) tasks must be completed before continuing Phase 1+ work.  
**Sources of truth:** CODEBASE_ANALYSIS.md, ARCHITECTURE.md, TODO.md.

---

## 1. What Is “Phase 0”?

Phase 0 is not a formal phase in TODO.md; Phase 1 is the first listed phase with **Verify:** `pnpm build` (both templates), `pnpm test` (both templates)`.

- **TESTING_STATUS.md** and **ARCHIVE.md** define a completed “Phase 0 — Critical Infrastructure & Build Fixes” (package config, dependencies, type-check, lint, env, Tailwind, etc.).
- For this analysis, **Phase 0** means: **everything required so that Phase 1 can be built on a solid foundation** — i.e. both templates build, tests pass, and there are no structural or config issues that would block or confuse Phase 1.

---

## 2. Executive Summary

| Check | Status | Blocker? |
|-------|--------|----------|
| `pnpm build` (both templates) | **FAILS** | **Yes** |
| `pnpm test` (full monorepo) | **4 tests fail** | **Yes** |
| Workspace & package layout | OK | No |
| Phase 1 verify criteria | Not met | Yes |

**Conclusion:** Yes — **Phase 0 work remains**. The repo does not currently meet the Phase 1 verification criteria (`pnpm build` and `pnpm test` for both templates). The following must be fixed before continuing Phase 1.

---

## 3. Blocking Issues (Must Fix Before Continuing)

### 3.1 Build failure — Zod / `zodResolver` type error

**Where:** Both `templates/hair-salon` and `templates/plumber` fail at build with the same error.

**Error:**
```text
./features/booking/components/BookingForm.tsx:48:27
Type error: Argument of type 'ZodObject<...>' is not assignable to parameter of type 'ZodType<any, any, any>'.
  Type '...' is missing the following properties from type 'ZodType<any, any, any>': "~standard", "~validate"
```

**Cause:** Type mismatch between the Zod schema (Zod 3.22) and the type expected by `@hookform/resolvers`’s `zodResolver`. The lockfile has both `zod@3.22.4` and `zod@3.25.76`; the “~standard”, “~validate” fields are from newer Zod (3.23+). So either:

- A dependency is pulling in or typing against a different Zod version, or  
- The resolver’s generic expects the newer Zod shape.

**Impact:** Phase 1 Verify explicitly requires `pnpm build` for both templates. This blocks.

**Fix direction:** Align Zod usage and types (e.g. single Zod version, or type assertion / adapter for `zodResolver`) so both templates build. See §5.1 below.

---

### 3.2 Test failures — `packages/infra`

**Where:** Root `pnpm test` — 4 failing tests in `packages/infra`.

#### 3.2.1 `request-validation.test.ts` (1 failure)

- **Test:** “Missing headers configuration › should allow missing headers when configured”.
- **Expectation:** `mockLogger.warn` is not called when `allowMissingHeaders: true` and origin/referer are missing.
- **Actual:** `logger.warn` is called with `"CSRF: No origin or referer header"`.
- **Cause:** In `request-validation.ts` (lines 142–144), when both origin and referer are missing, the code always calls `logger?.warn?.(reason, ...)` before returning; it does not skip logging when `allowMissingHeaders` is true.
- **Fix:** Only log when the request is actually rejected (i.e. when `!allowMissingHeaders`). See §5.2.

#### 3.2.2 `rate-limit.test.ts` (3 failures)

- **Tests:**  
  - “checkMultipleLimits › passes when all limits are within bounds”  
  - “checkMultipleLimits › handles different limit types”  
  - “resetRateLimit › resets email rate limit”
- **Cause (reset test):** `limitByEmail('test@example.com')` uses preset **contact** (default for `limitByEmail`). `resetRateLimit('email', 'test@example.com')` defaults to preset **general**. The factory caches limiters by preset; so reset runs on the **general** limiter while the **contact** limiter still has the count — so the second `limitByEmail` still sees the previous usage and fails.
- **Cause (checkMultipleLimits):** Likely shared in-memory state across tests (same identifiers / presets used in other tests), or test order dependence, so limits are already consumed when the test runs.
- **Fix:**  
  - For reset test: call `resetRateLimit('email', 'test@example.com', 'contact')` so the same preset (and thus same limiter instance) is reset.  
  - For checkMultipleLimits: ensure tests use unique identifiers or clear the factory cache between tests (e.g. `legacyRateLimit.resetRateLimiterState()`). See §5.3.

---

## 4. Non-Blocking but Important (Recommend Before / Early Phase 1)

### 4.1 Declare `@repo/infra` in template dependencies

- **Current:** Both templates import `@repo/infra/security/request-validation` (and may use other infra exports). They resolve via **tsconfig paths** only; neither template lists `@repo/infra` in `package.json`.
- **Risk:** Runtime or tooling may not resolve `@repo/infra` consistently; future changes could break without a clear dependency.
- **Recommendation:** Add `"@repo/infra": "workspace:*"` to both templates’ `package.json` dependencies.

### 4.2 Port conflict (TODO 1.9.7)

- **Current:** Both templates use `next dev --port 3100` and `next start --port 3100`.
- **TODO 1.9.7:** Plumber should use port **3101** so both can run at once.
- **Recommendation:** Change `templates/plumber/package.json` scripts to use `-p 3101` for dev and start. Quick win; avoids confusion during Phase 1.

### 4.3 Jest `moduleNameMapper` and coverage

- **Current:** Root `jest.config.js` maps `@/*` to `templates/hair-salon/*` only. Plumber tests that use `@/*` resolve to hair-salon paths. `collectCoverageFrom` does not include `packages/infra` or `templates/plumber`.
- **Impact:** Plumber-specific tests (if any) would be wrong; infra coverage is not collected.
- **Recommendation:** Either (a) add a plumber-specific Jest config that maps `@/*` to plumber when running from plumber, or (b) document that root Jest is hair-salon–centric and run template tests from each template. Add `packages/infra/**` (and optionally `templates/plumber/...`) to `collectCoverageFrom` so Phase 1 “pnpm test” reflects reality.

### 4.4 ESLint warning in build

- **Current:** `lib/actions/submit.ts` line 33 triggers `@typescript-eslint/no-explicit-any` during Next.js build.
- **Impact:** Build fails on the Zod error first; once that is fixed, this may fail the build if Next is configured to treat ESLint warnings as errors.
- **Recommendation:** Replace or narrow the `any` type (or add a minimal eslint-disable with a comment) so the build stays clean after the Zod fix.

---

## 5. Recommended Fixes (Order of Operations)

### 5.1 Restore build (Zod / zodResolver)

**Option A (minimal):** In both templates’ `BookingForm.tsx`, use a type assertion so the schema is accepted by `zodResolver`, e.g.:

```ts
resolver: zodResolver(bookingFormSchema as z.ZodType<BookingFormData>),
```

(or equivalent that matches your Zod and resolver types). This unblocks the build without changing behavior.

**Option B:** Unify Zod to a single version (e.g. 3.22.4) across the monorepo and ensure `@hookform/resolvers` and Zod types align; then remove any assertion if no longer needed.

### 5.2 request-validation: only log when rejecting

In `packages/infra/security/request-validation.ts`, change the “no origin or referer” branch so we only log when the request is actually rejected:

```ts
if (!origin && !referer) {
  const reason = 'CSRF: No origin or referer header';
  if (!allowMissingHeaders) {
    logger?.warn?.(reason, { host, expectedHost });
  }
  return {
    isValid: allowMissingHeaders,
    ...
  };
}
```

### 5.3 rate-limit tests

- **resetRateLimit test:** Call `resetRateLimit('email', 'test@example.com', 'contact')` to match the preset used by `limitByEmail('test@example.com')`.
- **checkMultipleLimits tests:** Use unique identifiers per test (e.g. unique emails / IPs / user ids) or call `legacyRateLimit.resetRateLimiterState()` (or equivalent) at the start of the affected tests so in-memory state is not shared with other tests.

---

## 6. What Is Already Solid

- **Workspace:** `pnpm-workspace.yaml` includes `packages/*`; `packages/infra` is present and built by Turbo.
- **Infra package:** Has CSP, security-headers, sanitize, rate-limit, request-validation with tests; both templates use `@repo/infra` for request-validation; tsconfig paths resolve.
- **Phase 0 (ARCHIVE):** Package config, ESLint, TypeScript paths, env, Tailwind, and earlier build/runtime fixes are done.
- **Templates:** Same structure; only request-validation is migrated to infra; csp, security-headers, logger, env, etc. still live in template `lib/` (migration continues in Phase 1).

---

## 7. Phase 0 Checklist (Before Continuing Phase 1)

- [x] **Build:** Fix Zod/zodResolver type error so `pnpm build` passes for both templates. *(Done: type assertion in BookingForm + ContactForm.)*
- [x] **Tests:** Fix the 4 failing infra tests. *(Done: request-validation only logs when rejecting; rate-limit tests use correct preset + cache reset.)*
- [x] **Verify:** Run `pnpm build` and `pnpm test` from root — both pass.
- [x] (Recommended) Add `@repo/infra` to both templates’ `package.json`.
- [x] (Recommended) Set plumber dev/start port to 3101 (TODO 1.9.7).
- [ ] (Optional) Tighten Jest coverage and plumber `@/*` resolution as in §4.3.

Foundation meets Phase 1 verify criteria. You can safely continue with Phase 1 tasks (e.g. 1.1.7 middleware factory, 1.1.8 logger, etc.).
