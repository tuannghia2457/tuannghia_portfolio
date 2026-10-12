import assert from 'node:assert/strict'
import test from 'node:test'
import { clampOffset, isPathClear } from './mini-nghia.helpers.js'

const sprite = { left: 300, right: 364, top: 720, bottom: 792 }
const control = (left, right, top = 730, bottom = 780) => ({ left, right, top, bottom, width: right - left, height: bottom - top })

test('movement stays inside both viewport edges, including very narrow screens', () => {
  assert.equal(clampOffset(30, 390), 0)
  assert.equal(clampOffset(-1000, 390), -290)
  assert.equal(clampOffset(-20, 80), 0)
  assert.equal(clampOffset(Number.NaN, 390), 0)
})

test('a walking path cannot pass through a control even when the destination is clear', () => {
  assert.equal(isPathClear(sprite, -200, [control(230, 270)]), false)
  assert.equal(isPathClear(sprite, -200, [control(230, 270, 600, 650)]), true)
  assert.equal(isPathClear(sprite, -100, [control(185, 195)]), false)
})

test('controls outside the bottom lane and hidden elements do not block movement', () => {
  assert.equal(isPathClear(sprite, -100, [control(230, 270, 500, 600)]), true)
  assert.equal(isPathClear(sprite, -100, [{ ...control(230, 270), width: 0 }]), true)
  assert.equal(isPathClear(sprite, 0, [control(370, 400)]), false)
})
