# Contributing

> **Last Updated:** 2026-01-03  
> **Canonical Status:** Canonical  
> **Purpose:** Development workflow and contribution guidelines  
> **See Also:** [SETUP.md](./SETUP.md), [DOCS_INDEX.md](../DOCS_INDEX.md)

## Development Workflow
1. Create feature branch from `main`: `git checkout -b feature/your-feature-name`
2. Make changes following code style (Prettier + ESLint)
3. Add or update tests as needed
4. Update documentation if applicable
5. Submit pull request with clear description

## Code Standards
- Follow Prettier formatting (runs automatically on commit)
- Pass all ESLint rules (TypeScript + React best practices)
- Document components with JSDoc comments
- Keep commits focused and atomic
- Write meaningful commit messages using Conventional Commits format

## Pull Request Requirements
- [ ] All tests pass (`pnpm test`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No ESLint warnings (`pnpm lint`)
- [ ] Production build succeeds (`pnpm build`)
- [ ] Documentation updated for user-facing changes
- [ ] Lighthouse scores remain >90 for affected pages

## Commit Message Format
Use Conventional Commits format:
```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(homepage): add testimonials section
fix(contact): resolve form validation issue
docs(readme): update installation instructions
```

## Testing
```bash
# Run test suite
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix
```

## Before Submitting PR
1. Rebase on latest `main`
2. Run all checks: `pnpm check`
3. Test production build: `pnpm build && pnpm preview`
4. Write clear PR description

## Questions?
Open an issue for bugs or feature requests.
