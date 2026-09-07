import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'
import AuroraBackground from './AuroraBackground'

const stats = [
  { label: 'Currently', value: 'Interning @ Le Medica' },
  { label: 'Freelance', value: 'Available now' },
  { label: 'Full-time', value: 'Open to opportunities' },
]

export default function About() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <AuroraBackground />
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">About</p>
        </Reveal>

        {/* Mobile: profile card row + stacked content */}
        {/* Desktop: side-by-side portrait + bio */}

        {/* Mobile profile card — hidden on md+ */}
        <Reveal className="md:hidden" delay={0}>
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-20 h-20 rounded-full overflow-hidden border border-[rgb(var(--line))] shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/portrait.jpg"
                alt="Muhammad Jay Safan"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--ink))] leading-snug">
                Engineer by training,
              </h2>
              <p className="text-lg font-semibold text-[rgb(var(--ink))] leading-snug">
                builder by habit.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 items-start">
          {/* Desktop portrait — hidden on mobile */}
          <Reveal className="hidden md:block md:col-span-4" delay={0}>
            <motion.div
              className="aspect-[4/5] rounded-lg overflow-hidden border border-[rgb(var(--line))]"
              style={{ y: reduce ? 0 : portraitY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/portrait.jpg"
                alt="Muhammad Jay Safan"
                className="w-full h-full object-cover object-top scale-110"
              />
            </motion.div>
          </Reveal>

          {/* Bio */}
          <div className="md:col-span-8">
            {/* Desktop heading — hidden on mobile */}
            <Reveal className="hidden md:block" delay={80}>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--ink))] mb-6 leading-snug">
                Engineer by training,<br />builder by habit.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-4">
                I'm currently interning at Le Medica, a medical tourism platform, where I work across
                a large Next.js and TypeScript codebase. My work spans an AI concierge chat, a
                configurable membership and perks system, an interactive treatment-assessment funnel,
                and much of the site's SEO and content-management layer.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-4">
                Before this, I interned at ErgoPrima, an ergonomics consultancy, where I rebuilt their
                company website from the ground up and built an internal dashboard that automates
                previously manual business processes.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-4">
                My experience spans the full stack, from PHP backends and React frontends to mobile
                apps. For my final year project at UPM, I built PutraSportsHub, a campus sports
                booking system with facility reservations, tournaments, and a referee marketplace.
                I care about building things that actually get used.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-10">
                I'm graduating with honours and actively expanding into cloud and AI engineering.
                My goal is to build products that are not just functional, but scalable and intelligent.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={340}>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-[rgb(var(--line))]">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                  >
                    <p className="font-mono text-xs text-[rgb(var(--muted))] uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-sm font-medium text-[rgb(var(--ink))]">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
