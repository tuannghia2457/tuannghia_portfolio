import { test, expect } from '@playwright/test'

test('All five roles are consolidated under their four companies with complete employment details', async ({ page }) => {
  await page.goto('/experience')
  const rows = page.locator('.experience-item')
  // Timeline order is newest start first: Odylytics, IVS, BSEC web, BSEC teaching, SDE.
  for (const [index, count] of [1, 3, 2, 1, 2].entries()) {
    await rows.nth(index).locator('.experience-details > summary').click()
    await expect(rows.nth(index).locator('.role-responsibilities li')).toHaveCount(count)
  }
  const webRole = rows.nth(2)
  await expect(webRole.locator('strong')).toContainText(['IELTS assessment platform', '200+ active students per month', 'Playwright automation tool', '3× faster'])
  // Company panels tell the story instead of repeating the timeline's task lists.
  const panel = page.locator('#company-detail-panel')
  for (const [name, count, employment] of [
    ['Individual Systems Joint Stock Company', 1, 'Internship'],
    ['Best Start English Center', 2, 'Part-time'],
    ['SDE Digital Technology Company Limited', 1, 'Internship'],
    ['Odylytics', 1, 'Odylytics'],
  ]) {
    await page.getByRole('button', { name: `Explore ${name}` }).click()
    await expect(panel.locator('.company-story')).not.toBeEmpty()
    await expect(panel.locator('.role-responsibilities, .tag-list')).toHaveCount(0)
    const roles = panel.locator('.company-role-list article')
    await expect(roles).toHaveCount(count)
    for (let index = 0; index < count; index++) await expect(roles.nth(index)).toContainText(employment)
  }
  await page.setViewportSize({ width: 320, height: 800 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})

test('Four real company logos disclose the correct roles and can be closed', async ({ page }) => {
  await page.goto('/experience')
  const buttons = page.locator('.company-logo-button'), panel = page.locator('#company-detail-panel')
  await expect(buttons).toHaveCount(4); await expect(panel).toBeHidden()
  for (const img of await buttons.locator('img').all()) {
    await img.scrollIntoViewIfNeeded()
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBeTruthy()
  }
  const ivs = page.getByRole('button', { name: 'Explore Individual Systems Joint Stock Company' })
  await ivs.click(); await expect(ivs).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).toContainText('satellite positioning'); await expect(panel).toContainText('Apr 2026')
  const bsec = page.getByRole('button', { name: 'Explore Best Start English Center' })
  await bsec.focus(); await page.keyboard.press('Enter')
  await expect(ivs).toHaveAttribute('aria-expanded', 'false')
  await expect(panel.locator('article')).toHaveCount(2)
  await expect(panel).toContainText('assessment platform'); await expect(panel).toContainText('Teaching Assistant')
  const sde = page.getByRole('button', { name: 'Explore SDE Digital Technology Company Limited' })
  await sde.click(); await expect(panel).toContainText('Mendix')
  await expect(panel.locator('article')).toHaveCount(1)
  await page.getByRole('button', { name: 'Close company details' }).click()
  await expect(panel).toBeHidden(); await expect(sde).toBeFocused()
  await sde.click(); await sde.click(); await expect(panel).toBeHidden()
  const odylytics = page.getByRole('button', { name: 'Explore Odylytics' })
  await odylytics.click()
  await expect(panel).toContainText('Chief Technology Officer')
  await expect(panel).toContainText('Jul 2026')
  await expect(panel.locator('article')).toHaveCount(1)
  await page.setViewportSize({ width: 320, height: 800 })
  await ivs.click(); await expect(panel).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})
