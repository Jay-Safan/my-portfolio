import { useEffect, useRef, useId } from 'react'

export default function FilmGrain() {
  const filterId = useId()
  const turbRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) return

    let seed = 0
    const id = setInterval(() => {
      seed = (seed + 1) % 100
      turbRef.current?.setAttribute('seed', seed)
    }, 125)

    return () => clearInterval(id)
  }, [])

  return (
    <>
      <svg width="0" height="0" className="absolute">
        <filter id={filterId}>
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            seed="0"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="film-grain"
        style={{ filter: `url(#${filterId})` }}
        aria-hidden="true"
      />
    </>
  )
}
