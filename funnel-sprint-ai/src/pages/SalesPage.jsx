import { useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle, XCircle, ChevronDown, ArrowRight,
  Star, X, Check, BadgeCheck, RefreshCw
} from 'lucide-react'

const CTA_URL = '/checkout'

/* ===== STICKY CTA BAR (mobile only) ===== */
function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const hero = document.getElementById('hero-section')
      const pricing = document.getElementById('pricing-section')
      if (!hero || !pricing) { setVisible(scrollY > 500); return }
      const heroBottom = hero.getBoundingClientRect().bottom
      const pricingTop = pricing.getBoundingClientRect().top
      const pricingBottom = pricing.getBoundingClientRect().bottom
      const inHero = heroBottom > 0 && scrollY < 500
      const inPricing = pricingTop < window.innerHeight && pricingBottom > 0
      setVisible(scrollY > 500 && !inHero && !inPricing)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={CTA_URL}
      className={`sticky-cta-bar ${visible ? 'sticky-cta-visible' : ''}`}
    >
      ACCEDI AL CORSO A SOLI €17 <ArrowRight size={18} />
    </a>
  )
}

/* ===== SOCIAL PROOF TICKER ===== */
const SOCIAL_PROOF_DATA = [
  ['Marco', 'Torino'], ['Alessandra', 'Milano'], ['Davide', 'Roma'],
  ['Federica', 'Napoli'], ['Simone', 'Firenze'], ['Luca', 'Bologna'],
  ['Sara', 'Padova'], ['Andrea', 'Verona'], ['Chiara', 'Bari'],
  ['Giovanni', 'Palermo'],
]

function SocialProofTicker() {
  const [toast, setToast] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timeout
    function showNext() {
      const [name, city] = SOCIAL_PROOF_DATA[Math.floor(Math.random() * SOCIAL_PROOF_DATA.length)]
      const mins = Math.floor(Math.random() * 12) + 1
      setToast({ name, city, mins })
      setShow(true)
      setTimeout(() => setShow(false), 4000)
      timeout = setTimeout(showNext, (Math.random() * 10 + 15) * 1000)
    }
    timeout = setTimeout(showNext, 8000)
    return () => clearTimeout(timeout)
  }, [])

  if (!toast) return null
  return (
    <div className={`social-proof-ticker ${show ? 'spt-visible' : ''}`}>
      <div className="spt-icon"><Check size={16} /></div>
      <div className="spt-text">
        <strong>{toast.name} da {toast.city}</strong> ha acquistato Funnel Sprint AI <em>{toast.mins} {toast.mins === 1 ? 'minuto' : 'minuti'} fa</em>
      </div>
    </div>
  )
}

/* ===== EXIT INTENT POPUP ===== */
function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(300)

  useEffect(() => {
    if (localStorage.getItem('fsa_exit_shown')) return
    function onLeave(e) {
      if (e.clientY > 0) return
      trigger()
    }
    document.addEventListener('mouseleave', onLeave)
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) trigger()
    }, 45000)

    let triggered = false
    function trigger() {
      if (triggered) return
      triggered = true
      localStorage.setItem('fsa_exit_shown', '1')
      setOpen(true)
      document.removeEventListener('mouseleave', onLeave)
    }
    return () => {
      document.removeEventListener('mouseleave', onLeave)
      clearTimeout(mobileTimer)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(id)
  }, [open])

  if (!open) return null
  const mm = String(Math.floor(countdown / 60)).padStart(2, '0')
  const ss = String(countdown % 60).padStart(2, '0')

  return (
    <div className="exit-overlay" onClick={() => setOpen(false)}>
      <div className="exit-box" onClick={e => e.stopPropagation()}>
        <button className="exit-close" onClick={() => setOpen(false)}><X size={20} /></button>
        <h3 className="text-red-600 text-2xl md:text-3xl font-extrabold mb-3 text-center">Aspetta! Stai per perdere questa offerta...</h3>
        <p className="text-gray-700 text-center mb-4">Funnel Sprint AI a soli <strong>€17</strong> — il prezzo sale a €97 tra poco</p>
        <p className="text-center font-mono text-3xl font-bold text-red-600 mb-6">{mm}:{ss}</p>
        <div className="text-center">
          <a href={CTA_URL} className="uiverse-cta">
            <div className="svg-wrapper-1"><div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div></div>
            <span>ACCEDI AL CORSO A SOLI €17</span>
          </a>
        </div>
        <button className="mt-4 block mx-auto text-gray-400 text-sm hover:text-gray-600 transition-colors" onClick={() => setOpen(false)}>No grazie, non mi interessa</button>
      </div>
    </div>
  )
}

/* ===== COUNTDOWN BAR ===== */
function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const STORAGE_KEY = 'fsa_countdown_end'
    let end = localStorage.getItem(STORAGE_KEY)
    if (!end) {
      end = Date.now() + 7 * 24 * 60 * 60 * 1000
      localStorage.setItem(STORAGE_KEY, end)
    }
    end = Number(end)

    function tick() {
      const diff = Math.max(0, end - Date.now())
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="bg-red-700 text-white text-center py-2 px-3 sticky top-0 z-50">
      <div className="text-xs md:text-sm font-semibold">{'\uD83D\uDD25'} OFFERTA SPECIALE — Scade tra: <span className="font-mono font-bold text-yellow-300">{timeLeft.d}g {pad(timeLeft.h)}h {pad(timeLeft.m)}m {pad(timeLeft.s)}s</span></div>
    </div>
  )
}

/* ===== CTA BUTTON ===== */
function CtaButton({ text = 'SÌ, VOGLIO ACCEDERE AL CORSO A SOLI €17', className = '', showEmail = false }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  function handleClick(e) {
    if (!showEmail) return // no email capture, normal link behavior
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError(true)
      return
    }
    setError(false)
    localStorage.setItem('fsa_email', email)
    window.location.href = CTA_URL + '?email=' + encodeURIComponent(email)
  }

  return (
    <div className={`text-center py-4 ${className}`}>
      <a href={CTA_URL} onClick={handleClick} className="uiverse-cta">
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
            </svg>
          </div>
        </div>
        <span>{text}</span>
      </a>
      {showEmail && (
        <div className="max-w-sm mx-auto mt-3">
          <input
            type="email"
            placeholder="Inserisci la tua email migliore..."
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(false) }}
            className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${error ? 'border-red-400 ring-2 ring-red-300' : 'border-gray-300'}`}
          />
          {error && <p className="text-red-500 text-xs mt-1">Inserisci la tua email per procedere</p>}
          <p className="text-[11px] text-gray-400 mt-1.5">🔒 Zero spam, promesso.</p>
        </div>
      )}
    </div>
  )
}

/* ===== PRICING BOX ===== */
function PricingBox() {
  return (
    <div className="bg-white border-2 border-green-500 rounded-2xl p-6 md:p-8 max-w-lg mx-auto shadow-xl">
      <p className="text-center text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Offerta Speciale</p>
      <h3 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Funnel Sprint AI</h3>
      <img src="/mockup-main.png" alt="Funnel Sprint AI" className="w-full max-w-md mx-auto mb-6 drop-shadow-2xl" loading="lazy" />

      <ul className="space-y-2 mb-4 text-sm">
        {[
          ['\uD83D\uDCDA', 'Corso Funnel Sprint AI — Il sistema completo passo dopo passo', '€197'],
          ['\uD83C\uDF81', 'BONUS: Bot Analisi Mercato', '€97'],
          ['\uD83C\uDF81', 'BONUS: Bot Ads Creator', '€147'],
          ['\uD83C\uDF81', 'BONUS: Bot Email Sequences', '€97'],
          ['\uD83C\uDF81', 'BONUS: Bot VSL Writer', '€147'],
          ['\uD83C\uDF81', 'BONUS: Bot Landing Page Copy', '€97'],
          ['\uD83C\uDF81', 'BONUS: Bot Creativo Gemini per Statiche', '€97'],
        ].map(([emoji, item, value], i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
            <span className="flex-1">{emoji} {item}</span>
            <span className="text-gray-400 shrink-0">{value}</span>
          </li>
        ))}
      </ul>
      <p className="text-center text-xs text-gray-500 mb-4">Valore totale: <strong>€879</strong></p>

      <div className="text-center mb-4">
        <span className="text-gray-400 line-through text-2xl mr-3">€97</span>
        <span className="text-5xl font-black text-green-600">€17</span>
      </div>
      <p className="text-center text-sm text-gray-600 mb-6">Pagamento unico. Accesso immediato. Zero abbonamenti.</p>

      <a href={CTA_URL} className="uiverse-cta w-full">
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
            </svg>
          </div>
        </div>
        <span>SÌ, VOGLIO TUTTO A SOLI €17</span>
      </a>
      <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
        <ShieldCheck size={14} /> Pagamento sicuro con Stripe · Garanzia 30 giorni · Nessun abbonamento
      </p>
    </div>
  )
}

/* ===== TRUSTPILOT CARD ===== */
function TrustpilotCard({ name, role, date, text }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="fill-[#00b67a] text-[#00b67a]" />
        ))}
      </div>
      <p className="text-gray-800 mb-4 text-[15px] leading-relaxed">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{name}</p>
            <p className="text-xs text-gray-400">{role} · {date}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#00b67a] flex items-center gap-1">
          <BadgeCheck size={14} /> Verificato
        </span>
      </div>
    </div>
  )
}

/* ===== FAQ ITEM ===== */
function FaqItem({ q, a }) {
  return (
    <details className="group border-b border-gray-200 py-4">
      <summary className="flex items-start justify-between cursor-pointer list-none font-bold text-gray-900 text-lg">
        <span>{q}</span>
        <ChevronDown size={20} className="shrink-0 mt-1 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 text-gray-700 leading-relaxed whitespace-pre-line">{a}</div>
    </details>
  )
}

/* ===== VIDEO TESTIMONIALS ===== */
const VIDEO_TESTIMONIALS = [
  { img: '/testimonial-christian.png', name: 'Christian Fantuzzi', video: 'https://assets.cdn.filesafe.space/6600KjjI4Q4k8ICFPzFC/media/67b200ec70fcfe564b249979.mp4' },
  { img: '/testimonial-don-forex.png', name: 'Don Forex (Luigi Boadi)', video: 'https://assets.cdn.filesafe.space/6600KjjI4Q4k8ICFPzFC/media/67b2007811feb9f58bd24eb3.mp4' },
  { img: '/testimonial-nick.png', name: 'Nick Parodi', video: 'https://assets.cdn.filesafe.space/6600KjjI4Q4k8ICFPzFC/media/67b1dcba70fcfe01bc248144.mp4' },
]

function VideoCard({ img, name, video }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div>
      <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer" onClick={() => setPlaying(true)}>
        {!playing ? (
          <>
            <img src={img} alt={`Testimonial ${name}`} className="w-full aspect-video object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 ml-1"><path d="M8 5v14l11-7L8 5z" fill="#DC2626"/></svg>
              </div>
            </div>
          </>
        ) : (
          <video
            src={video}
            controls
            autoPlay
            playsInline
            className="w-full aspect-video bg-black"
          />
        )}
      </div>
      <p className="text-center text-sm font-semibold text-gray-700 mt-2">{name}</p>
    </div>
  )
}

function VideoTestimonials() {
  return (
    <section className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">
          Ascolta chi l'ha già provato:
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {VIDEO_TESTIMONIALS.map((t, i) => <VideoCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  )
}

/* ===== FLOWCHART SECTION ===== */
function FlowchartSection() {
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: '#1a1a2e' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-white">
          Hai due strade davanti a te.
        </h2>
        <img src="/flowchart.png" alt="Il Vecchio Metodo vs Funnel Sprint AI" className="w-full rounded-xl" loading="lazy" />
        <div className="text-center mt-8 text-gray-300 text-lg">
          <p><strong className="text-white">Stessa destinazione. Due percorsi completamente diversi.</strong></p>
          <p className="mt-2">Il primo ti costa migliaia di euro e mesi di tempo.</p>
          <p>Il secondo ti costa <strong className="text-green-400">€17</strong> e un weekend.</p>
        </div>
      </div>
    </section>
  )
}

/* ===== SHOCKING TRUTH TABLE ===== */
function ShockingTruthTable() {
  return (
    <section className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-red-600">
          I numeri non mentono.
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Col 1 - Fai da solo */}
          <div className="border-2 border-red-300 rounded-xl overflow-hidden">
            <div className="bg-red-600 text-white text-center py-3 px-4 font-extrabold text-lg">Fai Da Solo</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Costo iniziale</p><p className="text-lg font-bold text-gray-900">€0 (ma butti €500+ in ads sbagliate)</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Tempo per avere tutto</p><p className="text-lg font-bold text-gray-900">3-6 mesi</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Competenze richieste</p><p className="text-lg font-bold text-gray-900">Copywriting, ads, email, design</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Qualità output</p><p className="text-lg font-bold text-red-600 flex items-center gap-1"><XCircle size={18} /> Amatoriale</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Soldi buttati</p><p className="text-lg font-bold"><span className="bg-yellow-200 px-1 rounded">€2.000-€8.000/anno</span></p></div>
            </div>
          </div>
          {/* Col 2 - Corsi generici */}
          <div className="border-2 border-yellow-300 rounded-xl overflow-hidden">
            <div className="bg-yellow-500 text-white text-center py-3 px-4 font-extrabold text-lg">Corsi Generici</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Costo iniziale</p><p className="text-lg font-bold text-gray-900">€497-€2.997</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Tempo per avere tutto</p><p className="text-lg font-bold text-gray-900">2-4 mesi (se implementi)</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Competenze richieste</p><p className="text-lg font-bold text-gray-900">Devi imparare tutto</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Qualità output</p><p className="text-lg font-bold text-yellow-600 flex items-center gap-1"><XCircle size={18} /> Dipende da te</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Soldi buttati</p><p className="text-lg font-bold"><span className="bg-yellow-200 px-1 rounded">€1.500-€5.000</span></p></div>
            </div>
          </div>
          {/* Col 3 - FSA */}
          <div className="border-2 border-green-400 rounded-xl overflow-hidden shadow-lg ring-2 ring-green-200">
            <div className="bg-green-600 text-white text-center py-3 px-4 font-extrabold text-lg">Funnel Sprint AI</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Costo iniziale</p><p className="text-lg font-bold text-green-600">€17</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Tempo per avere tutto</p><p className="text-lg font-bold text-green-600">1 weekend</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Competenze richieste</p><p className="text-lg font-bold text-green-600">Zero — l'AI fa il lavoro</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Qualità output</p><p className="text-lg font-bold text-green-600 flex items-center gap-1"><CheckCircle size={18} /> Livello professionale</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Costo totale</p><p className="text-lg font-bold"><span className="bg-yellow-200 px-1 rounded">€17. Una volta. Per sempre.</span></p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== SOCIAL PROOF CARDS ===== */
function SocialProofCards() {
  const proofs = [
    { stat: '€2.847', label: 'Fatturato nel primo mese', desc: 'Con soli €340 di budget ads. ROAS 8.4x. Funnel creato in un weekend usando il sistema Funnel Sprint AI.' },
    { stat: '7.3%', label: 'Conversion rate landing page', desc: 'Dal 1.2% al 7.3% — solo riscrivendo il copy con il Bot Landing Page. Stessa offerta, stesso traffico.' },
    { stat: '4 ore', label: 'Per un funnel completo', desc: 'Ricerca mercato + 6 ads + landing + 5 email + VSL. Quello che prima richiedeva 3 settimane.' },
  ]
  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">
          I numeri parlano chiaro:
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {proofs.map(({ stat, label, desc }, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 text-center">
              <p className="text-4xl font-black text-red-600 mb-2">{stat}</p>
              <p className="font-bold text-gray-900 mb-2">{label}</p>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== HAMSTER WHEEL ===== */
function HamsterWheelVisual() {
  const phases = [
    'Compri un corso',
    'Studi la teoria',
    'Ti blocchi',
    'Provi a scrivere',
    'Fa schifo',
    'Butti soldi in ads',
    'Zero risultati',
    '"Compro un altro corso"',
  ]
  return (
    <div className="my-10 mx-auto max-w-md">
      <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-red-300 border-dashed" style={{ background: 'rgba(254,202,202,0.15)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw size={32} className="text-red-400 mx-auto mb-1 animate-spin" style={{ animationDuration: '8s' }} />
            <p className="text-red-600 text-xs font-bold">CICLO<br />INFINITO</p>
          </div>
        </div>
        {phases.map((phase, i) => {
          const angle = (i / phases.length) * 2 * Math.PI - Math.PI / 2
          const r = 48
          const x = 50 + r * Math.cos(angle)
          const y = 50 + r * Math.sin(angle)
          return (
            <div
              key={i}
              className="absolute text-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                width: '90px',
              }}
            >
              <span className="text-xs font-bold text-red-700 leading-tight block bg-white/80 rounded px-1 py-0.5 shadow-sm">
                {phase}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ===== MAIN PAGE ===== */
export default function SalesPage() {
  return (
    <div className="min-h-[100dvh]">
      <CountdownBar />

      {/* ===== 2. HERO ===== */}
      <section id="hero-section" className="bg-white py-4 md:py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-xs md:text-sm mb-2 max-w-lg mx-auto">
            Per marketer, freelancer, coach e imprenditori digitali stanchi di buttare soldi in ads, corsi e agenzie che non funzionano.
          </p>
          <h1 className="red-headline text-[26px] md:text-[42px] lg:text-5xl mb-3 leading-[1.15] px-1">
            Ti Mostro Come Genero <span className="highlight">TUTTO</span> il Marketing Con l'AI<br className="hidden md:block" /> In Un Weekend
          </h1>
          <p className="text-[15px] md:text-lg text-gray-600 max-w-xl mx-auto mb-5 leading-snug">
            Ads, landing, email, VSL — ti apro il computer e ti faccio vedere <strong>esattamente</strong> come faccio. Passo dopo passo. A <strong>€17</strong>.
          </p>
          <img
            src="/mockup-main.png"
            alt="Funnel Sprint AI - Corso + 6 Bot Segreti"
            className="w-full max-w-lg mx-auto mb-5 drop-shadow-2xl"
            loading="eager"
          />
          <CtaButton showEmail />
          <p className="text-xs text-gray-400 mt-2">{'\uD83D\uDD12'} Pagamento sicuro · Accesso immediato · Garanzia 30 giorni soddisfatto o rimborsato</p>
        </div>
      </section>

      {/* ===== 3. COS'È FUNNEL SPRINT AI ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">
            Cos'è Funnel Sprint AI (e perché è diverso da tutto quello che hai visto)
          </h2>
          <div className="text-lg leading-relaxed space-y-5">
            <p>Funnel Sprint AI è un <strong>corso pratico</strong> dove io, Giuseppe, ti apro lo schermo e ti faccio vedere esattamente come genero <strong>tutto il marketing</strong> di un business usando solo l'intelligenza artificiale.</p>
            <p>Non è teoria.<br />Non è un PDF da 200 pagine.<br />Non è un corso da guardare e dimenticare.</p>
            <p>È un <strong>sistema operativo</strong> che ti mostro dal vivo — e che puoi replicare sul TUO business in un weekend.</p>
          </div>
          <hr className="border-gray-300 my-8" />
          <ul className="space-y-3 mb-8 text-lg">
            {[
              'Senza dover diventare copywriter.',
              'Senza dover studiare marketing per 6 mesi.',
              'Senza dover pagare €4.500/mese per un team di professionisti.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
                <span><strong>{item.split(' ')[0]}</strong> {item.split(' ').slice(1).join(' ')}</span>
              </li>
            ))}
          </ul>
          <div className="text-lg leading-relaxed space-y-4">
            <p><strong>Il risultato?</strong></p>
            <p>In un weekend hai: ricerca di mercato, copy ads, landing page, sequenza email e script VSL. Tutto generato dall'AI, tutto personalizzato sul TUO business, tutto pronto da lanciare.</p>
            <p>E la parte folle? <strong>Più lo usi, più migliora.</strong> Perché il sistema impara dai TUOI risultati.</p>
          </div>
          <CtaButton text="VOGLIO IL SISTEMA COMPLETO A €17" />
        </div>
      </section>

      {/* ===== 4. FLOWCHART ===== */}
      <FlowchartSection />

      {/* ===== 5. SHOCKING TRUTH TABLE ===== */}
      <ShockingTruthTable />

      {/* ===== 6. SHORTCUT STORY ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">
            Perché ho creato questo corso (e perché lo vendo a €17)
          </h2>
          <div className="text-lg leading-relaxed space-y-5">
            <p>Devo essere onesto con te.</p>
            <p>18 mesi fa, io ero nella tua stessa situazione.</p>
            <p>Avevo un business. Sapevo che il marketing era la chiave. Ma ogni volta che dovevo scrivere un'ad, creare una landing page, buttare giù un'email di vendita...</p>
            <p><strong>Mi bloccavo.</strong></p>
            <p>Ho speso <strong>€4.347 in corsi di copywriting e marketing</strong> in un anno. Corsi buoni, eh. Teoria impeccabile.</p>
            <p>Ma la pagina restava vuota.</p>
            <p>Poi un giorno ho fatto qualcosa di diverso.</p>
            <p>Ho smesso di cercare di DIVENTARE un copywriter. E ho iniziato a far fare il lavoro all'AI.</p>
            <p>Ma non nel modo in cui lo fanno tutti — "Ehi ChatGPT, scrivimi un'ad." Quello fa schifo.</p>
            <p>Ho creato un <strong>sistema</strong>. Ho costruito prompt specializzati. Li ho alimentati con le informazioni del mio business. E ho scoperto una cosa che ha cambiato tutto:</p>
            <p><strong>Se salvi quello che funziona e lo dai in pasto all'AI come riferimento... il sistema migliora ogni volta.</strong></p>
            <p>Ho chiamato questo il <strong>Self-Improving System</strong>.</p>
            <p>In un weekend avevo tutto il mio marketing pronto. Roba che un'agenzia mi avrebbe fatto pagare €3.000-5.000.</p>
            <p>I miei clienti hanno iniziato a chiedermi: <em>"Come fai? Mi insegni?"</em></p>
            <p>E così è nato questo corso.</p>
            <p>Lo vendo a €17 perché <strong>il mio vero business non è il corso.</strong> Il mio vero business è costruire relazioni con imprenditori come te — e offrire servizi premium a chi vuole andare ancora più in profondità.</p>
            <p>I €17 mi servono a pagarmi le ads. A te servono per cambiare completamente il modo in cui fai marketing.</p>
            <p className="text-xl font-bold">Mi sembra un deal equo.</p>
          </div>
          <CtaButton text="ACCEDO AL CORSO A €17" showEmail />
        </div>
      </section>

      {/* ===== 7. BONUS SECTION ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-4">
            {'\uD83C\uDF81'} MA ASPETTA — C'è di più.
          </h2>
          <p className="text-center text-lg mb-4">Se prendi il corso oggi, <strong>non ricevi solo le lezioni.</strong></p>
          <p className="text-center text-lg mb-4">Ricevi anche i <strong>6 Prompt Bot Segreti</strong> che ho creato per il mio business — gli stessi identici prompt che uso ogni giorno per generare tutto il mio marketing.</p>
          <p className="text-center text-lg mb-8">Questi prompt non li trovi da nessuna parte. Non li ho mai condivisi prima.</p>
          <p className="text-center text-xl font-bold text-green-600 mb-10"><span className="bg-yellow-200 px-2 py-1 rounded">100% GRATIS con l'acquisto!</span></p>

          {/* Bonus 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-analisi-mercato.png" alt="Bot Analisi Mercato" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #1</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot Analisi Mercato</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo analista di mercato personale che lavora 24/7</p>
                <p className="text-base mb-4">Dagli la tua nicchia e in 5 minuti hai una ricerca di mercato che un consulente ti farebbe pagare €500.</p>
                <ul className="space-y-2 text-base">
                  {[
                    'Avatar dettagliato del tuo cliente ideale — età, paure, desideri, obiezioni, linguaggio esatto',
                    'Mappa completa dei competitor — chi sono, come si posizionano, dove sono deboli',
                    'Angoli di vendita pronti da usare — le leve emotive che FUNZIONANO nella tua nicchia',
                    'Le parole esatte che usa il tuo target — così il tuo copy sembra scritto da qualcuno che li conosce davvero',
                    'Trend e opportunità nascoste — quello che i tuoi competitor non hanno ancora visto',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€97</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-ads-creator.png" alt="Bot Ads Creator" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #2</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot Ads Creator</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo media buyer AI che genera copy ads in 3 minuti</p>
                <p className="text-base mb-4">Basta ads scritte "a sentimento". Questo bot genera copy ads professionali per Facebook e Instagram — con hook, body, headline e CTA — personalizzati sul tuo business.</p>
                <ul className="space-y-2 text-base">
                  {[
                    '5-10 varianti di ads pronte da lanciare — così puoi testare subito e trovare la vincente',
                    'Hook che fermano lo scroll — basati su pattern psicologici comprovati',
                    'Copy ottimizzato per conversione — non per like o commenti, ma per VENDITE',
                    'Formati multipli — testo lungo, testo breve, carosello, stories',
                    'Si adatta al tuo tono di voce — perché è alimentato con il tuo Business DNA',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€147</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 3 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-email-sequences.png" alt="Bot Email Sequences" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #3</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot Email Sequences</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo email marketer che scrive sequenze complete in 10 minuti</p>
                <p className="text-base mb-4">La verità? La maggior parte degli imprenditori non scrive email perché non sa cosa dire. Questo bot risolve il problema per sempre.</p>
                <ul className="space-y-2 text-base">
                  {[
                    'Sequenza welcome — i primi 3-5 messaggi che trasformano un iscritto in un fan',
                    'Sequenza nurture — contenuto che educa, costruisce fiducia e prepara alla vendita',
                    'Sequenza vendita — email che vendono senza sembrare spam',
                    'Subject line che fanno aprire — perché l\'email più bella del mondo è inutile se nessuno la apre',
                    'Timing e struttura ottimizzati — quando inviare, quanto scrivere, come chiudere',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€97</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 4 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-vsl-writer.png" alt="Bot VSL Writer" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #4</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot VSL Writer</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo sceneggiatore AI che scrive script video che vendono</p>
                <p className="text-base mb-4">Sai che dovresti fare una VSL. Ma ogni volta che apri un documento per scriverla... blocco totale. Questo bot lo elimina.</p>
                <ul className="space-y-2 text-base">
                  {[
                    'Script VSL completo con struttura professionale — i famosi 8 blocchi che usano i top marketer',
                    'Hook che cattura l\'attenzione nei primi 5 secondi — perché se perdi l\'apertura, hai perso tutto',
                    'Storytelling che crea connessione emotiva — non nozioni, ma storie che vendono',
                    'Transizioni e CTA integrati — il viewer viene guidato naturalmente verso l\'azione',
                    'Adattabile per video lungo o corto — VSL classica, reel, YouTube, webinar',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€147</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 5 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-landing-copy.png" alt="Bot Landing Page Copy" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #5</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot Landing Page Copy</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo copywriter AI che genera sales page complete in 30 minuti</p>
                <p className="text-base mb-4">Una landing page che converte al 5% invece che all'1%? Significa 5 volte più vendite con lo stesso traffico. Questo bot scrive copy che converte.</p>
                <ul className="space-y-2 text-base">
                  {[
                    'Copy completo dall\'hero alla chiusura — headline, sub-headline, bullet, stack offerta, garanzia, FAQ',
                    'Struttura basata su framework professionali — RMBC, PASTOR, Value Equation',
                    'Angoli emotivi che toccano i pain point REALI del tuo target — non frasi generiche',
                    'Copy di garanzia e FAQ che eliminano le obiezioni — così il lettore non ha più scuse per non comprare',
                    'Ottimizzato per mobile — perché il 70%+ del traffico arriva da smartphone',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€97</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 6 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/mockup-creativo-gemini.png" alt="Bot Creativo Gemini" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">{'\uD83C\uDF81'} BONUS SEGRETO #6</p>
                <h3 className="text-2xl font-extrabold mb-2">Bot Creativo Gemini per Statiche</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il tuo designer AI che crea visual ads professionali in 2 minuti</p>
                <p className="text-base mb-4">Hai il copy. Ora ti serve la grafica. Questo bot usa Gemini per creare statiche ads che sembrano fatte da un designer da €1.000/mese.</p>
                <ul className="space-y-2 text-base">
                  {[
                    'Statiche ads professionali — niente più Canva brutto, niente più immagini stock',
                    '10-20 reference di design reali incluse — così Gemini sa esattamente cosa produrre',
                    'Layout ottimizzati per ogni formato — feed, stories, reel cover, carousel',
                    'Headline e CTA integrati nel visual — non solo il testo, ma la composizione completa',
                    'Template colori e font per brand consistency — così tutto il tuo marketing sembra coerente',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>€97</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          <div className="text-center text-lg font-bold">
            <p>Totale valore bonus: <strong>€682</strong></p>
            <p className="text-green-600 text-xl mt-2">Questi €682 di bonus sono GRATIS quando prendi il corso oggi.</p>
          </div>
        </div>
      </section>

      {/* ===== 8. CHI È GIUSEPPE ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">Chi c'è dietro questo corso?</h2>
          <p className="text-lg text-center mb-8 text-gray-700">Mi chiamo <strong>Giuseppe</strong>. E no — non sono un guru del marketing con il Lamborghini a noleggio. Sono un imprenditore digitale che ha trovato un modo migliore di fare le cose.</p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img src="/giuseppe-photo.png" alt="Giuseppe Cirino" className="w-full md:w-72 rounded-xl shadow-lg shrink-0" loading="lazy" />
            <ul className="space-y-4 text-base">
              {[
                'Ho lavorato con decine di imprenditori e freelancer italiani — dal coach che fattura €2.000/mese all\'azienda che ne fa €200.000',
                'Ho costruito funnel completi per business in nicchie che vanno dal fitness alla consulenza HR, dall\'e-commerce al SaaS',
                'Ho speso €4.347 in corsi di marketing prima di capire che il problema non era la conoscenza — era l\'esecuzione',
                'Ho creato un sistema AI che mi permette di generare tutto il marketing di un business in un weekend — e l\'ho testato su decine di progetti reali',
                'Ho sviluppato il metodo Self-Improving System — un feedback loop che fa migliorare i bot con i tuoi stessi risultati',
                'I miei clienti hanno generato tra €2.000 e €8.000/mese con funnel costruiti usando questo sistema',
                'Credo che il marketing nel 2026 non debba essere complicato, costoso o riservato a chi ha un team — e questo corso è la mia missione per dimostrarlo',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight size={18} className="text-red-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== 9. VIDEO TESTIMONIANZE ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-4">Risultati reali, persone reali</h2>
          <p className="text-center text-gray-600 text-lg mb-10">Guarda con i tuoi occhi cosa dicono i nostri studenti</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-sm font-bold">Video Testimonianza {i}<br />(Placeholder)</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9B. VIDEO TESTIMONIALS ===== */}
      <VideoTestimonials />

      {/* ===== 10. TRUSTPILOT CARDS ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#00b67a] font-extrabold text-lg">Trustpilot</span>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#00b67a] text-[#00b67a]" />)}</div>
          </div>
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">Cosa dice chi ha già provato il sistema:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TrustpilotCard
              name="Marco T."
              role="Infobusiness, Torino"
              date="Febbraio 2026"
              text="Ero bloccato da mesi. Avevo il corso, avevo la teoria, ma non riuscivo a scrivere UNA riga di copy decente. Con il sistema di Giuseppe ho creato 8 varianti di ads in un pomeriggio. Le prime 3 che ho lanciato mi hanno portato 12 vendite in 72 ore. ROAS 3.2x. Con copy generato dall'AI. Assurdo."
            />
            <TrustpilotCard
              name="Alessandra R."
              role="Consulente HR, Milano"
              date="Gennaio 2026"
              text="Io faccio il consulente, non il marketer. Non sapevo da che parte si teneva un funnel. Ho seguito il corso di sabato, creato i bot nel weekend, e lunedì avevo tutto: landing, ads, email. In 30 giorni ho fatturato €2.847 con €340 di ads. Giuseppe, sei un genio."
            />
            <TrustpilotCard
              name="Davide M."
              role="E-commerce, Roma"
              date="Febbraio 2026"
              text="Ho usato ChatGPT per mesi per scrivere post. Risultati? Meh. Poi ho provato il sistema di Giuseppe. La differenza? Il Business DNA e soprattutto il feedback loop. Dopo 2 settimane i miei bot generavano copy che sembrava scritto da un copywriter da €3.000/mese. Vale 100 volte il prezzo."
            />
            <TrustpilotCard
              name="Luca P."
              role="SaaS B2B, Bologna"
              date="Marzo 2026"
              text="Pagavo €1.800/mese un'agenzia che mi mandava report bellissimi e risultati mediocri. Ho provato il sistema di Giuseppe per un mese in parallelo. I bot hanno generato ads con CTR più alto del 40% rispetto a quelle dell'agenzia. Ho cancellato il contratto. Per €17."
            />
            <TrustpilotCard
              name="Simone G."
              role="Coach Business, Firenze"
              date="Febbraio 2026"
              text="Non sto scherzando. Sabato mattina mi sono messo davanti al computer. Ho seguito il corso, compilato il Business DNA, attivato i bot. Alle 16:00 avevo: ricerca mercato, 6 ads, landing page, 5 email, script VSL. Tutto coerente, tutto allineato. In 4 ore. Prima ci mettevo 3 settimane minimo."
            />
            <TrustpilotCard
              name="Federica L."
              role="Corsi Online, Napoli"
              date="Gennaio 2026"
              text="Avevo una landing page fatta con Canva e preghiere. Conversion rate: 1.2%. Ho usato il Bot Landing Page Copy di Giuseppe e ho riscritto tutto in 30 minuti. Nuovo conversion rate dopo una settimana: 7.3%. Stessa offerta, stesso traffico. Solo copy diverso. €17 meglio spesi della mia vita."
            />
          </div>
        </div>
      </section>

      {/* ===== 11. SOCIAL PROOF CARDS ===== */}
      <SocialProofCards />

      {/* ===== 12. PRICING BOX ===== */}
      <section id="pricing-section" className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">
            Ecco tutto quello che ricevi oggi:
          </h2>
          <PricingBox />
        </div>
      </section>

      {/* ===== 13. GARANZIA ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img src="/assets/garanzia-gold.png" alt="Garanzia 30 giorni soddisfatti o rimborsati" className="w-60 md:w-80 mx-auto mb-6 drop-shadow-lg" loading="lazy" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">{'\uD83D\uDEE1\uFE0F'} La Mia Promessa Personale — Garanzia "Zero Rischi" 30 Giorni</h2>
          <div className="text-lg leading-relaxed space-y-4 text-left max-w-2xl mx-auto">
            <p>Ascolta, lo so cosa stai pensando.</p>
            <p><em>"€17 è niente, ma ho già buttato soldi in cose che non funzionano."</em></p>
            <p>Ti capisco. Ci sono passato anch'io. Per questo voglio toglierti qualsiasi dubbio.</p>
            <p>Ecco il mio deal con te:</p>
            <p>Prendi Funnel Sprint AI. Guarda il corso. Crea i tuoi bot. Compila il Business DNA. Genera il tuo materiale marketing.</p>
            <p>Usa il sistema per <strong>30 giorni interi</strong>.</p>
            <p>Se per QUALSIASI motivo non sei soddisfatto — anche se semplicemente hai cambiato idea, anche se hai deciso che non fa per te, anche se il tuo gatto ha camminato sulla tastiera e hai deciso che è un segno — ti rimborso <strong>ogni singolo centesimo</strong>.</p>
            <p>Nessuna domanda.<br />Nessuna procedura complicata.<br />Nessun modulo da compilare.<br />Nessuna telefonata imbarazzante.</p>
            <p>Mi scrivi un'email. Ricevi il rimborso entro 48 ore. Fine.</p>
            <p><strong>Il rischio è completamente sulle MIE spalle.</strong> Non sulle tue.</p>
            <p>E sai perché posso permettermi di fare questa promessa?</p>
            <p>Perché so che una volta che vedrai i bot in azione — una volta che genererai le tue prime ads, la tua prima landing, le tue prime email in minuti invece che in settimane...</p>
            <p><strong>Non vorrai più tornare indietro.</strong></p>
            <p>Ma se mi sbaglio? Ti riprendi i tuoi €17 e restiamo amici.</p>
            <p><strong><span className="bg-yellow-200 px-1 rounded">Mi sembra giusto, no?</span></strong></p>
          </div>
          <CtaButton text="PROVO SENZA RISCHI — SOLO €17" showEmail />
        </div>
      </section>

      {/* ===== 14. LONG-FORM SALES LETTER ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-4xl text-center mb-4">
            La storia che non volevo raccontare (ma che devi sentire)
          </h2>

          <div className="bg-[#F3F4F6] rounded-2xl p-6 md:p-10 text-lg leading-relaxed space-y-5">
            <p className="text-gray-600 italic">Caro amico,<br />Mi chiamo Giuseppe.<br />E quello che sto per dirti è la verità nuda e cruda su come facevo marketing fino a 18 mesi fa.</p>
            <p><strong>Spoiler: faceva schifo.</strong></p>
            <p>Non perché non fossi intelligente. Non perché non mi impegnassi. Ma perché stavo facendo tutto nel modo sbagliato.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">Come facevo marketing nel modo sbagliato</h3>
            <p>Ero convinto che per fare marketing dovessi DIVENTARE un marketer.</p>
            <p>Così ho comprato corsi. Tanti corsi.</p>
            <p>Il corso di copywriting da €497.<br />Il corso di Facebook Ads da €997.<br />Il corso di funnel da €697.<br />Il corso di email marketing da €397.</p>
            <p><strong>Totale: €4.347 in un anno.</strong> E sai cosa avevo alla fine?</p>
            <p>Un sacco di appunti. Un sacco di teoria. E un sacco di pagine vuote.</p>
            <p>Perché ogni volta che mi sedevo davanti al computer per SCRIVERE qualcosa — un'ad, un'email, una landing page — mi bloccavo.</p>
            <p>Sapevo la teoria. Ma non riuscivo a metterla in pratica.</p>
            <p>Il cursore lampeggiava. La pagina restava vuota. E io mi sentivo un idiota.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">Quanto tempo e soldi ho buttato via</h3>
            <p>Facciamo due conti, perché i numeri fanno male:</p>
            <ul className="space-y-2">
              <li><span className="bg-yellow-200 px-1 rounded">€4.347 in corsi</span> che non ho implementato</li>
              <li><span className="bg-yellow-200 px-1 rounded">€2.800 in ads</span> con copy scritto "a sentimento" — zero conversioni</li>
              <li><span className="bg-yellow-200 px-1 rounded">€1.200 a un freelancer</span> per una landing page che convertiva allo 0.8%</li>
              <li><span className="bg-yellow-200 px-1 rounded">~200 ore</span> di tempo perso a fissare lo schermo, guardare tutorial, riscrivere la stessa headline 47 volte</li>
            </ul>
            <p><strong>Totale: €8.347 + 200 ore.</strong> Per un marketing che non funzionava.</p>
            <p>E la cosa più dolorosa? Vedevo altri — persone meno competenti di me, con prodotti peggiori dei miei — che lanciavano, vendevano, crescevano.</p>
            <p>Mentre io ero lì. Fermo. Con il mio bel quaderno di appunti e zero risultati.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">Il momento di svolta</h3>
            <p>Poi, un martedì sera di novembre 2024, è successa una cosa strana.</p>
            <p>Stavo usando ChatGPT per scrivere un post per i social (come facevo sempre, con risultati mediocri). E per errore, invece di dargli un prompt generico, gli ho dato un brief dettagliato del mio business.</p>
            <p>Chi ero. Cosa vendevo. Chi era il mio cliente. Quali problemi risolvevo. Come parlava il mio target.</p>
            <p>Il risultato è stato... diverso.</p>
            <p>Non perfetto. Ma diverso. Più specifico. Più "mio".</p>
            <p>E lì mi è scattata una lampadina.</p>
            <p><em>"E se invece di chiedere all'AI di scrivere un'ad generica... la SPECIALIZZASSI per il mio business?"</em></p>
            <p>Quella notte non ho dormito.</p>
            <p>Ho passato le 6 ore successive a costruire quello che sarebbe diventato il primo prompt specializzato — il Bot Analisi Mercato.</p>
            <p>L'ho alimentato con tutte le informazioni del mio business. L'ho strutturato con i framework di copywriting che avevo studiato nei corsi. L'ho testato.</p>
            <p>Il risultato? Una ricerca di mercato più dettagliata e accurata di quella che un consulente mi aveva fatto pagare €500 sei mesi prima.</p>
            <p><strong>In 5 minuti.</strong></p>
            <p>Sono quasi caduto dalla sedia.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">Come ho creato il sistema dei bot</h3>
            <p>Nei 3 mesi successivi ho fatto una cosa sola: costruire bot.</p>
            <p>Un bot per le ads. Un bot per le email. Un bot per le VSL. Un bot per le landing page.</p>
            <p>Ogni bot era specializzato in UNA funzione. Ogni bot era alimentato con il Business DNA — quel documento dove metti TUTTO ciò che il sistema deve sapere sul tuo business.</p>
            <p>E ogni bot <strong>alimentava il successivo</strong>.</p>
            <p>La ricerca di mercato diventava la base per il copy delle ads. Il copy delle ads rifletteva la landing page. Le email riprendevano gli angoli della VSL.</p>
            <p><strong>Tutto coerente. Tutto allineato. Come scatole cinesi.</strong></p>
            <p>Ma la vera scoperta è arrivata dopo.</p>
            <p>Ho lanciato le ads. Alcune funzionavano, altre no. Ho preso quelle che funzionavano e le ho date in pasto al bot come <strong>file di riferimento</strong>.</p>
            <p>E da quel momento... il bot ha iniziato a generare output MIGLIORE.</p>
            <p>Perché ora sapeva cosa funzionava DAVVERO. Non in teoria. Nel MIO business, con il MIO target, nel MIO mercato.</p>
            <p>Lanci → Risultati → Salvi ciò che funziona → I bot migliorano → Output migliore → Risultati migliori.</p>
            <p><strong>Il Self-Improving System era nato.</strong></p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">"Giuseppe, il bot ha scritto una landing page migliore della mia agenzia"</h3>
            <p>Il primo a provare il sistema è stato Marco, un amico che faceva infobusiness a Torino.</p>
            <p>Marco era nella mia stessa situazione di un anno prima: tanta teoria, zero esecuzione. Gli ho dato i bot. Gli ho detto: "Compila il Business DNA e prova."</p>
            <p>3 giorni dopo mi ha mandato un vocale di 4 minuti dove era mezzo euforico e mezzo incredulo.</p>
            <p>Aveva lanciato 3 ads. Aveva fatto 12 vendite. ROAS 3.2x.</p>
            <p><em>"Ma come è possibile? Io non so scrivere copy!"</em></p>
            <p>Non serviva che sapesse scrivere copy. Il bot lo faceva per lui.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">"Ho risparmiato €21.600 in un anno. Per €17."</h3>
            <p>Poi c'è stato Luca.</p>
            <p>Luca ha un SaaS B2B e pagava €1.800/mese a un'agenzia. Report bellissimi. Risultati? Meh.</p>
            <p>Ha provato il sistema in parallelo per un mese. Le ads generate dai bot avevano un CTR più alto del 40% rispetto a quelle dell'agenzia.</p>
            <p>Ha cancellato il contratto.</p>
            <p><strong>€21.600 all'anno risparmiati.</strong> Per €17.</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">"Da 1.2% a 7.3% di conversione. Stessa offerta, solo copy diverso."</h3>
            <p>E poi Federica.</p>
            <p>Federica vende corsi online a Napoli. Aveva una landing page fatta con Canva e buona volontà. Conversion rate: 1.2%.</p>
            <p>Ha usato il Bot Landing Page Copy. Ha riscritto tutto in 30 minuti.</p>
            <p>Dopo una settimana: 7.3% di conversione. Stessa offerta. Stesso traffico. Solo copy diverso.</p>
            <p><em>"Giuseppe, questo bot scrive meglio del copywriter che avevo pagato €800."</em></p>
            <p>Sì, Federica. Lo so. È per questo che l'ho creato.</p>

            <h3 className="text-xl font-extrabold mt-8">Il modello controintuitivo</h3>
            <p>Ecco la cosa che la maggior parte delle persone non capisce:</p>
            <p><strong>Non devi diventare bravo nel marketing. Devi diventare bravo a far lavorare l'AI per te.</strong></p>
            <p>È un cambio di paradigma totale.</p>
            <p>Nel vecchio mondo, dovevi imparare copywriting, media buying, email marketing, design, analytics.</p>
            <p>Nel nuovo mondo, devi imparare UNA cosa: come dare all'AI le giuste istruzioni e i giusti dati.</p>
            <p>E questo è esattamente ciò che ti insegno nel corso.</p>
            <p>Non ti insegno a scrivere copy. Ti insegno a far scrivere copy all'AI come se fosse un copywriter da €3.000/mese che conosce il tuo business meglio di te.</p>
            <p>Non ti insegno a fare ads. Ti insegno a far creare ads all'AI che convertono più di quelle delle agenzie.</p>
            <p><strong>Non ti insegno il marketing. Ti insegno come far fare il marketing all'AI.</strong></p>
            <p>È la shortcut definitiva. Ed è disponibile per chiunque — anche se non hai mai scritto una riga di copy in vita tua.</p>
          </div>
        </div>
      </section>

      {/* ===== 15. RUOTA DEL CRICETO ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">{'\uD83D\uDC39'} Sei intrappolato nella Ruota del Criceto del Marketing?</h2>
          <HamsterWheelVisual />
          <div className="text-lg leading-relaxed space-y-5 mt-8">
            <p><strong>Suona familiare?</strong></p>
            <p>Non è colpa tua. È il SISTEMA che è rotto.</p>
            <p>Il sistema ti dice: <em>"Impara di più."</em></p>
            <p>Ma il problema non è la conoscenza. <strong>Il problema è l'esecuzione.</strong></p>
            <p>E nessun corso al mondo risolverà il problema dell'esecuzione... se il metodo resta lo stesso.</p>
            <p><strong>Funnel Sprint AI rompe la ruota del criceto.</strong></p>
            <p>Perché non ti chiede di IMPARARE a fare marketing.</p>
            <p>Ti chiede di guardare ME che lo faccio con l'AI. E poi di REPLICARE il sistema sul tuo business.</p>
            <p><strong>In un weekend. Non in 6 mesi.</strong></p>
          </div>
        </div>
      </section>

      {/* ===== 16. STORIA CONTINUATA ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-5">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">"Ho messo l'intero sistema in un corso..."</h2>
          <p>Dopo aver visto i risultati di Marco, Luca, Alessandra, Federica e decine di altri...</p>
          <p>...ho deciso di fare una cosa che i miei amici imprenditori mi hanno detto fosse stupida:</p>
          <p><strong>Ho messo l'intero sistema in un corso da €17.</strong></p>
          <p>"Sei pazzo," mi hanno detto. "Questo vale almeno €497. Perché lo regali?"</p>
          <p>Perché il mio obiettivo non è fare soldi con un corso.</p>
          <p>Il mio obiettivo è mettere questo sistema nelle mani del maggior numero possibile di imprenditori italiani.</p>
          <p>Perché quando usi il sistema e vedi i risultati... vuoi andare più in profondità. Vuoi che ti aiuti a ottimizzare. Vuoi che riveda il tuo funnel. Vuoi il done-for-you.</p>
          <p>E a quel punto, ci sono. Con servizi premium per chi vuole il livello successivo.</p>
          <p>Ma il punto di partenza? <strong>€17.</strong> Perché chiunque deve poter accedere a questo sistema.</p>
          <p>Anche il freelancer che sta iniziando.<br />Anche il coach che fa €2.000 al mese.<br />Anche lo studente che vuole lanciare il suo primo business.</p>
          <p><strong>Nessuno dovrebbe rimanere bloccato davanti allo schermo vuoto nel 2026.</strong> L'AI ha reso tutto più facile — devi solo sapere come usarla.</p>
          <p>E questo è ciò che ti insegno.</p>
        </div>
      </section>

      {/* ===== 17. CHIUSURA ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">La scelta è tua.</h2>
          <div className="text-lg leading-relaxed space-y-5">
            <p>Puoi chiudere questa pagina.</p>
            <p>Tornare al tuo schermo vuoto. Al tuo corso da €997 che non hai mai finito. Alle tue ads che non convertono. Al tuo marketing fatto "a sentimento".</p>
            <p>E fra 6 mesi sarai esattamente dove sei adesso.</p>
            <p className="text-xl font-bold">Oppure.</p>
            <p>Puoi investire €17 — meno di una pizza e una birra — e avere in un weekend:</p>
            <ul className="space-y-3">
              {[
                'Un sistema completo per generare TUTTO il tuo marketing con l\'AI',
                '6 bot segreti che lavorano per te 24/7',
                'Un metodo che migliora ogni volta che lo usi',
                'La libertà di non dover più dipendere da agenzie, freelancer o corsi da migliaia di euro',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
            <p>Fra 30 giorni sarai in uno di questi due posti:</p>
            <p><strong>Posto A:</strong> Stessa frustrazione. Stesse pagine vuote. Stessi soldi buttati.</p>
            <p><strong>Posto B:</strong> Un funnel completo. Ads che girano. Email che vendono. Una landing che converte. E bot che diventano più bravi ogni giorno.</p>
            <p>La differenza?</p>
            <p className="text-2xl font-extrabold text-red-600">€17 e un weekend.</p>
            <p>E se non funziona? Hai la garanzia. Ti ridò i soldi. Zero rischi.</p>
            <p>Ma non ci sarà bisogno. Lo sai già.</p>
          </div>
          <CtaButton text="SCELGO IL POSTO B — ACCEDO AL CORSO A €17" />
          <p className="text-center text-sm text-gray-500 mt-2"><s>€97</s> → €17 · Accesso immediato · 6 bot segreti inclusi · Garanzia 30 giorni · Zero rischi</p>
        </div>
      </section>

      {/* ===== 18. FAQ ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Domande Frequenti</h2>
          <div>
            <FaqItem
              q={'"Non sono un esperto di AI. Riesco a seguire il corso?"'}
              a={'Sì, al 100%. Se sai usare WhatsApp e Google, sai usare questo sistema. Nel corso ti mostro tutto passo dopo passo con screen recording. Non lascio nulla al caso. Ogni clic, ogni passaggio, ogni prompt — lo vedi fare in diretta e lo replichi.'}
            />
            <FaqItem
              q={'"Funziona nel mio settore?"'}
              a={'Il sistema funziona per qualsiasi business che ha bisogno di marketing: infobusiness, e-commerce, servizi, consulenza, coaching, SaaS, freelancing, corsi online, agenzia. Il Business DNA è progettato per adattarsi a QUALSIASI nicchia — perché sei TU a personalizzarlo con le informazioni del tuo business specifico.'}
            />
            <FaqItem
              q={'"Ma ChatGPT non scrive già copy gratis?"'}
              a={'Certo. E il risultato è copy generico che suona come tutti gli altri. La differenza con i miei bot è che sono specializzati, alimentati con i TUOI dati e strutturati con framework di copywriting professionali. È la differenza tra chiedere a un passante indicazioni e avere un navigatore GPS che conosce ogni scorciatoia della tua città.'}
            />
            <FaqItem
              q={'"€17 è troppo bello per essere vero. Dov\'è la fregatura?"'}
              a={'Nessuna fregatura. Il prezzo basso è una scelta strategica: voglio che il maggior numero possibile di imprenditori acceda al sistema. Il mio business si regge sulla fiducia che costruisco con te oggi — e sui servizi premium che offro a chi vuole andare più in profondità. I €17 coprono le ads. Il vero valore per me è la relazione che inizia oggi.'}
            />
            <FaqItem
              q={'"Quanto tempo serve per avere tutto pronto?"'}
              a={'Il corso si guarda in 5-6 ore (puoi farlo in un weekend). Il Business DNA richiede 30-45 minuti. Ogni bot si configura in 10-15 minuti. Totale: un weekend per un sistema di marketing che usi per sempre.'}
            />
            <FaqItem
              q={'"Su quali piattaforme funzionano i bot?"'}
              a={'Su tre piattaforme: Poe.com, ChatGPT e Claude. Scegli quella che preferisci — o usale tutte e tre. I bot funzionano con i piani gratuiti. Per un uso intenso, un piano a pagamento (~€20/mese) ti dà accesso illimitato, ma non è obbligatorio per iniziare.'}
            />
            <FaqItem
              q={'"E se non funziona per me?"'}
              a={'Hai 30 giorni di garanzia completa. Se non sei soddisfatto per qualsiasi motivo — anche se hai semplicemente cambiato idea — ti rimborso ogni centesimo. Una email e basta. Il rischio è zero.'}
            />
            <FaqItem
              q={'"In cosa è diverso dai mille corsi di marketing che esistono?"'}
              a={'I corsi ti insegnano la teoria. Funnel Sprint AI ti fa VEDERE come faccio io — e poi ti dà gli strumenti per replicare tutto. Non impari a scrivere copy: hai un bot che lo scrive. Non studi le ads: hai un bot che le genera. E soprattutto: il sistema migliora con l\'uso grazie al Self-Improving System. Nessun corso in Italia offre questo.'}
            />
          </div>
          <CtaButton text="INIZIA ORA — ACCEDI AL CORSO A €17" className="mt-8" showEmail />
        </div>
      </section>

      {/* ===== 19. FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4 text-sm">
        <p className="mb-2">Funnel Sprint AI — Il primo corso in Italia che ti mostra come generare tutto il tuo marketing con l'AI.</p>
        <p className="mb-2">Con 6 Bot Segreti inclusi come bonus.</p>
        <p>&copy; 2026 — Tutti i diritti riservati.</p>
      </footer>

      {/* Overlays */}
      <StickyCta />
      <SocialProofTicker />
      <ExitIntentPopup />
    </div>
  )
}
