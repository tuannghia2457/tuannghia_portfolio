import { readFile, writeFile } from 'node:fs/promises'
// Browser chrome follows the theme. Personal artwork is the favicon, unchanged.
const css = await readFile(new URL('../src/theme.css', import.meta.url), 'utf8')
const token = name => {
  const value = css.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'))?.[1]
  if (!value) throw new Error(`Missing static theme token: ${name}`)
  return value
}
const htmlPath = new URL('../index.html', import.meta.url)
const html = await readFile(htmlPath, 'utf8')
await writeFile(htmlPath, html.replace(/(<meta name="theme-color" content=")[^"]+("\s*\/?>)/, `$1${token('background')}$2`))
