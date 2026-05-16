import { useEffect, useRef, useCallback } from 'react'

function parseRgbVar(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const parts = raw.split(/\s+/).map(Number)
  return parts.length === 3 ? parts : [128, 128, 128]
}

export default function InteractiveDotGrid({
  spacing = 28,
  influenceRadius = 140,
  className = '',
}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false })
  const colorsRef = useRef({ line: [0, 0, 0], accent: [0, 0, 0] })
  const rafRef = useRef(null)
  const reducedMotion = useRef(false)

  const readColors = useCallback(() => {
    colorsRef.current = {
      line: parseRgbVar('--line'),
      accent: parseRgbVar('--accent'),
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    readColors()

    // Resize canvas
    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      drawStatic()
    }

    // Draw static grid (no mouse effect)
    function drawStatic() {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const [r, g, b] = colorsRef.current.line

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgba(${r},${g},${b},0.4)`
      ctx.beginPath()
      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          ctx.moveTo(x + 1, y)
          ctx.arc(x, y, 1, 0, Math.PI * 2)
        }
      }
      ctx.fill()
    }

    // Draw with mouse interaction
    function draw() {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const { x: mx, y: my, inside } = mouseRef.current
      const [lr, lg, lb] = colorsRef.current.line
      const [ar, ag, ab] = colorsRef.current.accent
      const r2 = influenceRadius * influenceRadius

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Default dots batch
      ctx.fillStyle = `rgba(${lr},${lg},${lb},0.4)`
      ctx.beginPath()

      const highlightDots = []

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          if (!inside) {
            ctx.moveTo(x + 1, y)
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            continue
          }

          const dx = x - mx
          const dy = y - my
          const dist2 = dx * dx + dy * dy

          if (dist2 < r2) {
            highlightDots.push({ x, y, t: 1 - dist2 / r2 })
          } else {
            ctx.moveTo(x + 1, y)
            ctx.arc(x, y, 1, 0, Math.PI * 2)
          }
        }
      }
      ctx.fill()

      // Highlighted dots (individual colors)
      for (const dot of highlightDots) {
        const t = dot.t * dot.t // ease-in curve
        const cr = Math.round(lr + (ar - lr) * t)
        const cg = Math.round(lg + (ag - lg) * t)
        const cb = Math.round(lb + (ab - lb) * t)
        const opacity = 0.4 + 0.5 * t
        const size = 1 + 1.5 * t

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${opacity})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // Mouse tracking
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.inside = true
    }

    function onMouseLeave() {
      mouseRef.current.inside = false
    }

    // Theme change observer
    const observer = new MutationObserver(() => {
      readColors()
      if (reducedMotion.current) drawStatic()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Resize observer
    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    })
    ro.observe(canvas.parentElement)

    // Start
    resize()

    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!reducedMotion.current && hasHover) {
      canvas.parentElement.addEventListener('mousemove', onMouseMove)
      canvas.parentElement.addEventListener('mouseleave', onMouseLeave)
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove)
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave)
      observer.disconnect()
      ro.disconnect()
    }
  }, [spacing, influenceRadius, readColors])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
      role="presentation"
    />
  )
}
