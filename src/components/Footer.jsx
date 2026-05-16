import { motion } from 'framer-motion'
import { GitHubIcon, LinkedInIcon, EmailIcon } from './icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[rgb(var(--line))] py-10 bg-[rgb(var(--paper)/0.6)] backdrop-blur-md"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-1.5 group"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent))] group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm text-[rgb(var(--ink))]">Jay</span>
        </motion.a>

        <p className="text-xs text-[rgb(var(--muted))]">
          © {year} · Muhammad Jay Safan · Kuala Lumpur, Malaysia.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {[
            {
              href: 'https://github.com/Jay-Safan',
              label: 'GitHub',
              icon: <GitHubIcon size={18} />,
            },
            {
              href: 'https://www.linkedin.com/in/muhammad-jay-safan-383386225',
              label: 'LinkedIn',
              icon: <LinkedInIcon size={18} />,
            },
            {
              href: 'mailto:jay.safan4@gmail.com',
              label: 'Email',
              icon: <EmailIcon size={18} />,
            },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="flex items-center gap-1.5 text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
              <span className="hidden sm:inline text-xs">{label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
