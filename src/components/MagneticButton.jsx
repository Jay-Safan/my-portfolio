import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function MagneticButton({ children, className = '', as = 'a', strength = 0.3, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  function handleMouseMove(e) {
    if (reduce) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPos({ x, y })
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 })
  }

  const Tag = as === 'button' ? motion.button : motion.a

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
