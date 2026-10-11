const { test, expect } = require('@playwright/test');
for (const [name, viewport] of [['desktop', {width:1440,height:1000}], ['mobile', {width:390,height:844}]]) {
  test(`${name} portfolio runtime`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:5173/', {waitUntil:'networkidle'});
    console.log(JSON.stringify({name, title: await page.title(), hero: (await page.locator('h1').innerText()).slice(0,60), nav: await page.locator('nav a').count(), errors}));
    await expect(page.locator('#work')).toBeAttached();
    await page.locator('a[href="#work"]').first().click();
    await expect(page).toHaveURL(/#work$/);
    if (name === 'mobile') {
      await page.locator('.menu-toggle').click();
      await expect(page.locator('.main-nav')).toHaveClass(/is-open/);
      console.log(JSON.stringify({menuOpen:true, visibleLinks: await page.locator('.main-nav a:visible').count()}));
      await page.keyboard.press('Tab');
      console.log(JSON.stringify({focus: await page.evaluate(() => ({tag: document.activeElement.tagName, cls: document.activeElement.className, outline: getComputedStyle(document.activeElement).outlineStyle}))}));
    }
    const invariants = await page.locator('*').evaluateAll(els => ({
      rounded: els.filter(e => getComputedStyle(e).borderRadius !== '0px').length,
      shadows: els.filter(e => getComputedStyle(e).boxShadow !== 'none').length,
      blueNonLinks: els.filter(e => getComputedStyle(e).color === 'rgb(0, 0, 255)' && e.tagName !== 'A').length,
    }));
    console.log(JSON.stringify({name,invariants}));
  });
}
