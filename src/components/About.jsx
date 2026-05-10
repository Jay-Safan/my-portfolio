import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const stats = [
  { label: 'Working as', value: 'Fullstack Intern' },
  { label: 'Open to', value: 'Fulltime · Remote · Freelance' },
  { label: 'Availability', value: 'Open to opportunities' },
]

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">About</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Portrait */}
          <Reveal className="md:col-span-4" delay={0}>
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
            <Reveal delay={80}>
              <h2 className="text-3xl font-semibold text-[rgb(var(--ink))] mb-6 leading-snug">
                Engineer by training,<br />builder by habit.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-[rgb(var(--muted))] leading-relaxed mb-4">
                I'm currently interning at ErgoPrima, an ergonomics consultancy, where I rebuilt their
                company website from the ground up and am building an internal dashboard management system
                to automate previously manual business processes.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[rgb(var(--muted))] leading-relaxed mb-4">
                My experience spans the full stack — from PHP/Laravel backends and React frontends to
                mobile apps with Flutter and React Native. I care about building things that actually
                get used and make a real difference to the people running them.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="text-[rgb(var(--muted))] leading-relaxed mb-4">
                I'm a final year Software Engineering student at Universiti Putra Malaysia, graduating
                with honours. Building real products alongside my degree has always been the priority —
                I'd rather ship something than just study theory.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <p className="text-[rgb(var(--muted))] leading-relaxed mb-10">
                Beyond the day-to-day, I'm actively expanding into cloud and AI engineering — areas
                I see as the natural next layer for any serious software engineer. My goal is to
                build products that are not just functional, but scalable and intelligent.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={340}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[rgb(var(--line))]">
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
