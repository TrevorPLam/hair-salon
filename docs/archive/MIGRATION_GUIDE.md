# Migration Guide: Moving to Template-Based Architecture

This guide explains how to migrate the existing `apps/web` application to the new template-based architecture.

## Overview

The repository has been restructured to support:

- **Multiple business templates** (hair, nail, tanning, spa)
- **Multiple client projects** that can be shipped independently
- **Shared components** between templates

## New Directory Structure

```
Before:
apps/
└── web/              # Single hair salon app

After:
templates/
├── hair-salon/       # Hair salon template (moved from apps/web)
├── nail-salon/       # Future template
├── tanning-salon/    # Future template
└── shared/           # Shared template components

clients/
├── example-client/   # Example implementation
└── [client-name]/    # Actual client projects

apps/                 # Reserved for internal apps
```

## Migration Steps

### Option 1: Move Existing App (Recommended)

If you want to move the current `apps/web` to `templates/hair-salon`:

```bash
# 1. Create backup
cp -r apps/web apps/web-backup

# 2. Move to templates
mv apps/web templates/hair-salon

# 3. Update package.json name
# Edit templates/hair-salon/package.json
# Change: "name": "@repo/web"
# To: "name": "@templates/hair-salon"

# 4. Update any internal imports if needed

# 5. Test the template
cd templates/hair-salon
pnpm install
pnpm dev

# 6. If successful, remove backup
rm -rf apps/web-backup
```

### Option 2: Copy to Templates (Safer)

If you want to keep the existing app and create a template:

```bash
# 1. Copy to templates
cp -r apps/web templates/hair-salon

# 2. Update package.json in template
# Edit templates/hair-salon/package.json
# Change: "name": "@repo/web"
# To: "name": "@templates/hair-salon"

# 3. Now you have both:
#    - apps/web (your current production app)
#    - templates/hair-salon (the template for new clients)
```

### Option 3: Manual Setup

Create the template structure manually:

```bash
# 1. Create new template directory
mkdir -p templates/hair-salon

# 2. Copy files selectively from apps/web
# Copy package.json, next.config.js, tsconfig.json, etc.
# Generalize any client-specific content

# 3. Set up as template with documentation
```

## Post-Migration Updates

### 1. Update Package Name

In `templates/hair-salon/package.json`:

```json
{
  "name": "@templates/hair-salon",
  "version": "1.0.0",
  "private": true,
  "description": "Hair salon website template"
}
```

### 2. Update Development Port

To avoid conflicts, update the dev script:

```json
{
  "scripts": {
    "dev": "next dev --port 3100",
    "start": "next start --port 3100"
  }
}
```

### 3. Update Environment Variables

Create `.env.example` in the template with placeholder values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3100
NEXT_PUBLIC_SITE_NAME="Your Salon Name"
NEXT_PUBLIC_BUSINESS_NAME="Your Business"
# ... etc
```

### 4. Remove Client-Specific Data

From the template, remove or generalize:

- Specific business names and addresses
- Real API keys (use placeholders)
- Client-specific images
- Hardcoded contact information
- Specific branding

### 5. Add Template Documentation

Create `templates/hair-salon/README.md` with:

- Template features
- Setup instructions
- Customization guide
- Deployment guide

## Workspace Configuration

The workspace has been updated to include templates and clients:

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'packages/config/*'
  - 'templates/*' # New
  - 'clients/*' # New
```

**package.json:**

```json
{
  "workspaces": [
    "apps/*",
    "packages/*",
    "packages/config/*",
    "templates/*", // New
    "clients/*" // New
  ]
}
```

## Creating Your First Client

After migration, create your first client project:

```bash
# 1. Copy template to clients
cp -r templates/hair-salon clients/my-first-client

# 2. Update package.json
# Edit clients/my-first-client/package.json
# Change: "name": "@templates/hair-salon"
# To: "name": "@clients/my-first-client"

# 3. Update port
# Edit package.json scripts
# "dev": "next dev --port 3001"

# 4. Configure environment
cd clients/my-first-client
cp .env.example .env.local
# Edit .env.local with actual values

# 5. Install and run
pnpm install
pnpm dev

# 6. Customize for client
# - Update branding
# - Add content
# - Configure features
```

## Running Multiple Projects

With the new structure, you can run multiple projects simultaneously:

```bash
# Terminal 1: Template development
cd templates/hair-salon
pnpm dev --port 3100

# Terminal 2: Client 1
cd clients/client-1
pnpm dev --port 3001

# Terminal 3: Client 2
cd clients/client-2
pnpm dev --port 3002
```

Or use Turbo from root:

```bash
# Run dev for all templates
pnpm --filter "@templates/*" dev

# Run dev for all clients
pnpm --filter "@clients/*" dev

# Build all
pnpm build
```

## Verification

After migration, verify everything works:

```bash
# 1. Install all dependencies
pnpm install

# 2. Type check
pnpm type-check

# 3. Lint
pnpm lint

# 4. Build
pnpm build

# 5. Test template
cd templates/hair-salon
pnpm dev
# Visit http://localhost:3100

# 6. Test example client
cd clients/example-client
pnpm dev
# Visit http://localhost:3001
```

## Rollback

If something goes wrong, you can rollback:

```bash
# If you made a backup
mv apps/web apps/web-failed
mv apps/web-backup apps/web

# Remove template directories if needed
rm -rf templates/hair-salon
rm -rf clients/example-client

# Restore workspace config
git checkout pnpm-workspace.yaml package.json
```

## Benefits of New Structure

1. **Multi-Template Support** - Easily add nail, tanning, spa templates
2. **Multi-Client Support** - Manage multiple client projects in one repo
3. **Code Reuse** - Share components via templates/shared/
4. **Independent Deployment** - Deploy each client independently
5. **Clear Separation** - Template vs. client code is clearly separated
6. **Scalability** - Add unlimited clients and templates

## Next Steps

1. Move or copy apps/web to templates/hair-salon
2. Generalize the template (remove client-specific data)
3. Create comprehensive template documentation
4. Set up example client as reference
5. Create your first real client project
6. Plan additional templates (nail salon, etc.)
7. Extract shared components to templates/shared/

## Support

For questions or issues during migration:

1. Review this migration guide
2. Check [docs/templates/](../docs/templates/)
3. Review [docs/clients/](../docs/clients/)
4. Consult the development team

---

**Created:** 2026-02-10  
**Status:** Ready for implementation
