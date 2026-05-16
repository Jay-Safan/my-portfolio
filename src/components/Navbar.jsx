import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SECTIONS = ['home', 'projects', 'skills', 'about', 'contact']

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, () => setDark(d => !d)]
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, toggleDark] = useDarkMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach(io => io.disconnect())
  }, [])

  const highlightId = hovered || active

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  }
  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgb(var(--paper)/0.8)] backdrop-blur-2xl border-b border-[rgb(var(--line)/0.4)]'
          : ''
      }`}
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      {/* Desktop */}
      <motion.div
        className="hidden md:flex max-w-5xl mx-auto px-6 h-14 items-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo — left */}
        <motion.a
          href="#home"
          className="flex items-center gap-1.5 group"
          variants={fadeIn}
        >
          <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent))] group-hover:scale-125 transition-transform duration-300" />
          <span className="font-semibold text-[rgb(var(--ink))] tracking-tight">Jay</span>
        </motion.a>

        {/* Nav links — center */}
        <motion.nav
          className="absolute inset-x-0 flex justify-center pointer-events-none"
          variants={fadeIn}
        >
          <div className="flex items-center gap-1 pointer-events-auto">
            {links.map(({ label, href }) => {
              const id = href.slice(1)
              const isHighlighted = highlightId === id
              return (
                <a
                  key={href}
                  href={href}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isHighlighted
                      ? 'text-[rgb(var(--ink))]'
                      : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))]'
                  }`}
                >
                  {isHighlighted && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[rgb(var(--line)/0.45)]"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                  {label}
                </a>
              )
            })}
          </div>
        </motion.nav>

        {/* Right side */}
        <motion.div
          className="flex items-center gap-4 ml-auto"
          variants={fadeIn}
        >
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors duration-200"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="#contact"
            className="text-sm font-medium text-[rgb(var(--accent))] hover:text-[rgb(var(--ink))] transition-colors duration-200 group/cta"
          >
            Hire me
            <span className="inline-block ml-1 transition-transform duration-200 group-hover/cta:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center px-5 h-14">
        <a href="#home" className="flex items-center gap-1.5 group">
          <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent))] group-hover:scale-125 transition-transform duration-300" />
          <span className="font-semibold text-[rgb(var(--ink))] tracking-tight">Jay</span>
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="flex flex-col gap-1.5 p-1.5"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[rgb(var(--ink))] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-px bg-[rgb(var(--ink))] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[rgb(var(--ink))] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-[rgb(var(--line)/0.3)] bg-[rgb(var(--paper)/0.9)] backdrop-blur-2xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(({ label, href }) => {
                const isActive = active === href.slice(1)
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-[rgb(var(--ink))] bg-[rgb(var(--line)/0.4)]'
                        : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))]'
                    }`}
                  >
                    {label}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[rgb(var(--accent))] px-3 py-2.5 mt-1"
              >
                Hire me &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
