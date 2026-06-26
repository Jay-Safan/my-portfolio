import { motion, useReducedMotion } from 'framer-motion'

// Splits text into words and reveals them one-by-one on scroll into view.
// Mirrors the Hero headline treatment so every section heading feels alive.
// Respects prefers-reduced-motion (renders instantly, no transform).
export default function AnimatedText({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.045,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.h2
  const words = text.split(' ')

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block whitespace-pre">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </MotionTag>
  )
}
