# File Meta: turbo.json

/\*\*

- @file turbo.json
- @role config
- @summary Defines the Turbo pipeline tasks, dependencies, and cache behavior for the monorepo.
-
- @entrypoints
- - turbo run <task> via root scripts in package.json
- - CI invokes pnpm scripts that call turbo
-
- @exports
- - N/A
-
- @depends_on
- - External: turbo task runner
-
- @used_by
- - package.json scripts
- - .github/workflows/ci.yml
-
- @runtime
- - environment: build
- - side_effects: controls task ordering, caching, and outputs
-
- @data_flow
- - inputs: task definitions in this file
- - outputs: cached artifacts (.next, dist, build, coverage)
-
- @invariants
- - build must depend on upstream ^build for package graph correctness
- - dev must be non-cached and persistent for watch mode
-
- @gotchas
- - test depends on build, so slow builds will delay test runs
-
- @issues
- - [severity:low] None observed in-file.
-
- @opportunities
- - Consider adding explicit outputs for any new packages to improve caching
-
- @verification
- - Run: pnpm build, pnpm lint, pnpm type-check, pnpm test to verify pipeline
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is strict JSON; metaheader is stored here per project policy.
