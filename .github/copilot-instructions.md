# Copilot Instructions

## Product Context
- Product vision and roadmap: see **PRODUCT.md**.
- System architecture and boundaries: see **docs/ARCHITECTURE.md**.

## Repository Standards
- Follow `.repo/agents/QUICK_REFERENCE.md` and `.repo/repo.manifest.yaml` for commands.
- Keep scope small and align changes to tasks in `.repo/tasks/TODO.md`.
- Never commit secrets or `.env` files.
- Never wrap imports in try/catch.

## Engineering Expectations
- Use **Next.js App Router** patterns in `app/`.
- Keep UI in `components/` and business logic in `lib/`.
- Prefer functional React components.
- Use **React Query** for data fetching and **React Hook Form** for forms.

## Testing & Verification
- Use manifest commands only (e.g., `make lint`, `make test`, `make verify`).
- Provide verification evidence with exact commands.

## Output Quality
- Keep changes readable and consistent with existing patterns.
- Update documentation when behavior changes.
- Provide rollback guidance when changes are risky.
