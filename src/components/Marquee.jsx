import { Children, cloneElement } from 'react'
import { useReducedMotion } from 'framer-motion'

// Infinite, auto-scrolling band. Duplicates its children so the loop is seamless,
// pauses on hover, and fades out at both edges. Falls back to a normal,
// horizontally-scrollable row when reduced-motion is requested.
export default function Marquee({ children, speed = 40, reverse = false, className = '' }) {
  const reduce = useReducedMotion()
  const items = Children.toArray(children)

  if (reduce) {
    return (
      <div className={`flex overflow-x-auto no-scrollbar ${className}`}>
        {items}
      </div>
    )
  }

  // Render the set twice; the track scrolls exactly one set width (-50%).
  // Children must carry their own trailing spacing so the two halves are
  // identical in width and the loop has no per-cycle hitch.
  const loop = [
    ...items,
    ...items.map((child, i) => cloneElement(child, { key: `dup-${i}`, 'aria-hidden': true })),
  ]

  return (
    <div className={`group relative overflow-hidden marquee-mask ${className}`}>
      <div
        className="flex w-max marquee-track group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {loop}
      </div>
    </div>
  )
}
