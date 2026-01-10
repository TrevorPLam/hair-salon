import { test, expect } from '@playwright/test'

test('contact form submission on preview deploy', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': '203.0.113.120' })
  await page.goto('/contact')

  await page.getByLabel('Name').fill('Preview Tester')
  await page.getByLabel('Email').fill(`preview.${Date.now()}@example.com`)
  await page.getByLabel('Phone').fill('555-000-1234')
  await page.getByLabel('Message').fill(
    'Submitting the contact form in a preview environment should return success.'
  )

  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByRole('alert')).toContainText(/thank you for your message/i)
})
