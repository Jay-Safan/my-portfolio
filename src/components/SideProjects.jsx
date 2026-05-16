import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const sideProjects = [
  {
    title: 'Event Check-In QR',
    description: 'End-to-end QR event check-in system with admin dashboard, mobile scanner app, and live status updates.',
    tech: ['React', 'React Native', 'Node.js', 'MongoDB'],
    link: null,
  },
  {
    title: 'Coming soon',
    description: null,
    tech: [],
    link: null,
  },
]

export default function SideProjects() {
  return (
    <section className="py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">Side projects</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--ink))] mb-12">Things I build for fun</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sideProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <motion.div
                className={`group relative border border-[rgb(var(--line))] rounded-lg p-6 h-full ${project.link ? 'cursor-pointer' : ''}`}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgb(0 0 0 / 0.08)', borderColor: 'rgb(var(--accent))' }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
              >
                {project.description ? (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-semibold text-[rgb(var(--ink))] leading-snug">{project.title}</h3>
                      {project.link && (
                        <span className="text-[rgb(var(--muted))] group-hover:text-[rgb(var(--accent))] transition-colors text-lg shrink-0">↗</span>
                      )}
                    </div>
                    <p className="text-sm text-[rgb(var(--muted))] leading-relaxed mb-4">{project.description}</p>
                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2 py-0.5 rounded bg-[rgb(var(--line)/0.5)] text-[rgb(var(--muted))]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[120px]">
                    <p className="font-mono text-sm text-[rgb(var(--muted))]">More coming soon</p>
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
