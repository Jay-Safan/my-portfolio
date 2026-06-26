import { useReducedMotion } from 'framer-motion'

// Very subtle, slow-drifting accent-tinted blobs that sit behind a section so
// the page keeps a faint ambient life below the Hero. Pure CSS animation,
// extremely low opacity, non-interactive. Static when reduced-motion is on.
export default function AuroraBackground({ className = '' }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-[0.07] bg-[rgb(var(--accent))] ${reduce ? '' : 'aurora-drift-a'}`}
      />
      <div
        className={`absolute -bottom-32 right-0 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.05] bg-[rgb(var(--accent))] ${reduce ? '' : 'aurora-drift-b'}`}
      />
    </div>
  )
}
