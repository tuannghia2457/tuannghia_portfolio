import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { clampOffset, isPathClear } from './mini-nghia.helpers'
import './mini-nghia.css'

const SLEEP_AFTER = 60_000
const ACTIVITY_DELAY = 16_000

const SECTION_MESSAGES = {
  top: ['Hi, I’m Mini Nghia. Small pixels, big curiosity.', 'Explore the work. I’ll keep an eye on the bottom edge.'],
  work: ['Real problems make the most interesting engineering projects.', 'AquaGuard brings technology closer to the people who need it.'],
  research: ['Perception, geometry, navigation. There’s a lot to see beneath the surface.', 'A good research question is a good place to begin.'],
  smile: ['A smile is a friendly way to start a collaboration.', 'Camera shy? The direct contact link is always there.'],
  experience: ['Research, product, teaching — each experience changes how I build.', 'The toolkit grows with every project.'],
  evidence: ['The certificates tell a small part of the story.', 'Curiosity is good. Evidence makes it stronger.'],
  about: ['Hello from Ho Chi Minh City.', 'Technical curiosity, human problems. That’s the thread.'],
  contact: ['Have a research question or a project idea? Say hello.', 'The full-size Tuan Nghia is just an email away.'],
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

function usePortfolioSection() {
  const [section, setSection] = useState('top')
  useEffect(() => {
    const visible = new Map()
    const onHashChange = () => {
      const next = window.location.hash.slice(1)
      if (SECTION_MESSAGES[next]) setSection(next)
    }
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    if (!('IntersectionObserver' in window)) {
      return () => window.removeEventListener('hashchange', onHashChange)
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id || 'top', entry.intersectionRatio)
        else visible.delete(entry.target.id || 'top')
      })
      const current = [...visible].sort((a, b) => b[1] - a[1])[0]
      if (current && SECTION_MESSAGES[current[0]]) setSection(current[0])
      else if (window.scrollY < 160) setSection('top')
    }, { rootMargin: '-10% 0px -45% 0px', threshold: [0, 0.15, 0.4, 0.7] })
    const observed = new Set()
    const observeSections = () => {
      observed.forEach((element) => {
        if (!element.isConnected) {
          observer.unobserve(element)
          observed.delete(element)
          visible.delete(element.id || 'top')
        }
      })
      document.querySelectorAll('main section').forEach((element) => {
        if ((SECTION_MESSAGES[element.id] || element.classList.contains('hero')) && !observed.has(element)) {
          observer.observe(element)
          observed.add(element)
        }
      })
    }
    observeSections()
    // Lazy-loaded sections replace their fallback nodes after the first render.
    const mutations = new MutationObserver(observeSections)
    const main = document.querySelector('main')
    if (main) mutations.observe(main, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  return section
}

/** Original 24 × 26 pixel artwork; all color roles come from Ember tokens. */
function PixelNghia({ state, facing }) {
  return (
    <svg className={`mini-nghia-sprite is-${state} faces-${facing}`} viewBox="0 0 24 26" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <rect className="mini-pixel-shadow" x="6" y="25" width="13" height="1" />
      <g className="mini-pixel-person">
        <g className="mini-pixel-head">
          <path className="mini-pixel-outline" d="M8 2h8v1h2v7h-1v3H7v-3H6V4h2z" />
          <path className="mini-pixel-hair" d="M8 3h8v1h1v5h-2V7H9v2H7V5h1z" />
          <path className="mini-pixel-skin" d="M9 7h6v1h1v3h-1v2H9v-2H8V9h1z" />
          <path className="mini-pixel-hair" d="M9 6h6v2h-2V7H9z" />
          <g className="mini-pixel-eyes"><rect x="10" y="9" width="1" height="1" /><rect x="14" y="9" width="1" height="1" /></g>
          <g className="mini-pixel-closed-eyes"><rect x="9" y="10" width="2" height="1" /><rect x="13" y="10" width="2" height="1" /></g>
          <rect className="mini-pixel-mouth" x="11" y="11" width="2" height="1" />
        </g>
        <path className="mini-pixel-jacket" d="M8 13h8v1h1v6H7v-6h1z" />
        <path className="mini-pixel-shirt" d="M10 13h4v7h-4z" />
        <rect className="mini-pixel-zip" x="12" y="15" width="1" height="4" />
        <g className="mini-pixel-arm mini-pixel-arm-left"><rect className="mini-pixel-jacket" x="6" y="14" width="2" height="4" /><rect className="mini-pixel-skin" x="6" y="18" width="2" height="2" /></g>
        <g className="mini-pixel-arm mini-pixel-arm-right"><rect className="mini-pixel-jacket" x="16" y="14" width="2" height="4" /><rect className="mini-pixel-skin" x="16" y="18" width="2" height="2" /></g>
        <g className="mini-pixel-leg mini-pixel-leg-left"><rect className="mini-pixel-trousers" x="8" y="20" width="3" height="4" /><rect className="mini-pixel-shoe" x="7" y="24" width="4" height="1" /></g>
        <g className="mini-pixel-leg mini-pixel-leg-right"><rect className="mini-pixel-trousers" x="14" y="20" width="3" height="4" /><rect className="mini-pixel-shoe" x="14" y="24" width="4" height="1" /></g>
      </g>
      <g className="mini-pixel-laptop"><path className="mini-pixel-laptop-frame" d="M12 16h11v7H12zM10 23h13v1H10z" /><rect className="mini-pixel-laptop-screen" x="13" y="17" width="9" height="5" /><path className="mini-pixel-code" d="M14 18h2v1h-1v1h1v1h-2zM19 18h2v3h-2v-1h1v-1h-1z" /><rect className="mini-pixel-skin mini-pixel-coding-hand" x="10" y="22" width="3" height="1" /></g>
      <g className="mini-pixel-sleep"><path d="M19 3h3v1h-1v1h-1v1h2v1h-3V6h1V5h1V4h-2z" /></g>
    </svg>
  )
}

export default function MiniNghia() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const mobile = useMediaQuery('(max-width: 640px)')
  const section = usePortfolioSection()
  const bubbleId = useId()
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const restoreRef = useRef(null)
  const offsetRef = useRef(0)
  const targetRef = useRef(0)
  const focusFrameRef = useRef(null)
  const dragRef = useRef(null)
  const ignoreClickRef = useRef(false)
  const activityCount = useRef(0)
  const [mode, setMode] = useState('idle')
  const [asleep, setAsleep] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(mobile)
  const [paused, setPaused] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [bubbleSide, setBubbleSide] = useState('right')
  const [messageIndex, setMessageIndex] = useState(0)
  const [facing, setFacing] = useState('right')
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden)

  useEffect(() => () => window.cancelAnimationFrame(focusFrameRef.current), [])

  const setOffset = useCallback((value) => {
    const next = clampOffset(value, window.innerWidth)
    offsetRef.current = next
    rootRef.current?.style.setProperty('--mini-offset', `${next}px`)
    return next
  }, [])

  const getObstacles = useCallback(() => [...document.querySelectorAll('a, button, input, select, textarea, [role="button"]')]
    .filter((element) => !element.closest('[data-mini-nghia]'))
    .map((element) => element.getBoundingClientRect()), [])

  const moveBy = useCallback((distance) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = clampOffset(offsetRef.current + distance, window.innerWidth)
    if (isPathClear(rect, next - offsetRef.current, getObstacles())) {
      setFacing(distance < 0 ? 'left' : 'right')
      setOffset(next)
    }
  }, [getObstacles, setOffset])

  useEffect(() => {
    setCompact(mobile)
    setMode('idle')
    if (mobile) setOffset(0)
  }, [mobile, setOffset])

  useEffect(() => {
    const onResize = () => {
      setMode('idle')
      setOffset(offsetRef.current)
    }
    const onVisibility = () => {
      setPageVisible(!document.hidden)
      setMode('idle')
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [setOffset])

  useEffect(() => {
    if (hidden || !pageVisible) return undefined
    let sleepTimer
    let lastMovement = 0
    const onActivity = (event) => {
      const now = Date.now()
      if (event?.type === 'pointermove' && now - lastMovement < 1000) return
      lastMovement = now
      window.clearTimeout(sleepTimer)
      setAsleep(false)
      if (event?.type === 'scroll' && dragRef.current) dragRef.current.obstacles = null
      if (event && event.type !== 'pointermove') setMode('idle')
      sleepTimer = window.setTimeout(() => {
        setAsleep(true)
        setMode('idle')
      }, SLEEP_AFTER)
    }
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll']
    events.forEach((event) => window.addEventListener(event, onActivity, { passive: true }))
    onActivity()
    return () => {
      window.clearTimeout(sleepTimer)
      events.forEach((event) => window.removeEventListener(event, onActivity))
    }
  }, [hidden, pageVisible])

  // Only run ambient behavior when the visitor is not interacting with it.
  useEffect(() => {
    if (hidden || compact || mobile || reducedMotion || paused || engaged || dragging || bubbleOpen || asleep || !pageVisible || mode !== 'idle') return undefined
    const timer = window.setTimeout(() => {
      activityCount.current += 1
      if (activityCount.current % 3 === 0) {
        setMode('coding')
        return
      }
      const start = offsetRef.current
      const target = clampOffset(start + (start < -110 ? 100 : -100), window.innerWidth)
      const rect = rootRef.current?.getBoundingClientRect()
      if (rect && target !== start && isPathClear(rect, target - start, getObstacles())) {
        targetRef.current = target
        setFacing(target < start ? 'left' : 'right')
        setMode('walking')
      } else setMode('coding')
    }, ACTIVITY_DELAY)
    return () => window.clearTimeout(timer)
  }, [hidden, compact, mobile, reducedMotion, paused, engaged, dragging, bubbleOpen, asleep, pageVisible, mode, getObstacles])

  useEffect(() => {
    if (mode === 'idle') return undefined
    if (reducedMotion || paused || engaged || bubbleOpen || dragging || asleep || hidden || compact || mobile || !pageVisible) {
      setMode('idle')
      return undefined
    }
    if (mode === 'coding') {
      const timer = window.setTimeout(() => setMode('idle'), 4800)
      return () => window.clearTimeout(timer)
    }
    let frame
    let previousTime
    const walk = (time) => {
      const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 64)
      previousTime = time
      const delta = targetRef.current - offsetRef.current
      if (Math.abs(delta) <= 0.5) {
        setOffset(targetRef.current)
        setMode('idle')
        return
      }
      setOffset(offsetRef.current + Math.sign(delta) * Math.min(Math.abs(delta), elapsed * 0.025))
      frame = window.requestAnimationFrame(walk)
    }
    frame = window.requestAnimationFrame(walk)
    return () => window.cancelAnimationFrame(frame)
  }, [mode, reducedMotion, paused, engaged, bubbleOpen, dragging, asleep, hidden, compact, mobile, pageVisible, setOffset])

  useEffect(() => {
    setMessageIndex(0)
  }, [section])

  const openBubble = () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false
      return
    }
    setCompact(false)
    setAsleep(false)
    setMode('idle')
    setBubbleSide((rootRef.current?.getBoundingClientRect().left || 0) < 260 ? 'left' : 'right')
    if (bubbleOpen) setMessageIndex((index) => index + 1)
    setBubbleOpen(true)
  }

  const closeBubble = () => {
    setBubbleOpen(false)
    if (mobile) setCompact(true)
    triggerRef.current?.focus()
  }

  const onPointerDown = (event) => {
    if (event.button !== 0 || compact || mobile) return
    ignoreClickRef.current = false
    dragRef.current = { id: event.pointerId, startX: event.clientX, offset: offsetRef.current, active: false }
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const distance = event.clientX - drag.startX
    if (!drag.active && Math.abs(distance) < 6) return
    if (!drag.active) {
      drag.active = true
      drag.obstacles = getObstacles()
      event.currentTarget.setPointerCapture(event.pointerId)
      setDragging(true)
      setBubbleOpen(false)
      setMode('idle')
    }
    const next = clampOffset(drag.offset + distance, window.innerWidth)
    const rect = rootRef.current?.getBoundingClientRect()
    if (!drag.obstacles) drag.obstacles = getObstacles()
    if (rect && isPathClear(rect, next - offsetRef.current, drag.obstacles, 3)) {
      setFacing(next < offsetRef.current ? 'left' : 'right')
      setOffset(next)
    }
  }

  const onPointerEnd = (event) => {
    if (dragRef.current?.id !== event.pointerId) return
    ignoreClickRef.current = dragRef.current.active
    dragRef.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const hide = () => {
    setHidden(true)
    setBubbleOpen(false)
    setMode('idle')
    window.cancelAnimationFrame(focusFrameRef.current)
    focusFrameRef.current = window.requestAnimationFrame(() => restoreRef.current?.focus())
  }

  const restore = () => {
    offsetRef.current = 0
    setHidden(false)
    setCompact(mobile)
    setAsleep(false)
    setEngaged(false)
    window.cancelAnimationFrame(focusFrameRef.current)
    focusFrameRef.current = window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape' && bubbleOpen) {
      event.preventDefault()
      closeBubble()
    }
    if (event.target !== triggerRef.current || mobile) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      setBubbleOpen(false)
      setMode('idle')
      moveBy(event.key === 'ArrowLeft' ? -32 : 32)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setBubbleOpen(false)
      setMode('idle')
      moveBy(-offsetRef.current)
    }
  }

  if (hidden) return <button ref={restoreRef} type="button" className="mini-nghia-restore" data-mini-nghia onClick={restore} aria-label="Show Mini Nghia pixel companion">Mini Nghia <span aria-hidden="true">↗</span></button>

  const characterState = asleep ? 'sleeping' : mode
  const messages = SECTION_MESSAGES[section] || SECTION_MESSAGES.top
  return (
    <aside ref={rootRef} data-mini-nghia className={`mini-nghia ${compact ? 'is-compact' : ''} ${dragging ? 'is-dragging' : ''}`} data-paused={paused || reducedMotion || !pageVisible} style={{ '--mini-offset': `${offsetRef.current}px` }} aria-label="Mini Nghia pixel companion" onPointerEnter={() => setEngaged(true)} onPointerLeave={() => setEngaged(false)} onFocus={() => setEngaged(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false) }} onKeyDown={onKeyDown}>
      <button ref={triggerRef} type="button" className="mini-nghia-character" aria-label={compact ? 'Open Mini Nghia companion' : `Chat with Mini Nghia, ${characterState}.${mobile ? '' : ' Arrow keys move the character.'}`} aria-expanded={bubbleOpen} aria-controls={bubbleOpen ? bubbleId : undefined} onClick={openBubble} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}>
        <PixelNghia state={characterState} facing={facing} />
        {!compact && <span className="mini-nghia-name" aria-hidden="true">MINI NGHIA</span>}
      </button>
      {bubbleOpen && <div id={bubbleId} className={`mini-nghia-bubble opens-${bubbleSide}`}>
        <div className="mini-nghia-bubble-heading"><span>MINI NGHIA <span className="mini-nghia-state">/ {characterState}</span></span><button type="button" className="mini-nghia-close" onClick={closeBubble} aria-label="Close Mini Nghia conversation">×</button></div>
        <p role="status" aria-live="polite">{messages[messageIndex % messages.length]}</p>
        <div className="mini-nghia-controls">
          <button type="button" onClick={() => setMessageIndex((index) => index + 1)}>Say more</button>
          {!mobile && !reducedMotion && <button type="button" aria-pressed={paused} onClick={() => { setPaused((value) => !value); setMode('idle') }}>{paused ? 'Resume' : 'Pause'}</button>}
          <button type="button" onClick={hide}>Hide</button>
        </div>
        <span className="mini-nghia-hint">{mobile ? 'Tap the character to chat.' : 'Drag or use ← → to move. Home to dock.'}{reducedMotion ? ' Motion is off.' : ''}</span>
      </div>}
    </aside>
  )
}
