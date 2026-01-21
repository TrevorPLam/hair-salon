# specs/AGENTS.md — Specifications & Ideas

Last Updated: 2026-01-21
Applies To: Any agent working in specs/

**Quick Reference:** See `/BESTPR.md` for comprehensive repo standards.

## Purpose
This folder contains non-binding specifications, design ideas, and exploratory documents. **Nothing here is authoritative** until converted into a task in `TODO.md`.

---

## Important: Non-Binding Status

**Files in this folder are NOT actionable.**

- Specs here are ideas, proposals, or historical context
- To make something actionable, create a task in `/TODO.md`
- Do not assume specs reflect current implementation
- Always verify against actual code

### Authority Hierarchy
1. `/CODEBASECONSTITUTION.md` (supreme)
2. `/AGENTS.md` + `/READMEAI.md`
3. `/TODO.md` (task truth source)
4. Audit runbooks
5. `/BESTPR.md`
6. **`/specs/` ← You are here (non-binding)**

---

## Structure

```
specs/
├── AGENTS.md           # This file
├── features/           # Feature proposals
├── architecture/       # Design explorations
├── research/           # Research notes
└── ...
```

---

## Document Types

### Feature Proposals
- **Purpose:** Describe potential new features
- **Status:** Exploratory (not approved)
- **Next step:** Create task in TODO.md to implement

### Architecture Explorations
- **Purpose:** Explore design alternatives
- **Status:** Thought experiments
- **Next step:** Document decision in `/docs/architecture/` if approved

### Research Notes
- **Purpose:** Gather information on technologies, patterns
- **Status:** Raw notes, not vetted
- **Next step:** Extract actionable items into TODO.md

---

## Spec Template

```markdown
# [Feature/Idea Name]

**Type:** [Feature | Architecture | Research]
**Status:** [Draft | Under Review | Approved | Rejected | Superseded]
**Author:** [Name or "AI Agent"]
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD

## Summary
One paragraph overview.

## Problem
What problem does this solve?

## Proposed Solution
How would this work?

## Alternatives Considered
What else was explored?

## Open Questions
What needs to be decided?

## Next Steps
- [ ] Convert to tasks in TODO.md
- [ ] Get owner approval
- [ ] Document in architecture/
```

---

## Adding a New Spec

1. **Determine type:** Feature, architecture, or research?
2. **Create file:** `specs/category/spec-name.md`
3. **Use template:** Follow structure above
4. **Mark status:** Always start with "Draft"
5. **Don't assume actionable:** This is exploration only

---

## Converting Spec to Tasks

When a spec is approved:

1. **Break down:** Identify discrete work items
2. **Create tasks:** Add to `/TODO.md` with proper schema
3. **Reference spec:** Link back to spec in task context
4. **Update spec status:** Mark as "Approved" and link to tasks

Example task reference:
```markdown
### T-XXX: Implement [feature name]
Context:
- Based on spec in `/specs/features/feature-name.md`
- Owner approved on YYYY-MM-DD
```

---

## Archiving Specs

When a spec is no longer relevant:

1. **Update status:** Change to "Rejected" or "Superseded"
2. **Add reason:** Explain why no longer relevant
3. **Move to archive:** (Optional) move to `/specs/archive/YYYY/`

---

## Don't

- ❌ Treat specs as authoritative (only TODO.md is)
- ❌ Implement features directly from specs (create tasks first)
- ❌ Assume specs reflect reality (verify against code)
- ❌ Commit specs without status field

---

**See also:** 
- `/BESTPR.md` for complete best practices guide
- `/TODO.md` for actionable work items
- `/CODEBASECONSTITUTION.md` for supreme authority
