# AI Governance Layer

## Purpose

This directory contains the complete governance system for AI agents working on hair salon monorepo. It provides explicit rules, patterns, and examples that agents must follow to maintain architectural integrity, performance standards, and security compliance.

---

@ai-governance This file defines the governance layer structure and navigation for AI agents.

## How Agents Should Use This Layer

1. **Always start with `AGENT_SYSTEM.md`** - Read the constitutional rules first
2. **Check patterns before implementing** - Look in `ai/patterns/` for established solutions
3. **Reference examples** - Use `ai/examples/` as canonical implementations
4. **Run checklists** - Validate work with `ai/checklists/` before completion
5. **Follow priority order** - Documents below are ordered by importance

## Priority Order of Documents

### 🔴 Critical (Must Read First)

- [`AGENT_SYSTEM.md`](./AGENT_SYSTEM.md) - Constitutional rules and architectural requirements
- [`AI_MANIFEST.json`](../AI_MANIFEST.json) - Machine-readable constraints and thresholds

### 🟡 High Priority (Reference Frequently)

- [`patterns/`](./patterns/) - Implementation patterns and anti-patterns
- [`performance/`](./performance/) - Performance doctrine and budgets
- [`security/`](./security/) - Security standards and requirements
- [`testing/`](./testing/) - Testing doctrine and patterns

### 🟢 Medium Priority (Domain-Specific)

- [`marketing/`](./marketing/) - Marketing intelligence and conversion optimization
- [`design/`](./design/) - Design system and component rules
- [`examples/`](./examples/) - Golden reference implementations

### 🟠 Critical Reference (Next.js & Framework)

- [`references/nextjs-god-tier.md`](./references/nextjs-god-tier.md) - **God Tier Next.js Reference (Feb 2026)** — authoritative guide for production Next.js patterns, CVE patches, async‑first APIs, Edge‑compatible security, React 19 forms, caching model, and `after()` background tasks. Cross‑referenced by TODO.md tasks.

### 🔵 Reference (As Needed)

- [`checklists/`](./checklists/) - Validation checklists
- [`decisions/`](./decisions/) - Architectural decision logs
- [`references/`](./references/) - Canonical framework references

## Quick Reference

| Need                        | Location                                  |
| --------------------------- | ----------------------------------------- |
| **Integration rules**       | `patterns/integration-adapter-pattern.md` |
| **API route structure**     | `patterns/api-route-pattern.md`           |
| **Performance budgets**     | `performance/lighthouse-budget.md`        |
| **Security requirements**   | `security/security-standards.md`          |
| **Testing patterns**        | `testing/test-patterns.md`                |
| **Marketing copy formulas** | `marketing/hero-frameworks.md`            |
| **Design tokens**           | `design/design-tokens.md`                 |
| **Next.js God Tier patterns** | `references/nextjs-god-tier.md`         |
| **CVE patch matrix**        | `references/nextjs-god-tier.md` §5.1      |

## Enforcement

- All code changes must comply with `AGENT_SYSTEM.md`
- Patterns in `ai/patterns/` are mandatory, not suggestions
- Examples in `ai/examples/` are canonical implementations
- Checklists in `ai/checklists/` must pass before PR submission
- `AI_MANIFEST.json` provides automated validation constraints

## Link to System Documentation

This AI layer complements the main project documentation:

- [Main README](../README.md) - Project overview and setup
- [Architecture docs](../docs/architecture/) - Technical architecture
- [API docs](../docs/api/) - API specifications
- [TODO.md](../TODO.md) - Development roadmap

---

**Remember**: This layer is law for AI agents. No ambiguity, no exceptions.
