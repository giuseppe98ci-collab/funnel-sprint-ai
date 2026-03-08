import { useState, useEffect } from 'react'

const NAMES = [
  ['Marco', 'Milano'], ['Stefania', 'Roma'], ['Davide', 'Torino'],
  ['Luca', 'Bologna'], ['Giulia', 'Napoli'], ['Alessandro', 'Firenze'],
  ['Francesca', 'Verona'], ['Matteo', 'Palermo'], ['Sara', 'Genova'],
  ['Andrea', 'Bari'], ['Chiara', 'Catania'], ['Roberto', 'Padova'],
]

export default function FomoPopup() {
  const [show, setShow] = useState(false)
  const [person, setPerson] = useState(NAMES[0])
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let timeout
    const showNext = () => {
      const idx = Math.floor(Math.random() * NAMES.length)
      setPerson(NAMES[idx])
      setExiting(false)
      setShow(true)

      timeout = setTimeout(() => {
        setExiting(true)
        timeout = setTimeout(() => {
          setShow(false)
          timeout = setTimeout(showNext, 8000 + Math.random() * 12000)
        }, 400)
      }, 4000)
    }

    timeout = setTimeout(showNext, 5000)
    return () => clearTimeout(timeout)
  }, [])

  if (!show) return null

  return (
    <div className={`fixed bottom-4 left-4 z-40 glass-card px-4 py-3 max-w-xs ${exiting ? 'fomo-exit' : 'fomo-enter'}`}>
      <p className="text-sm text-white">
        <span className="font-semibold text-[#C4A95B]">{person[0]}</span> da {person[1]}
      </p>
      <p className="text-xs text-[#B0B0B0]">ha appena acquistato Gold Profit System</p>
      <p className="text-xs text-[#777] mt-1">{Math.floor(Math.random() * 8) + 1} minuti fa</p>
    </div>
  )
}
