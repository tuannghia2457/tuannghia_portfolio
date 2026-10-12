/** Clamp a companion offset to the usable bottom edge of the viewport. */
export function clampOffset(offset, viewportWidth, characterWidth = 64, dockRight = 20, gutter = 16) {
  const minimum = Math.min(0, gutter - (viewportWidth - dockRight - characterWidth))
  return Math.max(minimum, Math.min(0, Number.isFinite(offset) ? offset : 0))
}

/** Check the whole swept path, so a clear destination cannot cross a control. */
export function isPathClear(rect, distance, obstacles, clearance = 8) {
  const left = Math.min(rect.left, rect.left + distance) - clearance
  const right = Math.max(rect.right, rect.right + distance) + clearance
  const top = rect.top - clearance
  const bottom = rect.bottom + clearance
  return !obstacles.some((obstacle) => (
    obstacle.width > 0 && obstacle.height > 0 &&
    left < obstacle.right && right > obstacle.left &&
    top < obstacle.bottom && bottom > obstacle.top
  ))
}
