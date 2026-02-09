# File Meta: package.json

/\*\*

- @file package.json
- @role config
- @summary Defines monorepo scripts, workspaces, engines, and tool versions for root tooling.
-
- @entrypoints
- - pnpm/npm tooling reads this at install time
- - Turbo uses scripts declared here when running pipelines
- - CI reads scripts via pnpm commands in .github/workflows/ci.yml
-
- @exports
- - N/A
-
- @depends_on
- - External: pnpm, turbo, jest, typescript, prettier
-
- @used_by
- - .github/workflows/ci.yml
- - pnpm-workspace.yaml
- - turbo.json
-
- @runtime
- - environment: build
- - side_effects: defines scripts that run tooling in CI/dev
-
- @data_flow
- - inputs: user commands (pnpm run ...), CI steps
- - outputs: tool execution (build, lint, test, format)
-
- @invariants
- - packageManager must match CI pnpm version to avoid lockfile drift
- - engines.node must be compatible with Next.js and dependencies
-
- @gotchas
- - Scripts call turbo; failures in child packages surface through turbo pipeline
-
- @issues
- - [severity:low] None observed in-file. UNVERIFIED until scripts are run.
-
- @opportunities
- - Record verified command outputs in docs/TESTING_STATUS.md
-
- @verification
- - Run: pnpm install, pnpm lint, pnpm type-check, pnpm test, pnpm build
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is strict JSON; metaheader is stored here per project policy.
