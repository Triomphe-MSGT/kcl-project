import { expect, test } from '@playwright/test'

const locales = ['en', 'fr'] as const

const publicRoutes = [
  '/',
  '/about/',
  '/services/',
  '/procurement/',
  '/resources/',
  '/contact/',
  '/faq/',
] as const

for (const locale of locales) {
  test.describe(`smoke (${locale})`, () => {
    for (const route of publicRoutes) {
      test(`renders ${locale}${route}`, async ({ page }) => {
        const response = await page.goto(`/${locale}${route}`)
        expect(response?.status()).toBeLessThan(400)
        await expect(page.locator('header')).toBeVisible()
        await expect(page.locator('footer')).toBeVisible()
        await expect(page.getByRole('main')).toBeVisible()
      })
    }

    test('redirects legacy /products/ to procurement', async ({ page }) => {
      await page.goto(`/${locale}/products/`)
      await expect(page).toHaveURL(new RegExp(`/${locale}/procurement/?$`))
    })
  })
}

test('home page exposes primary navigation links', async ({ page }) => {
  await page.goto('/en/')

  for (const href of ['/about/', '/services/', '/procurement/', '/contact/']) {
    await expect(page.locator(`header a[href*="${href}"]`).first()).toBeVisible()
  }
})
