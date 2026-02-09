<!--
/**
 * @file tasks.md
 * @role docs
 * @summary Audit task tracker for codebase review and documentation updates.
 *
 * @entrypoints
 * - Used during audit workflow
 *
 * @exports
 * - N/A
 *
 * @depends_on
 * - N/A
 *
 * @used_by
 * - Auditors and maintainers
 *
 * @runtime
 * - environment: docs
 * - side_effects: none
 *
 * @data_flow
 * - inputs: audit progress
 * - outputs: checklist state
 *
 * @invariants
 * - Checklist should reflect actual audit progress
 *
 * @gotchas
 * - Manual checkbox updates can drift from docs/FILE_INVENTORY.md
 *
 * @issues
 * - [severity:low] Checklist likely outdated relative to current audit progress.
 *
 * @opportunities
 * - Sync checklist status with docs/FILE_INVENTORY.md
 *
 * @verification
 * - TODO(verify): Align checklist items with current audit outputs
 *
 * @status
 * - confidence: medium
 * - last_audited: 2026-02-09
 */
-->

# Audit Task Tracker

## Phase 0 - Baseline Truth Snapshot

- [ ] Read package.json for packageManager, engines, and scripts
- [ ] Read .npmrc and .pnpmrc for enforcement flags
- [ ] Read pnpm-workspace.yaml for workspace graph
- [ ] Read turbo.json for pipeline tasks and cache rules
- [ ] Read root tsconfig.json and tsconfig.base.json for shared compiler rules
- [ ] Read apps/web/next.config.js for runtime/build behavior
- [ ] Read apps/web/package.json for app-specific scripts and versions
- [ ] Read docker-compose.yml for runtime entry points
- [ ] Read jest.config.js / jest.setup.js / jest.helpers.ts for test harness expectations
- [ ] Read .github/workflows/\* for CI version pins and command list
- [ ] Read apps/web/Dockerfile for runtime Node version and output mode
- [ ] Read apps/web/tsconfig.json for path aliases and Next.js plugins
- [ ] Read apps/web/eslint.config.mjs and packages/config/eslint-config/\*
- [ ] Read apps/web/tailwind.config.js and postcss.config.js for build-time CSS behavior
- [ ] Capture Node/pnpm/turbo versions and enforcement points (packageManager, engines, .npmrc, corepack, CI)
- [ ] Document workspace graph (pnpm-workspace.yaml / package.json workspaces)
- [ ] Document Turbo pipeline tasks and cache behavior
- [ ] Identify Next.js app entry points and runtime mode (app router, middleware, API routes)
- [ ] Record baseline runtime modes: server/client/edge/build/test/ci
- [ ] Run or simulate commands and log results:
  - [ ] pnpm install
  - [ ] pnpm lint
  - [ ] pnpm type-check
  - [ ] pnpm test / coverage
  - [ ] pnpm build
  - [ ] pnpm start or docker-compose up -d
- [ ] Write docs/BASELINE.md with evidence + command outputs
- [ ] Write docs/TESTING_STATUS.md with results and gaps
- [ ] Log documentation drift found in CONFIG.md / CONTRIBUTING.md / docs/README.md
- [ ] Flag any doc claims that conflict with code as UNVERIFIED with proof steps

## Phase 1 - Canonical File List

- [ ] Enumerate all files and folders (root + apps + packages + docs + scripts + infrastructure + tools)
- [ ] Classify each file: runtime | config | test | docs | infra | script | asset
- [ ] Mark criticality: critical path | important | optional
- [ ] Create docs/FILE_INVENTORY.md with full file list, roles, criticality
- [ ] Add audit status column: pending | in-progress | done
- [ ] Include hidden/ops directories (.github, .githooks, .kiro, .vscode, .qodo)

## Phase 2 - Iterative File Audit Loop

- [ ] Loop discipline: 1 file at a time, no skips
- [ ] Step 1: open and read the file fully
- [ ] Step 2: determine connections (imports, used_by, runtime phase, side effects)
- [ ] Step 3: add standardized metaheader at top of file
- [ ] Step 4: add inline commentary (intent, invariants, boundaries, consent)
- [ ] Step 5: update shared docs immediately
- [ ] Step 6: backlink correction (reopen earlier files if understanding changes)
- [ ] Step 7: record findings in quality and dead-code reports
- [ ] Repeat until all inventory items are done
- [ ] Track doc conflicts and update CONFIG.md / CONTRIBUTING.md / README.md where inaccurate

## Required Docs Outputs

- [ ] docs/BASELINE.md
- [ ] docs/FILE_INVENTORY.md
- [ ] docs/CODEBASE_INDEX.md
- [ ] docs/ARCHITECTURE_MAP.md
- [ ] docs/ROUTE_CATALOG.md
- [ ] docs/INTEGRATIONS_AUDIT.md
- [ ] docs/QUALITY_REPORT.md
- [ ] docs/DEAD_CODE_AND_UNUSED.md
- [ ] docs/TESTING_STATUS.md
- [ ] docs/REMEDIATION_PLAN.md
- [ ] Keep all docs updated on every file loop

## Root Index

- [ ] Create INDEX.md at repo root
- [ ] Maintain Repo Map (tree view of major folders)
- [ ] Maintain Quickstart (verified commands only; mark unverified)
- [ ] Maintain Architecture Overview (as-is)
- [ ] Maintain Route Catalog Summary (link to docs/ROUTE_CATALOG.md)
- [ ] Maintain Integrations Summary (consent gating truth table + links)
- [ ] Maintain Package Graph (apps + packages and connections)
- [ ] Maintain File Atlas entries (links, summaries, gotchas, snippets)
- [ ] Maintain Quality Dashboard (critical issues, build/test/coverage status)
- [ ] Maintain Audit Progress checklist (from FILE_INVENTORY.md)
- [ ] Add links to docs/ARCHITECTURE_MAP.md and docs/CODEBASE_INDEX.md

## Consent and Privacy Verification

- [ ] Trace analytics entry points and consent checks in code
- [ ] Confirm default-off state for analytics/tracking
- [ ] Identify consent storage location and default value
- [ ] Record any pre-consent tracking as CRITICAL with evidence
- [ ] Update docs/INTEGRATIONS_AUDIT.md with verified truth table
- [ ] Review docs/INTEGRATION_GUARDRAILS.md against actual implementation
- [ ] Verify consent categories and state persistence (cookie + localStorage)
- [ ] Verify CSP allowlist generation (if present) matches enabled integrations

## Cross-File Link Discipline

- [ ] Ensure every cross-file relationship is documented both directions
- [ ] Update earlier file metaheaders if later discoveries change understanding
- [ ] Keep CODEBASE_INDEX and INDEX.md synchronized

## Documentation Standards Enforcement

- [ ] Ensure every non-trivial file has a standardized metaheader
- [ ] Ensure small files include minimum required metaheader fields
- [ ] Ensure inline comments explain intent, invariants, boundaries
- [ ] Tag concerns with AUDIT and TODO(verify)
- [ ] Keep commentary concise and non-redundant
- [ ] Normalize existing AI/metadata headers to the required schema

## Dead Code Handling

- [ ] Prove unused code with references or tooling before removal
- [ ] Document proof steps in docs/DEAD_CODE_AND_UNUSED.md
- [ ] Remove only if proof is conclusive and recorded
- [ ] Track duplicate UI components (apps/web/components/ui vs packages/ui)

## Finalization

- [ ] Verify all files in FILE_INVENTORY.md are marked done
- [ ] Verify every file has required metaheader and commentary
- [ ] Verify docs reflect actual code and configs (no speculation)
- [ ] Produce docs/QUALITY_REPORT.md with severity rankings and evidence
- [ ] Produce docs/REMEDIATION_PLAN.md based on findings
- [ ] Align docs/README.md pointers with actual doc locations (root vs docs/archive)
- [ ] Cross-check CONFIG.md and CONTRIBUTING.md version claims vs package.json
- [ ] Capture audit evidence for CI configs and environment requirements
