import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './section-rail.css'

const SETTLE_DELAY_MS = 140   // quiet time after the last scroll event before a scroll counts as finished
const SETTLE_RANGE_PX = 140   // how close ahead a section start must be for the page to settle on it

// Fixed rail of section anchors on the page edge. The current section is the last one whose top
// has passed 40% of the viewport (or the last section once the page bottom is reached); labels
// slide out on hover or keyboard focus. Sections are looked up on each check, so lazily
// mounted ones (the Smile demo) join without extra wiring.
export default function SectionRail({ sections, label = 'On this page' }) {
  const [active, setActive] = useState(sections[0]?.id)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const present = () => sections.map(({ id }) => document.getElementById(id)).filter(Boolean)
    let frame = 0
    const update = () => {
      frame = 0
      const found = present()
      if (!found.length) return
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      const passed = found.filter(el => el.getBoundingClientRect().top <= innerHeight * .4)
      setActive((atBottom ? found.at(-1) : passed.at(-1) ?? found[0]).id)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    // Gentle stop: when a scroll ends just short of the next section start in the direction of
    // travel, ease onto it. Never pulls backwards, so the page can't trap the reader.
    let settleTimer = 0, lastY = scrollY, direction = 0
    const settle = () => {
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const y = scrollY
      const target = present().map(el => el.getBoundingClientRect().top + y - offset)
        .find(top => direction > 0 ? top > y && top - y <= SETTLE_RANGE_PX : top < y && y - top <= SETTLE_RANGE_PX)
      if (target !== undefined) scrollTo({ top: target, behavior: 'smooth' })
    }
    const onScroll = () => {
      const y = scrollY
      if (y !== lastY) direction = Math.sign(y - lastY)
      lastY = y
      schedule()
      if (reduceMotion) return
      clearTimeout(settleTimer); settleTimer = setTimeout(settle, SETTLE_DELAY_MS)
    }

    update()
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(frame); clearTimeout(settleTimer); removeEventListener('scroll', onScroll); removeEventListener('resize', schedule) }
  }, [sections, reduceMotion])
  return <nav className="section-rail" aria-label={label}>
    <ol>{sections.map(({ id, title }) => <li key={id}>
      <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}><span className="section-rail-label mono">{title}</span><span className="section-rail-tick" aria-hidden="true" /></a>
    </li>)}</ol>
  </nav>
}
