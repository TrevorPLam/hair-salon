# Clients Directory

This directory contains actual client implementations based on the templates. Each client project is a production website that can be deployed independently.

## Purpose

The `clients/` directory allows you to:

- Manage multiple client projects in one monorepo
- Share common code via templates and packages
- Deploy each client independently
- Track client-specific customizations
- Maintain consistent development workflow

## Structure

```
clients/
├── example-client/        # Example/demo client (for reference)
├── [client-name-1]/       # Actual client project
├── [client-name-2]/       # Another client project
└── README.md              # This file
```

Each client directory is a complete Next.js application based on a template.

## Creating a New Client Project

### Step 1: Copy a Template

Choose the appropriate template and copy it to the clients directory:

```bash
# For a hair salon client
cp -r templates/hair-salon clients/[client-name]

# For a nail salon client (when available)
cp -r templates/nail-salon clients/[client-name]
```

### Step 2: Update Package Configuration

Edit `clients/[client-name]/package.json`:

```json
{
  "name": "@clients/[client-name]",
  "version": "1.0.0",
  "private": true,
  "description": "[Client Name] website",
  "scripts": {
    "dev": "next dev --port [unique-port]",
    "build": "next build",
    "start": "next start --port [unique-port]",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

**Important:** Assign a unique port for dev server (e.g., 3001, 3002, 3003).

### Step 3: Add to Workspace

Add the client to `pnpm-workspace.yaml` in the root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'packages/config/*'
  - 'templates/*'
  - 'clients/*' # This line should already exist
```

### Step 4: Configure Environment Variables

Create `clients/[client-name]/.env.local`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://[client-domain].com
NEXT_PUBLIC_SITE_NAME="[Client Name]"

# Business Information
NEXT_PUBLIC_BUSINESS_NAME="[Client Business Name]"
NEXT_PUBLIC_BUSINESS_PHONE="(XXX) XXX-XXXX"
NEXT_PUBLIC_BUSINESS_EMAIL="contact@[client-domain].com"

# API Keys
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
HUBSPOT_API_KEY=your-hubspot-key
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key

# Feature Flags
NEXT_PUBLIC_ENABLE_BOOKING=true
NEXT_PUBLIC_ENABLE_BLOG=true
```

### Step 5: Customize Branding

Update the following files in `clients/[client-name]/`:

#### Tailwind Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          // ... client's brand colors
        },
        secondary: {
          // ... secondary colors
        },
      },
      fontFamily: {
        sans: ['Client Font', 'sans-serif'],
      },
    },
  },
};
```

#### Site Metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: '[Client Name]',
  description: '[Client business description]',
  // ... other metadata
};
```

### Step 6: Update Content

1. **Services** - Update service offerings in `app/services/`
2. **Team** - Add team member profiles in `app/team/`
3. **About** - Customize business story in `app/about/`
4. **Contact** - Update contact information in `app/contact/`
5. **Blog** - Add client-specific blog content in `content/blog/`
6. **Images** - Replace placeholder images in `public/`

### Step 7: Install and Run

```bash
# Install dependencies
pnpm install

# Run in development
cd clients/[client-name]
pnpm dev

# Or run from root
pnpm --filter @clients/[client-name] dev
```

## Client Project Structure

Each client project follows this structure:

```
client-name/
├── package.json              # Client-specific dependencies
├── .env.local                # Environment variables (gitignored)
├── .env.example              # Example environment file
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Customized theme
├── tsconfig.json             # TypeScript config
├── README.md                 # Client-specific documentation
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Customized layout
│   ├── page.tsx             # Home page
│   └── [routes]/            # All routes
├── components/               # Client-specific components
├── features/                 # Business logic
├── lib/                      # Utilities
├── public/                   # Static assets
│   ├── images/              # Client images
│   └── logo.svg             # Client logo
└── content/                  # Content (blog, etc.)
    └── blog/                # Client blog posts
```

## Development Workflow

### Running Multiple Clients

```bash
# Run specific client
pnpm --filter @clients/[client-name] dev

# Run all clients (use unique ports!)
pnpm --filter "@clients/*" dev

# Build specific client
pnpm --filter @clients/[client-name] build
```

### Shared Dependency Updates

When updating shared packages (`@repo/ui`, `@repo/utils`), all clients automatically benefit:

```bash
# Update shared UI package
cd packages/ui
# Make changes...

# Rebuild all clients
pnpm --filter "@clients/*" build
```

## Deploying Clients

Each client can be deployed independently:

### Vercel Deployment

1. Connect repository to Vercel
2. Configure project:
   - **Root Directory:** `clients/[client-name]`
   - **Framework Preset:** Next.js
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker Deployment

```bash
# Build Docker image for client
cd clients/[client-name]
docker build -t [client-name] .

# Run container
docker run -p 3000:3000 [client-name]
```

### Other Platforms

Clients can be deployed to:

- Netlify
- AWS Amplify
- Google Cloud
- Azure Static Web Apps
- Self-hosted servers

## Customization Guidelines

### What to Customize

✅ **Always customize:**

- Branding (colors, fonts, logo)
- Content (pages, blog, images)
- Business information
- Contact details
- Service offerings
- Team members
- Environment variables

✅ **Customize as needed:**

- Layout and page structure
- Component styling
- Feature enablement
- Third-party integrations
- Custom functionality

### What NOT to Modify

❌ **Avoid changing:**

- Core template structure (unless necessary)
- Shared package code (modify in packages/ instead)
- Build configuration (unless required)

### When to Create Custom Code

Create custom components/features in client directory when:

1. Feature is specific to this client only
2. Differs significantly from template
3. One-off business requirement
4. Client-specific integrations

Keep shared code in:

- `packages/` - For truly universal utilities
- `templates/shared/` - For common template features
- Original template - For template improvements

## Client Documentation

Each client should have its own `README.md` with:

- Client contact information
- Deployment instructions
- Custom feature documentation
- Environment variable guide
- Content update procedures
- Maintenance notes

## Example Client

See `clients/example-client/` for a complete reference implementation.

## Best Practices

1. **Use unique ports** - Assign different dev ports to avoid conflicts
2. **Document customizations** - Keep notes on what differs from template
3. **Keep dependencies updated** - Regularly update packages
4. **Test thoroughly** - Test all features before deploying
5. **Version control** - Commit client-specific changes separately
6. **Environment security** - Never commit `.env.local` files
7. **Performance monitoring** - Set up analytics and monitoring
8. **Regular backups** - Back up client databases and content

## Troubleshooting

### Port Conflicts

If you get `EADDRINUSE` errors, change the port in `package.json`:

```json
"dev": "next dev --port 3002"
```

### Build Errors

Ensure all dependencies are installed:

```bash
pnpm install --filter @clients/[client-name]
```

### Type Errors

Regenerate TypeScript types:

```bash
pnpm --filter @clients/[client-name] type-check
```

## Support

For questions or issues:

1. Check template documentation in `templates/`
2. Review shared component docs in `templates/shared/`
3. Consult architecture docs in `docs/`
4. Contact team lead or senior developer

---

**Last Updated:** 2026-02-10
