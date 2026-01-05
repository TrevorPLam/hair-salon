# Local Development Setup

> **Last Updated:** 2026-01-03  
> **Canonical Status:** Canonical  
> **Purpose:** Step-by-step local development setup guide  
> **See Also:** [Project README](../start-here/README.md), [CONTRIBUTING.md](./CONTRIBUTING.md), [DOCS_INDEX.md](../DOCS_INDEX.md)

## Prerequisites
- Node.js 20.x LTS or higher
- pnpm 8.x or higher
- Git

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/ydFirms/your-dedicated-marketer-site.git
cd your-dedicated-marketer-site
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env with required values:
# - RESEND_API_KEY: Get from Resend dashboard
# - CONTACT_EMAIL: Email address to receive contact form submissions
```

### 4. Start Development Server
```bash
pnpm dev
```

## Verification
- Site running at: http://localhost:3000
- All pages should load without errors
- Contact form should validate input

## Common Issues

**Problem**: `pnpm install` fails with permission errors  
**Solution**: Run `sudo chown -R $USER ~/.pnpm-store` to fix permissions

**Problem**: Images not loading in development  
**Solution**: Check that images are in `public/` directory and referenced with leading slash

**Problem**: Build fails with TypeScript errors  
**Solution**: Run `pnpm type-check` to see full error details

**Problem**: Contact form doesn't send emails  
**Solution**: Verify RESEND_API_KEY is set correctly in .env

## Additional Tools
- **Linting**: `pnpm lint` (ESLint + TypeScript)
- **Type checking**: `pnpm type-check` (TypeScript compiler)
- **Testing**: `pnpm test` (Jest + React Testing Library)
- **Building**: `pnpm build` (Next.js production build)
- **Preview build**: `pnpm preview` (Test production build locally)

## Development Workflow

### Adding New Pages
```bash
# Create new page in app directory
touch app/new-page/page.tsx

# Page will be automatically routed at /new-page
```

### Adding Blog Posts
```bash
# Create new MDX file in content/blog
touch content/blog/post-title.mdx

# Add frontmatter (title, date, description, etc.)
# Write content in Markdown
```

### Deploying to Production
```bash
# Build and test locally first
pnpm build
pnpm preview

# Push to main branch
git push origin main

# Cloudflare Pages will automatically build and deploy
```

## Project Structure
```
your-dedicated-marketer-site/
├── app/                  # Next.js App Router pages
├── components/           # React components
├── content/             # MDX blog posts
├── public/              # Static assets
├── styles/              # Global styles
└── lib/                 # Utilities and helpers
```
