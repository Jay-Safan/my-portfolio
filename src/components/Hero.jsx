import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FilmGrain from './FilmGrain'
import InteractiveDotGrid from './InteractiveDotGrid'
import MagneticButton from './MagneticButton'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

// Split headline into words for staggered reveal
const headlineParts = [
  { text: 'Hi,', className: '' },
  { text: " I'm", className: '' },
  { text: ' Jay Safan', className: 'name-shimmer' },
  { text: '.', className: '' },
  { text: ' I build', className: '' },
  { text: ' clean,', className: '' },
  { text: ' fast,', className: '' },
  { text: ' and', className: '' },
  { text: ' purposeful', className: 'not-italic text-[rgb(var(--accent))]', tag: 'em' },
  { text: ' web', className: '' },
  { text: ' &', className: '' },
  { text: ' mobile', className: '' },
  { text: ' apps.', className: '' },
]

const wordVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: 0.4 + i * 0.05,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0])
  // Parallax: content moves slower than background
  const contentY = useTransform(scrollY, [0, 600], [0, 80])
  const bgY = useTransform(scrollY, [0, 600], [0, 160])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-14 px-0 overflow-hidden"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      {/* Background layers — move faster for parallax depth */}
      <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : bgY }}>
        <InteractiveDotGrid spacing={28} influenceRadius={140} className="absolute inset-0" />
      </motion.div>
      <FilmGrain />

      {/* Content — moves slower */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full"
        style={{ y: reduce ? 0 : contentY }}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
          <motion.p variants={item} className="font-mono text-[10px] sm:text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-6">
            Fullstack &amp; Mobile Developer
          </motion.p>

          {/* Staggered word reveal headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[rgb(var(--ink))] leading-tight tracking-tight mb-6 max-w-3xl">
            {headlineParts.map((part, i) => {
              const Tag = part.tag || 'span'
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariant}
                  initial={reduce ? false : 'hidden'}
                  animate="show"
                  className={`inline ${part.className}`}
                >
                  {Tag === 'em' ? <em className={part.className}>{part.text}</em> : part.text}
                </motion.span>
              )
            })}
          </h1>

          <motion.p variants={item} className="text-lg text-[rgb(var(--muted))] max-w-xl leading-relaxed mb-10">
            Software engineer who ships fullstack and mobile products. React on the front,
            PHP &amp; Node on the back. Currently interning at Le Medica, open to freelance
            work and full-time opportunities.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              strength={0.25}
              className="px-6 py-3 bg-[rgb(var(--ink))] text-[rgb(var(--paper))] rounded-lg font-medium text-sm"
            >
              View my work ↓
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="px-6 py-3 border border-[rgb(var(--line))] bg-[rgb(var(--paper))] text-[rgb(var(--ink))] rounded-lg font-medium text-sm hover:border-[rgb(var(--ink))] transition-colors"
            >
              Get in touch
            </MagneticButton>
          </motion.div>

        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[rgb(var(--muted))] hidden sm:flex flex-col items-center"
        aria-hidden="true"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown />
        </motion.div>
      </motion.div>
    </section>
  )
}
