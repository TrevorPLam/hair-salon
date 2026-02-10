# Documentation Consolidation & Archival Strategy

**Date:** 2026-02-10  
**Based on:** [DOCUMENTATION_INVENTORY.md](DOCUMENTATION_INVENTORY.md)

## Archival Actions

### 1. Archive MIGRATION_GUIDE.md

**Current:** `docs/MIGRATION_GUIDE.md`  
**Move to:** `docs/archive/MIGRATION_GUIDE.md`  
**Reason:** Migration already completed; document describes how to migrate TO template architecture  
**Action:** Move to archive with explanatory note at original location

### 2. Keep REMEDIATION_PLAN.md Active

**Current:** `docs/REMEDIATION_PLAN.md`  
**Status:** Active plan with completed and ongoing tasks  
**Action:** Update `apps/web` references, keep in active docs

### 3. Keep tasks.md Active

**Current:** `tasks.md` (root)  
**Status:** Active audit checklist (different purpose than TODO.md)  
**Action:** Update single `apps/web` reference, keep active

## Update Strategy

### Batch 1: Root Documentation (7 files)

Execute simultaneous updates using multi_replace:

1. **README.md**

   - Line 200-208: Update tech stack links from `apps/web/package.json` → `templates/hair-salon/package.json`

2. **INDEX.md**

   - Line 256: Update migration instruction from `apps/web` → historical context note

3. **CONFIG.md**

   - Line 383: Update troubleshooting from `apps/web` → `templates/hair-salon`

4. **CONTRIBUTING.md**

   - Line 100: Update structure from `apps/web/**` → `templates/**` and `clients/**`

5. **TODO.md**

   - Line 271: Update `@repo/web` → `@templates/hair-salon`

6. **tasks.md**
   - Line 56: Update `apps/web/lib/env.ts` → `templates/hair-salon/lib/env.ts`

### Batch 2: docs/ Core (3 files)

7. **docs/TESTING_STATUS.md**

   - Multiple lines: Bulk replace `apps/web` → `templates/hair-salon`
   - Multiple lines: Bulk replace `@repo/web` → `@templates/hair-salon`

8. **docs/SECURITY_MONITORING_STATUS.md**

   - Line 71: Update `apps/web/package.json` → `templates/hair-salon/package.json`

9. **docs/REMEDIATION_PLAN.md**
   - Multiple lines: Bulk replace `apps/web` → `templates/hair-salon`

### Batch 3: docs/file-meta/ (3 files)

10. **docs/file-meta/tsconfig.base.json.md**

    - Line 20: Update `apps/web/tsconfig.json` → `templates/hair-salon/tsconfig.json`

11. **docs/file-meta/docker-compose.yml.md**

    - Line 17, 27: Update `apps/web` → `templates/hair-salon`

12. **docs/file-meta/.pnpmrc.md**
    - Line 20: Update `apps/web/Dockerfile` → `templates/hair-salon/Dockerfile`

### Batch 4: Other Documentation (3 files)

13. **docs/user-guide/quick-start.md**

    - Review and update any old path references

14. **docs/architecture/TEMPLATE_ARCHITECTURE.md**

    - Review content and update if needed

15. **.kiro/steering/tech.md**

    - Line 39: Update `localhost:3000` → note about template/client ports

16. **.kiro/steering/structure.md**
    - Review and update structure references

## Cross-Linking Strategy

After all updates, verify these cross-link patterns:

### Primary Navigation

```
README.md
├── → INDEX.md (structure overview)
├── → CONFIG.md (configuration details)
├── → CONTRIBUTING.md (contribution guide)
├── → MIGRATION_SUCCESS.md (post-migration guide)
└── → docs/architecture/README.md (architecture docs)
```

### Documentation Hub

```
INDEX.md
├── → Templates: docs/templates/README.md
├── → Clients: docs/clients/README.md
├── → Architecture: docs/architecture/README.md
├── → ADRs: docs/adr/README.md
└── → Archive: docs/archive/README.md
```

### Template Documentation

```
docs/templates/README.md
├── → templates/hair-salon/README.md
├── → docs/templates/hair-salon.md
└── → templates/shared/README.md
```

### Client Documentation

```
docs/clients/README.md
├── → clients/example-client/README.md
├── → docs/clients/client-setup.md (if exists)
└── → docs/clients/customization-checklist.md (if exists)
```

## Implementation Order

1. ✅ **Create inventory** - DOCUMENTATION_INVENTORY.md (DONE)
2. ✅ **Create strategy** - This document (DONE)
3. **Archive MIGRATION_GUIDE** - Move with redirect note
4. **Execute Batch 1** - Root documentation updates (7 files)
5. **Execute Batch 2** - Core docs updates (3 files)
6. **Execute Batch 3** - File-meta updates (3 files)
7. **Execute Batch 4** - Other docs updates (3 files)
8. **Verify cross-links** - Check all links work
9. **Update DOCUMENTATION_INVENTORY** - Mark all as complete
10. **Create summary** - Document what was done

## Verification Checklist

After implementation:

- [ ] No `apps/web` references in active docs (except archive/)
- [ ] No `@repo/web` references in active docs (except archive/)
- [ ] All cross-links resolve correctly
- [ ] MIGRATION_GUIDE archived with redirect note
- [ ] All 16 identified files updated
- [ ] DOCUMENTATION_INVENTORY reflects final state
- [ ] README navigation links work
- [ ] INDEX navigation links work
- [ ] Template docs link correctly
- [ ] Client docs link correctly
- [ ] Architecture docs link correctly
