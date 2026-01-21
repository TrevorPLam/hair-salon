# docs/AGENTS.md — Documentation

Last Updated: 2026-01-21
Applies To: Any agent working in docs/

**Quick Reference:** See `/BESTPR.md` for comprehensive repo standards.

## Purpose
This folder contains all project documentation organized by category. Documentation must reflect reality and be updated when behavior changes.

---

## Structure

```
docs/
├── AGENTS.md              # This file
├── ARCHIVE/               # Historical documents (read-only)
│   ├── 2026/              # Year-based archives
│   ├── ops/               # Archived ops docs
│   └── product/           # Archived product docs
├── architecture/          # System design docs
├── ops/                   # Operational guides
├── product/               # Product specs
├── start-here/            # Onboarding guides
└── workflows/             # Process workflows
```

---

## Documentation Categories

### Governance (Root)
These files are the supreme authority for how the repo operates.

| File | Purpose |
|------|---------|
| `/CODEBASECONSTITUTION.md` | Non-negotiable rules (highest authority) |
| `/AGENTS.md` | How agents must behave |
| `/READMEAI.md` | Operating console, start here |
| `/BESTPR.md` | Technical best practices |
| `/P0TODO.md`, `/P1TODO.md`, `/P2TODO.md`, `/P3TODO.md` | Task truth sources |
| `/PROJECT_STATUS.md` | Current state + next step |

### Architecture
- System design decisions
- Data models
- Integration patterns
- Security architecture

### Operations (ops/)
- Deployment guides
- Monitoring setup
- Incident response
- Rollback procedures

### Product (product/)
- Feature specs
- User flows
- Design decisions

### Start Here (start-here/)
- Onboarding guides
- Quick start tutorials
- Development setup

### Workflows (workflows/)
- Release process
- Code review process
- Task management

---

## Documentation Standards

### File Naming
- **Format:** `SCREAMING_SNAKE_CASE.md` for governance docs
- **Format:** `kebab-case.md` for guides and specs
- **Prefix:** Use consistent prefixes (e.g., `DEPLOYMENT-`, `SECURITY-`)

### Document Header
```markdown
# Document Title

**Document Type:** [Governance | Guide | Spec | Runbook]
**Version:** X.Y.Z
**Last Updated:** YYYY-MM-DD
**Status:** [Active | Deprecated | Draft]

## Purpose
One paragraph explaining what this doc is for.
```

### Sections
- **Purpose:** Why this doc exists
- **Context:** Background information
- **Instructions:** Step-by-step if procedural
- **References:** Links to related docs
- **Version History:** Changes over time

---

## Writing Guidelines

### Clarity
- **Short sentences:** One idea per sentence
- **Active voice:** "Run the command" not "The command should be run"
- **Specific:** "Run `npm run build`" not "Build the project"

### Accuracy
- **Verify:** Test commands before documenting
- **Update:** When behavior changes, update docs immediately
- **Mark UNKNOWN:** If you can't verify, document uncertainty

### Structure
- **Headings:** Use clear hierarchy (H2 for sections, H3 for subsections)
- **Lists:** Use bullets or numbered lists for steps
- **Code blocks:** Include language specifier (```bash, ```typescript)
- **Examples:** Show concrete examples, not just theory

---

## Adding New Documentation

1. **Determine category:** Which subfolder does this belong in?
2. **Check for duplicates:** Search for similar docs first
3. **Use template:** Follow document header format above
4. **Write clearly:** Short sentences, active voice, specific examples
5. **Add references:** Link to related docs
6. **Update index:** Add to relevant AGENTS.md file

---

## Archiving Documentation

When a doc becomes outdated:

1. **Move to ARCHIVE:** `docs/ARCHIVE/YYYY/`
2. **Add deprecation notice:** Add header explaining why archived
3. **Update references:** Update any docs that link to it
4. **Update CHANGELOG:** Record the archival

### Archive Header
```markdown
# [ARCHIVED] Document Title

**Archived:** YYYY-MM-DD
**Reason:** Brief explanation of why this is no longer relevant

---

[Original content below]
```

---

## Special Documents

### Audit Runbooks (Root)
These are procedural guides for specific audit types:

- `CODEAUDIT.md` — Code quality audit process
- `SECURITYAUDIT.md` — Security review process
- `DEPENDENCYAUDIT.md` — Dependency update process
- `RELEASEAUDIT.md` — Pre-release checklist
- `DOCSAUDIT.md` — Documentation review process

### Status Files (Root)
- `PROJECT_STATUS.md` — Current state + next immediate step
- `CHANGELOG.md` — Historical changes to the repo
- `P0TODO.md`, `P1TODO.md`, `P2TODO.md`, `P3TODO.md` — Task truth sources

---

## Common Patterns

### Deployment Guide
```markdown
# Deployment Guide — [Service Name]

## Prerequisites
- [ ] Requirement 1
- [ ] Requirement 2

## Steps
1. Step 1 with command
   ```bash
   npm run build
   ```
2. Step 2 with expected output
3. Step 3 with verification

## Rollback
If deployment fails, follow these steps...

## Verification
How to confirm deployment succeeded...
```

### Runbook
```markdown
# [Problem] Runbook

## Symptoms
What you see when this happens...

## Root Cause
Why this happens...

## Resolution Steps
1. Do this
2. Then this
3. Verify with this

## Prevention
How to prevent this in the future...
```

---

## Don't

- ❌ Write docs for hypothetical features (only document what exists)
- ❌ Leave outdated docs in active folders (archive them)
- ❌ Use vague language ("might", "should", "probably")
- ❌ Skip code block language specifiers
- ❌ Forget to update docs when code changes

---

**See also:** `/BESTPR.md` for complete best practices guide.

