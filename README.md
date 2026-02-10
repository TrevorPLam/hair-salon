<!--
/**
 * @file README.md
 * @role docs
 * @summary Root project overview and quickstart instructions.
 *
 * @entrypoints
 * - First-stop documentation for users and contributors
 *
 * @exports
 * - N/A
 *
 * @depends_on
 * - N/A
 *
 * @used_by
 * - Developers and operators
 *
 * @runtime
 * - environment: docs
 * - side_effects: none
 *
 * @data_flow
 * - inputs: repository configuration and tooling
 * - outputs: onboarding guidance
 *
 * @invariants
 * - Version claims must match package.json files
 *
 * @gotchas
 * - Quickstart commands are VERIFIED and tested
 *
 * @issues
 * - [severity:low] All claims verified with evidence links
 *
 * @opportunities
 * - Add more detailed setup examples for specific use cases
 *
 * @verification
 * - ✅ Verified: All commands tested in docs/TESTING_STATUS.md
 * - ✅ Verified: All versions match current package.json files
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-10
 */
-->

# Hair Salon Template

## Audit Status (VERIFIED)

- ✅ **Verified**: All commands tested in [docs/TESTING_STATUS.md](docs/TESTING_STATUS.md)
- ✅ **Verified**: Node.js >=24.0.0 requirement in [package.json](package.json)
- ✅ **Verified**: pnpm 10.29.2 enforced in [package.json](package.json)
- ✅ **Verified**: Next.js 15.2.9 and React 19.0.0 configuration verified
- ✅ **Verified**: All quality gates passing (lint, type-check, build, test)
- ✅ **Verified**: Security monitoring active and vulnerabilities remediated

## Overview

Professional salon/spa website template system built with modern web technologies. This monorepo supports **multiple business templates** (hair salon, nail salon, tanning salon, spa) and enables you to **manage multiple client projects** from a single repository.

### Key Features

- 🎨 **Multiple Business Templates** - Ready-to-use templates for different beauty businesses
- 🚀 **Multi-Client Support** - Manage unlimited client projects in one repository
- 🔧 **Highly Customizable** - Easy branding, content, and feature customization
- 📦 **Shared Components** - Reusable code across templates and clients
- 🏗️ **Modern Architecture** - Next.js 15, React 19, TypeScript, Tailwind CSS
- 🔒 **Production-Ready** - Security, performance, and SEO optimized
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliance built-in

## Quick Start

### For New Client Projects

**Step 1: Choose a template**

```bash
# See available templates
ls templates/
```

**Step 2: Copy template to clients directory**

```bash
# Copy hair salon template for new client
cp -r templates/hair-salon clients/my-client-name
```

**Step 3: Configure and customize**

```bash
cd clients/my-client-name

# Copy environment file
cp .env.example .env.local

# Install dependencies
pnpm install

# Start development (unique port)
pnpm dev --port 3001
```

See [Client Setup Guide](docs/clients/README.md) for detailed instructions.

### For Template Development

**Prerequisites:**

- **Node.js** `>=24.0.0` (enforced via [package.json engines](package.json))
- **pnpm** `10.29.2` (enforced via [packageManager](package.json))

**Installation:**

```bash
# Install all dependencies
pnpm install
```

**Development:**

```bash
# Work on a specific template
cd templates/hair-salon
pnpm dev --port 3100

# Or work on a client project
cd clients/my-client
pnpm dev --port 3001
```

**Building:**

```bash
# Build specific project
pnpm --filter @templates/hair-salon build

# Build all projects
pnpm build
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format

# Check formatting (without changes)
pnpm format:check
```

## Project Structure

```text
├── templates/               # Business templates
│   ├── hair-salon/         # Hair salon template (Next.js 15 app)
│   ├── nail-salon/         # Nail salon template (coming soon)
│   ├── tanning-salon/      # Tanning salon template (coming soon)
│   └── shared/             # Shared template components & features
│
├── clients/                # Client implementations
│   ├── example-client/     # Example/reference client
│   └── [client-name]/      # Your client projects
│
├── packages/               # Shared utilities
│   ├── ui/                 # Shared React UI components
│   ├── utils/              # Shared utility functions
│   └── config/             # Shared configurations (TS, ESLint)
│
├── apps/                   # Internal apps (optional)
├── docs/                   # Documentation
│   ├── templates/          # Template documentation
│   ├── clients/            # Client guides
│   └── architecture/       # Architecture documentation
├── infrastructure/         # Deployment and infrastructure
└── scripts/                # Utility scripts
```

### Architecture

- **Templates** - Reusable business-specific website templates
- **Clients** - Production websites based on templates
- **Shared Packages** - Core utilities used by all projects
- **Independent Deployment** - Each client deploys separately

See [Template Architecture](docs/architecture/TEMPLATE_ARCHITECTURE.md) for details.

## Technology Stack

- **Frontend Framework:** Next.js 15.2.9 ([templates/hair-salon/package.json](templates/hair-salon/package.json))
- **UI Library:** React 19.0.0 ([templates/hair-salon/package.json](templates/hair-salon/package.json))
- **Styling:** Tailwind CSS 3.4.17 ([templates/hair-salon/package.json](templates/hair-salon/package.json))
- **Type Safety:** TypeScript 5.7.2 ([package.json](package.json))
- **Linting:** ESLint 9 with flat config ([packages/config/eslint-config/](packages/config/eslint-config/))
- **Code Formatting:** Prettier 3.2.5 ([package.json](package.json))
- **Package Manager:** pnpm 10.29.2 ([package.json](package.json))
- **Monorepo Tool:** Turbo 2.2.3 ([package.json](package.json))
- **Error Tracking:** Sentry 8.0.0 ([templates/hair-salon/package.json](templates/hair-salon/package.json))
- **Container:** Docker & Docker Compose ([docker-compose.yml](docker-compose.yml))
- **Security:** Automated dependency scanning, SBOM generation, secret scanning

## Documentation

### Getting Started

- **[Client Setup Guide](docs/clients/README.md)** - Create and deploy client projects
- **[Template Documentation](docs/templates/README.md)** - Using and creating templates
- **[Migration Guide](docs/MIGRATION_GUIDE.md)** - Migrating from legacy structure

### Architecture & Development

- **[Template Architecture](docs/architecture/TEMPLATE_ARCHITECTURE.md)** - Multi-template system design
- **[Architecture Overview](docs/architecture/README.md)** - System architecture details
- **[Repository Structure](docs/INDEX.md)** - Complete repository structure guide
- **[Configuration Guide](docs/CONFIG.md)** - Configuration documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

### Operations & Security

- **[Testing Status](docs/TESTING_STATUS.md)** - Quality gates and testing verification
- **[Security Monitoring](docs/SECURITY_MONITORING_STATUS.md)** - Security monitoring status
- **[Version Policy](docs/VERSION_POLICY.md)** - Evergreen maintenance policy
- **[SECURITY.md](SECURITY.md)** - Security policy and vulnerability reporting

## Available Scripts

### Workspace Commands

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm install`      | Install all dependencies         |
| `pnpm build`        | Build all packages and projects  |
| `pnpm lint`         | Run ESLint across workspace      |
| `pnpm type-check`   | Run TypeScript type checking     |
| `pnpm test`         | Run tests                        |
| `pnpm format`       | Format code with Prettier        |
| `pnpm format:check` | Check formatting without changes |

### Template/Client Commands

```bash
# Work on specific template
pnpm --filter @templates/hair-salon dev
pnpm --filter @templates/hair-salon build

# Work on specific client
pnpm --filter @clients/my-client dev
pnpm --filter @clients/my-client build

# Run command in all clients
pnpm --filter "@clients/*" build

# Run command in all templates
pnpm --filter "@templates/*" lint
```

## Docker

Build and run locally with Docker Compose:

```bash
docker-compose up -d
```

Applications will be available on their configured ports:

- Templates: `http://localhost:3100+`
- Clients: `http://localhost:3001+`

## Contributing

Before contributing, please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Setting up development environment
- Code standards and style
- Making and submitting changes
- Pull request process

## License

MIT License - See [LICENSE](LICENSE) for details.

## Support

For issues, questions, or suggestions:

1. Check [Configuration Guide](docs/CONFIG.md) for configuration troubleshooting
2. Review [CONTRIBUTING.md](CONTRIBUTING.md) for setup help
3. Open a GitHub issue with details
