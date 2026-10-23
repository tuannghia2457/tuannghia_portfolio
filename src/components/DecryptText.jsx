import { useEffect, useState } from 'react'
import { animate } from 'motion/react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_#'
const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

// Scrambles `from` and resolves it left to right into `to` over a fixed duration,
// so the effect stays in step with the curtain timing (React Bits' DecryptedText
// only re-reveals the same string and has no duration or completion hook).
export default function DecryptText({ from, to, duration, delay = 0, instant = false, className }) {
  const [text, setText] = useState(instant ? to : from)
  useEffect(() => {
    if (instant) { setText(to); return }
    const controls = animate(0, 1, {
      duration, delay, ease: 'linear',
      onUpdate: progress => {
        // Motion reports 0 while the delay runs; keep the original word readable until then.
        if (progress <= 0) return
        const length = Math.round(from.length + (to.length - from.length) * progress)
        // The last letter resolves only when the effect ends, so it fills its whole duration.
        const resolved = Math.floor(progress * to.length)
        setText(Array.from({ length }, (_, i) => i < resolved && i < to.length ? to[i] : glyph()).join(''))
      },
      onComplete: () => setText(to),
    })
    return () => controls.stop()
  }, [from, to, duration, delay, instant])
  return <span className={className}>{text}</span>
}
