# File Meta: tsconfig.json

/\*\*

- @file tsconfig.json
- @role config
- @summary Root composite TypeScript config that extends tsconfig.base.json.
-
- @entrypoints
- - Used by tooling that targets the repo root
-
- @exports
- - N/A
-
- @depends_on
- - Internal: tsconfig.base.json
- - External: TypeScript compiler
-
- @used_by
- - pnpm type-check (via tooling that loads root tsconfig)
-
- @runtime
- - environment: build
- - side_effects: controls root-level type-check behavior
-
- @data_flow
- - inputs: referenced tsconfig files and TypeScript sources
- - outputs: type-check results
-
- @invariants
- - composite=true allows project references if added later
-
- @gotchas
- - include/files are empty; relies on referenced configs
-
- @issues
- - [severity:low] None observed in-file.
-
- @opportunities
- - Add references if project references are introduced
-
- @verification
- - Run: pnpm type-check and confirm root config is respected
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is strict JSON; metaheader is stored here per project policy.
