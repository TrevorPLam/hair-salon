# File Inventory

Status key: pending | in-progress | done

## Root

| Path                | Role   | Criticality   | Status  |
| ------------------- | ------ | ------------- | ------- |
| .editorconfig       | config | optional      | done    |
| .env.example        | config | important     | done    |
| .eslintignore       | config | optional      | done    |
| .gitignore          | config | optional      | done    |
| .markdownlint.json  | config | optional      | done    |
| .npmrc              | config | important     | done    |
| .pnpmrc             | config | important     | done    |
| .prettierignore     | config | optional      | done    |
| .prettierrc         | config | optional      | done    |
| ANALYSIS.md         | docs   | optional      | done    |
| CONFIG.md           | docs   | important     | done    |
| CONTRIBUTING.md     | docs   | important     | done    |
| docker-compose.yml  | infra  | important     | done    |
| jest.config.js      | test   | important     | done    |
| jest.helpers.ts     | test   | optional      | done    |
| jest.setup.js       | test   | important     | done    |
| LICENSE             | docs   | optional      | done    |
| package.json        | config | critical path | done    |
| pnpm-lock.yaml      | config | critical path | pending |
| pnpm-workspace.yaml | config | critical path | done    |
| README.md           | docs   | important     | done    |
| SECURITY.md         | docs   | important     | done    |
| tasks.md            | docs   | optional      | done    |
| TODO.md             | docs   | optional      | done    |
| tsconfig.base.json  | config | important     | done    |
| tsconfig.json       | config | important     | done    |
| turbo.json          | config | important     | done    |

## .githooks

| Path                    | Role   | Criticality | Status  |
| ----------------------- | ------ | ----------- | ------- |
| .githooks/INDEX.toon    | script | optional    | pending |
| .githooks/post-checkout | script | optional    | pending |
| .githooks/post-merge    | script | optional    | pending |

## .github

| Path                              | Role   | Criticality | Status  |
| --------------------------------- | ------ | ----------- | ------- |
| .github/dependabot.yml            | config | optional    | pending |
| .github/workflows/ci.yml          | ci     | important   | pending |
| .github/workflows/secret-scan.yml | ci     | important   | pending |

## .kiro

| Path                                                     | Role | Criticality | Status  |
| -------------------------------------------------------- | ---- | ----------- | ------- |
| .kiro/specs/marketing-first-enhancements/.config.kiro    | docs | optional    | pending |
| .kiro/specs/marketing-first-enhancements/design.md       | docs | optional    | pending |
| .kiro/specs/marketing-first-enhancements/requirements.md | docs | optional    | pending |
| .kiro/steering/product.md                                | docs | optional    | pending |
| .kiro/steering/structure.md                              | docs | optional    | pending |
| .kiro/steering/tech.md                                   | docs | optional    | pending |

## .vscode

| Path                    | Role   | Criticality | Status  |
| ----------------------- | ------ | ----------- | ------- |
| .vscode/extensions.json | config | optional    | pending |
| .vscode/settings.json   | config | optional    | pending |

## apps/web

| Path                          | Role    | Criticality   | Status  |
| ----------------------------- | ------- | ------------- | ------- |
| apps/web/Dockerfile           | infra   | important     | pending |
| apps/web/eslint.config.mjs    | config  | important     | pending |
| apps/web/middleware.ts        | runtime | critical path | pending |
| apps/web/next-env.d.ts        | config  | optional      | pending |
| apps/web/next.config.js       | config  | important     | pending |
| apps/web/package.json         | config  | critical path | pending |
| apps/web/package.json.bak     | docs    | optional      | pending |
| apps/web/postcss.config.js    | config  | important     | pending |
| apps/web/tailwind.config.js   | config  | important     | pending |
| apps/web/tsconfig.json        | config  | important     | pending |
| apps/web/tsconfig.tsbuildinfo | asset   | optional      | pending |

### apps/web/app

| Path                                             | Role    | Criticality   | Status  |
| ------------------------------------------------ | ------- | ------------- | ------- |
| apps/web/app/globals.css                         | asset   | important     | pending |
| apps/web/app/layout.tsx                          | runtime | critical path | done    |
| apps/web/app/loading.tsx                         | runtime | optional      | done    |
| apps/web/app/not-found.tsx                       | runtime | important     | done    |
| apps/web/app/page.tsx                            | runtime | critical path | done    |
| apps/web/app/providers.tsx                       | runtime | important     | done    |
| apps/web/app/robots.ts                           | runtime | important     | done    |
| apps/web/app/sitemap.ts                          | runtime | important     | done    |
| apps/web/app/about/page.tsx                      | runtime | important     | done    |
| apps/web/app/api/og/route.tsx                    | runtime | important     | pending |
| apps/web/app/blog/page.tsx                       | runtime | important     | done    |
| apps/web/app/blog/[slug]/page.tsx                | runtime | important     | done    |
| apps/web/app/book/page.tsx                       | runtime | important     | done    |
| apps/web/app/contact/page.tsx                    | runtime | important     | done    |
| apps/web/app/gallery/page.tsx                    | runtime | important     | done    |
| apps/web/app/pricing/page.tsx                    | runtime | important     | done    |
| apps/web/app/privacy/page.tsx                    | runtime | important     | done    |
| apps/web/app/search/page.tsx                     | runtime | important     | done    |
| apps/web/app/services/page.tsx                   | runtime | important     | done    |
| apps/web/app/services/coloring/page.tsx          | runtime | important     | done    |
| apps/web/app/services/haircuts/page.tsx          | runtime | important     | done    |
| apps/web/app/services/special-occasions/page.tsx | runtime | important     | done    |
| apps/web/app/services/treatments/page.tsx        | runtime | important     | done    |
| apps/web/app/team/page.tsx                       | runtime | important     | done    |
| apps/web/app/terms/page.tsx                      | runtime | important     | done    |

### apps/web/components

| Path                                           | Role    | Criticality   | Status  |
| ---------------------------------------------- | ------- | ------------- | ------- |
| apps/web/components/AnalyticsConsentBanner.tsx | runtime | critical path | pending |
| apps/web/components/Breadcrumbs.tsx            | runtime | important     | pending |
| apps/web/components/ErrorBoundary.tsx          | runtime | important     | pending |
| apps/web/components/FinalCTA.tsx               | runtime | optional      | pending |
| apps/web/components/Footer.tsx                 | runtime | important     | pending |
| apps/web/components/Hero.tsx                   | runtime | important     | pending |
| apps/web/components/InstallPrompt.tsx          | runtime | optional      | pending |
| apps/web/components/Navigation.tsx             | runtime | important     | pending |
| apps/web/components/SkipToContent.tsx          | runtime | important     | pending |
| apps/web/components/SocialProof.tsx            | runtime | optional      | pending |
| apps/web/components/ValueProps.tsx             | runtime | important     | pending |

### apps/web/features

| Path                                                          | Role    | Criticality   | Status  |
| ------------------------------------------------------------- | ------- | ------------- | ------- |
| apps/web/features/analytics/index.ts                          | runtime | important     | pending |
| apps/web/features/analytics/lib/analytics-consent.ts          | runtime | critical path | pending |
| apps/web/features/analytics/lib/analytics.ts                  | runtime | critical path | pending |
| apps/web/features/blog/index.ts                               | runtime | important     | pending |
| apps/web/features/blog/components/BlogPostContent.tsx         | runtime | important     | pending |
| apps/web/features/blog/lib/blog-images.ts                     | runtime | important     | pending |
| apps/web/features/blog/lib/blog.ts                            | runtime | important     | pending |
| apps/web/features/contact/index.ts                            | runtime | important     | pending |
| apps/web/features/contact/components/ContactForm.tsx          | runtime | important     | pending |
| apps/web/features/contact/lib/contact-form-schema.ts          | runtime | important     | pending |
| apps/web/features/hubspot/index.ts                            | runtime | important     | pending |
| apps/web/features/hubspot/lib/hubspot-client.ts               | runtime | important     | pending |
| apps/web/features/search/index.ts                             | runtime | important     | pending |
| apps/web/features/search/components/SearchDialog.tsx          | runtime | important     | pending |
| apps/web/features/search/components/SearchPage.tsx            | runtime | important     | pending |
| apps/web/features/services/index.ts                           | runtime | important     | pending |
| apps/web/features/services/components/ServiceDetailLayout.tsx | runtime | important     | pending |
| apps/web/features/services/components/ServicesOverview.tsx    | runtime | important     | pending |
| apps/web/features/supabase/index.ts                           | runtime | important     | pending |
| apps/web/features/supabase/lib/supabase-leads.ts              | runtime | important     | pending |

### apps/web/lib

| Path                                    | Role    | Criticality   | Status  |
| --------------------------------------- | ------- | ------------- | ------- |
| apps/web/lib/actions.ts                 | runtime | important     | pending |
| apps/web/lib/constants.ts               | runtime | important     | pending |
| apps/web/lib/csp.ts                     | runtime | critical path | pending |
| apps/web/lib/env.public.ts              | runtime | critical path | pending |
| apps/web/lib/env.ts                     | runtime | critical path | pending |
| apps/web/lib/logger.ts                  | runtime | important     | pending |
| apps/web/lib/rate-limit.ts              | runtime | important     | pending |
| apps/web/lib/request-context.server.ts  | runtime | important     | pending |
| apps/web/lib/request-context.ts         | runtime | important     | pending |
| apps/web/lib/request-validation.ts      | runtime | important     | pending |
| apps/web/lib/sanitize.ts                | runtime | important     | pending |
| apps/web/lib/search.ts                  | runtime | important     | pending |
| apps/web/lib/security-headers.ts        | runtime | important     | pending |
| apps/web/lib/sentry-client.ts           | runtime | important     | pending |
| apps/web/lib/sentry-sanitize.ts         | runtime | important     | pending |
| apps/web/lib/sentry-server.ts           | runtime | important     | pending |
| apps/web/lib/utils.ts                   | runtime | important     | pending |
| apps/web/lib/actions/helpers.ts         | runtime | important     | pending |
| apps/web/lib/actions/hubspot.ts         | runtime | important     | pending |
| apps/web/lib/actions/submit.ts          | runtime | important     | pending |
| apps/web/lib/actions/supabase.ts        | runtime | important     | pending |
| apps/web/lib/actions/types.ts           | runtime | important     | pending |
| apps/web/lib/**tests**/env-setup.ts     | test    | optional      | pending |
| apps/web/lib/**tests**/env.test.ts      | test    | important     | pending |
| apps/web/lib/**tests**/sanitize.test.ts | test    | important     | pending |

## docs

| Path                                  | Role | Criticality | Status  |
| ------------------------------------- | ---- | ----------- | ------- |
| docs/BASELINE.md                      | docs | important   | pending |
| docs/INTEGRATION_GUARDRAILS.md        | docs | important   | pending |
| docs/README.md                        | docs | important   | pending |
| docs/TEMPLATE_SETUP.md                | docs | important   | pending |
| docs/TESTING_STATUS.md                | docs | important   | pending |
| docs/archive/CONFIG_CONFLICTS.md      | docs | optional    | pending |
| docs/archive/CONFIG_GAPS.md           | docs | optional    | pending |
| docs/archive/CONFIG_MAP.md            | docs | optional    | pending |
| docs/archive/CONFIG_VERSIONS.md       | docs | optional    | pending |
| docs/archive/CONFIGURATION_AUDIT.md   | docs | optional    | pending |
| docs/archive/EXECUTIVE_SUMMARY.md     | docs | optional    | pending |
| docs/archive/INFRASTRUCTURE.md        | docs | optional    | pending |
| docs/archive/PATCH_PLAN.md            | docs | optional    | pending |
| docs/archive/README.md                | docs | optional    | pending |
| docs/archive/VERIFICATION_EVIDENCE.md | docs | optional    | pending |

## packages/config

| Path                                           | Role   | Criticality | Status  |
| ---------------------------------------------- | ------ | ----------- | ------- |
| packages/config/package.json                   | config | important   | pending |
| packages/config/eslint-config/library.js       | config | important   | pending |
| packages/config/eslint-config/next.js          | config | important   | pending |
| packages/config/eslint-config/package.json     | config | important   | pending |
| packages/config/typescript-config/base.json    | config | important   | pending |
| packages/config/typescript-config/node.json    | config | important   | pending |
| packages/config/typescript-config/package.json | config | important   | pending |
| packages/config/typescript-config/react.json   | config | important   | pending |

## packages/ui

| Path                                               | Role    | Criticality | Status  |
| -------------------------------------------------- | ------- | ----------- | ------- |
| packages/ui/.ai-context.md                         | docs    | optional    | pending |
| packages/ui/eslint.config.mjs                      | config  | important   | pending |
| packages/ui/package.json                           | config  | important   | pending |
| packages/ui/tsconfig.json                          | config  | important   | pending |
| packages/ui/src/components/Accordion.tsx           | runtime | important   | pending |
| packages/ui/src/components/Button.tsx              | runtime | important   | pending |
| packages/ui/src/components/Card.tsx                | runtime | important   | pending |
| packages/ui/src/components/Container.tsx           | runtime | important   | pending |
| packages/ui/src/components/index.ts                | runtime | important   | pending |
| packages/ui/src/components/Input.tsx               | runtime | important   | pending |
| packages/ui/src/components/Section.tsx             | runtime | important   | pending |
| packages/ui/src/components/Select.tsx              | runtime | important   | pending |
| packages/ui/src/components/Skeleton.tsx            | runtime | important   | pending |
| packages/ui/src/components/Textarea.tsx            | runtime | important   | pending |
| packages/ui/src/components/**tests**/index.test.ts | test    | optional    | pending |

## packages/utils

| Path                                       | Role    | Criticality | Status  |
| ------------------------------------------ | ------- | ----------- | ------- |
| packages/utils/eslint.config.mjs           | config  | important   | pending |
| packages/utils/package.json                | config  | important   | pending |
| packages/utils/tsconfig.json               | config  | important   | pending |
| packages/utils/src/index.ts                | runtime | important   | pending |
| packages/utils/src/**tests**/index.test.ts | test    | optional    | pending |
