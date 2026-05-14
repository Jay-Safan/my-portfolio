import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { TimeZoneWidget } from './TimeZoneWidget'
import { GitHubIcon, LinkedInIcon } from './icons'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  if (!EMAIL_RE.test(fields.email)) errors.email = 'Enter a valid email address.'
  if (fields.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  const errors = validate(fields)
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  )

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(errors).length > 0) return
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mdabppwp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-[rgb(var(--line))]" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))] uppercase mb-3">Contact</p>
              <h2 className="text-3xl font-semibold text-[rgb(var(--ink))] mb-4 leading-snug">
                Have something<br />in mind?
              </h2>
              <p className="text-[rgb(var(--muted))] leading-relaxed mb-8">
                Got a role, project, or question? I'd love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <motion.a
                href="mailto:jay.safan4@gmail.com"
                className="font-mono text-sm text-[rgb(var(--accent))] hover:underline"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                jay.safan4@gmail.com
              </motion.a>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex items-center gap-5 mt-6">
                <motion.a
                  href="https://github.com/Jay-Safan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <GitHubIcon />
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/muhammad-jay-safan-383386225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </motion.a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <TimeZoneWidget />
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={80}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="border border-[rgb(var(--line))] rounded-lg p-8 text-center"
                >
                  <motion.svg
                    viewBox="0 0 52 52"
                    className="w-14 h-14 mx-auto mb-4"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.circle
                      cx="26" cy="26" r="25"
                      fill="none"
                      stroke="rgb(var(--accent))"
                      strokeWidth="1.5"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
                      }}
                    />
                    <motion.path
                      fill="none"
                      stroke="rgb(var(--accent))"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 27l8 8 16-16"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 0.55, ease: 'easeOut' } }
                      }}
                    />
                  </motion.svg>
                  <h3 className="font-semibold text-[rgb(var(--ink))] mb-2">
                    Thanks, {fields.name.split(' ')[0]}!
                  </h3>
                  <p className="text-sm text-[rgb(var(--muted))]">I'll get back to you as soon as I can.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {['name', 'email', 'message'].map((field, i) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <label className="block text-xs font-medium text-[rgb(var(--muted))] mb-1.5 capitalize">
                        {field}
                      </label>
                      {field === 'message' ? (
                        <textarea
                          name="message"
                          value={fields.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={5}
                          placeholder="What's on your mind?"
                          className={`w-full px-4 py-2.5 text-sm rounded border bg-transparent text-[rgb(var(--ink))] placeholder:text-[rgb(var(--muted)/0.5)] outline-none focus:border-[rgb(var(--accent))] transition-colors resize-none ${
                            visibleErrors.message ? 'border-red-400' : 'border-[rgb(var(--line))]'
                          }`}
                        />
                      ) : (
                        <input
                          name={field}
                          type={field === 'email' ? 'email' : 'text'}
                          value={fields[field]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                          className={`w-full px-4 py-2.5 text-sm rounded border bg-transparent text-[rgb(var(--ink))] placeholder:text-[rgb(var(--muted)/0.5)] outline-none focus:border-[rgb(var(--accent))] transition-colors ${
                            visibleErrors[field] ? 'border-red-400' : 'border-[rgb(var(--line))]'
                          }`}
                        />
                      )}
                      <AnimatePresence>
                        {visibleErrors[field] && (
                          <motion.p
                            className="text-xs text-red-400 mt-1"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {visibleErrors[field]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-[rgb(var(--ink))] text-[rgb(var(--paper))] rounded font-medium text-sm disabled:opacity-50 transition-opacity"
                  >
                    {status === 'sending' ? 'Sending…' : status === 'error' ? 'Failed, try again' : 'Send message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
