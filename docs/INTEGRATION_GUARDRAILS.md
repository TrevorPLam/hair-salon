# Integration Guardrails

This document is a concise reference for shipping integrations without breaking performance, privacy, or trust. Use it alongside the marketing-first specs.

## Non-Negotiables

- Default-off: all integrations must ship disabled until explicitly enabled.
- Consent-gated: analytics and marketing scripts must not load before consent.
- No PII: event payloads must never include emails, phone numbers, or names.
- Truthfulness: urgency and recent-activity widgets must be system-sourced or render neutral copy.

## Consent Categories

- necessary
- functional
- analytics
- marketing

Each category must track state as unknown, granted, or denied, and be persisted with cookie + local storage.

## Script Loading Rules

- on_page_load: load after page becomes interactive and consent is granted.
- on_interaction: load only after explicit user action.
- idle: load during idle time if consent is granted.

## Event Taxonomy (Canonical)

- book_click
- contact_click
- lead_submit
- gallery_open
- testimonial_engage
- review_submit
- cta_click

## Performance Budgets

- Keep third-party scripts within page budgets; lazy-load non-critical providers.
- Use thumbnails in grids and lazy-load full-resolution media in modals.
- Video embeds load on click only.

## CSP Allowlist

Each integration must declare domains for script, image, connect, and frame sources. The CSP allowlist is generated from enabled integrations only.

## Related Specs

- Marketing-first requirements: [.kiro/specs/marketing-first-enhancements/requirements.md](../.kiro/specs/marketing-first-enhancements/requirements.md)
- Marketing-first design: [.kiro/specs/marketing-first-enhancements/design.md](../.kiro/specs/marketing-first-enhancements/design.md)
