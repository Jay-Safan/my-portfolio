import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'

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
                Whether it's a fulltime role, a remote position, a freelance project, or just a question — I'd love to hear from you.
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
              <p className="text-xs text-[rgb(var(--muted))] mt-3 font-mono">
                Based in Malaysia · GMT+8
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex items-center gap-5 mt-6">
                <motion.a
                  href="https://github.com/Jay-Safan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
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
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </motion.a>
              </div>
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
                    {status === 'sending' ? 'Sending…' : status === 'error' ? 'Failed — try again' : 'Send message'}
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
