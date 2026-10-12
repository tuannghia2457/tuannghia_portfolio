import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import MiniNghia from './components/MiniNghia'
import { profile } from './profile'
import { Home, About, Projects, ProjectDetail, Research, EducationPage, Contact, NotFound } from './pages/PortfolioPages'

const SmileDemo = lazy(() => import('./components/SmileDemo'))
const navigation = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/research', 'Research'], ['/education', 'Education'], ['/contact', 'Contact']]
function Shell() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null), mainRef = useRef(null), initial = useRef(true)
  useEffect(() => {
    setMenuOpen(false)
    const label = location.pathname.split('/')[1] || 'Home'
    document.title = `${label.charAt(0).toUpperCase() + label.slice(1)} — ${profile.displayName} · Computer Vision & AI`
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView())
    else window.scrollTo({ top: 0, behavior: 'instant' })
    if (!initial.current) mainRef.current?.focus({ preventScroll: true })
    initial.current = false
  }, [location.pathname, location.hash])
  useEffect(() => {
    if (!menuOpen) return
    const close = event => { if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link className="brand" to="/" aria-label={`${profile.nickname} — home`} onClick={() => setMenuOpen(false)}><img className="brand-avatar" src={profile.brandImage} alt="" width="44" height="44" /><span className="brand-name"><span className="brand-wordmark" aria-hidden="true">{profile.nickname.toUpperCase().split('').map((letter, index) => <span key={index} style={{ '--letter-index': index }}>{letter}</span>)}</span><span className="brand-caption">COMPUTER VISION & AI</span></span></Link>
      <button ref={menuRef} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} className={path === '/contact' ? 'nav-contact' : undefined} onClick={() => setMenuOpen(false)}>{label}{path === '/contact' && <ArrowUpRight size={15} />}</NavLink>)}</nav>
    </header>
    <main id="main-content" ref={mainRef} tabIndex={-1}><div key={location.pathname} className="page-transition"><Routes>
      <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/research" element={<Research />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/contact" element={<Contact><Suspense fallback={<div className="section-pad demo-loading" role="status">Loading Smile to Collaborate…</div>}><SmileDemo /></Suspense></Contact>} />
      <Route path="*" element={<NotFound />} />
    </Routes></div></main>
    <footer className="site-footer section-pad"><span className="mono">{profile.displayName.toUpperCase()} © 2026</span><span className="mono">BUILT WITH CURIOSITY / HO CHI MINH CITY</span><a href="#main-content" className="back-top">BACK TO TOP <ArrowUpRight size={15} /></a></footer>
    <MiniNghia />
  </div>
}
export default function App() { return <BrowserRouter><Shell /></BrowserRouter> }
