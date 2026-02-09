# File Meta: pnpm-workspace.yaml

/\*\*

- @file pnpm-workspace.yaml
- @role config
- @summary Defines the pnpm workspace package globs for the monorepo.
-
- @entrypoints
- - pnpm reads this during install to discover workspace packages
-
- @exports
- - N/A
-
- @depends_on
- - External: pnpm workspace resolver
-
- @used_by
- - package.json (workspaces config should align)
- - pnpm install commands
-
- @runtime
- - environment: build
- - side_effects: determines which packages are installed and linked
-
- @data_flow
- - inputs: glob patterns in this file
- - outputs: workspace package list
-
- @invariants
- - Must include apps/_ and packages/_ to match repo structure
-
- @gotchas
- - Missing a workspace path will silently exclude that package from installs
-
- @issues
- - [severity:low] None observed in-file.
-
- @opportunities
- - Add additional globs if new top-level package roots are added
-
- @verification
- - Run: pnpm install and confirm packages under apps/ and packages/ are linked
-
- @status
- - confidence: high
- - last_audited: 2026-02-09
    \*/

## Commentary

- This file is YAML; metaheader is stored here per project policy.
