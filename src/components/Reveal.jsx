import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import './reveal.css'

const EASE_OUT = [0.22, 1, 0.36, 1]
// Items that enter the viewport within this window count as one batch and are staggered;
// a later batch starts from zero, so cards further down are never held back by earlier ones.
const BATCH_WINDOW_MS = 120
let lastEnter = -Infinity, batchIndex = 0
function nextBatchSlot() {
  const now = performance.now()
  batchIndex = now - lastEnter > BATCH_WINDOW_MS ? 0 : batchIndex + 1
  lastEnter = now
  return batchIndex
}

/**
 * Fades and lifts its child into place once, when it is ~18% into the viewport.
 * Only opacity and transform animate; the wrapper keeps its layout box, so nothing shifts.
 * Put grid spans on `className`; hover effects belong on the child, not this wrapper.
 */
export function RevealItem({ children, className = '', y = 24, duration = 0.55, stagger = 0.09, margin = '0px 0px -18% 0px', as = 'div' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin })
  const [delay, setDelay] = useState(null)
  useEffect(() => { if (inView && delay === null) setDelay(nextBatchSlot() * stagger) }, [inView, delay, stagger])

  const classes = `reveal-item ${className}`.trim()
  if (reduceMotion) { const Tag = as; return <Tag className={classes}>{children}</Tag> }
  const MotionTag = motion[as]
  return <MotionTag ref={ref} className={classes}
    initial={{ opacity: 0, y }}
    animate={delay === null ? { opacity: 0, y } : { opacity: 1, y: 0 }}
    transition={{ duration, ease: EASE_OUT, delay: delay ?? 0 }}>
    {children}
  </MotionTag>
}
