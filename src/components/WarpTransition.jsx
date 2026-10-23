import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { WarpBackground } from '@/components/ui/warp-background'
import './warp-transition.css'

function useCompact() {
  const query = '(max-width: 640px)'
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setCompact(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return compact
}

export default function WarpTransition() {
  const section = useRef(null)
  const compact = useCompact()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  // Deeper scroll drives the beams faster; the last fifth fades into the projects.
  const speed = useTransform(scrollYProgress, [0, 1], [1, 3.5])
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])

  return <section ref={section} className="warp-transition" data-tone="alt" aria-label="Transition to selected projects">
    <motion.div className="warp-transition-sticky" style={{ opacity }}>
      <WarpBackground className="warp-transition-field" speed={speed} paused={Boolean(reduceMotion)} beamsPerSide={compact ? 2 : 3} beamSize={compact ? 8 : 5} perspective={compact ? 80 : 100}>
        <p className="warp-transition-label mono">PERCEPTION / ROBOTICS / APPLIED AI</p>
      </WarpBackground>
    </motion.div>
  </section>
}
