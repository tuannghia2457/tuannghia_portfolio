import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Camera, CameraOff, Smile } from 'lucide-react'
import { collaborationEmail, smileScore, SMILE_HOLD_MS, SMILE_THRESHOLD } from '../lib/smile'
import './smile-demo.css'

const initialMessage = 'A small experiment in computer vision. A friendly way to say hello.'
export default function SmileDemo() {
  const [phase, setPhase] = useState('idle'), [message, setMessage] = useState(initialMessage)
  const videoRef = useRef(null), session = useRef(0), stream = useRef(null), detector = useRef(null)
  const loop = useRef(0), timeout = useRef(0), active = useRef(false)
  const release = useCallback(() => {
    active.current = false
    session.current += 1
    cancelAnimationFrame(loop.current)
    clearTimeout(timeout.current)
    stream.current?.getTracks().forEach(track => track.stop())
    stream.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    detector.current?.close()
    detector.current = null
  }, [])
  const stop = useCallback((text = 'Camera stopped. You can restart or contact me directly.') => {
    release(); setPhase('idle'); setMessage(text)
  }, [release])
  useEffect(() => {
    const onHide = () => { if (document.hidden && active.current) stop('Camera stopped while this tab was away. Restart whenever you’re ready.') }
    const onPageHide = () => release()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onPageHide)
    return () => { release(); document.removeEventListener('visibilitychange', onHide); window.removeEventListener('pagehide', onPageHide) }
  }, [release, stop])

  async function start() {
    release()
    const token = session.current
    active.current = true
    setPhase('loading'); setMessage('Allow camera access to begin. Microphone access isn’t needed.')
    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw new Error('Camera access needs HTTPS or localhost in a supported browser. You can still contact me directly.')
      const camera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false })
      if (session.current !== token) { camera.getTracks().forEach(track => track.stop()); return }
      stream.current = camera
      camera.getVideoTracks()[0]?.addEventListener('ended', () => { if (session.current === token) stop('Camera access ended. Restart or use the direct contact link.') }, { once: true })
      videoRef.current.srcObject = camera
      await videoRef.current.play()
      if (session.current !== token) return
      setMessage('Preparing the local smile detector…')
      const { FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision')
      if (session.current !== token) return
      const files = await FilesetResolver.forVisionTasks('/mediapipe')
      if (session.current !== token) return
      const model = await FaceLandmarker.createFromOptions(files, {
        baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'CPU' },
        runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: true,
      })
      if (session.current !== token) { model.close(); return }
      detector.current = model
      setPhase('running'); setMessage('Look toward the camera and hold a smile for a moment.')
      let lastFrame = -1, lastRun = 0, smilingSince = null, faceVisible = null
      timeout.current = window.setTimeout(() => stop('Camera stopped after one minute. Try again or connect directly.'), 60_000)
      function tick(now) {
        if (session.current !== token) return
        try {
          const video = videoRef.current
          // Throttle synchronous inference to about 8 fps and avoid repeated frames.
          if (video?.readyState >= 2 && video.currentTime !== lastFrame && now - lastRun >= 120) {
            lastFrame = video.currentTime; lastRun = now
            const result = model.detectForVideo(video, now)
            const hasFace = result.faceLandmarks.length > 0
            if (hasFace !== faceVisible) { faceVisible = hasFace; setMessage(hasFace ? 'Look toward the camera and hold a smile for a moment.' : 'No face in view yet. Try facing the camera in good light.') }
            if (hasFace && smileScore(result.faceBlendshapes[0]?.categories) >= SMILE_THRESHOLD) {
              smilingSince ??= now
              if (now - smilingSince >= SMILE_HOLD_MS) {
                release(); setPhase('success'); setMessage('That’s a great start. Let’s make something useful together!')
                return
              }
            } else smilingSince = null
          }
          loop.current = requestAnimationFrame(tick)
        } catch { release(); setPhase('error'); setMessage('The detector couldn’t continue on this device. You can try again or connect directly.') }
      }
      loop.current = requestAnimationFrame(tick)
    } catch (error) {
      if (session.current !== token) return
      release(); setPhase('error')
      setMessage(error.name === 'NotAllowedError' ? 'Camera permission wasn’t granted. You can enable it in your browser or connect directly.' : error.name === 'NotFoundError' ? 'No camera was found. The direct contact link is ready for you.' : error.name === 'NotReadableError' ? 'The camera is busy or unavailable. Close other camera apps and try again, or connect directly.' : error.message.startsWith('Camera access needs') ? error.message : 'The local detector couldn’t load. Please try again or connect directly.')
    }
  }
  const busy = phase === 'loading' || phase === 'running'
  return <section id="smile" className="smile-section section-pad" aria-labelledby="smile-title">
    <div className="smile-heading"><p className="section-kicker mono">06 / A little computer vision</p><h2 id="smile-title">Smile to Collaborate<span className="period">.</span></h2><p>Smile if you think we should work together :)</p></div>
    <div className={`smile-panel is-${phase}`}>
      <div className="camera-stage">
        <video ref={videoRef} autoPlay muted playsInline aria-label="Your local webcam preview" className={busy ? 'is-visible' : ''} />
        {!busy && <div className="camera-placeholder">{phase === 'success' ? <><div className="smile-celebration" aria-hidden="true"><Smile size={78} strokeWidth={1.3} /><span>✦</span><span>✦</span><span>✦</span></div><strong>Nice to meet your smile!</strong><span className="mono">Camera off / good vibes on</span></> : <><Smile size={72} strokeWidth={1.2} aria-hidden="true" /><span className="mono">A human connection, first</span></>}</div>}
        {busy && <span className="camera-badge mono">{phase === 'loading' ? 'Preparing' : 'Camera on / local only'}</span>}
      </div>
      <div className="smile-controls"><p role="status" aria-live="polite">{message}</p>
        {phase === 'success' && <a className="button button-primary" href={collaborationEmail}>Let’s Connect <ArrowUpRight size={18} /></a>}
        {busy ? <button className="button button-light" onClick={() => stop()}><CameraOff size={17} />{phase === 'loading' ? 'Cancel & stop camera' : 'Stop camera'}</button> : <button className={`button ${phase === 'success' ? 'button-light' : 'button-primary'}`} onClick={start}><Camera size={17} />{phase === 'success' ? 'Try again' : phase === 'error' ? 'Retry webcam' : 'Enable webcam'}</button>}
        <a className="text-link" href={collaborationEmail} onClick={() => stop()}>Skip webcam & contact me directly <ArrowUpRight size={16} /></a>
        <p className="camera-privacy">Camera frames stay in your browser. Nothing is recorded or uploaded. The camera stops when you finish, leave, or switch tabs.</p><p className="camera-privacy">Contact links open an email draft for you to review and send.</p>
      </div>
    </div>
  </section>
}
