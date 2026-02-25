import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Send, Zap, Radio, TrendingUp } from 'lucide-react'

const CTA_LINK = 'https://t.me/+bewF8mb2oUhhOWZk'

const FOMO_NAMES = [
  'Marco', 'Luca', 'Alessandro', 'Sofia', 'Francesco', 'Andrea', 'Matteo',
  'Lorenzo', 'Giulia', 'Davide', 'Simone', 'Federico', 'Elena', 'Chiara',
  'Giovanni', 'Roberto', 'Valentina', 'Alessia', 'Riccardo', 'Sara'
]

function FadeIn({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
      {children}
    </div>
  )
}

function FomoNotification() {
  const [notification, setNotification] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = () => {
      const name = FOMO_NAMES[Math.floor(Math.random() * FOMO_NAMES.length)]
      const minutes = Math.floor(Math.random() * 5) + 1
      setNotification({ name, minutes })
      setVisible(true)
      setTimeout(() => setVisible(false), 3500)
    }
    const initial = setTimeout(show, 4000)
    const interval = setInterval(show, Math.random() * 3000 + 6000)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  if (!notification) return null

  return (
    <div className={`fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-white/95 backdrop-blur-md border border-green-200 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-sm text-gray-700">
          <strong className="text-green-600">{notification.name}</strong> si è iscritto al canale
          <span className="text-gray-400 text-xs ml-1">— {notification.minutes} min fa</span>
        </p>
      </div>
    </div>
  )
}

// Telegram-style doodle SVG pattern
const TelegramPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="tg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <path d="M20 15 L35 22 L25 28 Z" fill="none" stroke="white" strokeWidth="1" transform="rotate(15 27 21)" />
        <rect x="70" y="10" width="20" height="14" rx="4" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="76" cy="17" r="1.5" fill="white" opacity="0.5" />
        <circle cx="80" cy="17" r="1.5" fill="white" opacity="0.5" />
        <circle cx="84" cy="17" r="1.5" fill="white" opacity="0.5" />
        <rect x="15" y="65" width="12" height="10" rx="2" fill="none" stroke="white" strokeWidth="1" />
        <path d="M18 65 V60 A3 3 0 0 1 24 60 V65" fill="none" stroke="white" strokeWidth="1" />
        <polygon points="80,70 82,76 88,76 83,80 85,86 80,82 75,86 77,80 72,76 78,76" fill="none" stroke="white" strokeWidth="1" />
        <path d="M48 95 C48 90, 55 88, 55 93 C55 88, 62 90, 62 95 C62 102, 55 106, 55 106 C55 106, 48 102, 48 95Z" fill="none" stroke="white" strokeWidth="1" />
        <rect x="95" y="55" width="14" height="24" rx="3" fill="none" stroke="white" strokeWidth="1" />
        <line x1="99" y1="57" x2="105" y2="57" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tg)" />
  </svg>
)

export default function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{background: 'linear-gradient(160deg, #a8b86a 0%, #7aaa7a 40%, #5a9a7a 100%)'}}>
      <TelegramPattern />
      <FomoNotification />

      <FadeIn className="relative z-10 w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src="/nick-photo.jpeg"
                alt="Nick Parodi"
                className="w-[110px] h-[110px] rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#3390ec] rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Channel name */}
          <h1 className="text-2xl font-bold text-[#222] mb-1 flex items-center justify-center gap-2">
            Nick's Life <TrendingUp className="w-5 h-5 text-[#3390ec]" /> <Radio className="w-5 h-5 text-red-500" />
          </h1>

          {/* Subscriber count */}
          <div className="flex items-center justify-center gap-1.5 text-[#999] text-sm mb-4">
            <span>32 010 iscritti</span>
          </div>

          {/* Description */}
          <p className="text-[#333] text-[15px] leading-relaxed mb-6">
            Canale N1 in ITALIA su Geopolitica, economia e Finanza
          </p>

          {/* Separator */}
          <div className="border-t border-gray-100 mb-6" />

          {/* Preview messages */}
          <div className="space-y-3 mb-6">
            <div className="bg-[#f0f7ff] rounded-xl p-3 text-left flex gap-2">
              <Radio className="w-4 h-4 text-[#3390ec] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] text-[#333] leading-relaxed"><strong>LIVE alle 21:00</strong> — Analisi mercati e geopolitica. Non mancare!</p>
                <p className="text-[10px] text-[#999] text-right mt-1">20:45</p>
              </div>
            </div>
            <div className="bg-[#f0f7ff] rounded-xl p-3 text-left flex gap-2">
              <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] text-[#333] leading-relaxed">La strategia automatizzata ha chiuso +2.3% oggi. I risultati parlano da soli.</p>
                <p className="text-[10px] text-[#999] text-right mt-1">18:30</p>
              </div>
            </div>
          </div>

          {/* CTA - vivid neon pulse */}
          <a
            href={CTA_LINK}
            className="relative block w-full overflow-hidden text-white font-bold text-[16px] py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 animate-cta-pulse group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00e676] via-[#00c853] to-[#00e676] bg-[length:200%_100%] animate-shimmer" />
            <span className="absolute inset-0 animate-neon-glow rounded-xl" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              <span>ACCEDI AL CANALE</span>
              <ChevronRight className="w-4 h-4 animate-bounce-x" />
            </span>
          </a>

          {/* Sub text */}
          <p className="text-[#999] text-[13px] mt-3">
            Clicca sopra per accedere al canale di <strong className="text-[#333]">Nick Parodi</strong>.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-[11px] mt-4">
          © Nick's Life — Canale Telegram Gratuito
        </p>
      </FadeIn>
    </div>
  )
}
