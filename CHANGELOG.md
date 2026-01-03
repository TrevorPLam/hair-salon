# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Documentation
- Completed dependency health review (2026-01-03)
- Added dependency update policy to DEPENDENCY_HEALTH.md.md
- Documented MDX architecture decision (ADR-004)
- Documented clsx + tailwind-merge utility pattern (ADR-005)
- Created T-DEP-001 task for next-pwa evaluation

## [0.1.0] - 2024-12-26

### Added
- Initial release of Your Dedicated Marketer marketing website
- Next.js 14 App Router with static site generation
- Blog functionality with MDX support
- Contact form with email integration via Resend
- Responsive design with Tailwind CSS
- Error tracking with Sentry
- PWA support with next-pwa
- Testing infrastructure (Vitest + Playwright)
- Security headers and CORS configuration

### Security
- Implemented rate limiting for contact form
- Added security headers via middleware
- Configured Sentry error tracking
- Input validation with Zod schemas

---

## Changelog Guidelines

### When to Update
- Add entries when dependency changes affect user-facing behavior
- Document breaking changes immediately
- Record security patches and vulnerability fixes
- Note major feature additions or architectural changes

### Categories
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes or improvements
- **Dependencies** - Significant dependency updates

### Dependency Changes
Per DEPENDENCY_HEALTH.md.md:
- Document dependency additions with justification
- Note dependency removals and what replaced them
- Record major version upgrades with impact summary
- Link to related TODO.md or DECISIONS.md entries
