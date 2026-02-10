# Documentation Inventory & Status

**Date:** 2026-02-10  
**Purpose:** Complete inventory of all documentation with update status and recommendations

## Status Legend

- ✅ **UPDATED** - Recently reviewed and updated for multi-template architecture
- ⚠️ **NEEDS UPDATE** - Contains outdated references that should be fixed
- 📦 **ARCHIVE CANDIDATE** - Should be moved to docs/archive/
- 🔄 **CONSOLIDATE** - Should be merged with another document
- ❌ **DELETE** - Redundant or obsolete, can be deleted
- 📚 **ARCHIVE (OK)** - Already in archive, content is historical reference

---

## Root Documentation (9 files)

| File                                                               | Status | Notes                                     | Action Required       |
| ------------------------------------------------------------------ | ------ | ----------------------------------------- | --------------------- |
| [README.md](README.md)                                             | ⚠️     | Has `apps/web` refs in tech stack section | Update refs           |
| [INDEX.md](INDEX.md)                                               | ⚠️     | Has "Migrate apps/web" instruction        | Update historical ref |
| [CONFIG.md](CONFIG.md)                                             | ⚠️     | Has `apps/web` ref in troubleshooting     | Update ref            |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                 | ⚠️     | Lists `apps/web/` in repository structure | Update structure      |
| [TODO.md](TODO.md)                                                 | ⚠️     | Has `@repo/web` ref                       | Update ref            |
| [tasks.md](tasks.md)                                               | ⚠️     | Has `apps/web` ref in evidence            | Update or archive     |
| [MIGRATION_SUCCESS.md](MIGRATION_SUCCESS.md)                       | ✅     | Accurate guide post-migration             | Keep as-is            |
| [RESTRUCTURING_SUMMARY.md](RESTRUCTURING_SUMMARY.md)               | ✅     | Historical record of migration            | Keep as-is            |
| [DOCUMENTATION_UPDATE_SUMMARY.md](DOCUMENTATION_UPDATE_SUMMARY.md) | ✅     | Recent update summary                     | Keep as-is            |
| [SECURITY.md](SECURITY.md)                                         | ✅     | Generic security policy                   | Keep as-is            |

---

## docs/ - Core Documentation (6 files)

| File                                                                     | Status | Notes                                    | Action Required        |
| ------------------------------------------------------------------------ | ------ | ---------------------------------------- | ---------------------- |
| [docs/MASTER.md](docs/MASTER.md)                                         | ✅     | Recently updated, all refs corrected     | Keep as-is             |
| [docs/CODEBASE_INDEX.md](docs/CODEBASE_INDEX.md)                         | ✅     | Recently updated                         | Keep as-is             |
| [docs/TESTING_STATUS.md](docs/TESTING_STATUS.md)                         | ⚠️     | Multiple `apps/web` and `@repo/web` refs | Update all refs        |
| [docs/VERSION_POLICY.md](docs/VERSION_POLICY.md)                         | ✅     | Generic version policy                   | Keep as-is             |
| [docs/SECURITY_MONITORING_STATUS.md](docs/SECURITY_MONITORING_STATUS.md) | ⚠️     | Has `apps/web` ref                       | Update ref             |
| [docs/ANALYTICS_CONSENT_FLOW.md](docs/ANALYTICS_CONSENT_FLOW.md)         | ✅     | Feature documentation                    | Keep as-is             |
| [docs/REMEDIATION_PLAN.md](docs/REMEDIATION_PLAN.md)                     | ⚠️     | Multiple `apps/web` refs                 | Update or archive      |
| [docs/MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md)                       | 🔄     | Redundant with MIGRATION_SUCCESS.md      | Consolidate or archive |

---

## docs/templates/ (2 files)

| File                                                         | Status | Notes                           | Action Required |
| ------------------------------------------------------------ | ------ | ------------------------------- | --------------- |
| [docs/templates/README.md](docs/templates/README.md)         | ✅     | Good template development guide | Keep as-is      |
| [docs/templates/hair-salon.md](docs/templates/hair-salon.md) | ✅     | Detailed template docs          | Keep as-is      |

---

## docs/clients/ (1 file)

| File                                             | Status | Notes                            | Action Required |
| ------------------------------------------------ | ------ | -------------------------------- | --------------- |
| [docs/clients/README.md](docs/clients/README.md) | ✅     | Good client implementation guide | Keep as-is      |

---

## docs/architecture/ (2 files)

| File                                                                                     | Status | Notes                  | Action Required |
| ---------------------------------------------------------------------------------------- | ------ | ---------------------- | --------------- |
| [docs/architecture/README.md](docs/architecture/README.md)                               | ✅     | Recently updated       | Keep as-is      |
| [docs/architecture/TEMPLATE_ARCHITECTURE.md](docs/architecture/TEMPLATE_ARCHITECTURE.md) | ⚠️     | Need to verify content | Review          |

---

## docs/adr/ (4 files)

| File                                                                                       | Status | Notes                     | Action Required |
| ------------------------------------------------------------------------------------------ | ------ | ------------------------- | --------------- |
| [docs/adr/README.md](docs/adr/README.md)                                                   | ✅     | Recently updated          | Keep as-is      |
| [docs/adr/001-technology-stack.md](docs/adr/001-technology-stack.md)                       | ✅     | Historical ADR            | Keep as-is      |
| [docs/adr/002-nextjs-framework.md](docs/adr/002-nextjs-framework.md)                       | ✅     | Historical ADR            | Keep as-is      |
| [docs/adr/003-database-selection.md](docs/adr/003-database-selection.md)                   | ✅     | Historical ADR            | Keep as-is      |
| [docs/adr/011-multi-template-architecture.md](docs/adr/011-multi-template-architecture.md) | ✅     | New ADR for restructuring | Keep as-is      |

---

## docs/user-guide/ (2 files)

| File                                                             | Status | Notes                | Action Required |
| ---------------------------------------------------------------- | ------ | -------------------- | --------------- |
| [docs/user-guide/README.md](docs/user-guide/README.md)           | ✅     | User guide index     | Keep as-is      |
| [docs/user-guide/quick-start.md](docs/user-guide/quick-start.md) | ⚠️     | Likely has old paths | Review & update |

---

## docs/file-meta/ (10 files)

| File                                                                           | Status | Notes              | Action Required |
| ------------------------------------------------------------------------------ | ------ | ------------------ | --------------- |
| [docs/file-meta/package.json.md](docs/file-meta/package.json.md)               | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/pnpm-workspace.yaml.md](docs/file-meta/pnpm-workspace.yaml.md) | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/turbo.json.md](docs/file-meta/turbo.json.md)                   | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/tsconfig.json.md](docs/file-meta/tsconfig.json.md)             | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/tsconfig.base.json.md](docs/file-meta/tsconfig.base.json.md)   | ⚠️     | Has `apps/web` ref | Update ref      |
| [docs/file-meta/docker-compose.yml.md](docs/file-meta/docker-compose.yml.md)   | ⚠️     | Has `apps/web` ref | Update ref      |
| [docs/file-meta/.pnpmrc.md](docs/file-meta/.pnpmrc.md)                         | ⚠️     | Has `apps/web` ref | Update ref      |
| [docs/file-meta/.prettierrc.md](docs/file-meta/.prettierrc.md)                 | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/.markdownlint.json.md](docs/file-meta/.markdownlint.json.md)   | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/.npmrc.md](docs/file-meta/.npmrc.md)                           | ✅     | Config file docs   | Keep as-is      |
| [docs/file-meta/LICENSE.md](docs/file-meta/LICENSE.md)                         | ✅     | Config file docs   | Keep as-is      |

---

## docs/archive/ (8 files)

| File                                                                           | Status | Notes                         | Action Required |
| ------------------------------------------------------------------------------ | ------ | ----------------------------- | --------------- |
| [docs/archive/README.md](docs/archive/README.md)                               | 📚     | Archive index                 | Keep as-is      |
| [docs/archive/CONFIGURATION_AUDIT.md](docs/archive/CONFIGURATION_AUDIT.md)     | 📚     | Historical audit              | Keep as-is      |
| [docs/archive/CONFIG_CONFLICTS.md](docs/archive/CONFIG_CONFLICTS.md)           | 📚     | Historical conflict analysis  | Keep as-is      |
| [docs/archive/CONFIG_GAPS.md](docs/archive/CONFIG_GAPS.md)                     | 📚     | Historical gaps analysis      | Keep as-is      |
| [docs/archive/CONFIG_MAP.md](docs/archive/CONFIG_MAP.md)                       | 📚     | Historical config map         | Keep as-is      |
| [docs/archive/CONFIG_VERSIONS.md](docs/archive/CONFIG_VERSIONS.md)             | 📚     | Historical version analysis   | Keep as-is      |
| [docs/archive/EXECUTIVE_SUMMARY.md](docs/archive/EXECUTIVE_SUMMARY.md)         | 📚     | Historical summary            | Keep as-is      |
| [docs/archive/INFRASTRUCTURE.md](docs/archive/INFRASTRUCTURE.md)               | 📚     | Historical infrastructure doc | Keep as-is      |
| [docs/archive/PATCH_PLAN.md](docs/archive/PATCH_PLAN.md)                       | 📚     | Historical patch plan         | Keep as-is      |
| [docs/archive/VERIFICATION_EVIDENCE.md](docs/archive/VERIFICATION_EVIDENCE.md) | 📚     | Historical verification       | Keep as-is      |

---

## Template Documentation (3 files)

| File                                                             | Status | Notes                     | Action Required |
| ---------------------------------------------------------------- | ------ | ------------------------- | --------------- |
| [templates/README.md](templates/README.md)                       | ✅     | Templates directory index | Keep as-is      |
| [templates/hair-salon/README.md](templates/hair-salon/README.md) | ✅     | Template-specific readme  | Keep as-is      |
| [templates/shared/README.md](templates/shared/README.md)         | ✅     | Shared components guide   | Keep as-is      |

---

## Client Documentation (2 files)

| File                                                                 | Status | Notes                   | Action Required |
| -------------------------------------------------------------------- | ------ | ----------------------- | --------------- |
| [clients/README.md](clients/README.md)                               | ✅     | Clients directory index | Keep as-is      |
| [clients/example-client/README.md](clients/example-client/README.md) | ✅     | Example client readme   | Keep as-is      |

---

## .kiro/ Specifications (5 files)

| File                                                                                                                 | Status | Notes                  | Action Required              |
| -------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------- | ---------------------------- |
| [.kiro/steering/tech.md](.kiro/steering/tech.md)                                                                     | ⚠️     | Has old structure refs | Update or keep as historical |
| [.kiro/steering/structure.md](.kiro/steering/structure.md)                                                           | ⚠️     | Likely outdated        | Review                       |
| [.kiro/steering/product.md](.kiro/steering/product.md)                                                               | ✅     | Product requirements   | Keep as-is                   |
| [.kiro/specs/marketing-first-enhancements/requirements.md](.kiro/specs/marketing-first-enhancements/requirements.md) | ✅     | Feature spec           | Keep as-is                   |
| [.kiro/specs/marketing-first-enhancements/design.md](.kiro/specs/marketing-first-enhancements/design.md)             | ✅     | Feature design         | Keep as-is                   |

---

## Summary Statistics

- **Total Documentation Files:** 61
- **✅ Updated (Keep as-is):** 33 files
- **⚠️ Needs Update:** 16 files
- **📚 Archive (Historical - OK):** 10 files
- **🔄 Consolidate:** 1 file
- **📦 Archive Candidate:** 1 file

---

## Recommended Actions

### Priority 1: Update Active Documentation (16 files)

These files contain outdated references and are actively used:

1. **README.md** - Update tech stack section refs
2. **INDEX.md** - Update migration instruction ref
3. **CONFIG.md** - Update troubleshooting section
4. **CONTRIBUTING.md** - Update repository structure
5. **TODO.md** - Update package name ref
6. **tasks.md** - Review and update or archive
7. **docs/TESTING_STATUS.md** - Update all apps/web and @repo/web refs
8. **docs/SECURITY_MONITORING_STATUS.md** - Update apps/web ref
9. **docs/REMEDIATION_PLAN.md** - Update or archive (historical plan)
10. **docs/user-guide/quick-start.md** - Review and update
11. **docs/architecture/TEMPLATE_ARCHITECTURE.md** - Review content
12. **docs/file-meta/tsconfig.base.json.md** - Update apps/web ref
13. **docs/file-meta/docker-compose.yml.md** - Update apps/web ref
14. **docs/file-meta/.pnpmrc.md** - Update apps/web ref
15. **.kiro/steering/tech.md** - Update or mark as historical
16. **.kiro/steering/structure.md** - Review and update

### Priority 2: Consolidation

1. **docs/MIGRATION_GUIDE.md** 🔄
   - **Recommendation:** Archive to `docs/archive/MIGRATION_GUIDE.md`
   - **Reason:** Redundant with MIGRATION_SUCCESS.md and historical at this point
   - **Alternative:** Add note at top directing to MIGRATION_SUCCESS.md

### Priority 3: Archive Candidates

1. **docs/REMEDIATION_PLAN.md** 📦
   - **Recommendation:** Move to `docs/archive/REMEDIATION_PLAN.md`
   - **Reason:** Historical plan, completed tasks
2. **tasks.md** 📦
   - **Recommendation:** Review, extract any active tasks to TODO.md, then archive
   - **Reason:** May be superseded by TODO.md

---

## Consolidation Strategy

### Redundant Documentation

| Current Files                                               | Recommendation              | Reason                                                    |
| ----------------------------------------------------------- | --------------------------- | --------------------------------------------------------- |
| MIGRATION_GUIDE.md<br>MIGRATION_SUCCESS.md                  | Keep SUCCESS, archive GUIDE | GUIDE is pre-migration, SUCCESS is post-migration reality |
| RESTRUCTURING_SUMMARY.md<br>DOCUMENTATION_UPDATE_SUMMARY.md | Keep both                   | Different purposes: restructure vs doc update             |
| tasks.md<br>TODO.md                                         | Merge into TODO.md          | Consolidate task tracking                                 |

### Related Documentation Sets

| Category      | Files                                                              | Status        | Recommendation           |
| ------------- | ------------------------------------------------------------------ | ------------- | ------------------------ |
| Migration     | MIGRATION_GUIDE.md, MIGRATION_SUCCESS.md, RESTRUCTURING_SUMMARY.md | Mixed         | Archive GUIDE            |
| Configuration | CONFIG.md, docs/file-meta/\*.md                                    | Needs updates | Update CONFIG, file-meta |
| Testing       | docs/TESTING_STATUS.md                                             | Needs update  | Update refs              |
| Architecture  | docs/architecture/_.md, docs/adr/_.md                              | Good          | Keep as-is               |
| Templates     | docs/templates/_.md, templates/_/README.md                         | Good          | Keep as-is               |
| Clients       | docs/clients/_.md, clients/_/README.md                             | Good          | Keep as-is               |

---

## Next Steps

1. **Update 16 files** with outdated references (Priority 1)
2. **Archive** MIGRATION_GUIDE.md with redirect note (Priority 2)
3. **Review and archive** REMEDIATION_PLAN.md and tasks.md (Priority 3)
4. **Verify cross-links** after all updates complete
5. **Create** this inventory as permanent reference
