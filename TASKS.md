# Remaining Tasks

## Task 1: Create `SiteConfig` type + `site.config.ts`

- [ ] Define `SiteConfig` TypeScript type in `templates/shared/types/site-config.ts`
  - [ ] `name`, `tagline`, `description`, `url` fields
  - [ ] `theme` object (primary, secondary, accent, background, foreground colors as HSL strings)
  - [ ] `navLinks` array (`{ label, href }`)
  - [ ] `socialLinks` array (`{ platform, url, icon }`)
  - [ ] `footer` config (columns, copyright, links)
  - [ ] `conversionFlow` field referencing Task 4's type
  - [ ] `contact` object (phone, email, address, hours)
  - [ ] `seo` defaults (ogImage, twitterHandle)
- [ ] Create `templates/hair-salon/site.config.ts` implementing the type with current hardcoded values

## Task 2: Wire `site.config.ts` into layout/components

- [ ] Replace hardcoded strings in `app/layout.tsx` (site name, description, metadata)
- [ ] Replace hardcoded nav items in `components/Navigation.tsx`
- [ ] Replace hardcoded footer content in `components/Footer.tsx`
- [ ] Replace hardcoded contact info across pages (contact, book)
- [ ] Replace hardcoded social links
- [ ] Wire theme colors from config into CSS variables (or keep CSS-only approach)

## Task 3: Extract shared components to `templates/shared/`

- [ ] Create `templates/shared/` package with `package.json`
- [ ] Move reusable layout shell (Navigation, Footer wrapper patterns)
- [ ] Create shared `RootLayout` component that reads `site.config.ts`
- [ ] Create shared SEO/metadata helpers
- [ ] Update hair-salon template to import from `templates/shared/`
- [ ] Verify build still passes

## Task 4: Define `ConversionFlow` interface

- [ ] Define `ConversionFlow` union type: `'booking' | 'contact' | 'quote' | 'dispatch'`
- [ ] Define per-flow config interfaces (booking fields, quote fields, etc.)
- [ ] Create `ConversionFlowConfig` discriminated union in shared types
- [ ] Wire into `SiteConfig.conversionFlow`
- [ ] Hair salon uses `type: 'booking'` with existing booking form

## Task 5: Build second template (e.g., plumber)

- [ ] Create `templates/plumber/` scaffold (copy structure, not content)
- [ ] Create `templates/plumber/site.config.ts` with plumber-specific values
- [ ] Create plumber `globals.css` with different color palette
- [ ] Create plumber-specific pages (home, services, quote, about, contact)
- [ ] Use `ConversionFlow: 'quote'` instead of booking
- [ ] Verify both templates build independently
- [ ] Add plumber build script to turbo.json

## Task 6: Add `"type": "module"` to eslint-config package.json

- [ ] One-line fix in `packages/config/eslint-config/package.json`

## Task 7: Clean up verbose JSDoc annotations

- [ ] Write script to strip `@file`, `@role`, `@summary`, `@entrypoints`, `@exports`, `@depends_on`, `@used_by`, `@runtime`, `@data_flow`, `@invariants`, `@gotchas`, `@opportunities`, `@verification`, `@status`, `@issues` blocks
- [ ] Run across all `.ts`/`.tsx` files
- [ ] Keep only meaningful inline comments and essential JSDoc (`@param`, `@returns`, `@example`, `@throws`)
- [ ] Verify build + tests still pass
