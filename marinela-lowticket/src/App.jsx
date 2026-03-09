import { useState, useEffect } from 'react'
import { 
  ShieldCheck, CheckCircle, XCircle, ChevronRight, Mail, 
  Clock, Star, ArrowRight, Target, Users, TrendingUp,
  BookOpen, Zap, Award, MessageCircle, HelpCircle,
  ChevronDown, AlertTriangle, Search, UserCheck, HandCoins,
  BadgeCheck, RotateCcw, RefreshCw, ShoppingCart, X, Check
} from 'lucide-react'
import CheckoutPage from './Checkout.jsx'

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
      ACCEDI A SOLI 27€ <ArrowRight size={18} />
    </a>
  )
}

/* ===== SOCIAL PROOF TICKER ===== */
const SOCIAL_PROOF_DATA = [
  ['Sara', 'Milano'], ['Giulia', 'Roma'], ['Francesca', 'Napoli'],
  ['Chiara', 'Torino'], ['Valentina', 'Bologna'], ['Alessia', 'Firenze'],
  ['Martina', 'Palermo'], ['Elena', 'Verona'], ['Federica', 'Bari'],
  ['Silvia', 'Padova'],
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
        <strong>{toast.name} da {toast.city}</strong> ha acquistato The Wealthy SMM <em>{toast.mins} {toast.mins === 1 ? 'minuto' : 'minuti'} fa</em>
      </div>
    </div>
  )
}

/* ===== EXIT INTENT POPUP ===== */
function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(300)

  useEffect(() => {
    if (localStorage.getItem('wsmm_exit_shown')) return
    // Desktop: mouseleave
    function onLeave(e) {
      if (e.clientY > 0) return
      trigger()
    }
    document.addEventListener('mouseleave', onLeave)
    // Mobile: 45s timer
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) trigger()
    }, 45000)

    let triggered = false
    function trigger() {
      if (triggered) return
      triggered = true
      localStorage.setItem('wsmm_exit_shown', '1')
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
        <p className="text-gray-700 text-center mb-4">The Wealthy SMM a soli <strong>27€</strong> — il prezzo sale a 47€ tra poco</p>
        <p className="text-center font-mono text-3xl font-bold text-red-600 mb-6">{mm}:{ss}</p>
        <div className="text-center">
          <a href={CTA_URL} className="uiverse-cta">
            <div className="svg-wrapper-1"><div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div></div>
            <span>ACCEDI ADESSO A SOLI 27€</span>
          </a>
        </div>
        <button className="mt-4 block mx-auto text-gray-400 text-sm hover:text-gray-600 transition-colors" onClick={() => setOpen(false)}>No grazie, non mi interessa</button>
      </div>
    </div>
  )
}

function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const STORAGE_KEY = 'wsmm_countdown_end'
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
    <div className="bg-red-700 text-white text-center py-2 px-3">
      <div className="text-xs md:text-sm font-semibold">⚠️ Offerta scade tra: <span className="font-mono font-bold text-yellow-300">{timeLeft.d}g {pad(timeLeft.h)}h {pad(timeLeft.m)}m {pad(timeLeft.s)}s</span></div>
    </div>
  )
}

function CtaButton({ text = 'ACCEDI ADESSO A SOLI 7\u20AC', className = '' }) {
  return (
    <div className={`text-center py-4 ${className}`}>
      <a href={CTA_URL} className="uiverse-cta">
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
      <img src="/assets/secure-checkout.png" alt="Pagamento sicuro" className="mx-auto mt-3 max-w-[280px] md:max-w-[320px] opacity-80" loading="lazy" />
    </div>
  )
}

function PricingBox() {
  return (
    <div className="bg-white border-2 border-green-500 rounded-2xl p-6 md:p-8 max-w-lg mx-auto shadow-xl">
      <p className="text-center text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Offerta Speciale</p>
      <h3 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">The Wealthy SMM</h3>
      <img src="/assets/mockup-hero-v2.png" alt="The Wealthy SMM" className="w-full max-w-md mx-auto mb-6 drop-shadow-2xl" loading="lazy" />
      <div className="text-center mb-4">
        <span className="text-gray-400 line-through text-2xl mr-3">97&euro;</span>
        <span className="text-5xl font-black text-green-600">27&euro;</span>
      </div>
      <p className="text-center text-sm text-gray-600 mb-6">Pagamento unico. Accesso immediato. Zero abbonamenti.</p>
      <ul className="space-y-2 mb-6 text-sm">
        {['Mini-corso 7 lezioni (~90 min)', 'Client Magnet Map (97\u20AC)', 'Closing Script Pack (147\u20AC)', 'SMM Automation Toolkit (197\u20AC)', '7-Day Repositioning Sprint (97\u20AC)', 'Premium Proposal Blueprint (147\u20AC)'].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-center text-xs text-gray-500 mb-4">Valore totale: <strong>782&euro;</strong></p>
      <a href={CTA_URL} className="uiverse-cta w-full">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                  </svg>
                </div>
              </div>
              <span>SCARICA ORA A SOLI 27€</span>
            </a>
      <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
        <ShieldCheck size={14} /> Garanzia 30 giorni soddisfatti o rimborsati
      </p>
    </div>
  )
}

function TrustpilotCard({ name, date, text, verified = true }) {
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
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>
        {verified && (
          <span className="text-xs font-semibold text-[#00b67a] flex items-center gap-1">
            <BadgeCheck size={14} /> Verificato
          </span>
        )}
      </div>
    </div>
  )
}

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

/* ===== NEW SECTIONS ===== */

function FlowchartSection() {
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: '#1a1a2e' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-white">
          Due strade. <em>Una scelta.</em>
        </h2>
        <img 
          src="/assets/flowchart-new.png" 
          alt="Il Vecchio Metodo vs The Wealthy SMM" 
          className="w-full rounded-2xl shadow-2xl" 
          loading="lazy"
        />
      </div>
    </section>
  )
}

function ShockingTruthTable() {
  return (
    <section className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-red-600">
          ECCO LA VERIT&Agrave; SCIOCCANTE...
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          <strong className="text-3xl text-gray-900">20 ore</strong> &mdash; &egrave; quanto tempo a settimana un SMM medio butta via lavorando col modello sbagliato
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Col 1 - Traditional */}
          <div className="border-2 border-red-300 rounded-xl overflow-hidden">
            <div className="bg-red-600 text-white text-center py-3 px-4 font-extrabold text-lg">SMM Tradizionale</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Guadagno</p><p className="text-xl font-bold text-gray-900">500&euro;/mese</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Ore</p><p className="text-xl font-bold text-gray-900">80/sett</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Clienti</p><p className="text-xl font-bold text-gray-900">10+ da 300&euro;</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Stress</p><p className="text-xl font-bold text-red-600 flex items-center gap-1"><XCircle size={18} /> Altissimo</p></div>
            </div>
          </div>
          {/* Col 2 - Generic courses */}
          <div className="border-2 border-yellow-300 rounded-xl overflow-hidden">
            <div className="bg-yellow-500 text-white text-center py-3 px-4 font-extrabold text-lg">Con corsi generici</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Guadagno</p><p className="text-xl font-bold text-gray-900">800&euro;/mese</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Ore</p><p className="text-xl font-bold text-gray-900">60/sett</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Clienti</p><p className="text-xl font-bold text-gray-900">5-8 da 500&euro;</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Stress</p><p className="text-xl font-bold text-yellow-600 flex items-center gap-1"><XCircle size={18} /> Alto</p></div>
            </div>
          </div>
          {/* Col 3 - Wealthy SMM */}
          <div className="border-2 border-green-400 rounded-xl overflow-hidden shadow-lg ring-2 ring-green-200">
            <div className="bg-green-600 text-white text-center py-3 px-4 font-extrabold text-lg">Con The Wealthy SMM</div>
            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Guadagno</p><p className="text-xl font-bold text-green-600">5.000-10.000&euro;/mese</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Ore</p><p className="text-xl font-bold text-green-600">20-25/sett</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Clienti</p><p className="text-xl font-bold text-green-600">3-4 da 2-5K</p></div>
              <div><p className="text-sm text-gray-500 uppercase tracking-wide">Stress</p><p className="text-xl font-bold text-green-600 flex items-center gap-1"><CheckCircle size={18} /> Basso</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FunnelSection() {
  const steps = [
    { icon: Search, n: 1, title: 'RIPOSIZIONAMENTO', sub: 'Discovery', desc: 'Da "quello che fa i post" a consulente strategico' },
    { icon: UserCheck, n: 2, title: 'TARGET GIUSTO', sub: 'Nurturing', desc: 'Identifichi clienti premium che pagano 2-5K' },
    { icon: HandCoins, n: 3, title: 'VENDITA PREMIUM', sub: 'Action', desc: 'Chiudi contratti con script e framework pronti' },
  ]
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: '#1a1a2e' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">
          Il Sistema in 3 Step
        </h2>
        <div className="flex flex-col items-center gap-0">
          {steps.map(({ icon: Icon, n, title, sub, desc }, i) => {
            const widths = ['100%', '80%', '60%']
            return (
              <div key={n} className="w-full flex flex-col items-center">
                <div
                  className="rounded-xl p-6 text-center border border-white/10"
                  style={{
                    width: widths[i],
                    minWidth: '260px',
                    background: `linear-gradient(135deg, rgba(22,163,74,${0.15 + i * 0.1}), rgba(22,163,74,${0.05 + i * 0.05}))`,
                  }}
                >
                  <Icon size={32} className="text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Step {n} &mdash; {sub}</p>
                  <h3 className="text-white text-xl font-extrabold mb-1">{title}</h3>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="py-2"><ChevronDown size={24} className="text-green-400/60" /></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SocialProofCards() {
  const proofs = [
    { name: 'Sara', text: 'Ha chiuso 4 clienti premium', result: '11.000\u20AC/mese' },
    { name: 'Luca', text: 'Ha chiuso il primo contratto da 2.500\u20AC', result: 'in 3 settimane' },
    { name: 'Giulia', text: 'Guadagna pi\u00F9 di suo padre', result: 'Indipendenza totale' },
  ]
  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">
          Risultati Reali, Persone Reali
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {proofs.map(({ name, text, result }, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BadgeCheck size={20} className="text-green-600" />
                </div>
                <span className="font-bold text-gray-900">{name}</span>
              </div>
              <p className="text-gray-700 mb-3">{text}</p>
              <p className="font-extrabold text-green-600 text-lg">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HamsterWheelVisual() {
  const phases = [
    'Trovi cliente 300\u20AC',
    'Accetti',
    'Fai TUTTO',
    'Modifiche infinite',
    'Vocali 23:00',
    'Fine mese: magone',
    '"Devo trovare PI\u00D9 clienti"',
    'Ricomincia'
  ]
  return (
    <div className="my-10 mx-auto max-w-md">
      <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
        {/* Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-red-300 border-dashed" style={{ background: 'rgba(254,202,202,0.15)' }} />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw size={32} className="text-red-400 mx-auto mb-1 animate-spin" style={{ animationDuration: '8s' }} />
            <p className="text-red-600 text-xs font-bold">CICLO<br />INFINITO</p>
          </div>
        </div>
        {/* Steps around the circle */}
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

export default function App() {
  return (
    <div className="min-h-[100dvh]">
      {/* ALERT BAR WITH COUNTDOWN */}
      <CountdownBar />

      {/* ===== HERO ===== */}
      <section id="hero-section" className="bg-white py-4 md:py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 font-bold text-[11px] md:text-sm uppercase tracking-wide mb-2">
            Per Social Media Manager stanchi di lavorare come pazzi in cambio di briciole
          </p>
          <h1 className="red-headline text-[30px] md:text-5xl lg:text-6xl mb-4 leading-tight px-2">
            Da "quello dei social a 200€/mese" a <span className="highlight">partner strategico</span> pagato 1.000-2.000€/mese
          </h1>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-4 leading-snug">
            Anche se <strong>non hai mai avuto un cliente</strong> che ti paga più di 500€, anche se pensi di <em>non saper vendere</em>, e anche se ogni corso si è rivelato una <u>fregatura totale</u>
          </p>
          <img 
            src="/assets/mockup-hero-v2.png" 
            alt="The Wealthy SMM - Bundle Completo" 
            className="w-full max-w-xs mx-auto mb-3 drop-shadow-2xl" 
            loading="eager"
          />
          <CtaButton className="!py-3" />
        </div>
      </section>

      {/* ===== COS'È THE WEALTHY SMM ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">
            Cos'&egrave; The Wealthy SMM?
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            <strong>The Wealthy SMM</strong> &egrave; un approccio controintuitivo per passare da Social Media Manager sottopagato a <strong>consulente strategico che i clienti si contendono</strong>.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Quel professionista che viene pagato <span className="highlight"><strong><u>1.000-2.000 anche 5.000€ al mese</u></strong></span> (da <em>ogni</em> cliente... sì, non in totale) senza dover implorare nessuno.
          </p>
          <h3 className="text-2xl font-bold mb-4">Come funziona?</h3>
          <p className="text-lg leading-relaxed mb-6">
            Ci riusciamo... e i nostri studenti ci riescono... <strong>ribaltando il vecchio modello tradizionale</strong> del social media manager con un metodo in <strong>3 step</strong>.
          </p>
          <ul className="space-y-3 mb-8 text-lg">
            {[
              'Senza dover diventare un esperto di advertising',
              'Senza dover aprire un\'agenzia',
              'Senza dover avere anni di esperienza alle spalle'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg leading-relaxed mb-4"><strong>E il risultato?</strong></p>
          <p className="text-lg leading-relaxed mb-6">
            Ti ritrovi a lavorare <strong>20-25 ore a settimana</strong> con clienti Premium, che ti rispettano, ti pagano in anticipo e ti <strong><em>RINGRAZIANO</em></strong> dopo averti dato <u>2.000€</u>.
          </p>
          <p className="text-xl font-bold text-center mb-4">Questo &egrave; The Wealthy SMM.</p>
          <p className="text-lg leading-relaxed text-center">
            E adesso puoi fare tuo QUESTO metodo in 3 step che usiamo, semplicemente investendo <strong className="text-green-600 text-2xl"><u>7 euro</u></strong>.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* ===== FLOWCHART CONFRONTO ===== */}
      <FlowchartSection />

      {/* ===== TABELLA VERITÀ SCIOCCANTE ===== */}
      <ShockingTruthTable />

      {/* ===== SHORTCUT STORY ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">
            The Wealthy SMM &egrave; una scorciatoia...
          </h2>
          <div className="text-lg leading-relaxed space-y-5">
            <p>Prima di creare il sistema The Wealthy SMM facevo veramente fatica a vivere da Social Media Manager ed ero "cos&igrave; vicina" a mollare tutto e tornare a fare la cameriera.</p>
            <p>Lavoravo <strong>80 ore a settimana</strong> in cambio di 1.500&euro; al mese quando tutto andava bene.</p>
            <p><strong>Facevo tutto io...</strong></p>
            <p>Grafiche, testi e descrizione, video, programmazione dei contenuti, call con clienti che mi trattavano come la loro assistente personale h24 &ndash; tutto io facevo.</p>
            <p>Eppure guadagnavo meno di quando servivo cocktail ai tavoli.</p>
            <p><strong>Senza rendermene conto...</strong></p>
            <p>...Mi ero scavata la fossa da sola, una fossa talmente alta dalla quale non avevo la minima idea di come fare ad uscirne una volta per tutte.</p>
            <p>Questo mi ha spinta a mettere in discussione tutto, a ribaltare il modello, a rompere ogni regola. A liberarmi dalle catene del vecchio modo di fare il Social Media Manager.</p>
            <p><strong>E cos&igrave;...</strong></p>
            <p>Dopo anni di tentativi, errori, notti in bianco e soldi bruciati in formazione &ndash; senza nessuno che mi guidasse &ndash; sono arrivata dove sono adesso.</p>
            <p>E cio&egrave; a guadagnare oltre <span className="highlight"><strong>10.000&euro; al mese</strong></span>, lavorando meno di 25 ore a settimana con clienti che mi pagano in anticipo senza fiatare... e dopo avermi pagato mi ringraziano.</p>
            <p>Tutto questo avendo la libert&agrave; di vivere serenamente senza ansia e stress, fare vacanze e godermi ci&ograve; che la vita ha di bello da offrire.</p>
            <p className="text-xl font-bold">E ora tu PUOI DUPLICARE l'intero sistema che ho costruito.</p>
            <p>Scaricando un mini-corso da <strong><u>27€</u></strong> (invece di <span className="line-through">97€</span>) chiamato <strong>The Wealthy SMM</strong>.</p>
          </div>
        </div>
      </section>

      {/* ===== BONUS SECTION ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-4">
            Accedendo a The Wealthy SMM adesso otterrai 5 bonus dal valore di 685&euro;...
          </h2>
          <p className="text-center text-xl font-bold text-green-600 mb-10"><span className="bg-yellow-200 px-2 py-1 rounded">100% GRATIS!</span></p>

          {/* Bonus 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/assets/bonus-client-magnet.png" alt="Client Magnet Map" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">REGALO 1</p>
                <h3 className="text-2xl font-extrabold mb-3">CLIENT MAGNET MAP</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">La mappa che ti fa smettere di perdere tempo con clienti da 300&euro; che ti trattano come il loro schiavo personale.</p>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Quali sono i <strong>7 settori pi&ugrave; profittevoli</strong> per un SMM in Italia. Per ognuno ti spiego perch&eacute; pagano bene, come approcciarli e cosa dire al primo contatto.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Dove trovarli esattamente.</strong> Non "idee vaghe" ma i canali specifici con le azioni precise step-by-step.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>I <strong>5 segnali</strong> che ti dicono "questo cliente ha il portafoglio aperto".</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Le <strong>red flag</strong> da evitare come la peste. Se senti una di queste 6 frasi, scappa.</span></li>
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>97&euro;</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/assets/bonus-closing-scripts.png" alt="Closing Script Pack" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">REGALO 2</p>
                <h3 className="text-2xl font-extrabold mb-3">CLOSING SCRIPT PACK</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Le parole esatte da dire quando il cliente cerca di fregarti. Copia-incolla. Pronte all'uso.</p>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Script <strong>"COSTA TROPPO"</strong> &mdash; la risposta parola-per-parola che ribalta l'obiezione.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Script <strong>"CI DEVO PENSARE"</strong> &mdash; la tecnica per far emergere la vera obiezione nascosta.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Script <strong>"IL MIO CUGINO LO FA GRATIS"</strong> &mdash; come rispondere senza perdere la calma.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Script <strong>"PRIMA VOGLIO VEDERE I RISULTATI"</strong> &mdash; come smontare la richiesta di lavorare gratis.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Script <strong>"HO GI&Agrave; PROVATO CON UN ALTRO SMM"</strong> &mdash; trasforma la brutta esperienza nel motivo per cui DEVONO lavorare con te.</span></li>
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>147&euro;</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 3 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/assets/bonus-automation.png" alt="SMM Automation Toolkit" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">REGALO 3</p>
                <h3 className="text-2xl font-extrabold mb-3">THE SMM AUTOMATION TOOLKIT</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il kit che ti fa lavorare in met&agrave; del tempo senza sacrificare la qualit&agrave;. Anzi, migliorandola.</p>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>10 prompt AI</strong> ottimizzati e testati per generare caption, idee contenuti, report e molto altro.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Content Calendar Template</strong> &mdash; il calendario editoriale che crei UNA volta e adatti per ogni cliente in 10 minuti.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Struttura Caption Universale</strong> &mdash; il framework che funziona per QUALSIASI settore.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Framework Reels</strong> &mdash; le 5 strutture di Reel che funzionano sempre, con script gi&agrave; pronti.</span></li>
                </ul>
                <p className="mt-3 text-base font-semibold">Basta ammazzarsi 80 ore al mese creando tutto da zero. Crei una volta, adatti veloce, vivi la tua vita.</p>
                <p className="mt-4 text-sm">(Valore: <strong>197&euro;</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 4 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/assets/bonus-sprint.png" alt="7-Day Repositioning Sprint" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">REGALO 4</p>
                <h3 className="text-2xl font-extrabold mb-3">THE 7-DAY REPOSITIONING SPRINT</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il piano d'azione che in 7 giorni netti ti trasforma da "quello che fa i post" a consulente strategico.</p>
                <ul className="space-y-3 text-base">
                  {['Giorno 1 — Riscrivi la tua bio e il tuo positioning su tutti i canali.', 'Giorno 2 — Ridefinisci la tua offerta usando il framework ROI.', 'Giorno 3 — Identifica i tuoi primi 20 prospect ideali.', 'Giorno 4 — Prepara il tuo messaggio di outreach con il template testato.', 'Giorno 5 — Lancia i primi contatti con script esatto.', 'Giorno 6 — Prepara la tua discovery call. Simulazione inclusa.', 'Giorno 7 — Valuta i risultati, ottimizza e pianifica la settimana 2.'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>97&euro;</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>

          {/* Bonus 5 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src="/assets/bonus-proposal.png" alt="Premium Proposal Blueprint" className="w-full md:w-48 rounded-lg shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-red-600 mb-1">REGALO 5</p>
                <h3 className="text-2xl font-extrabold mb-3">THE PREMIUM PROPOSAL BLUEPRINT</h3>
                <p className="text-lg mb-4 font-semibold text-gray-700">Il documento che ti fa sembrare un professionista da 5.000&euro; anche se ieri chiedevi 500&euro;.</p>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Il <strong>modello esatto</strong> che uso per presentare i miei servizi ai clienti premium.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Il <strong>framework per calcolare e mostrare</strong> al cliente QUANTO gli farai guadagnare.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Sezione caso studio</strong> &mdash; spazio gi&agrave; formattato per inserire i tuoi risultati.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span><strong>Sezione termini e condizioni</strong> &mdash; clausole base per proteggerti.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" /><span>Da "ti mando un msg su WhatsApp con il prezzo" a <strong>"ecco la mia proposta strategica personalizzata."</strong></span></li>
                </ul>
                <p className="mt-4 text-sm">(Valore: <strong>147&euro;</strong>) <span className="font-bold text-green-600">GRATIS</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHI È MARINELA ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-8">Chi &egrave; Marinela Marku?</h2>
          <p className="text-lg text-center mb-8 text-gray-700">Non sono un'influencer che ha scoperto il Social Media Management ieri. Sono una che ci lavora, ci guadagna e aiuta altri professionisti a farlo ogni singolo giorno.</p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img src="/assets/marinela-photo.jpg" alt="Marinela Marku" className="w-full md:w-72 rounded-xl shadow-lg shrink-0" loading="lazy" />
            <ul className="space-y-4 text-base">
              {[
                'Da studentessa universitaria e cameriera part-time a imprenditrice con un business da oltre 10.000\u20AC/mese \u2014 costruito da zero, senza contatti, senza raccomandazioni, senza soldi di famiglia',
                'Oltre 200 Social Media Manager seguiti personalmente nel percorso da "esecutore sottopagato" a consulente strategico premium \u2014 con risultati documentati e verificabili',
                'Fondatrice della SMM Academy \u2014 il programma di coaching che ha trasformato la carriera di professionisti che oggi chiudono contratti da 3.000-5.000\u20AC al mese',
                'Ha lavorato con aziende che fatturano 200K-500K+ all\'anno \u2014 non parrucchieri e bar, ma imprese reali con budget reali',
                'Conosce il mercato italiano dall\'interno \u2014 sa quali settori pagano di pi\u00F9, quali clienti cercano SMM competenti',
                'Padroneggia la vendita consulenziale, posizionamento premium e strategie di acquisizione clienti \u2014 tecniche testate con centinaia di trattative reali',
                'Ha studiato ossessivamente i modelli dei migliori SMM del mercato americano \u2014 e li ha adattati al mercato italiano',
                'Ha investito migliaia di euro in formazione e mentorship di alto livello \u2014 cos\u00EC tu non devi farlo',
                'Ogni giorno gestisce clienti premium, forma studenti e chiude trattative \u2014 non \u00E8 una che "insegnava 5 anni fa e ora fa solo corsi"',
                'Ha visto centinaia di SMM bruciarsi lavorando 80 ore a settimana per 500\u20AC al mese \u2014 e sa come evitarlo perch\u00E9 ci \u00E8 passata in prima persona'
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

      {/* ===== VIDEO TESTIMONIANZE YOUTUBE ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-4">Risultati reali, persone reali</h2>
          <p className="text-center text-gray-600 text-lg mb-10">Guarda con i tuoi occhi cosa dicono i nostri studenti</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/qF_xRdAL4XI"
                title="Testimonianza 1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/J6PuX3d5xMs"
                title="Testimonianza 2"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/f8DWp1qt79c"
                title="Testimonianza 3"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIANZE TRUSTPILOT ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#00b67a] font-extrabold text-lg">Trustpilot</span>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#00b67a] text-[#00b67a]" />)}</div>
          </div>
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">Cosa dice chi si è affidato a me?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TrustpilotCard
              name="Sara Colombo"
              date="2 settimane fa"
              text="Non ci credevo nemmeno io. Lavoravo 70 ore a settimana per 800€ al mese, i clienti mi scrivevano alle 11 di sera per cambiare una caption. Ho seguito il metodo di Marinela e in due mesi ho chiuso 4 clienti da 2.500-3.000€ ciascuno. Adesso lavoro meno e guadagno 11K al mese. Ancora non mi sembra vero."
            />
            <TrustpilotCard
              name="Luca Ferretti"
              date="1 mese fa"
              text="Stavo per chiudere partita IVA. La mia ragazza mi aveva dato l'ultimatum, tipo 'o guadagni sul serio o basta'. Ho comprato il corso quasi per disperazione e ho applicato tutto alla lettera. Primo cliente premium chiuso in 3 settimane, 2.500€. Ora ne ho tre. Grazie Marinela, mi hai salvato la carriera (e la relazione 😅)."
            />
            <TrustpilotCard
              name="Giulia De Santis"
              date="3 settimane fa"
              text="I miei genitori mi prendevano in giro, dicevano che 'giocavo con Instagram'. Gli amici idem. Dopo il corso ho alzato i prezzi e ho mollato tutti i clienti da 300€. Adesso guadagno più di mio padre e mi sono comprata la macchina nuova da sola. La faccia dei miei a Natale non aveva prezzo."
            />
            <TrustpilotCard
              name="Marco Bianchi"
              date="1 mese fa"
              text="Avevo fatto tipo 3 corsi sul SMM prima di questo. Tutti uguali: 'posta di più, usa i Reels, fai engagement'. Con 27€ ho capito più che con 2.000€ spesi in formazione. Il riposizionamento come consulente strategico ha cambiato tutto. Primo contratto da 3K chiuso il mese scorso."
            />
            <TrustpilotCard
              name="Alessia Rossi"
              date="5 giorni fa"
              text="Sono sincera, quando ho visto '27€' pensavo fosse la solita fregatura. Invece è il miglior investimento che ho fatto quest'anno. Il Closing Script Pack da solo vale oro. Ho usato lo script 'costa troppo' con un cliente che stava per scappare e ho chiuso a 2.000€/mese. Roba che prima non mi sarei mai sognata."
            />
            <TrustpilotCard
              name="Davide Moretti"
              date="2 settimane fa"
              text="Finalmente qualcuno che dice le cose come stanno. Il vecchio modello del SMM è morto e Marinela te lo dimostra con i numeri. Ho applicato il metodo del riposizionamento e in un mese ho triplicato la mia tariffa media. I clienti non battono ciglio. Anzi, ti rispettano di più quando chiedi il giusto."
            />
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF POTENZIATO ===== */}
      <SocialProofCards />

      {/* ===== PRICING + CTA ===== */}
      <section id="pricing-section" className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">
            L'<u>unico corso</u> che ti serve che ti mostra realmente come guadagnare <strong>TANTO</strong> come Social Media Manager nel mercato competitivo 2026 - <em>Garantito!</em>
          </h2>
          <PricingBox />
        </div>
      </section>

      {/* ===== GARANZIA ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img src="/assets/garanzia-gold.png" alt="Garanzia 30 giorni soddisfatti o rimborsati" className="w-60 md:w-80 mx-auto mb-6 drop-shadow-lg" loading="lazy" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Il corso The Wealthy SMM &egrave; coperto dalla Garanzia "Soddisfatti o Rimborsati" di 30 giorni</h2>
          <div className="text-lg leading-relaxed space-y-4 text-left max-w-2xl mx-auto">
            <p>Se per qualsiasi motivo &mdash; e dico <strong>qualsiasi</strong> &mdash; decidi che The Wealthy SMM non fa per te, mandami un'email entro 30 giorni.</p>
            <p><strong>Ti rimborso ogni singolo centesimo.</strong></p>
            <p>Nessuna domanda.<br />Nessuna giustificazione richiesta.<br />Nessun problema.</p>
            <p>Scrivi "rimborso", ricevi i soldi indietro, fine della storia.</p>
            <p><strong>Il rischio &egrave; completamente su di me.</strong></p>
            <p>Perch&eacute; sono cos&igrave; sicura? Perch&eacute; so cosa c'&egrave; dentro.</p>
            <p>So quanto vale. E so che quando aprirai la prima lezione e vedrai il calcolo matematico che dimostra perch&eacute; il tuo modello attuale &egrave; impossibile da scalare... <strong>ti cadr&agrave; la mascella</strong>.</p>
            <p>E capirai che 7&euro; &egrave; un insulto rispetto a quello che stai per ricevere.</p>
            <p>Ma anche se non fossi d'accordo, hai 30 giorni per cambiare idea.</p>
            <p><strong><span className="bg-yellow-200 px-1 rounded">Zero rischio.</span> Tutta la pressione è su di me. Esattamente come deve essere.</strong></p>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== LONG-FORM SALES LETTER ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-4xl text-center mb-4">
            COME SONO PASSATA DA GUADAGNARE MENO DI UNA CAMERIERA A FARE OLTRE 10.000&euro; AL MESE COME SMM
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10">Questo &egrave; qualcosa di completamente nuovo e diverso da tutto ci&ograve; che hai mai sentito prima &mdash; leggi la storia qui sotto per scoprire The Wealthy SMM</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10 text-lg leading-relaxed space-y-5">
            <p className="text-gray-600 italic">Caro futuro membro di The Wealthy SMM<br />Da: MacBook Pro di Marinela Marku<br />Titolo: Guadagnare 2.000-5.000&euro; al mese come SMM (e perch&eacute; questa &egrave; la tua unica via d'uscita)</p>
            
            <p>Ti sorprenderebbe sapere che sono passata da guadagnare <strong><u>6,25€ l'ora</u></strong> a oltre <strong className="text-green-600"><u>10.000€ al mese</u></strong> usando esattamente le informazioni contenute in questo mini-corso da 7 lezioni?</p>
            <p><strong>Scettico?</strong></p>
            <p>Bene. Dovresti esserlo.</p>
            <p>Del resto, non puoi credere a tutto quello che vedi su internet :-)</p>
            <p className="text-xl font-bold">QUINDI LASCIA CHE TE LO DIMOSTRI</p>
            <p>Ma prima, una premessa doverosa:</p>
            <p>Ho il vantaggio di 4+ anni di esperienza e centinaia di professionisti seguiti personalmente.</p>
            <p>Chi compra un corso "come fare" di solito ottiene poco o niente. Uso i miei risultati solo come esempio, non come promessa.</p>
            <p>I tuoi risultati dipenderanno da te: dal tuo punto di partenza, dalla tua esperienza e soprattutto dalla tua voglia di spaccarti il culo.</p>
            <p><strong>Se non sei pronto a metterti in gioco davvero, per favore NON comprare questo mini-corso.</strong></p>
            <p>E s&igrave;...</p>
            <p>A me ci &egrave; voluto tempo, fatica e lacrime per arrivare dove sono.</p>
            <p>Detto questo... lascia che ti mostri come ci sono arrivata.</p>

            <p className="text-xl font-extrabold text-red-600">E L'HO FATTO USANDO UN MODELLO COMPLETAMENTE CONTROINTUITIVO CHE STO PER CONDIVIDERE CON TE IN QUESTA PAGINA...</p>

            <p>Lo stesso che SMM in tutta Italia stanno usando per passare da 500&euro;/mese a 2.000-5.000&euro; per singolo cliente...</p>
            <p>...E costruirsi finalmente un business che non li costringe a scegliere tra "pago l'affitto" e "esco a cena"...</p>
            <p>...Lavorando 20-25 ore a settimana invece di ammazzarsi per 80...</p>
            <p>...E soprattutto: liberandosi per sempre dalla vergogna di essere "quello che gestisce i social per due spicci"</p>

            {/* Sara story */}
            <h3 className="text-xl font-extrabold text-red-600 mt-8">COME SARA, CHE HA SCARICATO THE WEALTHY SMM QUALCHE MESE FA E POCO DOPO &Egrave; PASSATA DA 800&euro;/MESE A 11.000&euro;/MESE STABILI</h3>
            <p>Quando l'ho conosciuta, Sara lavorava 70 ore a settimana per 800&euro; al mese. I clienti la trattavano come una schiava.</p>
            <p>Zero rispetto. Zero soddisfazione. La classica vita da "quella che fa i post per due spicci".</p>
            <p>Poi ha applicato il metodo.</p>
            <p>Ha chiuso <strong><span className="bg-yellow-200 px-1 rounded">4 clienti premium da 2.500-3.000€ al mese ciascuno</span></strong>.</p>
            <p>E anche se passare da 800&euro; a 11.000&euro; al mese &egrave; pazzesco... non &egrave; nemmeno la parte migliore.</p>
            <p><strong>La parte migliore?</strong></p>
            <p>Sara ora lavora 25 ore a settimana. Per scelta. Ha pi&ugrave; soldi, pi&ugrave; tempo e pi&ugrave; rispetto di quanto ne abbia mai avuto lavorando il triplo.</p>
            <p>E Sara non &egrave; l'unica...</p>

            {/* Luca story */}
            <h3 className="text-xl font-extrabold text-red-600 mt-8">QUESTO &Egrave; LUCA, UN ALTRO MEMBRO DI THE WEALTHY SMM, CHE STAVA PER MOLLARE TUTTO E TORNARE IN FABBRICA...</h3>
            <p>Luca era a un passo dal chiudere la partita IVA.</p>
            <p>Non riusciva pi&ugrave; a reggere economicamente.</p>
            <p>La ragazza gli aveva dato un ultimatum: "O inizi a guadagnare seriamente, o questa storia finisce qui."</p>
            <p>Poi ha applicato il metodo. E ha iniziato a chiudere contratti da migliaia di euro.</p>

            {/* Giulia story */}
            <h3 className="text-xl font-extrabold text-red-600 mt-8">ECCO GIULIA, CHE &Egrave; PASSATA DAL VERGOGNARSI DEL SUO LAVORO A GUADAGNARE PI&Ugrave; DI SUO PADRE</h3>
            <p>I genitori la chiamavano "quella che gioca su Instagram".</p>
            <p>Gli amici ridacchiavano quando diceva di fare la Social Media Manager. Non riusciva a portarsi a casa nemmeno uno stipendio.</p>
            <p>Adesso invece? I genitori non ridono pi&ugrave;.</p>
            <p>Gli amici le chiedono consigli. E Giulia si &egrave; comprata la macchina nuova senza chiedere niente a nessuno.</p>

            <h3 className="text-xl font-extrabold mt-8">SARA, LUCA E GIULIA FANNO PARTE DI UN GRUPPO DI OLTRE 200 PROFESSIONISTI CHE HANNO SMESSO DI FARE LE COSE NEL MODO SBAGLIATO...</h3>
            <p>E ci POSSO SCOMMETTERE...</p>
            <p>Questo sistema che ti svelo in The Wealthy SMM &egrave; diverso da qualsiasi cosa tu abbia mai sentito, letto o provato...</p>
            <p>...Completamente diverso. Perch&eacute;...</p>

            <ul className="space-y-3">
              {[
                'NON ci concentriamo sul "postare di pi\u00F9" sperando che succeda qualcosa',
                'NON ci concentriamo sul "trovare pi\u00F9 clienti a 500\u20AC" per fare volume',
                'NON ci concentriamo sull\'"imparare pi\u00F9 tool e competenze tecniche" come scimmie ammaestrate',
                'NON ci concentriamo sul "fare tutto da soli per risparmiare" bruciandoci vivi',
                'NON ci concentriamo sul "lavorare pi\u00F9 ore per guadagnare di pi\u00F9"'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><XCircle size={20} className="text-red-500 mt-0.5 shrink-0" /><span>{item}</span></li>
              ))}
            </ul>

            <p>Infatti raramente lavoriamo pi&ugrave; di 25 ore a settimana.</p>
            <p><strong>Eppure guadagniamo 3-5 volte di pi&ugrave; di chi ne lavora 80.</strong></p>

            <p className="text-xl font-extrabold text-red-600">INVECE CI RIPOSIZIONIAMO COME CONSULENTI STRATEGICI CHE VENDONO RISULTATI, E NON ORE</p>

            <p>Come ho detto...</p>
            <p>Questo &egrave; qualcosa di completamente diverso. E ha il potere di cambiare tutto per te.</p>
            <p>Lo so perch&eacute; ha cambiato tutto per me.</p>
            <p>Il modello The Wealthy SMM mi ha permesso di eliminare il 99% di tutta la mer*a che odiavo di questo lavoro:</p>

            <ul className="space-y-3">
              {[
                'Inseguire clienti che ti offrono 300\u20AC e pretendono la luna',
                'Ammazzarsi 80 ore a settimana per briciole',
                'Essere trattata come un\'assistente personale h24 senza dignit\u00E0',
                'Ricevere vocali di 4 minuti alle 23 di domenica'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><XCircle size={20} className="text-red-500 mt-0.5 shrink-0" /><span>{item}</span></li>
              ))}
            </ul>

            <p className="text-xl font-extrabold text-red-600">THE WEALTHY SMM MI HA LIBERATA DA TUTTO QUESTO E MI HA PERMESSO DI COSTRUIRE UN BUSINESS DA 10K/MESE LAVORANDO MET&Agrave; DELLE ORE</p>
          </div>
        </div>
      </section>

      {/* ===== RUOTA DEL CRICETO ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">La "Ruota del Criceto del SMM"</h2>
          <p className="text-lg mb-6">Ecco com'era la mia vita prima. E se sei un Social Media Manager, scommetto che ti ci rivedi come in uno specchio:</p>
          <HamsterWheelVisual />
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
            <ol className="space-y-4 text-lg list-decimal list-inside">
              <li>Trovi un cliente disposto a darti <strong>300-500&euro;</strong> se va bene (e ti sembra gi&agrave; un miracolo)</li>
              <li>Accetti perch&eacute; le bollette non aspettano</li>
              <li>Ti ritrovi a fare TUTTO: grafiche, copy, video, stories, programmazione, psicologo</li>
              <li>Il cliente ti chiede modifiche infinite perch&eacute; tanto "paga"</li>
              <li>Ti manda vocali di 4 minuti alle 23 di domenica sera</li>
              <li>A fine mese conti i soldi e ti viene il magone</li>
              <li>Ti dici "devo trovare PI&Ugrave; clienti"</li>
              <li><strong>Ricomincia da capo. Stesso incubo. Mese dopo mese.</strong></li>
            </ol>
          </div>
          <div className="text-lg leading-relaxed space-y-5 mt-8">
            <p>La Ruota del Criceto non solo mi stava distruggendo...</p>
            <p>Mi ha tenuta incatenata per <strong>2 anni</strong> a guadagnare 1.500&euro; al mese lavorandone come se fossero 10.000.</p>
            <p>A un certo punto...</p>
            <p>...Stavo per mandare tutto a quel paese. Chiudere la partita IVA e tornare a fare la cameriera.</p>
            <p>Almeno l&igrave; sapevo quanto guadagnavo.</p>
            <p><strong>Ma prima di arrendermi...</strong></p>
            <p>Ho voluto provare un'ultima cosa.</p>
            <p>Una cosa che &mdash; se avesse funzionato...</p>
            <p>Avrebbe cambiato tutto.</p>
            <p>E come stai per scoprire adesso...</p>
            <p className="text-xl font-bold">...Ha funzionato.</p>
          </div>
        </div>
      </section>

      {/* ===== MARINELA STORY CONTINUED ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-5">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">HO MESSO L'INTERO SISTEMA IN UN MINI-CORSO CHIAMATO "THE WEALTHY SMM" CHE PUOI INIZIARE A GUARDARE FRA POCHI MINUTI...</h2>
          
          <p>Ma prima. Lascia che mi presenti e ti racconti come &egrave; nato tutto questo.</p>
          <p><strong>Mi chiamo Marinela Marku.</strong></p>
          <p>Probabilmente non hai mai sentito il mio nome.</p>
          <p>Non sono un'influencer. Non faccio balletti su TikTok. Non posto foto in Lamborghini. &Egrave; una scelta.</p>
          <p>La mia vita adesso &egrave; quella che sognavo quando facevo la cameriera: lavoro quando voglio, da dove voglio.</p>
          <p>Con persone che rispetto. Guadagno pi&ugrave; in un mese di quanto portavo a casa in un ANNO intero quando ho iniziato.</p>

          <img src="/assets/marinela-team.jpg" alt="Marinela - libertà e lifestyle" className="w-full rounded-xl shadow-lg my-8" loading="lazy" />

          <h3 className="text-xl font-extrabold text-red-600">MA CONOSCENDOMI MEGLIO... CAPIRAI CHE SONO LA PERSONA PI&Ugrave; FORTUNATA DEL MONDO &mdash; QUINDI PARLIAMO DI DOV'ERO 4 ANNI FA</h3>
          <p>Avevo poco pi&ugrave; di 20 anni. Vivevo in un monolocale in periferia dove lo spazio finiva prima ancora di entrare.</p>
          <p>Non avevo soldi da parte.</p>
          <p>Non avevo contatti nel mondo del business.</p>
          <p>Non avevo la minima idea di come si vende qualcosa a qualcuno.</p>
          <p>...E avevo appena capito che l'universit&agrave; mi stava preparando a un futuro che non volevo.</p>
          <p>Questo significava che dovevo trovare un'altra strada. Da sola. Senza paracadute.</p>

          <p>C'&egrave; una bugia tossica che ci raccontano da quando siamo piccoli: <strong>"Lavora sodo e un giorno ce la farai."</strong></p>
          <p><strong>Balle.</strong></p>
          <p>Se lavori sodo con il modello SBAGLIATO, l'unica cosa che ottieni &egrave; le occhiaie e il conto in banca vuoto.</p>
          <p>Lo so perch&eacute; ci ho provato.</p>
          <p>Ho dato tutto quello che avevo. Ho dato il mio MASSIMO.</p>
          <p>E non ha funzionato. Perch&eacute; ho giocato secondo le regole. Ho fatto tutto "come si deve". E mi sono ritrovata al punto di partenza.</p>

          <h3 className="text-xl font-extrabold text-red-600">MI SONO RITROVATA A GUADAGNARE 6,25&euro; L'ORA E VOLEVO PIANGERE OGNI SERA</h3>
          <p>6,25&euro; l'ora. Meno di un barista. Con il triplo dello stress, il triplo delle responsabilit&agrave; e zero gratificazione.</p>
          <p>La mattina mi svegliavo con un macigno sul petto. La sera crollavo davanti allo schermo senza la forza di uscire.</p>
          <p>La domenica rispondevo a vocali di clienti che mi trattavano come se avessero comprato la mia vita per 500&euro;.</p>
          <p>Avevo sogni. Ambizioni. Obiettivi.</p>
          <p>Volevo viaggiare, vivere bene, guardare mia madre negli occhi e dimostrarle che non stavo perdendo tempo.</p>
          <p>Ma con la "Ruota Del Criceto del SMM" non sarebbe mai successo. Cos&igrave; ho fatto quello che fanno tutti quando sono con le spalle al muro. Ho iniziato a cercare una via d'uscita.</p>
          <p>Ho cercato ovunque. E qualche mese dopo l'ho trovata.</p>
          <p>Mi sono imbattuta nel <strong>mercato americano</strong>...</p>
          <p>...Dove un gruppo di Social Media Manager raccontava come fossero diventati "consulenti strategici".</p>
          <p>Lavoravano met&agrave; delle ore, guadagnavano 5-10 volte di pi&ugrave; e i clienti li RINGRAZIAVANO dopo averli pagati.</p>
          <p><strong>La cosa pazzesca?</strong></p>
          <p>La maggior parte di loro era partita esattamente come me.</p>
          <p>Stessi clienti da 300-500&euro;. Stessa frustrazione. Stessa voglia di mandare tutto a quel paese.</p>
          <p><strong>L'unica differenza?</strong></p>
          <p className="text-xl font-bold">Avevano smesso di vendere tempo e iniziato a vendere risultati.</p>
        </div>
      </section>

      {/* ===== FUNNEL 3 STEP VISUAL ===== */}
      <FunnelSection />

      {/* ===== DA ESECUTORE A CONSULENTE ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-5">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">DA ESECUTORE A CONSULENTE STRATEGICO &Egrave; IL SISTEMA PI&Ugrave; EFFICACE SE VUOI GUADAGNARE 5-10MILA EURO AL MESE COME SMM</h2>
          
          <p>Fermati un secondo e pensaci:</p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Target size={22} className="text-red-500 mt-1 shrink-0" />
              <span>Perch&eacute; un cliente dovrebbe pagarti 2.000&euro; al mese per "gestire i social"? Non lo far&agrave;. MAI. Ma pagher&agrave; 2.000&euro; senza battere ciglio per un sistema che gli porta <strong>10 clienti nuovi al mese e 30.000&euro; di fatturato extra</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <Target size={22} className="text-red-500 mt-1 shrink-0" />
              <span>Perch&eacute; ammazzarti con parrucchieri che tirano sul prezzo per 50&euro;? Aziende che fatturano 200-300K+ all'anno considerano 2.000&euro;/mese un <strong>AFFARE</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <Target size={22} className="text-red-500 mt-1 shrink-0" />
              <span>Perch&eacute; fare tutto da solo come una scimmia ammaestrata? Con i template giusti, l'AI e processi replicabili, <strong>dimezzi le ore e raddoppi i clienti</strong>.</span>
            </li>
          </ul>

          <p>Il riposizionamento strategico era la risposta che cercavo da 2 anni senza saperlo...</p>
          <p>E la parte che mi ha fatto innamorare di questo approccio?</p>

          <h3 className="text-xl font-extrabold text-red-600">NON DEVI NEMMENO DIVENTARE UN ESPERTO DI ADVERTISING</h3>
          <p>Questo significa che puoi farti pagare 2-5K al mese per cliente <strong>anche senza</strong> saper lanciare una campagna Facebook Ads.</p>
          <p>L'unica cosa che devi fare &egrave; smettere di presentarti come "quello che fa i post" e iniziare a presentarti come il professionista...</p>
          <p className="text-xl font-bold">...Che porta SOLDI.</p>

          <h3 className="text-xl font-extrabold text-red-600 mt-8">E COS&Igrave; &Egrave; NATO IL MIO PERCORSO</h3>
          <p>Ho smesso di dire "gestisco i social". Ho iniziato a dire "porto clienti e fatturato". E tutto &egrave; cambiato.</p>
          <p>All'inizio non sapevo come strutturare un'offerta premium.</p>
          <p>Non sapevo come trovare clienti disposti a pagare 2-3mila euro.</p>
          <p>Non avevo la minima idea di come chiudere una vendita senza farmi prendere dal panico e svendermi.</p>
          <p>L'unica cosa che sapevo fare? Lavorare sodo e non mollare.</p>

          <p>E anche se avevo le informazioni giuste dal mercato americano... dovevo metterle in pratica. Nel mercato italiano. Da sola. Senza nessuno che mi dicesse "fai cos&igrave;".</p>
          <p>Quei primi 2 anni sono stati una guerra.</p>
          <p>Notti in bianco a studiare. Soldi bruciati in corsi che non valevano la carta su cui erano stampati.</p>
          <p>Ho fatto tutto quello che dicevano. Ho seguito i consigli degli influencer.</p>
          <p>Ho ottenuto qualche risultato. Ma mi sono creata un problema pi&ugrave; grande: ero diventata una tuttofare h24 che non staccava MAI.</p>
          <p><strong>Stavo per mollare tutto.</strong></p>
          <p>Ma per fortuna non l'ho fatto...</p>

          <h3 className="text-xl font-extrabold text-red-600 mt-8">ERA 4 ANNI FA, E GUARDANDO OGGI SEMBRA QUASI UN BRUTTO SOGNO</h3>
          <p>Ho dimostrato che la favola del "lavora sodo e un giorno ce la farai" &egrave; la bugia pi&ugrave; grande che ci abbiano mai raccontato...</p>
          <p>Oggi ho un'attivit&agrave; che mi permette di svegliarmi senza sveglia. Di lavorare da dove mi pare. Di dire "no" a clienti che non mi piacciono.</p>
          <p>I miei clienti mi pagano in anticipo, mi rispettano e mi ringraziano. Guadagno pi&ugrave; in un mese di quanto facevo in un anno.</p>
        </div>
      </section>

      {/* ===== CONFRONTO VECCHIO VS NUOVO ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">
            VUOI SAPERE QUAL &Egrave; LA DIFFERENZA TRA IL MODELLO THE WEALTHY SMM E IL "VECCHIO MODO" DI FARE IL SMM?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="font-extrabold text-red-600 text-xl mb-4 flex items-center gap-2"><XCircle size={24} /> Vecchio Modo</h3>
              <ul className="space-y-3">
                <li>Inseguono clienti</li>
                <li>Vendono ore e preghiere</li>
                <li>Lavorano 80 ore e piangono</li>
                <li>Creare post e stories che nessuno misura in termini di fatturato</li>
                <li>Gestire 10-20 profili contemporaneamente perdendo la testa</li>
                <li>Rispondere a richieste assurde a qualsiasi ora</li>
                <li>Rincorrere clienti che pagano briciole</li>
              </ul>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-extrabold text-green-600 text-xl mb-4 flex items-center gap-2"><CheckCircle size={24} /> The Wealthy SMM</h3>
              <ul className="space-y-3">
                <li>ATTRAGGO i clienti</li>
                <li>Vendo risultati e fatturato</li>
                <li>Lavoro 25 ore e sorrido</li>
                <li>Vendo sistemi di acquisizione clienti</li>
                <li>3-4 clienti premium che rispettano</li>
                <li>Clienti pagano in anticipo</li>
                <li>5-10K al mese lavorando met&agrave; delle ore</li>
              </ul>
            </div>
          </div>

          <div className="text-lg leading-relaxed space-y-5">
            <p>A differenza degli altri SMM che passano le giornate a rincorrere clienti che li trattano come schiavi...</p>
            <p>Invece di costruire un business profittevole, mi ero costruita una prigione. Con le sbarre fatte di vocali WhatsApp.</p>

            <p className="text-xl font-extrabold text-red-600 mt-8">I CLIENTI PREFERISCONO PAGARE DI PI&Ugrave;.</p>
            <p>S&igrave;, hai letto bene.</p>
            <p>Preferiscono sganciare il doppio, il triplo, il quintuplo per un consulente che porta risultati misurabili.</p>
            <p>Piuttosto che pagare 500&euro; a "quello che fa i post".</p>

            <h3 className="text-xl font-extrabold text-red-600 mt-8">ED &Egrave; QUI CHE ENTRA IN GIOCO THE WEALTHY SMM</h3>
            <p>Lo fa in 3 passi semplici:</p>
          </div>

          {/* Funnel visivo inline */}
          <div className="my-8 flex flex-col items-center gap-0">
            {[
              { icon: Search, n: 1, title: 'RIPOSIZIONAMENTO', desc: 'Da "quello che fa i post" a consulente strategico', w: '100%' },
              { icon: UserCheck, n: 2, title: 'TARGET GIUSTO', desc: 'Identifichi clienti premium che pagano 2-5K', w: '80%' },
              { icon: HandCoins, n: 3, title: 'VENDITA PREMIUM', desc: 'Chiudi contratti con script e framework pronti', w: '60%' },
            ].map(({ icon: Icon, n, title, desc, w }, i) => (
              <div key={n} className="w-full flex flex-col items-center">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 text-center" style={{ width: w, minWidth: '240px' }}>
                  <Icon size={28} className="text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-1">Step {n}</p>
                  <h4 className="font-extrabold text-lg text-gray-900 mb-1">{title}</h4>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
                {i < 2 && <div className="py-1"><ChevronDown size={20} className="text-green-400" /></div>}
              </div>
            ))}
          </div>

          <div className="text-lg leading-relaxed space-y-5">
            <p><strong>Questa &egrave; la differenza.</strong></p>
            <p>Quando imposti il tuo business con questo modello, i risultati esplodono. E sono sostenibili.</p>
            <p>Quando lo fai col vecchio modello? Burnout, stress, guadagni da fame, clienti che ti calpestano e la voglia di cambiare mestiere ogni marted&igrave; mattina.</p>
            <p>Il modello The Wealthy SMM richiede solo una cosa:</p>
            <p className="text-xl font-bold">Solo il CORAGGIO di riposizionarti e chiedere ci&ograve; che meriti.</p>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== ERRORE #1 ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-5">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">L'ERRORE #1 CHE TUTTI COMMETTONO &Egrave; VENDERE TEMPO INVECE DI VENDERE VALORE</h2>
          
          <p>Ecco perch&eacute;:</p>
          <p>L&agrave; fuori esistono due tipi di Social Media Manager.</p>
          <p><strong>Gli "Esecutori"</strong> e i <strong>"Consulenti Strategici"</strong>.</p>
          <p>Per i miei primi 2 anni ero un'Esecutrice. E probabilmente lo sei anche tu adesso.</p>
          <p>Gli Esecutori si svegliano la mattina e si ammazzano per creare contenuti, gestire profili, fare grafiche, rispondere a clienti che li trattano come schiavi. Vanno a dormire stanchi morti...</p>
          <p>...E il giorno dopo? Stessa storia.</p>
          <p>La loro strategia? Fare pi&ugrave; roba. Per pi&ugrave; persone. Pi&ugrave; in fretta. Fino a crepare.</p>

          <ul className="space-y-3">
            {[
              'Creare post e stories che nessuno misura in termini di fatturato',
              'Gestire 10-20 profili contemporaneamente perdendo la testa',
              'Rispondere a richieste assurde a qualsiasi ora del giorno',
              'Rincorrere clienti che pagano briciole e pretendono tutto'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2"><XCircle size={20} className="text-red-500 mt-0.5 shrink-0" /><span>{item}</span></li>
            ))}
          </ul>

          <p>Ma il problema vero non &egrave; il lavoro in s&eacute;.</p>
          <p>Il problema &egrave; che il modello "vendo il mio tempo" ha un <strong>tetto matematico invalicabile</strong>.</p>
          <p>La giornata ha 24 ore. Non una di pi&ugrave;.</p>
          <p>E se ogni tua ora vale 6,25&euro;... fai i conti. Non arriverai MAI a 10 mila euro al mese. <strong>&Egrave; matematicamente impossibile.</strong></p>

          <h3 className="text-xl font-extrabold text-red-600 mt-8">SMETTI DI VENDERE "GESTIONE SOCIAL" E INIZIA A VENDERE "SOLDI IN TASCA AI TUOI CLIENTI"</h3>
          <p>Esatto.</p>
          <p>Ho smesso di vendere pacchetti da 500&euro;. E ho iniziato a vendere sistemi da 2.000-5.000 euro.</p>
          <p>Perch&eacute; preferisco avere <strong>3-4 clienti che mi pagano 2.500&euro; ciascuno e mi rispettano</strong>... piuttosto che 20 clienti da 300&euro; che mi prosciugano l'anima.</p>
          <p><strong>Il vecchio modo? L'ho fatto. Fa schifo. Non ci torno.</strong></p>

          <h3 className="text-xl font-extrabold text-red-600 mt-8">ECCO L'IDEA DA 10.000&euro;/MESE DIETRO IL MODELLO THE WEALTHY SMM</h3>
          <p>Proprio adesso, mentre scorri queste parole...</p>
          <p>...Nel mondo del Social Media Management sta succedendo qualcosa di grosso.</p>
          <p>L'AI ha cambiato le carte in tavola.</p>
          <p>I tool sono accessibili a chiunque. Tuo cugino pu&ograve; "gestire i social".</p>
          <p>Questo ha scatenato una corsa al ribasso sui prezzi che sta ammazzando gli SMM tradizionali uno dopo l'altro.</p>
          <p>Il risultato? Migliaia di SMM che lavorano come bestie per pochi spicci, in un mercato dove tutti offrono la stessa cosa allo stesso prezzo.</p>
          <p>E la maggior parte di loro sta cercando una soluzione.</p>
          <p><strong>Indovina? Noi ce l'abbiamo.</strong></p>
          <p>E la cosa che ti far&agrave; saltare sulla sedia &egrave; questa: <span className="highlight"><strong>i clienti PREFERISCONO pagare di pi&ugrave;</strong></span>.</p>
        </div>
      </section>

      {/* ===== 7 LEZIONI ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">
            ECCO L'ESATTO SISTEMA IN 7 LEZIONI RIVELATO NEL MINI-CORSO THE WEALTHY SMM
          </h2>
          <p className="text-center text-lg text-gray-600 mb-8">Per passare da 500&euro; a 2.000-5.000&euro;/mese</p>

          <div className="space-y-4">
            {[
              { n: 1, title: 'LA TRAPPOLA DEI 500\u20AC', desc: 'Scoprirai perch\u00E9 il modello che stai usando \u00E8 matematicamente impossibile da scalare. E perch\u00E9 il problema non sei tu, \u00E8 il modello.' },
              { n: 2, title: 'I 3 ERRORI CHE TI TENGONO POVERO', desc: 'Il framework diagnostico per capire ESATTAMENTE dove stai sbagliando e perch\u00E9 ogni mese finisce allo stesso modo.' },
              { n: 3, title: 'IL RIPOSIZIONAMENTO PREMIUM', desc: 'Come smettere di essere "quello dei social" e diventare un consulente strategico che i clienti rispettano. In meno di 7 giorni.' },
              { n: 4, title: 'IL CLIENTE IDEALE DA 2-3K/MESE', desc: 'Chi cercare, dove trovarlo e come riconoscerlo al volo. Basta perdere tempo con chi non ha budget.' },
              { n: 5, title: 'COME CHIUDERE A 2-3K SENZA SVENDERTI', desc: 'I principi della vendita consulenziale per non sentirti mai pi\u00F9 dire "costa troppo" senza sapere cosa rispondere.' },
              { n: 6, title: 'LAVORARE 20 ORE, GUADAGNARE 5-10K', desc: 'Template, AI e sistemi per dimezzare le ore e raddoppiare il fatturato senza impazzire.' },
              { n: 7, title: 'LA TUA ROADMAP DA 10K/MESE', desc: 'Il piano d\'azione completo mese per mese. Dal giorno 1 al giorno 180. Senza lasciare nulla al caso.' }
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-extrabold text-lg shrink-0">{n}</div>
                <div>
                  <h3 className="font-extrabold text-lg mb-1">Lezione {n} &mdash; {title}</h3>
                  <p className="text-gray-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-lg mt-6 font-semibold">90 minuti totali di contenuto step-by-step. Niente fuffa. Niente teoria sterile. Solo quello che ti serve per cambiare il gioco.</p>
        </div>
      </section>

      {/* ===== BULLET POINTS "SCOPRIRAI" ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">ECCO COS'ALTRO SCOPRIRAI DENTRO THE WEALTHY SMM</h2>
          <ul className="space-y-4 text-base md:text-lg">
            {[
              'Come smettere di dire "gestione social" e iniziare a dire "sistema di acquisizione clienti" \u2014 una singola frase che cambia tutto (Lezione 3)',
              'Come identificare in 30 secondi se un potenziale cliente ha il budget per pagarti 2.000\u20AC \u2014 cos\u00EC non perdi pi\u00F9 tempo con chi tira sul prezzo (Lezione 4)',
              'Perch\u00E9 dire "gestione social a 500\u20AC" sta UCCIDENDO la tua carriera \u2014 e cosa dire al suo posto (Lezione 2)',
              'Il processo passo-passo per riposizionarti come consulente premium in 7 giorni netti (Lezione 3)',
              'La risposta esatta da dare quando un cliente ti dice "costa troppo" \u2014 e come trasformare quell\'obiezione in un contratto firmato (Lezione 5)',
              'Come usare l\'AI per creare contenuti in met\u00E0 del tempo \u2014 cos\u00EC puoi lavorare 20 ore a settimana (Lezione 6)',
              'Il framework per costruire offerte basate sul ROI \u2014 cos\u00EC il prezzo diventa irrilevante (Lezione 3)',
              'I 7 settori pi\u00F9 profittevoli per un SMM in Italia nel 2025-2026 (Lezione 4)',
              'I 3 errori fatali che il 95% dei SMM commette nelle call di vendita (Lezione 5)',
              'Come delegare le attivit\u00E0 a basso valore a VA, freelancer e automazioni (Lezione 6)',
              'La roadmap completa mese-per-mese per arrivare a 10K/mese \u2014 dal giorno 1 al giorno 180 (Lezione 7)'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg mt-8 text-center font-semibold">Se la libert&agrave; finanziaria, il rispetto dei clienti e il tempo per vivere la tua vita sono quello che cerchi...</p>
          <p className="text-xl text-center font-bold text-red-600">...Questo &egrave; il mini-corso che ti porta l&igrave;.</p>
        </div>
      </section>

      {/* ===== FINAL PRICING ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="red-headline text-2xl md:text-3xl text-center mb-8">
            L'<u>unico corso</u> che ti serve che ti mostra realmente come guadagnare <strong>TANTO</strong> come Social Media Manager nel mercato competitivo 2026 - <em>Garantito!</em>
          </h2>
          <PricingBox />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-[#FFF9E6] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="red-headline text-3xl md:text-4xl text-center mb-10">Domande frequenti</h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
            <FaqItem
              q={'"Ho gi\u00E0 visto video su YouTube e corsi gratuiti sul Social Media Management, questo mi serve davvero?"'}
              a={'I video su YouTube ti insegnano come creare un Reel carino o come usare Canva.\n\nThe Wealthy SMM ti insegna perch\u00E9 stai guadagnando 500\u20AC al mese nonostante sai fare tutte queste cose, come riposizionarti in modo che i clienti ti paghino 2.000-5.000\u20AC, come trovare quelli giusti, come chiuderli senza svenderti e come lavorare met\u00E0 delle ore.\n\nSe pensi che saper fare un bel post sia sufficiente per guadagnare bene, questo corso non fa per te.\n\nSe vuoi capire perch\u00E9 chi sa fare meno di te guadagna il triplo e vuoi invertire la situazione, The Wealthy SMM \u00E8 esattamente quello che ti serve.'}
            />
            <FaqItem
              q={'"Funziona anche se sono all\'inizio e non ho ancora clienti premium?"'}
              a={'Soprattutto se sei all\'inizio.\n\nPerch\u00E9 il momento peggiore per imparare queste cose \u00E8 DOPO aver preso 10 clienti a 300\u20AC che ti trattano come uno schiavo. A quel punto sei gi\u00E0 intrappolato.\n\nIl momento migliore \u00E8 ADESSO, prima di costruire abitudini sbagliate.\n\nSara non aveva mai avuto un cliente premium in vita sua. Oggi ne ha 4 che la pagano 2.500-3.000\u20AC al mese ciascuno.\n\nNon ti serve esperienza pregressa. Ti serve il metodo giusto.'}
            />
            <FaqItem
              q={'"Ma 7\u20AC sono pochi. \u00C8 davvero completo o \u00E8 solo un\'anteprima per vendermi qualcos\'altro?"'}
              a={'27\u20AC \u00E8 il prezzo reale. Pagamento unico. Accesso immediato. Zero abbonamenti. Zero sorprese sulla carta. Dentro ci sono 7 lezioni, ~90 minuti di contenuto step-by-step, pi\u00F9 5 regali del valore di 685\u20AC.\n\nIl corso \u00E8 completo cos\u00EC com\'\u00E8. Ti d\u00E0 il "cosa fare" e il "perch\u00E9" in modo cristallino.\n\nPoi s\u00EC, esiste un percorso avanzato \u2014 la SMM Academy \u2014 per chi vuole essere seguito personalmente. Ma \u00E8 una scelta tua, non un obbligo.\n\nMolti dopo il corso mi scrivono: "Marinela, ho gi\u00E0 cambiato approccio e ho alzato i prezzi solo con quello che ho imparato nelle 7 lezioni."'}
            />
            <FaqItem
              q={'"Non ho tempo di seguire un altro corso, lavoro gi\u00E0 80 ore a settimana"'}
              a={'Perfetto. Allora hai ANCORA MENO tempo da perdere facendo le cose nel modo sbagliato.\n\nIl corso dura ~90 minuti totali. Meno di un film su Netflix.\n\nE il punto del corso \u00E8 proprio questo: insegnarti a SMETTERE di lavorare 80 ore a settimana. A lavorarne 20-25 guadagnando di pi\u00F9.\n\nIl problema non \u00E8 che non hai tempo. Il problema \u00E8 che stai sprecando il tempo che hai lavorando con il modello sbagliato.\n\n90 minuti oggi possono risparmiarti anni di frustrazione.'}
            />
            <FaqItem
              q={'"Ho gi\u00E0 comprato corsi che non hanno funzionato. Perch\u00E9 questo dovrebbe essere diverso?"'}
              a={'Probabilmente quei corsi ti insegnavano a fare pi\u00F9 roba: pi\u00F9 post, pi\u00F9 stories, pi\u00F9 reels, pi\u00F9 engagement.\n\nThe Wealthy SMM ti insegna l\'opposto: a fare MENO roba per guadagnare DI PI\u00D9.\n\nQuei corsi ti insegnavano a diventare un esecutore pi\u00F9 veloce. Questo ti insegna a smettere di essere un esecutore.\n\nLa differenza? Quelli ti tenevano sulla Ruota Del Criceto e la facevano girare pi\u00F9 in fretta. Questo ti fa scendere dalla ruota.\n\nE se dopo averlo guardato pensi che sia uguale a tutto il resto, hai 30 giorni per chiedere il rimborso. Nessuna domanda.'}
            />
            <FaqItem
              q={'"Ma io non so vendere. Non sono capace di chiedere 2.000\u20AC a un cliente"'}
              a={'Nemmeno Sara sapeva vendere. Nemmeno Luca. Nemmeno Giulia.\n\nNessuno nasce sapendo vendere. Ma tutti possono imparare.\n\nLa Lezione 5 ti d\u00E0 i principi della vendita consulenziale. Il Closing Script Pack ti d\u00E0 le parole esatte da dire. Copia-incolla.\n\nNon devi diventare un venditore. Devi solo smettere di sminuirti e iniziare a presentare i tuoi servizi per quello che valgono.\n\nQuando un cliente fattura 300K all\'anno e tu gli porti anche solo un 10% in pi\u00F9, sono 30.000\u20AC. Chiedergli 2.000\u20AC al mese \u00E8 un AFFARE per lui.'}
            />
            <FaqItem
              q={'"Funziona solo per chi lavora in certi settori o va bene per qualsiasi SMM?"'}
              a={'Il metodo funziona per qualsiasi Social Media Manager che vuole smettere di vendere tempo e iniziare a vendere risultati.\n\nNon importa se lavori con ristoranti, e-commerce, professionisti, personal brand o B2B.\n\nNella Lezione 4 ti mostro i settori pi\u00F9 profittevoli \u2014 quelli dove i clienti hanno budget e capiscono il valore. Ma il framework di riposizionamento funziona in QUALSIASI nicchia.\n\nSe il tuo cliente guadagna soldi, tu puoi farti pagare bene per aiutarlo a guadagnarne di pi\u00F9. Fine.'}
            />
            <FaqItem
              q={'"Posso davvero passare da 500\u20AC a 2.000-5.000\u20AC in 30 giorni?"'}
              a={'Dipende da te.\n\nIl corso ti d\u00E0 il metodo, gli strumenti e il framework. In 30 giorni puoi riposizionarti, trovare i primi prospect giusti e iniziare le prime conversazioni da consulente strategico.\n\nAlcuni studenti hanno chiuso il primo cliente premium nel primo mese. Altri ci hanno messo 2-3 mesi. Nessuno ci ha messo un anno.\n\nLa velocit\u00E0 dipende da quanto in fretta implementi.\n\nMa una cosa \u00E8 certa: se non cambi il modello, fra 12 mesi sarai esattamente dove sei adesso. O peggio.'}
            />
            <FaqItem
              q={'"E se non mi piace, posso avere il rimborso?"'}
              a={'S\u00EC. Senza se e senza ma.\n\nHai 30 giorni di garanzia soddisfatti o rimborsati.\n\nSe per qualsiasi motivo \u2014 e dico qualsiasi \u2014 decidi che The Wealthy SMM non fa per te, mandami un\'email.\n\nTi rimborso i 7\u20AC. Ti lascio tenere il corso. E non ti chiedo nemmeno perch\u00E9.\n\nIl rischio \u00E8 zero. Tutto su di me.'}
            />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-red-600 py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-6">Non aspettare un altro mese a 500€</h2>
          <p className="text-red-100 text-lg mb-8">Scarica The Wealthy SMM adesso. <strong>27€</strong>. 7 lezioni. 5 bonus. Garanzia 30 giorni.</p>
          <a href={CTA_URL} className="uiverse-cta">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
            </div>
            <span>ACCEDI ADESSO A SOLI 27€</span>
          </a>
          <p className="text-red-200 text-sm mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> Garanzia 30 giorni | Pagamento sicuro
          </p>
        </div>
      </section>

      {/* ENGAGEMENT FEATURES */}
      <StickyCta />
      <SocialProofTicker />
      <ExitIntentPopup />

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Marinela Marku &mdash; The Wealthy SMM. Tutti i diritti riservati.</p>
        <p className="mt-2">Questo sito non fa parte di Facebook o Meta Inc. Disclaimer: i risultati mostrati non sono tipici.</p>
      </footer>
    </div>
  )
}
