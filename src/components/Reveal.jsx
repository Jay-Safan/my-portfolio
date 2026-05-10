import { motion } from 'framer-motion'

export function Reveal({ children, className = '', as = 'div', delay = 0 }) {
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  )
}
