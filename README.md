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
- ✅ **Verified**: Next.js 15.2.9 and React 19.0.0 in [apps/web/package.json](apps/web/package.json)
- ✅ **Verified**: All quality gates passing (lint, type-check, build, test)
- ✅ **Verified**: Security monitoring active and vulnerabilities remediated

Professional hair salon website template monorepo built with modern web technologies and comprehensive security practices.

## Quick Start

### Prerequisites

- **Node.js** `>=24.0.0` (enforced via [package.json engines](package.json))
- **pnpm** `10.29.2` (enforced via [packageManager](package.json))

### Installation

```bash
# Install dependencies (pnpm required)
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Application runs on http://localhost:3000
```

### Building

```bash
# Build all packages
pnpm build

# Start production server
pnpm start
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
├── apps/
│   └── web/                 # Next.js 15 web application
├── packages/
│   ├── ui/                  # Shared React UI components
│   ├── utils/               # Shared utilities
│   └── config/              # Shared configurations (TS, ESLint)
├── docs/                    # Documentation
├── infrastructure/          # Deployment and infrastructure
└── scripts/                 # Utility scripts
```

## Technology Stack

- **Frontend Framework:** Next.js 15.2.9 ([apps/web/package.json](apps/web/package.json))
- **UI Library:** React 19.0.0 ([apps/web/package.json](apps/web/package.json))
- **Styling:** Tailwind CSS 3.4.17 ([apps/web/package.json](apps/web/package.json))
- **Type Safety:** TypeScript 5.7.2 ([package.json](package.json))
- **Linting:** ESLint 9 with flat config ([packages/config/eslint-config/](packages/config/eslint-config/))
- **Code Formatting:** Prettier 3.2.5 ([package.json](package.json))
- **Package Manager:** pnpm 10.29.2 ([package.json](package.json))
- **Monorepo Tool:** Turbo 2.2.3 ([package.json](package.json))
- **Error Tracking:** Sentry 8.0.0 ([apps/web/package.json](apps/web/package.json))
- **Container:** Docker & Docker Compose ([docker-compose.yml](docker-compose.yml))
- **Security:** Automated dependency scanning, SBOM generation, secret scanning

## Documentation

- **[CONFIG.md](CONFIG.md)** - Detailed configuration documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines and setup
- **[docs/TEMPLATE_SETUP.md](docs/TEMPLATE_SETUP.md)** - Template setup and integration guide
- **[docs/INTEGRATION_GUARDRAILS.md](docs/INTEGRATION_GUARDRAILS.md)** - Consent, performance, and tracking guardrails
- **[SECURITY.md](SECURITY.md)** - Security policy and vulnerability reporting
- **[docs/TESTING_STATUS.md](docs/TESTING_STATUS.md)** - Comprehensive testing verification and quality gates
- **[docs/VERSION_POLICY.md](docs/VERSION_POLICY.md)** - Evergreen maintenance and upgrade policy
- **[docs/SECURITY_MONITORING_STATUS.md](docs/SECURITY_MONITORING_STATUS.md)** - Security monitoring verification

## Available Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start development server         |
| `pnpm build`        | Build all packages and apps      |
| `pnpm start`        | Start production server          |
| `pnpm lint`         | Run ESLint across workspace      |
| `pnpm type-check`   | Run TypeScript type checking     |
| `pnpm test`         | Run tests                        |
| `pnpm format`       | Format code with Prettier        |
| `pnpm format:check` | Check formatting without changes |

## Docker

Build and run locally with Docker Compose:

```bash
docker-compose up -d
```

Application will be available at `http://localhost:3000`

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

1. Check [CONFIG.md](CONFIG.md) for configuration troubleshooting
2. Review [CONTRIBUTING.md](CONTRIBUTING.md) for setup help
3. Open a GitHub issue with details
