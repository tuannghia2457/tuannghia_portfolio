import { test, expect } from '@playwright/test'
async function cameraFixture(page) {
  await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = async () => {
      const img = new Image(); img.src = '/images/optimized/portrait.jpg'; await img.decode()
      const canvas = document.createElement('canvas'); canvas.width = img.height; canvas.height = img.width
      const ctx = canvas.getContext('2d'); ctx.translate(0, img.width); ctx.rotate(-Math.PI / 2); ctx.drawImage(img, 0, 0)
      window.cameraFixture = canvas.captureStream(12)
      // Keep producing frames from a stable face so the VIDEO path is exercised.
      window.fixtureTimer = setInterval(() => ctx.drawImage(img, 0, 0), 80)
      return window.cameraFixture
    }
  })
}
test('Real local model runs on a video stream and stops on navigation', async ({ page }) => {
  await cameraFixture(page)
  await page.goto('/#contact'); await page.getByRole('button', { name: 'Enable webcam' }).click()
  await expect(page.getByRole('button', { name: 'Stop camera', exact: true })).toBeVisible({ timeout: 30_000 })
  await expect(page.getByRole('status')).toContainText('hold a smile')
  await expect(page.locator('.smile-panel')).toHaveClass(/is-running/)
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
  expect(await page.evaluate(() => window.cameraFixture.getTracks().every(track => track.readyState === 'ended'))).toBeTruthy()
})
test('Sustained smile celebrates once, stops camera, and offers an email draft', async ({ page }) => {
  // Mock blendshape outputs only to verify success UI deterministically.
  await cameraFixture(page)
  await page.route('**/node_modules/.vite/deps/@mediapipe_tasks-vision.js*', route => route.fulfill({
    contentType: 'application/javascript', body: `
      export const FilesetResolver = { forVisionTasks: async () => ({}) };
      export const FaceLandmarker = { createFromOptions: async () => ({
        close() {}, detectForVideo() { return { faceLandmarks: [[]], faceBlendshapes: [{ categories: [
          { categoryName: 'mouthSmileLeft', score: .9 }, { categoryName: 'mouthSmileRight', score: .9 }
        ] }] }; }
      }) };
    `,
  }))
  await page.goto('/#contact'); await page.getByRole('button', { name: 'Enable webcam' }).click()
  const connect = page.getByRole('link', { name: 'Let’s Connect', exact: true })
  await expect(connect).toBeVisible({ timeout: 30_000 })
  await expect(connect).toHaveAttribute('href', /^mailto:.*subject=/)
  await expect(page.locator('.smile-celebration')).toBeVisible()
  expect(await page.evaluate(() => window.cameraFixture.getTracks().every(track => track.readyState === 'ended'))).toBeTruthy()
  await page.screenshot({ path: 'test-results/smile-success.png', fullPage: true })
})
