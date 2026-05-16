import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiExpo,
  SiFlutter,
  SiFirebase,
  SiVuedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiPython,
  SiDart,
  SiDocker,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { FaAws, FaJava } from 'react-icons/fa'

const groups = [
  {
    label: 'Frontend & Mobile',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Expo', icon: SiExpo, color: null },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', icon: SiExpress, color: null },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'REST APIs', icon: TbApi, color: null },
    ],
  },
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'Dart', icon: SiDart, color: '#0175C2' },
    ],
  },
  {
    label: 'Tools & Other',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    ],
  },
]

function SkillIcon({ name, icon: Icon, color, delay }) {
  const [hovered, setHovered] = useState(false)
  const activeColor = color || 'rgb(var(--accent))'

  return (
    <motion.div
      className="flex items-center gap-3 cursor-default"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ x: 4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.span
        className="w-9 h-9 rounded border flex items-center justify-center shrink-0 transition-colors duration-200"
        animate={{ borderColor: hovered ? activeColor : 'rgb(var(--line))' }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={20} style={{ color: hovered ? activeColor : 'rgb(var(--muted))', transition: 'color 0.2s' }} />
      </motion.span>
      <span style={{ color: hovered ? 'rgb(var(--ink))' : 'rgb(var(--muted))', transition: 'color 0.2s' }} className="text-sm">
        {name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">Stack</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--ink))] mb-12">Tools I work with</h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          {groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 80}>
              <p className="font-mono text-xs text-[rgb(var(--muted))] uppercase tracking-widest mb-5">
                {group.label}
              </p>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <SkillIcon key={skill.name} {...skill} delay={gi * 0.1 + si * 0.06} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
