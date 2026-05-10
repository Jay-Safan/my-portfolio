import { motion } from 'framer-motion'

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

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-14"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
          <motion.p variants={item} className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-6">
            Fullstack &amp; Mobile Developer · Fulltime · Remote · Freelance
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[rgb(var(--ink))] leading-tight tracking-tight mb-6 max-w-3xl"
          >
            Hi, I'm{' '}
            <span className="underline-accent">Jay Safan</span>
            . I build clean, fast, and{' '}
            <em className="not-italic text-[rgb(var(--accent))]">purposeful</em>{' '}
            web &amp; mobile apps.
          </motion.h1>

          <motion.p variants={item} className="text-lg text-[rgb(var(--muted))] max-w-xl leading-relaxed mb-10">
            Software engineer focused on shipping reliable fullstack and mobile products. Currently
            interning as a fullstack developer — rebuilding production websites and building internal
            dashboard systems. Actively expanding into cloud and AI engineering. Open to fulltime
            roles, remote positions, and freelance projects.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-[rgb(var(--ink))] text-[rgb(var(--paper))] rounded font-medium text-sm"
            >
              View my work ↓
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border border-[rgb(var(--line))] text-[rgb(var(--ink))] rounded font-medium text-sm hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-12 inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open to opportunities
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
