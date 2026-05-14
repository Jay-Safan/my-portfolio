import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const stats = [
  { label: 'Currently', value: 'Interning @ ErgoPrima' },
  { label: 'Freelance', value: 'Available now' },
  { label: 'Full-time', value: 'From August 2026' },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
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
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/portrait.jpg"
                alt="Muhammad Jay Safan"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </Reveal>

          {/* Bio */}
          <div className="md:col-span-8">
            {/* Desktop heading — hidden on mobile */}
            <Reveal className="hidden md:block" delay={80}>
              <h2 className="text-3xl font-semibold text-[rgb(var(--ink))] mb-6 leading-snug">
                Engineer by training,<br />builder by habit.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-4">
                I'm currently interning at ErgoPrima, an ergonomics consultancy, where I rebuilt their
                company website from the ground up and am building an internal dashboard management system
                to automate previously manual business processes.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-sm md:text-base text-[rgb(var(--muted))] leading-relaxed mb-4">
                My experience spans the full stack, from PHP backends and React frontends to mobile
                apps. For my final year project at UPM, I built PutraSportsHub, a campus sports
                booking system with facility reservations, tournaments, and a referee marketplace.
                I care about building things that actually get used.
              </p>
            </Reveal>

            <Reveal delay={240}>
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
