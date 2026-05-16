import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import ProjectCard from './ProjectCard'
import ergoprimaImg from '../assets/ergoprima.png'
import putrasportshubImg from '../assets/putrasportshub.png'

const projects = [
  {
    index: '01',
    image: ergoprimaImg,
    title: 'ErgoPrima Company Website',
    tagline: 'Corporate web presence for an ergonomics brand.',
    description:
      'Rebuilt the full company website from scratch during my internship. Product pages, services, and contact flows. Focused on performance, clean design, and mobile-first layout.',
    tech: ['PHP 8', 'Tailwind CSS', 'Vanilla JS', 'Apache'],
    status: 'Shipped',
    link: 'https://www.ergoprima.com/',
  },
  {
    index: '02',
    image: putrasportshubImg,
    title: 'PutraSportsHub',
    tagline: 'Smart sport facility booking system for UPM.',
    description:
      'Final year project. A Flutter app for booking campus sports facilities, managing tournaments, and hiring referees. Includes role-based access, digital wallet payments with refunds, and a referee marketplace with certification checks.',
    tech: ['Flutter', 'Firebase', 'Dart'],
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1uR2Khn2q0klR93pOhoHRwKUpvAc0_E5-/view',
    linkLabel: 'Watch demo ↗',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">Work</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--ink))] mb-12">Selected projects</h2>
        </Reveal>

        {/* Projects */}
        <div className="flex flex-col gap-6 mb-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} featured />
          ))}
        </div>

        {/* GitHub CTA card */}
        <Reveal delay={100}>
          <motion.a
            href="https://github.com/Jay-Safan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg px-5 sm:px-8 py-6 border border-[rgb(var(--line))] group"
            whileHover={{ y: -4, borderColor: 'rgb(var(--accent))' }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <p className="text-sm font-medium text-[rgb(var(--ink))] mb-1">More on GitHub</p>
              <p className="text-xs text-[rgb(var(--muted))]">See what else I'm building → github.com/Jay-Safan</p>
            </div>
            <motion.span
              className="text-[rgb(var(--muted))] group-hover:text-[rgb(var(--accent))] transition-colors text-xl shrink-0 ml-6"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              ↗
            </motion.span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}
