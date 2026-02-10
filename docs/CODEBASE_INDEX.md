# Codebase Index

Status: INCOMPLETE. Entries will be added as each file is audited.

## Index

- [package.json](package.json)
  - Meta: [docs/file-meta/package.json.md](docs/file-meta/package.json.md)
  - Role: root tooling and scripts for monorepo
- [pnpm-workspace.yaml](pnpm-workspace.yaml)
  - Meta: [docs/file-meta/pnpm-workspace.yaml.md](docs/file-meta/pnpm-workspace.yaml.md)
  - Role: workspace package discovery for pnpm
- [turbo.json](turbo.json)
  - Meta: [docs/file-meta/turbo.json.md](docs/file-meta/turbo.json.md)
  - Role: Turbo task pipeline and caching rules
- [.pnpmrc](.pnpmrc)
  - Meta: [docs/file-meta/.pnpmrc.md](docs/file-meta/.pnpmrc.md)
  - Role: pnpm install behavior and peer dependency enforcement
- [.npmrc](.npmrc)
  - Meta: [docs/file-meta/.npmrc.md](docs/file-meta/.npmrc.md)
  - Role: npm registry configuration
- [.editorconfig](.editorconfig)
  - Role: editor formatting defaults
- [.env.example](.env.example)
  - Role: environment variable template for local setup
- [.eslintignore](.eslintignore)
  - Role: ESLint ignore rules
- [.gitignore](.gitignore)
  - Role: git ignore rules for generated and local files
- [.markdownlint.json](.markdownlint.json)
  - Meta: [docs/file-meta/.markdownlint.json.md](docs/file-meta/.markdownlint.json.md)
  - Role: markdownlint configuration
- [.prettierignore](.prettierignore)
  - Role: Prettier ignore rules
- [.prettierrc](.prettierrc)
  - Meta: [docs/file-meta/.prettierrc.md](docs/file-meta/.prettierrc.md)
  - Role: Prettier formatting configuration
- [ANALYSIS.md](ANALYSIS.md)
  - Role: legacy analysis (UNVERIFIED)
- [CONFIG.md](CONFIG.md)
  - Role: configuration overview (partially verified)
- [CONTRIBUTING.md](CONTRIBUTING.md)
  - Role: contributor guide (partially verified)
- [docker-compose.yml](docker-compose.yml)
  - Meta: [docs/file-meta/docker-compose.yml.md](docs/file-meta/docker-compose.yml.md)
  - Role: local Docker Compose dev service
- [jest.config.js](jest.config.js)
  - Role: Jest root configuration
- [jest.helpers.ts](jest.helpers.ts)
  - Role: shared Jest test utilities
- [jest.setup.js](jest.setup.js)
  - Role: Jest global setup
- [LICENSE](LICENSE)
  - Meta: [docs/file-meta/LICENSE.md](docs/file-meta/LICENSE.md)
  - Role: repository license text
- [README.md](README.md)
  - Role: repository overview (partially verified)
- [SECURITY.md](SECURITY.md)
  - Role: security policy (partial, placeholder contact)
- [tasks.md](tasks.md)
  - Role: audit task tracker
- [TODO.md](TODO.md)
  - Role: implementation backlog (unverified)
- [tsconfig.base.json](tsconfig.base.json)
  - Meta: [docs/file-meta/tsconfig.base.json.md](docs/file-meta/tsconfig.base.json.md)
  - Role: shared TypeScript compiler options
- [tsconfig.json](tsconfig.json)
  - Meta: [docs/file-meta/tsconfig.json.md](docs/file-meta/tsconfig.json.md)
  - Role: root TypeScript config
- [apps/web/app/layout.tsx](apps/web/app/layout.tsx)
  - Role: Next.js root layout shell and metadata
- [apps/web/app/page.tsx](apps/web/app/page.tsx)
  - Role: home page composition
- [apps/web/app/providers.tsx](apps/web/app/providers.tsx)
  - Role: client providers wrapper and error boundary
- [apps/web/app/loading.tsx](apps/web/app/loading.tsx)
  - Role: global loading UI for route segments
- [apps/web/app/not-found.tsx](apps/web/app/not-found.tsx)
  - Role: custom 404 UI
- [apps/web/app/robots.ts](apps/web/app/robots.ts)
  - Role: robots.txt metadata route
- [apps/web/app/sitemap.ts](apps/web/app/sitemap.ts)
  - Role: sitemap.xml metadata route
- [apps/web/app/api/og/route.tsx](apps/web/app/api/og/route.tsx)
  - Role: Open Graph image generation route
- [apps/web/app/about/page.tsx](apps/web/app/about/page.tsx)
  - Role: about page story, values, and CTAs
- [apps/web/app/blog/page.tsx](apps/web/app/blog/page.tsx)
  - Role: blog index and category filters
- [apps/web/app/blog/[slug]/page.tsx](apps/web/app/blog/[slug]/page.tsx)
  - Role: blog post detail view
- [apps/web/app/book/page.tsx](apps/web/app/book/page.tsx)
  - Role: booking request page
- [apps/web/app/contact/page.tsx](apps/web/app/contact/page.tsx)

  # Codebase Index

  This document has been consolidated into [docs/MASTER.md](MASTER.md).
  Tasks and issues are tracked in [TODO.md](../TODO.md).

  - Role: pricing menu and FAQs
