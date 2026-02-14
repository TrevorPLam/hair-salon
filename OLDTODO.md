# Marketing Website Monorepo - Implementation TODO

**Last Updated:** February 14, 2026  
**Goal:** Transform from template-based to feature-based, industry-agnostic marketing website platform  
**Timeline:** 12 weeks  
**Current State:** Single hair-salon template → **Target State:** 12 industries, 20+ components, configuration-driven

## AI Agent Usage Instructions

This TODO file is designed to be trackable by AI agents. Each task includes the following fields:

- **Status:** Current task state - `[x]` for completed, `[ ]` for pending
- **Assigned To:** Agent or person responsible
- **Completed:** Completion date

### How AI Agents Can Update Tasks

1. **Mark task as in progress:**

   ```markdown
   **Status:** [🔄] IN_PROGRESS | **Assigned To:** [AgentName] | **Completed:** [ ]
   ```

2. **Mark task as completed:**

   ```markdown
   **Status:** [x] COMPLETED | **Assigned To:** [AgentName] | **Completed:** [YYYY-MM-DD]
   ```

3. **Mark task as blocked:**

   ```markdown
   **Status:** [🚫] BLOCKED | **Assigned To:** [AgentName] | **Completed:** [ ]
   ```

### Task Status Legend

- `[ ]` = TODO/Pending
- `[🔄]` = IN_PROGRESS
- `[x]` = COMPLETED
- `[🚫]` = BLOCKED
- `[⏸️]` = PAUSED

---

## Quick Navigation

- [Verified Findings (Feb 14 Audit)](#verified-findings-february-14-2026-audit)
- [Execution Strategy](#execution-strategy)
- [Client Launch Critical Path (Reprioritized)](#client-launch-critical-path-reprioritized)
- [Reprioritized Task Index (Now / Next / Later)](#reprioritized-task-index-now--next--later)
- [Priority 0: Housekeeping & Tech Debt (Week 0)](#priority-0-housekeeping--tech-debt-week-0)
- [Priority 1: Foundation (Weeks 1-2)](#priority-1-foundation-weeks-1-2)
- [Priority 2: Marketing Components & Features (Weeks 3-5)](#priority-2-marketing-components--features-weeks-3-5)
- [Priority 3: Page Templates (Weeks 5-6)](#priority-3-page-templates-weeks-5-6)
- [Priority 4: Integrations (Weeks 6-8)](#priority-4-integrations-weeks-6-8)
- [Priority 5: Client Architecture (Weeks 7-9)](#priority-5-client-architecture-weeks-7-9)
- [Priority 6: Cleanup & Documentation (Weeks 9-12)](#priority-6-cleanup--documentation-weeks-9-12)
- [Comparative Gap Closure Backlog (Cross-Cutting)](#comparative-gap-closure-backlog-cross-cutting)
- [Phase 7-10: Future Phases](#phase-7-ai--intelligence-layer-future---weeks-13-16)
- [Code Patterns & Templates](#code-patterns--templates)
- [File Reference Guide](#file-reference-guide)

---

## AOS Architecture Mapping

This implementation follows the **Agency Operating System (AOS)** seven-layer architecture model:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 7: Client Experience Layer      (White-labeled client portals)      │ ← Future Phase
│  LAYER 6: AI & Intelligence Layer      (Agentic workflows, predictive)     │ ← Future Phase
│  LAYER 5: Orchestration Layer          (Campaign management, MRM, CDP)       │ ← Future Phase
│  LAYER 4: Content & Asset Layer        (DAM, Headless CMS, Visual Editing)   │ ← Phase 3-4
│  LAYER 3: Experience Layer             (Composed sites, apps, PWA)           │ ← Phase 2-3 ▶ CURRENT
│  LAYER 2: Component Library            (Atomic design system)                │ ← Phase 1-2 ▶ CURRENT
│  LAYER 1: Data & Analytics Layer       (Real-time CDP, attribution)         │ ← Future Phase
│  LAYER 0: Infrastructure Layer         (Multi-tenant SaaS, edge, security)    │ ← @repo/infra exists
└─────────────────────────────────────────────────────────────────────────────┘
```

### Current Scope (Layers 2-3)

| Layer  | Package                      | Status                    | Tasks                                                 |
| ------ | ---------------------------- | ------------------------- | ----------------------------------------------------- |
| **--** | Housekeeping (Priority 0)    | 🔴 Not Started            | Config fixes, Turbo upgrade, perf baseline (10 tasks) |
| **L2** | `@repo/ui`                   | 🟡 8 of 14                | +6 UI primitives (Dialog, Toast, Tabs, etc.)          |
| **L2** | `@repo/marketing-components` | 🔴 Not Started            | 10 marketing components (Hero, Services, etc.)        |
| **L2** | `@repo/features`             | 🔴 Not Started            | 9 feature modules (incl. Search — was undercounted)   |
| **L2** | `@repo/types`                | 🟡 Exists as @repo/shared | Move to packages/types/, extend SiteConfig            |
| **L3** | `@repo/page-templates`       | 🔴 Not Started            | 6 page templates (Home, Services, etc.)               |
| **L3** | `clients/`                   | 🔴 Not Started            | 5 example client implementations                      |
| **L0** | `@repo/infra`                | 🟢 Exists                 | Security, middleware, logging, 7 env schemas          |
| **L0** | `@repo/integrations`         | 🟡 Partial                | 3 integrations exist, 6 more planned                  |

### Future Expansion (Layers 4-7)

| Layer  | Component              | Timeline  |
| ------ | ---------------------- | --------- |
| **L4** | Visual Page Builder    | Phase 4   |
| **L4** | AI Content Engine      | Phase 5   |
| **L5** | Campaign Orchestration | Phase 6   |
| **L6** | Agent Orchestration    | Phase 5-6 |
| **L6** | LLM Gateway            | Phase 5   |
| **L7** | Client Portals         | Phase 7   |

---

## Verified Findings (February 14, 2026 Audit)

The following corrections and discoveries were made by auditing the actual codebase against
prior analysis. These findings directly inform task priorities and estimates.

### Corrections to Prior Analysis

| Claim                               | Actual                                                              | Impact                       |
| ----------------------------------- | ------------------------------------------------------------------- | ---------------------------- |
| "7 packages"                        | 5 top-level dirs → ~10 workspace packages                           | Package count was misleading |
| Search feature "no components"      | Has SearchDialog (6.3KB) + SearchPage (3.5KB)                       | Less extraction work needed  |
| Services feature "1 component"      | Has ServicesOverview + ServiceDetailLayout (8KB)                    | Less extraction work needed  |
| Booking lib "4 files incl utils.ts" | 3 files (no utils.ts) + 1 test dir                                  | Minor                        |
| navLinks "7 items"                  | 6 items (no Contact in nav)                                         | Minor                        |
| @repo/utils "zero dependencies"     | Has clsx + tailwind-merge as runtime deps                           | Incorrect claim              |
| conversionFlow "only booking"       | SiteConfig type supports 4 flows: booking, contact, quote, dispatch | **Reduces Task 1.8 scope**   |
| "No tests in template features"     | 4 test files in template (blog, booking, env, search)               | Test baseline is better      |
| Turbo "v2.8.4 available"            | Latest stable is v2.8.7+                                            | Gap is larger                |
| INP "replaces FID March 2026"       | INP replaced FID in **March 2024**                                  | Already in effect            |

### Previously Undocumented

- **@repo/shared** (`templates/shared/`): Defines `SiteConfig` type with 4 conversion flow
  types via discriminated union. Critical package not inventoried in prior analysis.
- **7 env validation schemas** in `packages/infra/env/schemas/` (base, booking, hubspot,
  public, rate-limit, sentry, supabase) — significant Zod infrastructure.
- **Config conflict**: `.npmrc` sets `node-linker=hoisted`, `.pnpmrc` sets `node-linker=pnpm`.
- **Workspace glob mismatch**: `package.json` workspaces omits `packages/integrations/*`,
  `packages/features/*`, `apps/*` — but `pnpm-workspace.yaml` includes them.
- **Next.js 16** released Oct 2025 (with 16.1). Project on 15.5.12 (Maintenance LTS).
- **Tailwind CSS v4.0** released Jan 2025. Project on v3.4.17 — one major version behind.
- **Template has 5 extra deps** not in prior listing: `@hookform/resolvers`, `reading-time`,
  `rehype-pretty-code`, `rehype-slug`, `remark-gfm`.
- **API routes**: health/ and og/ (not just og/).
- **Infra has 14 export paths** (not the simplified list in prior analysis).
- **Broken infra export**: `package.json` exports `./security/create-middleware` →
  `./security/create-middleware.ts` but the file is at `middleware/create-middleware.ts`.
  The barrel export in `index.ts` correctly uses `./middleware/create-middleware`. The
  subpath export is broken (would fail if anyone imports from `@repo/infra/security/create-middleware`).

### Strategic Implications

1. **Task 1.8 scope reduction**: @repo/shared already has sophisticated SiteConfig with 4 flow
   types. Only need to ADD `industry`, `features`, `integrations` fields — not rebuild.
2. **Feature extraction is easier**: Search and Services have more components than documented.
3. **Tooling upgrades should come first**: Turbo 2.2.3→2.8.7+, Tailwind 3→4 evaluation,
   Next.js 15→16 evaluation are prerequisites that affect all downstream work.
4. **Config conflicts must be resolved**: The .npmrc/.pnpmrc conflict and workspace glob
   mismatch are ticking time bombs that could cause build failures.
5. **@repo/shared should move**: From `templates/shared/` to `packages/types/` as planned in
   Task 1.8, but the existing type infrastructure should be preserved, not rewritten.

---

## Execution Strategy

### Batching Strategy

| Batch | Tasks                    | Parallelizable       | Dependencies            | Est. Time |
| ----- | ------------------------ | -------------------- | ----------------------- | --------- |
| **0** | Housekeeping (0.1-0.10)  | ⚠️ Mostly parallel   | None                    | 1-2 days  |
| **1** | 6 UI primitives          | ✅ Yes (all 6)       | None                    | 3-4 days  |
| **2** | 10 marketing components  | ⚠️ Partial           | UI primitives           | 5-6 days  |
| **3** | Config + Industry types  | ✅ Yes               | 0.8 (move @repo/shared) | 2 days    |
| **4** | 9 features (extract+new) | ⚠️ Partial           | Config                  | 5-6 days  |
| **5** | 6 page templates         | ✅ Yes (3 at a time) | Components + Features   | 3-4 days  |
| **6** | 5 example clients        | ✅ Yes (all 5)       | Page templates          | 3-4 days  |
| **7** | Cleanup + Deprecation    | ❌ No                | All above               | 3-4 days  |

### Critical Path

```text
Batch 0 (Housekeeping) ──→ Batch 1 (UI Primitives) ──→ Batch 2 (Marketing Components) ──┐
                       └──→ Batch 3 (Config System) ──→ Batch 4 (Feature Extraction) ──┤
                                                                                        ├──→ Batch 5 (Page Templates)
                                                                                        │    └──→ Batch 6 (Clients)
                                                                                        │         └──→ Batch 7 (Cleanup)
```

**Key optimization:** Batches 1 and 3 can run in parallel after Batch 0.
Batch 2 depends on Batch 1. Batch 4 depends on Batch 3.
Batch 5 depends on BOTH Batch 2 and Batch 4.

---

## Client Launch Critical Path (Reprioritized)

> Objective: get the repository to a state where new client websites can be launched quickly and
> repeatedly, with minimum rework risk.

### Launch Principle

- Prioritize **client launch throughput** over long-horizon platform sophistication.
- Keep quality gates strict for stability/security, but defer non-blocking excellence work.
- Build an **MVP repeatable factory** first (starter + 2-3 client launches), then expand.

### Wave Plan (Fastest Path)

#### Wave 0 - Hard Blockers (Day 0-2)

Execute first, in parallel where possible:

- 0.1 Resolve Config File Conflicts
- 0.2 Sync Workspace Globs
- 0.3 Upgrade Turborepo
- 0.8 Move `@repo/shared` to `packages/types`
- 0.10 Fix Broken Infra Export Path
- 0.11 Enforce Monorepo Boundaries
- 0.13 Strengthen CI Quality Gates

**Exit criteria:** fresh clone + install + lint + type-check + build + test all pass.

#### Wave 1 - Client Config and Shared Feature Spine (Day 2-6)

- 1.8 Enhance Configuration System
- 1.9 Create Industry Types Package
- 2.11 Create `packages/features` structure
- 2.12 Extract Booking
- 2.13 Extract Contact
- 2.15 Extract Services
- 2.20 Extract Search
- 2.21 Establish Testing Strategy
- 2.22 Add Feature Parity Regression Tests

**Rationale:** these are the minimum high-value reusable features needed to launch service-business
clients quickly.

#### Wave 2 - Minimal Page Template Set (Day 6-9)

- 3.1 Create Page Templates Package
- 3.2 HomePageTemplate
- 3.3 ServicesPageTemplate
- 3.5 ContactPageTemplate
- 3.8 BookingPageTemplate

**Rationale:** this gives enough pages for lead generation and appointments without waiting on full
template catalog.

#### Wave 3 - First Launch Factory (Day 9-12)

- 5.1 Client Starter Template
- 5.2 Salon Example
- 5.3 Restaurant Example (or another target vertical)
- 5.7 Migration Validation Matrix
- 6.10 Final Cutover and Rollback Runbook (lightweight launch version)

**Exit criteria:** 2 production-like clients can be spun up from starter with config-only changes.

### Parallelization Model (Execution Efficiency)

- **Track A (Core Platform):** 0.x + C.1/C.2/C.3 + CI/release plumbing
- **Track B (Feature Extraction):** 2.11/2.12/2.13/2.15/2.20 + parity tests
- **Track C (Template Assembly):** 3.1/3.2/3.3/3.5/3.8 + starter client

Run all three tracks concurrently after Wave 0 constraints are green.

### Defer Until After First 2-3 Client Launches

The following remain important but are not immediate launch blockers:

- 0.4 Tailwind v4 evaluation
- 0.5 Next.js 16 evaluation/migration
- 1.4, 1.5, 1.6 (Dropdown, Tooltip, Popover)
- 2.16-2.19 (new non-core features)
- 3.4, 3.6, 3.7 (About/Blog templates)
- Most Phase 7+ and advanced innovation appendices (E/F), unless directly needed by active client deals

### Script-First Acceleration Ideas

- Add a single orchestration script: `scripts/program/launch-wave.ps1`
  - Runs wave checks in order
  - Stops on gate failures
  - Prints next unblocked tasks
- Add a bootstrap command: `pnpm create-client --from=starter-template --industry=<type>`
- Add a validation command: `pnpm validate-client <client-path>`
  - Config schema check
  - Route existence check
  - Required metadata/schema.org check
  - Build/lint/type-check smoke test

### Operational Gates for “Ready to Spin Up Clients”

- Gate 1: Repo integrity green (Wave 0)
- Gate 2: Reusable feature spine complete (Wave 1)
- Gate 3: Minimal page template set complete (Wave 2)
- Gate 4: Starter + 2 clients validated end-to-end (Wave 3)

### Reprioritized Task Index (Now / Next / Later)

Use this as the **single execution order** for day-to-day delivery. Existing task details remain
in their original sections.

#### NOW - Launch 2 client sites fast (execute immediately)

| Lane                   | Tasks                                              | Outcome                            |
| ---------------------- | -------------------------------------------------- | ---------------------------------- |
| Repo integrity         | 0.1, 0.2, 0.3, 0.8, 0.10, 0.11, 0.13               | Stable monorepo + CI               |
| Config + core features | 1.8, 1.9, 2.11, 2.12, 2.13, 2.15, 2.20, 2.21, 2.22 | Reusable feature spine             |
| Minimum template set   | 3.1, 3.2, 3.3, 3.5, 3.8                            | Launch-ready page assembly         |
| Client launch factory  | 5.1, 5.2, 5.3, 5.7                                 | Starter + 2 client implementations |
| Safety for rollout     | 6.10                                               | Cutover and rollback confidence    |

#### NEXT - Expand market readiness (after first 2 live-ready clients)

| Lane                     | Tasks                        | Outcome                           |
| ------------------------ | ---------------------------- | --------------------------------- |
| UX primitives completion | 1.4, 1.5, 1.6                | Complete interaction foundation   |
| Feature breadth          | 2.16, 2.17, 2.18, 2.19       | Broader industry capability       |
| Template breadth         | 3.4, 3.6, 3.7                | About + Blog template support     |
| Integrations expansion   | 4.1, 4.2, 4.3, 4.4, 4.5, 4.6 | Faster client-specific enablement |
| More client examples     | 5.4, 5.5, 5.6                | Multi-vertical proof              |

#### LATER - Scale, harden, and differentiate

| Lane                     | Tasks / Areas     | Outcome                                     |
| ------------------------ | ----------------- | ------------------------------------------- |
| Cleanup + docs + tooling | 6.1-6.9           | Operational maturity                        |
| Cross-cutting backlog    | C.1-C.18          | Platform governance and quality             |
| Advanced recommendations | D.1-D.8           | Enterprise-grade operating model            |
| Innovation programs      | E.1-E.7, F.1-F.12 | Differentiated UX and strategy capabilities |
| Future AOS layers        | Phase 7+          | Long-horizon platform evolution             |

#### Program cadence recommendation

- **Daily:** execute NOW lanes with WIP limit of 1 in-progress task per lane/team.
- **Twice weekly:** unblock review + dependency review across lanes.
- **Weekly release train:** ship from completed NOW tasks only; defer NEXT/LATER unless blocking active launch.

#### Scripted execution model

- `pnpm program:wave0` -> validates repo integrity tasks and gates
- `pnpm program:wave1` -> runs feature extraction checks + parity tests
- `pnpm program:wave2` -> validates template assembly and route integrity
- `pnpm program:wave3` -> spins starter/client verification and smoke tests

These scripts should be wrappers over existing package scripts and CI checks (no duplicated logic).

### Dependency Health Matrix (Sequencing Sanity)

Use this table during planning to prevent hidden blockers and out-of-order execution.

| Dependency Path          | Current State | Risk if Ignored                  | Execution Rule                                                          |
| ------------------------ | ------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `0.3 -> 0.13`            | ✅ Clean      | CI instability                   | Ship baseline CI gate immediately after Turbo upgrade                   |
| `0.8 -> 1.8 -> 1.9`      | ✅ Clean      | Type contract drift              | Finish package move before config/industry expansion                    |
| `1.7 -> 2.1-2.10`        | ✅ Clean      | Component package churn          | Build package scaffold first, then component variants                   |
| `2.11 -> 2.12/13/15/20`  | ✅ Clean      | Feature extraction thrash        | Do not start extraction before feature package skeleton exists          |
| `2.21 -> 2.22`           | ✅ Clean      | Weak parity confidence           | Establish strategy first, then parity suite                             |
| `2.12-2.20 -> 2.22`      | ✅ Clean      | Premature parity assertions      | Add parity tests per extracted feature, not before extraction           |
| `3.2/3.3/3.5/3.8 -> 5.1` | ✅ Clean      | Starter built on incomplete core | Only start starter template after minimum page set is done              |
| `5.1 -> 5.2/5.3/5.7`     | ✅ Clean      | Client examples diverge          | Use starter as single source for first launch factory                   |
| `6.1/5.2-5.6 -> 6.3`     | ✅ Clean      | Destructive removal risk         | Never delete `templates/` until migration validation matrix is complete |
| `6.3/6.9/5.7 -> 6.10`    | ✅ Clean      | Unrecoverable cutover            | Require rollback rehearsal before final cutover sign-off                |

**Fast blocker checks before starting any task:**

1. Confirm all listed dependencies are marked complete.
2. Confirm no dependency points to deferred NEXT/LATER work.
3. Confirm CI gate requirements for the task’s wave are already green.
4. Confirm rollback path exists for any destructive or migration task.

---

## Priority 0: Housekeeping & Tech Debt (Week 0)

> **Rationale:** These tasks fix inconsistencies and upgrade tooling BEFORE building new
> features. Skipping them risks cascading build failures, wasted rework from deprecated
> APIs, and developer confusion from conflicting configs.

### 0.1 Resolve Config File Conflicts

**Priority:** CRITICAL | **Effort:** 30 min | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** `.npmrc` sets `node-linker = hoisted` while `.pnpmrc` sets `node-linker=pnpm`.
These conflict. Since the project uses pnpm workspaces, `.pnpmrc` should win. The `.npmrc`
`node-linker` line should be removed.

**Research-backed guidance (2026):**

- pnpm now documents `nodeLinker` under workspace settings (`pnpm-workspace.yaml`) and
  supports `isolated | hoisted | pnp`.
- Keep one source of truth for linker strategy in monorepo root config to avoid ambiguous
  install behavior across local/CI environments.
- Keep `node-linker=pnpm` for this repo unless a hard tooling incompatibility is proven.

**Additions for near-perfect execution:**

- Add decision note in `docs/architecture/module-boundaries.md` (or `docs/tooling/pnpm.md`)
  explaining _why_ `node-linker=pnpm` is selected.
- Optional Windows hardening: if path length warnings appear, evaluate `virtualStoreDir`.

**Acceptance Criteria:**

- Root `.npmrc` no longer contains `node-linker`.
- Effective config resolves to `node-linker=pnpm` in all environments.
- Fresh `pnpm install` succeeds without linker warnings.

**Files:**

- Fix: `.npmrc` — remove `node-linker = hoisted`
- Verify: `.pnpmrc` — confirm `node-linker=pnpm` is the intended setting

---

### 0.2 Sync Workspace Glob Configuration

**Priority:** CRITICAL | **Effort:** 30 min | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** `package.json` workspaces field is missing `packages/integrations/*`,
`packages/features/*`, and `apps/*` that `pnpm-workspace.yaml` includes. Since pnpm uses
its own file, the `package.json` field is stale. Sync them to prevent IDE confusion and
ensure tooling consistency.

**Research-backed guidance (2026):**

- Monorepos should maintain a single authoritative workspace definition to prevent editor,
  task runner, and package manager drift.
- Keep `package.json` and `pnpm-workspace.yaml` aligned, even if pnpm primarily reads
  `pnpm-workspace.yaml`, because other tools often inspect `package.json`.

**Additions for near-perfect execution:**

- Add CI check to prevent future drift (script compares workspace arrays/files).
- Document policy: “workspace changes must update both files in same PR”.

**Acceptance Criteria:**

- `package.json` workspace globs exactly mirror `pnpm-workspace.yaml` package globs.
- `pnpm -r list --depth -1` includes expected package groups.
- CI fails on future workspace mismatch.

**Files:**

- Fix: `package.json` — add missing workspace globs to match `pnpm-workspace.yaml`

**Updated workspaces:**

```json
"workspaces": [
  "packages/*",
  "packages/config/*",
  "packages/integrations/*",
  "packages/features/*",
  "templates/*",
  "clients/*",
  "apps/*"
]
```

---

### 0.3 Upgrade Turborepo

**Priority:** HIGH | **Effort:** 1 hour | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Turbo 2.2.3 → 2.8.7+ (latest stable). This is a 6-minor-version gap with
significant improvements: affected package detection, composable configuration, devtools,
task search in TUI, sidecar tasks, and performance improvements.

**Research-backed guidance (2026):**

- Use official upgrade flow and codemods when crossing significant Turbo deltas.
- Confirm `tasks` key (not `pipeline`) and preserve root `packageManager` (already present).
- Validate affected-mode behavior and cache key correctness after upgrade.

**Additions for near-perfect execution:**

- Add post-upgrade benchmark note: compare `turbo build` wall time before/after on clean
  cache and warm cache.
- Capture any script/task naming inconsistencies discovered during migration.

**Acceptance Criteria:**

- `turbo` updated to current stable in root devDependencies.
- `pnpm turbo lint type-check test build` succeeds.
- No deprecation warnings from Turbo config on CI.

**Files:**

- Fix: `package.json` — update `turbo` devDependency
- Run: `pnpm up turbo@latest -D -w`
- Verify: `pnpm turbo build` succeeds

**Breaking changes to check:**

- Turbo v2.x uses `"tasks"` not `"pipeline"` (already correct in this repo)
- Review [Turborepo upgrade guide](https://turbo.build/repo/docs/crafting-your-repository/upgrading)

---

### 0.4 Evaluate Tailwind CSS v4 Migration

**Priority:** MEDIUM | **Effort:** 2 hours (evaluation only) | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Tailwind CSS v4.0 (released Jan 2025) is a major architectural change: CSS-first
configuration, no `tailwind.config.js`, native cascade layers, zero-config content detection.
The project uses v3.4.17. **This task is evaluation only** — decide whether to migrate now
or defer.

**Research-backed guidance (2026):**

- Tailwind v4 offers upgrade tooling (`npx @tailwindcss/upgrade`) but requires Node 20+ and
  modern browser baseline (Safari 16.4+, Chrome 111+, Firefox 128+).
- v4 removes legacy `@tailwind` directives in favor of `@import "tailwindcss"` and CSS-first
  theme/config patterns.

**Additions for near-perfect execution:**

- Produce a migration risk matrix:
  1. Browser support impact for client contracts.
  2. Shared preset migration complexity (`tailwind-preset.js` -> CSS variables/@theme).
  3. Plugin/library compatibility (Radix/shadcn patterns, prose tooling).
- If deferred, define explicit trigger condition (e.g., “migrate after first 2 clients live”).

**Acceptance Criteria:**

- Decision doc created with: migrate now / defer / hybrid pilot.
- If defer: backlog item includes trigger, owner, and revisit date.
- If proceed: pilot branch proves representative template builds and visual regressions pass.

**Decision factors:**

- v4 removes `tailwind.config.js` in favor of CSS `@theme` directives
- The shared `tailwind-preset.js` would need to become CSS-based
- Radix UI / shadcn compatibility with v4 should be confirmed
- If deferring, document the decision and add a future migration task

**Files to evaluate:**

- `packages/config/tailwind-preset.js` (must be reimplemented for v4)
- `templates/hair-salon/tailwind.config.js`
- All component files using Tailwind classes (verify compatibility)

---

### 0.5 Evaluate Next.js 16 Migration

**Priority:** MEDIUM | **Effort:** 2 hours (evaluation only) | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Next.js 16 (released Oct 2025, with 16.1 following) includes React 19.2 features,
stabilized Turbopack for production builds, and caching improvements. The project uses
15.5.12 (Maintenance LTS). **This task is evaluation only.**

**Research-backed guidance (2026):**

- Next 16 requires Node.js 20.9+ and makes Turbopack default for `next dev` and `next build`.
- Async Request APIs are fully enforced (`cookies`, `headers`, `draftMode`, `params`,
  `searchParams` async usage).
- `next lint` command removal means ESLint CLI must remain explicitly wired in scripts/CI.

**Additions for near-perfect execution:**

- Audit current code for sync dynamic API patterns before deciding migration timing.
- Audit webpack customizations/plugins that may block default Turbopack builds.
- Add migration readiness checklist (runtime APIs, image config, lint flow, cache behavior).

**Acceptance Criteria:**

- Written go/no-go recommendation with risks and mitigations.
- If go: migration branch passes full CI and route smoke tests.
- If no-go: create phased path and prework tasks with clear dependency chain.

**Decision factors:**

- React 19.2 new features vs. current React 19.0.0
- Turbopack prod builds (faster CI)
- Breaking changes in caching behavior
- Stability of Maintenance LTS vs. cutting-edge

**Reference:** [Next.js v16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)

---

### 0.6 Establish Performance Baseline

**Priority:** HIGH | **Effort:** 2 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Before making architectural changes, capture Core Web Vitals baseline for the
hair-salon template. This enables measuring the impact of the transformation.

**Research-backed guidance (2026):**

- Core Web Vitals pass thresholds (at p75) remain:
  - LCP <= 2.5s
  - INP <= 200ms
  - CLS <= 0.1
- Report metrics segmented by mobile/desktop and include both lab + field data when possible.

**Additions for near-perfect execution:**

- Record environment details with each run (CPU throttling, network profile, build mode).
- Add “performance budget policy” with fail thresholds for CI smoke runs.
- Track bundle-size deltas per PR using analyzer output artifacts.

**Acceptance Criteria:**

- Baseline report includes LCP/INP/CLS/FCP/TTFB and test methodology.
- Budget thresholds defined and checked in CI (or documented interim gating approach).
- Bundle analyzer integrated and documented for routine usage.

**Tasks:**

- Run Lighthouse CI on hair-salon template (local build)
- Record LCP, INP, CLS, TTFB, FCP scores
- Set performance budgets in `next.config.js`
- Add `@next/bundle-analyzer` for tracking JS bundle sizes

**Files:**

- Create: `docs/performance-baseline.md`
- Update: `templates/hair-salon/next.config.js` (add bundle analyzer)

---

### 0.7 Accessibility Audit

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** The codebase claims WCAG compliance but has no formal audit. Run automated checks
and document gaps before building new components.

**Research-backed guidance (2026):**

- Audit against WCAG 2.2 AA baseline (not only 2.1), including newer criteria such as
  Focus Not Obscured (2.4.11) and Target Size Minimum (2.5.8).
- Combine automated tooling with manual keyboard/screen-reader checks; automation alone is
  insufficient for AA conformance confidence.

**Additions for near-perfect execution:**

- Include manual scenarios: keyboard-only nav, visible focus persistence, modal focus trap,
  touch target sizing, and form error announcements.
- Create reusable component-level a11y checklist integrated into PR template.

**Acceptance Criteria:**

- Audit document maps findings by page + WCAG criterion + severity + owner.
- High-severity blockers have remediation tasks created and linked.
- PR checklist updated to include WCAG 2.2 AA critical checks.

**Tasks:**

- Run axe-core or pa11y on all hair-salon pages
- Document WCAG 2.1 AA compliance status per page
- Create checklist for new component development
- Verify existing ARIA attributes in @repo/ui components

**Files:**

- Create: `docs/accessibility-audit.md`

---

### 0.8 Move @repo/shared to packages/types

**Priority:** HIGH | **Effort:** 1 hour | **Dependencies:** 0.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** `@repo/shared` currently lives in `templates/shared/` which is anomalous —
it's a shared package consumed by all templates/clients but located inside `templates/`.
Move to `packages/types/` for proper placement. Preserve existing SiteConfig type
infrastructure (4 conversion flow types via discriminated union).

**Research-backed guidance (2026):**

- Shared domain contracts should live in a first-class workspace package to prevent template
  coupling and simplify semantic versioning.
- Type package migrations should preserve API surface first, then evolve schema in follow-up
  tasks to reduce regression blast radius.

**Additions for near-perfect execution:**

- Introduce temporary compatibility export (or codemod) for `@repo/shared/types` imports
  during transition to avoid big-bang breakage.
- Add a migration map documenting old -> new import paths.

**Acceptance Criteria:**

- `@repo/types` builds and is consumed by template(s) without deep imports.
- No remaining production imports from `templates/shared/*`.
- Type-check passes across all workspace packages after migration.

**Files:**

- Move: `templates/shared/types/` → `packages/types/src/`
- Create: `packages/types/package.json` (rename from `@repo/shared` to `@repo/types`)
- Update: All imports from `@repo/shared/types` → `@repo/types`
- Update: `templates/hair-salon/site.config.ts` import
- Update: `pnpm-workspace.yaml` (remove `templates/*` need for shared, or keep for template)
- Delete: `templates/shared/` (after migration verified)

**Note:** The existing `SiteConfig` type already supports `booking | contact | quote | dispatch`
conversion flows. Task 1.8 should EXTEND this, not replace it.

---

### 0.9 Fix Infra Dependency Placement

**Priority:** MEDIUM | **Effort:** 30 min | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** `@repo/infra` has `@upstash/ratelimit` and `@upstash/redis` in `devDependencies`
but they are used at runtime by `security/rate-limit.ts`. Similarly, `zod` is in devDeps
but used at runtime by env validation schemas. These should be in `dependencies` or
`peerDependencies`.

**Research-backed guidance (2026):**

- Runtime-imported modules must not live only in `devDependencies`; this risks production
  runtime crashes in stricter install/deploy environments.
- Use `dependencies` for internally required runtime packages; reserve `peerDependencies`
  for host-provided integrations with clear version contracts.

**Additions for near-perfect execution:**

- Add dependency placement policy in docs:
  - Runtime import -> `dependencies`
  - Build/test-only -> `devDependencies`
  - Host-supplied contract -> `peerDependencies`
- Add CI validation script for forbidden runtime imports from `devDependencies`.

**Acceptance Criteria:**

- All runtime imports in `@repo/infra` resolve from `dependencies`/`peerDependencies`.
- Lockfile and install remain deterministic.
- No runtime module-not-found errors in integration smoke tests.

**Files:**

- Fix: `packages/infra/package.json` — move runtime deps from devDependencies to dependencies

---

### 0.10 Fix Broken Infra Export Path

**Priority:** CRITICAL | **Effort:** 15 min | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** `packages/infra/package.json` has a broken subpath export:
`"./security/create-middleware": "./security/create-middleware.ts"` but the actual file is
at `middleware/create-middleware.ts`. The barrel export in `index.ts` correctly references
`./middleware/create-middleware`, so the main `@repo/infra` import works. But the subpath
export would fail if used directly.

**Research-backed guidance (2026):**

- Package export maps should be validated as API contracts; broken subpaths silently
  undermine consumer reliability and typed import UX.

**Additions for near-perfect execution:**

- Decide canonical namespace (`./middleware/*` vs `./security/*`) and keep consistent naming
  across docs, exports, and filesystem.
- If backward compatibility is needed, provide temporary alias exports and deprecation notes.

**Acceptance Criteria:**

- Export path resolves successfully from consumer package tests.
- `package.json` exports are filesystem-valid (automated check recommended).
- Chosen namespace documented in infra README/API docs.

**Fix:** Change the export path in `packages/infra/package.json`:

```json
"./middleware/create-middleware": "./middleware/create-middleware.ts"
```

Or if keeping the `./security/` namespace is desired, move the file.

---

### 0.11 Enforce Monorepo Boundaries

**Priority:** CRITICAL | **Effort:** 2 hours | **Dependencies:** 0.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Prevent cross-package architecture drift during refactor by enforcing import and
dependency boundaries (e.g., template code should not import internal feature implementation
files directly). This task makes the refactor sustainable beyond initial migration.

**Research-backed guidance (2026):**

- Boundary enforcement is most effective when layered:
  1. ESLint rules (`no-restricted-imports` and/or boundary plugin),
  2. package `exports` fences,
  3. CI checks on changed packages.
- Start with explicit restricted import patterns, then evolve into stricter policy rules.

**Additions for near-perfect execution:**

- Define allowed dependency direction matrix (e.g., templates -> features/components/types,
  never templates -> template internals of another app).
- Add autofix-safe guidance and examples for “correct import path” in rule messages.

**Acceptance Criteria:**

- Deep imports like `@repo/*/src/*` are blocked from external packages.
- Architectural dependency matrix documented and enforced in lint.
- CI fails on boundary violations with actionable errors.

**Files:**

- Create: `docs/architecture/module-boundaries.md`
- Create: `eslint-rules/no-cross-package-internals.js` (or configure an existing plugin)
- Update: root `eslint` config to enforce package boundary rules
- Update: `packages/*/package.json` exports where needed to expose only supported entrypoints

**Checks:**

- Block deep imports like `@repo/features/src/*` from external packages
- Block imports from `templates/hair-salon/*` once shared packages exist
- Require imports through package public APIs (`@repo/*`)

---

### 0.12 Add Changesets and Versioning Workflow

**Priority:** HIGH | **Effort:** 2 hours | **Dependencies:** 0.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Introduce deterministic package versioning and changelog generation for multi-package
refactors. Without this, downstream clients cannot reliably adopt updates.

**Research-backed guidance (2026):**

- Changesets remains the de facto standard for pnpm monorepo package version orchestration.
- Release automation should create transparent release PRs, package-level changelogs,
  and traceable rollback points.

**Additions for near-perfect execution:**

- Define release channels (stable/canary) and publish policy before enabling automation.
- Add contributor guidance for writing high-quality changesets (customer-impact language,
  migration notes, breaking-change flags).

**Acceptance Criteria:**

- Changeset config present and validated in CI.
- Release workflow can generate version PRs from pending changesets.
- Versioning strategy doc includes semver policy and rollback procedure.

**Files:**

- Create: `.changeset/config.json`
- Create: `.github/workflows/release.yml` (or extend existing CI)
- Update: root `package.json` scripts (`changeset`, `version-packages`, `release`)
- Create: `docs/release/versioning-strategy.md`

**Outputs:**

- Standardized semver bumps per package
- Human-readable changelog per release
- Clear rollback reference point per release

---

### 0.13 Strengthen CI Quality Gates for Refactor Safety

**Priority:** CRITICAL | **Effort:** 3 hours | **Dependencies:** 0.3

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Ensure every PR in the refactor path runs consistent checks so regressions are caught
immediately (type safety, tests, build, lint, affected packages).

**Sequencing note:** deliver a Wave 0 baseline gate first (lint/type-check/build/test).
Then extend with package-specific testing topology after Task 2.21 is complete.

**Research-backed guidance (2026):**

- For monorepos, combine fast affected checks on PRs with scheduled full-repo runs to catch
  hidden graph/config issues.
- Quality gates should include deterministic install, lint, type-check, tests, build, and
  artifact health where relevant.

**Additions for near-perfect execution:**

- Split CI into required blocking jobs vs informative non-blocking jobs.
- Add explicit branch protection mapping to required check names.
- Capture flaky test quarantine procedure to keep trust in CI high.

**Acceptance Criteria:**

- PR CI runs lint/type-check/test/build with clear pass/fail gates.
- Affected-package path is implemented for PR speed; nightly full run is configured.
- Required checks documentation matches branch protection config exactly.

**Files:**

- Update: `.github/workflows/ci.yml`
- Create: `docs/ci/required-checks.md`
- Update: `turbo.json` to include lint/type-check/test/build task wiring for all new packages

**Required checks:**

- `pnpm turbo lint`
- `pnpm turbo type-check`
- `pnpm turbo test`
- `pnpm turbo build`
- Changed-package validation (affected graph only) + nightly full run

---

## Priority 1: Foundation (Weeks 1-2)

### 1.1 Create Dialog Component

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build a popup window component for forms, confirmations, and lightboxes. This is the overlay that appears when you click "Book Now" or "Contact Us" - it dims the background and shows a focused dialog.

**Research-backed guidance (2026):**

- Prefer Radix primitives for accessibility guarantees and predictable composition.
- Dialogs must satisfy WCAG 2.2 focus visibility and focus-not-obscured behavior.

**Additions for near-perfect execution:**

- Define controlled/uncontrolled API (`open`, `defaultOpen`, `onOpenChange`) from day one.
- Include scroll lock and portal layering strategy to avoid z-index conflicts.

**Acceptance Criteria:**

- Keyboard and screen-reader behavior validated (open, close, focus return).
- Supports alert/confirm/custom content variants without prop explosion.
- Included in `@repo/ui` exports with usage example in docs/tests.

**Files:**

- Create: `packages/ui/src/components/Dialog.tsx`
- Update: `packages/ui/src/index.ts` (add export)

**Technical Requirements:**

- Accessibility: Focus trapping, ARIA attributes, keyboard navigation (Escape to close)
- Variants: Alert, Confirm, Custom content
- Animation: Enter/exit transitions
- Dependencies: `@radix-ui/react-dialog`, `lucide-react` (X icon), existing Button component

**Code Pattern:** Follow existing Button.tsx structure:

```typescript
// File: packages/ui/src/components/Dialog.tsx  [TRACE:FILE=packages.ui.components.Dialog]
// Purpose: Modal dialog component for forms, confirmations, and overlays
// Pattern: Radix Dialog primitive + Tailwind + cva variants
```

---

### 1.2 Create Toast Component

**Priority:** CRITICAL | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Non-blocking message banners that appear temporarily. Those little messages that slide in saying "Booking confirmed!" or "Error saving" - they auto-disappear after a few seconds.

**Research-backed guidance (2026):**

- Toasts should be announced with correct ARIA live regions and avoid interrupting active tasks.
- A single global toaster host prevents duplicate stacks and inconsistent positioning.

**Additions for near-perfect execution:**

- Standardize toast payload contract (title, description, variant, action, duration).
- Add dedupe key support to avoid repeated identical toasts.

**Acceptance Criteria:**

- Variants render with accessible semantics and consistent visual tokens.
- Auto-dismiss, hover pause, and manual dismiss all work reliably.
- Toaster mounting pattern documented for client apps.

**Files:**

- Create: `packages/ui/src/components/Toast.tsx`
- Create: `packages/ui/src/components/Toaster.tsx` (container)
- Update: `packages/ui/src/index.ts`

**Technical Requirements:**

- Auto-dismiss with pause on hover
- Stacking (multiple toasts)
- Variants: success, error, warning, info
- Positioning: top-right, top-center, bottom-right
- Dependencies: `sonner` (already in hair-salon template), existing Button

---

### 1.3 Create Tabs Component

**Priority:** CRITICAL | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Content organization with clickable tab headers. Like browser tabs but for page content - click "Services" tab to see services, "Pricing" tab to see pricing.

**Research-backed guidance (2026):**

- Tabs should follow ARIA tablist pattern with roving focus and orientation support.
- Preserve tab panel state behavior intentionally (keep mounted vs unmount on switch).

**Additions for near-perfect execution:**

- Expose `activationMode` (automatic/manual) to support keyboard-heavy UIs.
- Add motion option that respects `prefers-reduced-motion`.

**Acceptance Criteria:**

- Horizontal/vertical + controlled/uncontrolled modes validated via tests.
- Tab trigger focus ring and selected state meet contrast/visibility requirements.
- No layout shift when switching tabs in common content patterns.

**Files:**

- Create: `packages/ui/src/components/Tabs.tsx`
- Update: `packages/ui/src/index.ts`

**Technical Requirements:**

- Horizontal and vertical variants
- Controlled and uncontrolled modes
- Animation: Smooth content transitions
- Dependencies: `@radix-ui/react-tabs`

---

### 1.4 Create Dropdown Menu Component

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Clickable button that reveals a list of actions. The "hamburger menu" on mobile or the "More actions" button with a down arrow that shows options like "Edit", "Delete", "Share".

**Research-backed guidance (2026):**

- Menu interactions should support full keyboard semantics and nested menu reachability.
- Use clear destructive item affordances and optional confirmation flows for risky actions.

**Additions for near-perfect execution:**

- Include support for labels, separators, checkbox/radio items, and shortcut hints.
- Define portal layering defaults consistent with Dialog/Popover.

**Acceptance Criteria:**

- Nested submenus are reachable/escapable with keyboard and pointer.
- Alignment and collision handling work in constrained containers.
- Component API remains composable for both nav and action menus.

**Files:**

- Create: `packages/ui/src/components/DropdownMenu.tsx`
- Update: `packages/ui/src/index.ts`

**Technical Requirements:**

- Keyboard navigation (arrow keys, Enter, Escape)
- Nested submenus
- Alignment options
- Dependencies: `@radix-ui/react-dropdown-menu`

---

### 1.5 Create Tooltip Component

**Priority:** CRITICAL | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Small popup that appears on hover/focus showing help text. When you hover over a "?" icon or a button, a little bubble appears explaining what it does.

**Research-backed guidance (2026):**

- Tooltips must appear on focus as well as hover and never contain essential-only content.
- Delay timings should reduce accidental flicker while keeping UI responsive.

**Additions for near-perfect execution:**

- Provide global provider defaults for delay and skip-delay windows.
- Ensure tooltip content is not interactive (use Popover for interactive content).

**Acceptance Criteria:**

- Keyboard focus triggers tooltip consistently.
- Placement and collision behavior are stable on mobile/desktop.
- Clear guideline docs distinguish Tooltip vs Popover usage.

**Files:**

- Create: `packages/ui/src/components/Tooltip.tsx`
- Update: `packages/ui/src/index.ts`

**Technical Requirements:**

- Hover and focus triggers
- Positioning: top, bottom, left, right
- Delay and duration controls
- Dependencies: `@radix-ui/react-tooltip`

---

### 1.6 Create Popover Component

**Priority:** CRITICAL | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Rich interactive overlay (more complex than tooltip). Like a tooltip but can contain forms, buttons, images - think "click profile picture to see account menu" or "click calendar icon to open date picker".

**Research-backed guidance (2026):**

- Popovers should remain lightweight compared to Dialog and respect focus boundary expectations.
- Dismissal behavior must be deterministic (escape, outside click, trigger toggle).

**Additions for near-perfect execution:**

- Support anchored positioning options and collision padding for dense layouts.
- Define guidance for embedding form controls inside popovers.

**Acceptance Criteria:**

- Interactive content is keyboard-accessible without focus leaks.
- Click-outside and escape dismissal are reliable across browsers.
- API is consistent with other overlay primitives in `@repo/ui`.

**Files:**

- Create: `packages/ui/src/components/Popover.tsx`
- Update: `packages/ui/src/index.ts`

**Technical Requirements:**

- Click-outside dismissal
- Focus management
- Rich content support
- Dependencies: `@radix-ui/react-popover`

---

### 1.7 Create Marketing Components Package

**Priority:** CRITICAL | **Effort:** 2 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Set up new shared package for marketing-specific components.

**Research-backed guidance (2026):**

- Package scaffolding should mirror existing workspace standards (`@repo/ui`, lint, tsconfig,
  exports) for predictable tooling behavior.

**Additions for near-perfect execution:**

- Add explicit dependency boundaries: may consume `@repo/ui`, `@repo/types`, `@repo/utils`.
- Start with barrel export conventions that block deep-import sprawl.

**Acceptance Criteria:**

- Package builds/type-checks/lints independently.
- Entrypoint exports are documented and stable.
- Turbo task graph includes the package correctly.

**Files:**

- Create: `packages/marketing-components/package.json`
- Create: `packages/marketing-components/tsconfig.json`
- Create: `packages/marketing-components/src/index.ts`
- Create: `packages/marketing-components/eslint.config.mjs`
- Update: `pnpm-workspace.yaml` (verify package reference)
- Update: `turbo.json` (add build pipeline)

**Package Structure:**

```
packages/marketing-components/
├── src/
│   ├── hero/
│   ├── services/
│   ├── team/
│   ├── testimonials/
│   ├── pricing/
│   ├── stats/
│   ├── cta/
│   ├── faq/
│   ├── gallery/
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Pattern Reference:** `packages/ui/package.json` (current package baseline)

---

### 1.8 Enhance Configuration System

**Priority:** CRITICAL | **Effort:** 4 hours (reduced — existing foundation found) | **Dependencies:** 0.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** EXTEND (not rebuild) the existing `SiteConfig` type in `@repo/shared` to add
`industry`, `features`, and `integrations` fields. The existing type already supports
4 conversion flow types (`booking | contact | quote | dispatch`) via discriminated union.

**Research-backed guidance (2026):**

- Model config as additive, backward-compatible contracts to avoid breaking existing templates.
- Keep provider-specific integration details optional and validated via discriminated unions.

**Additions for near-perfect execution:**

- Rename references from `@repo/shared` to `@repo/types` after Task 0.8 migration.
- Add schema validation companion (Zod) to catch runtime config errors early.

**Acceptance Criteria:**

- Extended type remains backwards-compatible with existing hair-salon config.
- New fields have safe defaults and clear docs.
- Type tests verify invalid combinations are rejected at compile-time.

**Existing foundation (from @repo/shared/types/site-config.ts):**

- `SiteConfig` interface with id, name, tagline, description, url
- `NavLink`, `SocialLink`, `FooterConfig`, `ContactInfo`, `SeoDefaults`, `ThemeColors`
- `ConversionFlowConfig` discriminated union (4 types)
- All properly typed with TypeScript

**Files:**

- Extend: `packages/types/src/site-config.ts` (moved from `templates/shared/` in Task 0.8)
- Create: `packages/types/src/industry.ts`
- Reference: `templates/hair-salon/site.config.ts` (current structure)

**New Configuration Schema:**

```typescript
interface SiteConfig {
  id: string;
  name: string;
  industry:
    | 'salon'
    | 'restaurant'
    | 'law-firm'
    | 'dental'
    | 'medical'
    | 'fitness'
    | 'retail'
    | 'consulting'
    | 'realestate'
    | 'construction'
    | 'automotive'
    | 'general';

  features: {
    hero: 'centered' | 'split' | 'video' | 'carousel' | null;
    services: 'grid' | 'list' | 'tabs' | 'accordion' | null;
    team: 'grid' | 'carousel' | 'detailed' | null;
    testimonials: 'carousel' | 'grid' | 'marquee' | null;
    pricing: 'table' | 'cards' | 'calculator' | null;
    contact: 'simple' | 'multi-step' | 'with-booking' | null;
    gallery: 'grid' | 'carousel' | 'lightbox' | null;
    blog: boolean;
    booking: boolean;
    faq: boolean;
  };

  integrations: {
    analytics?: { provider: 'google' | 'plausible' | 'none'; trackingId?: string };
    crm?: { provider: 'hubspot' | 'none'; portalId?: string };
    booking?: { provider: 'internal' | 'calendly' | 'acuity' | 'none' };
    email?: { provider: 'mailchimp' | 'sendgrid' | 'none' };
    chat?: { provider: 'intercom' | 'crisp' | 'none' };
  };

  theme: {
    colors: ThemeColors; // Dynamic, not hardcoded HSL
    fonts: ThemeFonts;
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
    shadows: 'none' | 'small' | 'medium' | 'large';
  };
}
```

---

### 1.9 Create Industry Types Package

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define industry-specific configurations and defaults for all 12 industries.

**Research-backed guidance (2026):**

- Industry presets should provide sensible defaults without over-constraining customization.
- Schema.org mapping should be explicit and versioned for SEO stability.

**Additions for near-perfect execution:**

- Separate “required for launch” fields from “recommended for optimization” fields.
- Add extension mechanism for custom verticals beyond initial 12.

**Acceptance Criteria:**

- All 12 industries compile with typed defaults.
- Presets can be partially overridden without breaking type safety.
- SEO schema mapping is documented per industry.

**Files:**

- Create: `packages/types/src/industry.ts`
- Create: `packages/types/src/industry-configs.ts`
- Create: `packages/types/src/index.ts`

**Industry Configurations:**

```typescript
export const industryConfigs: Record<Industry, IndustryConfig> = {
  salon: {
    schemaType: 'HairSalon',
    defaultFeatures: { hero: 'split', services: 'grid', team: 'grid', booking: true },
    requiredFields: ['services', 'hours', 'team'],
    defaultIntegrations: { booking: 'internal', crm: 'hubspot' },
  },
  restaurant: {
    schemaType: 'Restaurant',
    defaultFeatures: { hero: 'centered', services: 'tabs', booking: true },
    requiredFields: ['menu', 'hours', 'location'],
    defaultIntegrations: { booking: 'internal', analytics: 'google' },
  },
  'law-firm': {
    schemaType: 'LegalService',
    defaultFeatures: { hero: 'split', services: 'list', team: 'detailed' },
    requiredFields: ['practiceAreas', 'attorneys', 'contact'],
    defaultIntegrations: { crm: 'hubspot', chat: 'intercom' },
  },
  // ... 9 more industries
};
```

---

## Priority 2: Marketing Components & Features (Weeks 3-5)

### 2.1 Build HeroVariants Components

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Multiple hero banner styles for page headers. The big banner at the top of a homepage - can be centered text, split with image, video background, or rotating carousel.

**Research-backed guidance (2026):**

- Heroes should prioritize fast LCP (optimized media, minimal blocking JS).
- CTA hierarchy and semantic heading structure must remain consistent across variants.

**Acceptance Criteria:**

- All variants share a common typed base props contract.
- Responsive behavior is validated on mobile/tablet/desktop.
- Variant rendering does not regress baseline accessibility scores.

**Files:**

- Create: `packages/marketing-components/src/hero/HeroCentered.tsx`
- Create: `packages/marketing-components/src/hero/HeroSplit.tsx`
- Create: `packages/marketing-components/src/hero/HeroVideo.tsx`
- Create: `packages/marketing-components/src/hero/HeroCarousel.tsx`
- Create: `packages/marketing-components/src/hero/index.ts`

**Props Interface:**

```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  background?: { type: 'image' | 'video' | 'color'; src?: string };
  theme?: 'light' | 'dark';
}
```

**Reference:** Current Hero at `templates/hair-salon/components/Hero.tsx:3,462 bytes`

---

### 2.2 Build ServiceShowcase Components

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Display service offerings in multiple layouts - cards in a grid, detailed list, tabs by category, or expandable accordion sections.

**Research-backed guidance (2026):**

- Service components should preserve discoverability with consistent category/filter logic.
- Use semantic list structure for screen-reader clarity.

**Acceptance Criteria:**

- Single normalized service data shape powers all layouts.
- Category filtering behavior is deterministic and tested.
- Layout switches do not alter content meaning or SEO structure.

**Files:**

- Create: `packages/marketing-components/src/services/ServiceGrid.tsx`
- Create: `packages/marketing-components/src/services/ServiceList.tsx`
- Create: `packages/marketing-components/src/services/ServiceTabs.tsx` (uses 1.3)
- Create: `packages/marketing-components/src/services/ServiceAccordion.tsx` (uses @repo/ui Accordion)
- Create: `packages/marketing-components/src/services/index.ts`

**Props:**

```typescript
interface ServiceShowcaseProps {
  services: Array<{
    id: string;
    name: string;
    description: string;
    price?: string;
    duration?: string;
    image?: string;
    category?: string;
  }>;
  layout: 'grid' | 'list' | 'tabs' | 'accordion';
  columns?: 2 | 3 | 4;
  showPricing?: boolean;
  showImages?: boolean;
}
```

---

### 2.3 Build TeamDisplay Components

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Staff pages - can be a grid of photos, a carousel with bios, or detailed individual profiles.

**Research-backed guidance (2026):**

- Team sections perform better when role clarity and credibility signals are prominent.
- Profile data models should support cross-industry staffing patterns.

**Additions for near-perfect execution:**

- Add optional credential badges and profile CTA links.
- Add image fallback policy for missing photos.

**Acceptance Criteria:**

- Team member type supports optional social, credentials, pronouns, and bio fields.
- Carousel variant remains keyboard and touch accessible.
- Image handling uses optimized loading strategy.

**Files:**

- Create: `packages/marketing-components/src/team/TeamGrid.tsx`
- Create: `packages/marketing-components/src/team/TeamCarousel.tsx`
- Create: `packages/marketing-components/src/team/TeamDetailed.tsx`
- Create: `packages/marketing-components/src/team/index.ts`

---

### 2.4 Build Testimonial Components

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Showing off happy customer reviews - rotating carousel, grid of testimonials, or infinitely scrolling marquee.

**Research-backed guidance (2026):**

- Social proof modules should balance authenticity cues with readability.
- Motion-heavy testimonial patterns must preserve accessibility and comprehension.

**Additions for near-perfect execution:**

- Add verification/source labels per testimonial.
- Add anti-fabrication policy for testimonial content governance.

**Acceptance Criteria:**

- Testimonial schema includes source attribution and optional rating.
- Motion-heavy variants respect reduced-motion preferences.
- Markup supports review structured-data integration hooks.

**Files:**

- Create: `packages/marketing-components/src/testimonials/TestimonialCarousel.tsx`
- Create: `packages/marketing-components/src/testimonials/TestimonialGrid.tsx`
- Create: `packages/marketing-components/src/testimonials/TestimonialMarquee.tsx`
- Create: `packages/marketing-components/src/testimonials/index.ts`

---

### 2.5 Build Pricing Components

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 1.7, 1.3 (Tabs)

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Pricing tables for feature comparison, tiered pricing cards, interactive quote builders.

**Research-backed guidance (2026):**

- Pricing UX should reduce comparison friction and clarify plan boundaries.
- Interactive calculators should be transparent about assumptions.

**Additions for near-perfect execution:**

- Add “most popular” and “best for” heuristics in schema.
- Add assumption disclosure block for calculator outputs.

**Acceptance Criteria:**

- Pricing data model supports one-time, recurring, and "contact us" tiers.
- Feature comparisons are readable and accessible in narrow viewports.
- Calculator variant validation is covered by unit tests.

**Files:**

- Create: `packages/marketing-components/src/pricing/PricingTable.tsx`
- Create: `packages/marketing-components/src/pricing/PricingCards.tsx`
- Create: `packages/marketing-components/src/pricing/PricingCalculator.tsx`
- Create: `packages/marketing-components/src/pricing/index.ts`

---

### 2.6 Build Gallery Components

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 1.7, 1.1 (Dialog for lightbox)

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Image galleries with lightbox support - responsive grid, carousel with thumbnails, click-to-expand with navigation.

**Research-backed guidance (2026):**

- Gallery patterns should optimize visual storytelling without harming load performance.
- Lightbox interactions should preserve orientation and keyboard continuity.

**Additions for near-perfect execution:**

- Add progressive image quality tiers per viewport.
- Add optional caption/credit overlays with accessibility labels.

**Acceptance Criteria:**

- Images include alt text strategy (required/optional rules documented).
- Lightbox keyboard controls (next/prev/close) and focus return verified.
- Lazy loading and responsive src strategies are implemented.

**Files:**

- Create: `packages/marketing-components/src/gallery/ImageGrid.tsx`
- Create: `packages/marketing-components/src/gallery/ImageCarousel.tsx`
- Create: `packages/marketing-components/src/gallery/LightboxGallery.tsx`
- Create: `packages/marketing-components/src/gallery/index.ts`

---

### 2.7 Build Stats Counter Component

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Animated number counting with icons - like "500+ Happy Customers" that counts up when scrolled into view.

**Research-backed guidance (2026):**

- Counter animations should support credibility by pairing values with context/source.
- Scroll-triggered animation should avoid repeated distraction.

**Additions for near-perfect execution:**

- Add optional source-note field per stat.
- Add viewport-threshold control for trigger behavior.

**Acceptance Criteria:**

- Animation triggers once by default with optional replay.
- Reduced-motion users receive static values without count animation.
- Values remain SSR-safe and hydration mismatch-free.

**Files:**

- Create: `packages/marketing-components/src/stats/StatsCounter.tsx`
- Create: `packages/marketing-components/src/stats/index.ts`

---

### 2.8 Build CTA Section Components

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Call-to-action sections - full-width banner or split layout with image + text driving users to convert.

**Research-backed guidance (2026):**

- CTA modules should align message, urgency, and next action with page intent.
- Overuse of high-emphasis CTAs can reduce effectiveness; placement strategy matters.

**Additions for near-perfect execution:**

- Add CTA priority scale (`soft`, `primary`, `urgent`).
- Add contextual CTA recommendation guidance per page type.

**Acceptance Criteria:**

- CTA content model supports primary + secondary action with analytics hooks.
- Visual variants preserve color contrast and button hierarchy.
- Section spacing and composition are consistent with template rhythm.

**Files:**

- Create: `packages/marketing-components/src/cta/CTABanner.tsx`
- Create: `packages/marketing-components/src/cta/CTASplit.tsx`
- Create: `packages/marketing-components/src/cta/index.ts`

---

### 2.9 Build FAQ Section Component

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Accordion-style Q&A with optional search/filter capability.

**Research-backed guidance (2026):**

- FAQ discoverability improves with intent-oriented grouping and lightweight search.
- Structured FAQ data should map cleanly from authored content to schema output.

**Additions for near-perfect execution:**

- Add topic-group metadata for large FAQ sets.
- Add no-results recovery suggestions for search misses.

**Acceptance Criteria:**

- Search/filter behavior handles empty results and typo tolerance gracefully.
- FAQ entries support schema.org FAQPage output mapping.
- Accordion accessibility and keyboard behavior follow existing UI standards.

**Files:**

- Create: `packages/marketing-components/src/faq/FAQSection.tsx`
- Create: `packages/marketing-components/src/faq/index.ts`

---

### 2.10 Build Contact Form Variants

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 1.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Multiple contact form styles - simple single-step, multi-step lead capture, or booking-integrated.

**Research-backed guidance (2026):**

- Form variant selection should match intent complexity and user effort tolerance.
- Validation and consent handling should be consistent across variants.

**Additions for near-perfect execution:**

- Add field-level analytics hooks for drop-off analysis.
- Add configurable privacy/consent copy blocks.

**Acceptance Criteria:**

- Form variants share a normalized submission payload contract.
- Validation and error handling patterns are consistent across variants.
- Spam mitigation approach (honeypot/rate-limit/captcha policy) is documented.

**Files:**

- Create: `packages/marketing-components/src/contact/SimpleContactForm.tsx`
- Create: `packages/marketing-components/src/contact/MultiStepContactForm.tsx`
- Create: `packages/marketing-components/src/contact/BookingContactForm.tsx`
- Create: `packages/marketing-components/src/contact/index.ts`

---

### 2.11 Create packages/features Structure

**Priority:** CRITICAL | **Effort:** 1 hour | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Create the shared features package directory structure.

**Research-backed guidance (2026):**

- Feature modules should expose public APIs from feature roots only to prevent internal coupling.

**Acceptance Criteria:**

- Package root and each feature folder have clear public entry points.
- Lint/type-check scripts run at package scope.
- No consumer imports from `src/*` internals required.

**Files:**

- Create: `packages/features/package.json`
- Create: `packages/features/tsconfig.json`
- Create: `packages/features/src/index.ts`
- Create directories:
  ```text
  packages/features/src/
  ├── booking/
  ├── contact/
  ├── blog/
  ├── services/
  ├── search/          # Was missing — has 2 components + lib to extract
  ├── testimonials/
  ├── team/
  ├── gallery/
  ├── pricing/
  └── index.ts
  ```

**Note:** `pnpm-workspace.yaml` already references `packages/features/*` but directory doesn't exist yet.

---

### 2.12 Extract Booking Feature

**Priority:** CRITICAL | **Effort:** 6 hours | **Dependencies:** 2.11, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move booking from template to shared package and make it configurable (remove hair-salon specific hardcoding).

**Research-backed guidance (2026):**

- Preserve behavior parity first, then optimize architecture in follow-up refactors.
- Booking flow should separate domain validation from provider-specific integrations.

**Acceptance Criteria:**

- Booking feature passes parity tests vs template baseline.
- Hardcoded template constants are fully externalized to config/props.
- Provider adapter interface supports at least internal + one external provider.

**Source Files (Verified):**

- `templates/hair-salon/features/booking/components/BookingForm.tsx`
- `templates/hair-salon/features/booking/lib/booking-schema.ts` (7,475 bytes)
- `templates/hair-salon/features/booking/lib/booking-actions.ts` (10,740 bytes)
- `templates/hair-salon/features/booking/lib/booking-providers.ts` (13,842 bytes)
- `templates/hair-salon/features/booking/lib/__tests__/booking-actions.test.ts`
- `templates/hair-salon/features/booking/index.ts`

**Target Files:**

- `packages/features/src/booking/components/BookingForm.tsx`
- `packages/features/src/booking/lib/schema.ts`
- `packages/features/src/booking/lib/actions.ts`
- `packages/features/src/booking/lib/providers.ts`
- `packages/features/src/booking/index.ts`

**Refactoring Required:**

- Remove hardcoded SERVICE_TYPES and TIME_SLOTS
- Make configurable via props:
  ```typescript
  interface BookingFeatureProps {
    services: Array<{ id: string; name: string; duration: number; price?: number }>;
    timeSlots: string[];
    providers: BookingProvider[];
    maxAdvanceDays?: number;
    onSubmit: (data: BookingData) => Promise<void>;
  }
  ```

---

### 2.13 Extract Contact Feature

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** 2.11, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move contact from template to shared package. Make fields configurable, add multi-step variant support.

**Research-backed guidance (2026):**

- Contact extraction should preserve conversion behavior before introducing new variants.
- Form contracts should remain provider-agnostic for downstream integrations.

**Additions for near-perfect execution:**

- Add typed field schema registry for per-client customization.
- Add parity checks for validation and submission payloads.

**Acceptance Criteria:**

- Configurable field sets, validation, and consent text are supported.
- Multi-step variant includes step persistence and back-navigation behavior.
- Submission handlers are pluggable per client.

**Source:** `templates/hair-salon/features/contact/`
**Target:** `packages/features/src/contact/`

---

### 2.14 Extract Blog Feature

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 2.11, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move blog from template to shared package. Add content source abstraction (MDX, CMS, API), categories, tags, pagination.

**Research-backed guidance (2026):**

- Blog architecture should separate content retrieval, transformation, and rendering concerns.
- Taxonomy and URL strategy should remain stable across source adapters.

**Additions for near-perfect execution:**

- Add canonical slug policy and collision handling.
- Add adapter contract tests for pagination/category behavior.

**Acceptance Criteria:**

- Blog APIs are source-agnostic with adapter interface.
- Existing template blog behavior remains functionally equivalent.
- Pagination/category/tag routes preserve SEO metadata integrity.

**Source:** `templates/hair-salon/features/blog/` (components/, lib/, **tests**/, index.ts)
**Target:** `packages/features/src/blog/`

**Note:** Blog has 1 component (BlogPostContent.tsx), lib (blog.ts 8.4KB + blog-images.ts 1KB),
and a test file. Search is a SEPARATE feature with its own components (SearchDialog, SearchPage).

---

### 2.15 Extract Services Feature

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 2.11, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move services from template to shared package. Make generic (not hair-salon specific), add category organization.

**Research-backed guidance (2026):**

- Service models should support diverse vertical naming without schema fragmentation.
- Detail pages should preserve SEO and conversion hooks across industries.

**Additions for near-perfect execution:**

- Add service taxonomy extension points for custom verticals.
- Add structured data hook compatibility checks.

**Acceptance Criteria:**

- Service taxonomy model supports cross-industry naming and grouping.
- Detail layout and overview components are both extracted and configurable.
- Service data schema includes optional pricing/duration/availability flags.

**Source:** `templates/hair-salon/features/services/` (2 components: ServicesOverview 3.9KB, ServiceDetailLayout 8KB)
**Target:** `packages/features/src/services/`

**Note:** ServiceDetailLayout.tsx is a significant component (8KB) providing
full service detail pages. Both components should be extracted and made configurable.

---

### 2.16 Create Testimonials Feature

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 2.11, 2.4

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build new testimonials feature from scratch. Data sources: config, CMS, or API (Google Reviews, Yelp).

**Research-backed guidance (2026):**

- Testimonial platforms should normalize trust indicators and moderation status.
- Source adapters must handle provider rate limits and outages gracefully.

**Additions for near-perfect execution:**

- Add provider freshness SLA and cache policy.
- Add moderation workflow for externally sourced reviews.

**Acceptance Criteria:**

- Source adapters normalize external review payloads into one schema.
- Fallback rendering works when external providers fail.
- Moderation/sanitization policy for external text is documented.

**Files:**

- `packages/features/src/testimonials/components/TestimonialsSection.tsx`
- `packages/features/src/testimonials/lib/testimonial-schema.ts`
- `packages/features/src/testimonials/lib/testimonial-actions.ts`
- `packages/features/src/testimonials/index.ts`

---

### 2.17 Create Team Feature

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 2.11, 2.3

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build new team feature from scratch. Member profiles with social links, configurable layouts using TeamDisplay components.

**Research-backed guidance (2026):**

- Team feature architecture should support both compact and profile-heavy presentation modes.
- Profile data should be reusable across about/team/landing modules.

**Additions for near-perfect execution:**

- Add reusable profile card schema used by multiple templates.
- Add optional availability/contact channels per member.

**Acceptance Criteria:**

- Team schema includes ordering, spotlight flag, and role taxonomy.
- Supports linking to individual profile pages when enabled.
- Layout switching is config-driven without code branching in clients.

**Files:**

- `packages/features/src/team/components/TeamSection.tsx`
- `packages/features/src/team/lib/team-schema.ts`
- `packages/features/src/team/index.ts`

---

### 2.18 Create Gallery Feature

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 2.11, 2.6

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build new gallery feature. Image optimization, lightbox integration using Dialog component.

**Research-backed guidance (2026):**

- Gallery backends should preserve metadata fidelity across transforms.
- User experience should favor fast thumbnails and deferred full-resolution assets.

**Additions for near-perfect execution:**

- Add transform preset profiles by use case (hero, thumb, lightbox).
- Add asset metadata validation (alt, dimensions, attribution).

**Acceptance Criteria:**

- Gallery schema supports categories, captions, and source attribution.
- Image optimization defaults are enforced with override hooks.
- Lightbox integration reuses shared Dialog/overlay behavior consistently.

**Files:**

- `packages/features/src/gallery/components/GallerySection.tsx`
- `packages/features/src/gallery/lib/gallery-schema.ts`
- `packages/features/src/gallery/index.ts`

---

### 2.19 Create Pricing Feature

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 2.11, 2.5

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build new pricing feature. Tables, cards, calculators with data-driven configuration.

**Research-backed guidance (2026):**

- Pricing architecture should support both transparent pricing and quote-led conversion models.
- Internationalization and currency support should be designed early.

**Additions for near-perfect execution:**

- Add pricing display strategy by industry/market.
- Add locale-aware formatting utility contract.

**Acceptance Criteria:**

- Pricing schema supports tier flags (`popular`, `limited`, `custom-quote`).
- Currency/locale formatting strategy is centralized.
- Interactive calculators degrade gracefully without client JS.

**Files:**

- `packages/features/src/pricing/components/PricingSection.tsx`
- `packages/features/src/pricing/lib/pricing-schema.ts`
- `packages/features/src/pricing/index.ts`

---

### 2.20 Extract Search Feature

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 2.11, 1.1 (Dialog)

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move search from template to shared package. The search feature already has 2
substantial components (SearchDialog 6.3KB, SearchPage 3.5KB) but its library code lives
in `templates/hair-salon/lib/search.ts` (4.5KB) rather than in the feature directory.

**Research-backed guidance (2026):**

- Search extraction should separate index building, query logic, and UI rendering layers.
- Ranking behavior must be deterministic and testable across content sources.

**Acceptance Criteria:**

- Search library is fully relocated under feature package ownership.
- Result ranking + highlighting behavior covered with regression tests.
- Search remains keyboard-accessible in dialog and full-page modes.

**Source Files (Verified):**

- `templates/hair-salon/features/search/components/SearchDialog.tsx` (6,275 bytes)
- `templates/hair-salon/features/search/components/SearchPage.tsx` (3,487 bytes)
- `templates/hair-salon/lib/search.ts` (4,487 bytes) — needs to move INTO feature
- `templates/hair-salon/features/search/index.ts`

**Target:**

- `packages/features/src/search/components/SearchDialog.tsx`
- `packages/features/src/search/components/SearchPage.tsx`
- `packages/features/src/search/lib/search.ts`
- `packages/features/src/search/index.ts`

**Refactoring Required:**

- Make search index configurable (not hardcoded to hair-salon content)
- Abstract content source (MDX, CMS, API)
- SearchDialog uses Dialog component from @repo/ui (depends on Task 1.1)

---

### 2.21 Establish Testing Strategy

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define testing approach for all new packages. Currently 13 test files exist
(9 infra, 4 template) but no UI or utility tests. New packages need test scaffolding.

**Research-backed guidance (2026):**

- Use testing pyramid per package type: unit-heavy core logic, targeted integration for flows,
  minimal but critical e2e smoke checks.

**Additions for near-perfect execution:**

- Define “test ownership” per package and required minimum test set for new features.
- Add flaky-test policy and deterministic fixture strategy.

**Acceptance Criteria:**

- Strategy doc defines required test categories by package type.
- New packages include runnable test scripts and starter test templates.
- CI runs package tests in turbo graph with stable pass/fail behavior.

**Tasks:**

- Define test strategy per package type (unit, integration, e2e)
- Set up Jest config for `packages/ui/` (component testing with @testing-library/react)
- Set up Jest config for `packages/features/` (action + schema testing)
- Create test templates (component test, server action test, schema test)
- Add test scripts to new package.json files
- Set intermediate coverage targets: 50% for Phase 1, 80% for Phase 6

**Files:**

- Create: `docs/testing-strategy.md`
- Update: `packages/ui/package.json` (add test script)
- Update: `jest.config.js` (add package paths)

**Existing test infrastructure:**

- Root: Jest 30.2.0, ts-jest, @testing-library/react, @testing-library/jest-dom
- Infra tests: Well-structured with mocks (good reference pattern)
- Template tests: blog.test.ts, booking-actions.test.ts, env.test.ts, search.test.ts

---

### 2.22 Add Feature Parity Regression Tests

**Priority:** CRITICAL | **Effort:** 5 hours | **Dependencies:** 2.12-2.20, 2.21

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Ensure extracted shared features behave the same as original template behavior before
deleting template code. This de-risks refactor-induced functional drift.

**Research-backed guidance (2026):**

- Parity tests should lock critical outputs and side effects, not only snapshot markup.
- Build a traceable matrix from source behavior -> extracted behavior -> assertion coverage.

**Additions for near-perfect execution:**

- Prioritize business-critical parity paths first (booking submit, lead capture, search intent).
- Mark intentional deltas explicitly to avoid false-positive regressions.

**Acceptance Criteria:**

- Parity matrix maps every extracted feature to explicit test cases.
- No template feature is deleted without parity test sign-off.
- CI includes parity suite as blocking check on extraction PRs.

**Files:**

- Create: `templates/hair-salon/__tests__/refactor-parity/*.test.ts`
- Create: `packages/features/src/*/__tests__/parity/*.test.ts`
- Create: `docs/testing/refactor-parity-matrix.md`

**Coverage:**

- Booking submission/validation parity
- Search relevance and indexing parity
- Services rendering/data-shape parity
- Contact/blog workflow parity

---

## Priority 3: Page Templates (Weeks 5-6)

### 3.1 Create Page Templates Package

**Priority:** HIGH | **Effort:** 2 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Create the shared page templates package.

**Research-backed guidance (2026):**

- Keep templates as composition shells with minimal business logic to prevent client divergence.
- Prefer schema-driven section contracts to maintain consistent rendering behavior.

**Additions for near-perfect execution:**

- Add template contract tests that validate required props and section fallbacks.
- Establish semantic version policy for template API changes.

**Acceptance Criteria:**

- Package has clean public exports and no deep-import requirement.
- Build/lint/type-check scripts are wired and pass in isolation.
- Consumer usage examples documented in package README.

**Files:**

- Create: `packages/page-templates/package.json`
- Create: `packages/page-templates/tsconfig.json`
- Create: `packages/page-templates/src/index.ts`
- Create: `packages/page-templates/src/templates/` directory

---

### 3.2 Build HomePageTemplate

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** 3.1, 2.1, 2.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Configurable homepage that assembles sections based on config. Reads siteConfig.features, renders sections in order.

**Research-backed guidance (2026):**

- Homepages should optimize for first meaningful conversion path with above-the-fold clarity.
- Section orchestration should be deterministic and resilient to missing config blocks.

**Additions for near-perfect execution:**

- Introduce `sectionRegistry` map to avoid brittle switch growth.
- Add config lint rule for duplicate/unknown section IDs.

**Acceptance Criteria:**

- Section composition is fully config-driven with deterministic fallback behavior.
- Unknown/disabled section types fail safely with typed guards.
- Home template passes accessibility and performance smoke checks.

**Files:**

- Create: `packages/page-templates/src/templates/HomePageTemplate.tsx`

**Logic:**

```typescript
export function HomePageTemplate({ config }: { config: SiteConfig }) {
  const sections = config.sections || getDefaultSections(config.industry);
  return (
    <>
      {sections.map(section => {
        switch(section.type) {
          case 'hero': return <HeroVariant {...section.props} />;
          case 'services': return <ServiceShowcase {...section.props} />;
          case 'testimonials': return <TestimonialsSection {...section.props} />;
          case 'team': return <TeamSection {...section.props} />;
          case 'cta': return <CTASection {...section.props} />;
          // ... etc
        }
      })}
    </>
  );
}
```

---

### 3.3 Build ServicesPageTemplate

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 3.1, 2.2, 2.15

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Services listing page with grid, list, or tabs layout. Category filtering support.

**Research-backed guidance (2026):**

- Keep filter state URL-synced for shareability, analytics, and SEO consistency.
- Ensure category semantics are stable across industries through typed taxonomies.

**Additions for near-perfect execution:**

- Add canonical URL strategy for filtered states.
- Include empty-state recommendation modules (CTA/contact fallback).

**Acceptance Criteria:**

- URL/query state for filtering is shareable and stable.
- Layout variant switch does not break heading hierarchy or landmarks.
- Empty-state UX is defined and tested.

**Files:**

- Create: `packages/page-templates/src/templates/ServicesPageTemplate.tsx`

**Props:**

```typescript
interface ServicesPageTemplateProps {
  services: Service[];
  layout: 'grid' | 'list' | 'tabs';
  categories?: string[];
  showPricing?: boolean;
}
```

---

### 3.4 Build AboutPageTemplate

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 3.1, 2.3, 2.17

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** About page with configurable sections: Story, Team, Mission, Values, Timeline.

**Research-backed guidance (2026):**

- Trust pages perform best with clear social proof, founder narrative, and credential framing.
- Content ordering should support progressive trust-building for service businesses.

**Additions for near-perfect execution:**

- Define optional trust modules (certifications, awards, press logos).
- Add standardized schema slots for Organization/Person metadata hooks.

**Acceptance Criteria:**

- Section ordering is configurable without code changes.
- Optional timeline/team modules degrade gracefully when absent.
- Template supports industry-specific storytelling content blocks.

**Files:**

- Create: `packages/page-templates/src/templates/AboutPageTemplate.tsx`

**Props:**

```typescript
interface AboutPageTemplateProps {
  content: AboutContent;
  showTeam: boolean;
  showTimeline?: boolean;
}
```

---

### 3.5 Build ContactPageTemplate

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 3.1, 2.10, 2.13

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Contact page with form + business info + optional map.

**Research-backed guidance (2026):**

- Conversion UX should minimize friction while preserving intent qualification quality.
- Contact pages should prioritize response expectation clarity (hours, SLA, channels).

**Additions for near-perfect execution:**

- Add configurable response-time promise block.
- Add failover contact channel display when forms are unavailable.

**Acceptance Criteria:**

- Contact CTA, hours, and address render from config with validation.
- Form variant selection is config-driven and type-safe.
- Optional map is progressively enhanced and non-blocking.

**Files:**

- Create: `packages/page-templates/src/templates/ContactPageTemplate.tsx`

**Props:**

```typescript
interface ContactPageTemplateProps {
  contact: ContactInfo;
  showMap: boolean;
  formVariant: 'simple' | 'multi-step' | 'with-booking';
}
```

---

### 3.6 Build BlogIndexTemplate

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 3.1, 2.14

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Blog post listing with filters, categories, tags, pagination.

**Research-backed guidance (2026):**

- Topic clusters and taxonomy consistency improve internal linking and SEO authority.
- Pagination and canonical management are critical to avoid duplicate-content dilution.

**Additions for near-perfect execution:**

- Add optional featured-post pinning strategy.
- Add content freshness indicators (last updated + editorial state).

**Acceptance Criteria:**

- Listing supports SEO-friendly pagination and canonical handling.
- Filter state is URL-addressable and crawl-safe.
- Performance remains acceptable on large post sets.

**Files:**

- Create: `packages/page-templates/src/templates/BlogIndexTemplate.tsx`

**Props:**

```typescript
interface BlogIndexTemplateProps {
  posts: Post[];
  categories: Category[];
  pagination: PaginationInfo;
}
```

---

### 3.7 Build BlogPostTemplate

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 3.1, 2.14

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Individual blog post layout with metadata, related posts.

**Research-backed guidance (2026):**

- Long-form readability benefits from scannable structure (TOC, reading progress, callouts).
- Related-content modules should balance topical relevance with conversion opportunities.

**Additions for near-perfect execution:**

- Add configurable inline CTA slots (mid-content and end-content).
- Add structured data hooks for Article/FAQ/HowTo when applicable.

**Acceptance Criteria:**

- Metadata hooks support OpenGraph, Twitter, and schema outputs.
- Related-post logic is pluggable and deterministic.
- Reading experience accessibility (headings, TOC, code blocks) is validated.

**Files:**

- Create: `packages/page-templates/src/templates/BlogPostTemplate.tsx`

**Props:**

```typescript
interface BlogPostTemplateProps {
  post: Post;
  related: Post[];
}
```

---

### 3.8 Build BookingPageTemplate

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 3.1, 2.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Booking page with form and context. Pre-fillable service selection.

**Research-backed guidance (2026):**

- Booking flows should preserve prefill intent through validation errors and page reloads.
- Context-aware prefill significantly improves completion rates when intent is explicit.

**Additions for near-perfect execution:**

- Add anti-abandonment cues (step status + expected completion time).
- Support optional “save and continue later” for high-friction bookings.

**Acceptance Criteria:**

- Prefill source is validated and sanitized.
- Booking context (service, date, provider hints) is clearly reflected in UI.
- Booking template reuses extracted feature APIs without custom forks.

**Files:**

- Create: `packages/page-templates/src/templates/BookingPageTemplate.tsx`

**Props:**

```typescript
interface BookingPageTemplateProps {
  prefilledService?: string;
  config: BookingConfig;
}
```

---

## Priority 4: Integrations (Weeks 6-8)

### 4.1 Create Email Marketing Integrations

**Priority:** MEDIUM | **Effort:** 6 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Email marketing service integrations for newsletter signup, automated sequences.

**Research-backed guidance (2026):**

- Integrations should use provider adapter contracts, retries, and explicit timeout behavior.

**Additions for near-perfect execution:**

- Add webhook verification and replay protection guidance.
- Define consent/event mapping model per jurisdiction (opt-in vs double opt-in).

**Acceptance Criteria:**

- Each provider exposes consistent subscribe/unsubscribe interfaces.
- API key requirements and scopes are documented securely.
- Failure handling and fallback behavior are covered in tests.

**Files:**

- Create: `packages/integrations/mailchimp/package.json`
- Create: `packages/integrations/mailchimp/src/index.ts`
- Create: `packages/integrations/sendgrid/package.json`
- Create: `packages/integrations/sendgrid/src/index.ts`
- Create: `packages/integrations/convertkit/package.json`
- Create: `packages/integrations/convertkit/src/index.ts`

---

### 4.2 Create Scheduling Integrations

**Priority:** MEDIUM | **Effort:** 6 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Third-party scheduling embeds - Calendly, Acuity, Cal.com.

**Research-backed guidance (2026):**

- Provider abstraction should separate embed UX from booking data contracts.
- Scheduling integrations should support consent-based lazy loading for privacy and performance.

**Additions for near-perfect execution:**

- Add integration fallback for blocked third-party scripts.
- Track handoff completion metrics (click-through vs completed booking).

**Acceptance Criteria:**

- Embed providers are abstracted behind one scheduling interface.
- Privacy/consent behavior is respected before third-party script load.
- Accessibility of embedded flows is documented with mitigations.

**Files:**

- Create: `packages/integrations/calendly/package.json`
- Create: `packages/integrations/calendly/src/index.ts`
- Create: `packages/integrations/acuity/package.json`
- Create: `packages/integrations/acuity/src/index.ts`
- Create: `packages/integrations/calcom/package.json`
- Create: `packages/integrations/calcom/src/index.ts`

---

### 4.3 Create Chat Support Integrations

**Priority:** MEDIUM | **Effort:** 5 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Live chat integrations - Intercom, Crisp, Tidio.

**Research-backed guidance (2026):**

- Chat tools should load after intent cues to avoid unnecessary script cost.
- Unified event hooks allow consistent lead attribution across providers.

**Additions for near-perfect execution:**

- Add provider-neutral API for open/close/identify actions.
- Add role-based visibility policy (e.g., show chat only on service pages).

**Acceptance Criteria:**

- Chat loaders are lazy and consent-gated.
- Provider-specific initialization options map to a shared config model.
- Performance overhead of chat scripts is measured and documented.

**Files:**

- Create: `packages/integrations/intercom/package.json`
- Create: `packages/integrations/intercom/src/index.ts`
- Create: `packages/integrations/crisp/package.json`
- Create: `packages/integrations/crisp/src/index.ts`
- Create: `packages/integrations/tidio/package.json`
- Create: `packages/integrations/tidio/src/index.ts`

---

### 4.4 Create Review Platform Integrations

**Priority:** MEDIUM | **Effort:** 5 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Review aggregation from Google, Yelp, Trustpilot.

**Research-backed guidance (2026):**

- Aggregation pipelines need freshness windows, moderation, and source credibility markers.
- Review display should expose provenance to preserve trust and compliance.

**Additions for near-perfect execution:**

- Add stale-cache fallback rules and timestamp badges.
- Add policy for handling removed/flagged reviews across providers.

**Acceptance Criteria:**

- Normalized review schema supports source, rating, timestamp, and moderation flags.
- Stale/failing provider responses fail gracefully with cached fallback.
- Terms-of-service constraints per provider are documented.

**Files:**

- Create: `packages/integrations/google-reviews/package.json`
- Create: `packages/integrations/google-reviews/src/index.ts`
- Create: `packages/integrations/yelp/package.json`
- Create: `packages/integrations/yelp/src/index.ts`
- Create: `packages/integrations/trustpilot/package.json`
- Create: `packages/integrations/trustpilot/src/index.ts`

---

### 4.5 Create Maps Integration

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Google Maps embed with directions, markers.

**Research-backed guidance (2026):**

- Maps should be progressive enhancements, not critical render dependencies.
- Low-bandwidth and script-blocked environments need textual fallback paths.

**Additions for near-perfect execution:**

- Add static-map preview option for better LCP.
- Add localization-aware directions deep links.

**Acceptance Criteria:**

- Map embed is optional and non-blocking for page render.
- API key handling follows secure env practices (no client secret leakage).
- Fallback address/directions links are provided when embed unavailable.

**Files:**

- Create: `packages/integrations/google-maps/package.json`
- Create: `packages/integrations/google-maps/src/index.ts`

---

### 4.6 Create Industry Schemas Package

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** JSON-LD structured data generators for SEO.

**Research-backed guidance (2026):**

- Schema generators should be strongly typed and decoupled from page rendering concerns.
- Industry mappings should align with supported schema.org entity hierarchies.

**Additions for near-perfect execution:**

- Add schema validation step in CI (lint + rich-results checks).
- Add versioned schema changelog for client migration safety.

**Acceptance Criteria:**

- Output schemas validate against schema.org expectations for key industries.
- Generators are pure, typed, and snapshot-tested.
- Integration points in page templates are documented.

**Files:**

- Create: `packages/industry-schemas/package.json`
- Create: `packages/industry-schemas/src/types/base.ts` (LocalBusiness, Service, Person, Review, Location)
- Create: `packages/industry-schemas/src/types/hair-salon.ts`
- Create: `packages/industry-schemas/src/types/restaurant.ts`
- Create: `packages/industry-schemas/src/types/law-firm.ts`
- Create: `packages/industry-schemas/src/types/medical.ts`
- Create: `packages/industry-schemas/src/types/retail.ts`
- Create: `packages/industry-schemas/src/schemas/local-business.ts`
- Create: `packages/industry-schemas/src/schemas/service.ts`
- Create: `packages/industry-schemas/src/schemas/review.ts`
- Create: `packages/industry-schemas/src/schemas/faq.ts`
- Create: `packages/industry-schemas/src/schemas/breadcrumb.ts`
- Create: `packages/industry-schemas/src/schemas/website.ts`

---

## Priority 5: Client Architecture (Weeks 7-9)

### 5.1 Create Client Starter Template

**Priority:** CRITICAL | **Effort:** 6 hours | **Dependencies:** 3.2, 3.3, 3.5, 3.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Minimal client template demonstrating configuration-only approach.

**Research-backed guidance (2026):**

- Starters should optimize for adoption speed: minimal opinionated code, strong defaults,
  and clear extension points.

**Additions for near-perfect execution:**

- Add bootstrap validation script for post-generate sanity checks.
- Include opinionated env template and deployment checklist by default.

**Acceptance Criteria:**

- Starter boots and passes lint/type-check/build/test out of the box.
- New client can launch with config/content changes only (no core code edits).
- Starter README includes setup, deploy, and customization quickstart.

**Files:**

```
clients/starter-template/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Uses HomePageTemplate
│   ├── about/
│   │   └── page.tsx        # Uses AboutPageTemplate
│   ├── services/
│   │   └── page.tsx        # Uses ServicesPageTemplate
│   ├── contact/
│   │   └── page.tsx        # Uses ContactPageTemplate
│   ├── blog/
│   │   ├── page.tsx        # Uses BlogIndexTemplate
│   │   └── [slug]/
│   │       └── page.tsx    # Uses BlogPostTemplate
│   ├── book/
│   │   └── page.tsx        # Uses BookingPageTemplate
│   └── api/
│       └── [...routes]     # API routes as needed
├── site.config.ts          # Client configuration ONLY
├── next.config.js
├── tailwind.config.js
├── package.json            # Minimal deps
└── README.md
```

**Page Implementation Pattern (Thin Wrapper):**

```typescript
// app/page.tsx
import { HomePageTemplate } from '@repo/page-templates';
import siteConfig from '@/site.config';

export default function HomePage() {
  return <HomePageTemplate config={siteConfig} />;
}
```

**package.json:**

```json
{
  "dependencies": {
    "@repo/page-templates": "workspace:*",
    "@repo/features": "workspace:*",
    "@repo/ui": "workspace:*",
    "@repo/marketing-components": "workspace:*",
    "next": "catalog:",
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

---

### 5.2 Create Salon Client Example

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 5.1, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Example client `clients/luxe-salon/` with hair-salon industry config.

**Research-backed guidance (2026):**

- Reference clients should represent “best-practice implementations,” not minimal demos.

**Additions for near-perfect execution:**

- Add before/after migration diff notes for onboarding teams.
- Add perf + conversion baseline snapshot to docs.

**Acceptance Criteria:**

- Client demonstrates at least one non-default variation per core feature.
- Config is fully typed and uses `@repo/types` contracts.
- Build/test results are archived as reference baseline.

**Features:** Booking, Services, Team, Gallery
**Industry:** hair-salon

---

### 5.3 Create Restaurant Client Example

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 5.1, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Example client `clients/bistro-central/` with restaurant industry config.

**Research-backed guidance (2026):**

- Restaurant templates should emphasize menu discoverability and reservation speed.

**Additions for near-perfect execution:**

- Add fallback UX when reservation integration is unavailable.
- Include event-driven sections (specials/hours changes).

**Acceptance Criteria:**

- Demonstrates restaurant-specific schema + conversion flow customization.
- Reuses shared features/components without local forks.
- Includes mobile UX checks for menu/reservation key journeys.

**Features:** Menu, Reservations, Location, Events
**Industry:** restaurant

---

### 5.4 Create Law Firm Client Example

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 5.1, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Example client `clients/chen-law/` with law-firm industry config.

**Research-backed guidance (2026):**

- Legal websites require clarity around practice areas, trust signals, and disclaimers.

**Additions for near-perfect execution:**

- Include disclosure/advertising disclaimer slots in config.
- Add intake form classification for lead routing quality.

**Acceptance Criteria:**

- Includes legal-specific info architecture and conversion paths.
- Industry compliance copy hooks are represented in config.
- SEO schema output validates for legal domain content.

**Features:** Practice Areas, Attorneys, Case Results, Contact
**Industry:** law-firm

---

### 5.5 Create Medical Client Example

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 5.1, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Example client `clients/sunrise-dental/` with medical industry config.

**Research-backed guidance (2026):**

- Medical verticals benefit from explicit trust architecture and appointment clarity.

**Additions for near-perfect execution:**

- Add configurable insurance and patient instructions modules.
- Include accessibility checks for patient-critical information surfaces.

**Acceptance Criteria:**

- Demonstrates medical booking/contact + trust-content patterns.
- Sensitive-form handling and consent copy are represented.
- Performance/a11y checks pass on critical patient flows.

**Features:** Services, Doctors, Insurance, Booking
**Industry:** medical

---

### 5.6 Create Retail Client Example

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 5.1, 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Example client `clients/urban-outfitters/` with retail industry config.

**Research-backed guidance (2026):**

- Retail experiences should balance product exploration with store-intent conversion paths.

**Additions for near-perfect execution:**

- Add promotion/banner governance for campaign periods.
- Add SKU/category SEO metadata mapping guidance.

**Acceptance Criteria:**

- Demonstrates catalog-style layout and store/location patterns.
- Reusable retail defaults are encoded back into industry presets when applicable.
- Conversion instrumentation follows shared event taxonomy.

**Features:** Products, Locations, Lookbook, Contact
**Industry:** retail

---

### 5.7 Create Migration Validation Matrix

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 5.1-5.6, 3.2-3.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define an explicit page-by-page validation matrix so each client migration is verified
for route coverage, SEO metadata, analytics hooks, accessibility, and conversion flow behavior.

**Research-backed guidance (2026):**

- Migration programs succeed with auditable evidence logs and strict go/no-go criteria.

**Additions for near-perfect execution:**

- Add severity tiers for validation failures (blocker/warn/info).
- Add owner-signoff matrix for launch approvals.

**Acceptance Criteria:**

- Matrix includes pass/fail evidence links per client and per route.
- Required launch criteria are explicitly gated (no implicit sign-off).
- Validation checklist is reusable for future clients.

**Files:**

- Create: `docs/migration/client-validation-matrix.md`
- Create: `docs/migration/checklists/client-go-live-checklist.md`

**Validation dimensions:**

- Routes and navigation correctness
- Schema.org and SEO metadata correctness
- Form submissions and conversion events
- Mobile/desktop rendering checks
- Error states and empty states

---

## Priority 6: Cleanup & Documentation (Weeks 9-12)

### 6.1 Migrate Template Content

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 5.1

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move hair-salon specific components to appropriate packages if reusable.

**Research-backed guidance (2026):**

- Reuse decisions should optimize for long-term maintenance, not short-term extraction speed.

**Additions for near-perfect execution:**

- Define reusable-component scorecard (portability, coupling, testability).
- Track deferred extraction candidates in a dedicated backlog.

**Acceptance Criteria:**

- Reusability rubric applied to each migrated component.
- Domain-specific leftovers are documented with rationale.
- No duplicated component logic remains across template/client paths.

**Files to Review:**

- `templates/hair-salon/components/` (11 components with feature tags)
- Move reusable ones to `@repo/marketing-components`

---

### 6.2 Create Migration Guide

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 5.1

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Document how to move from template to client-based setup.

**Research-backed guidance (2026):**

- Migration guides are most effective when paired with validated real-world examples.

**Additions for near-perfect execution:**

- Include “common failure signatures” with exact remediation commands.
- Add estimated effort ranges by migration complexity tier.

**Acceptance Criteria:**

- Guide includes prerequisite checks, migration steps, and rollback path.
- Includes troubleshooting for top migration failure modes.
- Validated by running migration on at least one sample client.

**Files:**

- Create: `docs/migration/template-to-client.md`

**Content:**

- Step-by-step migration instructions
- Breaking changes
- Common pitfalls and solutions

---

### 6.3 Remove Templates Directory

**Priority:** CRITICAL | **Effort:** 2 hours | **Dependencies:** 6.1, 5.2-5.6

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Delete templates/ directory after all clients migrated.

**Research-backed guidance (2026):**

- Destructive cleanup must be preceded by evidence-backed parity and rollback confidence.

**Additions for near-perfect execution:**

- Require signed-off migration matrix before merge.
- Add final grep/import guard script to ensure zero template references remain.

**Acceptance Criteria:**

- No runtime/build import references remain to `templates/*`.
- Workspace and turbo config are cleaned without orphan tasks.
- Removal is executed behind confirmed rollback/tag strategy.

**Files to Delete:**

- `templates/` directory (entire)

**Files to Update:**

- `pnpm-workspace.yaml` - Remove `templates/*` reference
- `turbo.json` - Remove template-specific pipelines
- `README.md` - Update project structure diagram

---

### 6.4 Create Component Library Documentation

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** 1.1-1.6, 2.1-2.10

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Comprehensive docs for all components.

**Research-backed guidance (2026):**

- Component docs should emphasize practical composition patterns and accessibility defaults.

**Additions for near-perfect execution:**

- Add “dos/don’ts” and anti-pattern section per component family.
- Add copy-paste starter examples per industry context.

**Acceptance Criteria:**

- Every public component has usage, props, accessibility, and variant docs.
- Docs include at least one real client-context example per component family.
- Documentation pipeline is included in CI quality checks.

**Options:**

- Storybook setup in `docs/storybook/`
- Or Markdown docs in `docs/components/`

**Content per Component:**

- Usage examples
- Props documentation
- Accessibility notes
- Live demos

---

### 6.5 Create Configuration Reference

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Complete site.config.ts documentation.

**Research-backed guidance (2026):**

- Config references should be treated as product API docs with change management discipline.

**Additions for near-perfect execution:**

- Add machine-readable schema excerpts alongside prose docs.
- Include migration recipes between config versions.

**Acceptance Criteria:**

- All config fields include type, default, requiredness, and examples.
- Industry-specific overrides and anti-patterns are documented.
- Reference stays synchronized with `@repo/types` via update policy.

**Files:**

- Create: `docs/configuration/site-config-reference.md`
- Create: `docs/configuration/industry-configs.md`

**Content:**

- All options documented
- Example configurations per industry
- Migration guides between versions

---

### 6.6 Create Feature Documentation

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 2.12-2.19

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Document each feature package.

**Research-backed guidance (2026):**

- Feature docs should include integration boundaries and event/analytics touchpoints.

**Additions for near-perfect execution:**

- Add state diagrams for workflow-heavy features (booking/contact/search).
- Add dependency matrix per feature package.

**Acceptance Criteria:**

- Each feature doc includes API contract, config schema, and integration examples.
- Known limitations and extension points are explicit.
- Docs are linked from top-level README navigation.

**Files:**

- `docs/features/booking.md`
- `docs/features/contact.md`
- `docs/features/blog.md`
- `docs/features/services.md`
- `docs/features/testimonials.md`
- `docs/features/team.md`
- `docs/features/gallery.md`
- `docs/features/pricing.md`

**Content per Feature:**

- Usage guide
- Configuration options
- Integration guides
- API reference

---

### 6.7 Create Architecture Decision Records

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** All above

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Document why architectural decisions were made.

**Research-backed guidance (2026):**

- ADR programs are most useful when tied to enforceable policies and revisit dates.

**Additions for near-perfect execution:**

- Add ADR status taxonomy (`proposed`, `accepted`, `superseded`).
- Add ADR cross-linking to affected tasks/scripts.

**Acceptance Criteria:**

- ADRs include context, decision, alternatives, consequences, and revisit triggers.
- ADR index is discoverable from repo root docs.
- New architectural changes require ADR linkage in PR workflow.

**Files:**

- Create: `docs/adr/001-feature-based-architecture.md`
- Create: `docs/adr/002-radix-ui-primitives.md`
- Create: `docs/adr/003-pnpm-catalog.md`
- Create: `docs/adr/004-industry-agnostic-design.md`

---

### 6.8 Create CLI Tooling

**Priority:** MEDIUM | **Effort:** 8 hours | **Dependencies:** 6.3

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Developer tools for scaffolding new clients and components.

**Research-backed guidance (2026):**

- Scaffolding tools should encode architecture standards, not just generate files.

**Additions for near-perfect execution:**

- Add template version pinning and upgrade advisories.
- Add telemetry hooks for scaffold adoption analytics (local opt-in).

**Acceptance Criteria:**

- CLI commands support dry-run and validation modes.
- Generated output conforms to lint/type-check/build standards immediately.
- Tooling docs include examples and failure troubleshooting.

**Files:**

- Create: `tooling/create-client/package.json`
- Create: `tooling/create-client/src/index.ts`
- Create: `tooling/create-client/templates/`
- Create: `tooling/validation/src/validate-site-config.ts`
- Create: `tooling/generate-component/src/index.ts`

**CLI Commands:**

```bash
# Create new client
pnpm create-client my-client --industry=restaurant

# Validate site config
pnpm validate-config clients/my-client/site.config.ts

# Generate component
pnpm generate-component MyComponent --package=marketing-components
```

---

### 6.9 Remove Dead Code and Unused Dependencies

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 6.1, 6.3

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** After extraction and template removal, prune stale files, exports, scripts, and package
dependencies to reduce maintenance burden and build size.

**Research-backed guidance (2026):**

- Post-migration hygiene should combine static analysis with runtime smoke validation.

**Additions for near-perfect execution:**

- Add dependency risk scoring (critical runtime vs optional tooling).
- Add periodic automated cleanup audit cadence.

**Acceptance Criteria:**

- Pruning report lists removed deps/files with justification.
- Build/test/runtime smoke checks confirm no accidental removals.
- Dead-export and orphan-file checks are added to recurring maintenance workflow.

**Files:**

- Update: root `package.json` and package-level `package.json` files (remove stale deps/scripts)
- Create: `docs/cleanup/dependency-pruning-report.md`
- Update: package barrel files to remove dead exports

**Tooling:**

- Use unused-dependency and orphan-file analysis (e.g., knip/depcheck + TS project refs)
- Validate no runtime dependency was accidentally removed

---

### 6.10 Execute Final Cutover and Rollback Runbook

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** 6.3, 6.9, 5.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define and execute final cutover from template-based architecture to package/client
architecture with a tested rollback path.

**Research-backed guidance (2026):**

- Cutovers are safest when rehearsed with explicit rollback trigger thresholds.

**Additions for near-perfect execution:**

- Add cutover command checklist with expected outputs.
- Add incident comms protocol for failed cutover windows.

**Acceptance Criteria:**

- Dry-run cutover executed successfully before production cutover.
- Rollback rehearsal completed with measured recovery time.
- Final sign-off includes engineering + product launch checklist evidence.

**Files:**

- Create: `docs/migration/cutover-runbook.md`
- Create: `docs/migration/rollback-plan.md`
- Update: `README.md` with final architecture and recovery notes

**Runbook must include:**

- Pre-cutover checklist and freeze window
- Backup/tagging strategy before destructive changes
- Post-cutover smoke tests and sign-off criteria
- Rollback triggers and step-by-step recovery commands

---

## Comparative Gap Closure Backlog (Cross-Cutting)

> These tasks are derived from comparative analysis of `ANALYSIS_ENHANCED.md` and
> `RESEARCH_ENHANCED.md`. They close remaining gaps needed to achieve a flexible,
> creative-empowered, marketing-first repository at high engineering standards.

### C.1 Enforce Circular Dependency and Layering Checks

**Priority:** CRITICAL | **Effort:** 2 hours | **Dependencies:** 0.11

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Add automated graph validation to block circular dependencies and invalid
upward imports across monorepo layers (`config -> utils -> ui/infra -> features -> clients`).

**Research-backed guidance (2026):**

- Graph validation is strongest when paired with explicit layer policy and import-fence linting.
- Violations should be surfaced early in PR checks with actionable remediation output.

**Additions for near-perfect execution:**

- Add allowlist mechanism for temporary exceptions with expiration dates.
- Emit graph artifacts for review in CI logs/artifacts.

**Acceptance Criteria:**

- Dependency graph check runs in CI and fails on cycles/layer violations.
- Allowed layer edges are documented and versioned.
- Violations include actionable remediation guidance.

**Files:**

- Create: `scripts/architecture/check-dependency-graph.ts`
- Create: `docs/architecture/dependency-graph.md`
- Update: CI workflow to fail on circular/illegal edges

---

### C.2 Harden pnpm Policy and Workspace Determinism

**Priority:** HIGH | **Effort:** 2 hours | **Dependencies:** 0.1, 0.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Align package-management policy with strict monorepo fundamentals (peer dependency
enforcement, workspace preference, linker strategy) and document final decisions.

**Research-backed guidance (2026):**

- Deterministic package installs require explicit policy for peer handling, linker mode, and lockfile discipline.
- Drift prevention is easier with machine-enforced policy checks.

**Additions for near-perfect execution:**

- Add policy-check script in CI that validates key pnpm settings.
- Document exception process for rare tool incompatibilities.

**Acceptance Criteria:**

- Package-management policy doc defines linker, peer, and workspace rules.
- CI validates policy-critical settings to prevent config drift.
- Local onboarding docs reflect final deterministic install workflow.

**Files:**

- Update: `.pnpmrc`
- Update: `.npmrc` (remove conflicting/legacy behavior)
- Create: `docs/architecture/package-management-policy.md`

---

### C.3 Enable Turborepo Remote Cache and Cache Governance

**Priority:** HIGH | **Effort:** 2 hours | **Dependencies:** 0.3, 0.13

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Configure remote caching for CI and local teams with explicit cache hit-rate
tracking and fallback behavior when cache credentials are unavailable.

**Research-backed guidance (2026):**

- Remote caching yields best ROI when cache hit-rate is measured and regressed as an SLO-like signal.
- Credential fallback behavior must be fail-open for productivity, fail-safe for correctness.

**Additions for near-perfect execution:**

- Add cache-miss root-cause checklist (inputs drift, env variance, task config).
- Track cache effectiveness by lane (build/test/lint/type-check).

**Acceptance Criteria:**

- Remote cache path works in CI and optional local mode.
- Cache hit/miss metrics are reported per run.
- Pipeline falls back safely when cache auth is unavailable.

**Files:**

- Update: `.github/workflows/ci.yml`
- Create: `docs/ci/turbo-remote-cache.md`
- Create: `scripts/ci/report-cache-hit-rate.ts`

---

### C.4 Add Multi-Track Release Strategy (Canary + Stable)

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 0.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Extend versioning workflow with pre-release channels so risky refactor work can be
validated in canary before stable rollout.

**Research-backed guidance (2026):**

- Canary channels reduce blast radius when backed by explicit promotion criteria.
- Changeset metadata should encode channel intent to avoid accidental stable promotion.

**Additions for near-perfect execution:**

- Define canary TTL and auto-expiration policy.
- Add promotion checklist from canary to stable.

**Acceptance Criteria:**

- Canary and stable release paths are both automated and documented.
- Channel-specific version semantics are enforced via changesets config.
- Roll-forward/rollback guidance exists for each channel.

**Files:**

- Update: `.changeset/config.json`
- Create: `.github/workflows/release-canary.yml`
- Update: `docs/release/versioning-strategy.md` (channel strategy)

---

### C.5 Implement Three-Layer Design Token Architecture

**Priority:** CRITICAL | **Effort:** 6 hours | **Dependencies:** 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Upgrade theming system from mostly hardcoded values to explicit option/decision/
component token layers for runtime theming and stronger design consistency.

**Research-backed guidance (2026):**

- Mature token systems separate raw options from semantic decisions and component-level applications.
- Token governance should support future cross-platform export even if web-first today.

**Additions for near-perfect execution:**

- Add naming convention and collision-avoidance rules.
- Add token validation tooling (missing alias, unresolved reference checks).

**Acceptance Criteria:**

- Token layers are clearly separated with naming conventions and ownership.
- Components consume decision/component tokens rather than raw values.
- Token architecture doc includes migration and validation guidance.

**Files:**

- Create: `packages/config/tokens/option-tokens.css`
- Create: `packages/config/tokens/decision-tokens.css`
- Create: `packages/config/tokens/component-tokens.css`
- Update: `packages/config/tailwind-preset.js` (or v4 migration target)
- Create: `docs/design/design-token-architecture.md`

---

### C.6 Add Motion Primitives and Creative Interaction Standards

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 1.1-1.6, C.5

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Create reusable motion primitives (entrance, emphasis, page transitions) to support
intentional, differentiated marketing experiences without ad-hoc animations.

**Research-backed guidance (2026):**

- Motion systems should prioritize clarity of intent (orientation, emphasis, feedback) over decoration.
- Accessibility requires reduced-motion alternatives for all significant motion primitives.

**Additions for near-perfect execution:**

- Add motion token scale (duration/easing/distance) tied to design system.
- Add “motion budget” guideline per page to avoid cognitive overload.

**Acceptance Criteria:**

- Motion primitives include reduced-motion-safe equivalents.
- Presets are reusable across page templates without custom one-offs.
- Motion guidance includes do/don't examples tied to marketing goals.

**Files:**

- Create: `packages/ui/src/motion/primitives.ts`
- Create: `packages/ui/src/motion/presets.ts`
- Update: `packages/ui/src/index.ts`
- Create: `docs/design/motion-guidelines.md`

---

### C.7 Make Storybook + Visual Regression Testing Mandatory

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 6.4

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Implement component showroom with visual regression checks to protect UI quality,
brand consistency, and variant behavior during rapid extraction/refactor.

**Research-backed guidance (2026):**

- Visual regression is most effective with curated critical stories and controlled environment baselines.
- Snapshot governance should include approval ownership and churn controls.

**Additions for near-perfect execution:**

- Tag stories by criticality to prioritize blocking checks.
- Add screenshot diff triage guide (noise vs true regression).

**Acceptance Criteria:**

- Critical components have baseline stories and snapshots.
- Visual regression checks run on PRs as required status checks.
- Snapshot update workflow is documented with approval rules.

**Files:**

- Create: `docs/storybook/` configuration
- Create: visual regression config (`.github/workflows/visual-regression.yml`)
- Create: baseline snapshots for key UI and marketing components

---

### C.8 Build Experimentation Platform (A/B + Feature Flags)

**Priority:** CRITICAL | **Effort:** 6 hours | **Dependencies:** 1.8, 3.2, 5.1

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Introduce controlled experiments across templates/features via deterministic flags,
variant assignment, and outcome instrumentation.

**Research-backed guidance (2026):**

- Experiment platforms should enforce deterministic assignment and clean exposure logging.
- Feature-flag safety mechanisms are mandatory for rapid rollback.

**Additions for near-perfect execution:**

- Add global kill-switch strategy for high-risk variants.
- Add sample-size estimation helpers in experimentation docs.

**Acceptance Criteria:**

- Experiment assignment is deterministic and user-sticky.
- Exposure and outcome events follow shared taxonomy.
- Experiment kill-switch and safety fallback are implemented.

**Files:**

- Create: `packages/infra/experiments/feature-flags.ts`
- Create: `packages/infra/experiments/ab-testing.ts`
- Create: `docs/marketing/experimentation-playbook.md`
- Update: page templates to accept variant assignments

---

### C.9 Add Personalization Rules Engine

**Priority:** HIGH | **Effort:** 6 hours | **Dependencies:** C.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Support privacy-safe personalization (geo, returning visitor cohorts, campaign source)
with explicit allowlist rules and fallback defaults.

**Research-backed guidance (2026):**

- Personalization should be rules-first and consent-aware, with minimal sensitive data usage.
- Every personalized branch should have a stable non-personalized fallback.

**Additions for near-perfect execution:**

- Add explainability log for why a user saw a variant.
- Add policy hooks for region-specific personalization restrictions.

**Acceptance Criteria:**

- Rules engine supports allowlist-only signals and safe defaults.
- Personalization decisions are observable and auditable.
- Privacy constraints and retention boundaries are documented.

**Files:**

- Create: `packages/features/src/personalization/rules-engine.ts`
- Create: `packages/features/src/personalization/segments.ts`
- Create: `docs/marketing/personalization-rules.md`

---

### C.10 Build CMS Abstraction Layer (MDX + Sanity + Storyblok)

**Priority:** HIGH | **Effort:** 8 hours | **Dependencies:** 2.14, 3.6, 3.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Decouple content source from rendering with adapter pattern to support Git-based content
now and headless CMS providers later without page rewrites.

**Research-backed guidance (2026):**

- Adapter-based content architecture should isolate provider concerns and preserve domain models.
- Content contracts need clear optional/required fields to avoid provider lock-in.

**Additions for near-perfect execution:**

- Add contract tests for each adapter against shared fixtures.
- Add fallback content-source priority order policy.

**Acceptance Criteria:**

- Shared content interface supports all adapters consistently.
- Adapter failures degrade gracefully to fallback content paths.
- Content adapter docs include onboarding and extension steps.

**Files:**

- Create: `packages/features/src/content/adapters/mdx-adapter.ts`
- Create: `packages/features/src/content/adapters/sanity-adapter.ts`
- Create: `packages/features/src/content/adapters/storyblok-adapter.ts`
- Create: `packages/features/src/content/content-provider.ts`
- Create: `docs/content/content-source-adapters.md`

---

### C.11 Implement Localization and RTL Foundation

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 5.1, 3.2-3.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Add i18n-ready routing, locale dictionaries, and RTL compatibility so the platform
supports global marketing use cases by design.

**Research-backed guidance (2026):**

- Localization foundations work best with clear locale fallback chains and content ownership.
- RTL support must be tested at component and page-layout levels, not only string translation.

**Additions for near-perfect execution:**

- Add localization completeness checks in CI.
- Add pseudo-locale testing workflow for overflow/truncation detection.

**Acceptance Criteria:**

- Locale routing strategy supports default + optional locales.
- RTL audit covers core template and UI primitives.
- Localization docs include translation workflow and fallback policy.

**Files:**

- Create: `packages/features/src/localization/i18n-config.ts`
- Create: `packages/features/src/localization/dictionaries/`
- Update: template/page packages for locale-aware metadata and routing
- Create: `docs/localization/i18n-rtl-guide.md`

---

### C.12 Standardize Conversion Event Taxonomy and QA

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** 4.1-4.5, C.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define a single analytics event contract (naming, payload, PII policy) and add automated
tests to prevent tracking drift across clients and features.

**Research-backed guidance (2026):**

- Event contracts should be schema-validated and versioned to preserve reporting consistency.
- PII handling must be codified as allowlist/denylist rules at event boundary.

**Additions for near-perfect execution:**

- Add event-contract lint for naming conventions.
- Add mapping table from events to business KPIs.

**Acceptance Criteria:**

- Event contract schema is versioned and tested.
- PII handling rules are explicit and validated.
- All conversion-critical flows emit standardized events.

**Files:**

- Create: `packages/integrations/analytics/src/event-contract.ts`
- Create: `packages/integrations/analytics/src/__tests__/event-contract.test.ts`
- Create: `docs/analytics/conversion-event-taxonomy.md`

---

### C.13 Add Continuous Security Program (SAST + Dependency + SSRF/XSS Tests)

**Priority:** CRITICAL | **Effort:** 5 hours | **Dependencies:** 0.9, 0.10

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Extend current security baseline with continuous scanning, policy checks, and targeted
security regression tests aligned with OWASP Top 10 concerns.

**Research-backed guidance (2026):**

- Continuous security programs combine static checks, dependency intelligence, and scenario tests.
- Security findings need triage SLAs and ownership to prevent alert fatigue.

**Additions for near-perfect execution:**

- Define severity-to-remediation-time policy.
- Add security exception register with expiry.

**Acceptance Criteria:**

- Security workflows run on PR and scheduled cadence.
- Security regression tests include SSRF/XSS/injection scenarios.
- Findings triage and remediation SLA process is documented.

**Files:**

- Update: `.github/workflows/secret-scan.yml`
- Create: `.github/workflows/security-sast.yml`
- Create: `packages/infra/__tests__/security-regression/` (SSRF/XSS/injection scenarios)
- Create: `docs/security/continuous-security-program.md`

---

### C.14 Add Performance and Reliability SLO Framework

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 0.6, 0.13

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Convert performance goals into enforceable SLOs with CI gates, alert thresholds,
and per-client reporting.

**Research-backed guidance (2026):**

- SLOs should use clear measurement windows and owner accountability.
- Budget gates should balance strictness with rollout pragmatism.

**Additions for near-perfect execution:**

- Add burn-rate alert policy for regression trends.
- Add client-tier-specific SLO profiles where needed.

**Acceptance Criteria:**

- SLOs define objective targets, measurement windows, and ownership.
- CI gates enforce budget thresholds for critical pages.
- Reporting artifacts are generated and reviewable per release.

**Files:**

- Create: `docs/performance/slo-definition.md`
- Create: `scripts/perf/validate-budgets.ts`
- Update: CI to fail on budget regressions
- Create: `docs/observability/client-slo-dashboard-spec.md`

---

### C.15 Adopt Spec-Driven Development Workflow

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 6.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Require feature specs before implementation for major modules to improve clarity,
traceability, and AI-agent execution quality.

**Research-backed guidance (2026):**

- Spec-driven delivery improves consistency when templates enforce outcomes, constraints, and acceptance tests.
- Lightweight exemptions are important to keep flow for minor changes.

**Additions for near-perfect execution:**

- Add spec quality checklist (problem statement, non-goals, risks, rollout).
- Add traceability links from spec -> PR -> release notes.

**Acceptance Criteria:**

- Feature-spec templates are in use for major change classes.
- PRs for scoped feature work link to approved specs.
- Workflow docs include exemption criteria for small changes.

**Files:**

- Create: `.kiro/specs/README.md`
- Create: `.kiro/specs/templates/feature-spec-template.md`
- Create: `.kiro/specs/templates/adr-template.md`
- Create: `docs/workflow/spec-driven-development.md`

---

### C.16 Add AI-Assisted Delivery Playbooks

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** C.15

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Establish repeatable AI workflows for implementation, test generation, documentation,
and review so agentic execution is consistent and auditable.

**Research-backed guidance (2026):**

- AI workflows should explicitly separate draft generation from human quality gates.
- Repeatability improves when workflows define artifacts, checks, and stop criteria.

**Additions for near-perfect execution:**

- Add workflow-level success metrics (defect escape, review cycles).
- Add red-team prompts for high-risk changes.

**Acceptance Criteria:**

- Workflows are executable, versioned, and linked from contributor docs.
- Each workflow defines inputs, outputs, and quality checks.
- AI-assisted changes have traceable review and validation steps.

**Files:**

- Create: `docs/workflow/ai-agent-playbook.md`
- Create: `.windsurf/workflows/implement-feature-from-spec.md`
- Create: `.windsurf/workflows/refactor-with-parity-checks.md`

---

### C.17 Add Industry Compliance Feature Pack Framework

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** 1.9, 4.6

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Support industry-specific legal/compliance overlays (e.g., medical privacy copy,
legal disclaimers, secure upload constraints) as configurable packs.

**Research-backed guidance (2026):**

- Compliance overlays should be composable and jurisdiction-aware, not hardcoded by template.
- Legal-review checkpoints should be embedded into release workflow for regulated packs.

**Additions for near-perfect execution:**

- Add pack metadata (`jurisdiction`, `reviewedBy`, `reviewDate`).
- Add policy test cases for required disclaimers per pack.

**Acceptance Criteria:**

- Compliance packs are typed, composable, and opt-in by industry.
- Required legal copy hooks are validated at config time.
- Jurisdictional caveats and legal review touchpoints are documented.

**Files:**

- Create: `packages/types/src/compliance-packs.ts`
- Create: `packages/features/src/compliance/renderers/`
- Create: `docs/compliance/industry-compliance-packs.md`

---

### C.18 Add Edge Personalization and Experiment Routing

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** C.8, C.9

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Move critical variant selection and personalization context resolution to edge middleware
for lower-latency user experiences and globally consistent experiment assignment.

**Research-backed guidance (2026):**

- Edge assignment systems need deterministic hashing and cache-aware key design.
- Fallback parity between edge and origin logic prevents inconsistent user experiences.

**Additions for near-perfect execution:**

- Add assignment debug headers for non-prod troubleshooting.
- Add edge error fallback path that preserves baseline experience.

**Acceptance Criteria:**

- Edge context resolution is deterministic and cache-safe.
- Assignment logic is shareable between edge and server fallbacks.
- Operational guidance covers rollout, rollback, and observability.

**Files:**

- Update: `clients/starter-template/middleware.ts` (reference implementation after template extraction)
- Create: `packages/infra/edge/tenant-experiment-context.ts`
- Create: `docs/architecture/edge-personalization.md`

---

## Code Patterns & Templates

### Metaheader Template (Use for EVERY new file)

```typescript
// File: [FILE_PATH]  [TRACE:FILE=[DOT_NOTATION_PATH]]
// Purpose: [One sentence describing what this file does]
//          [Optional: Additional context]
//
// Exports / Entry: [What this file exports]
// Used by: [What uses this file]
//
// Invariants:
// - [Rule 1]
// - [Rule 2]
// - [Rule 3]
//
// Status: @public or @internal
// Features:
// - [FEAT:CATEGORY] Description
```

### Component Pattern Template

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as RadixComponent from '@radix-ui/react-[component]';
import { cn } from '@repo/utils';
import { forwardRef } from 'react';

const [component]Variants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "variant-classes",
      },
      size: {
        default: "size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface [Component]Props
  extends React.ComponentPropsWithoutRef<typeof RadixComponent.Root>,
    VariantProps<typeof [component]Variants> {
  // Additional custom props
}

export const [Component] = forwardRef<
  React.ElementRef<typeof RadixComponent.Root>,
  [Component]Props
>(({ className, variant, size, ...props }, ref) => (
  <RadixComponent.Root
    ref={ref}
    className={cn([component]Variants({ variant, size }), className)}
    {...props}
  />
));
[Component].displayName = "[Component]";
```

### Package.json Template

```json
{
  "name": "@repo/[package-name]",
  "version": "1.0.0",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@repo/utils": "workspace:*",
    "@repo/config": "workspace:*"
  },
  "peerDependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@repo/eslint-config": "workspace:*",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "typescript": "catalog:"
  }
}
```

### Feature Package Structure

```typescript
// packages/features/src/[feature]/index.ts
// [TRACE:FILE=packages.features.[feature]]
// Purpose: [Feature] feature module for booking/contact/etc functionality
//
// Exports: Components, schemas, actions, types
// Used by: Client applications

export { [Feature]Form } from './components/[Feature]Form';
export { [feature]Schema, type [Feature]Data } from './lib/schema';
export { submit[Feature] } from './lib/actions';
export { [FEATURE]_PROVIDERS } from './lib/providers';
```

---

## File Reference Guide

### When Working On... Read These First

| Task                   | Must Read Files                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **UI Components**      | `packages/ui/src/components/Button.tsx`, `Input.tsx`, `Accordion.tsx`                   |
| **Configuration**      | `packages/types/src/site-config.ts` (post-0.8 target),                                  |
|                        | `templates/hair-salon/site.config.ts` (usage), `pnpm-workspace.yaml` (catalog)          |
| **Feature Extraction** | `templates/hair-salon/features/booking/` (most complete: schema+actions+providers+test) |
| **Search Feature**     | `features/search/components/` (SearchDialog, SearchPage), `lib/search.ts` (in template) |
| **Services Feature**   | `features/services/components/` (ServicesOverview + ServiceDetailLayout)                |
| **Metaheaders**        | Any file in `packages/ui/src/components/`                                               |
| **Package Setup**      | `packages/ui/package.json`, `packages/infra/package.json`                               |
| **Testing**            | `packages/infra/__tests__/` (9 files), `templates/hair-salon/lib/__tests__/` (2 files)  |
| **Env Validation**     | `packages/infra/env/schemas/` (7 Zod schemas: base, booking, hubspot, etc.)             |
| **Security**           | `packages/infra/security/csp.ts` (nonce generation pattern)                             |
| **Shared Types**       | `packages/types/src/site-config.ts` (SiteConfig, ConversionFlowConfig)                  |

### Radix UI Primitives to Install

> **Feb 2026 Update:** shadcn/ui now uses the **unified `radix-ui` package** instead of
> individual `@radix-ui/react-*` packages (new-york style). Consider using the unified
> package for fewer deps and simpler imports. See
> [shadcn changelog](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui).

| Component | Individual Package                | Unified Alternative | Used For        |
| --------- | --------------------------------- | ------------------- | --------------- |
| Dialog    | `@radix-ui/react-dialog`          | `radix-ui`          | Modal, Lightbox |
| Toast     | Use `sonner` (already in project) | —                   | Notifications   |
| Tabs      | `@radix-ui/react-tabs`            | `radix-ui`          | Tabbed content  |
| Dropdown  | `@radix-ui/react-dropdown-menu`   | `radix-ui`          | Menus           |
| Tooltip   | `@radix-ui/react-tooltip`         | `radix-ui`          | Help text       |
| Popover   | `@radix-ui/react-popover`         | `radix-ui`          | Rich overlays   |

**Decision needed:** Use individual `@radix-ui/react-*` packages (current ecosystem norm)
or unified `radix-ui` package (smaller dep tree, newer). Document choice in ADR.

### Existing Dependencies (Already Available in Template)

- `react-hook-form` + `@hookform/resolvers` (3.9.1) - Forms with Zod resolver
- `zod` (3.22.4) - Validation schemas
- `sonner` (^2.0.7) - Toast notifications
- `lucide-react` (0.344.0) - Icons
- `clsx` (2.1.1) + `tailwind-merge` (2.6.1) - Class merging (in @repo/utils)
- `@upstash/ratelimit` (2.0.5) + `@upstash/redis` (1.34.3) - Rate limiting
- `next-mdx-remote` (5.0.0) - MDX content rendering
- `gray-matter` (4.0.3) - Frontmatter parsing
- `date-fns` (^4.1.0) - Date formatting
- `reading-time` (1.5.0) - Blog read time estimates
- `rehype-pretty-code` (0.14.1) + `rehype-slug` (6.0.0) + `remark-gfm` (4.0.0) - MDX plugins
- `@sentry/nextjs` (10.38.0) - Error tracking

---

## Phase 7: AI & Intelligence Layer (Future - Weeks 13-16)

**AOS Layer 6 Implementation**

### 7.1 AI Content Engine

**Priority:** MEDIUM | **Effort:** 12 hours | **Dependencies:** 1.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Generative AI for content creation, optimization, and personalization.

**Research-backed guidance (2026):**

- AI content systems should enforce brand voice, factual grounding, and approval workflows.
- High-impact generation should support retrieval-augmented context to reduce hallucination risk.

**Additions for near-perfect execution:**

- Define prompt/version governance and output quality rubrics.
- Add human-review gates for publish-bound outputs.

**Files:**

- Create: `packages/ai-platform/content-engine/package.json`
- Create: `packages/ai-platform/content-engine/src/generative-copy.ts`
- Create: `packages/ai-platform/content-engine/src/image-generation.ts`
- Create: `packages/ai-platform/content-engine/src/content-optimization.ts`

**Features:**

- SEO description generation (auto-generate meta descriptions)
- Hero image generation (DALL-E 3, Midjourney integration)
- A/B test variant creation (auto-generate copy variants)
- Content suggestions (blog topics, service descriptions)

**Dependencies:** OpenAI API, Vercel AI SDK 3.0

---

### 7.2 LLM Gateway

**Priority:** MEDIUM | **Effort:** 8 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Unified interface for multiple LLM providers with fallback and routing.

**Research-backed guidance (2026):**

- Gateway architectures should separate policy, routing, and provider adapters.
- Fallback policies must consider quality degradation, latency, and cost ceilings.

**Additions for near-perfect execution:**

- Add model capability registry (context window, modalities, cost tiers).
- Add provider outage simulation tests.

**Files:**

- Create: `packages/ai-platform/llm-gateway/package.json`
- Create: `packages/ai-platform/llm-gateway/src/index.ts`
- Create: `packages/ai-platform/llm-gateway/src/providers/openai.ts`
- Create: `packages/ai-platform/llm-gateway/src/providers/anthropic.ts`
- Create: `packages/ai-platform/llm-gateway/src/fallback.ts`

**Features:**

- Provider routing (OpenAI, Anthropic, Google)
- Automatic fallback on failure
- Token usage tracking per client
- Client-specific model fine-tuning hooks

---

### 7.3 Agent Orchestration (MVP)

**Priority:** LOW | **Effort:** 16 hours | **Dependencies:** 7.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Autonomous agents for marketing optimization (Phase 1 - simple triggers).

**Research-backed guidance (2026):**

- Agent systems should begin with constrained, reversible actions and auditable logs.
- Trigger-action orchestration must include policy boundaries and escalation rules.

**Additions for near-perfect execution:**

- Add approval levels by action risk.
- Add agent runbook for pause/resume/rollback.

**Files:**

- Create: `packages/ai-platform/agent-orchestration/package.json`
- Create: `packages/ai-platform/agent-orchestration/src/agents/content-agent.ts`
- Create: `packages/ai-platform/agent-orchestration/src/agents/seo-agent.ts`
- Create: `packages/ai-platform/agent-orchestration/src/triggers.ts`

**MVP Agents:**

```typescript
// Simple trigger-based agents
const contentAgent = {
  trigger: 'blog.draft_created',
  action: 'optimizeSEO({ draftId, targetKeywords })',
};

const seoAgent = {
  trigger: 'page.published',
  action: 'generateStructuredData({ pageType, content })',
};
```

**Note:** Full agentic workflows (campaign optimization, autonomous actions) are Phase 8+.

---

## Phase 8: Content & Asset Layer (Future - Weeks 17-20)

**AOS Layer 4 Implementation**

### 8.1 Visual Page Builder

**Priority:** MEDIUM | **Effort:** 20 hours | **Dependencies:** 3.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Storyblok-like visual editor for drag-drop page composition.

**Research-backed guidance (2026):**

- Visual editors succeed when they enforce component contracts while preserving author freedom.
- Real-time preview should reflect production rendering parity as closely as possible.

**Additions for near-perfect execution:**

- Add schema-driven block validation before save/publish.
- Add change-history and revert support for editor operations.

**Files:**

- Create: `packages/content-platform/visual-editor/package.json`
- Create: `packages/content-platform/visual-editor/src/components/Canvas.tsx`
- Create: `packages/content-platform/visual-editor/src/components/ComponentPalette.tsx`
- Create: `packages/content-platform/visual-editor/src/hooks/useDragDrop.ts`

**Features:**

- Drag-drop component placement
- Real-time preview
- Component property editing sidebar
- Save/restore layouts
- A/B test variant creation from visual editor

---

### 8.2 Digital Asset Management (DAM)

**Priority:** LOW | **Effort:** 12 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Asset management with AI tagging and optimization.

**Research-backed guidance (2026):**

- DAM systems need metadata governance, lifecycle policies, and rights traceability.
- Asset pipelines should optimize derivatives by channel-specific requirements.

**Additions for near-perfect execution:**

- Add retention/archive policy with legal hold support.
- Add duplicate detection and canonical asset selection strategy.

**Files:**

- Create: `packages/content-platform/dam-core/package.json`
- Create: `packages/content-platform/dam-core/src/asset-ingestion.ts`
- Create: `packages/content-platform/dam-core/src/ai-tagging.ts`
- Create: `packages/content-platform/dam-core/src/variant-generation.ts`

**Features:**

- AI auto-tagging of uploaded images
- Automatic format conversion (WebP, AVIF)
- Auto-cropping for social media sizes
- Rights management tracking

---

## Phase 9: Marketing Operations Layer (Future - Weeks 21-24)

**AOS Layer 5 Implementation**

### 9.1 Campaign Orchestration (MVP)

**Priority:** LOW | **Effort:** 24 hours | **Dependencies:** 1.8, 7.3

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Campaign management with workflow automation.

**Research-backed guidance (2026):**

- Campaign orchestration should model dependencies, approvals, and launch readiness gates.
- MVP scope should favor reliability and observability over breadth.

**Additions for near-perfect execution:**

- Add workflow state machine with transition guards.
- Add campaign postmortem template for learning loops.

**Files:**

- Create: `packages/marketing-ops/campaign-orchestration/package.json`
- Create: `packages/marketing-ops/campaign-orchestration/src/campaign-planning.ts`
- Create: `packages/marketing-ops/campaign-orchestration/src/workflow-automation.ts`

**MVP Features:**

- Campaign creation workflow
- Task dependency management
- Approval chains
- Basic resource allocation

**Note:** Full MRM (Marketing Resource Management) with capacity planning, profitability analysis is Phase 10+.

---

## Phase 10: Infrastructure & Multi-Tenancy (Future - Weeks 25-28)

**AOS Layer 0 Advanced Implementation**

### 10.1 Advanced Multi-Tenancy

**Priority:** LOW | **Effort:** 16 hours | **Dependencies:** 5.1

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Full SaaS multi-tenant isolation with automated provisioning.

**Research-backed guidance (2026):**

- Multi-tenancy requires explicit isolation boundaries across data, config, and runtime execution.
- Provisioning should be idempotent, auditable, and policy-driven.

**Additions for near-perfect execution:**

- Add tenant isolation threat model and test plan.
- Add tenant lifecycle SLA targets (provision, suspend, delete).

**Files:**

- Create: `packages/infrastructure/tenant-core/package.json`
- Create: `packages/infrastructure/tenant-core/src/tenant-context.ts`
- Create: `packages/infrastructure/tenant-core/src/tenant-provisioning.ts`
- Create: `packages/infrastructure/tenant-core/src/feature-flags.ts`

**Features:**

- Tenant isolation at database level
- Automated onboarding flow
- Per-tenant feature flags
- Custom domain SSL automation
- Per-client infrastructure cost attribution

---

## Success Criteria

### Phase Gates (Must pass before advancing)

**After Priority 0 (Week 0):**

- [ ] No config file conflicts (.npmrc/.pnpmrc reconciled)
- [ ] Workspace globs synced between package.json and pnpm-workspace.yaml
- [ ] Turborepo upgraded to latest stable (2.8.7+)
- [ ] @repo/shared moved to packages/types/
- [ ] Infra dependency placement fixed
- [ ] Performance baseline documented
- [ ] `pnpm build` and `pnpm test` succeed

**After Priority 1 (Week 2):**

- [ ] 14 UI components in @repo/ui (8 existing + 6 new)
- [ ] Marketing components package created with build passing
- [ ] SiteConfig extended with industry, features, integrations fields
- [ ] All new components have metaheaders and TRACE annotations
- [ ] Test coverage > 50% for new UI components

### Definition of Done (End of Week 12)

- [ ] **No templates directory exists**
- [ ] **At least 5 example clients** demonstrating different industries
- [ ] **All features extracted** to `packages/features/` (9 features: booking, contact,
      blog, services, search, testimonials, team, gallery, pricing)
- [ ] **Component library has 20+ components** (14 UI + 10 marketing + variants)
- [ ] **Configuration-driven** — new client requires only `site.config.ts`
- [ ] **Documentation complete** — can onboard new developer in < 30 minutes
- [ ] **All tests passing** — `pnpm build && pnpm test` green
- [ ] **No performance regression** — CWV scores equal or better than baseline

### Quality Gates

- [ ] **Accessibility:** WCAG 2.2 AA compliance (automated + manual verification)
- [ ] **Performance:** Core Web Vitals all green (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] **Security:** CSP with nonce, security headers, privacy compliance (existing infra)
- [ ] **Type Safety:** TypeScript strict mode, no `any` types, all exports typed
- [ ] **Test Coverage:** > 50% for Phase 1, > 80% for packages/ui and packages/features by Phase 6
- [ ] **Bundle Size:** JS bundle < 200KB, CSS < 50KB per client page

---

## Risk Mitigation

| Risk                       | Mitigation                                                        |
| -------------------------- | ----------------------------------------------------------------- |
| **Migration Risk**         | Keep template functional until all clients migrated               |
| **Breaking Changes**       | Use semantic versioning for packages                              |
| **Scope Creep**            | Strict phase adherence, defer nice-to-haves                       |
| **Testing Gap**            | Add tests during feature extraction; 50% target for Phase 1       |
| **Tailwind v4 Churn**      | Evaluate in Task 0.4; defer if high risk, document ADR            |
| **Next.js 16 Compat**      | Evaluate in Task 0.5; stay on 15 LTS if stability is priority     |
| **Config Drift**           | Priority 0 fixes (.npmrc, workspace globs) prevent build failures |
| **Dep Misplacement**       | Audit all package.json files during extraction (Task 0.9 pattern) |
| **Performance Regression** | Baseline in Task 0.6; measure after each batch                    |

---

## Quick Command Reference

```bash
# Install all dependencies
pnpm install

# Add dependency to specific package
pnpm --filter @repo/ui add @radix-ui/react-dialog

# Run script in all packages
pnpm -r run build

# Run script in changed packages only
pnpm --filter "...[origin/main]" run build

# Update all packages
pnpm up --latest --recursive

# Build with Turborepo
pnpm turbo build
```

---

_TODO Last Updated: February 14, 2026_
_Audited & Enhanced: February 14, 2026 — Verified against actual repo, corrected 10+ factual errors, added Priority 0_
_Second Pass Enhancement: February 14, 2026 — 77 findings verified, 23 new discoveries, strategic execution plan added_
_Third Pass Research & Strategy: February 14, 2026 — Deep internal+external research, 10 new findings, tooling recommendations, refined wave plan_

---

## Appendix: Additional Recommendations to Incorporate Before TODO Restructure

### A. Research-Backed Updates to Encode Explicitly

1. **Next.js 16 needs a dedicated migration track (not only an evaluation task)**

   - Turbopack is default for `next dev` and `next build`
   - Cache model changed (`cacheComponents`, `use cache`)
   - Routing boundary migration (`middleware.ts` to `proxy.ts`) has runtime implications
   - Cache APIs (`updateTag`, `cacheLife`, `cacheTag`) are now central to predictable UX
   - Several breaking changes (`next/image`, async request APIs) require explicit test plans

2. **Design Token governance should align with W3C DTCG stable baseline (2025.10)**

   - Three-layer token model should be standardized and machine-validated
   - Include aliasing/inheritance and modern color support (e.g., Oklch/P3 where appropriate)
   - Add cross-platform export readiness even if web is primary today

3. **UI primitive strategy requires an explicit decision gate**

   - shadcn now supports unified `radix-ui` migration
   - Need a benchmarked choice (bundle impact, migration cost, accessibility parity)
   - Lock decision through ADR before broad component expansion

4. **Visual regression should be a required PR quality gate**

   - Storybook visual testing + CI checks should be mandatory for UI and marketing components
   - Baseline management and required status checks should be defined up front

5. **Monorepo architecture enforcement should be measurable, not just guideline-based**
   - Block deep imports into package internals
   - Block cross-package relative imports
   - Validate dependency DAG layering and circular dependency checks in CI

---

### B. Information Gaps Still Present After Current Backlog Expansion

1. **Schema lifecycle governance**

   - Event/content/config schemas need versioning, deprecation windows, and compatibility policy

2. **Experimentation math governance**

   - Guardrail metrics, sample ratio mismatch checks, false-positive controls, and reporting standards

3. **Content operations discipline**

   - Editorial states (draft/review/publish), preview access controls, rollback semantics, SLA targets

4. **Tenant operations model**

   - Onboarding/offboarding runbook, quotas, limits, per-tenant cost controls

5. **Ownership/DRI model**

   - Package-level and domain-level ownership matrix with escalation routing

6. **SRE operating model**

   - Incident severity matrix, runbooks, error-budget policy, on-call decision protocol

7. **Continuous accessibility governance**

   - a11y CI checks + component-level accessibility acceptance matrix

8. **Compliance operations workflow**
   - Jurisdiction matrix + legal review workflow for regulated industry packs

---

### C. Recommended Restructure Lanes (For Next TODO Reorganization Pass)

1. **Platform Foundations**

   - Toolchain policy, boundaries, CI gates, release/versioning

2. **Design System and Creative Runtime**

   - Tokens, motion language, component governance, visual regression

3. **Marketing Intelligence Core**

   - Experimentation, personalization, analytics event contract, attribution inputs

4. **Content and Localization Platform**

   - CMS adapters, editorial workflow, i18n/RTL, multi-channel content delivery

5. **Security, Privacy, and Reliability**

   - Continuous security scans, privacy controls, SLO/SLA/error-budget governance

6. **Migration and Client Delivery**

   - Parity tests, migration validation matrix, cutover and rollback discipline

7. **Governance and Operating Model**
   - ADR system, ownership matrix, spec-driven workflow, AI delivery playbooks

---

### D. High-Priority Additional Tasks to Add as First-Class Items

#### D.1 Create Schema Governance Program

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** C.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define schema versioning, compatibility classes, and deprecation policy for
`SiteConfig`, event contracts, and content adapters.

**Research-backed guidance (2026):**

- Schema governance should define compatibility guarantees and migration paths per version class.
- Version policy is strongest when enforced by CI checks and release metadata.

**Additions for near-perfect execution:**

- Add deprecation timeline template with communication milestones.
- Add consumer impact assessment checklist per schema change.

**Acceptance Criteria:**

- Schema versioning policy defines breaking/non-breaking classes.
- Change checklist is required for schema-affecting PRs.
- Validation tooling enforces declared version transitions.

**Files:**

- Create: `docs/governance/schema-versioning-policy.md`
- Create: `docs/governance/schema-change-checklist.md`
- Create: `scripts/governance/validate-schema-versioning.ts`

---

#### D.2 Add Experimentation Statistics and Guardrails

**Priority:** CRITICAL | **Effort:** 5 hours | **Dependencies:** C.8

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Introduce standards for test design and interpretation to avoid invalid experiment
conclusions (SRM, minimum run window, guardrail metrics).

**Research-backed guidance (2026):**

- Experiment decision quality depends on robust statistical guardrails and transparent assumptions.
- Guardrail metrics should prevent locally positive but globally harmful outcomes.

**Additions for near-perfect execution:**

- Add standard report format with confidence/uncertainty sections.
- Add pre-launch experimentation checklist for instrumentation readiness.

**Acceptance Criteria:**

- Statistical standards document defines required checks before readout.
- Guardrail utility implements SRM and minimum-run validations.
- Experiment reports include confidence and risk caveats.

**Files:**

- Create: `docs/marketing/experimentation-statistical-standards.md`
- Create: `packages/infra/experiments/guardrails.ts`
- Create: `packages/infra/experiments/__tests__/guardrails.test.ts`

---

#### D.3 Create Editorial Workflow and Preview Governance

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** C.10

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Formalize lifecycle states and secure preview process for all content sources.

**Research-backed guidance (2026):**

- Editorial governance should separate authoring, review, approval, and publish responsibilities.
- Preview security must include scoped access and expiration controls.

**Additions for near-perfect execution:**

- Add content state transition audit logging.
- Add emergency rollback protocol for erroneous publishes.

**Acceptance Criteria:**

- Editorial state model is defined and enforced consistently.
- Preview access is secured with explicit expiration/auth policies.
- Rollback behavior for content releases is documented and tested.

**Files:**

- Create: `docs/content/editorial-workflow.md`
- Create: `docs/content/preview-security-model.md`
- Create: `packages/features/src/content/workflow-state.ts`

---

#### D.4 Create Tenant Operations and Capacity Playbook

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 5.1, C.17

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define tenant onboarding/offboarding, quotas, and capacity planning practices.

**Research-backed guidance (2026):**

- Tenant operations maturity depends on repeatable runbooks and measurable service limits.
- Offboarding flows need explicit data retention/export/deletion controls.

**Additions for near-perfect execution:**

- Add quota breach handling policy and grace windows.
- Add tenant health dashboard requirements.

**Acceptance Criteria:**

- Onboarding/offboarding runbooks include operational checklists.
- Quota policy defines defaults, overrides, and escalation flow.
- Capacity planning artifacts include measurable thresholds.

**Files:**

- Create: `docs/operations/tenant-onboarding-playbook.md`
- Create: `docs/operations/tenant-offboarding-playbook.md`
- Create: `docs/operations/tenant-quotas-and-limits.md`

---

#### D.5 Establish Incident Management and Error Budget Policy

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** C.14

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Create reliability operating model for incidents, postmortems, and release pacing.

**Research-backed guidance (2026):**

- Reliability programs need clear severity definitions, escalation paths, and learning loops.
- Error budget policy should directly influence release velocity decisions.

**Additions for near-perfect execution:**

- Add incident command roles and handoff guidance.
- Add postmortem follow-up tracking mechanism.

**Acceptance Criteria:**

- Incident severity matrix and response expectations are explicit.
- Error budget policy defines release gating behavior.
- Postmortem template includes corrective/preventive action tracking.

**Files:**

- Create: `docs/reliability/incident-severity-matrix.md`
- Create: `docs/reliability/error-budget-policy.md`
- Create: `docs/reliability/postmortem-template.md`

---

#### D.6 Add Continuous Accessibility Gates and Rubrics

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 0.7, 6.4

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Convert accessibility from one-off audits into enforceable CI and review standards.

**Research-backed guidance (2026):**

- Continuous accessibility quality requires both automated scanning and manual assistive-tech testing.
- Governance should define minimum a11y evidence per release.

**Additions for near-perfect execution:**

- Add critical-journey manual test script template.
- Add periodic accessibility debt review cadence.

**Acceptance Criteria:**

- Accessibility rubric is integrated into PR and release process.
- Automated checks run for critical routes/components in CI.
- Release gates require a11y sign-off evidence.

**Files:**

- Create: `docs/accessibility/component-a11y-rubric.md`
- Update: CI with automated a11y checks for critical pages/components
- Create: `docs/accessibility/release-a11y-gate.md`

---

#### D.7 Add Ownership and Escalation Matrix

**Priority:** MEDIUM | **Effort:** 2 hours | **Dependencies:** None

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define DRIs and escalation paths by package and cross-cutting domain.

**Research-backed guidance (2026):**

- Ownership clarity reduces incident resolution time and improves roadmap accountability.
- Escalation models should map directly to severity and business impact.

**Additions for near-perfect execution:**

- Add backup-owner policy for each critical domain.
- Add quarterly ownership review process.

**Acceptance Criteria:**

- Ownership matrix covers all active packages/domains.
- Escalation policy defines response expectations by severity.
- Governance docs are linked from root contributing docs.

**Files:**

- Create: `docs/governance/ownership-matrix.md`
- Create: `docs/governance/escalation-policy.md`

---

#### D.8 Add Software Supply Chain Security Program

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** C.13

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Extend security posture with SBOM, provenance/attestations, and dependency integrity
checks in CI.

**Research-backed guidance (2026):**

- Supply-chain security requires artifact transparency and verifiable build provenance.
- Integrity checks should be integrated into release gates, not treated as advisory.

**Additions for near-perfect execution:**

- Add attestation storage/retention policy.
- Add exception path for emergency security hotfixes.

**Acceptance Criteria:**

- SBOM and dependency integrity checks run automatically in CI.
- Provenance/attestation approach is documented with tooling constraints.
- Security release checklist references supply-chain artifacts.

**Files:**

- Create: `docs/security/supply-chain-security.md`
- Update: `.github/workflows/sbom-generation.yml`
- Create: `.github/workflows/dependency-integrity.yml`

---

## Appendix: Round 1 Adjacency-Derived Innovation Tasks

### E.1 Implement Perceived Performance Standards Pack

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 0.6, C.14

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Standardize UX response-time behavior by operation duration bands to improve trust and
conversion when latency cannot be eliminated.

**Research-backed guidance (2026):**

- Perceived performance patterns should map user feedback to latency bands predictably.
- Transparency cues reduce abandonment during unavoidable waits.

**Additions for near-perfect execution:**

- Add pattern matrix by latency class (<300ms, <1s, 1-3s, >3s).
- Add message-copy guidelines by operation criticality.

**Acceptance Criteria:**

- Operation latency bands map to approved loading-feedback patterns.
- Key journeys use standardized feedback components.
- Pattern guidance includes anti-patterns and fallbacks.

**Files:**

- Create: `docs/performance/perceived-performance-standards.md`
- Create: `packages/ui/src/feedback/loading-patterns.ts`
- Update: key forms/pages to use standardized loading feedback

---

### E.2 Create Conversion Service Blueprints

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** 2.12, 2.13, 2.20

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Map frontstage/backstage dependencies for booking, contact, quote, and search-driven
conversion flows to expose hidden handoff failures.

**Research-backed guidance (2026):**

- Service blueprints reveal operational bottlenecks that pure UI maps miss.
- Cross-functional ownership mapping improves remediation speed.

**Additions for near-perfect execution:**

- Add blueprint notation standard and legend.
- Add failure-mode severity scoring in each blueprint.

**Acceptance Criteria:**

- Service blueprints exist for core conversion paths.
- Failure points include owner, detection, and fallback behavior.
- Blueprints are referenced in incident and optimization reviews.

**Files:**

- Create: `docs/service-blueprints/booking-flow.md`
- Create: `docs/service-blueprints/contact-flow.md`
- Create: `docs/service-blueprints/lead-routing-map.md`

---

### E.3 Add Error-Budget Release Gate

**Priority:** CRITICAL | **Effort:** 4 hours | **Dependencies:** C.14, D.5

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Gate release velocity based on rolling SLO/error-budget burn and define freeze criteria
for non-critical releases.

**Research-backed guidance (2026):**

- Release gating tied to error budgets is a proven mechanism for balancing speed and reliability.
- Freeze policies should include override authority and documented risk acceptance.

**Additions for near-perfect execution:**

- Add burn-rate threshold tiers and action matrix.
- Add release-cadence fallback policy during burn events.

**Acceptance Criteria:**

- Release gate logic is codified and automated.
- Freeze/unfreeze criteria are documented and measurable.
- Override process requires explicit risk approval.

**Files:**

- Create: `docs/reliability/error-budget-release-policy.md`
- Create: `scripts/reliability/check-error-budget.ts`
- Update: CI/CD to enforce release gate conditions

---

### E.4 Build Internal Platform Golden Paths and Adoption Metrics

**Priority:** HIGH | **Effort:** 5 hours | **Dependencies:** 6.8, D.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Turn repo workflows into productized golden paths with measurable developer experience
signals.

**Research-backed guidance (2026):**

- Internal platform adoption increases when golden paths are opinionated and low-friction.
- DevEx metrics should capture lead time, failure rate, and onboarding friction.

**Additions for near-perfect execution:**

- Add journey instrumentation points for key developer workflows.
- Add quarterly golden-path maintenance review.

**Acceptance Criteria:**

- Golden path docs exist for core workflows (new client/new feature).
- DevEx metrics are defined and reviewed on a set cadence.
- Friction points generate actionable backlog items.

**Files:**

- Create: `docs/platform/golden-path-new-client.md`
- Create: `docs/platform/golden-path-new-feature.md`
- Create: `docs/platform/devex-adoption-metrics.md`

---

### E.5 Add PR/FAQ + JTBD Intake for Major Features

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** C.15

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Require customer-outcome framing before implementation for high-impact features.

**Research-backed guidance (2026):**

- Outcome-first framing improves prioritization and reduces solution bias.
- PR/FAQ and JTBD are most effective when tied to explicit decision checkpoints.

**Additions for near-perfect execution:**

- Add template quality rubric for intake artifacts.
- Add review gate requiring outcome metric definition.

**Acceptance Criteria:**

- PR/FAQ and JTBD templates are required for defined feature classes.
- Intake artifacts are linked from planning/PR records.
- Review process validates problem framing before implementation starts.

**Files:**

- Create: `docs/workflow/prfaq-template.md`
- Create: `docs/workflow/jtbd-template.md`
- Update: contribution workflow with intake requirements

---

### E.6 Create Progressive Conversion UX Primitives

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** C.6, 2.10, 3.5

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build reusable interaction primitives for step confidence, progress pacing, and
decision support in high-friction forms.

**Research-backed guidance (2026):**

- Progressive disclosure and confidence cues improve completion rates in complex flows.
- Interaction primitives should support accessibility and low-cognitive-load defaults.

**Additions for near-perfect execution:**

- Add friction taxonomy mapped to primitive recommendations.
- Add instrumentation hooks for step-level abandonment.

**Acceptance Criteria:**

- New primitives are reusable, accessible, and theme-compatible.
- Conversion form flows integrate primitives without bespoke forks.
- UX guidance maps primitives to friction patterns.

**Files:**

- Create: `packages/ui/src/components/ProgressStepper.tsx`
- Create: `packages/ui/src/components/StepConfidenceHint.tsx`
- Create: `docs/ux/progressive-conversion-patterns.md`

---

### E.7 Add Queueing and Async Pipeline Governance

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** E.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define queue/fairness rules and timeout/retry policies for async operations that affect
conversion or user trust.

**Research-backed guidance (2026):**

- Queue governance should prioritize fairness, idempotency, and bounded retries.
- Operational trust depends on predictable timeout/failure behavior.

**Additions for near-perfect execution:**

- Add retry budget policy by operation type.
- Add queue observability spec (depth, age, retry rate, DLQ rate).

**Acceptance Criteria:**

- Retry/timeout/queue fairness policy is documented and enforceable.
- Critical async flows include idempotency and dead-letter handling guidance.
- Operational alerts exist for queue saturation and retry storms.

**Files:**

- Create: `docs/operations/async-queue-governance.md`
- Create: `docs/operations/retry-timeout-policy.md`
- Create: `packages/infra/ops/queue-policy.ts`

---

## Appendix: Round 2 Non-Direct-Domain Innovation Tasks

### F.1 Create High-Reliability Preflight Checklist Program

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 0.13, C.13

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Add HRO-style preflight checklists and near-miss capture for high-risk change classes.

**Research-backed guidance (2026):**

- High-reliability operations improve safety through preflight discipline and near-miss learning loops.
- Checklists should be concise, role-specific, and action-oriented.

**Additions for near-perfect execution:**

- Add near-miss taxonomy and severity labels.
- Add monthly review ritual for checklist improvements.

**Acceptance Criteria:**

- Risk-class checklist is integrated into PR/release workflows.
- Near-miss log has ownership and review cadence.
- Lessons learned feed back into checklist updates.

**Files:**

- Create: `docs/reliability/preflight-checklists.md`
- Create: `docs/reliability/near-miss-log.md`
- Update: PR template with risk-class checklist blocks

---

### F.2 Apply Cynefin-Based Execution Modes to Backlog

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** D.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Classify backlog items by domain (clear, complicated, complex, chaotic) and map each
to execution policy (checklist, expert review, safe-to-fail probes, rapid containment).

**Research-backed guidance (2026):**

- Decision-domain classification helps select the right execution and risk strategy.
- Complex-domain work should emphasize probe-sense-respond iterations.

**Additions for near-perfect execution:**

- Add decision aid flowchart for classification.
- Add retrospective loop for misclassified work items.

**Acceptance Criteria:**

- Backlog classification model is documented and applied consistently.
- Execution mode guidance is used in planning ceremonies.
- Misclassification correction process is defined.

**Files:**

- Create: `docs/strategy/cynefin-execution-model.md`
- Update: TODO conventions with domain tags

---

### F.3 Add Leverage-Point Scoring for Prioritization

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** C.1, C.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Score tasks by expected system leverage to prioritize durable interventions over local
optimizations.

**Research-backed guidance (2026):**

- Leverage scoring improves portfolio quality when criteria are explicit and repeatable.
- Scores should be directional aids, not sole decision drivers.

**Additions for near-perfect execution:**

- Add calibration examples across past tasks.
- Add tie-break policy for equal-leverage candidates.

**Acceptance Criteria:**

- Leverage scoring rubric is explicit and reproducible.
- Prioritization decisions reference leverage score output.
- Scoring script and rubric are versioned together.

**Files:**

- Create: `docs/strategy/leverage-point-scoring.md`
- Create: `scripts/strategy/calculate-leverage-score.ts`

---

### F.4 Add Peak-End Journey Optimization Track

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** E.6, C.12

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Instrument and optimize high-emotion journey peaks and completion endings to improve
long-term memory of brand experience and conversion quality.

**Research-backed guidance (2026):**

- Peak-end effects can strongly influence perceived brand quality and referral likelihood.
- Optimization should remain ethical and transparent.

**Additions for near-perfect execution:**

- Add journey-moment taxonomy for peak/end candidates.
- Add guardrail metrics for trust and satisfaction alongside conversion.

**Acceptance Criteria:**

- Peak/end events are instrumented in analytics taxonomy.
- UX guidelines define pattern library for completion moments.
- Experiments include safeguards for ethical persuasion boundaries.

**Files:**

- Create: `docs/ux/peak-end-journey-guidelines.md`
- Create: `docs/analytics/peak-end-events.md`
- Update: templates with explicit completion-end patterns

---

### F.5 Create Framing Experiment Library

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** C.8, D.2

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Build reusable, policy-safe framing variants for offers, CTAs, and value propositions.

**Research-backed guidance (2026):**

- Framing experiments should be ethically bounded and context-appropriate.
- Reusable variant libraries reduce ad-hoc copy risk and speed experimentation.

**Additions for near-perfect execution:**

- Add forbidden framing patterns list.
- Add variant metadata tags (`risk`, `intent`, `audience`).

**Acceptance Criteria:**

- Framing variants are categorized by scenario and risk level.
- Ethical constraints doc is referenced by experiment workflow.
- Variant library integrates with experimentation platform contracts.

**Files:**

- Create: `packages/marketing-components/src/experiments/framing/`
- Create: `docs/marketing/framing-pattern-library.md`
- Create: `docs/marketing/ethical-framing-constraints.md`

---

### F.6 Add Participatory Personalization Patterns (IKEA Effect)

**Priority:** MEDIUM | **Effort:** 4 hours | **Dependencies:** C.9

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Introduce low-friction co-creation moments that increase perceived ownership of the
user’s chosen service/content path.

**Research-backed guidance (2026):**

- Participatory design moments can raise engagement when optional and low-effort.
- Co-creation patterns should avoid dark-pattern pressure.

**Additions for near-perfect execution:**

- Add opt-out and skip controls by default.
- Add impact measurement plan for engagement vs friction tradeoff.

**Acceptance Criteria:**

- Co-creation patterns include accessibility and abandonment safeguards.
- Personalization integration respects privacy/consent rules.
- Impact metrics are defined before rollout.

**Files:**

- Create: `packages/features/src/personalization/co-creation-patterns.ts`
- Create: `docs/ux/participatory-personalization.md`

---

### F.7 Create Wayfinding and Information Hierarchy Standards

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** 3.2, 3.3, 3.5

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Apply urban wayfinding principles to route architecture and navigation semantics.

**Research-backed guidance (2026):**

- Wayfinding quality depends on consistent labels, landmarks, and progressive disclosure.
- Navigation semantics should support both discoverability and task completion speed.

**Additions for near-perfect execution:**

- Add route-labeling style guide.
- Add breadcrumb depth and naming conventions.

**Acceptance Criteria:**

- Wayfinding standards define hierarchy, labels, and breadcrumb rules.
- Templates apply standards consistently across key routes.
- Navigation usability checks are included in release validation.

**Files:**

- Create: `docs/ux/wayfinding-standards.md`
- Update: navigation and breadcrumb conventions in page templates

---

### F.8 Add Statistical Process Control for Delivery Quality

**Priority:** MEDIUM | **Effort:** 5 hours | **Dependencies:** C.14

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Track delivery/process stability (build variance, flake rate, regression escapes) with
control-chart style monitoring and alerting.

**Research-backed guidance (2026):**

- Process control metrics are useful when thresholds distinguish signal from normal variance.
- Stability programs should focus on actionable anomalies, not dashboard volume.

**Additions for near-perfect execution:**

- Add baseline period definition for control limits.
- Add owner playbooks for out-of-control events.

**Acceptance Criteria:**

- SPC metrics and thresholds are defined and monitored.
- Alerts route to owners with remediation playbooks.
- Trend reviews drive continuous process improvements.

**Files:**

- Create: `docs/operations/spc-delivery-metrics.md`
- Create: `scripts/operations/spc-control-charts.ts`
- Create: `docs/operations/process-control-thresholds.md`

---

### F.9 Add Mission-Command Governance for Parallel Execution

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** D.7, C.16

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Use centralized intent + decentralized execution model for multi-agent and multi-team
delivery with explicit guardrails and escalation triggers.

**Research-backed guidance (2026):**

- Mission-command models work when intent is explicit and boundaries are clear.
- Escalation triggers should be objective and low-latency.

**Additions for near-perfect execution:**

- Add intent template for multi-team initiatives.
- Add coordination cadence and conflict resolution protocol.

**Acceptance Criteria:**

- Mission-command model defines intent artifacts and decision boundaries.
- Escalation triggers are measurable and actionable.
- Governance docs align with ownership matrix and workflows.

**Files:**

- Create: `docs/governance/mission-command-model.md`
- Create: `docs/governance/decision-escalation-triggers.md`

---

### F.10 Add Portfolio Kanban WIP Policy for Refactor Program

**Priority:** HIGH | **Effort:** 3 hours | **Dependencies:** C.1, D.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Prevent initiative overload by applying WIP limits and classes of service across
refactor lanes.

**Research-backed guidance (2026):**

- Portfolio flow improves with explicit WIP discipline and service classes.
- Limits should be tuned using cycle-time and throughput data.

**Additions for near-perfect execution:**

- Add emergency-expedite lane policy.
- Add monthly WIP tuning review based on observed flow metrics.

**Acceptance Criteria:**

- WIP policy defines lane-level limits and exception handling.
- Portfolio board reflects classes of service visibly.
- Throughput and cycle-time impact is tracked after rollout.

**Files:**

- Create: `docs/strategy/portfolio-kanban-policy.md`
- Create: `docs/strategy/wip-limits-by-lane.md`

---

### F.11 Add Knowledge-Conversion System (Tacit to Explicit)

**Priority:** MEDIUM | **Effort:** 3 hours | **Dependencies:** 6.4, 6.6, 6.7

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Systematize how implementation knowledge becomes reusable artifacts (patterns,
playbooks, ADRs, checklists).

**Research-backed guidance (2026):**

- Knowledge conversion programs require routine capture and explicit ownership.
- Reuse quality improves when captured artifacts follow standardized templates.

**Additions for near-perfect execution:**

- Add “knowledge debt” backlog for missing docs/patterns.
- Add periodic archival/cleanup policy for stale artifacts.

**Acceptance Criteria:**

- Knowledge capture template is used in post-delivery reviews.
- Key learnings are linked to affected docs/workflows.
- Governance assigns ownership for knowledge-base freshness.

**Files:**

- Create: `docs/knowledge/seci-inspired-knowledge-flow.md`
- Create: `docs/knowledge/pattern-capture-template.md`

---

### F.12 Add Service Recovery and Failure-Response UX Standard

**Priority:** HIGH | **Effort:** 4 hours | **Dependencies:** E.1, F.1

**Status:** [ ] TODO | **Assigned To:** [ ] | **Completed:** [ ]

**What:** Define how UX and messaging should recover trust after failed interactions,
including transparent explanation, remediation, and next-best action.

**Research-backed guidance (2026):**

- Service-recovery UX should prioritize clarity, accountability, and immediate next steps.
- Recovery patterns should be tested in realistic failure scenarios.

**Additions for near-perfect execution:**

- Add message templates by failure severity.
- Add recovery pattern A/B test plan for trust outcomes.

**Acceptance Criteria:**

- Recovery-state patterns are implemented for critical failure classes.
- Messaging guidelines include clarity, accountability, and next-step actions.
- Recovery metrics are tracked and reviewed for improvement.

**Files:**

- Create: `docs/ux/service-recovery-patterns.md`
- Create: `packages/ui/src/feedback/recovery-states.ts`
- Create: `docs/analytics/recovery-experience-metrics.md`

---

## Appendix G: Second-Pass Codebase Audit — Verified Findings and New Discoveries

> This section documents findings from a **line-by-line, file-by-file second pass** through every
> source file in the repository. Each finding is verified with file paths, line numbers, and
> cross-file impact analysis. Findings are classified by whether they are **already covered** in
> existing TODO tasks or require **new tasks**.

### G.1 Verified Critical Bugs (Mapped to Existing Tasks)

#### BUG-1: Broken Infra Export Path — VERIFIED

**Status:** Already covered by Task 0.10

**Evidence:**

- `packages/infra/package.json:18` — `"./security/create-middleware": "./security/create-middleware.ts"`
- Actual file location: `packages/infra/middleware/create-middleware.ts`
- `packages/infra/index.ts:46` — Barrel export correctly uses `'./middleware/create-middleware'`
- `grep` for `@repo/infra/security/create-middleware`: **0 results** — no consumer uses the broken subpath

**Elaborated fix for Task 0.10:**

```json
// Change line 18 of packages/infra/package.json FROM:
"./security/create-middleware": "./security/create-middleware.ts"
// TO:
"./middleware/create-middleware": "./middleware/create-middleware.ts"
```

**Additional action:** Add automated export-map validation script (see G.7 below).

---

#### BUG-2: Runtime Deps in devDependencies — VERIFIED

**Status:** Already covered by Task 0.9

**Evidence (runtime imports confirmed):**

- `packages/infra/security/rate-limit.ts:253-254` — `await import('@upstash/ratelimit')` and `await import('@upstash/redis')`
- `packages/infra/env/schemas/*.ts` (all 7 files) — `import { z } from 'zod'` at top of each
- `packages/infra/env/validate.ts:37-51` — imports from all schema files which use `zod`

**Elaborated fix for Task 0.9:**

```json
// In packages/infra/package.json, move FROM devDependencies TO dependencies:
"zod": "^3.23.0"
// Move TO peerDependencies (optional runtime deps):
"@upstash/ratelimit": "^2.0.0",
"@upstash/redis": "^1.34.0"
```

**Rationale:** `zod` is unconditionally imported at module load time (hard dependency).
`@upstash/*` are dynamically imported with try/catch fallback (soft dependency = peerDependencies).

---

#### BUG-3: Dockerfile References Disabled Standalone Output — VERIFIED

**Status:** Requires new sub-task under Task 0.4 (Docker fix)

**Evidence:**

- `templates/hair-salon/next.config.js:5` — `// output: 'standalone',` (commented out)
- `templates/hair-salon/Dockerfile:38` — `COPY --from=builder /app/templates/hair-salon/.next/standalone ./`

**Impact:** Docker builds will fail with `COPY failed: file not found` error.

**Fix options:**

1. Re-enable `output: 'standalone'` in `next.config.js` (preferred for Docker deploys)
2. Rewrite Dockerfile to not depend on standalone output

---

#### BUG-4: Theme Config Not Wired to CSS — VERIFIED

**Status:** Already addressed conceptually in Task C.5 (Design Token Architecture)

**Evidence:**

- `templates/hair-salon/site.config.ts:103-121` — HSL strings like `'174 85% 33%'`
- `templates/hair-salon/app/globals.css:11` — Hex values like `#0ea5a4`
- `packages/config/tailwind-preset.js:4-27` — References `var(--primary)` etc. from CSS
- **No code** anywhere reads `siteConfig.theme` and generates CSS custom properties

**Impact:** The entire config-driven theming story is broken. Changing `site.config.ts` theme values has zero visual effect.

**Elaborated fix (inject into Task C.5 or create new 0.14):**
Create a `ThemeInjector` server component in `@repo/ui` or `@repo/marketing-components`:

```typescript
// packages/ui/src/components/ThemeInjector.tsx
export function ThemeInjector({ theme }: { theme: ThemeColors }) {
  const css = Object.entries(theme)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n    ');
  return <style dangerouslySetInnerHTML={{ __html: `:root {\n    ${css}\n  }` }} />;
}
```

Then use in `app/layout.tsx`: `<ThemeInjector theme={siteConfig.theme} />`
This makes `globals.css` the fallback and `site.config.ts` the override.

---

#### BUG-5: Sentry DSN Env Var Name Mismatch — VERIFIED

**Status:** Needs new task (0.15) or fold into 0.9

**Evidence:**

- `packages/infra/logger/index.ts:209` — `process.env.NEXT_PUBLIC_SENTRY_DSN`
- `packages/infra/sentry/client.ts:19` — `process.env.NEXT_PUBLIC_SENTRY_DSN`
- `packages/infra/sentry/server.ts:18` — `process.env.NEXT_PUBLIC_SENTRY_DSN`
- `templates/hair-salon/sentry.client.config.ts:12` — `dsn: process.env.NEXT_PUBLIC_SENTRY_DSN`
- `templates/hair-salon/sentry.server.config.ts:12` — `dsn: process.env.NEXT_PUBLIC_SENTRY_DSN`
- `.env.example:28-29` — Documents `SENTRY_DSN` (without `NEXT_PUBLIC_` prefix)
- `packages/infra/env/schemas/sentry.ts` — Validates `SENTRY_DSN`

**Resolution:** All runtime code already uses `NEXT_PUBLIC_SENTRY_DSN`. The schema and `.env.example`
need to be updated to match. The schema should validate `NEXT_PUBLIC_SENTRY_DSN`.

---

### G.2 New Discoveries from Second Pass

#### NEW-1: `not-found.tsx` Uses Hardcoded Colors Instead of Design Tokens

**File:** `templates/hair-salon/app/not-found.tsx:9-62`
**Issue:** Uses hardcoded Tailwind color classes (`blue-600`, `purple-600`, `pink-600`, `gray-900`)
instead of design token classes (`primary`, `secondary`, `foreground`). This means the 404 page
won't match the site's theme.
**Fix:** Replace hardcoded colors with semantic token classes.

---

#### NEW-2: `loading.tsx` Uses Hardcoded Colors

**File:** `templates/hair-salon/app/loading.tsx:10`
**Issue:** Spinner uses `border-t-blue-600` instead of `border-t-primary`.
**Fix:** Replace with `border-t-primary`.

---

#### NEW-3: OG Image Route Has Hardcoded Hair Salon Content

**File:** `templates/hair-salon/app/api/og/route.tsx:95-116`
**Issue:** The OG image generation includes:

- Line 95: Hardcoded scissors emoji `✂️`
- Line 100: Hardcoded text `'Professional Hair Care'`
- Line 111-115: Hardcoded service labels `'Haircuts'`, `'Color Services'`, `'Treatments'`
- Line 77: Hardcoded gradient colors `#0F1115` and `#0EA5A4`

**Impact:** These values must come from `siteConfig` for multi-industry support.
**Fix:** Read from `siteConfig.seo`, `siteConfig.theme`, and `siteConfig.conversionFlow.serviceCategories`.

---

#### NEW-4: Navigation Imports `cn` from Local `utils.ts` Instead of `@repo/utils`

**File:** `templates/hair-salon/components/Navigation.tsx:33`

```typescript
import { cn } from '@/lib/utils';
```

**Impact:** Uses the duplicate `cn()` function instead of the canonical `@repo/utils` version.
**Fix:** Change to `import { cn } from '@repo/utils';` (also applies to all other template files using `@/lib/utils`).

**Affected files (grep for `@/lib/utils`):**

- `components/Navigation.tsx`
- Any other template component importing from `@/lib/utils`

---

#### NEW-5: `supabaseClient` Singleton Created at Module Level

**File:** `packages/integrations/supabase/client.ts:200`

```typescript
export const supabaseClient = createSupabaseClient();
```

**Issue:** This executes `createSupabaseClient()` at module load time, which throws if `SUPABASE_URL`
or `SUPABASE_SERVICE_ROLE_KEY` are not set. Any file that imports from this module will crash
immediately in environments without Supabase configured (e.g., development without Supabase).
**Fix:** Make it lazy: `export const getSupabaseClient = () => createSupabaseClient();` or use a
lazy singleton pattern.

---

#### NEW-6: Duplicate `SupabaseClientConfig` Interface

**Files:**

- `packages/integrations/supabase/client.ts:34-38`
- `packages/integrations/supabase/types.ts:71-80`

**Issue:** Same interface defined in two places.
**Fix:** Remove from `client.ts`, import from `types.ts`.

---

#### NEW-7: `SupabaseApiResponse` Uses `any` Type

**File:** `packages/integrations/supabase/types.ts:140,150`

```typescript
export interface SupabaseApiResponse<T = any> {
  error?: { details?: any };
}
```

**Fix:** Replace `any` with `unknown`.

---

#### NEW-8: Footer TikTok Icon Fallback Is Instagram

**File:** `templates/hair-salon/components/Footer.tsx:38`

```typescript
tiktok: Instagram, // fallback icon
```

**Issue:** Using Instagram icon for TikTok is misleading. Lucide React doesn't have a TikTok icon,
but a generic social icon or custom SVG would be better.
**Fix:** Use a custom TikTok SVG icon or the `Music2` icon from Lucide as a closer approximation.

---

#### NEW-9: Social Links Missing `target="_blank"` and `rel="noopener"`

**File:** `templates/hair-salon/components/Footer.tsx:62-69`
**Issue:** Social media links use `<a>` tags without `target="_blank"` or `rel="noopener noreferrer"`.
The metaheader invariant says "Social links must open in new tabs for accessibility" but the
implementation doesn't enforce this.
**Fix:** Add `target="_blank"` and `rel="noopener noreferrer"` to social links.

---

#### NEW-10: `sitemap.ts` and `search.ts` Have Duplicated Static Page Lists

**Files:**

- `templates/hair-salon/app/sitemap.ts:12-108` — 16 static pages
- `templates/hair-salon/lib/search.ts:38-119` — 10 static pages

**Issue:** Two separate hardcoded lists of site pages. When a route is added or removed, both files
must be updated independently. The sitemap has routes not in search (e.g., `/privacy`, `/terms`).
**Fix:** Create a single `routes.ts` registry that both `sitemap.ts` and `search.ts` consume.
This also becomes the foundation for the config-driven route system in the refactor.

---

#### NEW-11: `error.tsx` Directly Imports `@sentry/nextjs` Instead of `@repo/infra`

**File:** `templates/hair-salon/app/error.tsx:11`

```typescript
import * as Sentry from '@sentry/nextjs';
```

**Issue:** Bypasses the `@repo/infra` abstraction layer, creating a direct dependency on Sentry.
The `ErrorBoundary.tsx` component correctly uses `@repo/infra/client` instead.
**Fix:** Use `import { logError } from '@repo/infra/client';` and call it instead of `Sentry.captureException`.

---

#### NEW-12: `global-error.tsx` Doesn't Report to Sentry

**File:** `templates/hair-salon/app/global-error.tsx:13`
**Issue:** The error parameter is received but immediately suppressed with eslint-disable.
No error reporting occurs. This is the last-resort error boundary.
**Fix:** At minimum, attempt to report via `@repo/infra/client` logError.

---

#### NEW-13: `Providers.tsx` Wraps Everything in Breadcrumbs

**File:** `templates/hair-salon/app/providers.tsx:15`
**Issue:** `Breadcrumbs` component renders on every page inside the providers wrapper. This means
breadcrumbs appear even on pages where they may not make sense (homepage, 404).
**Fix:** Make breadcrumbs conditional based on route depth, or move to individual page layouts.

---

### G.3 Cross-File Consistency Issues

#### XFILE-1: Three Different Port Numbers Referenced

- `templates/hair-salon/package.json:8-9` — port `3100`
- `templates/hair-salon/site.config.ts:32` — fallback `http://localhost:3000`
- `templates/hair-salon/lib/constants.ts:101` — `DEFAULT_DEV_URL: 'http://localhost:3000'`
- `templates/hair-salon/Dockerfile:44` — `EXPOSE 3100`

**Impact:** The dev server runs on port 3100 but env defaults reference port 3000.
**Fix:** Align all to one port (3100 since that's what `next dev` uses).

---

#### XFILE-2: `@repo/infra` Barrel Export Causes Large Bundle for Client Code

**Files:** Multiple template files import from `@repo/infra` (barrel) instead of specific subpaths.
For example, `booking-actions.ts:30` imports `checkRateLimit` from `@repo/infra` which re-exports
the entire security, middleware, logging, and sentry modules.

**Impact:** Tree-shaking may not eliminate unused modules effectively, especially for edge runtime
code like `app/api/og/route.tsx` which only needs `escapeHtml`.

**Fix:** Prefer subpath imports (`@repo/infra/security/sanitize`) over barrel imports (`@repo/infra`)
for production code paths. Add lint rule to enforce.

---

### G.4 Research-Driven Strategic Enhancements

#### RESEARCH-1: Add `knip` for Automated Dead Code/Dependency Detection

**Tool:** [knip](https://knip.dev/) — finds unused files, exports, and dependencies in monorepos.

**Value:** Would have automatically detected:

- Duplicate `cn()` utility
- Unused legacy wrappers in infra modules
- Broken export paths
- Stale dependencies

**Task:** Add `knip` to CI and run as part of `pnpm lint`.

**Files:**

- Create: `knip.config.ts`
- Update: root `package.json` scripts — add `"knip": "knip"`
- Update: `.github/workflows/ci.yml` — add knip check

---

#### RESEARCH-2: Add `syncpack` for Dependency Version Consistency

**Tool:** [syncpack](https://jamiemason.github.io/syncpack/) — ensures consistent dependency
versions across all workspace packages.

**Value:** Would catch:

- zod version mismatch (3.22.4 vs ^3.23.0)
- React/React-DOM not using catalog
- Sentry version not using catalog

**Task:** Add `syncpack` to CI.

**Files:**

- Create: `.syncpackrc.json`
- Update: root `package.json` scripts — add `"syncpack:check": "syncpack list-mismatches"`
- Update: CI to fail on version mismatches

---

#### RESEARCH-3: Adopt `class-variance-authority` (CVA) for Type-Safe Variants

**Tool:** [cva](https://cva.style/) — type-safe component variant definitions for Tailwind.

**Value:** Replaces the current `Record<string, string>` variant pattern with:

- Compile-time variant validation
- Autocomplete for variant values
- Composable variant definitions
- No runtime overhead

**Pattern:**

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('rounded-md font-semibold transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    },
    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'medium' },
});

type ButtonProps = VariantProps<typeof buttonVariants>;
```

**Task:** Adopt CVA when building new UI components (Task 1.1-1.6) and refactor existing
8 components to use CVA pattern during extraction.

---

#### RESEARCH-4: Add Export Map Validation Script

**Purpose:** Prevent BUG-1 from recurring. Validate that every entry in every `package.json`
`exports` field resolves to an actual file on disk.

**Implementation:**

```typescript
// scripts/validate-exports.ts
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { glob } from 'glob';

const packages = glob.sync('packages/*/package.json');
let errors = 0;
for (const pkg of packages) {
  const json = JSON.parse(readFileSync(pkg, 'utf-8'));
  const dir = dirname(pkg);
  for (const [key, value] of Object.entries(json.exports || {})) {
    const resolved = join(dir, value as string);
    if (!existsSync(resolved)) {
      console.error(`BROKEN EXPORT: ${json.name} "${key}" -> "${value}" (file not found)`);
      errors++;
    }
  }
}
process.exit(errors > 0 ? 1 : 0);
```

**Files:**

- Create: `scripts/validate-exports.ts`
- Update: CI to run this script

---

### G.5 Out-of-the-Box Innovation Ideas

#### INNOVATION-1: Composable Page Assembly via Config DSL

Instead of the current switch-statement approach for page templates, introduce a **declarative
section registry** pattern inspired by Storyblok's block system:

```typescript
// packages/page-templates/src/registry.ts
const sectionRegistry = new Map<string, React.ComponentType<any>>([
  ['hero:centered', HeroCentered],
  ['hero:split', HeroSplit],
  ['services:grid', ServiceGrid],
  ['testimonials:carousel', TestimonialCarousel],
  ['cta:banner', CTABanner],
  // ... extensible by clients
]);

// site.config.ts
const siteConfig = {
  pages: {
    home: {
      sections: [
        { type: 'hero:split', props: { ... } },
        { type: 'services:grid', props: { ... } },
        { type: 'testimonials:carousel', props: { ... } },
        { type: 'cta:banner', props: { ... } },
      ]
    }
  }
};
```

This makes page composition **fully data-driven** with zero code changes per client.

---

#### INNOVATION-2: Self-Validating Configuration Pattern

Combine `site.config.ts` with a Zod runtime validator and a build-time check:

```typescript
// packages/types/src/site-config.schema.ts
import { z } from 'zod';
export const siteConfigSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  industry: z.enum(['salon', 'restaurant', 'law-firm', ...]),
  // ... full schema
});

// build-time validation in next.config.js
const { siteConfigSchema } = require('@repo/types/site-config.schema');
const siteConfig = require('./site.config');
siteConfigSchema.parse(siteConfig); // Throws at build time if invalid
```

---

#### INNOVATION-3: Monorepo Health Dashboard Script

Create a single `pnpm health` command that runs all validation checks:

```bash
pnpm health
# Output:
# ✅ Export maps valid (14/14 paths resolve)
# ✅ Dependency versions consistent (syncpack: 0 mismatches)
# ✅ No circular dependencies detected
# ✅ No unused exports (knip: clean)
# ✅ Workspace globs synced (package.json ↔ pnpm-workspace.yaml)
# ✅ Runtime deps not in devDependencies
# ⚠️  2 deprecated legacy wrappers remain (infra/security)
# ❌ Theme config not wired to CSS (BUG-4 open)
```

**Files:**

- Create: `scripts/health-check.ts`
- Update: root `package.json` — add `"health": "tsx scripts/health-check.ts"`

---

#### INNOVATION-4: Atomic Refactor Protocol

Instead of extracting features one at a time with manual parity checks, use an **atomic
extraction protocol** that automates the entire move-verify-cleanup cycle:

```bash
pnpm extract-feature booking \
  --source=templates/hair-salon/features/booking \
  --target=packages/features/src/booking \
  --parity-test=true \
  --update-imports=true
```

The script would:

1. Copy files to target location
2. Update all import paths in the moved files
3. Create re-export stubs at the source location (backward compat)
4. Generate parity test skeleton
5. Run type-check + build to verify
6. Report what manual changes remain

---

### G.6 Scriptable Wave 0 Execution Plan

The following commands can be batched into a single `scripts/wave0.ts` orchestration script:

```typescript
// scripts/wave0.ts — Idempotent Wave 0 execution
// Run: pnpm tsx scripts/wave0.ts

const steps = [
  // 0.1 — Fix .npmrc conflict
  { name: '0.1', action: () => removeLineFromFile('.npmrc', 'node-linker') },

  // 0.2 — Sync workspace globs
  { name: '0.2', action: () => syncWorkspaceGlobs() },

  // 0.9 — Fix infra dependency placement
  {
    name: '0.9',
    action: () =>
      moveDepToCorrectSection('packages/infra/package.json', {
        from: 'devDependencies',
        to: 'dependencies',
        packages: ['zod'],
      }),
  },
  {
    name: '0.9b',
    action: () =>
      moveDepToCorrectSection('packages/infra/package.json', {
        from: 'devDependencies',
        to: 'peerDependencies',
        packages: ['@upstash/ratelimit', '@upstash/redis'],
      }),
  },

  // 0.10 — Fix broken export path
  {
    name: '0.10',
    action: () =>
      fixExportPath(
        'packages/infra/package.json',
        './security/create-middleware',
        './middleware/create-middleware'
      ),
  },

  // Validate
  { name: 'validate', action: () => execSync('pnpm install && pnpm turbo build') },
];
```

### G.7 Updated Wave Plan with New Tasks

#### New tasks to inject into Wave 0:

| ID   | Task                                                   | Priority | Effort | Source     |
| ---- | ------------------------------------------------------ | -------- | ------ | ---------- |
| 0.14 | Wire theme config to CSS generation                    | CRITICAL | 2h     | BUG-4      |
| 0.15 | Align Sentry DSN env var naming                        | HIGH     | 30m    | BUG-5      |
| 0.16 | Fix Dockerfile standalone output                       | HIGH     | 30m    | BUG-3      |
| 0.17 | Add `knip` for dead code detection                     | HIGH     | 1h     | RESEARCH-1 |
| 0.18 | Add `syncpack` for version consistency                 | HIGH     | 1h     | RESEARCH-2 |
| 0.19 | Add export map validation script                       | HIGH     | 1h     | RESEARCH-4 |
| 0.20 | Fix port number inconsistency                          | MEDIUM   | 15m    | XFILE-1    |
| 0.21 | Replace local `cn` imports with `@repo/utils`          | MEDIUM   | 30m    | NEW-4      |
| 0.22 | Fix `not-found.tsx` and `loading.tsx` hardcoded colors | MEDIUM   | 30m    | NEW-1/2    |
| 0.23 | Fix social links missing target/rel attrs              | MEDIUM   | 15m    | NEW-9      |
| 0.24 | Fix Supabase client eager initialization               | MEDIUM   | 30m    | NEW-5      |
| 0.25 | Create unified route registry                          | HIGH     | 1h     | NEW-10     |
| 0.26 | Fix `error.tsx` and `global-error.tsx` Sentry usage    | MEDIUM   | 30m    | NEW-11/12  |

#### Updated Wave 0 execution order:

**Batch A (parallel, config fixes — 30 min):**
0.1, 0.2, 0.9, 0.10, 0.15, 0.16, 0.20

**Batch B (parallel, code fixes — 1 hr):**
0.21, 0.22, 0.23, 0.24, 0.25, 0.26

**Batch C (parallel, tooling additions — 2 hr):**
0.14, 0.17, 0.18, 0.19

**Batch D (sequential, validation — 30 min):**
0.3, 0.11, 0.13

**Exit gate:** `pnpm install && pnpm turbo lint type-check build test` all green.

---

### G.8 The Unique Approach: Configuration-as-Code Architecture (CaCA)

> **Vision:** Every aspect of a client website — from theming to page composition to feature
> selection to SEO schema — is driven by a single, validated `site.config.ts` file. No code
> changes required to launch a new client. The config IS the product.

**The CaCA Manifesto:**

1. **One file to rule them all.** A new client is born by creating a single `site.config.ts`.
   Everything else — routes, pages, sections, themes, integrations, SEO — derives from it.

2. **Zero-code client launches.** The starter template contains zero business logic. It's a
   pure composition shell that reads config and assembles pre-built pieces.

3. **Self-validating at every layer.** Zod validates the config at build time. TypeScript
   validates it at compile time. CI validates it at merge time. Runtime validates it at
   request time.

4. **Progressive complexity.** A minimal config with just `id`, `name`, and `industry` launches
   a fully functional site with industry defaults. Every additional field is an opt-in override.

5. **Composable, not configurable.** Instead of 50 boolean flags, clients compose their pages
   from a registry of typed section blocks. The config describes WHAT to render, not HOW.

**Implementation architecture:**

```
site.config.ts (client intent)
      │
      ▼
┌─────────────┐   ┌──────────────┐   ┌─────────────┐
│ Theme Engine │   │ Route Engine  │   │ SEO Engine   │
│ (CSS vars)   │   │ (page assembly)│  │ (schema.org) │
└──────┬──────┘   └──────┬───────┘   └──────┬──────┘
       │                  │                   │
       ▼                  ▼                   ▼
┌─────────────────────────────────────────────────┐
│              Next.js App Router                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Layout  │ │ Pages   │ │ API     │           │
│  │ (themed)│ │(composed)│ │(health) │           │
│  └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────┘
```

**This is the game-changer.** Most marketing website platforms give you a CMS and a page builder.
We give you a **typed, validated, version-controlled configuration system** that generates
production-grade websites with:

- Perfect Lighthouse scores (because the components are pre-optimized)
- Perfect SEO (because schemas are auto-generated from industry type)
- Perfect security (because CSP/headers are baked into the infra layer)
- Perfect accessibility (because UI primitives are Radix-based)
- Perfect type safety (because everything flows from typed config)

**No drag-and-drop. No WYSIWYG. Just config.**

And when clients DO need customization beyond config, they get the full power of React Server
Components, because the underlying platform is just Next.js. Config is the fast path.
Code is the escape hatch.

---

## Appendix H: Third-Pass Research & Strategic Refinement

> Deep internal repo analysis + external research conducted February 14, 2026.
> Covers: new internal discoveries, tooling research, dependency analysis,
> execution strategy refinements, and risk mitigation.

### H.1 New Internal Discoveries (Third Pass)

#### INT-1: Booking Providers — Massive Code Duplication

**File:** `templates/hair-salon/features/booking/lib/booking-providers.ts`

Four provider classes (Mindbody, Vagaro, Square, Calendly placeholder) each duplicate:

- `getServiceId()` — identical switch logic with different IDs (lines 126-135, 214-222, 297-305)
- `formatDateTime()` — identical date formatting (lines 137-148, 225-231, 308-318)
- Constructor pattern, config checking, error handling

**Impact:** ~300 lines of duplicated code. Adding a new provider requires copying an entire class.

**Fix:** Extract a `BaseBookingProvider` abstract class or use a strategy pattern:

```typescript
interface BookingProviderAdapter {
  readonly name: string;
  readonly apiBase: string;
  mapServiceId(serviceType: string): string;
  mapTimeSlot(slot: string): string;
  buildRequestBody(data: BookingFormData): Record<string, unknown>;
  parseResponse(json: unknown): BookingProviderResponse;
}
```

Then a single `createBooking(adapter, config, data)` function handles the HTTP lifecycle.

**Priority:** MEDIUM — address during feature extraction (Task 2.12).

---

#### INT-2: Deprecated Eager Export Contradicts Lazy Pattern

**File:** `templates/hair-salon/features/booking/lib/booking-providers.ts:433`

```typescript
export const bookingProviders = getBookingProviders();
```

This executes at module load time despite being marked `@deprecated` in favor of the
lazy `getBookingProviders()` on line 422. Any file importing `bookingProviders` triggers
eager env validation.

**Fix:** Remove line 433 entirely. Grep for `bookingProviders` imports and migrate to
`getBookingProviders()`.

---

#### INT-3: Hardcoded Service/Time Constants Duplicate site.config.ts

**Files:**

- `features/booking/lib/booking-schema.ts:36-47` — `SERVICE_TYPES` and `TIME_SLOTS`
- `site.config.ts:125-136` — `conversionFlow.serviceCategories` and `conversionFlow.timeSlots`

Two sources of truth for the same data. The schema constants don't read from config.

**Fix:** During config system enhancement (Task 1.8), derive booking schema enums from
`siteConfig.conversionFlow` so adding a service category only requires a config change.

---

#### INT-4: Broken Tailwind Class in SearchDialog

**File:** `templates/hair-salon/features/search/components/SearchDialog.tsx:141`

```typescript
className = '... hover:bg-primary/90-50';
```

`hover:bg-primary/90-50` is not a valid Tailwind class. Likely intended to be
`hover:bg-primary/5` or `hover:bg-primary/50`.

**Fix:** Change to `hover:bg-primary/5` (subtle hover) or `hover:bg-primary/50`.

**Priority:** HIGH — this is a visible UI bug.

---

#### INT-5: Jest Config Maps @repo/shared to Soon-to-Move Location

**File:** `jest.config.js:93`

```javascript
'^@repo/shared/(.*)$': '<rootDir>/templates/shared/$1',
```

Task 0.8 plans to move `@repo/shared` to `packages/types/`. This mapping will break
after the move unless updated simultaneously.

**Fix:** Update in same PR as Task 0.8. Add to 0.8 acceptance criteria.

---

#### INT-6: `renovate.json` Uses JSONC but Has .json Extension

**File:** `renovate.json:1-42` — Contains `/** ... */` JSDoc-style comments.

Strict JSON parsers will reject this file. Renovate itself handles JSONC, but other
tools or linters may fail.

**Fix:** Rename to `renovate.json5` or `.renovaterc` (native JSONC support), or strip
comments and use standard JSON.

---

#### INT-7: turbo.json Missing globalEnv Configuration

**File:** `turbo.json` — No `globalEnv` or `globalPassThroughEnv` defined.

**Impact:** Environment variables like `NODE_ENV`, `NEXT_PUBLIC_SITE_URL`, and Sentry DSN
could produce incorrect cache hits/misses. Turborepo may cache a build with one env and
serve it when env changes.

**Fix:** Add to `turbo.json`:

```json
{
  "globalEnv": [
    "NODE_ENV",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SENTRY_DSN",
    "NEXT_PUBLIC_GA_MEASUREMENT_ID"
  ],
  "globalPassThroughEnv": ["SENTRY_AUTH_TOKEN", "VERCEL_URL"]
}
```

**Priority:** HIGH — silent correctness bug.

---

#### INT-8: Node.js Engine Requirement Is Extremely Aggressive

**File:** `package.json:7` — `"node": ">=24.0.0"`

Node.js 24 entered Current release April 2025 and becomes LTS October 2025.
This blocks contributors on any LTS version (20, 22).

**Fix:** Change to `"node": ">=20.0.0"` (oldest active LTS) or `">=22.0.0"` (latest LTS).

---

#### INT-9: Template Dependencies Not Using pnpm Catalog Protocol

**File:** `templates/hair-salon/package.json`

Multiple dependencies that exist in `pnpm-workspace.yaml` catalog are specified with
hardcoded versions instead of `catalog:`:

- `react: "19.0.0"` → should be `catalog:`
- `react-dom: "19.0.0"` → should be `catalog:`
- `zod: "3.22.4"` → should be `catalog:` (catalog has `^3.22.0`)
- `@sentry/nextjs: "10.38.0"` → should be `catalog:`
- `typescript: "5.7.2"` → should be `catalog:`

**Impact:** Version drift. Template has `zod: 3.22.4` while `@repo/infra` has `zod: ^3.23.0`.

**Fix:** Run the official pnpm catalog codemod: `pnpx codemod pnpm/catalog`
Then manually verify all workspace packages use `catalog:` for shared deps.

**Priority:** HIGH — this is the root cause of version inconsistency.

---

#### INT-10: docker-compose.yml References Non-Existent .env File

**File:** `docker-compose.yml:17` — `env_file: - .env.production.local`

No `.env.production.local` exists in the repo (nor should it — it contains secrets).
But there's no `.env.production.local.example` or documentation for what vars are required.

**Fix:** Create `.env.production.local.example` with all required vars documented.
Add to CONTRIBUTING.md Docker section.

---

### H.2 External Research — Tooling Recommendations

#### TOOL-1: Turborepo Generators for Client Scaffolding

**Research:** Turborepo has built-in `turbo gen` that supports custom Plop-based generators.
This is the perfect mechanism for the "client factory" vision from CaCA (G.8).

**Implementation:**

```
turbo/generators/config.ts
```

```typescript
import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('new-client', {
    description: 'Scaffold a new client website from starter template',
    prompts: [
      { type: 'input', name: 'clientName', message: 'Client name (kebab-case):' },
      {
        type: 'list',
        name: 'industry',
        message: 'Industry:',
        choices: [
          'salon',
          'restaurant',
          'law-firm',
          'dental',
          'fitness',
          'real-estate',
          'accounting',
          'plumbing',
          'veterinary',
          'auto-repair',
        ],
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'clients/{{clientName}}/',
        base: 'templates/starter/',
        templateFiles: 'templates/starter/**/*',
      },
      {
        type: 'modify',
        path: 'clients/{{clientName}}/site.config.ts',
        pattern: /id: '.*'/,
        template: "id: '{{clientName}}'",
      },
    ],
  });
}
```

**Usage:** `turbo gen new-client` → interactive prompts → fully scaffolded client.

**Task:** Add to Wave 3 (Task 5.1) as the primary client creation mechanism.

**Files:**

- Create: `turbo/generators/config.ts`
- Add devDependency: `@turbo/gen`

---

#### TOOL-2: pnpm Catalog Codemod for Dependency Consistency

**Research:** Official pnpm codemod exists to migrate all workspace packages to use
`catalog:` protocol automatically.

**Command:** `pnpx codemod pnpm/catalog`

**Value:** Eliminates INT-9 (version drift) in a single automated step.
Would also catch any future drift via `catalogMode: 'strict'` in `.npmrc`.

**Task:** Run as part of Wave 0, immediately after Task 0.2 (sync workspace globs).
New task number: **0.27**.

---

#### TOOL-3: @t3-oss/env-nextjs — Consider for Env Validation Replacement

**Research:** `@t3-oss/env-nextjs` is the community standard for type-safe environment
variable validation in Next.js. It provides:

- Build-time validation with `skipValidation` for CI lint steps
- Client/server env separation enforcement
- Zod-powered schemas (same as current system)
- Zero-config Next.js integration

**Current state:** `@repo/infra/env` implements a custom env validation system with 7 schemas.
The custom system works but is bespoke and harder to maintain.

**Recommendation:** **Evaluate but don't migrate now.** The custom system is functional and
deeply integrated. Migration would touch every file that imports from `@repo/infra/env`.
Add as LATER task. If the custom system becomes a maintenance burden, migrate then.

---

#### TOOL-4: TypeScript Project References for Incremental Builds

**Research:** Adding `"composite": true` and `"references"` to `tsconfig.json` files enables
TypeScript's incremental build mode, which only re-type-checks changed packages.

**Current state:** `tsconfig.base.json` does not set `composite: true`. No project references.
The `type-check` task runs `tsc --noEmit` in each package independently.

**Benefit:** In a 10+ package monorepo, incremental type-checking can reduce CI time by 60-80%.

**Recommendation:** Add as NEXT task after first client launches. Requires:

- Add `"composite": true, "declaration": true` to `tsconfig.base.json`
- Add `"references": [...]` to each package's `tsconfig.json`
- Change `type-check` script to `tsc --build --noEmit`

---

#### TOOL-5: Biome as Future ESLint+Prettier Replacement (LATER)

**Research:** Biome is a Rust-based linter+formatter claiming 20x speed over ESLint+Prettier.
However, as of early 2026:

- Plugin support is still limited (no Next.js-specific rules)
- Monorepo support is improving but not yet on par with ESLint flat config
- Migration path exists but requires careful rule mapping

**Recommendation:** **LATER.** Keep ESLint flat config + Prettier for now. Re-evaluate when
Biome 2.0 ships with plugin support and multi-file linting.

---

### H.3 Refined Strategic Execution Plan

#### Updated Wave 0 — Complete Task List with New Findings

| ID   | Task                                           | Priority | Effort      | Batch |
| ---- | ---------------------------------------------- | -------- | ----------- | ----- |
| 0.1  | Resolve .npmrc/.pnpmrc conflict                | CRITICAL | 15m         | A     |
| 0.2  | Sync workspace globs                           | CRITICAL | 15m         | A     |
| 0.27 | Run pnpm catalog codemod                       | HIGH     | 30m         | A     |
| 0.9  | Fix infra runtime deps placement               | CRITICAL | 15m         | A     |
| 0.10 | Fix broken infra export path                   | CRITICAL | 5m          | A     |
| 0.15 | Align Sentry DSN env var naming                | HIGH     | 30m         | A     |
| 0.20 | Fix port number inconsistency                  | MEDIUM   | 15m         | A     |
| 0.28 | Fix Node.js engine requirement to >=22         | MEDIUM   | 5m          | A     |
| 0.29 | Add globalEnv to turbo.json                    | HIGH     | 15m         | A     |
| —    | **Batch A total**                              |          | **~2.5 hr** |       |
| 0.14 | Wire theme config to CSS generation            | CRITICAL | 2h          | B     |
| 0.21 | Replace local `cn` imports with @repo/utils    | MEDIUM   | 30m         | B     |
| 0.22 | Fix not-found.tsx/loading.tsx hardcoded colors | MEDIUM   | 30m         | B     |
| 0.23 | Fix social links missing target/rel            | MEDIUM   | 15m         | B     |
| 0.24 | Fix Supabase client eager init                 | MEDIUM   | 30m         | B     |
| 0.25 | Create unified route registry                  | HIGH     | 1h          | B     |
| 0.26 | Fix error.tsx/global-error.tsx Sentry usage    | MEDIUM   | 30m         | B     |
| 0.30 | Fix SearchDialog broken Tailwind class         | HIGH     | 5m          | B     |
| 0.31 | Remove deprecated bookingProviders export      | MEDIUM   | 15m         | B     |
| —    | **Batch B total**                              |          | **~5.5 hr** |       |
| 0.17 | Add knip for dead code detection               | HIGH     | 1h          | C     |
| 0.18 | Add syncpack for version consistency           | HIGH     | 1h          | C     |
| 0.19 | Add export map validation script               | HIGH     | 1h          | C     |
| 0.32 | Create .env.production.local.example           | MEDIUM   | 30m         | C     |
| —    | **Batch C total**                              |          | **~3.5 hr** |       |
| 0.3  | Upgrade Turborepo                              | HIGH     | 1h          | D     |
| 0.11 | Enforce monorepo boundaries                    | HIGH     | 1h          | D     |
| 0.13 | Strengthen CI quality gates                    | HIGH     | 1h          | D     |
| 0.16 | Fix Dockerfile standalone output               | HIGH     | 30m         | D     |
| —    | **Batch D total**                              |          | **~3.5 hr** |       |

**Parallelization:** A and B can run concurrently. C after A completes. D after all.
**Total elapsed time:** ~1.5 days with 2 parallel tracks.

**Exit gate:** `pnpm install && pnpm turbo lint type-check build test` all green.

---

#### Risk Matrix for Wave 0

| Risk                                  | Likelihood | Impact | Mitigation                                        |
| ------------------------------------- | ---------- | ------ | ------------------------------------------------- |
| Catalog codemod changes lock file     | HIGH       | LOW    | Review diff, re-run `pnpm install`                |
| Turbo upgrade breaks cache keys       | MEDIUM     | MEDIUM | Clear cache: `turbo clean`, add `globalEnv` first |
| Theme injector breaks existing styles | MEDIUM     | HIGH   | Use globals.css as fallback, injector as override |
| knip reports false positives          | HIGH       | LOW    | Configure ignores before CI enforcement           |
| Node engine change breaks CI          | LOW        | HIGH   | Verify CI runner Node version first               |

---

#### Updated Wave 1-3 Adjustments Based on Research

**Wave 1 additions:**

- Use `turbo gen` scaffolding for `packages/features` structure (TOOL-1)
- Derive booking schema enums from siteConfig during feature extraction (INT-3)
- Abstract booking provider duplication during extraction (INT-1)
- Update jest.config.js @repo/shared mapping when executing 0.8 (INT-5)

**Wave 2 additions:**

- OG image route must read from siteConfig (G.2 NEW-3)
- All page templates must use semantic design token classes only (G.2 NEW-1/2)
- Breadcrumbs should be conditional by route (G.2 NEW-13)

**Wave 3 additions:**

- Implement `turbo gen new-client` generator for client scaffolding (TOOL-1)
- Include `pnpm validate-client` script that checks config schema, routes, metadata
- Create `.env.production.local.example` for Docker deploy documentation (INT-10)

---

#### Master Dependency Graph (Revised)

```text
Wave 0
├── Batch A (config fixes) ─────────────────────────────────────────┐
│   0.1, 0.2, 0.27, 0.9, 0.10, 0.15, 0.20, 0.28, 0.29            │
├── Batch B (code fixes) ──────── runs parallel with A ─────────────┤
│   0.14, 0.21-0.26, 0.30, 0.31                                    │
├── Batch C (tooling) ──────────── after A ─────────────────────────┤
│   0.17, 0.18, 0.19, 0.32                                         │
└── Batch D (upgrades+CI) ─────── after A+B+C ─────────────────────┘
    0.3, 0.11, 0.13, 0.16
    │
    ├──→ Wave 1 Track A: Config + Types (0.8 → 1.8 → 1.9)
    │    └── Update jest.config.js mapping (INT-5)
    │
    ├──→ Wave 1 Track B: Feature Extraction (2.11 → 2.12-2.20)
    │    ├── Abstract booking providers (INT-1)
    │    ├── Derive schemas from config (INT-3)
    │    └── Remove deprecated exports (INT-2)
    │
    ├──→ Wave 1 Track C: Testing (2.21 → 2.22)
    │
    └──→ Wave 2: Page Templates (3.1-3.8)
         ├── Config-driven OG images (NEW-3)
         ├── Semantic token classes only (NEW-1/2)
         ├── Conditional breadcrumbs (NEW-13)
         │
         └──→ Wave 3: Client Factory (5.1-5.7)
              ├── turbo gen new-client (TOOL-1)
              ├── pnpm validate-client script
              └── .env.production.local.example (INT-10)
```

---

### H.4 Catalog of All Open Tasks by ID (Quick Reference)

**Wave 0 (39 tasks total):**
0.1, 0.2, 0.3, 0.8, 0.9, 0.10, 0.11, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18,
0.19, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30,
0.31, 0.32

**Wave 1 (11 tasks):**
1.8, 1.9, 2.11, 2.12, 2.13, 2.15, 2.20, 2.21, 2.22

**Wave 2 (5 tasks):**
3.1, 3.2, 3.3, 3.5, 3.8

**Wave 3 (5 tasks):**
5.1, 5.2, 5.3, 5.7, 6.10

**Total NOW tasks:** 50 (down from unstructured backlog of 100+)

---

### H.5 Single-Command Health Check Vision

After Wave 0 completes, the repo should support:

```bash
pnpm health
# ✅ Config files consistent (.npmrc, .pnpmrc, workspace globs)
# ✅ All export maps resolve to real files (14/14)
# ✅ No runtime deps in devDependencies
# ✅ All workspace packages use catalog: protocol
# ✅ Dependency versions consistent (syncpack: 0 mismatches)
# ✅ No unused exports detected (knip: clean)
# ✅ Theme config wired to CSS custom properties
# ✅ Sentry DSN env var naming consistent
# ✅ turbo.json globalEnv configured
# ✅ CI quality gates enforced
# ⏳ TypeScript project references (NEXT)
# ⏳ Biome migration evaluation (LATER)
```

This becomes the standing pre-merge check and the foundation for operational confidence.

---
