# Marketing Websites Monorepo — Consolidated TODO (No-Loss Migration)

_Last rebuilt from `OLDTODO.md` on 2026-02-14._

## 1) Program Contract (Non-Negotiable)

This TODO is a **complete migration** from `OLDTODO.md` with these guarantees:

1. **No task loss:** every task ID from old backlog is preserved.
2. **Atomic execution:** every task is decomposed into executable subtasks.
3. **Deduplicated strategy:** overlapping work merged into one execution path while preserving IDs.
4. **Repo soundness:** complementary tasks added where required for correctness.
5. **Execution quality:** each task has dependencies, outputs, validation, and gate criteria.

---

## 2) Canonical Execution Model

Each task executes through the same atomic lifecycle:

- **A1 Scope:** confirm dependencies + impacted files + risk.
- **A2 Implement:** apply smallest safe root-cause change.
- **A3 Verify:** lint + type-check + tests + targeted runtime checks.
- **A4 Document:** ADR/docs/runbooks/changelog updates.
- **A5 Gate:** satisfy listed acceptance criteria and CI requirements.

For each task below, “Atomic Subtasks” lists task-specific A1-A5 details.

---

## 3) Program Waves and Scheduling

## NOW (launch throughput)

- **Wave 0:** 0.1-0.32 (hard blockers + hygiene + correctness)
- **Wave 1:** 1.8, 1.9, 2.11, 2.12, 2.13, 2.15, 2.20, 2.21, 2.22
- **Wave 2:** 3.1, 3.2, 3.3, 3.5, 3.8
- **Wave 3:** 5.1, 5.2, 5.3, 5.7, 6.10

## NEXT (expand capability)

- Remaining Priority 1/2/3/4/5/6 tasks not in NOW.

## LATER (platform differentiation and future AOS layers)

- C.*, D.*, E.*, F.*, Phase 7-10 tasks.

---

## 4) Wave 0 — Hard Blockers and Fast Correctness (0.1-0.32)

### 0.1 Resolve config file conflicts
- **Depends on:** none
- **Outputs:** `.npmrc`/`.pnpmrc` policy alignment doc + file changes
- **Atomic Subtasks:**
  1. Remove conflicting `node-linker` in `.npmrc`.
  2. Confirm single source of truth in `.pnpmrc`.
  3. Validate `pnpm install` on clean workspace.
  4. Document linker policy in tooling/architecture docs.

### 0.2 Sync workspace globs
- **Depends on:** none
- **Outputs:** `package.json` + `pnpm-workspace.yaml` parity check
- **Atomic Subtasks:**
  1. Align workspace globs across both files.
  2. Add CI script to detect future drift.
  3. Validate package discovery (`pnpm -r list --depth -1`).

### 0.3 Upgrade Turborepo
- **Depends on:** none
- **Outputs:** upgraded `turbo`, validated task graph
- **Atomic Subtasks:**
  1. Upgrade turbo to latest stable.
  2. Validate `tasks` config compatibility.
  3. Run lint/type-check/test/build through turbo.
  4. Capture warm/cold cache benchmark note.

### 0.4 Evaluate Tailwind v4 migration
- **Depends on:** none
- **Outputs:** go/no-go decision doc + trigger conditions
- **Atomic Subtasks:**
  1. Run migration risk matrix (browser support, preset migration, plugin compatibility).
  2. Decide migrate now vs defer.
  3. If deferred, add explicit revisit trigger/date.

### 0.5 Evaluate Next.js 16 migration
- **Depends on:** none
- **Outputs:** migration recommendation + readiness checklist
- **Atomic Subtasks:**
  1. Audit async request API usage + turbopack assumptions.
  2. Evaluate CI/lint/routing/caching breaking changes.
  3. Produce phased migration path if no-go now.

### 0.6 Performance baseline
- **Depends on:** none
- **Outputs:** `docs/performance-baseline.md`, budget policy
- **Atomic Subtasks:**
  1. Capture CWV metrics (mobile/desktop, lab + field where possible).
  2. Add budget thresholds + bundle analysis workflow.
  3. Define CI enforcement approach.

### 0.7 Accessibility audit
- **Depends on:** none
- **Outputs:** `docs/accessibility-audit.md` + remediation links
- **Atomic Subtasks:**
  1. Run automated scans on key routes.
  2. Run manual WCAG 2.2 checks (focus, keyboard, announcements, target size).
  3. Create high-severity remediation tasks and PR checklist updates.

### 0.8 Move `@repo/shared` to `packages/types`
- **Depends on:** 0.2
- **Outputs:** `@repo/types` package + migrated imports
- **Atomic Subtasks:**
  1. Move code preserving API compatibility.
  2. Update imports and jest mappings.
  3. Add migration map old->new import paths.
  4. Remove `templates/shared` only after full type-check parity.

### 0.9 Fix infra dependency placement
- **Depends on:** none
- **Outputs:** corrected runtime deps strategy
- **Atomic Subtasks:**
  1. Move runtime deps from devDependencies.
  2. Distinguish hard runtime deps vs optional peers.
  3. Add CI guard for runtime-import-in-devDeps anti-pattern.

### 0.10 Fix broken infra export path
- **Depends on:** none
- **Outputs:** valid package export map
- **Atomic Subtasks:**
  1. Correct broken subpath export.
  2. Validate exports resolve from consumer context.
  3. Document canonical subpath namespace.

### 0.11 Enforce monorepo boundaries
- **Depends on:** 0.2
- **Outputs:** lint rules + architecture matrix
- **Atomic Subtasks:**
  1. Define allowed dependency direction matrix.
  2. Block deep/internal imports across packages.
  3. Enforce in CI with actionable messages.

### 0.12 Add changesets versioning workflow
- **Depends on:** 0.2
- **Outputs:** `.changeset` config + release strategy doc
- **Atomic Subtasks:**
  1. Configure changesets and release scripts/workflows.
  2. Define semver + rollback channel policy.
  3. Validate release PR generation.

### 0.13 Strengthen CI quality gates
- **Depends on:** 0.3
- **Outputs:** required checks doc + updated CI graph
- **Atomic Subtasks:**
  1. Make lint/type-check/test/build mandatory on PR.
  2. Add affected checks + scheduled full run.
  3. Align branch protection with documented checks.

### 0.14 Wire theme config to CSS generation
- **Depends on:** 1.8 (contract), can prototype earlier
- **Outputs:** config-driven theme variable pipeline
- **Atomic Subtasks:**
  1. Define theme token injection strategy.
  2. Generate CSS vars from site config.
  3. Validate runtime theming parity and fallback behavior.

### 0.15 Align Sentry DSN env naming
- **Depends on:** none
- **Outputs:** schema + env docs alignment
- **Atomic Subtasks:**
  1. Align env schema to runtime var names.
  2. Update examples/docs.
  3. Verify Sentry initialization and error capture paths.

### 0.16 Fix Dockerfile standalone output mismatch
- **Depends on:** none
- **Outputs:** reproducible Docker build
- **Atomic Subtasks:**
  1. Either re-enable standalone or rewrite Dockerfile copy strategy.
  2. Build image end-to-end locally/CI.
  3. Document deployment assumptions.

### 0.17 Add knip dead code detection
- **Depends on:** none
- **Outputs:** `knip` config + CI gate
- **Atomic Subtasks:**
  1. Configure knip with tuned ignore set.
  2. Add script + CI check.
  3. Triage initial findings into actionable tasks.

### 0.18 Add syncpack version consistency checks
- **Depends on:** none
- **Outputs:** syncpack config + CI mismatch guard
- **Atomic Subtasks:**
  1. Configure syncpack rules for monorepo.
  2. Add check scripts + CI integration.
  3. Resolve baseline mismatches.

### 0.19 Add export map validation script
- **Depends on:** none
- **Outputs:** `scripts/validate-exports.ts` + CI check
- **Atomic Subtasks:**
  1. Validate every package export target exists.
  2. Fail CI on unresolved exports.
  3. Add quick fix guidance in script output.

### 0.20 Fix port-number inconsistency
- **Depends on:** none
- **Outputs:** consistent dev/default/deploy ports
- **Atomic Subtasks:**
  1. Select canonical local port.
  2. Align package scripts, config fallbacks, Docker, docs.
  3. Verify dev + compose behaviors.

### 0.21 Replace local `cn` imports with `@repo/utils`
- **Depends on:** 0.11
- **Outputs:** single canonical utility usage
- **Atomic Subtasks:**
  1. Find and replace local utility imports.
  2. Remove duplicate utility implementations where safe.
  3. Validate type-check and component rendering.

### 0.22 Replace hardcoded theme colors in not-found/loading
- **Depends on:** 0.14 (or safe semantic class fallback)
- **Outputs:** semantic token class usage
- **Atomic Subtasks:**
  1. Replace hardcoded Tailwind palette classes.
  2. Verify dark/light/theme parity.
  3. Add visual snapshot for regressions.

### 0.23 Fix social links target/rel attrs
- **Depends on:** none
- **Outputs:** secure external link behavior
- **Atomic Subtasks:**
  1. Add `target` and `rel` attrs.
  2. Verify a11y and security guidance compliance.
  3. Add lint or component helper to prevent regression.

### 0.24 Fix supabase eager singleton initialization
- **Depends on:** none
- **Outputs:** lazy client creation pattern
- **Atomic Subtasks:**
  1. Replace module-level eager singleton with lazy getter.
  2. Ensure call sites handle lazy creation/failure correctly.
  3. Add test for missing-env non-crash behavior.

### 0.25 Create unified route registry
- **Depends on:** 1.8 (schema contract) recommended
- **Outputs:** shared route source for sitemap + search + nav
- **Atomic Subtasks:**
  1. Define route registry module.
  2. Make sitemap/search consume registry.
  3. Add tests ensuring parity and no orphan routes.

### 0.26 Fix error/global-error Sentry abstraction usage
- **Depends on:** 0.15
- **Outputs:** uniform infra logging entrypoint
- **Atomic Subtasks:**
  1. Replace direct Sentry imports with `@repo/infra` client APIs.
  2. Ensure global error boundary reports critical failures.
  3. Validate with forced error smoke tests.

### 0.27 Run pnpm catalog codemod
- **Depends on:** 0.2
- **Outputs:** `catalog:`-based shared dep references
- **Atomic Subtasks:**
  1. Run official codemod.
  2. Review/adjust edge cases.
  3. Confirm lockfile and CI determinism.

### 0.28 Relax Node.js engine requirement
- **Depends on:** none
- **Outputs:** realistic contributor compatibility
- **Atomic Subtasks:**
  1. Set engine floor to current supported LTS strategy.
  2. Verify CI/runtime compatibility and docs.

### 0.29 Add turbo `globalEnv` / pass-through env config
- **Depends on:** 0.13
- **Outputs:** correct cache invalidation behavior
- **Atomic Subtasks:**
  1. Enumerate env vars impacting build/runtime output.
  2. Configure turbo global env entries.
  3. Verify cache correctness under env changes.

### 0.30 Fix broken Tailwind class in SearchDialog
- **Depends on:** none
- **Outputs:** corrected hover style class
- **Atomic Subtasks:**
  1. Replace invalid class.
  2. Verify style effect + no warnings.

### 0.31 Remove deprecated eager `bookingProviders` export
- **Depends on:** 2.12 can absorb
- **Outputs:** lazy provider resolution only
- **Atomic Subtasks:**
  1. Remove deprecated eager export.
  2. Migrate call sites to lazy accessor.
  3. Verify env validation semantics preserved.

### 0.32 Add `.env.production.local.example`
- **Depends on:** 0.16
- **Outputs:** documented Docker/deploy env contract
- **Atomic Subtasks:**
  1. Enumerate required production env vars.
  2. Provide secure example file.
  3. Link in contributing/deployment docs.

---

## 5) Priority 1 — Foundation (1.1-1.9)

## UI Primitive Pack (1.1-1.6)
Shared atomic checklist for each primitive:
1. API contract (controlled/uncontrolled if relevant).
2. Accessibility semantics + keyboard + screen reader behavior.
3. Visual variants + token alignment.
4. Unit/component tests + story/examples.
5. Export + docs + migration notes.

- **1.1 Dialog** — focus trap, escape, layering, scroll lock.
- **1.2 Toast** — global host, aria-live, stacking, dedupe keys.
- **1.3 Tabs** — ARIA tablist, orientation, activation mode.
- **1.4 Dropdown Menu** — nested menus, collisions, destructive affordances.
- **1.5 Tooltip** — non-interactive, focus trigger, provider delay defaults.
- **1.6 Popover** — interactive lightweight overlay, deterministic dismissal.

## Packaging + Types

### 1.7 Create marketing-components package
- **Depends on:** none
- **Atomic Subtasks:** scaffold package, enforce public API boundaries, wire turbo/eslint/ts, docs/readme.

### 1.8 Enhance configuration system
- **Depends on:** 0.8
- **Atomic Subtasks:** extend SiteConfig (industry/features/integrations), keep backward compatibility, add runtime schema validation, type tests, docs.

### 1.9 Create industry types package
- **Depends on:** 1.8
- **Atomic Subtasks:** define 12-industry presets, required/recommended fields, schema mappings, override safety, extension mechanism.

---

## 6) Priority 2 — Marketing Components and Features (2.1-2.22)

## Marketing Components Pack (2.1-2.10)
Shared checklist:
1. Define normalized data contracts.
2. Implement variants with semantic markup + a11y.
3. Add responsive behavior + reduced-motion handling where relevant.
4. Add tests for variants and edge states.
5. Export via package entrypoints and docs.

- **2.1 HeroVariants** — centered/split/video/carousel; LCP-safe media.
- **2.2 ServiceShowcase** — grid/list/tabs/accordion with deterministic filtering.
- **2.3 TeamDisplay** — grid/carousel/detailed with profile extensibility.
- **2.4 TestimonialComponents** — authenticity metadata + source handling.
- **2.5 PricingComponents** — tables/cards/calculators and locale-ready formatting.
- **2.6 GalleryComponents** — optimized thumbs/full images + lightbox integration.
- **2.7 StatsCounter** — SSR-safe animation + reduced-motion fallback.
- **2.8 CTASections** — priority scale + analytics hooks.
- **2.9 FAQSection** — search/filter + FAQ schema output compatibility.
- **2.10 ContactFormVariants** — payload normalization + consent/spam policy.

## Features Pack (2.11-2.20)
Shared checklist:
1. Extract from template preserving behavior parity.
2. Remove industry hardcoding into config contracts.
3. Define public feature APIs and adapter boundaries.
4. Add feature-level tests.
5. Document extension points.

- **2.11** Create `packages/features` structure.
- **2.12** Extract booking (includes provider abstraction, de-duplication, config-derived service/time values).
- **2.13** Extract contact (configurable fields + submission adapters).
- **2.14** Extract blog (source adapters + taxonomy/pagination).
- **2.15** Extract services (taxonomy + detail/overview composability).
- **2.16** Create testimonials feature (provider normalization + moderation model).
- **2.17** Create team feature (profile schema + layout switching).
- **2.18** Create gallery feature (image metadata + optimization policy).
- **2.19** Create pricing feature (tier schema + quote-friendly modes).
- **2.20** Extract search (index/query/UI split + deterministic ranking tests).

## Test Governance (2.21-2.22)

### 2.21 Establish testing strategy
- Define package-level pyramid (unit/integration/e2e smoke), ownership, coverage ramp, fixture policies.

### 2.22 Add feature parity regression tests
- Build source->extracted parity matrix and block template deletion without parity signoff.

---

## 7) Priority 3 — Page Templates (3.1-3.8)

Shared checklist for template tasks:
1. Keep templates as composition shells (minimal business logic).
2. Route/query state deterministic and URL-safe where applicable.
3. Metadata/schema integration points explicit.
4. Empty/error/loading states covered.
5. Accessibility + performance smoke tests.

- **3.1** Create `@repo/page-templates` package.
- **3.2** HomePageTemplate (registry-driven section composition).
- **3.3** ServicesPageTemplate (filter state URL sync + canonical handling).
- **3.4** AboutPageTemplate (trust modules and ordering).
- **3.5** ContactPageTemplate (response expectations + failover channels).
- **3.6** BlogIndexTemplate (pagination/filter SEO safety).
- **3.7** BlogPostTemplate (metadata + related-content determinism).
- **3.8** BookingPageTemplate (prefill validation and persistence behavior).

---

## 8) Priority 4 — Integrations (4.1-4.6)

Shared checklist:
1. Provider adapter contracts.
2. Secure env + key handling.
3. Retry/timeout/fallback semantics.
4. Consent/privacy and ToS constraints.
5. Integration tests and failure-path docs.

- **4.1** Email marketing integrations.
- **4.2** Scheduling integrations.
- **4.3** Live chat integrations.
- **4.4** Review platform integrations.
- **4.5** Maps integration.
- **4.6** Industry schemas package (typed JSON-LD generators + validation).

---

## 9) Priority 5 — Client Architecture (5.1-5.7)

Shared checklist:
1. Config-first starter/client architecture.
2. No forks of shared packages.
3. Build/test/perf/a11y validations archived.
4. Migration artifacts documented.

- **5.1** Create client starter template.
- **5.2** Salon example client.
- **5.3** Restaurant example client.
- **5.4** Law-firm example client.
- **5.5** Medical example client.
- **5.6** Retail example client.
- **5.7** Migration validation matrix + go-live checklist.

---

## 10) Priority 6 — Cleanup and Documentation (6.1-6.10)

Shared checklist:
1. Preservation of rollback safety.
2. Documentation as executable runbooks.
3. CI-backed quality checks.

- **6.1** Migrate reusable template content to packages.
- **6.2** Create template-to-client migration guide.
- **6.3** Remove templates directory (only after parity + migration signoff).
- **6.4** Component library docs (Storybook or markdown system).
- **6.5** Configuration reference docs.
- **6.6** Feature package docs.
- **6.7** ADR set + governance.
- **6.8** CLI tooling (create-client, validate-config, generate-component).
- **6.9** Dead code and dependency pruning report.
- **6.10** Final cutover + rollback runbook execution.

---

## 11) Cross-Cutting Gap Closure Backlog (C.1-C.18)

- **C.1** Circular dependency + layering checks.
- **C.2** pnpm policy hardening + deterministic installs.
- **C.3** Turborepo remote cache governance.
- **C.4** Canary + stable release tracks.
- **C.5** Three-layer design token architecture.
- **C.6** Motion primitives + creative interaction standards.
- **C.7** Mandatory Storybook + visual regression.
- **C.8** Experimentation platform core.
- **C.9** Personalization rules engine.
- **C.10** CMS abstraction layer.
- **C.11** Localization + RTL foundation.
- **C.12** Standard conversion event taxonomy + QA.
- **C.13** Continuous security program.
- **C.14** Performance/reliability SLO framework.
- **C.15** Spec-driven development workflow.
- **C.16** AI-assisted delivery playbooks.
- **C.17** Industry compliance feature-pack framework.
- **C.18** Edge personalization + experiment routing.

For each C.* task execute A1-A5 and add: measurable policy, CI enforcement, owner assignment, and rollback path.

---

## 12) High-Priority Additional Governance Tasks (D.1-D.8)

- **D.1** Schema governance program.
- **D.2** Experimentation statistics and guardrails.
- **D.3** Editorial workflow + preview governance.
- **D.4** Tenant operations and capacity playbook.
- **D.5** Incident management + error budget policy.
- **D.6** Continuous accessibility gates + rubrics.
- **D.7** Ownership and escalation matrix.
- **D.8** Software supply-chain security program.

---

## 13) Innovation/Optimization Backlogs

## E-series (Round 1)
- **E.1** Perceived performance standards.
- **E.2** Conversion service blueprints.
- **E.3** Error-budget release gate.
- **E.4** Internal platform golden paths + adoption metrics.
- **E.5** PR/FAQ + JTBD intake templates.
- **E.6** Progressive conversion UX primitives.
- **E.7** Queueing + async pipeline governance.

## F-series (Round 2)
- **F.1** High-reliability preflight checklist program.
- **F.2** Cynefin-based execution modes.
- **F.3** Leverage-point scoring.
- **F.4** Peak-end journey optimization track.
- **F.5** Framing experiment library.
- **F.6** Participatory personalization patterns.
- **F.7** Wayfinding/information hierarchy standards.
- **F.8** Statistical process control for delivery quality.
- **F.9** Mission-command governance.
- **F.10** Portfolio Kanban WIP policy.
- **F.11** Knowledge-conversion system.
- **F.12** Service-recovery UX standards.

---

## 14) Future AOS Layer Phases

- **7.1** AI content engine.
- **7.2** LLM gateway.
- **7.3** Agent orchestration (MVP).
- **8.1** Visual page builder.
- **8.2** DAM core.
- **9.1** Campaign orchestration (MVP).
- **10.1** Advanced multi-tenancy.

These remain valid and preserved; execute only after NOW/NEXT stabilization unless explicitly reprioritized.

---

## 15) Complementary Tasks Added for Repo Soundness (NEW)

These tasks were added to make execution complete and durable:

### N.1 Backlog traceability checker
- **Purpose:** guarantee no task ID is ever dropped during future restructures.
- **Output:** `scripts/program/verify-task-ledger.ts` compares canonical ID list vs TODO content.

### N.2 Task acceptance evidence registry
- **Purpose:** every completed task stores proof links (PR, CI run, docs, test artifacts).
- **Output:** `docs/program/task-evidence-registry.md`.

### N.3 Program command wrappers
- **Purpose:** no duplicated scripts; one orchestration layer for wave validation.
- **Output:** `program:wave0`..`program:wave3` + `program:verify` scripts.

### N.4 Canonical risk register automation
- **Purpose:** prevent hidden blocker drift.
- **Output:** `docs/program/risk-register.md` + update script + owner review cadence.

---

## 16) Script-First Execution Plan

### Required program scripts

- `pnpm program:wave0` — runs 0.* checks in dependency order.
- `pnpm program:wave1` — validates config/types/features extraction gates.
- `pnpm program:wave2` — validates page template routing/metadata/smoke.
- `pnpm program:wave3` — validates starter + first clients + migration matrix.
- `pnpm program:verify` — runs no-loss task ledger check + evidence completeness.
- `pnpm health` — monorepo operational health command (exports, deps, policy, cache, env, quality).

### Gate policy

- No task marked complete without:
  1. passing CI checks,
  2. updated docs/runbook where applicable,
  3. evidence entry in task registry.

---

## 17) Definition of Done (Program)

A program completion requires all of the following:

1. **Architecture state:** template-based model fully replaced by package/client model.
2. **Client velocity:** new client launch possible from config-first starter with no core edits.
3. **Quality state:** a11y, perf, security, type safety, and testing gates green.
4. **Operational state:** cutover + rollback rehearsed and documented.
5. **Governance state:** ownership, release, schema, and incident policies active and enforced.

---

## 18) Exhaustive Canonical Task ID Index (No-Loss Proof)

### Wave 0
`0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32`

### Priority 1
`1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9`

### Priority 2
`2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17, 2.18, 2.19, 2.20, 2.21, 2.22`

### Priority 3
`3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8`

### Priority 4
`4.1, 4.2, 4.3, 4.4, 4.5, 4.6`

### Priority 5
`5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7`

### Priority 6
`6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10`

### Comparative backlog
`C.1, C.2, C.3, C.4, C.5, C.6, C.7, C.8, C.9, C.10, C.11, C.12, C.13, C.14, C.15, C.16, C.17, C.18`

### Additional governance backlog
`D.1, D.2, D.3, D.4, D.5, D.6, D.7, D.8`

### Innovation backlog (round 1)
`E.1, E.2, E.3, E.4, E.5, E.6, E.7`

### Innovation backlog (round 2)
`F.1, F.2, F.3, F.4, F.5, F.6, F.7, F.8, F.9, F.10, F.11, F.12`

### Future phases
`7.1, 7.2, 7.3, 8.1, 8.2, 9.1, 10.1`

### New complementary tasks
`N.1, N.2, N.3, N.4`

---

## 19) Immediate Execution Recommendation

Start now with this strict order:

1. **Wave 0 Batch A:** 0.1, 0.2, 0.27, 0.9, 0.10, 0.15, 0.20, 0.28, 0.29
2. **Wave 0 Batch B:** 0.14, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.30, 0.31
3. **Wave 0 Batch C:** 0.17, 0.18, 0.19, 0.32
4. **Wave 0 Batch D:** 0.3, 0.11, 0.13, 0.16
5. **Then Wave 1->2->3 NOW path**

Exit gate for Wave 0:

`pnpm install && pnpm turbo lint type-check build test`

