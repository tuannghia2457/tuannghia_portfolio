import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
const css = await readFile(new URL('./theme.css', import.meta.url), 'utf8')
const palette = { background: '#0D0D0D', foreground: '#FFFFFF', primary: '#00FF85', 'accent-secondary': '#1E90FF' }
// Mirrors theme.css color-mix(in srgb, foreground N%, background) for the derived neutrals.
const mix = (a, b, weight) => '#' + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * weight + parseInt(b.slice(i, i + 2), 16) * (1 - weight)).toString(16).padStart(2, '0')).join('')
const derived = { surface: .05, 'surface-alt': .09, 'muted-foreground': .68, border: .16 }
const colors = { ...palette, ...Object.fromEntries(Object.entries(derived).map(([name, weight]) => [name, mix(palette.foreground, palette.background, weight)])), 'primary-hover': mix(palette.primary, palette.foreground, .72) }
function luminance(hex) { const channels = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722 }
function contrast(a, b) { const [high, low] = [luminance(a), luminance(b)].sort((a, b) => b - a); return (high + .05) / (low + .05) }
// Neon Light (the default since 25 October 2026): the same derived neutrals on an off-white page, a
// toned-down green fill with near-black labels, and deep green accent text from the same hue.
const lightPalette = { background: '#F7F8F4', foreground: '#0D0D0D', primary: '#00C96B', 'accent-secondary': '#0B63C9' }
const lightBlock = css.match(/:root\s*\{([^}]*)\}/)?.[1] || ''
const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/)?.[1] || ''
const light = { ...lightPalette, ...Object.fromEntries(Object.entries(derived).map(([name, weight]) => [name, mix(lightPalette.foreground, lightPalette.background, weight)])), 'primary-hover': mix(lightPalette.primary, lightPalette.background, .72), 'accent-foreground': mix(lightPalette.primary, lightPalette.foreground, .45) }
test('Neon Light (default) and Neon Dark each author four palette colors, plus the white logo plate, and no pink', () => {
  for (const [name, value] of Object.entries(lightPalette)) assert.ok(lightBlock.includes(`--${name}: ${value};`), `light ${name}`)
  for (const [name, weight] of Object.entries(derived)) assert.ok(lightBlock.includes(`--${name}: color-mix(in srgb, var(--foreground) ${weight * 100}%, var(--background));`), name)
  assert.ok(lightBlock.includes('--primary-hover: color-mix(in srgb, var(--primary) 72%, var(--background));'))
  assert.ok(lightBlock.includes('--accent-foreground: color-mix(in srgb, var(--primary) 45%, var(--foreground));'))
  assert.ok(lightBlock.includes('--on-primary: var(--foreground);'))
  assert.ok(lightBlock.includes('--logo-plate: #FFFFFF;'))
  assert.ok(lightBlock.includes('color-scheme: light'))
  for (const [name, value] of Object.entries(palette)) assert.ok(darkBlock.includes(`--${name}: ${value};`), `dark ${name}`)
  assert.ok(darkBlock.includes('--primary-hover: color-mix(in srgb, var(--primary) 72%, var(--foreground));'))
  assert.ok(darkBlock.includes('--accent-foreground: var(--primary);'))
  assert.ok(darkBlock.includes('--on-primary: var(--background);'))
  assert.ok(darkBlock.includes('color-scheme: dark'))
  assert.doesNotMatch(css, /#FF0099/i)
  assert.equal((css.match(/#[\da-f]{3,8}\b/gi) || []).length, 9)
})
test('Components use semantic tokens without literal colors or alternate themes', async () => {
  const paths = await readdir(new URL('./', import.meta.url), { recursive: true })
  for (const path of paths.filter(p => /\.(css|jsx|js)$/.test(p) && !/test\./.test(p) && p !== 'theme.css')) {
    const source = await readFile(new URL(path.replaceAll('\\', '/'), new URL('./', import.meta.url)), 'utf8')
    assert.doesNotMatch(source, /#[\da-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(/i, path)
    assert.doesNotMatch(source, /prefers-color-scheme|color-scheme:/i, path)
    assert.doesNotMatch(source, /--(?:background|surface|surface-alt|primary|primary-hover|accent-secondary|foreground|muted-foreground|border)\s*:/, `${path}: palette overrides belong only in theme.css`)
    if (path.endsWith('.css')) for (const match of source.matchAll(/(?:^|[;{])\s*(?:color|background-color|fill|stroke)\s*:\s*([^;}]+)/gm)) {
      assert.match(match[1].trim(), /^(?:var\(|(?:inherit|currentColor|transparent|none|initial|unset|revert)\s*$)/i, `${path}: semantic color required`)
    }
    // Reject named-color declarations and future secondary token definitions too.
    for (const declaration of source.matchAll(/(?:^|[;{])\s*(?:--[\w-]+|color|background(?:-color)?|fill|stroke|(?:border|outline)(?:-[\w-]+)?|box-shadow)\s*:\s*([^;}]+)/gm)) {
      assert.doesNotMatch(declaration[1], /\b(?:black|white|orange|blue|red|green|charcoal|ivory)\b/i, path)
    }
  }
})
test('Text and button contrast meets 4.5:1 across official surfaces and states', () => {
  // Green is the accent text color; white and muted grey are body text.
  for (const bg of ['background', 'surface', 'surface-alt']) for (const fg of ['foreground', 'muted-foreground', 'primary']) assert.ok(contrast(colors[fg], colors[bg]) >= 4.5, `${fg} on ${bg}`)
  // Buttons use the near-black background as label color on green and on pink hover.
  for (const fill of ['primary', 'primary-hover']) assert.ok(contrast(colors.background, colors[fill]) >= 4.5, `background on ${fill}`)
  // White on the mint hover fill falls below 4.5:1, so it never carries white labels.
  assert.ok(contrast(colors.foreground, colors['primary-hover']) < 4.5)
  // Blue focus ring stays visible on every surface (3:1 for non-text).
  for (const bg of ['background', 'surface', 'surface-alt']) assert.ok(contrast(colors['accent-secondary'], colors[bg]) >= 3, `focus on ${bg}`)
  // Neon Light: near-black text, muted copy and deep green accent text on every light surface.
  for (const bg of ['background', 'surface', 'surface-alt']) for (const fg of ['foreground', 'muted-foreground', 'accent-foreground']) assert.ok(contrast(light[fg], light[bg]) >= 4.5, `light ${fg} on ${bg}`)
  // Light buttons carry near-black labels on the green fill and the lighter mint hover.
  for (const fill of ['primary', 'primary-hover']) assert.ok(contrast(light.foreground, light[fill]) >= 4.5, `light foreground on ${fill}`)
  for (const bg of ['background', 'surface', 'surface-alt']) assert.ok(contrast(light['accent-secondary'], light[bg]) >= 3, `light focus on ${bg}`)
  console.log('Button contrast:', Object.fromEntries(['primary', 'primary-hover'].map(bg => [bg, contrast(colors.background, colors[bg]).toFixed(2)])))
})
test('Browser metadata follows the palette and favicon uses the personal pixel artwork', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const icon = await readFile(new URL('../public/images/personal-images/pixel.png', import.meta.url))
  assert.ok(html.includes(`name="theme-color" content="${lightPalette.background}"`))
  assert.ok(html.includes(`.content = '${palette.background}'`), 'pre-paint script uses the Neon Dark background')
  assert.ok(html.includes('type="image/png" href="/images/personal-images/pixel.png?v=tom"'))
  assert.equal(icon.subarray(1, 4).toString(), 'PNG')
})
