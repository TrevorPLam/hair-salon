# AGENTS.md — Agent Instructions (Root)

Last Updated: 2026-01-21
Applies To: Any coding/documentation agent operating in this repo

**Quick Reference:** See `/BESTPR.md` for comprehensive technical standards and best practices.

## Authority order
1) `CODEBASECONSTITUTION.md`
2) `READMEAI.md`
3) `P0TODO.md`, `P1TODO.md`, `P2TODO.md`, `P3TODO.md`
4) `BESTPR.md` (technical standards and best practices)
5) Audit runbooks (`CODEAUDIT.md`, `SECURITYAUDIT.md`, etc.)
6) `specs/` (non-binding notes)

## Non-negotiables
- Do not invent facts about the repo. Use **UNKNOWN** + cite what you checked.
- If requirements are ambiguous, ask questions before implementing.
- `P0TODO.md`, `P1TODO.md`, `P2TODO.md`, `P3TODO.md` are the task truth sources. Do not auto-edit them except to add/update tasks.
- Secrets must never be committed.

## Output expectations
- Prefer small, reversible diffs.
- Every change must include verification (tests/lint/build or observable behavior).
- When you create tasks, include exact file paths and acceptance criteria.

## Cost control
- Assume GitHub Actions are OFF by default. See `githubactions/README.md`.
- Prefer local scripts and manual checks over paid services.

