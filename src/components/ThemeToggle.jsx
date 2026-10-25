import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

// Neon Dark is the default; Neon Light is opt-in and remembered. index.html applies the saved
// choice before first paint, so this only reads the attribute it set.
const STORAGE_KEY = 'tn-theme'
const current = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(current)
  const next = theme === 'light' ? 'dark' : 'light'
  const toggle = () => {
    const root = document.documentElement
    if (next === 'light') root.dataset.theme = 'light'
    else delete root.dataset.theme
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage unavailable: choice lasts this visit */ }
    // Browser chrome follows the page background of the active theme.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--background').trim())
    setTheme(next)
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    {theme === 'light' ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
  </button>
}
