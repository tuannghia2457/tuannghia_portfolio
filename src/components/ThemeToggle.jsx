import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

// Neon Light is the default; Neon Dark is opt-in and remembered. index.html applies the saved
// choice before first paint, so this only reads the attribute it set.
const STORAGE_KEY = 'tn-theme'
const current = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(current)
  const next = theme === 'dark' ? 'light' : 'dark'
  const toggle = () => {
    const root = document.documentElement
    if (next === 'dark') root.dataset.theme = 'dark'
    else delete root.dataset.theme
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage unavailable: choice lasts this visit */ }
    // Browser chrome follows the page background of the active theme.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--background').trim())
    setTheme(next)
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
  </button>
}
