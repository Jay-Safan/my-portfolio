// Google Analytics 4 (gtag.js).
// Loads only on the live domains — never localhost or Vercel preview builds,
// so local development and PR previews don't pollute the stats.
const GA_ID = 'G-NT9L9G1N9C'
const LIVE_HOSTS = ['jaysafan.vercel.app', 'jaysafan.dev', 'www.jaysafan.dev']

export function initAnalytics() {
  if (typeof window === 'undefined') return
  if (!LIVE_HOSTS.includes(window.location.hostname)) return
  if (window.gtag) return // already initialised

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}
