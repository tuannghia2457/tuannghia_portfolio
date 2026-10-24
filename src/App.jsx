import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import PageTransition from './components/PageTransition'
import { profile } from './profile'
import { Home, ExperiencePage, Projects, ProjectDetail, Research, ResearchDetail, EducationPage, NotFound } from './pages/PortfolioPages'

const SmileDemo = lazy(() => import('./components/SmileDemo'))
// Redirect sources share their target's key so a redirect never plays a second curtain.
const transitionKeys = { '/about': '/experience', '/contact': '/', '/projects/pothole-surface-reconstruction': '/experience' }
const transitionKey = pathname => transitionKeys[pathname] || pathname
function readIntroPlayed() { try { return sessionStorage.getItem('tn-intro-played') === '1' } catch { return false } }
function markIntroPlayed() { try { sessionStorage.setItem('tn-intro-played', '1') } catch { /* storage unavailable: intro may replay */ } }
const navigation = [['/', 'Home'], ['/experience', 'Experience'], ['/projects', 'Projects'], ['/research', 'Research'], ['/education', 'Education']]
function Shell() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null), mainRef = useRef(null), initial = useRef(true)
  const locationRef = useRef(location), shownKey = useRef(transitionKey(location.pathname))
  const [firstVariant] = useState(() => readIntroPlayed() ? 'none' : 'intro')
  const pageKey = transitionKey(location.pathname)
  locationRef.current = location
  // Scroll and focus once the new page is in place: immediately for hash or redirect
  // changes, or after the cover curtain hides the old page.
  const settle = () => {
    const { hash } = locationRef.current
    // The incoming page can mount a frame after the exit completes, so retry briefly.
    if (hash) { let tries = 0; const find = () => { const target = document.getElementById(hash.slice(1)); if (target) target.scrollIntoView(); else if (tries++ < 20) requestAnimationFrame(find) }; requestAnimationFrame(find) }
    else window.scrollTo({ top: 0, behavior: 'instant' })
    if (!initial.current) mainRef.current?.focus({ preventScroll: true })
    initial.current = false
  }
  useEffect(() => { markIntroPlayed() }, [])
  useEffect(() => {
    setMenuOpen(false)
    const label = location.pathname.split('/')[1] || 'Home'
    document.title = `${label.charAt(0).toUpperCase() + label.slice(1)} — ${profile.displayName} · Computer Vision & AI`
    if (shownKey.current === pageKey) settle()
  }, [location.pathname, location.hash])
  const onExitComplete = () => { shownKey.current = transitionKey(locationRef.current.pathname); settle() }
  useEffect(() => {
    if (!menuOpen) return
    const close = event => { if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link className="brand" to="/" aria-label={`${profile.nickname} — home`} onClick={() => setMenuOpen(false)}><img className="brand-avatar" src={profile.brandImage} alt="" width="44" height="44" /><span className="brand-name"><span className="brand-wordmark" aria-hidden="true">{profile.nickname.toUpperCase().split('').map((letter, index) => <span key={index} style={{ '--letter-index': index }}>{letter}</span>)}</span><span className="brand-caption">Computer vision & AI</span></span></Link>
      <button ref={menuRef} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}</nav>
    </header>
    <main id="main-content" ref={mainRef} tabIndex={-1}><AnimatePresence mode="wait" onExitComplete={onExitComplete}><PageTransition key={pageKey} variant={initial.current ? firstVariant : 'nav'}><Routes location={location}>
      <Route path="/" element={<Home><Suspense fallback={<div className="section-pad demo-loading" role="status">Loading Smile to Collaborate…</div>}><SmileDemo /></Suspense></Home>} /><Route path="/experience" element={<ExperiencePage />} /><Route path="/about" element={<Navigate to="/experience" replace />} />
      <Route path="/projects/pothole-surface-reconstruction" element={<Navigate to="/experience#ivs-pothole-milestone" replace />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/research" element={<Research />} /><Route path="/research/:slug" element={<ResearchDetail />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes></PageTransition></AnimatePresence></main>
    <footer className="site-footer section-pad"><span className="mono">{profile.displayName} © 2026</span><span className="mono">Built with curiosity / Ho Chi Minh City</span><a href="#main-content" className="back-top">Back to top <ArrowUpRight size={15} /></a></footer>
  </div>
}
export default function App() { return <BrowserRouter><Shell /></BrowserRouter> }
