import { useEffect, useRef, useState } from 'react'
import { Radio, Users, Award, Target, ChevronRight, Shield, TrendingUp, Zap, Send } from 'lucide-react'
import { trackCTA } from './posthog.js'

const CTA_LINK = 'https://t.me/+xm4vsqS5IwdkYWRk'
const VARIANT = 'a'

const FOMO_NAMES = [
  'Marco', 'Luca', 'Alessandro', 'Sofia', 'Francesco', 'Andrea', 'Matteo',
  'Lorenzo', 'Giulia', 'Davide', 'Simone', 'Federico', 'Elena', 'Chiara',
  'Giovanni', 'Roberto', 'Valentina', 'Alessia', 'Riccardo', 'Sara'
]

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 600)
    return () => clearTimeout(timeout)
  }, [end, duration])

  return <span>{count.toLocaleString('it-IT')}{suffix}</span>
}

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
    const initial = setTimeout(show, 3000)
    const interval = setInterval(show, Math.random() * 3000 + 5000)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  if (!notification) return null

  return (
    <div className={`fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-[#1a1f2e]/95 backdrop-blur-md border border-[#c9a44e]/30 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(201,164,78,0.15)] flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-full bg-[#c9a44e]/20 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-[#c9a44e]" />
        </div>
        <p className="text-sm text-white/90">
          <strong className="text-[#c9a44e]">{notification.name}</strong> si è appena iscritto al canale
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
      className={`relative block w-full text-center font-bold text-base uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.03] overflow-hidden group animate-cta-pulse ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#1a7a6d] via-[#22a88f] to-[#1a7a6d] bg-[length:200%_100%] animate-shimmer" />
      <span className="absolute inset-0 animate-pulse-glow rounded-xl" />
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

      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a44e]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")'}} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 flex flex-col items-center text-center">
        {/* Live Badge */}
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-[#c9a44e]/20 border border-[#c9a44e]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[#c9a44e] text-sm font-bold tracking-wider uppercase">Live ogni giorno</span>
          </div>
        </FadeIn>

        {/* Avatar */}
        <FadeIn delay={100}>
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#c9a44e]/30 rounded-full blur-xl scale-110" />
            <img
              src="./nick-photo.jpeg"
              alt="Nick Parodi"
              className="relative w-28 h-28 rounded-full object-cover border-2 border-[#c9a44e]/60"
            />
          </div>
        </FadeIn>

        {/* Name */}
        <FadeIn delay={200}>
          <p className="text-[#c9a44e]/80 text-sm font-bold tracking-[0.3em] uppercase mb-4">Nick Parodi</p>
        </FadeIn>

        {/* Headline with highlights */}
        <FadeIn delay={300}>
          <h1 className="text-3xl md:text-4xl font-serif leading-tight text-[#f5f0e8] mb-4" style={{fontFamily: 'Georgia, "Times New Roman", serif'}}>
            Vuoi accedere al canale{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#c9a44e] via-[#f0d77b] to-[#c9a44e] bg-clip-text text-transparent font-bold">N1 in Italia</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c9a44e]/0 via-[#c9a44e] to-[#c9a44e]/0 animate-pulse" />
            </span>{' '}
            su{' '}
            <span className="bg-gradient-to-r from-[#22a88f] via-[#3ee8c8] to-[#22a88f] bg-clip-text text-transparent font-bold">Geopolitica, Economia e Finanza</span>?
          </h1>
        </FadeIn>

        {/* Sub-headline */}
        <FadeIn delay={400}>
          <p className="text-[#8a9bb8] text-base mb-8 leading-relaxed">
            Unisciti a oltre <strong className="text-white">32.000 persone</strong> che seguono Nick Parodi ogni giorno — <strong className="text-[#c9a44e]">100% gratuito</strong>
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={500}>
          <div className="grid grid-cols-3 gap-3 w-full mb-8">
            {[
              { value: 32000, suffix: '+', label: 'Iscritti', Icon: Users },
              { label: 'LIVE ogni giorno', Icon: Radio, isText: true },
              { label: '100% Gratuito', Icon: Shield, isText: true },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-xl font-bold text-[#c9a44e] flex items-center justify-center">
                  {stat.isText ? <stat.Icon className="w-6 h-6" /> : <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-xs text-[#8a9bb8] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={600}>
          <PulseCTA href={CTA_LINK} location="hero">
            Accedi al Canale Telegram Gratuito
          </PulseCTA>
          <p className="text-[#8a9bb8]/60 text-xs mb-10 mt-3">
            Non hai Telegram? <a href="https://telegram.org/dl" className="underline hover:text-white">Scaricalo qui</a> in 2 minuti
          </p>
        </FadeIn>

        {/* Testimonials - infinite marquee */}
        <FadeIn delay={700}>
          <p className="text-[#c9a44e]/60 text-xs uppercase tracking-widest mb-4">Risultati dei membri</p>
          <InfiniteMarquee>
            {testimonials.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Risultato ${i + 1}`}
                className="w-56 h-72 object-cover rounded-xl border border-white/10 shrink-0"
              />
            ))}
          </InfiniteMarquee>
        </FadeIn>

        {/* Second CTA */}
        <FadeIn delay={800} className="w-full mt-8">
          <PulseCTA href={CTA_LINK} location="final">
            Unisciti Ora — È Gratis
          </PulseCTA>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={900}>
          <footer className="mt-16 text-[#8a9bb8]/40 text-[10px] leading-relaxed max-w-sm">
            <p className="mb-2">© 2026 BrokerAutomation LLC — Tutti i diritti riservati.</p>
            <p>Questo sito non fa parte o è approvato da Facebook, Google, Twitter o qualsiasi piattaforma di social media. I risultati mostrati non sono tipici e dipendono dall'impegno individuale. Il trading comporta rischi significativi.</p>
          </footer>
        </FadeIn>
      </div>
    </div>
  )
}
