import { motion, useScroll, useTransform } from 'framer-motion'
import FilmGrain from './FilmGrain'
import InteractiveDotGrid from './InteractiveDotGrid'

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

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-14 px-0"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      <InteractiveDotGrid spacing={28} influenceRadius={140} className="absolute inset-0" />
      <FilmGrain />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
          <motion.p variants={item} className="font-mono text-[10px] sm:text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-6">
            Fullstack &amp; Mobile Developer
          </motion.p>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[rgb(var(--ink))] leading-tight tracking-tight mb-6 max-w-3xl"
          >
            Hi, I'm{' '}
            <span className="underline-accent">Jay Safan</span>
            . I build clean, fast, and{' '}
            <em className="not-italic text-[rgb(var(--accent))]">purposeful</em>{' '}
            web &amp; mobile apps.
          </motion.h1>

          <motion.p variants={item} className="text-lg text-[rgb(var(--muted))] max-w-xl leading-relaxed mb-10">
            Software engineer who ships fullstack and mobile products. React on the front,
            PHP &amp; Node on the back. Currently interning at ErgoPrima, open to freelance
            now and full-time roles from August 2026.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-[rgb(var(--ink))] text-[rgb(var(--paper))] rounded-lg font-medium text-sm"
            >
              View my work ↓
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border border-[rgb(var(--line))] text-[rgb(var(--ink))] rounded-lg font-medium text-sm hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--accent))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--accent))]" />
              </span>
              Freelance · available now
            </span>
            <span className="text-[rgb(var(--line))]">·</span>
            <span className="text-sm text-[rgb(var(--muted))]">Full-time from Aug 2026</span>
          </motion.div>
        </motion.div>
      </div>

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
