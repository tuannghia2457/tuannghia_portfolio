import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
const css = await readFile(new URL('./theme.css', import.meta.url), 'utf8')
const palette = { background: '#FAF9F6', surface: '#FFFFFF', 'surface-alt': '#F3F0EB', primary: '#FF6B00', 'primary-hover': '#E65F00', foreground: '#252525', 'muted-foreground': '#6B6B6B', border: '#E5E2DC' }
function luminance(hex) { const channels = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722 }
function contrast(a, b) { const [high, low] = [luminance(a), luminance(b)].sort((a, b) => b - a); return (high + .05) / (low + .05) }
test('The permanent light palette has exactly eight authored color values', () => {
  for (const [name, value] of Object.entries(palette)) assert.ok(css.includes(`--${name}: ${value};`), name)
  assert.equal((css.match(/#[\da-f]{3,8}\b/gi) || []).length, 8)
  assert.ok(css.includes('color-scheme: light'))
})
test('Components use semantic tokens without literal colors or alternate themes', async () => {
  const paths = await readdir(new URL('./', import.meta.url), { recursive: true })
  for (const path of paths.filter(p => /\.(css|jsx|js)$/.test(p) && !/test\./.test(p) && p !== 'theme.css')) {
    const source = await readFile(new URL(path.replaceAll('\\', '/'), new URL('./', import.meta.url)), 'utf8')
    assert.doesNotMatch(source, /#[\da-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(/i, path)
    assert.doesNotMatch(source, /prefers-color-scheme|color-scheme:\s*dark/i, path)
    assert.doesNotMatch(source, /--(?:background|surface|surface-alt|primary|primary-hover|foreground|muted-foreground|border)\s*:/, `${path}: palette overrides belong only in theme.css`)
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
  for (const bg of ['background', 'surface', 'surface-alt']) for (const fg of ['foreground', 'muted-foreground']) assert.ok(contrast(palette[fg], palette[bg]) >= 4.5, `${fg} on ${bg}`)
  assert.ok(contrast(palette.foreground, palette.primary) >= 4.5, 'charcoal on primary fill')
  // Hover orange stays on borders/indicators: its text pair falls below 4.5:1.
  assert.ok(contrast(palette.foreground, palette['primary-hover']) < 4.5)
  console.log('Button contrast:', Object.fromEntries(['primary', 'primary-hover'].map(bg => [bg, contrast(palette.foreground, palette[bg]).toFixed(2)])))
})
test('Browser metadata follows the palette and favicon uses the personal pixel artwork', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const icon = await readFile(new URL('../public/images/personal-images/pixel.png', import.meta.url))
  assert.ok(html.includes(`name="theme-color" content="${palette.background}"`))
  assert.ok(html.includes('type="image/png" href="/images/personal-images/pixel.png?v=tom"'))
  assert.equal(icon.subarray(1, 4).toString(), 'PNG')
})
