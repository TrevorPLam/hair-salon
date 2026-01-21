# tests/AGENTS.md — End-to-End Tests

Last Updated: 2026-01-21
Applies To: Any agent working in tests/

**Quick Reference:** See `/BESTPR.md` for comprehensive repo standards.

## Purpose
This folder contains end-to-end (E2E) tests using Playwright. These tests validate critical user flows in a real browser environment.

---

## Structure

```
tests/
├── AGENTS.md           # This file
└── e2e/
    ├── contact.spec.ts     # Contact form submission
    ├── navigation.spec.ts  # Site navigation
    └── ...
```

---

## Test Patterns

### File Naming
- **Format:** `feature.spec.ts` (e.g., `contact.spec.ts`)
- **Location:** `tests/e2e/`

### Test Structure
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page
    await page.goto('/path')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.getByRole('button', { name: 'Submit' })
    
    // Act
    await button.click()
    
    // Assert
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

---

## Critical Flows to Test

### Must Have
1. **Contact Form:** Submit valid form, see success message
2. **Navigation:** Click all menu items, verify page loads
3. **Search:** Enter query, see results
4. **Mobile Menu:** Open menu, click items, verify behavior

### Should Have
1. **Form Validation:** Submit invalid data, see errors
2. **Accessibility:** Keyboard navigation, focus management
3. **Rate Limiting:** Submit multiple forms, verify rate limit

---

## Running Tests

### Commands
```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e -- --ui      # Interactive mode
npm run test:e2e -- --debug   # Debug mode
```

### Configuration
- **File:** `playwright.config.ts`
- **Browsers:** Chromium, Firefox, WebKit
- **Base URL:** `http://localhost:3000` (requires `npm run dev`)

---

## Conventions

### Selectors
```typescript
// Prefer accessible selectors (user-facing)
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByText('Success')

// Avoid implementation details
page.locator('.submit-button')  // ❌ Fragile
page.locator('#email-input')    // ❌ Fragile
```

### Assertions
```typescript
// Be specific and user-focused
await expect(page.getByText('Thank you')).toBeVisible()
await expect(page).toHaveURL('/success')
await expect(input).toHaveValue('test@example.com')

// Avoid vague assertions
await expect(page.locator('div')).toBeVisible()  // ❌ What div?
```

### Waits
```typescript
// Let Playwright auto-wait (preferred)
await page.getByText('Loading...').waitFor({ state: 'hidden' })

// Avoid arbitrary timeouts
await page.waitForTimeout(5000)  // ❌ Flaky
```

---

## Adding a New Test

1. **Identify flow:** What user journey are you testing?
2. **Create file:** `tests/e2e/feature.spec.ts`
3. **Write test:** Use accessible selectors and clear assertions
4. **Run locally:** `npm run test:e2e` to verify
5. **Update this file:** Add to "Critical Flows" list

---

## Debugging Tips

### Interactive Mode
```bash
npm run test:e2e -- --ui
```
Opens Playwright UI for step-by-step debugging.

### Headed Mode
```bash
npm run test:e2e -- --headed
```
Opens browser window so you can watch tests run.

### Debug Mode
```bash
npm run test:e2e -- --debug
```
Opens Playwright Inspector with breakpoints.

### Screenshots
```typescript
await page.screenshot({ path: 'screenshot.png' })
```

---

## Common Patterns

### Form Submission
```typescript
test('submits contact form', async ({ page }) => {
  await page.goto('/contact')
  
  await page.getByLabel('Name').fill('John Doe')
  await page.getByLabel('Email').fill('john@example.com')
  await page.getByLabel('Phone').fill('555-1234')
  await page.getByLabel('Message').fill('Hello!')
  
  await page.getByRole('button', { name: 'Send Message' }).click()
  
  await expect(page.getByText('Thank you')).toBeVisible()
})
```

### Navigation Testing
```typescript
test('navigates to services', async ({ page }) => {
  await page.goto('/')
  
  await page.getByRole('link', { name: 'Services' }).click()
  
  await expect(page).toHaveURL('/services')
  await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()
})
```

### Mobile Testing
```typescript
test.use({ viewport: { width: 375, height: 667 } })

test('opens mobile menu', async ({ page }) => {
  await page.goto('/')
  
  await page.getByRole('button', { name: 'Menu' }).click()
  await expect(page.getByRole('navigation')).toBeVisible()
})
```

---

## Don't

- ❌ Test implementation details (class names, internal state)
- ❌ Use arbitrary waits (`waitForTimeout`)
- ❌ Write tests that depend on external services (mock API calls)
- ❌ Test unit-level logic (use Vitest for that)

---

**See also:** 
- `/BESTPR.md` for complete best practices guide
- `/__tests__/AGENTS.md` for unit testing guidelines
- `playwright.config.ts` for E2E configuration
