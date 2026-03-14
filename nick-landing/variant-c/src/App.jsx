import { useEffect, useRef, useState } from 'react'
import { Users, BarChart3, Wallet, Target, CheckCircle, Send, Radio, TrendingUp, Zap } from 'lucide-react'
import { trackCTA } from './posthog.js'

const CTA_LINK = 'https://t.me/m/JeiB1gJsNTZk'
const VARIANT = 'c'

const FOMO_NAMES = [
  'Marco', 'Luca', 'Alessandro', 'Sofia', 'Francesco', 'Andrea', 'Matteo',
  'Lorenzo', 'Giulia', 'Davide', 'Simone', 'Federico', 'Elena', 'Chiara',
  'Giovanni', 'Roberto', 'Valentina', 'Alessia', 'Riccardo', 'Sara'
]

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
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
    const initial = setTimeout(show, 3500)
    const interval = setInterval(show, Math.random() * 3000 + 5500)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  if (!notification) return null

  return (
    <div className={`fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-[#1a1f2e]/95 backdrop-blur-md border border-[#3390ec]/30 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(51,144,236,0.15)] flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-full bg-[#3390ec]/20 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-[#3390ec]" />
        </div>
        <p className="text-sm text-white/90">
          <strong className="text-[#3390ec]">{notification.name}</strong> si è appena iscritto
          <span className="text-white/50 text-xs ml-1">— {notification.minutes} min fa</span>
        </p>
      </div>
    </div>
  )
}

function InfiniteMarquee({ children }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-4 animate-marquee" style={{ width: 'max-content', willChange: 'transform' }}>
        <div className="flex gap-4 shrink-0">{children}</div>
        <div className="flex gap-4 shrink-0">{children}</div>
      </div>
    </div>
  )
}

function PulseCTA({ href, children, className = '', location = 'unknown' }) {

  const handleClick = (e) => {
    e.preventDefault()
    trackCTA(VARIANT, location)
    window.location.href = href
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative block w-full text-center text-white font-bold text-base py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] overflow-hidden group animate-cta-pulse ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#3390ec] via-[#5ba8f0] to-[#3390ec] bg-[length:200%_100%] animate-shimmer" />
      <span className="absolute inset-0 animate-pulse-glow rounded-2xl" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Send className="w-5 h-5" />
        {children}
      </span>
    </a>
  )
}

const testimonials = Array.from({ length: 12 }, (_, i) => `./testi-${i + 1}.jpeg`)

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white relative overflow-hidden">
      <FomoNotification />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3390ec]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] bg-[#c9a44e]/5 rounded-full blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tgd" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M15 10 L30 17 L20 23 Z" fill="none" stroke="#3390ec" strokeWidth="0.8" />
              <rect x="60" y="8" width="18" height="12" rx="3" fill="none" stroke="#3390ec" strokeWidth="0.8" />
              <circle cx="50" cy="70" r="8" fill="none" stroke="#3390ec" strokeWidth="0.8" />
              <rect x="80" y="60" width="10" height="18" rx="2" fill="none" stroke="#3390ec" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgd)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 flex flex-col items-center">
        {/* Hero */}
        <FadeIn className="text-center mb-8">
          <div className="relative inline-block mb-5">
            <div className="absolute inset-0 bg-[#3390ec]/20 rounded-full blur-xl scale-125" />
            <img src="./nick-photo.jpeg" alt="Nick Parodi" className="relative w-24 h-24 rounded-full object-cover border-2 border-[#3390ec]/40" />
            <div className="absolute -bottom-1 -right-1 bg-[#3390ec] rounded-full w-6 h-6 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <p className="text-[#3390ec] text-sm font-semibold tracking-wider uppercase mb-2">Nick Parodi</p>
          <h1 className="text-3xl font-bold leading-tight mb-3">
            Il canale <span className="text-[#3390ec]">N1 in Italia</span> su Geopolitica, Economia e Finanza
          </h1>
          <p className="text-[#8a9bb8] text-base mb-6">Oltre 32.000 persone lo seguono ogni giorno. Accesso 100% gratuito.</p>
          <PulseCTA href={CTA_LINK} location="hero">
            Accedi al Canale Gratuito
          </PulseCTA>
          <p className="text-center text-[#8a9bb8]/50 text-xs mt-2 mb-0">Gratis — Unisciti in 10 secondi</p>
        </FadeIn>

        {/* Stats - glass cards */}
        <FadeIn delay={200} className="w-full mb-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { Icon: Users, value: '32.000+', label: 'Iscritti' },
              { Icon: BarChart3, value: '6+', label: 'Anni esperienza' },
              { Icon: Wallet, value: '$7M+', label: 'Fondi gestiti' },
              { Icon: Target, value: '2.432+', label: 'Persone aiutate' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                <s.Icon className="w-6 h-6 text-[#3390ec] mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="text-xs text-[#8a9bb8]">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Telegram Preview Card */}
        <FadeIn delay={400} className="w-full mb-8">
          <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="./nick-photo.jpeg" alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-semibold text-white text-sm flex items-center gap-1.5">Nick's Life <TrendingUp className="w-4 h-4 text-[#3390ec]" /> <Radio className="w-4 h-4 text-red-400" /></p>
                <p className="text-[#8a9bb8] text-xs">32 010 iscritti</p>
              </div>
              <div className="ml-auto">
                <span className="bg-[#3390ec] text-white text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 mb-3 flex gap-2">
              <Radio className="w-4 h-4 text-[#3390ec] mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-[#c8d0dc] leading-relaxed">Ogni giorno analisi gratuite su mercati, geopolitica e opportunità di investimento. Entra e vedi con i tuoi occhi.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex gap-2">
              <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-[#c8d0dc] leading-relaxed">Strategia gratuita, copia e incolla — risultati reali condivisi ogni settimana nel canale.</p>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={500} className="w-full mb-8">
          <PulseCTA href={CTA_LINK} location="middle">
            Accedi al Canale Gratuito
          </PulseCTA>
          <p className="text-center text-[#8a9bb8]/50 text-xs mt-2">Gratis — Unisciti in 10 secondi</p>
        </FadeIn>

        {/* Testimonial strip - infinite marquee */}
        <FadeIn delay={600} className="w-full mb-8">
          <p className="text-[#8a9bb8]/50 text-xs uppercase tracking-widest text-center mb-3">Risultati reali dei membri</p>
          <InfiniteMarquee>
            {testimonials.map((src, i) => (
              <img key={i} src={src} alt={`Risultato ${i + 1}`} className="w-48 h-64 object-cover rounded-xl border border-white/10 shrink-0" />
            ))}
          </InfiniteMarquee>
        </FadeIn>

        {/* Final CTA */}
        <FadeIn delay={700} className="w-full">
          <div className="bg-white/[0.04] border border-[#3390ec]/20 rounded-2xl p-6 text-center">
            <p className="text-lg font-semibold text-white mb-2">Non restare fuori</p>
            <p className="text-[#8a9bb8] text-sm mb-4">Ogni giorno perso è un'opportunità mancata. L'accesso è gratuito.</p>
            <PulseCTA href={CTA_LINK} location="final">
              Unisciti Ora — È Gratis
            </PulseCTA>
          </div>
        </FadeIn>

        {/* Footer */}
        <footer className="mt-12 text-[#8a9bb8]/30 text-[10px] text-center leading-relaxed max-w-sm">
          <p className="mb-2">© 2026 BrokerAutomation LLC — Tutti i diritti riservati.</p>
          <p>Questo sito non è affiliato con Facebook, Google o Telegram. Il trading comporta rischi significativi. I risultati mostrati non sono garantiti.</p>
        </footer>
      </div>
    </div>
  )
}
