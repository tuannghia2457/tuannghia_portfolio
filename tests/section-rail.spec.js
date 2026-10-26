import { test, expect } from '@playwright/test'
test('Home section rail marks the current section, jumps to anchors and hides on phones', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const rail = page.getByRole('navigation', { name: 'On this page' })
  await expect(rail.getByRole('link')).toHaveCount(7)
  await expect(rail.locator('a[aria-current="location"]')).toHaveText('Intro')
  await rail.getByRole('link', { name: 'Toolkit' }).click()
  await expect(page).toHaveURL(/#skills$/)
  await expect(rail.locator('a[aria-current="location"]')).toHaveText('Toolkit')
  await page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await expect(rail.locator('a[aria-current="location"]')).toHaveText('Smile demo')
  await page.setViewportSize({ width: 390, height: 800 })
  await expect(rail).toBeHidden()
})

test('Scrolling settles gently on a section start just ahead, without trapping slow wheel scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/'); await page.mouse.move(700, 450)
  const sectionTop = id => page.evaluate(id => Math.round(document.getElementById(id).getBoundingClientRect().top), id)
  const docTop = await page.evaluate(() => document.getElementById('skills').getBoundingClientRect().top + scrollY)
  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), docTop - 96 - 190)
  await page.mouse.wheel(0, 100)
  await expect.poll(() => sectionTop('skills')).toBe(96)
  const ys = []
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(450); ys.push(await page.evaluate(() => scrollY)) }
  for (let i = 1; i < ys.length; i++) expect(ys[i]).toBeGreaterThan(ys[i - 1])
})
