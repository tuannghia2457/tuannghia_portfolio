import { useCallback, useEffect, useState } from 'react'
import { LogOut, RefreshCw, Trash2 } from 'lucide-react'
import { deleteSmile, listSmiles, smileStorageEnabled, supabase } from '../lib/smile-store'
import './admin.css'

const when = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' })

// Private gallery of opted-in smile photos. Supabase row-level security, not this page,
// decides who may read them (see supabase/schema.sql).
export default function AdminPage() {
  const [user, setUser] = useState(null), [ready, setReady] = useState(!smileStorageEnabled)
  const [smiles, setSmiles] = useState([]), [status, setStatus] = useState('')
  const [email, setEmail] = useState(''), [password, setPassword] = useState('')

  useEffect(() => {
    if (!smileStorageEnabled) return
    let subscription
    supabase().then(db => {
      db.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setReady(true) })
      subscription = db.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null)).data.subscription
    })
    return () => subscription?.unsubscribe()
  }, [])

  const load = useCallback(async () => {
    setStatus('Loading smiles…')
    try { const rows = await listSmiles(); setSmiles(rows); setStatus(`${rows.length} smile${rows.length === 1 ? '' : 's'} saved.`) }
    catch (error) { setStatus(`Couldn’t load smiles: ${error.message}`) }
  }, [])
  useEffect(() => { if (user) load() }, [user, load])

  async function signIn(event) {
    event.preventDefault(); setStatus('Signing in…')
    const { error } = await (await supabase()).auth.signInWithPassword({ email, password })
    setStatus(error ? `Sign-in failed: ${error.message}` : ''); if (!error) setPassword('')
  }
  async function signOut() { await (await supabase()).auth.signOut(); setSmiles([]); setStatus('') }
  async function remove(row) {
    if (!window.confirm('Delete this smile photo permanently?')) return
    try { await deleteSmile(row); setSmiles(list => list.filter(item => item.id !== row.id)) }
    catch (error) { setStatus(`Couldn’t delete: ${error.message}`) }
  }

  return <section className="admin-page section-pad" aria-labelledby="admin-title">
    <p className="section-kicker mono">Private / Smile to Collaborate</p>
    <h1 id="admin-title">Saved smiles<span className="period">.</span></h1>
    {!smileStorageEnabled ? <p className="admin-note">Smile storage isn’t configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then rebuild.</p>
      : !ready ? <p className="admin-note" role="status">Checking sign-in…</p>
      : !user ? <form className="admin-login" onSubmit={signIn}>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
        <button className="button button-primary" type="submit">Sign in</button>
      </form>
      : <div className="admin-toolbar"><span className="mono">{user.email}</span>
        <button className="button button-light" onClick={load}><RefreshCw size={16} />Refresh</button>
        <button className="button button-light" onClick={signOut}><LogOut size={16} />Sign out</button>
      </div>}
    {status && <p className="admin-note" role="status">{status}</p>}
    {user && <ul className="admin-grid">{smiles.map(row => <li key={row.id}>
      <img src={row.url} alt={`Smile saved ${when.format(new Date(row.created_at))}`} loading="lazy" />
      <div className="admin-meta"><span>{when.format(new Date(row.created_at))}</span><span className="mono">Smile {Math.round(row.score * 100)}%</span>
        <button className="admin-delete" onClick={() => remove(row)} aria-label={`Delete smile saved ${when.format(new Date(row.created_at))}`}><Trash2 size={16} /></button></div>
    </li>)}</ul>}
  </section>
}
