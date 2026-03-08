import { useEffect } from 'react'
import Header from '../components/Header'
import CtaBox from '../components/CtaBox'
import ComparisonTable from '../components/ComparisonTable'
import ValueStack from '../components/ValueStack'
import TestimonialGrid from '../components/TestimonialGrid'
import FaqSection from '../components/FaqSection'
import FomoPopup from '../components/FomoPopup'

/* Fade-in observer */
function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="pt-28 pb-16 px-4 bg-[#0D0D0D] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(196,169,91,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[#C4A95B] text-sm md:text-base font-medium uppercase tracking-widest mb-6">
          Per chi vuole iniziare a guadagnare con il trading sull'oro
        </p>
        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight text-white mb-6">
          Come guadagnare <span className="gold-text">dai 300€ ai 500€ a Settimana</span> facendo trading <span className="gold-text">30 minuti al giorno</span> sull'asset più capitalizzato al mondo… <span className="gold-text">l'oro</span>
        </h1>
        <p className="text-base text-[#777] max-w-2xl mx-auto mb-10">
          Senza analisi tecnica, passare ore davanti ai grafici, rischiare di bruciare il conto, e anche se non hai mai fatto trading o hai un piccolo capitale
        </p>
        
        {/* Mockup */}
        <div className="max-w-4xl mx-auto relative">
          <img src="/hero-mockup.png" alt="Gold Profit System" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}

/* ===== COS'È IL GOLD PROFIT SYSTEM ===== */
function WhatIsSection() {
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8">
          Cos'è il Gold Profit System?
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>
            Il Gold Profit System è un sistema completo che ti permette di guadagnare con il trading sull'oro <strong className="text-white">senza esperienza, senza analisi tecnica e in soli 30 minuti al giorno</strong>.
          </p>
          <p>
            Ecco come funziona in 3 semplici passi:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center text-black font-bold">1</span>
              <div>
                <p className="text-white font-semibold">Ricevi il segnale</p>
                <p className="text-sm text-[#B0B0B0] mt-1">Ogni giorno ricevi nella Sala Segnali Gold un'operazione pronta con entry point, stop loss e take profit già calcolati.</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center text-black font-bold">2</span>
              <div>
                <p className="text-white font-semibold">Copia l'operazione</p>
                <p className="text-sm text-[#B0B0B0] mt-1">Apri il tuo broker, copia i parametri esatti del segnale. Ci vogliono meno di 5 minuti.</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center text-black font-bold">3</span>
              <div>
                <p className="text-white font-semibold">Raccogli i profitti</p>
                <p className="text-sm text-[#B0B0B0] mt-1">Il take profit scatta automaticamente. Tu incassi e aspetti il segnale successivo.</p>
              </div>
            </div>
          </div>
          <p>
            Non devi studiare nulla. Non devi passare ore davanti ai grafici. Non devi avere un grande capitale.
            <strong className="text-white"> Devi solo copiare.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ===== INTERVISTATO DA ===== */
function MediaLogos() {
  const logos = [
    { src: "/logo-affaritaliani.png", alt: "Affari Italiani" },
    { src: "/logo-italianews.png", alt: "Italia News Radio TV" },
    { src: "/logo-senzasoste.png", alt: "SenzaSoste" },
    { src: "/logo-inserto.png", alt: "L'Inserto Magazine" },
  ]
  return (
    <section className="py-12 px-4 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#777] text-sm uppercase tracking-widest mb-8">Intervistato da</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => (
            <div key={i} className="px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <img src={logo.src} alt={logo.alt} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== STORYTELLING ===== */
function Storytelling() {
  return (
    <section className="py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8">
          Gold Profit System è una scorciatoia
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>
            Il Gold Profit System non è nato dal nulla. È il risultato di <strong className="text-white">anni di esperienza, errori, e milioni di euro gestiti</strong>.
          </p>
          <p>
            Nick Parodi ha iniziato con 5€ su un conto demo. Oggi gestisce <strong className="text-white">17 milioni di euro</strong> per investitori privati e istituzionali.
          </p>
          <p>
            Ma la cosa che lo distingue non è il patrimonio gestito — è la <strong className="text-white">trasparenza</strong>. Nick pubblica ogni singola operazione. Ogni profitto. Ogni perdita. Tutto verificabile, tutto pubblico, da oltre 3 anni.
          </p>
          <p>
            Ha creato il Gold Profit System per un motivo semplice: permettere a <strong className="text-white">chiunque</strong> di accedere alle stesse operazioni che fa per i suoi clienti da milioni di euro.
          </p>
          <p>
            Non devi imparare a fare trading. Non devi diventare un analista. <strong className="text-white">Devi solo copiare quello che fa lui.</strong>
          </p>
          <p>
            È la scorciatoia più onesta che esista: prendi i segnali di chi ha già dimostrato di saper fare, copiali, e raccogli i risultati.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ===== COSA SIGNIFICA PER TE ===== */
function WhatItMeans() {
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-12">
          Cosa significa per te avere accesso al Gold Profit System nel 2026...
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Senza */}
          <div className="glass-card p-6 border-[rgba(239,68,68,0.3)]">
            <h3 className="text-[#EF4444] font-headline text-xl mb-6 text-center">❌ Senza Gold Profit System</h3>
            <ul className="space-y-3 text-[#B0B0B0] text-sm">
              {[
                "Continui a cercare la strategia perfetta senza mai trovarla",
                "Perdi soldi provando sistemi non verificati",
                "Passi ore davanti ai grafici senza capirci nulla",
                "Il tuo capitale si erode lentamente tra commissioni e perdite",
                "Lo stress del trading ti toglie il sonno",
                "Rimani fermo mentre l'oro continua a salire",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EF4444] mt-0.5">✗</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Con */}
          <div className="glass-card p-6 border-[rgba(196,169,91,0.4)]">
            <h3 className="text-[#C4A95B] font-headline text-xl mb-6 text-center">✅ Con Gold Profit System</h3>
            <ul className="space-y-3 text-[#B0B0B0] text-sm">
              {[
                "Ricevi segnali pronti da un esperto con 17M in gestione",
                "Operi solo 30 minuti al giorno, il resto è vita",
                "Zero analisi tecnica — copi e incassi",
                "Il tuo capitale è protetto dallo Zero Risk Protocol",
                "Fai trading dal telefono, ovunque tu sia",
                "Guadagni dai 300€ ai 500€ a settimana in modo consistente",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#22C55E] mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== DETTAGLIO 4 PRODOTTI ===== */
function ProductDetails() {
  const products = [
    {
      title: "Sala Segnali Gold",
      desc: "Il cuore del sistema. Ogni giorno ricevi operazioni pronte sull'oro con entry, stop loss e take profit. 3 anni di risultati verificati pubblicamente.",
      image: "/sala-gold.png",
    },
    {
      title: "Trading da Telefono",
      desc: "Setup completo per operare dal tuo smartphone. Quale broker usare, come impostare i trade in 2 minuti, notifiche istantanee.",
      image: "/corso-trading.png",
    },
    {
      title: "Zero Risk Protocol",
      desc: "Il protocollo di gestione del rischio di Nick. Come proteggere il capitale, quanto rischiare per trade, come non bruciare mai il conto.",
      image: "/bonus-zerorisk.png",
    },
    {
      title: "Piccolo Capitale, Grandi Risultati",
      desc: "Strategie dedicate a chi parte con 100-500€. Come massimizzare i rendimenti anche con un capitale ridotto, senza rischi eccessivi.",
      image: "/bonus-piccolo-capitale.png",
    },
  ]

  return (
    <section className="py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-12">
          Cosa ottieni accedendo adesso
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <div key={i} className="glass-card p-6 flex gap-5 items-start">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-[rgba(196,169,91,0.3)]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-headline text-lg mb-2">{p.title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== CHI È NICK ===== */
function NickBio() {
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-12">
          Chi è Nick Parodi?
        </h2>
        <div className="glass-card p-8 md:flex gap-8 items-start">
          {/* Nick Photo */}
          <div className="flex-shrink-0 w-40 h-40 mx-auto md:mx-0 mb-6 md:mb-0 rounded-2xl overflow-hidden border-2 border-[#C4A95B]/30">
            <img src="/nick-photo.jpg" alt="Nick Parodi" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-[#B0B0B0] text-sm leading-relaxed">
            <p className="text-white text-base">
              Nick Parodi è un trader professionista e gestore patrimoniale specializzato nell'oro.
            </p>
            <ul className="space-y-2">
              {[
                "→ 17 milioni di euro in gestione per clienti privati e istituzionali",
                "→ 3+ anni di track record pubblico e verificabile",
                "→ Specializzato esclusivamente nel trading sull'oro (XAUUSD)",
                "→ Intervistato da testate finanziarie nazionali",
                "→ Ha iniziato con un conto demo da 5€, oggi gestisce patrimoni a 7 cifre",
                "→ Fondatore della Sala Segnali Gold con centinaia di membri attivi",
                "→ Approccio trasparente: ogni operazione è pubblicata in tempo reale",
                "→ Creatore dello Zero Risk Protocol per la protezione del capitale",
              ].map((item, i) => (
                <li key={i} className="text-[#B0B0B0]">{item}</li>
              ))}
            </ul>
            <p>
              La sua missione è semplice: rendere il trading sull'oro <strong className="text-white">accessibile a tutti</strong>, non solo ai professionisti con anni di esperienza e grandi capitali.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== GARANZIA ===== */
function Guarantee() {
  return (
    <section className="py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-8 md:p-10 border-[rgba(196,169,91,0.4)]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="font-headline text-2xl md:text-3xl gold-text mb-4">
            Garanzia Soddisfatto o Rimborsato — 30 Giorni
          </h2>
          <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed">
            <p>
              Prova il Gold Profit System per 30 giorni interi. Se per qualsiasi motivo non sei soddisfatto, ti basta inviare una semplice email e riceverai il <strong className="text-white">rimborso completo</strong>. Nessuna domanda, nessuna complicazione.
            </p>
            <p>
              Il rischio è <strong className="text-white">tutto nostro</strong>. Se il sistema non fa per te, non perdi un centesimo. Questa è la fiducia che abbiamo nei risultati del Gold Profit System.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== SARÀ L'ULTIMO SISTEMA ===== */
function LastSystem() {
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-4xl gold-text mb-8">
          Sarà l'ultimo sistema di trading che comprerai
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed text-left">
          <p>
            Quanti corsi hai comprato che promettevano di insegnarti a fare trading? Quanti "guru" ti hanno venduto strategie che non funzionano?
          </p>
          <p>
            Il Gold Profit System è diverso perché <strong className="text-white">non ti chiede di imparare nulla</strong>. Non è un corso. Non è formazione. È un servizio operativo: ricevi segnali, copi, guadagni.
          </p>
          <p>
            Non devi diventare un trader. Devi solo seguire chi lo è già — e lo dimostra ogni giorno con risultati pubblici e verificabili.
          </p>
          <p className="text-white font-semibold">
            Questo è l'ultimo sistema che comprerai, perché è l'unico che ti serve.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ===== CLOSING ===== */
/* ===== MOSTRAMI LE PROVE ===== */
function ProofSection() {
  const proofs = [
    { image: "/proof-1.jpg", name: "Marco R.", city: "Milano", result: "+489$ in un giorno", desc: "Prima settimana con Gold Profit System" },
    { image: "/proof-2.jpg", name: "Luca D.", city: "Roma", result: "+1.247$ in un giorno", desc: "Dopo 2 mesi di segnali costanti" },
    { image: "/proof-3.jpg", name: "Andrea F.", city: "Torino", result: "+1.801$ in un giorno", desc: "La mia migliore giornata finora" },
    { image: "/proof-4.jpg", name: "Davide S.", city: "Napoli", result: "+889$ in un giorno", desc: "Operazione eseguita in 15 minuti" },
    { image: "/proof-5.jpg", name: "Francesco P.", city: "Bologna", result: "+407$ in un giorno", desc: "Partito con soli 500€ di capitale" },
  ]
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow gold-glow fade-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-4">
          "MOSTRAMI LE PROVE"
        </h2>
        <p className="text-center text-[#B0B0B0] mb-12">Ecco i risultati reali dei membri del Gold Profit System</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofs.map((p, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.result} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <p className="gold-text font-headline text-xl">{p.result}</p>
                <p className="text-[#B0B0B0] text-sm">{p.desc}</p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center text-black font-bold text-xs">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{p.name}</p>
                    <p className="text-[#666] text-xs">{p.city}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-4xl gold-text mb-8">
          Ora la scelta è tua… cosa fai?
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>
            Puoi chiudere questa pagina e tornare alla tua routine. Continuare a cercare la strategia perfetta, spendere centinaia di euro in corsi che non funzionano, e guardare l'oro salire senza di te.
          </p>
          <p>
            Oppure puoi investire <strong className="text-white">17€</strong> — meno di una pizza e una birra — e accedere a un sistema che ha già generato risultati reali per centinaia di persone.
          </p>
          <p>
            Con una <strong className="text-white">garanzia di 30 giorni</strong>, non rischi letteralmente nulla. Se non funziona, riavrai i tuoi soldi. Se funziona, avrai trovato il tuo sistema.
          </p>
          <p className="text-white font-semibold text-lg">
            La domanda non è se puoi permettertelo. La domanda è: puoi permetterti di NON provarlo?
          </p>
        </div>
      </div>
    </section>
  )
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="py-8 px-4 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center text-xs text-[#555] space-y-2">
        <p>© 2026 Gold Profit System. Tutti i diritti riservati.</p>
        <p>Questo sito non fa parte di Facebook™ o Google™. Disclaimer: i risultati possono variare. Il trading comporta rischi. Non investire denaro che non puoi permetterti di perdere.</p>
      </div>
    </footer>
  )
}

/* ===== MAIN SALES PAGE ===== */
export default function SalesPage() {
  useFadeIn()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      <FomoPopup />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Cos'è il Gold Profit System */}
      <WhatIsSection />
      
      {/* 3. CTA Box #1 */}
      <section className="py-16 px-4 bg-[#0D0D0D] fade-in">
        <CtaBox id="cta-1" />
      </section>
      
      {/* 4. Intervistato da */}
      <MediaLogos />
      
      {/* 5. Cosa dicono di Nick */}
      <TestimonialGrid title="Cosa dicono di Nick" />
      
      {/* 6. Storytelling */}
      <Storytelling />
      
      {/* 7. Comparison Table */}
      <ComparisonTable />
      
      {/* 8. Cosa significa per te */}
      <WhatItMeans />
      
      {/* 9. MOSTRAMI LE PROVE */}
      <ProofSection />
      
      {/* 10. Value Stack */}
      <ValueStack />
      
      {/* 11. CTA Box #2 */}
      <section className="py-16 px-4 bg-[#111111] fade-in">
        <CtaBox id="cta-2" />
      </section>
      
      {/* 12. Sarà l'ultimo sistema */}
      <LastSystem />
      
      {/* 13. Cosa ottieni */}
      <ProductDetails />
      
      {/* 14. Chi è Nick */}
      <NickBio />
      
      {/* 15. Garanzia */}
      <Guarantee />
      
      {/* 16. Closing */}
      <Closing />
      
      {/* 17. FAQ */}
      <FaqSection />
      
      {/* 18. CTA Finale */}
      <section className="py-16 px-4 bg-[#0D0D0D] fade-in">
        <CtaBox id="cta-final" />
      </section>
      
      <Footer />
    </div>
  )
}
