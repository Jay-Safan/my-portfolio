import { useState, useEffect, memo } from 'react'

export const TimeZoneWidget = memo(function TimeZoneWidget() {
  const [now, setNow] = useState(new Date())
  const [use24h, setUse24h] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const myTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
  const yourTime = now

  const fmt = (date) => date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24h,
  })

  const myOffset = 8
  const yourOffset = -yourTime.getTimezoneOffset() / 60
  const diff = Math.abs(myOffset - yourOffset)
  const diffDir = myOffset > yourOffset ? 'ahead of you' : myOffset < yourOffset ? 'behind you' : ''
  const diffLabel = diff === 0 ? 'Same timezone' : `${diff}h ${diffDir}`

  const yourTz = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop().replace(/_/g, ' ')
  const yourGmt = `GMT${yourOffset >= 0 ? '+' : ''}${yourOffset}`

  return (
    <div className="rounded-lg border border-[rgb(var(--line))] bg-[rgb(var(--line)/0.15)] overflow-hidden mt-8 max-w-[300px]">
      {/* My time (Jay's time first) */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-widest text-[rgb(var(--muted))] uppercase">
            My time
          </span>
          <button
            onClick={() => setUse24h(h => !h)}
            className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[rgb(var(--line))] text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))] hover:border-[rgb(var(--accent))] transition-colors"
          >
            {use24h ? '12H' : '24H'}
          </button>
        </div>
        <p className="text-2xl font-semibold text-[rgb(var(--ink))] tracking-tight leading-none mb-1">
          {fmt(myTime)}
        </p>
        <p className="font-mono text-[10px] text-[rgb(var(--muted))]">
          GMT+8 · Kuala Lumpur
        </p>
      </div>

      {/* Divider with diff */}
      <div className="flex items-center gap-3 px-5">
        <span className="flex-1 h-px bg-[rgb(var(--line))]" />
        <span className="font-mono text-[10px] text-[rgb(var(--muted))] whitespace-nowrap">{diffLabel}</span>
        <span className="flex-1 h-px bg-[rgb(var(--line))]" />
      </div>

      {/* Your time (visitor) */}
      <div className="px-5 pt-3 pb-4">
        <p className="font-mono text-[10px] tracking-widest text-[rgb(var(--muted))] uppercase mb-2">Your time</p>
        <p className="text-2xl font-semibold text-[rgb(var(--ink))] tracking-tight leading-none mb-1">
          {fmt(yourTime)}
        </p>
        <p className="font-mono text-[10px] text-[rgb(var(--muted))]">
          {yourGmt} · {yourTz}
        </p>
      </div>
    </div>
  )
})
