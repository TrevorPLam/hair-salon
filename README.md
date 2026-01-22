# Your Dedicated Marketer

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)
![Diamond Standard](https://img.shields.io/badge/Standard-Diamond-b91c1c)

A high-performance marketing site built to be fast, auditable, and safe-by-default. The repo emphasizes clear governance, static delivery through Cloudflare Pages, and a production-ready lead capture pipeline (Supabase + HubSpot) that prioritizes reliability over flashy demos.

---

## At a glance

| Area | Summary |
| --- | --- |
| **Framework** | Next.js App Router (React 19) with TypeScript strict mode. |
| **Rendering** | Static output for Cloudflare Pages via `@cloudflare/next-on-pages`. |
| **Styling** | Tailwind CSS with utility-first patterns. |
| **Content** | MDX-powered blog content with build-time rendering. |
| **Search** | Pre-indexed, client-side search (no runtime API). |
| **Lead capture** | Supabase storage + HubSpot CRM sync (best-effort). |
| **Rate limiting** | Upstash Redis in production, in-memory fallback in dev/test. |
| **Observability** | Structured logs + optional Sentry + GA4 consent gating. |

---

## What this repo provides ("bells & whistles")

### Product + UX
- **Marketing site foundation** with dedicated pages, blog, and contact form.
- **Search dialog** backed by a prebuilt index for instant results.
- **PWA-ready assets** (install prompt + manifest) for app-like installs.

### Platform + performance
- **Cloudflare Pages-first build** with static output (`.vercel/output/static`).
- **MDX processing pipeline** with syntax highlighting and slug support.
- **Image handling for Pages**: Cloudflare builds use unoptimized images unless a custom loader is added.

### Lead capture + reliability
- **Required v1 pipeline**: Supabase persistence + HubSpot sync.
- **Best-effort CRM sync**: submissions succeed even if HubSpot is down.
- **Suspicious submission capture**: rate-limited entries are still stored with flags.

### Quality + governance
- **Deterministic governance model** (`CODEBASECONSTITUTION.md`, `READMEAI.md`, `P0–P3TODO.md`).
- **Audit-first posture** with explicit runbooks and verification scripts.
- **Testing stack**: Vitest + Playwright + accessibility/lighthouse audits.

---

## How it works (deep dive)

### Rendering model
- Pages are built as static assets and served on Cloudflare Pages.
- Client components are used only for interactive UI (forms, dialogs, consent banners).
- MDX content is compiled at build time.

### Lead capture flow (Supabase + HubSpot)
1. **User submits** the contact form.
2. **Rate limiting** checks email + IP; suspicious requests are flagged.
3. **Supabase insert** happens first and is required.
4. **HubSpot upsert** runs best-effort; failures are recorded for retry without blocking UX.

### Observability + analytics
- Structured logs include correlation IDs for request tracing.
- Sentry is optional and controlled via env vars.
- GA4 tracking is gated by explicit user consent (cookie + localStorage).

---

## Quick start

### Prerequisites
- Node.js `>=20 <23`
- npm `>=10`

### Install + dev
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Verification (Diamond Standard checks)

Recommended commands (from `repo.manifest.yaml`):

```bash
scripts/ai-audit.sh
scripts/check.sh
scripts/security-scan.sh
```

Common local checks:

```bash
npm run test
npm run type-check
npm run lint
```

---

## Environment variables

All variables are validated on startup. The v1 lead pipeline **requires** Supabase + HubSpot credentials.

**Required for v1 lead capture**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `HUBSPOT_PRIVATE_APP_TOKEN`

**Optional (recommended for production)**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**Optional integrations**
- `NEXT_PUBLIC_ANALYTICS_ID`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_ENVIRONMENT`

For the full, annotated list see [`env.example`](env.example) and [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Deployment (Cloudflare Pages)

```bash
npm run pages:build
```

**Output directory:** `.vercel/output/static`

For exact build settings, env variables, and rollback steps, see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Project structure

```
app/            # Next.js App Router pages and routes
components/     # UI + feature components
content/        # MDX content (blog)
docs/           # Governance, audits, and runbooks
lib/            # Server utilities, actions, schemas
public/         # Static assets
scripts/        # Verification + audit scripts
tests/          # Playwright E2E tests
__tests__/      # Vitest unit tests
```

---

## Governance (required reading)

This repo enforces a strict governance hierarchy to keep changes auditable:

1. [`CODEBASECONSTITUTION.md`](CODEBASECONSTITUTION.md)
2. [`READMEAI.md`](READMEAI.md)
3. [`P0TODO.md`](P0TODO.md), [`P1TODO.md`](P1TODO.md), [`P2TODO.md`](P2TODO.md), [`P3TODO.md`](P3TODO.md)
4. [`BESTPR.md`](BESTPR.md)

AI assistants **must** follow the above order and treat `P0–P3TODO.md` as the task truth sources.

---

## License

MIT License. See `LICENSE` for details.

---

*Maintained by the Your Dedicated Marketer team.*
