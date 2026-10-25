import { readFile, writeFile } from 'node:fs/promises'
// Browser chrome follows the theme. Personal artwork is the favicon, unchanged.
const css = await readFile(new URL('../src/theme.css', import.meta.url), 'utf8')
const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/)?.[1]
if (!darkBlock) throw new Error('Missing Neon Dark theme block')
const token = (name, source = css) => {
  const value = source.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'))?.[1]
  if (!value) throw new Error(`Missing static theme token: ${name}`)
  return value
}
const htmlPath = new URL('../index.html', import.meta.url)
const html = await readFile(htmlPath, 'utf8')
await writeFile(htmlPath, html
  // Neon Light is the default, so the static tag carries its background.
  .replace(/(<meta name="theme-color" content=")[^"]+("\s*\/?>)/, `$1${token('background')}$2`)
  // The pre-paint script switches the tag to the Neon Dark background for a saved dark choice.
  .replace(/(\.content = ')#[\da-f]{6}(')/i, `$1${token('background', darkBlock)}$2`))
