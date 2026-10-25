import { readFile, writeFile } from 'node:fs/promises'
// Browser chrome follows the theme. Personal artwork is the favicon, unchanged.
const css = await readFile(new URL('../src/theme.css', import.meta.url), 'utf8')
const lightBlock = css.match(/:root\[data-theme="light"\]\s*\{([^}]*)\}/)?.[1]
if (!lightBlock) throw new Error('Missing Neon Light theme block')
const token = (name, source = css) => {
  const value = source.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'))?.[1]
  if (!value) throw new Error(`Missing static theme token: ${name}`)
  return value
}
const htmlPath = new URL('../index.html', import.meta.url)
const html = await readFile(htmlPath, 'utf8')
await writeFile(htmlPath, html
  // Neon Dark is the default, so the static tag carries its background.
  .replace(/(<meta name="theme-color" content=")[^"]+("\s*\/?>)/, `$1${token('background')}$2`)
  // The pre-paint script switches the tag to the Neon Light background for a saved light choice.
  .replace(/(\.content = ')#[\da-f]{6}(')/i, `$1${token('background', lightBlock)}$2`))
