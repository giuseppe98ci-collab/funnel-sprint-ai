import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ShieldCheck, CheckCircle, ChevronDown, ArrowRight, Star,
  TrendingUp, BadgeCheck, X, Check, AlertTriangle, Target,
  BarChart3, Flame, Lock, Crown, DollarSign,
  FileText, Bitcoin, GraduationCap, Droplets, Fuel
} from 'lucide-react'

const CTA_URL = '/guida-alla-crisi/api/checkout'

/* ===== COUNTDOWN HOOK ===== */
function useCountdown(storageKey, targetDate = null) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    let end
    if (targetDate) {
      end = targetDate.getTime()
    } else {
      end = localStorage.getItem(storageKey)
      if (!end) {
        end = Date.now() + 7 * 24 * 60 * 60 * 1000
        localStorage.setItem(storageKey, end)
      }
      end = Number(end)
    }
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
  }, [storageKey, targetDate])
  return timeLeft
}

/* ===== SCROLL ANIMATION HOOK ===== */
function useScrollAnimation() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('scroll-hidden')
          el.classList.add('scroll-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    el.classList.add('scroll-hidden')
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ===== EDITORIAL IMAGE ===== */
function EditorialImage({ src, alt }) {
  const ref = useScrollAnimation()
  return (
    <div ref={ref} className="my-8 flex justify-center">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full max-w-xl rounded-xl shadow-lg"
      />
    </div>
  )
}

/* ===== STICKY CTA BAR ===== */
function StickyCta() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('hero-section')
      const pricing = document.getElementById('pricing-section')
      if (!hero || !pricing) { setVisible(window.scrollY > 500); return }
      const heroBottom = hero.getBoundingClientRect().bottom
      const pricingTop = pricing.getBoundingClientRect().top
      const pricingBottom = pricing.getBoundingClientRect().bottom
      const inPricing = pricingTop < window.innerHeight && pricingBottom > 0
      setVisible(window.scrollY > 500 && heroBottom < 0 && !inPricing)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a href={CTA_URL} className={`sticky-cta-bar ${visible ? 'sticky-cta-visible' : ''}`}>
      ACCEDI ORA A SOLI 97&#8364; <ArrowRight size={18} />
    </a>
  )
}

/* ===== SOCIAL PROOF TICKER ===== */
const SOCIAL_PROOF_DATA = [
  ['Marco', 'Milano'], ['Luca', 'Roma'], ['Andrea', 'Napoli'],
  ['Giuseppe', 'Torino'], ['Alessandro', 'Bologna'], ['Matteo', 'Firenze'],
  ['Davide', 'Palermo'], ['Simone', 'Verona'], ['Riccardo', 'Bari'],
  ['Lorenzo', 'Padova'],
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
        <strong>{toast.name} da {toast.city}</strong> ha acquistato la Guida alla Crisi <em>{toast.mins} {toast.mins === 1 ? 'minuto' : 'minuti'} fa</em>
      </div>
    </div>
  )
}

/* ===== EXIT INTENT POPUP ===== */
function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(300)
  useEffect(() => {
    if (localStorage.getItem('nick_exit_shown')) return
    function onLeave(e) { if (e.clientY > 0) return; trigger() }
    document.addEventListener('mouseleave', onLeave)
    const mobileTimer = setTimeout(() => { if (window.innerWidth < 768) trigger() }, 45000)
    let triggered = false
    function trigger() {
      if (triggered) return
      triggered = true
      localStorage.setItem('nick_exit_shown', '1')
      setOpen(true)
      document.removeEventListener('mouseleave', onLeave)
    }
    return () => { document.removeEventListener('mouseleave', onLeave); clearTimeout(mobileTimer) }
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
        <h3 className="text-[#D42027] text-2xl md:text-3xl font-extrabold mb-3 text-center">Aspetta! Stai per perdere questa offerta...</h3>
        <p className="text-gray-600 text-center mb-4">La Guida alla Crisi a soli <strong className="text-[#D42027]">97&#8364;</strong> invece di 297&#8364;</p>
        <p className="text-center font-mono text-3xl font-bold text-[#D42027] mb-6">{mm}:{ss}</p>
        <div className="text-center">
          <CtaButton small />
        </div>
        <button className="mt-4 block mx-auto text-gray-400 text-sm hover:text-gray-600 transition-colors" onClick={() => setOpen(false)}>No grazie, non mi interessa</button>
      </div>
    </div>
  )
}

/* ===== CTA BUTTON ===== */
function CtaButton({ text = 'ACCEDI ORA A SOLI 97\u20AC', className = '', small = false }) {
  return (
    <div className={`text-center ${small ? 'py-2' : 'py-4'} ${className}`}>
      <a href={CTA_URL} className="uiverse-cta">
        <div className="svg-wrapper-1"><div className="svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
          </svg>
        </div></div>
        <span>{text}</span>
      </a>
      <div className="secure-badge">
        <ShieldCheck size={14} /> Guaranteed safe & secure checkout
      </div>
    </div>
  )
}

/* ===== COUNTDOWN BAR ===== */
function CountdownBar() {
  const t = useCountdown('nick_countdown_v2', new Date('2026-03-03T23:59:59'))
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <div className="bg-[#C41A1A] text-white text-center py-2 px-3">
      <div className="text-xs md:text-sm font-semibold flex items-center justify-center gap-2">
        <AlertTriangle size={14} />
        Offerta valida solo oggi — Lunedi i mercati aprono e questa guida varra 3 volte tanto.
        <span className="font-mono font-bold text-white ml-1">{t.d}g {pad(t.h)}h {pad(t.m)}m {pad(t.s)}s</span>
      </div>
    </div>
  )
}

/* ===== PLACEHOLDER IMAGE ===== */
function PlaceholderImg({ text, bg = '#F5F5F5', color = '#D42027', className = '', aspect = 'aspect-[3/4]' }) {
  return (
    <div className={`${aspect} rounded-xl flex items-center justify-center text-center p-4 font-bold text-sm ${className}`} style={{ background: bg, color, border: `2px solid ${color}30` }}>
      {text}
    </div>
  )
}

/* ===== TRUSTPILOT CARD ===== */
function TrustpilotCard({ name, city, text }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-[#FFD700] text-[#FFD700]" />)}
      </div>
      <p className="text-gray-600 mb-4 text-[15px] leading-relaxed">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D42027] to-[#a01a1f] flex items-center justify-center text-white font-bold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-black text-sm">{name}</p>
            <p className="text-xs text-gray-400">{city}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#D42027] flex items-center gap-1">
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
      <summary className="flex items-start justify-between cursor-pointer list-none font-bold text-black text-lg">
        <span>{q}</span>
        <ChevronDown size={20} className="shrink-0 mt-1 transition-transform group-open:rotate-180 text-[#D42027]" />
      </summary>
      <div className="mt-3 text-gray-500 leading-relaxed whitespace-pre-line">{a}</div>
    </details>
  )
}

/* ===== BONUS CARD ===== */
function BonusCard({ num, title, value, desc, icon: Icon, details, image }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-44 shrink-0">
          {image ? <img src={image} alt={title} className="w-full rounded-xl" loading="lazy" /> : <PlaceholderImg text={title} aspect="aspect-square" className="w-full" />}
        </div>
        <div>
          <p className="text-sm font-bold text-[#D42027] mb-1">BONUS {num}</p>
          <h3 className="text-xl md:text-2xl font-extrabold text-black mb-2 flex items-center gap-2">
            <Icon size={22} className="text-[#D42027]" /> {title}
          </h3>
          {value && <p className="text-sm font-bold text-[#D42027] mb-2">Valore: {value}</p>}
          <p className="text-gray-600 mb-3">{desc}</p>
          {details && (
            <ul className="space-y-2 text-sm text-gray-500">
              {details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-[#D42027] mt-0.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

/* ===== URGENZA FINALE ===== */
function UrgenzaFinale() {
  const t = useCountdown('nick_countdown_v2', new Date('2026-03-03T23:59:59'))
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <section className="bg-[#C41A1A] py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4">Tra poche ore i mercati aprono.</h2>
        <div className="text-white/80 text-lg mb-6 space-y-4 text-left max-w-2xl mx-auto">
          <p>Lunedi mattina il petrolio, l'oro, le borse e le crypto si muoveranno <em>in modo violento</em>. Lo Stretto di Hormuz e a rischio. L'Iran ha promesso che l'offensiva continuera. Le major oil hanno sospeso le spedizioni. Le tariffe delle petroliere sono <strong>triplicate</strong>.</p>
          <p>Puoi guardare tutto questo dal divano e <em>sperare</em> che i tuoi risparmi non ne risentano. Oppure puoi <strong>posizionarti dalla parte giusta</strong> prima che succeda.</p>
          <p>La guida, le sale segnali, il corso e l'ebook — tutto a <strong>97 euro</strong>. Con <strong>30 giorni</strong> di garanzia. Se non ti serve, ti ridanno tutto.</p>
          <p className="text-white font-bold text-center">Ma lunedi mattina, quando i grafici si muovono, <span className="underline decoration-white decoration-2 underline-offset-2">non puoi piu tornare indietro a oggi</span>.</p>
        </div>
        <p className="text-white/80 text-lg mb-4">Il prezzo torna a 297&#8364; tra:</p>
        <div className="flex justify-center gap-3 mb-8">
          {[
            { v: t.d, l: 'Giorni' },
            { v: pad(t.h), l: 'Ore' },
            { v: pad(t.m), l: 'Min' },
            { v: pad(t.s), l: 'Sec' },
          ].map(({ v, l }, i) => (
            <div key={i} className="bg-[#C41A1A] border-2 border-white rounded-xl px-4 py-3 min-w-[70px]">
              <p className="text-2xl md:text-3xl font-mono font-black text-white">{v}</p>
              <p className="text-xs text-white/70 uppercase">{l}</p>
            </div>
          ))}
        </div>
        <CtaButton text="ACCEDI ORA A SOLI 97&#8364;" />
        <p className="text-white/60 text-sm mt-4 flex items-center justify-center gap-1">
          <ShieldCheck size={14} /> Garanzia 30 giorni | Pagamento sicuro
        </p>
      </div>
    </section>
  )
}

/* ===== ANIMATED SECTION WRAPPER ===== */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useScrollAnimation()
  return (
    <div ref={ref} className={`${className} ${delay ? `scroll-delay-${delay}` : ''}`}>
      {children}
    </div>
  )
}

/* ===== MAIN APP ===== */
export default function App() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <CountdownBar />

      {/* ===== HERO ===== */}
      <section id="hero-section" className="bg-white py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D42027] font-bold text-[11px] md:text-sm uppercase tracking-widest mb-3">
            Per chi ha appena visto il webinar e vuole agire PRIMA che i mercati aprano lunedi
          </p>
          <h1 className="text-[24px] md:text-4xl lg:text-5xl font-black text-black mb-4 leading-[1.15] px-1">
            Mentre tutti vendono nel panico dopo gli <span className="text-[#D42027] font-extrabold">attacchi in Iran</span>, un gruppo ristretto di persone sta <span className="text-[#D42027] font-extrabold">guadagnando fino a 2.300€</span> con un piano da <span className="text-[#D42027] font-extrabold">soli 97€</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-6 leading-snug">
            La guida completa con le operazioni esatte da impostare su oro, petrolio, forex e crypto prima che <strong className="text-black">20 milioni di barili al giorno</strong> smettano di passare dallo Stretto di Hormuz.
          </p>
          <div className="max-w-md mx-auto mb-4">
            <img src="/guida-alla-crisi/assets/mockup-principale.png" alt="Guida alla Crisi - Nick Parodi" className="w-full rounded-lg" loading="eager" />
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Dentro trovi il piano operativo che sto usando <em>io in prima persona</em>. Non teoria. Non opinioni da telegiornale. Le mosse precise, asset per asset, con i livelli di ingresso e i target. Tutto quello che ti ho raccontato nel webinar, ma con <strong className="text-black">i numeri esatti</strong> e le <strong className="text-black">istruzioni passo-passo</strong>.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* ===== IL PROBLEMA ===== */}
      <section className="bg-[#F5F5F5] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-8">
            Amico mio, quello che e successo nelle ultime <strong>48 ore</strong> non ha precedenti.
          </h2>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>Khamenei e morto. Ucciso nel suo ufficio a Tehran durante l'<em>Operation Epic Fury</em>. Con lui <strong className="text-black">40</strong> funzionari iraniani, il comandante dei Pasdaran, il capo di stato maggiore. <strong className="text-black">201</strong> vittime totali confermate dalla Mezzaluna Rossa. <strong className="text-black">24</strong> province iraniane su <strong className="text-black">31</strong> colpite. Non e un raid chirurgico — e la <span className="underline decoration-[#D42027] decoration-2 underline-offset-2">piu grande operazione militare in Medio Oriente degli ultimi 30 anni</span>.</p>

            <EditorialImage src="/guida-alla-crisi/assets/crisis-tehran.jpg" alt="Skyline di Tehran avvolto da colonne di fumo dopo gli attacchi" />

            <p>E la risposta iraniana? I Pasdaran hanno lanciato missili su Tel Aviv, Dubai, Doha, Bahrain, Abu Dhabi e Kuwait. Un palazzo residenziale a Tel Aviv <em>distrutto</em>. Esplosione filmata a Palm Jumeirah. La <strong className="text-black">5a Flotta americana</strong> colpita in Bahrain. L'Iran ha dichiarato che <em>"l'offensiva continuera fino alla sconfitta decisiva del nemico"</em>. Dai, sul serio — quando nella storia recente hai sentito una cosa del genere?</p>

            <EditorialImage src="/guida-alla-crisi/assets/crisis-missiles.jpg" alt="Missili illuminano il cielo notturno sul Golfo Persico" />

            <p>Ora pensa a cosa succede lunedi mattina. Il Brent era a <strong className="text-black">70 dollari</strong> venerdi. Le major oil hanno sospeso le spedizioni attraverso lo Stretto di Hormuz — dove passano <strong className="text-black">20 milioni di barili al giorno</strong>, <span className="underline decoration-[#D42027] decoration-2 underline-offset-2">un quinto del consumo mondiale</span>. Le tariffe delle petroliere sulla rotta Medio Oriente-Cina sono gia <strong className="text-black">triplicate</strong>. Gli analisti parlano di Brent a <strong className="text-black">90-100 dollari</strong> in una singola giornata. La Borsa di Muscat ha gia perso il <strong className="text-black">3%</strong>. Lufthansa, Wizz Air, Virgin Atlantic hanno cancellato i voli. E i mercati europei e americani <em>non hanno ancora aperto</em>.</p>

            <EditorialImage src="/guida-alla-crisi/assets/crisis-markets.jpg" alt="Schermi di trading con numeri rossi e mercati in caduta" />

            <EditorialImage src="/guida-alla-crisi/assets/crisis-oil.jpg" alt="Barile di petrolio in fiamme, simbolo della crisi energetica" />

            <p className="text-xl font-bold text-black text-center">La domanda non e <em>SE</em> ci sara volatilita. La domanda e: <span className="underline decoration-[#D42027] decoration-2 underline-offset-2">tu sei posizionato dalla parte giusta?</span></p>
          </div>
        </div>
      </section>

      {/* ===== LA SOLUZIONE ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-8">
            Il Piano Operativo Asset per Asset
          </h2>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-8">
            <p>Ho scritto questa guida nel weekend, mentre studiavo ogni singolo aggiornamento <em>in tempo reale</em>. Non e un PDF generico sulla geopolitica. <strong className="text-[#D42027]">E un piano operativo — asset per asset — con le mosse esatte da fare prima che i mercati aprano.</strong></p>

            <EditorialImage src="/guida-alla-crisi/assets/asset-gold.jpg" alt="Lingotti d'oro — bene rifugio per eccellenza durante le crisi geopolitiche" />

            <p>Dentro ci trovi la mia analisi completa su <strong className="text-black">petrolio, oro, forex, crypto e indici azionari</strong>. Per ogni asset: cosa sta succedendo, cosa aspettarsi nei prossimi giorni, <span className="underline decoration-[#D42027] decoration-2 underline-offset-2">dove entrare, dove mettere lo stop, e dove prendere profitto</span>. Con i numeri. Con i grafici. Con gli scenari — base, intermedio, estremo.</p>

            <EditorialImage src="/guida-alla-crisi/assets/asset-forex.jpg" alt="Setup di trading forex con monitor multipli e grafici in tempo reale" />

            <p>E pensata per chi vuole <em>agire adesso</em>, non per chi vuole leggere un libro. Che tu abbia <strong className="text-black">500 euro</strong> o <strong className="text-black">50.000 euro</strong> da investire, trovi le indicazioni concrete per il tuo caso.</p>

            <EditorialImage src="/guida-alla-crisi/assets/asset-crypto.jpg" alt="Bitcoin con visualizzazione blockchain — opportunità crypto durante la crisi" />

            <p className="font-bold text-black">La differenza rispetto a tutto quello che trovi gratis online? Semplice: <em>i giornalisti ti raccontano cosa e successo</em>. Io ti dico <span className="underline decoration-[#D42027] decoration-2 underline-offset-2">cosa fare con i tuoi soldi</span>.</p>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== COSA IMPARERAI ===== */}
      <section className="bg-[#F5F5F5] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-10">
            Cosa Imparerai
          </h2>
          <div className="space-y-4">
            {[
              { icon: Droplets, title: 'Petrolio oltre i 100$', desc: <>Perche il petrolio potrebbe superare i <strong>100 dollari</strong> al barile e come posizionarti <em>PRIMA</em> che succeda — con livelli di ingresso e target precisi</> },
              { icon: Crown, title: 'Rally dell\'oro', desc: <>Come sfruttare il rally dell'oro che ogni crisi geopolitica degli ultimi <strong>30 anni</strong> ha generato — e perche questa volta il movimento potrebbe essere <em>ancora piu violento</em></> },
              { icon: DollarSign, title: 'Forex: le coppie giuste', desc: <>Quali coppie forex si muoveranno di piu (<strong>USD/JPY, EUR/USD, USD/CHF</strong>) e da che parte stare su ciascuna</> },
              { icon: Bitcoin, title: 'Bitcoin ed Ethereum', desc: <>La strategia su Bitcoin ed Ethereum durante le crisi geopolitiche — basata su <strong>dati storici</strong>, non su opinioni</> },
              { icon: TrendingUp, title: '3 settori che salgono sempre', desc: <>I <strong>3</strong> settori azionari che salgono <em>SEMPRE</em> durante i conflitti in Medio Oriente (e i <strong>3</strong> da cui scappare immediatamente)</> },
              { icon: Lock, title: 'Gestione posizioni aperte', desc: 'Come gestire il rischio se hai gia posizioni aperte — cosa chiudere, cosa tenere, cosa coprire' },
              { icon: AlertTriangle, title: 'Scenario estremo', desc: <>Cosa succede ai tuoi soldi se lo Stretto di Hormuz viene bloccato e il petrolio va a <strong>120 dollari</strong></> },
              { icon: Target, title: 'Piano d\'azione 15 minuti', desc: <>Le operazioni da impostare <strong>domenica sera</strong> per essere pronto lunedi all'apertura</> },
              { icon: BarChart3, title: 'Non vendere nel panico', desc: <>Perche vendere nel panico e quasi sempre la mossa sbagliata — e i dati di <strong>8</strong> crisi geopolitiche su <strong>10</strong> che lo dimostrano</> },
              { icon: Flame, title: '5 cose da NON fare', desc: <>Le <strong>5</strong> cose da NON fare assolutamente questa settimana (la numero <strong>3</strong> e quella che fa perdere piu soldi alla maggior parte delle persone)</> },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={i} delay={Math.min(i % 3 + 1, 3)}>
                <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5">
                  <div className="w-12 h-12 rounded-full bg-[#D42027]/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-[#D42027]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-black text-lg mb-1">{title}</h3>
                    <p className="text-gray-500">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BONUS ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-3">
            5 Bonus Inclusi nel Pacchetto
          </h2>
          <p className="text-center text-gray-500 mb-10">Valore totale dei bonus: <strong className="text-[#D42027]">935&#8364;</strong></p>
          <div className="space-y-6">
            <BonusCard
              num={1}
              title="Sala Segnali Gold — Cerebro Room"
              image="/guida-alla-crisi/assets/bonus-sala-gold.jpg"
              value="197€"
              desc="Accesso alla sala dove condivido in tempo reale i segnali operativi sull'oro. Non alert automatici generati da un bot. Segnali ragionati, con entry, stop loss e take profit. L'oro e l'asset numero uno durante le crisi geopolitiche — e questa settimana vedrai perche."
              icon={Crown}
            />
            <BonusCard
              num={2}
              title="Sala Segnali Forex + Gold — Cerebro Room Exclusive"
              image="/guida-alla-crisi/assets/bonus-sala-forex-gold.jpg"
              value="297€"
              desc="La sala premium con segnali su tutte le coppie forex principali piu l'oro. Questa settimana le coppie con il dollaro, lo yen e il franco svizzero faranno movimenti che normalmente richiedono mesi. Avere i segnali giusti in tempo reale puo fare la differenza tra un'operazione da +3% e una da -3%."
              icon={BarChart3}
            />
            <BonusCard
              num={3}
              title="Sala Crypto BTC e ETH"
              image="/guida-alla-crisi/assets/bonus-crypto.jpg"
              value="147€"
              desc="Segnali operativi su Bitcoin ed Ethereum. Le crypto reagiscono alle crisi geopolitiche in modo diverso dagli asset tradizionali — a volte come bene rifugio, a volte come asset di rischio. In questa sala ti dico esattamente cosa fare e quando, senza dover stare incollato ai grafici 24 ore su 24."
              icon={Bitcoin}
            />
            <BonusCard
              num={4}
              title='Corso "Le Basi del Trading"'
              image="/guida-alla-crisi/assets/bonus-corso-basi.jpg"
              value="197€"
              desc="Se hai poca esperienza, questo corso ti porta da zero a operativo. Non ti serve per capire la guida, ma ti serve per eseguire le operazioni in autonomia. Come aprire un conto, come piazzare un ordine, come gestire il rischio. Le basi vere, spiegate come le spiegherei a un amico."
              icon={GraduationCap}
            />
            <BonusCard
              num={5}
              title='Ebook "Basi del Trading + La Mia Strategia"'
              image="/guida-alla-crisi/assets/bonus-ebook.jpg"
              value="97€"
              desc="Il mio ebook con la strategia completa che uso ogni giorno. Non e la strategia per la crisi — e la strategia per sempre. Quella che mi ha permesso di costruire una community da 63.000 persone che si fidano delle mie analisi. La trovi solo qui."
              icon={FileText}
            />
          </div>
        </div>
      </section>

      {/* ===== RECENSIONI ===== */}
      <section className="bg-[#F5F5F5] py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#D42027] font-extrabold text-lg">Recensioni</span>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FFD700] text-[#FFD700]" />)}</div>
          </div>
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-10">Cosa Dicono i Membri della Community</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TrustpilotCard
              name="Marco Bianchi"
              city="Milano"
              text="Ho seguito il segnale sull'oro di Nick durante la crisi di ottobre e ho chiuso con un +8,4% in 3 giorni. La guida e scritta come parla lui: zero fuffa, solo cose da fare. Ho gia impostato le operazioni per lunedi."
            />
            <TrustpilotCard
              name="Alessandro Ferretti"
              city="Roma"
              text="Seguo Nick da 2 anni e i suoi segnali mi hanno fatto recuperare i 2.400 euro che avevo perso con un altro corso. Questa guida vale 10 volte quello che costa. I livelli sul petrolio che ha indicato a settembre erano precisi al centesimo."
            />
            <TrustpilotCard
              name="Luca Colombo"
              city="Torino"
              text="Non sapevo nulla di trading 6 mesi fa. Ho preso il corso base di Nick, poi ho iniziato a seguire i segnali. Primo mese: +340 euro. Niente di pazzesco, ma per uno che partiva da zero e un risultato vero. La guida sulla crisi e il passo successivo logico."
            />
            <TrustpilotCard
              name="Davide Moretti"
              city="Bologna"
              text="Quello che mi piace di Nick e che non ti vende sogni. Ti dice: questo e il rischio, questo e il potenziale, decidi tu. Con i segnali forex ho fatto +1.200 euro negli ultimi 4 mesi. Non tutti i mesi uguali, ma il bilancio e positivo."
            />
            <TrustpilotCard
              name="Roberto Conti"
              city="Napoli"
              text="Ho comprato la guida appena finito il webinar. L'ho letta in 40 minuti e ho gia capito cosa fare lunedi. Sono entrato nella sala Gold a dicembre e su 12 segnali, 9 erano in profitto. Non ho mai visto una percentuale cosi alta da nessuna parte."
            />
            <TrustpilotCard
              name="Stefano Ricci"
              city="Firenze"
              text="Ero scettico, lo ammetto. Ma dopo il webinar ho capito che Nick sa di cosa parla. Ho preso la guida, ho seguito le indicazioni sulla crypto e in 2 settimane ero a +5,2% su BTC. Per 97 euro e stato l'investimento migliore dell'anno."
            />
          </div>
        </div>
      </section>

      {/* ===== CHI E NICK PARODI ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-8">Chi e Nick Parodi?</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-56 shrink-0">
              <img src="/guida-alla-crisi/assets/nick-mockup-hero.jpg" alt="Nick Parodi" className="w-full rounded-xl object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 text-gray-600">
              <p>Non sono un guru. Non ho un Lamborghini da mostrarti. Quello che ho e una community Telegram da <strong className="text-[#D42027]">63.000 persone</strong> — <strong>33.000</strong> nel canale pubblico e <strong>30.000</strong> nel gruppo privato — che mi seguono ogni giorno perche <em>i numeri parlano</em>.</p>
              <p>Studio i mercati finanziari da anni. Mi occupo di trading su forex, oro, crypto e materie prime. Quello che mi distingue e che non ti dico cosa "potrebbe" succedere — ti dico cosa fare, con i numeri precisi. Entry, stop loss, take profit.</p>
              <p>Se mi segui gia, sai come lavoro. Se e la prima volta che mi incontri, chiedilo a chi mi conosce. O semplicemente prova — hai 30 giorni per decidere se ne e valsa la pena.</p>
            </div>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== PRICING BOX ===== */}
      <section id="pricing-section" className="bg-[#F5F5F5] py-12 md:py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-2 border-[#D42027] rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-center text-sm font-bold text-[#D42027] uppercase tracking-wide mb-2">Tutto quello che ottieni oggi</p>
            <h3 className="text-center text-2xl md:text-3xl font-extrabold text-black mb-6">Guida alla Crisi + 5 Bonus</h3>
            <div className="max-w-xs mx-auto mb-6">
              <img src="/guida-alla-crisi/assets/mockup-principale.png" alt="Guida alla Crisi - Pacchetto Completo" className="w-full rounded-lg" loading="lazy" />
            </div>
            {/* Value Stack */}
            <ul className="space-y-2 mb-6 text-sm text-gray-600">
              {[
                { item: 'Guida "Come Proteggere e Far Crescere il Tuo Capitale Mentre il Mondo Brucia"', value: '297€' },
                { item: 'Sala Segnali Gold (Cerebro Room)', value: '197€' },
                { item: 'Sala Segnali Forex + Gold (Cerebro Room Exclusive)', value: '297€' },
                { item: 'Sala Crypto BTC e ETH', value: '147€' },
                { item: 'Corso "Le Basi del Trading"', value: '197€' },
                { item: 'Ebook "Basi del Trading + La Mia Strategia"', value: '97€' },
              ].map(({ item, value }, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#D42027] mt-0.5 shrink-0" />
                  <span className="flex-1">{item}</span>
                  <span className="text-gray-400 line-through text-xs shrink-0">{value}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-sm text-gray-500 mb-2">Valore totale: <span className="line-through">1.232&#8364;</span></p>
            <div className="text-center mb-4">
              <span className="text-gray-400 line-through text-2xl mr-3">297&#8364;</span>
              <span className="text-5xl font-black text-[#D42027]">97&#8364;</span>
            </div>
            <p className="text-center text-sm text-gray-500 mb-6">Pagamento unico. Accesso immediato. Zero abbonamenti.</p>
            <a href={CTA_URL} className="uiverse-cta w-full">
              <div className="svg-wrapper-1"><div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div></div>
              <span>ACCEDI ORA A SOLI 97&#8364;</span>
            </a>
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Garanzia 30 giorni soddisfatti o rimborsati
            </p>
          </div>
        </div>
      </section>

      {/* ===== GARANZIA ===== */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-[#D42027]/10 border-2 border-[#D42027]/30 flex items-center justify-center">
            <ShieldCheck size={64} className="text-[#D42027]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-6">Garanzia 30 Giorni — Soddisfatto o Rimborsato</h2>
          <div className="text-lg leading-relaxed space-y-4 text-left max-w-2xl mx-auto text-gray-600">
            <p>Se la guida non ti aiuta a capire cosa fare con i tuoi soldi durante questa crisi, mi scrivi e ti restituisco tutto. <strong className="text-black">Nessuna domanda.</strong></p>
            <p>Tutto il rischio e sulle mie spalle, non sulle tue. Se dopo 30 giorni pensi che non valeva 97 euro, hai indietro ogni centesimo. Semplice.</p>
          </div>
          <CtaButton />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-[#F5F5F5] py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="gold-headline text-3xl md:text-4xl text-center mb-10">Domande Frequenti</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <FaqItem
              q="Non so nulla di trading — questa guida fa per me?"
              a={"Si. La guida e scritta in modo che anche chi non ha mai aperto un grafico possa capire cosa fare. E in piu ricevi il corso \"Le Basi del Trading\" come bonus, che ti porta da zero a operativo. Non ti serve essere un esperto — ti serve seguire le istruzioni."}
            />
            <FaqItem
              q="E troppo tardi per posizionarsi?"
              a={"No. I mercati europei e americani non hanno ancora aperto. Quello che e successo nel weekend e solo l'inizio. Gli analisti prevedono che la volatilita durera settimane, se non mesi. Sei ancora in tempo — ma non lo sarai per molto."}
            />
            <FaqItem
              q="Funziona davvero? Come faccio a fidarmi?"
              a={"Guarda la community: 63.000 persone non restano in un gruppo Telegram se i contenuti non valgono. Guarda le recensioni. E soprattutto: hai 30 giorni di garanzia. Se non funziona, riprendi i tuoi 97 euro. Il rischio e zero."}
            />
            <FaqItem
              q="Come ricevo il materiale?"
              a={"Subito dopo il pagamento ricevi un'email con il link per scaricare la guida PDF e accedere a tutti i bonus. Le sale segnali le trovi su Telegram — ricevi il link di invito nell'email. Tempo totale: 2 minuti."}
            />
            <FaqItem
              q="Posso avere il rimborso?"
              a={"Si, entro 30 giorni. Mi scrivi, ti rimborso. Nessuna procedura complicata, nessuna domanda. Se non sei soddisfatto, non voglio i tuoi soldi."}
            />
            <FaqItem
              q="Serve tanto capitale per iniziare?"
              a={"No. Nella guida trovi indicazioni per ogni livello di capitale — da 500 euro in su. Non ti serve un conto da 50.000 euro. Ti serve sapere dove metterli, quelli che hai. E questo e esattamente quello che trovi dentro."}
            />
          </div>
        </div>
      </section>

      {/* ===== URGENZA FINALE ===== */}
      <UrgenzaFinale />

      {/* ENGAGEMENT FEATURES */}
      <StickyCta />
      <SocialProofTicker />
      <ExitIntentPopup />

      {/* FOOTER */}
      <footer className="bg-[#F5F5F5] text-gray-500 text-center py-8 px-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Nick Parodi. Tutti i diritti riservati.</p>
        <p className="mt-2 text-gray-400">Disclaimer: i risultati mostrati non sono tipici. Il trading comporta rischi. Non investire denaro che non puoi permetterti di perdere.</p>
      </footer>
    </div>
  )
}
