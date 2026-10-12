import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
await mkdir('test-results/visual', { recursive: true })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
for (const route of ['/', '/projects', '/contact', '/about', '/research']) {
  await page.goto(`http://localhost:5173${route}`)
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.page-transition').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)))
  await page.screenshot({ path: `test-results/visual/${route.slice(1) || 'home'}-desktop.png`, fullPage: true })
}
await page.setViewportSize({ width: 390, height: 844 })
for (const route of ['/', '/contact']) {
  await page.goto(`http://localhost:5173${route}`)
  await page.locator('.page-transition').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)))
  await page.screenshot({ path: `test-results/visual/${route.slice(1) || 'home'}-mobile.png`, fullPage: true })
}
// Real model smoke: same local runtime and task file as the interactive demo.
await page.goto('http://localhost:5173/contact')
const inference = await page.evaluate(async () => {
  const { FaceLandmarker, FilesetResolver } = await import('/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs')
  const files = await FilesetResolver.forVisionTasks('/mediapipe')
  const model = await FaceLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'CPU' }, runningMode: 'IMAGE', numFaces: 1, outputFaceBlendshapes: true })
  const img = new Image(); img.src = '/images/optimized/portrait.jpg'; await img.decode()
  const canvas = document.createElement('canvas'); canvas.width = img.height; canvas.height = img.width
  const ctx = canvas.getContext('2d'); ctx.translate(0, img.width); ctx.rotate(-Math.PI / 2); ctx.drawImage(img, 0, 0)
  const result = model.detect(canvas)
  const scores = result.faceBlendshapes[0]?.categories.filter(c => /mouthSmile/.test(c.categoryName)) || []
  model.close()
  return { faceCount: result.faceLandmarks.length, scores }
})
await writeFile('test-results/visual/model-smoke.json', JSON.stringify(inference, null, 2))
console.log(JSON.stringify(inference))
await browser.close()
