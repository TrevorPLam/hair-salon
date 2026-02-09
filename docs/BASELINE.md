# Baseline Snapshot

Date: 2026-02-09

## Versions and Enforcement

- Node
  - engines: >=20.0.0 in package.json
  - CI: actions/setup-node uses 20.x in .github/workflows/ci.yml
  - Docker: node:20-alpine in apps/web/Dockerfile
- pnpm
  - packageManager: pnpm@10.29.2 in package.json
  - CI: pnpm/action-setup uses 10.29.2 in .github/workflows/ci.yml
  - Config: .pnpmrc sets prefer-frozen-lockfile=true
- Turbo
  - devDependency: turbo 2.2.3 in package.json

## Workspace Graph

- Root workspaces: apps/_ and packages/_ in package.json
- pnpm-workspace.yaml matches apps/_ and packages/_

## Turbo Pipeline and Cache Behavior

From turbo.json:

- build: dependsOn ^build; outputs .next/** (excluding .next/cache), dist/**, build/\*\*
- dev: cache=false, persistent=true
- lint: dependsOn ^lint
- type-check: dependsOn ^type-check
- test: dependsOn ^build; outputs coverage/**; inputs src/**/\*.ts(x), **/**tests**/**, jest.config.js
- format and format:check: cache=false

## Next.js Entry Points and Runtime Mode

- App router: apps/web/app/\* (layout.tsx, page.tsx, route files)
- Middleware: apps/web/middleware.ts
- Metadata routes: apps/web/app/robots.ts, apps/web/app/sitemap.ts
- Runtime modes (by file intent, verify at runtime):
  - Server components: apps/web/app/layout.tsx, apps/web/app/page.tsx
  - Edge middleware: apps/web/middleware.ts (Next.js middleware)

## Commands (Not Executed)

All commands below are UNVERIFIED. Run them to record actual results.

- pnpm install
  - TODO(verify): run `pnpm install` and log output in docs/TESTING_STATUS.md
- pnpm lint
  - TODO(verify): run `pnpm lint` and log output in docs/TESTING_STATUS.md
- pnpm type-check
  - TODO(verify): run `pnpm type-check` and log output in docs/TESTING_STATUS.md
- pnpm test / coverage
  - TODO(verify): run `pnpm test` and `pnpm test:coverage` and log output in docs/TESTING_STATUS.md
- pnpm build
  - TODO(verify): run `pnpm build` and log output in docs/TESTING_STATUS.md
- pnpm start or docker-compose up -d
  - TODO(verify): run `pnpm --filter @repo/web start` or `docker-compose up -d` and log output in docs/TESTING_STATUS.md
