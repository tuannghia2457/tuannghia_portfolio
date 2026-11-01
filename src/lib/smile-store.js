// Optional Supabase storage for smile photos. Without the two VITE_SUPABASE_* variables the
// feature stays off and the demo keeps every frame in the browser.
const url = import.meta.env.VITE_SUPABASE_URL, anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const smileStorageEnabled = Boolean(url && anonKey)
export const SMILE_BUCKET = 'smiles'
const PHOTO_WIDTH = 480

let client
export async function supabase() {
  if (!smileStorageEnabled) throw new Error('Smile storage is not configured.')
  // Loaded on demand so visitors who never opt in don't download the client.
  client ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(url, anonKey))
  return client
}

// Draws the current frame mirrored, matching the preview the visitor saw.
export function captureFrame(video) {
  const canvas = document.createElement('canvas')
  canvas.width = PHOTO_WIDTH
  canvas.height = Math.round(PHOTO_WIDTH * video.videoHeight / video.videoWidth) || PHOTO_WIDTH * 3 / 4
  const ctx = canvas.getContext('2d')
  ctx.translate(canvas.width, 0); ctx.scale(-1, 1)
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  return canvas
}

export async function saveSmile(canvas, score) {
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85))
  if (!blob) throw new Error('The photo could not be encoded.')
  const db = await supabase(), path = `${crypto.randomUUID()}.jpg`
  const upload = await db.storage.from(SMILE_BUCKET).upload(path, blob, { contentType: 'image/jpeg' })
  if (upload.error) throw upload.error
  const row = await db.from('smiles').insert({ image_path: path, score: Math.round(score * 1000) / 1000 })
  if (row.error) throw row.error
}

export async function listSmiles() {
  const db = await supabase()
  const { data, error } = await db.from('smiles').select('id, created_at, image_path, score').order('created_at', { ascending: false })
  if (error) throw error
  if (!data.length) return []
  const signed = await db.storage.from(SMILE_BUCKET).createSignedUrls(data.map(row => row.image_path), 60 * 60)
  if (signed.error) throw signed.error
  const urls = new Map(signed.data.map(item => [item.path, item.signedUrl]))
  return data.map(row => ({ ...row, url: urls.get(row.image_path) }))
}

export async function deleteSmile(row) {
  const db = await supabase()
  const removed = await db.storage.from(SMILE_BUCKET).remove([row.image_path])
  if (removed.error) throw removed.error
  const { error } = await db.from('smiles').delete().eq('id', row.id)
  if (error) throw error
}
