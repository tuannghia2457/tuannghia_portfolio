import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { profile } from '../profile'

// Wording supplied by Nghia: name and birth year, then current roles and focus.
const LINES = [
  { command: true, text: 'whoami' },
  { text: `${profile.displayName} 2007` },
  { command: true, text: 'cat currently.log' },
  { text: 'Engineering Intern @ IVS' },
  { text: 'AI Student @ UTS x HCMUT' },
  { text: 'Building AI for real-world problems' },
]
const TOTAL = LINES.reduce((sum, line) => sum + line.text.length, 0)
// Starts once the page-change curtain has lifted (~2.2s), then types ~32 characters a second.
const START_DELAY = 2200, CHAR_MS = 32

export default function HeroTerminal() {
  const reduceMotion = useReducedMotion()
  const [typed, setTyped] = useState(0)
  useEffect(() => {
    if (reduceMotion) { setTyped(TOTAL); return }
    let timer = setTimeout(function tick() {
      setTyped(count => {
        if (count + 1 < TOTAL) timer = setTimeout(tick, CHAR_MS)
        return count + 1
      })
    }, START_DELAY)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  const count = reduceMotion ? TOTAL : typed
  const done = count >= TOTAL
  const cursor = <span className="hero-terminal-cursor" />
  let start = 0
  const visible = LINES.map(line => {
    const shown = line.text.slice(0, Math.max(0, count - start))
    const typing = !done && count >= start && count < start + line.text.length
    start += line.text.length
    return { ...line, shown, typing, reached: count >= start - line.text.length }
  })
  return <div className="hero-terminal mono" role="img" aria-label={LINES.map(line => (line.command ? `$ ${line.text}` : line.text)).join('. ')}>
    <div className="hero-terminal-bar" aria-hidden="true"><i /><i /><i /><span>shell — zsh</span></div>
    <div className="hero-terminal-body" aria-hidden="true">
      {visible.filter(line => line.reached).map(line => <p key={line.text} className={line.command ? 'is-command' : 'is-output'}>{line.command ? '$ ' : '> '}{line.shown}{line.typing && cursor}</p>)}
      {done && <p className="is-command">$ {cursor}</p>}
    </div>
  </div>
}
