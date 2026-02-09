# Technology Stack

## Build System

- **Monorepo Tool:** Turbo 2.2.3
- **Package Manager:** pnpm 10.29.2 (strictly enforced)
- **Node Version:** >=20.0.0 (required)

## Frontend Stack

- **Framework:** Next.js 15.1.6 (App Router)
- **React:** 19.0.0
- **TypeScript:** 5.7.2 (strict mode enabled)
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React 0.344.0
- **Validation:** Zod 3.22.4
- **Error Tracking:** Sentry 8.0.0

## Code Quality

- **Linting:** ESLint 9.18.0 (flat config format)
- **Formatting:** Prettier 3.2.5
- **Testing:** Jest 30.2.0 with React Testing Library

## TypeScript Configuration

Strict mode with additional safety:

- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noUncheckedIndexedAccess: true`
- `noFallthroughCasesInSwitch: true`
- No `any` types allowed

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Building
pnpm build            # Build all packages and apps
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript type checking
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting without changes

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
```

## Deployment

- **Container:** Docker & Docker Compose support
- **Command:** `docker-compose up -d` for local containerized deployment

## Package Management Rules

- Use `pnpm add -w` for workspace root dependencies
- Use `pnpm add` from package directory for package-specific deps
- Internal packages use `workspace:*` protocol
- React is a peer dependency in shared packages, direct dependency in apps
