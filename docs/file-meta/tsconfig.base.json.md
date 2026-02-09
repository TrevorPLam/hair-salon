# File Meta: tsconfig.base.json

/\*\*

- @file tsconfig.base.json
- @role config
- @summary Base TypeScript compiler options shared across the monorepo.
-
- @entrypoints
- - Extended by tsconfig.json and package/app tsconfigs
-
- @exports
- - N/A
-
- @depends_on
- - External: TypeScript compiler
-
- @used_by
- - tsconfig.json
- - apps/web/tsconfig.json
- - packages/\*/tsconfig.json
-
- @runtime
- - environment: build
- - side_effects: compiler behavior, strictness, and module settings
-
- @data_flow
- - inputs: TypeScript source files
- - outputs: type-check results and build artifacts
-
- @invariants
- - strict=true and noUnused\* rules enforce hygiene
-
- @gotchas
- - moduleResolution=bundler requires compatible tooling
-
- @issues
- - [severity:low] None observed in-file.
-
- @opportunities
- - Add path aliases only in leaf configs to avoid cross-package bleed
-
- @verification
- - Run: pnpm type-check and confirm no unexpected type errors
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is strict JSON; metaheader is stored here per project policy.
