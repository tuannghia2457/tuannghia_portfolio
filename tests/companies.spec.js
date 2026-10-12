import { test, expect } from '@playwright/test'

test('Employment disclosures show separate contributions with readable results and matching company details', async ({ page }) => {
  await page.goto('/experience')
  const rows = page.locator('.experience-item')
  for (const [index, count] of [3, 2, 1, 2].entries()) {
    await rows.nth(index).locator('summary').click()
    await expect(rows.nth(index).locator('.role-responsibilities li')).toHaveCount(count)
  }
  const webRole = rows.nth(1)
  await expect(webRole.locator('strong')).toContainText(['IELTS assessment platform', '200+ active students per month', 'Playwright automation tool', '3× faster'])
  await page.getByRole('button', { name: 'Explore Best Start English Center' }).click()
  const companyRoles = page.locator('.company-role-list article')
  await expect(companyRoles.first().locator('.role-responsibilities li')).toHaveText(await webRole.locator('.role-responsibilities li').allTextContents())
  await page.setViewportSize({ width: 320, height: 800 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})

test('Three real company logos disclose the correct roles and can be closed', async ({ page }) => {
  await page.goto('/experience')
  const buttons = page.locator('.company-logo-button'), panel = page.locator('#company-detail-panel')
  await expect(buttons).toHaveCount(3); await expect(panel).toBeHidden()
  for (const img of await buttons.locator('img').all()) {
    await img.scrollIntoViewIfNeeded()
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBeTruthy()
  }
  const ivs = page.getByRole('button', { name: 'Explore Individual Systems Joint Stock Company' })
  await ivs.click(); await expect(ivs).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).toContainText('Voronoi'); await expect(panel).toContainText('APR 2026')
  const bsec = page.getByRole('button', { name: 'Explore Best Start English Center' })
  await bsec.focus(); await page.keyboard.press('Enter')
  await expect(ivs).toHaveAttribute('aria-expanded', 'false')
  await expect(panel.locator('article')).toHaveCount(2)
  await expect(panel).toContainText('200+'); await expect(panel).toContainText('Teaching Assistant')
  const sde = page.getByRole('button', { name: 'Explore SDE Digital Technology Company Limited' })
  await sde.click(); await expect(panel).toContainText('Mendix')
  await expect(panel.locator('article')).toHaveCount(1)
  await page.getByRole('button', { name: 'Close company details' }).click()
  await expect(panel).toBeHidden(); await expect(sde).toBeFocused()
  await sde.click(); await sde.click(); await expect(panel).toBeHidden()
  await page.setViewportSize({ width: 320, height: 800 })
  await ivs.click(); await expect(panel).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})
