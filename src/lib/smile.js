// A sustained expression avoids celebrating a single noisy frame.
export const SMILE_THRESHOLD = 0.45
export const SMILE_HOLD_MS = 550
export function smileScore(categories = []) {
  const left = categories.find(item => item.categoryName === 'mouthSmileLeft')?.score || 0
  const right = categories.find(item => item.categoryName === 'mouthSmileRight')?.score || 0
  return (left + right) / 2
}
export const collaborationEmail = `mailto:trantuannghia2457@gmail.com?subject=${encodeURIComponent('Let’s collaborate')}&body=${encodeURIComponent('Hi Tuan Nghia,\n\nI explored your portfolio and would love to discuss working together.\n\n')}`
