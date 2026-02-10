# ADR-011: Multi-Template, Multi-Client Architecture

## Status

Accepted

## Date

2026-02-10

## Context

The original repository was structured as a single-application monorepo with one hair salon website in `apps/web`. As the business grew, we identified the need to:

1. Support multiple business types (hair salons, nail salons, tanning salons, etc.)
2. Deploy multiple client projects from reusable templates
3. Maintain consistency across similar business types while allowing customization
4. Scale the repository structure to handle dozens of client projects
5. Reduce code duplication and improve maintainability

The single-app structure (`apps/web`) was limiting our ability to create and maintain multiple client projects efficiently.

## Decision

We restructured the repository into a **multi-template, multi-client architecture**:

### New Structure

```
monorepo/
├── templates/           # Reusable business templates
│   ├── hair-salon/     # Hair salon template (port 3100)
│   ├── nail-salon/     # Future nail salon template
│   └── shared/         # Shared template components
├── clients/            # Client project implementations
│   ├── example-client/ # Reference implementation (port 3001)
│   └── [client-name]/  # Additional clients (ports 3002+)
└── packages/           # Shared libraries (unchanged)
    ├── ui/
    ├── utils/
    └── config/
```

### Migration Actions

1. **Moved `apps/web` → `templates/hair-salon`**

   - Updated package name: `@repo/web` → `@templates/hair-salon`
   - Changed development port: 3000 → 3100
   - Renamed to reflect template purpose

2. **Created `clients/` directory**

   - Each client is a copy of a template
   - Customized with client-specific branding and content
   - Assigned unique ports (3001, 3002, 3003, etc.)

3. **Updated pnpm-workspace.yaml**

   - Removed: `apps/*`
   - Added: `templates/*`, `clients/*`

4. **Created comprehensive documentation**
   - Template-specific docs in `docs/templates/`
   - Client setup guides in `docs/clients/`
   - Updated repository index and guides

### Port Strategy

- **Templates**: 3100-3199 (templates run for development/testing)
  - hair-salon: 3100
  - nail-salon: 3101 (planned)
  - tanning-salon: 3102 (planned)
- **Clients**: 3001-3099, 3200+ (client implementations)
  - example-client: 3001
  - Client projects: 3002, 3003, etc.

### Template Development Workflow

1. Create/update template in `templates/[type]/`
2. Test template with `pnpm dev` on template port
3. Update template documentation
4. Create/update example client in `clients/example-client`
5. Test client implementation

### Client Implementation Workflow

1. Copy template: `cp -r templates/hair-salon clients/[client-name]`
2. Update `package.json` name to `@clients/[client-name]`
3. Assign unique port number
4. Customize branding, content, and features
5. Deploy to production

## Consequences

### Positive

- ✅ **Scalability**: Can support unlimited templates and clients
- ✅ **Code Reuse**: Templates eliminate duplication across similar businesses
- ✅ **Maintainability**: Bug fixes and features propagate through templates
- ✅ **Isolation**: Each client is independent and can be customized freely
- ✅ **Clear Structure**: Template vs. client distinction is explicit
- ✅ **Parallel Development**: Multiple clients can run simultaneously on different ports
- ✅ **Documentation**: Clear separation of template docs vs. client setup guides

### Negative

- ⚠️ **Initial Migration Effort**: Required comprehensive restructuring
- ⚠️ **Learning Curve**: Team needs to understand template vs. client distinction
- ⚠️ **Port Management**: Need to track port assignments across clients
- ⚠️ **Template Updates**: Updating existing clients requires manual merge of template changes
- ⚠️ **Increased Complexity**: More directories and structure to navigate

### Mitigations

- Comprehensive documentation created for templates and clients
- Example client serves as reference implementation
- Port assignments documented in INDEX.md
- Migration guide and success documentation provided
- Clear naming conventions (`@templates/*`, `@clients/*`)

## Related ADRs

- [ADR-008: Monorepo Structure](./008-monorepo-structure.md) - Original monorepo decision
- This ADR supersedes aspects of ADR-008 regarding the `apps/` directory

## References

- [INDEX.md](../../INDEX.md) - Repository structure and navigation
- [MIGRATION_SUCCESS.md](../../MIGRATION_SUCCESS.md) - Migration completion guide
- [RESTRUCTURING_SUMMARY.md](../../RESTRUCTURING_SUMMARY.md) - Detailed restructuring summary
- [docs/templates/README.md](../templates/README.md) - Template documentation
- [docs/clients/README.md](../clients/README.md) - Client implementation guide
