import { test, expect } from '@playwright/test'

test('Navigation hover and selected pages use the same underline without shifting text', async ({ page }) => {
  await page.goto('/')
  for (const name of ['Experience', 'Projects', 'Research']) {
    const link = page.getByRole('navigation').getByRole('link', { name, exact: true })
    await link.hover()
    await expect.poll(() => link.evaluate(el => getComputedStyle(el, '::after').opacity)).toBe('1')
    const preview = await link.evaluate(el => {
      const style = getComputedStyle(el), line = getComputedStyle(el, '::after')
      return { color: style.color, fontSize: style.fontSize, fontWeight: style.fontWeight, decoration: style.textDecorationLine, bottom: line.bottom, height: line.height, background: line.backgroundColor }
    })
    await link.click(); await page.mouse.move(0, 0)
    await expect(link).toHaveAttribute('aria-current', 'page')
    const selected = await link.evaluate(el => {
      const style = getComputedStyle(el), line = getComputedStyle(el, '::after')
      return { color: style.color, fontSize: style.fontSize, fontWeight: style.fontWeight, decoration: style.textDecorationLine, bottom: line.bottom, height: line.height, background: line.backgroundColor }
    })
    expect(selected).toEqual(preview)
    await expect.poll(() => link.evaluate(el => getComputedStyle(el, '::after').opacity)).toBe('1')
  }
})

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
test('Neon Light is the default on every route, with accessible text, even when the OS prefers dark', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  for (const path of ['/', '/experience', '/projects', '/research', '/education', '/#contact', '/projects/aquaguard', '/projects/pothole-surface-reconstruction', '/projects/virtualdouble-ant', '/research/vietnamese-legal-rag']) {
    await page.goto(path); await expect(page.locator('h1')).toHaveCount(1)
    await page.locator('details').evaluateAll(nodes => nodes.forEach(el => el.open = true))
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe('light')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(247, 248, 244)')
    expect(await textContrast(page), path).toEqual([])
  }
  const button = page.locator('.button-primary').first()
  await page.goto('/'); await expect(button).toHaveCSS('color', 'rgb(13, 13, 13)')
  await expect(button).toHaveCSS('background-color', 'rgb(0, 201, 107)')
})
test('Neon Dark keeps every route readable, including expanded content', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('tn-theme', 'dark'))
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  for (const path of ['/', '/experience', '/projects', '/research', '/education', '/#contact', '/projects/aquaguard', '/projects/virtualdouble-ant', '/research/vietnamese-legal-rag']) {
    await page.goto(path); await expect(page.locator('h1')).toHaveCount(1)
    await page.locator('details').evaluateAll(nodes => nodes.forEach(el => el.open = true))
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe('dark')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(13, 13, 13)')
    expect(await textContrast(page), path).toEqual([])
  }
})
test('The theme toggle switches between Neon Light and Neon Dark and remembers the choice', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const meta = page.locator('meta[name="theme-color"]')
  await expect(meta).toHaveAttribute('content', '#F7F8F4')
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 13, 13)')
  await expect(meta).toHaveAttribute('content', '#0D0D0D')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(meta).toHaveAttribute('content', '#0D0D0D')
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(247, 248, 244)')
  await page.reload(); await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible()
})
test('Scrolling Home keeps one steady page background', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const id of ['work', 'testimonials', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded(); await page.waitForTimeout(150)
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(247, 248, 244)')
    await expect(page.locator('html')).not.toHaveAttribute('data-page-tone', /.+/)
  }
})
test('Neon Dark button, navigation, card and companion interactive states use semantic roles', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('tn-theme', 'dark'))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const button = page.locator('.button-primary').first()
  await expect(button).toHaveCSS('color', 'rgb(13, 13, 13)')
  await expect(button).toHaveCSS('background-color', 'rgb(0, 255, 133)')
  await button.hover(); await expect(button).toHaveCSS('border-color', 'rgb(0, 255, 133)')
  await expect(button).toHaveCSS('background-color', 'color(srgb 0.28 1 0.655529)')
  await expect(button).toHaveCSS('color', 'rgb(13, 13, 13)')
  await button.focus(); await expect(button).toHaveCSS('outline-color', 'rgb(30, 144, 255)')
  await page.mouse.down(); await expect(button).toHaveCSS('background-color', 'color(srgb 0.28 1 0.655529)'); await page.mouse.move(0, 0); await page.mouse.up()
  const card = page.locator('.curated-card').first(); await card.hover(); await expect(card).toHaveCSS('border-color', 'rgb(0, 255, 133)')
  expect(await textContrast(page)).toEqual([])
  await page.goto('/#contact'); const enable = page.getByRole('button', { name: 'Enable webcam' })
  await enable.evaluate(el => el.disabled = true)
  await expect(enable).toHaveCSS('background-color', 'color(srgb 0.136392 0.136392 0.136392)')
  await expect(enable).toHaveCSS('color', 'color(srgb 0.696314 0.696314 0.696314)')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.locator('.main-nav')).toHaveCSS('background-color', 'color(srgb 0.0984314 0.0984314 0.0984314)')
  expect(await textContrast(page)).toEqual([])
})
