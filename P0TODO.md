# P0TODO.md - Repository Task List

Document Type: Workflow
Last Updated: 2026-01-21
Task Truth Source: **P0TODO.md**
Other Priority Files: `P1TODO.md`, `P2TODO.md`, `P3TODO.md`

This file is the single source of truth for P0 actionable work. If another document disagrees, the task record in this file wins (unless the Constitution overrides).

## Goals (from chat)
- Site: High-performance marketing site for "Your Dedicated Marketer"
- Hosting: Cloudflare Pages (GitHub integration)
- Standard: Diamond Standard (performance, accessibility, observability, testing)
- Keep: Sentry, PWA, Search
- Contact flow: Store lead in Supabase (server-only) + sync to HubSpot CRM
- No email sending
- Save suspicious submissions but flag them (suspicious = too many requests)
- Required fields: Name, Email, Phone
- UX: Return success even if HubSpot sync fails (best-effort)

## Task Schema (Required)
- **ID**: `T-###` (unique, sequential)
- **Priority**: `P0 | P1 | P2 | P3`
- **Type**: `SECURITY | RELEASE | DEPENDENCY | DOCS | QUALITY | BUG | FEATURE | CHORE`
- **Owner**: `AGENT | Trevor`
- **Status**: `READY | BLOCKED | IN-PROGRESS | IN-REVIEW | DONE`
- **Blockers**: `None` or a short description of what prevents progress
- **Context**: why the task exists (1–5 bullets)
- **Acceptance Criteria**: verifiable checklist (broken into subtasks T-###.#)
- **References**: file paths and/or links inside this repo
- **Dependencies**: task IDs (if any)
- **Effort**: `XS | S | M | L | XL` (XS = < 30 min, S = < 2 hr, M = < 4 hr, L = < 1 day, XL = > 1 day)

### Priority Meaning
- **P0**: BLOCKS BUILD or causes security/data loss — fix immediately
- **P1**: High impact; do within 7 days
- **P2**: Important but not urgent; do within 30 days
- **P3**: Backlog/tech debt; do when convenient

### Ownership Rule
- **Owner: AGENT** — task can be executed by Codex/Claude Code/Copilot in-repo
- **Owner: Trevor** — requires external actions (provider dashboards, DNS, billing, approvals)

## Task Assessment Notes (2026-01-21)
- Reviewed existing tasks (T-080 through T-107); priorities align with release blockers and lead-capture requirements, so no priority corrections were required.
- Added audit-derived tasks from `WRONG.md` with priorities mapped to the audit severity: CRITICAL → P0, HIGH/MAJOR → P1, MEDIUM → P2, MINOR/DEAD-CODE → P3.

## Prompt Scaffold (Required for AGENT-owned tasks in this file)
Prompt Scaffold (Required for AGENT-owned tasks)
Role: Who the agent should act as (e.g., senior engineer, docs editor).
Goal: What “done” means in one sentence.
Non-Goals: Explicit exclusions to prevent scope creep.
Context: Relevant files, prior decisions, and why the task exists.
Constraints: Tooling, style, security, and architecture rules to follow.
Examples: Expected input/output or format examples when applicable.
Validation: Exact verification steps (tests, lint, build, manual checks).
Output Format: Required response format or artifacts.
Uncertainty: If details are missing, mark UNKNOWN and cite what was checked.

Task Prompt Template (paste into each task)
Role:
Goal:
Non-Goals:
Context:
Constraints:
Examples:
Validation:
Output Format:
Uncertainty:

---

## 🔴 PHASE 0: Build & Security Blockers (P0)
> These MUST be fixed before feature work.

---

### T-085: Align contact pipeline implementation to the v1 scope decision
Priority: P0
Type: RELEASE
Owner: AGENT
Status: DONE
Blockers: None
Completed: 2026-01-12
Context:
- Contact pipeline must match the chosen lead capture path
- Optional integrations should not crash the site
Acceptance Criteria:
- [ ] T-085.1: If v1 is email-only, disable Supabase/HubSpot paths (no required env vars, no dead calls)
- [ ] T-085.2: If v1 is Supabase + HubSpot, ensure contact submissions write to Supabase and attempt HubSpot sync
- [ ] T-085.3: Ensure submitContactForm returns clear success/failure and never silently succeeds
- [ ] T-085.4: Document pipeline behavior in /docs/DEPLOYMENT.md
References:
- /lib/actions.ts
- /lib/env.ts
- /docs/DEPLOYMENT.md
Dependencies: T-084, T-080, T-081, T-082
Effort: M

### T-086: Verify contact flow in a deployed environment
Priority: P0
Type: RELEASE
Owner: Trevor
Status: READY
Blockers: Contact pipeline implementation (T-085) must be complete.
Context:
- Launch readiness requires live verification, not just local testing
Acceptance Criteria:
- [ ] T-086.1: Deploy a preview build (Cloudflare Pages preview or equivalent)
- [ ] T-086.2: Submit three forms (valid, invalid, and rapid-fire spammy)
- [ ] T-086.3: Confirm the lead appears in the chosen destination (email/DB/CRM)
- [ ] T-086.4: Record results (screenshot or notes) in /docs/LAUNCH-VERIFICATION.md
References:
- /docs/LAUNCH-VERIFICATION.md
Dependencies: T-085
Effort: XS

### T-088: Create production environment checklist
Priority: P0
Type: RELEASE
Owner: Trevor
Status: READY
Blockers: None
Context:
- Production env setup should be explicit and verifiable
Acceptance Criteria:
- [ ] T-088.1: Create /docs/PRODUCTION-ENV-CHECKLIST.md with Required/Dev/Optional sections
- [ ] T-088.2: Copy the final list from /env.example and mark required/optional
- [ ] T-088.3: Confirm each required value is set in Cloudflare Pages
References:
- /env.example
- /docs/PRODUCTION-ENV-CHECKLIST.md
Dependencies: T-087
Effort: XS

### T-106: Run Go/No-Go checklist before launch
Priority: P0
Type: RELEASE
Owner: Trevor
Status: BLOCKED
Blockers: T-086 (contact form verification) and T-089 (privacy/terms pages) must be completed first.
Context:
- Final gate to confirm launch readiness
Acceptance Criteria:
- [ ] T-106.1: Verify contact form works in deployed environment
- [ ] T-106.2: Confirm no missing env vars cause startup risk
- [ ] T-106.3: Confirm Privacy + Terms pages exist and load
- [ ] T-106.4: Confirm CI is installed (branch protection skipped per T-091)
- [ ] T-106.5: Complete launch smoke test checklist
- [ ] T-106.6: Confirm rollback steps are documented
- [ ] T-106.7: Confirm monitoring is enabled or intentionally disabled
- [ ] T-106.8: Confirm no broken links
References:
- /docs/LAUNCH-SMOKE-TEST.md
- /docs/ROLLBACK.md
- /docs/LAUNCH-VERIFICATION.md
Dependencies: T-086, T-088, T-089, T-090, T-092, T-093, T-094, T-107
Effort: XS

### T-107: Configure Cloudflare Pages deployment
Priority: P0
Type: RELEASE
Owner: Trevor
Status: READY
Blockers: None
Context:
- Cloudflare Pages configuration complete, needs dashboard setup
- wrangler.toml and deployment docs created
- Build scripts already exist in package.json
Acceptance Criteria:
- [ ] T-107.1: Log in to Cloudflare Dashboard and create Pages project
- [ ] T-107.2: Connect GitHub repository (TrevorPLam/your-dedicated-marketer)
- [ ] T-107.3: Configure build settings (command: npm run pages:build, output: .vercel/output/static)
- [ ] T-107.4: Set NODE_VERSION=20 and CLOUDFLARE_BUILD=true in environment variables
- [ ] T-107.5: Add all required secrets (UPSTASH_REDIS_REST_TOKEN, RESEND_API_KEY, SENTRY_AUTH_TOKEN)
- [ ] T-107.6: Add all required environment variables (UPSTASH_REDIS_REST_URL, SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT)
- [ ] T-107.7: Trigger first deployment and verify build succeeds
- [ ] T-107.8: Configure custom domain if applicable
References:
- /docs/CLOUDFLARE_DEPLOYMENT.md
- /wrangler.toml
- /.dev.vars.example
Dependencies: None
Effort: M
