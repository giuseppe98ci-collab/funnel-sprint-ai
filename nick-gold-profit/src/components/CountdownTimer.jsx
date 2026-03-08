import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 0, s: 0 })

  useEffect(() => {
    const stored = sessionStorage.getItem('gps-timer-end')
    let endTime
    if (stored) {
      endTime = parseInt(stored, 10)
    } else {
      endTime = Date.now() + 2 * 60 * 60 * 1000
      sessionStorage.setItem('gps-timer-end', endTime.toString())
    }

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTime({ h, m, s })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center justify-center gap-2 text-white font-headline text-2xl md:text-3xl">
      <span className="bg-[#1A1A1A] border border-[rgba(196,169,91,0.3)] rounded-lg px-3 py-2 min-w-[3rem] text-center">{pad(time.h)}</span>
      <span className="gold-text">:</span>
      <span className="bg-[#1A1A1A] border border-[rgba(196,169,91,0.3)] rounded-lg px-3 py-2 min-w-[3rem] text-center">{pad(time.m)}</span>
      <span className="gold-text">:</span>
      <span className="bg-[#1A1A1A] border border-[rgba(196,169,91,0.3)] rounded-lg px-3 py-2 min-w-[3rem] text-center">{pad(time.s)}</span>
    </div>
  )
}
