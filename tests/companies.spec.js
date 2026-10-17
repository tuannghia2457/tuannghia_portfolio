import { test, expect } from '@playwright/test'

test('All five roles are consolidated under their four companies with complete employment details', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.locator('.experience-list, .experience-details')).toHaveCount(0)
  const panel = page.locator('#company-detail-panel')
  for (const [name, counts, employment] of [
    ['Individual Systems Joint Stock Company', [3], 'Internship'],
    ['Best Start English Center', [2, 1], 'Part-time'],
    ['SDE Digital Technology Company Limited', [2], 'Internship'],
    ['Odylytics', [2], 'Odylytics'],
  ]) {
    await page.getByRole('button', { name: `Explore ${name}` }).click()
    const roles = panel.locator('.company-role-list article')
    await expect(roles).toHaveCount(counts.length)
    for (const [index, count] of counts.entries()) {
      await expect(roles.nth(index).locator('.role-responsibilities li')).toHaveCount(count)
      await expect(roles.nth(index)).toContainText(employment)
      await expect(roles.nth(index).locator('.tag-list .tag').first()).toBeVisible()
    }
    if (name === 'Best Start English Center') {
      await expect(roles.first().locator('strong')).toContainText(['IELTS assessment platform', '200+ active students per month', 'Playwright automation tool', '3\u00d7 faster'])
      await expect(roles.first()).toContainText('Remote')
      await expect(roles.nth(1)).toContainText('On-site')
    }
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
  const odylytics = page.getByRole('button', { name: 'Explore Odylytics' })
  await odylytics.click()
  await expect(panel).toContainText('Chief Technology Officer & Computer Vision Engineer')
  await expect(panel).toContainText('JUL 2026')
  await expect(panel.locator('article')).toHaveCount(1)
  await page.setViewportSize({ width: 320, height: 800 })
  await ivs.click(); await expect(panel).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})
