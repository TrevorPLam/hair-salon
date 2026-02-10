# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the multi-template monorepo project. ADRs document important architectural decisions made during the development process.

**Note:** Some ADRs were created for the original single-app structure. ADR-011 documents the restructuring to multi-template architecture.

## What is an ADR?

An Architecture Decision Record is a short text file that captures an important architectural decision along with its context and consequences. Each ADR follows a standardized format to ensure consistency and readability.

## ADR Format

Each ADR follows this structure:

- **Title**: Short, descriptive title
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Context**: What is the issue that we're facing?
- **Decision**: What are we going to do?
- **Consequences**: What becomes easier or harder as a result?

## ADR Index

| ADR                                             | Title                                     | Status   | Date       |
| ----------------------------------------------- | ----------------------------------------- | -------- | ---------- |
| [ADR-001](./001-technology-stack.md)            | Technology Stack Selection                | Accepted | 2024-06-15 |
| [ADR-002](./002-nextjs-framework.md)            | Next.js Framework Choice                  | Accepted | 2024-06-15 |
| [ADR-003](./003-database-selection.md)          | Database Selection (Supabase)             | Accepted | 2024-06-15 |
| [ADR-004](./004-styling-approach.md)            | Styling Approach (Tailwind CSS)           | Accepted | 2024-06-15 |
| [ADR-005](./005-content-management.md)          | Content Management Strategy (MDX)         | Accepted | 2024-06-15 |
| [ADR-006](./006-search-implementation.md)       | Search Implementation (Client-side)       | Accepted | 2024-06-15 |
| [ADR-007](./007-analytics-consent.md)           | Analytics and Consent Management          | Accepted | 2024-06-15 |
| [ADR-008](./008-monorepo-structure.md)          | Monorepo Structure (Turborepo)            | Accepted | 2024-06-15 |
| [ADR-009](./009-testing-strategy.md)            | Testing Strategy (Jest + RTL)             | Accepted | 2024-06-15 |
| [ADR-010](./010-deployment-strategy.md)         | Deployment Strategy (Vercel/Netlify)      | Accepted | 2024-06-15 |
| [ADR-011](./011-multi-template-architecture.md) | Multi-Template, Multi-Client Architecture | Accepted | 2026-02-10 |

## How to Add a New ADR

1. Create a new file named `XXX-title.md` where XXX is the next sequential number
2. Use the ADR template below
3. Add the ADR to the index table above
4. Submit a pull request for review

## ADR Template

```markdown
# ADR-XXX: [Title]

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

What is the issue that we're facing that motivates this decision?

## Decision

What are we going to do?

## Consequences

What becomes easier or harder as a result of this decision?
```

## Review Process

1. **Proposal**: ADRs start as "Proposed"
2. **Review**: Team reviews the ADR in a pull request
3. **Acceptance**: ADR is marked as "Accepted" after consensus
4. **Updates**: ADRs can be "Deprecated" or "Superseded" by newer decisions

## Maintenance

- Review ADRs quarterly for relevance
- Update "Superseded" ADRs with links to newer decisions
- Archive deprecated decisions but keep them for historical context
