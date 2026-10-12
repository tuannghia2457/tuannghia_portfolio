import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
for (const args of [
  ['--test', 'src/theme.test.js'],
  ['--test', 'src/components/mini-nghia.helpers.test.js'],
  ['--test', 'src/lib/smile.test.js'],
]) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}
