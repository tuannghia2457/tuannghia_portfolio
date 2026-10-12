import { test, expect } from '@playwright/test'
async function textContrast(page) {
  return page.evaluate(() => {
    const luminance = rgb => rgb.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0)
    const parse = color => {
      const channels = color.match(/[\d.]+/g)?.map(Number) || []
      // CSS color-mix serializes as color(srgb ...) with normalized channels.
      return color.startsWith('color(srgb ') ? channels.map((value, i) => i < 3 ? value * 255 : value) : channels
    }
    const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05)
    const failures = []
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('svg, [aria-hidden="true"], .period, .brand-mark') || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue
      const text = [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent).join('').trim()
      if (!text || !el.getBoundingClientRect().width) continue
      const style = getComputedStyle(el), fg = parse(style.color)
      let parent = el, bg
      while (parent) { const c = parse(getComputedStyle(parent).backgroundColor); if (c.length >= 3 && (c[3] ?? 1) === 1) { bg = c; break } parent = parent.parentElement }
      if (!bg) continue
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700)
      const measured = ratio(fg, bg)
      if (measured < (large ? 3 : 4.5)) failures.push({ text: text.slice(0, 65), class: el.className, ratio: measured.toFixed(2), color: style.color, background: bg })
    }
    return failures
  })
}
test('Every route stays light with accessible text, including expanded content', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  for (const path of ['/', '/about', '/projects', '/research', '/education', '/contact', '/projects/aquaguard', '/projects/pothole-surface-reconstruction', '/projects/virtualdouble-ant']) {
    await page.goto(path); await expect(page.locator('h1')).toHaveCount(1)
    await page.locator('details').evaluateAll(nodes => nodes.forEach(el => el.open = true))
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe('light')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(250, 249, 246)')
    expect(await textContrast(page), path).toEqual([])
  }
})
test('Button, navigation, card and companion interactive states use semantic roles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const button = page.locator('.button-primary').first()
  await expect(button).toHaveCSS('color', 'rgb(37, 37, 37)')
  await expect(button).toHaveCSS('background-color', 'rgb(255, 107, 0)')
  await button.hover(); await expect(button).toHaveCSS('border-color', 'rgb(230, 95, 0)')
  await expect(button).toHaveCSS('color', 'rgb(37, 37, 37)')
  await button.focus(); await expect(button).toHaveCSS('outline-color', 'rgb(37, 37, 37)')
  await page.mouse.down(); await expect(button).toHaveCSS('background-color', 'rgb(255, 107, 0)'); await page.mouse.move(0, 0); await page.mouse.up()
  const card = page.locator('.curated-card').first(); await card.hover(); await expect(card).toHaveCSS('border-color', 'rgb(230, 95, 0)')
  const character = page.locator('.mini-nghia-character'); await character.click()
  await expect(page.locator('.mini-nghia-bubble')).toBeVisible()
  await expect(page.locator('.mini-nghia-bubble')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  expect(await textContrast(page)).toEqual([])
  await page.getByRole('button', { name: 'Hide', exact: true }).click()
  await page.getByRole('button', { name: 'Show Mini Nghia pixel companion' }).click()
  await expect(character).toBeVisible()
  await page.goto('/contact'); const enable = page.getByRole('button', { name: 'Enable webcam' })
  await enable.evaluate(el => el.disabled = true)
  await expect(enable).toHaveCSS('background-color', 'rgb(243, 240, 235)')
  await expect(enable).toHaveCSS('color', 'rgb(107, 107, 107)')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.locator('.main-nav')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  expect(await textContrast(page)).toEqual([])
})
