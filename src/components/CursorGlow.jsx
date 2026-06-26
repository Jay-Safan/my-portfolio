import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Soft accent glow that trails the cursor. Sits behind content (low opacity,
// pointer-events none) and does NOT replace the native cursor. Grows slightly
// when hovering interactive elements. Disabled on touch / reduced-motion.
export default function CursorGlow() {
  const reduce = useReducedMotion()
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduce || !enabled) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setActive(!!e.target.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [reduce, enabled, x, y])

  if (!enabled || reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[55] rounded-full bg-[rgb(var(--accent))] blur-2xl"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: 'normal',
      }}
      animate={{
        width: active ? 320 : 240,
        height: active ? 320 : 240,
        opacity: active ? 0.1 : 0.06,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      aria-hidden="true"
    />
  )
}
