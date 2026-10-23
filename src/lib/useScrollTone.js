import { useEffect } from 'react'

// Shifts the page between ivory and surface-alt while a [data-tone="alt"] section
// crosses the middle of the viewport. Removes the tone on unmount.
export function useScrollTone() {
  useEffect(() => {
    const root = document.documentElement
    const active = new Set()
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target)
      if (active.size) root.dataset.pageTone = 'alt'
      else delete root.dataset.pageTone
    }, { rootMargin: '-50% 0px -50% 0px' })
    document.querySelectorAll('[data-tone="alt"]').forEach(el => observer.observe(el))
    return () => { observer.disconnect(); delete root.dataset.pageTone }
  }, [])
}
