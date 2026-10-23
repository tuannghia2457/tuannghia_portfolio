const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

// "Apr 2026" (any case) → month index since year 0, so spans are simple subtraction.
function parseMonth(text) {
  const [month, year] = text.trim().toUpperCase().split(/\s+/)
  const index = MONTHS.indexOf(month)
  if (index < 0 || !/^\d{4}$/.test(year)) throw new Error(`Unrecognised month: ${text}`)
  return Number(year) * 12 + index
}

export const monthIndex = date => date.getFullYear() * 12 + date.getMonth()
export const monthLabel = index => `${MONTHS[index % 12][0]}${MONTHS[index % 12].slice(1).toLowerCase()} ${Math.floor(index / 12)}`

// Parses "Apr 2026 — Present" or "Sep 2025 — Expected May 2028" into inclusive month indices.
// PRESENT ends at `today`; an expected end still in the future also counts as current.
export function parsePeriod(period, today = new Date()) {
  const [from, to] = period.split(/\s*[—–-]\s*/)
  const present = /present/i.test(to), expected = /^expected\s+/i.test(to)
  const start = parseMonth(from), end = present ? monthIndex(today) : parseMonth(to.replace(/^expected\s+/i, ''))
  const current = present || (expected && end >= monthIndex(today))
  return expected ? { start, end, current, months: end - start + 1, expected } : { start, end, current, months: end - start + 1 }
}

export function formatDuration(months) {
  const years = Math.floor(months / 12), rest = months % 12
  const parts = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest || !years) parts.push(`${rest} mo${rest === 1 ? '' : 's'}`)
  return parts.join(' ')
}

// "Best Start English Center · Part-time" → company and employment type.
export function splitOrganization(organization) {
  const [company, ...type] = organization.split(' · ')
  return { company, type: type.join(' · ') }
}

export const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Newest start first; ties keep the current role on top.
export function buildTimeline(items, today = new Date()) {
  return items
    .map(item => ({ ...item, ...parsePeriod(item.period, today), ...splitOrganization(item.organization), id: `role-${slugify(`${item.organization.split(' · ')[0]} ${item.title}`)}` }))
    .sort((a, b) => b.start - a.start || Number(b.current) - Number(a.current))
}
