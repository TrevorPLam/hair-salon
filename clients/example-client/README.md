# Example Client - Hair Salon

**Version:** 1.0.0  
**Status:** ✅ Reference Implementation  
**Template:** Hair Salon Template v1.0.0  
**Port:** 3001

This is an example client implementation based on the Hair Salon template. Use this as a reference when setting up new client projects.

## Purpose

This example demonstrates:
- Complete client setup process from template
- Proper package.json configuration
- Environment variable setup
- Port configuration to avoid conflicts
- How to customize a template for a specific client

## Quick Start

```bash
# Navigate to example client
cd clients/example-client

# Install dependencies (if not already installed)
pnpm install

# Start development server
pnpm dev
# Runs on http://localhost:3001
```

Visit http://localhost:3001

## What This Demonstrates

### 1. Package Configuration
- **Package name:** `@clients/example-client`
- **Custom port:** 3001 (avoids conflict with template on 3100)
- **Description:** Clearly identifies as example client
- **Same dependencies:** Inherits all template dependencies

### 2. Directory Structure
Same as template:
```
example-client/
├── app/                   # Next.js App Router
├── components/            # React components
├── features/              # Feature modules
├── lib/                   # Utilities
├── public/                # Static assets
├── content/               # Content (MDX)
├── package.json           # Client configuration
├── .env.example           # Environment template
└── README.md              # This file
```

### 3. Customization Points

When creating a real client, you would customize:

#### Branding
- **tailwind.config.js** - Update colors, fonts
- **public/logo.svg** - Replace with client logo
- **app/layout.tsx** - Update metadata, fonts

#### Content
- **app/services/** - Update service offerings
- **app/team/page.tsx** - Add real team members
- **app/about/page.tsx** - Client story and values
- **content/blog/** - Add client blog posts
- **public/images/** - Upload client images

#### Configuration
- **.env.local** - Set real API keys and business info
- **Environment variables** - Configure integrations

## Key Differences from Template

This example client differs from the template in these ways:

1. **Package name:** `@clients/example-client` vs `@templates/hair-salon`
2. **Port:** 3001 vs 3100
3. **Description:** Identifies as example/reference
4. **Purpose:** Demonstrates client setup vs being a reusable template

## Running Alongside Template

You can run both the template and this example client simultaneously:

```bash
# Terminal 1: Template
cd templates/hair-salon
pnpm dev
# → http://localhost:3100

# Terminal 2: Example Client  
cd clients/example-client
pnpm dev
# → http://localhost:3001
```

## For Real Client Projects

When creating a real client project:

1. **Copy the template** (not this example):
   ```bash
   cp -r templates/hair-salon clients/my-real-client
   ```

2. **Update package.json**:
   ```json
   {
     \"name\": \"@clients/my-real-client\",
     \"description\": \"Client Name - Hair Salon Website\"
   }
   ```

3. **Set unique port** (3002, 3003, etc.):
   ```json
   {
     \"scripts\": {
       \"dev\": \"next dev --port 3002\"
     }
   }
   ```

4. **Configure for client**:
   - Update branding
   - Add real content
   - Set up environment variables
   - Configure integrations

## Documentation

- **[Client Setup Guide](../../docs/clients/README.md)** - Detailed client implementation guide
- **[Template Documentation](../../docs/templates/hair-salon.md)** - Hair salon template docs
- **[Architecture](../../docs/architecture/TEMPLATE_ARCHITECTURE.md)** - System architecture

## Support

This is a reference implementation. For production client projects:
1. Follow the [Client Setup Guide](../../docs/clients/README.md)
2. Review [Template Documentation](../../docs/templates/hair-salon.md)
3. Check [Migration Guide](../../docs/MIGRATION_GUIDE.md)

---

**Template Version:** 1.0.0  
**Last Updated:** 2026-02-10  
**Type:** Example/Reference Implementation
