import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const statusColor = {
  Shipped: 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]',
  Ongoing: 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]',
  'In progress': 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]',
  'Side project': 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]',
  'Coming soon': 'bg-[rgb(var(--muted)/0.1)] text-[rgb(var(--muted))] border border-[rgb(var(--muted)/0.2)]',
  Completed: 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]',
}

function CardContent({ project, featured }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className={`font-semibold text-[rgb(var(--ink))] leading-snug ${featured ? 'text-lg' : ''}`}>
          {/* Accent underline wipes in left→right on hover */}
          <span className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent))] bg-no-repeat bg-left-bottom bg-[length:0%_1.5px] transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1.5px]">
            {project.title}
          </span>
        </h3>
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
    </>
  )
}

function ImageSection({ project, featured }) {
  return (
    <div className={`relative overflow-hidden ${featured ? 'aspect-video md:aspect-auto md:min-h-[280px] md:col-span-3' : 'aspect-video'}`}>
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
      ) : (
        <div className="w-full h-full stripe-bg flex items-center justify-center">
          <span className="font-mono text-5xl font-bold text-[rgb(var(--line))]">{project.index}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--ink)/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-[rgb(var(--ink))] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <span className="text-[rgb(var(--paper))] text-sm font-medium">
          {project.link ? (project.linkLabel || 'View live ↗') : 'Coming soon'}
        </span>
      </div>
    </div>
  )
}

// Minimal hover: a gentle lift, soft shadow, and accent border.
const hover = { y: -6, boxShadow: '0 18px 40px rgb(0 0 0 / 0.10)', borderColor: 'rgb(var(--accent))' }
const hoverTransition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }

export default function ProjectCard({ project, index, featured = false }) {
  if (featured) {
    return (
      <Reveal delay={0}>
        <motion.a
          href={project.link || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-lg overflow-hidden cursor-pointer block border border-[rgb(var(--line))]"
          whileHover={hover}
          transition={hoverTransition}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <ImageSection project={project} featured />
            <div className="p-6 md:p-8 flex flex-col justify-center md:col-span-2">
              <CardContent project={project} featured />
            </div>
          </div>
        </motion.a>
      </Reveal>
    )
  }

  return (
    <Reveal delay={index * 100}>
      <motion.a
        href={project.link || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative border border-[rgb(var(--line))] rounded-lg overflow-hidden cursor-pointer block h-full"
        whileHover={hover}
        transition={hoverTransition}
      >
        <ImageSection project={project} />
        <div className="p-6">
          <CardContent project={project} />
        </div>
      </motion.a>
    </Reveal>
  )
}
