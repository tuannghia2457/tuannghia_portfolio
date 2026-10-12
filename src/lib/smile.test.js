import { test } from 'node:test'
import assert from 'node:assert/strict'
import { collaborationEmail, smileScore, SMILE_THRESHOLD } from './smile.js'
test('Only the two smile blendshapes contribute to the score', () => {
  assert.equal(smileScore(), 0)
  assert.equal(smileScore([{ categoryName: 'jawOpen', score: 1 }]), 0)
  assert.equal(smileScore([{ categoryName: 'mouthSmileLeft', score: .8 }, { categoryName: 'mouthSmileRight', score: .6 }]), .7)
  assert.ok(smileScore([{ categoryName: 'mouthSmileLeft', score: .8 }]) < SMILE_THRESHOLD)
})
test('Contact action opens a reviewable email draft', () => {
  assert.ok(collaborationEmail.startsWith('mailto:trantuannghia2457@gmail.com?'))
  const params = new URLSearchParams(collaborationEmail.split('?')[1])
  assert.equal(params.get('subject'), 'Let’s collaborate')
  assert.ok(params.get('body').includes('Hi Tuan Nghia,\n\n'))
})
