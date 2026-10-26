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
  await page.keyboard.press('End')
  await expect(rail.locator('a[aria-current="location"]')).toHaveText('Smile demo')
  await page.setViewportSize({ width: 390, height: 800 })
  await expect(rail).toBeHidden()
})

test('Every top-level page has a section rail whose items mark themselves when clicked', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const rails = {
    '/experience': ['Intro', 'Timeline', 'Companies', 'Connect'],
    '/projects': ['Intro', 'Work', 'Awards', 'Connect'],
    '/research': ['Intro', 'Interests', 'Ongoing', 'Publications', 'Connect'],
    '/education': ['Schools', 'Courses', 'Connect'],
  }
  for (const [path, titles] of Object.entries(rails)) {
    await page.goto(path)
    const rail = page.getByRole('navigation', { name: 'On this page' })
    await expect(rail.getByRole('link')).toHaveText(titles)
    for (const href of await rail.getByRole('link').evaluateAll(links => links.map(link => link.getAttribute('href')))) await expect(page.locator(href)).toHaveCount(1)
    for (const title of titles) {
      await rail.getByRole('link', { name: title, exact: true }).click()
      await expect(rail.locator('a[aria-current="location"]')).toHaveText(title)
    }
  }
})
