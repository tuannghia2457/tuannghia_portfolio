// Ported from Magic UI's Warp Background (magicui.design/docs/components/warp-background).
// Beams use palette tokens instead of random hues and share one scroll-tunable phase.
import { useMemo } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

const BEAM_TONES = ["var(--primary)", "var(--accent-secondary)"]

const Beam = ({ width, x, delay, duration, aspect, tone, phase }) => {
  const y = useTransform(phase, (value) => {
    const t = ((((value - delay) / duration) % 1) + 1) % 1
    return `calc(${(1 - t) * 100}cqmax - ${t * 100}%)`
  })

  return (
    <motion.div
      style={{
        "--x": `${x}`,
        "--width": `${width}`,
        "--aspect-ratio": `${aspect}`,
        "--beam-fill": `linear-gradient(${tone}, transparent)`,
        x: "-50%",
        y,
      }}
      className="absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--beam-fill)]"
    />
  )
}

const sideClass =
  "@container absolute h-[100cqmax] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d"

const sides = [
  ["top", "z-20 w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)]"],
  ["bottom", "top-full w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)]"],
  ["left", "top-0 left-0 w-[100cqh] origin-[0%_0%] transform-[rotate(90deg)_rotateX(-90deg)]"],
  ["right", "top-0 right-0 w-[100cqh] origin-[100%_0%] transform-[rotate(-90deg)_rotateX(-90deg)]"],
]

export const WarpBackground = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  speed = 1,
  paused = false,
  ...props
}) => {
  const phase = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    if (paused) return
    const rate = typeof speed === "number" ? speed : speed.get()
    phase.set(phase.get() + (delta / 1000) * rate)
  })

  const beams = useMemo(() => {
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide
    return sides.map(([side], sideIndex) =>
      Array.from({ length: beamsPerSide }, (_, i) => ({
        key: `${side}-${i}`,
        x: Math.floor(i * step),
        delay: Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin,
        aspect: Math.floor(Math.random() * 10) + 1,
        tone: BEAM_TONES[(i + sideIndex) % BEAM_TONES.length],
      })),
    )
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        aria-hidden="true"
        style={{
          "--perspective": `${perspective}px`,
          "--grid-color": gridColor,
          "--beam-size": `${beamSize}%`,
        }}
        className="@container-[size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] perspective-(--perspective) transform-3d"
      >
        {sides.map(([side, placement], sideIndex) => (
          <div key={side} className={cn(sideClass, placement)}>
            {beams[sideIndex].map((beam) => (
              <Beam
                key={beam.key}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                aspect={beam.aspect}
                tone={beam.tone}
                phase={phase}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
