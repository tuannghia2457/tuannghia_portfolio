import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildTimeline, formatDuration, monthLabel, parsePeriod, splitOrganization } from './timeline.js'

const today = new Date(2026, 9, 23)

test('periods parse inclusively and PRESENT ends in the current month', () => {
  assert.deepEqual(parsePeriod('JUL 2024 — AUG 2024', today), { start: 2024 * 12 + 6, end: 2024 * 12 + 7, current: false, months: 2 })
  const current = parsePeriod('APR 2026 — PRESENT', today)
  assert.equal(current.current, true)
  assert.equal(current.months, 7)
  assert.equal(monthLabel(current.end), 'OCT 2026')
  assert.throws(() => parsePeriod('Spring 2024 — PRESENT', today))
  const degree = parsePeriod('SEP 2025 — EXPECTED MAY 2028', today)
  assert.equal(degree.current, true)
  assert.equal(degree.expected, true)
  assert.equal(monthLabel(degree.end), 'MAY 2028')
  assert.equal(parsePeriod('SEP 2020 — EXPECTED MAY 2024', today).current, false)
})

test('durations read naturally', () => {
  assert.equal(formatDuration(1), '1 mo')
  assert.equal(formatDuration(7), '7 mos')
  assert.equal(formatDuration(12), '1 yr')
  assert.equal(formatDuration(14), '1 yr 2 mos')
  assert.equal(formatDuration(25), '2 yrs 1 mo')
})

test('timeline sorts newest first and splits company from employment type', () => {
  assert.deepEqual(splitOrganization('Best Start English Center · Part-time'), { company: 'Best Start English Center', type: 'Part-time' })
  assert.deepEqual(splitOrganization('Odylytics'), { company: 'Odylytics', type: '' })
  const roles = buildTimeline([
    { period: 'JUL 2024 — AUG 2024', title: 'Developer', organization: 'SDE · Internship' },
    { period: 'JUL 2026 — PRESENT', title: 'CTO', organization: 'Odylytics' },
    { period: 'JUN 2025 — MAR 2026', title: 'Teaching Assistant', organization: 'BSEC · Part-time' },
  ], today)
  assert.deepEqual(roles.map(role => role.title), ['CTO', 'Teaching Assistant', 'Developer'])
  assert.equal(roles[0].id, 'role-odylytics-cto')
  assert.equal(new Set(roles.map(role => role.id)).size, roles.length)
})
