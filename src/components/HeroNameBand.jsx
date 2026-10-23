import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../profile'

// Giant name behind the portrait: loops sideways and drifts further as the hero scrolls away.
export default function HeroNameBand() {
  const band = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: band, offset: ['start start', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const text = `${profile.displayName.toUpperCase()} — `.repeat(2)
  return <div ref={band} className="hero-name-band" aria-hidden="true">
    <motion.div className="hero-name-drift" style={reduceMotion ? undefined : { x: drift }}>
      <div className="hero-name-track"><span>{text}</span><span>{text}</span></div>
    </motion.div>
  </div>
}
