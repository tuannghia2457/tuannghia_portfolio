import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import DecryptText from './DecryptText'
import { profile } from '../profile'
import './page-transition.css'

// Seconds per phase, once the curtain covers the screen: TUAN NGHIA 0.8s, decrypt 0.5s,
// TOM TRAN 0.5s, then the curtain eases away. Intro ~2.2s (once per tab session), page changes ~2.35s.
const TIMING = {
  intro: { cover: 0, hold: .8, decrypt: .5, after: .5, reveal: .4 },
  nav: { cover: .2, hold: .8, decrypt: .5, after: .5, reveal: .35 },
  reduced: { cover: .15, hold: .15, decrypt: 0, after: .2, reveal: .15 },
}
// TUAN → TOM (nickname), NGHIA → TRAN (family name from the formal name).
const fromWords = profile.displayName.toUpperCase().split(' ')
const toWords = [profile.nickname.toUpperCase(), profile.fullName.split(' ')[0].toUpperCase()]

function Title({ children }) {
  return <p className="page-curtain-title">{children}</p>
}

// Wraps one route. On exit the cover curtain slides over the old page; on mount
// the reveal curtain decrypts TUAN NGHIA → TOM TRAN, rests, then slides away.
export default function PageTransition({ variant, children }) {
  const reduceMotion = useReducedMotion()
  const [mode] = useState(variant)
  const [revealed, setRevealed] = useState(mode === 'none')
  const timing = reduceMotion ? TIMING.reduced : TIMING[mode] || TIMING.nav
  const exitTiming = reduceMotion ? TIMING.reduced : TIMING.nav
  const revealDelay = timing.hold + timing.decrypt + timing.after

  return <div className="page-transition">
    {children}
    <motion.div className="page-curtain" aria-hidden="true"
      initial={false}
      animate={reduceMotion ? { opacity: 0 } : { y: '100%' }}
      exit={reduceMotion
        ? { opacity: 1, transition: { duration: exitTiming.cover } }
        : { y: '0%', transition: { duration: exitTiming.cover, ease: 'easeIn' } }}
      style={reduceMotion ? { y: '0%' } : { opacity: 1 }}>
      <Title>{fromWords.map(word => <span key={word}>{word}</span>)}</Title>
    </motion.div>
    {!revealed && <motion.div className="page-curtain is-revealing" aria-hidden="true"
      initial={reduceMotion ? { opacity: 1 } : { y: '0%' }}
      animate={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
      transition={{ delay: revealDelay, duration: timing.reveal, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => setRevealed(true)}>
      <Title>{fromWords.map((word, i) => <DecryptText key={word} from={word} to={toWords[i]} duration={timing.decrypt} delay={timing.hold} instant={Boolean(reduceMotion)} />)}</Title>
      {!reduceMotion && <motion.span className="page-curtain-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: revealDelay, ease: 'linear' }} />}
    </motion.div>}
  </div>
}
