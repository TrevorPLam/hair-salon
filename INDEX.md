# Repository Index

Status: INCOMPLETE. Will be updated as files are audited.

## Repo Map

- TODO(verify): Populate folder map from docs/FILE_INVENTORY.md.

## Quickstart

- TODO(verify): Add verified commands from docs/TESTING_STATUS.md.

## Architecture Overview

- TODO(verify): Summarize system architecture from docs/ARCHITECTURE_MAP.md.

## Route Catalog Summary

- See docs/ROUTE_CATALOG.md.

## Integrations Summary

- See docs/INTEGRATIONS_AUDIT.md.

## Package Graph

- TODO(verify): Add apps/packages graph after auditing package.json files.

## File Atlas

- Root
  - [package.json](package.json): Monorepo scripts, workspaces, and tool versions. See [docs/file-meta/package.json.md](docs/file-meta/package.json.md) for metaheader.
  - [pnpm-workspace.yaml](pnpm-workspace.yaml): Workspace globs for pnpm package discovery. See [docs/file-meta/pnpm-workspace.yaml.md](docs/file-meta/pnpm-workspace.yaml.md) for metaheader.
  - [turbo.json](turbo.json): Turbo pipeline tasks and caching outputs. See [docs/file-meta/turbo.json.md](docs/file-meta/turbo.json.md) for metaheader.
  - [.pnpmrc](.pnpmrc): pnpm install rules (peer deps, lockfile, hoisting). See [docs/file-meta/.pnpmrc.md](docs/file-meta/.pnpmrc.md) for metaheader.
  - [.npmrc](.npmrc): npm registry configuration. See [docs/file-meta/.npmrc.md](docs/file-meta/.npmrc.md) for metaheader.
  - [.editorconfig](.editorconfig): EditorConfig formatting rules for the repo.
  - [.env.example](.env.example): Environment variable template for local development.
  - [.eslintignore](.eslintignore): ESLint ignore patterns for generated and vendor paths.
  - [.gitignore](.gitignore): Git ignore rules for generated and local-only files.
  - [.markdownlint.json](.markdownlint.json): Markdown linting rules. See [docs/file-meta/.markdownlint.json.md](docs/file-meta/.markdownlint.json.md) for metaheader.
  - [.prettierignore](.prettierignore): Prettier ignore patterns for generated and vendor files.
  - [.prettierrc](.prettierrc): Prettier formatting rules. See [docs/file-meta/.prettierrc.md](docs/file-meta/.prettierrc.md) for metaheader.
  - [ANALYSIS.md](ANALYSIS.md): Legacy analysis; currently UNVERIFIED and pending re-audit.
  - [CONFIG.md](CONFIG.md): Configuration overview with partial verification notes.
  - [CONTRIBUTING.md](CONTRIBUTING.md): Contribution guide with partial verification notes.
  - [docker-compose.yml](docker-compose.yml): Local Docker Compose definition. See [docs/file-meta/docker-compose.yml.md](docs/file-meta/docker-compose.yml.md) for metaheader.
  - [jest.config.js](jest.config.js): Jest root configuration for monorepo tests.
  - [jest.helpers.ts](jest.helpers.ts): Shared Jest helper utilities for tests.
  - [jest.setup.js](jest.setup.js): Jest global setup and console suppression.
  - [LICENSE](LICENSE): MIT license text. See [docs/file-meta/LICENSE.md](docs/file-meta/LICENSE.md) for metaheader.
  - [README.md](README.md): Root overview with partial verification notes.
  - [SECURITY.md](SECURITY.md): Security policy (placeholder contact noted).
  - [tasks.md](tasks.md): Audit task tracker checklist.
  - [TODO.md](TODO.md): Implementation backlog (UNVERIFIED).
  - [tsconfig.base.json](tsconfig.base.json): Shared TypeScript compiler options. See [docs/file-meta/tsconfig.base.json.md](docs/file-meta/tsconfig.base.json.md) for metaheader.
  - [tsconfig.json](tsconfig.json): Root TypeScript config. See [docs/file-meta/tsconfig.json.md](docs/file-meta/tsconfig.json.md) for metaheader.
- apps/web/app
  - [apps/web/app/layout.tsx](apps/web/app/layout.tsx): Global app shell, metadata, CSP nonce, and shared UI wrappers.
  - [apps/web/app/page.tsx](apps/web/app/page.tsx): Home page composition and above-the-fold ordering.
  - [apps/web/app/providers.tsx](apps/web/app/providers.tsx): Client providers wrapper with error boundary and breadcrumbs.
  - [apps/web/app/loading.tsx](apps/web/app/loading.tsx): Global loading UI for route-level suspense.
  - [apps/web/app/not-found.tsx](apps/web/app/not-found.tsx): Custom 404 UI with recovery links.
  - [apps/web/app/robots.ts](apps/web/app/robots.ts): robots.txt metadata route.
  - [apps/web/app/sitemap.ts](apps/web/app/sitemap.ts): sitemap.xml metadata route.
  - [apps/web/app/about/page.tsx](apps/web/app/about/page.tsx): About page story, values, stats, and CTAs.
  - [apps/web/app/blog/page.tsx](apps/web/app/blog/page.tsx): Blog index with categories and post cards.
  - [apps/web/app/blog/[slug]/page.tsx](apps/web/app/blog/[slug]/page.tsx): Blog post detail view with structured data.
  - [apps/web/app/book/page.tsx](apps/web/app/book/page.tsx): Booking request form and salon info.
  - [apps/web/app/contact/page.tsx](apps/web/app/contact/page.tsx): Contact form, salon info, and reschedule CTA.
  - [apps/web/app/gallery/page.tsx](apps/web/app/gallery/page.tsx): Gallery grid with placeholder portfolio.
  - [apps/web/app/pricing/page.tsx](apps/web/app/pricing/page.tsx): Pricing menu, FAQs, and booking CTA.
  - [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx): Privacy policy content.
  - [apps/web/app/search/page.tsx](apps/web/app/search/page.tsx): Search experience powered by the site index.
  - [apps/web/app/services/page.tsx](apps/web/app/services/page.tsx): Services overview and CTAs.
  - [apps/web/app/services/coloring/page.tsx](apps/web/app/services/coloring/page.tsx): Coloring service detail.
  - [apps/web/app/services/haircuts/page.tsx](apps/web/app/services/haircuts/page.tsx): Haircuts service detail.
  - [apps/web/app/services/special-occasions/page.tsx](apps/web/app/services/special-occasions/page.tsx): Special occasions service detail.
  - [apps/web/app/services/treatments/page.tsx](apps/web/app/services/treatments/page.tsx): Treatments service detail.
  - [apps/web/app/team/page.tsx](apps/web/app/team/page.tsx): Team bios and hiring CTA.
  - [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx): Terms of Service template content.

## Quality Dashboard

- TODO(verify): Summarize top issues from docs/QUALITY_REPORT.md.
- Build/test status: UNVERIFIED (see docs/TESTING_STATUS.md).

## Audit Progress

- In progress. Completed: [package.json](package.json), [pnpm-workspace.yaml](pnpm-workspace.yaml), [turbo.json](turbo.json), [.pnpmrc](.pnpmrc), [.npmrc](.npmrc), [.editorconfig](.editorconfig), [.env.example](.env.example), [.eslintignore](.eslintignore), [.gitignore](.gitignore), [.markdownlint.json](.markdownlint.json), [.prettierignore](.prettierignore), [.prettierrc](.prettierrc), [ANALYSIS.md](ANALYSIS.md), [CONFIG.md](CONFIG.md), [CONTRIBUTING.md](CONTRIBUTING.md), [docker-compose.yml](docker-compose.yml), [jest.config.js](jest.config.js), [jest.helpers.ts](jest.helpers.ts), [jest.setup.js](jest.setup.js), [LICENSE](LICENSE), [README.md](README.md), [SECURITY.md](SECURITY.md), [tasks.md](tasks.md), [TODO.md](TODO.md), [tsconfig.base.json](tsconfig.base.json), [tsconfig.json](tsconfig.json), [apps/web/app/layout.tsx](apps/web/app/layout.tsx), [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/web/app/providers.tsx](apps/web/app/providers.tsx), [apps/web/app/loading.tsx](apps/web/app/loading.tsx), [apps/web/app/not-found.tsx](apps/web/app/not-found.tsx), [apps/web/app/robots.ts](apps/web/app/robots.ts), [apps/web/app/sitemap.ts](apps/web/app/sitemap.ts), [apps/web/app/about/page.tsx](apps/web/app/about/page.tsx), [apps/web/app/blog/page.tsx](apps/web/app/blog/page.tsx), [apps/web/app/blog/[slug]/page.tsx](apps/web/app/blog/[slug]/page.tsx), [apps/web/app/book/page.tsx](apps/web/app/book/page.tsx), [apps/web/app/contact/page.tsx](apps/web/app/contact/page.tsx), [apps/web/app/gallery/page.tsx](apps/web/app/gallery/page.tsx), [apps/web/app/pricing/page.tsx](apps/web/app/pricing/page.tsx), [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx), [apps/web/app/search/page.tsx](apps/web/app/search/page.tsx), [apps/web/app/services/page.tsx](apps/web/app/services/page.tsx), [apps/web/app/services/coloring/page.tsx](apps/web/app/services/coloring/page.tsx), [apps/web/app/services/haircuts/page.tsx](apps/web/app/services/haircuts/page.tsx), [apps/web/app/services/special-occasions/page.tsx](apps/web/app/services/special-occasions/page.tsx), [apps/web/app/services/treatments/page.tsx](apps/web/app/services/treatments/page.tsx), [apps/web/app/team/page.tsx](apps/web/app/team/page.tsx), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx).
