import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../profile'

// Decorative outline name behind the hero: loops sideways, then grows and fades as the hero scrolls away.
export default function HeroNameMarquee() {
  const layer = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: layer, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.6])
  const opacity = useTransform(scrollYProgress, [0, .85], [1, 0])
  const text = `${profile.displayName.toUpperCase()} · `.repeat(2)

  return <div ref={layer} className="hero-name-marquee" aria-hidden="true">
    <motion.div className="hero-name-zoom" style={reduceMotion ? undefined : { scale, opacity }}>
      <div className="hero-name-track"><span>{text}</span><span>{text}</span></div>
    </motion.div>
  </div>
}
