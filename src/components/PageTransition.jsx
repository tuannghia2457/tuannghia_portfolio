import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import DecryptText from './DecryptText'
import { profile } from '../profile'
import './page-transition.css'

// Seconds per phase. Intro plays once per tab session (~1.5s); later page changes are ~0.7s.
const TIMING = {
  intro: { cover: 0, hold: .3, decrypt: .8, reveal: .4 },
  nav: { cover: .2, hold: 0, decrypt: .25, reveal: .25 },
  reduced: { cover: .15, hold: .15, decrypt: 0, reveal: .15 },
}
const [firstName, lastName] = profile.displayName.toUpperCase().split(' ')
const nickname = profile.nickname.toUpperCase()

function Title({ children }) {
  return <p className="page-curtain-title"><span>{firstName}</span> {children}</p>
}

// Wraps one route. On exit the cover curtain slides over the old page; on mount
// the reveal curtain decrypts NGHIA → TOM, then slides away to show the new page.
export default function PageTransition({ variant, children }) {
  const reduceMotion = useReducedMotion()
  const [mode] = useState(variant)
  const [revealed, setRevealed] = useState(mode === 'none')
  const timing = reduceMotion ? TIMING.reduced : TIMING[mode] || TIMING.nav
  const exitTiming = reduceMotion ? TIMING.reduced : TIMING.nav
  const revealDelay = timing.hold + timing.decrypt

  return <div className="page-transition">
    {children}
    <motion.div className="page-curtain" aria-hidden="true"
      initial={false}
      animate={reduceMotion ? { opacity: 0 } : { y: '100%' }}
      exit={reduceMotion
        ? { opacity: 1, transition: { duration: exitTiming.cover } }
        : { y: '0%', transition: { duration: exitTiming.cover, ease: 'easeIn' } }}
      style={reduceMotion ? { y: '0%' } : { opacity: 1 }}>
      <Title>{lastName}</Title>
    </motion.div>
    {!revealed && <motion.div className="page-curtain is-revealing" aria-hidden="true"
      initial={reduceMotion ? { opacity: 1 } : { y: '0%' }}
      animate={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
      transition={{ delay: revealDelay, duration: timing.reveal, ease: 'easeOut' }}
      onAnimationComplete={() => setRevealed(true)}>
      <Title><DecryptText from={lastName} to={nickname} duration={timing.decrypt} delay={timing.hold} instant={Boolean(reduceMotion)} /></Title>
      {!reduceMotion && <motion.span className="page-curtain-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: revealDelay, ease: 'linear' }} />}
    </motion.div>}
  </div>
}
