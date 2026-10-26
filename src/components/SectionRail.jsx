import { useEffect, useRef, useState } from 'react'
import './section-rail.css'

// Fixed rail of section anchors on the page edge. The current section is the last one whose top
// has passed 40% of the viewport (or the last section once the page bottom is reached); labels
// slide out on hover or keyboard focus. Sections are looked up on each check, so lazily
// mounted ones (the Smile demo) join without extra wiring. A clicked item stays current until the
// reader scrolls again, since sections near the page end can't reach the top to claim it themselves.
export default function SectionRail({ sections, label = 'On this page' }) {
  const [active, setActive] = useState(sections[0]?.id)
  const chosen = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (chosen.current) return
      const present = sections.map(({ id }) => document.getElementById(id)).filter(Boolean)
      if (!present.length) return
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      const passed = present.filter(el => el.getBoundingClientRect().top <= innerHeight * .4)
      setActive((atBottom ? present.at(-1) : passed.at(-1) ?? present[0]).id)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const release = () => { chosen.current = null }
    const userInput = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    update()
    addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule)
    userInput.forEach(type => addEventListener(type, release, { passive: true }))
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); userInput.forEach(type => removeEventListener(type, release)) }
  }, [sections])
  return <nav className="section-rail" aria-label={label}>
    <ol>{sections.map(({ id, title }) => <li key={id}>
      <a href={`#${id}`} onClick={() => { chosen.current = id; setActive(id) }} aria-current={active === id ? 'location' : undefined}><span className="section-rail-label mono">{title}</span><span className="section-rail-tick" aria-hidden="true" /></a>
    </li>)}</ol>
  </nav>
}
