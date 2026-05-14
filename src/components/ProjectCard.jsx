import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const statusColor = {
  Shipped: 'bg-green-500/10 text-green-600 border border-green-500/20',
  'In progress': 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
  'Side project': 'bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.25)]',
  'Coming soon': 'bg-[rgb(var(--muted)/0.1)] text-[rgb(var(--muted))] border border-[rgb(var(--muted)/0.2)]',
  Completed: 'bg-purple-500/10 text-purple-600 border border-purple-500/20',
}

export default function ProjectCard({ project, index, featured = false }) {
  if (featured) {
    return (
      <Reveal delay={0}>
        <motion.div
          className="group relative rounded-lg overflow-hidden cursor-pointer"
          style={{ border: '1px solid rgb(var(--line))' }}
          whileHover={{ y: -4, boxShadow: '0 16px 40px rgb(0 0 0 / 0.1)', borderColor: 'rgb(var(--accent))' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Image — takes 3/5 columns on desktop */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden md:col-span-3">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full stripe-bg flex items-center justify-center">
                  <span className="font-mono text-5xl font-bold text-[rgb(var(--line))]">{project.index}</span>
                </div>
              )}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-10 bg-[rgb(var(--ink))] flex items-center justify-center"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <span className="text-[rgb(var(--paper))] text-sm font-medium">
                  {project.link ? (project.linkLabel || 'View live ↗') : 'Coming soon'}
                </span>
              </motion.div>
            </div>

            {/* Content — takes 2/5 columns on desktop */}
            <div className="p-8 flex flex-col justify-center md:col-span-2">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-[rgb(var(--ink))] leading-snug text-lg">{project.title}</h3>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-[rgb(var(--accent))] font-medium mb-2">{project.tagline}</p>
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
            </div>
          </div>
        </motion.div>
      </Reveal>
    )
  }

  return (
    <Reveal delay={index * 100}>
      <motion.div
        className="group relative border border-[rgb(var(--line))] rounded-lg overflow-hidden cursor-pointer h-full"
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgb(0 0 0 / 0.1)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full stripe-bg flex items-center justify-center">
              <span className="font-mono text-5xl font-bold text-[rgb(var(--line))]">{project.index}</span>
            </div>
          )}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-10 bg-[rgb(var(--ink))] flex items-center justify-center"
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="text-[rgb(var(--paper))] text-sm font-medium">
              {project.link ? (project.linkLabel || 'View live ↗') : 'Coming soon'}
            </span>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-semibold text-[rgb(var(--ink))] leading-snug">{project.title}</h3>
            <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-[rgb(var(--accent))] font-medium mb-2">{project.tagline}</p>
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
        </div>
      </motion.div>
    </Reveal>
  )
}
