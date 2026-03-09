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
    <section className="pt-20 pb-10 md:pb-16 px-4 bg-[#0D0D0D] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(196,169,91,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[#C4A95B] text-sm md:text-base font-medium uppercase tracking-widest mb-6">
          Per chi vuole iniziare a guadagnare con il trading sull'oro
        </p>
        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight text-white mb-6">
          Genera <span className="gold-text">dai 300€ ai 500€ a settimana</span> con il trading copiando i segnali di un esperto con <span className="gold-text">17 milioni di euro in gestione</span> e 3 anni di risultati verificati — in soli <span className="gold-text">30 minuti al giorno</span>
        </h1>
        <p className="text-base text-[#777] max-w-2xl mx-auto mb-10">
          Senza analisi tecnica, passare ore davanti ai grafici, rischiare di bruciare il conto, e anche se non hai mai fatto trading o hai un piccolo capitale
        </p>
        
        {/* Mockup */}
        <div className="max-w-4xl mx-auto relative mb-8">
          <img src="/hero-mockup.png" alt="Gold Profit System" className="w-full h-auto" />
        </div>

        {/* CTA sotto mockup */}
        <CtaBox id="cta-hero" />
      </div>
    </section>
  )
}

/* ===== COS'È IL GOLD PROFIT SYSTEM ===== */
function WhatIsSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8">
          Cos'è il Gold Profit System?
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>
            Il Gold Profit System ti dà accesso diretto ai segnali operativi sull'oro di Nick Parodi — uno dei maggiori esperti di geopolitica applicata ai mercati finanziari in Italia…
          </p>
          <p>
            <strong className="text-white">…Gli stessi su cui mette i suoi soldi.</strong>
          </p>
          <p>
            Questo vuol dire che ricevi i segnali di ingresso e uscita sul telefono. Li copi. Attendi. Incassi… e fine.
          </p>
          <p>
            Con appena 30 minuti al giorno sei capace di crearti una rendita extra con il trading senza stare ore davanti a grafici, candele o news economiche che ti confondono.
          </p>
          <p>
            In più, nel pacchetto trovi un corso completo per imparare le basi del trading da zero e un ebook con la strategia personale di Nick spiegata step-by-step.
          </p>
          <p>
            Insomma…
          </p>
          <p>
            <strong className="text-white">Gold Profit System ti dà tutto quello che ti serve per iniziare a operare sull'oro già dalla prossima settimana</strong> — anche se adesso non sai nemmeno cos'è uno spread.
          </p>
          <p>
            Anche se non hai mai fatto trading in vita tua, non ti intendi di finanza o di economia… e anche se non hai molti soldi da investire e vedi il trading più come una passione.
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
    <section className="py-12 md:py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8">
          Gold Profit System è una scorciatoia
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>5 anni fa avevo 5 euro sul conto in banca.</p>
          <p>In più ero in debito di 15.500 euro.</p>
          <p>Soldi della mia famiglia che avevo bruciato cercando di fare trading come tutti gli altri.</p>
          <p>Seguendo le stesse strategie che insegnano ovunque.</p>
          <p>Quelle che "dovrebbero funzionare"...</p>
          <p><strong className="text-white">…Ma che nella realtà non funzionano MAI.</strong></p>
          <p>Ho provato l'analisi tecnica.</p>
          <p>Ore e ore a studiare candele giapponesi, supporti e resistenze…e il risultato?</p>
          <p><strong className="text-white">PERDITE SU PERDITE - una dietro l'altra</strong></p>
          <p>Ho provato RSI, MACD, Bande di Bollinger.</p>
          <p>Tutti indicatori che dovevano dirmi quando comprare e quando vendere. Risultato?</p>
          <p><strong className="text-white">Stop loss colpiti ogni volta.</strong></p>
          <p>Ero demotivato. Avevo chiuso i rapporti con gli amici.</p>
          <p>Litigavo con la mia ragazza ogni giorno.</p>
          <p>Poi ho smesso di seguire i "guru". Ho smesso di inseguire le strategie "magiche" di chi ti vuole vendere il sogno…</p>
          <p><strong className="text-white">…E ho iniziato a studiare SUL SERIO.</strong></p>
          <p>Ho studiato la <strong className="text-white">GEOPOLITICA</strong>.</p>
          <p>La <strong className="text-white">MACROECONOMIA</strong>.</p>
          <p>I <strong className="text-white">MOVIMENTI DELLE BANCHE CENTRALI</strong>.</p>
          <p>Perché ho capito una cosa: i mercati non si muovono per caso. Si muovono per ragioni precise.</p>
          <p><strong className="text-white">E se capisci quelle ragioni, puoi anticipare i movimenti.</strong></p>
          <p>Da quel momento tutto è cambiato.</p>
          <p>Adesso gestisco, insieme al mio team, più di <strong className="text-white">17 milioni di dollari</strong> in conti finanziati.</p>
          <p>Ho una community di oltre <strong className="text-white">25.000 membri attivi</strong>.</p>
          <p>Sono stato intervistato da testate giornalistiche nazionali.</p>
          <p>E negli ultimi 3 anni ho aiutato più di <strong className="text-white">1.000 persone</strong> a crearsi una rendita con il trading online…</p>
          <p><strong className="text-white">…Da 100, 200, 300€ al giorno.</strong></p>
          <p>Persone normali.</p>
          <p>Come te.</p>
          <p>Che non sapevano niente di trading online.</p>
        </div>
      </div>
    </section>
  )
}

/* ===== COSA SIGNIFICA PER TE ===== */
function WhatItMeans() {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8 md:mb-12">
          Cosa significa per te avere accesso al Gold Profit System nel 2026...
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>Una volta dentro, non dovrai più chiederti…</p>
          <p><strong className="text-white">…"Cosa compro?" o "quando entro?"</strong></p>
          <p>Riceverai i miei segnali operativi sull'oro direttamente sul telefono. Segnali basati su geopolitica, macroeconomia e la mia lunga esperienza sul campo.</p>
          
          <div className="space-y-3">
            <p className="flex items-start gap-2"><span className="text-[#EF4444]">❌</span> Non dovrai più preoccuparti di studiare grafici per ore.</p>
            <p className="flex items-start gap-2"><span className="text-[#EF4444]">❌</span> Non dovrai più preoccuparti di bruciare il conto per un errore o un'operazione andata male.</p>
            <p className="flex items-start gap-2"><span className="text-[#EF4444]">❌</span> Non dovrai più preoccuparti di non sapere quando uscire da un'operazione.</p>
            <p className="flex items-start gap-2"><span className="text-[#EF4444]">❌</span> E non dovrai più preoccuparti di perderti le opportunità migliori — perché te le manderò io.</p>
          </div>

          <p>Al contrario…</p>

          <div className="space-y-3">
            <p className="flex items-start gap-2"><span className="text-[#22C55E]">✅</span> Potrai svegliarti la mattina, prendere il caffè, aprire il telefono... e trovare un segnale operativo già pronto. Copiarlo in 2 minuti. E tornare a vivere la tua giornata.</p>
            <p className="flex items-start gap-2"><span className="text-[#22C55E]">✅</span> Potrai finalmente vedere il tuo conto di trading crescere giorno dopo giorno, invece di pregare che non scenda.</p>
            <p className="flex items-start gap-2"><span className="text-[#22C55E]">✅</span> Potrai operare ovunque ti trovi — a lavoro, in palestra, in vacanza — con il telefono in tasca e i segnali che arrivano in automatico.</p>
            <p className="flex items-start gap-2"><span className="text-[#22C55E]">✅</span> Potrai iniziare anche con un piccolo capitale e vederlo moltiplicarsi nel tempo, senza la paura di perderlo.</p>
            <p className="flex items-start gap-2"><span className="text-[#22C55E]">✅</span> E potrai smettere di sperare che "prima o poi le cose cambieranno da sole" — perché avrai uno strumento concreto che lavora per te. Ogni giorno.</p>
          </div>

          <p><strong className="text-white">Questo è quello che il Gold Profit System rende possibile.</strong></p>
          <p>Ed è esattamente ciò che stanno già vivendo più di 1.000 persone che hanno deciso di fidarsi del mio sistema.</p>
          <p className="gold-text font-semibold text-lg">Accedi al Gold Profit System per soli 17€ (invece di 97€).</p>
        </div>
      </div>
    </section>
  )
}

/* ===== DETTAGLIO 4 PRODOTTI ===== */
function ProductDetails() {
  const products = [
    {
      title: "Gold Profit System",
      desc: "Sala segnali Gold — I segnali operativi di Nick sull'oro, ogni giorno, direttamente sul tuo telefono. Corso \"Le basi del trading\" + Ebook \"La mia strategia\" inclusi.",
      image: "/sala-gold.png",
    },
    {
      title: "Trading da telefono",
      desc: "Come fare trading ovunque tu sia senza stare ore davanti al computer. Configuri tutto una volta e operi in 2 minuti dal telefono ovunque tu sia.",
      image: "/corso-trading.png",
    },
    {
      title: "Zero Risk Protocol",
      desc: "Come fare trading azzerando la probabilità di bruciare il conto. Le regole di gestione del rischio che il 90% dei trader non conosce (e non conoscerà)",
      image: "/bonus-zerorisk.png",
    },
    {
      title: "Piccolo capitale, Grandi risultati",
      desc: "Come iniziare con 100€ e moltiplicarli nel tempo. Esempi reali di quanto puoi generare grazie all'interesse composto anche partendo da cifre minime.",
      image: "/bonus-piccolo-capitale.png",
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8 md:mb-12">
          Cosa ottieni accedendo adesso al Gold Profit System investendo soli 17€ (invece di 97€)
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
    <section className="py-12 md:py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-8 md:mb-12">
          Chi è Nick Parodi?
        </h2>
        <div className="glass-card p-8 md:flex gap-8 items-start">
          {/* Nick Photo */}
          <div className="flex-shrink-0 w-40 h-40 mx-auto md:mx-0 mb-6 md:mb-0 rounded-2xl overflow-hidden border-2 border-[#C4A95B]/30">
            <img src="/nick-photo.jpg" alt="Nick Parodi" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-[#B0B0B0] text-sm leading-relaxed">
            <p className="text-white text-base">
              Non sono l'ennesimo "guru" che ha scoperto il trading ieri e oggi vende corsi su Instagram. Sono uno che opera, guadagna e aiuta altre persone a farlo ogni singolo giorno.
            </p>
            <ul className="space-y-3">
              {[
                "→  Da 5 euro sul conto e 15.500 euro di debiti a trader professionista con oltre 17 milioni di dollari gestiti in conti finanziati — costruito da zero, senza raccomandazioni, senza soldi di famiglia, senza scorciatoie;",
                "→  Oltre 1.000 persone seguite personalmente nel percorso da \"principiante che perde soldi\" a trader che genera dai 100 ai 300 euro al giorno — con risultati documentati e verificabili;",
                "→  Creatore di un sistema di trading automatico basato su intelligenza artificiale che è costato 1.3 milioni di euro sviluppare — lo stesso sistema che oggi lavora 24/7 per centinaia di persone;",
                "→  Gestisce una community di oltre 25.000 membri attivi — non follower passivi, ma persone che ogni giorno seguono le sue analisi, i suoi segnali e le sue previsioni sui mercati;",
                "→  Intervistato dalle principali testate giornalistiche italiane quando scoppia una crisi geopolitica, quando la Fed alza i tassi, quando i mercati tremano — perché i giornalisti sanno che le sue analisi hanno peso e che 9 volte su 10 ci prende;",
                "→  Esperto di geopolitica applicata ai mercati finanziari — non analisi tecnica da manuale, ma lo studio delle decisioni di Putin, Trump, Xi Jinping, delle banche centrali e dei flussi di capitale che DAVVERO muovono i prezzi;",
                "→  Ha previsto il rally del 2022 durante l'invasione russa dell'Ucraina — mentre tutti vendevano nel panico, lui ha aperto posizioni precise e ha fatto +40% in 3 settimane;",
                "→  Ha investito anni di studio, milioni in tecnologia e migliaia di ore di operatività — così tu non devi farlo. Ha già pagato il prezzo degli errori al posto tuo;",
                "→  Ogni giorno opera sui mercati, invia segnali alla community e analizza gli eventi geopolitici — non è uno che \"faceva trading 5 anni fa e ora fa solo corsi\". È nel mercato. Ogni giorno. Con i suoi soldi in gioco;",
                "→  Ha visto centinaia di trader bruciarsi il conto seguendo strategie che non funzionano, guru che vendono fumo e indicatori che un giorno dicono BUY e il giorno dopo SELL — e sa esattamente come evitarlo perché ci è passato in prima persona;",
              ].map((item, i) => (
                <li key={i} className="text-[#B0B0B0]">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== GARANZIA ===== */
function Guarantee() {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-8 md:p-10 border-[rgba(196,169,91,0.4)]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="font-headline text-2xl md:text-3xl gold-text mb-4">
            Gold Profit System è coperto dalla Garanzia "Soddisfatto o Rimborsato" di 30 giorni
          </h2>
          <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed text-left">
            <p>Se per qualsiasi motivo — e dico qualsiasi — decidi che il Gold Profit System non fa per te, mandami un messaggio entro 30 giorni.</p>
            <p><strong className="text-white">Ti rimborso ogni singolo centesimo.</strong></p>
            <p>Nessuna domanda.</p>
            <p>Nessuna giustificazione richiesta.</p>
            <p>Nessun problema.</p>
            <p>Scrivi "rimborso", ricevi i soldi indietro, fine della storia.</p>
            <p><strong className="text-white">Il rischio è completamente su di me.</strong></p>
            <p>Perché sono così sicuro? Perché so cosa c'è dentro.</p>
            <p>So quanto vale.</p>
            <p>E so che quando riceverai il primo segnale, lo copierai sul tuo conto,</p>
            <p>E vedrai il profitto entrare... capirai anche tu che appena 17€ è un insulto rispetto a quello che stai ricevendo.</p>
            <p>Perché stai accedendo agli stessi identici segnali su cui metto i miei soldi.</p>
            <p><strong className="text-white">OGNI GIORNO.</strong> Gli stessi che hanno permesso a più di 1.000 persone di generare dai 100 ai 300 euro al giorno.</p>
            <p>Ma anche se non fossi d'accordo, hai 30 giorni per cambiare idea.</p>
            <p><strong className="text-white">Zero rischio.</strong></p>
            <p>Tutta la pressione è su di me, esattamente come deve essere.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== SARÀ L'ULTIMO SISTEMA ===== */
function LastSystem() {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#111111] section-glow fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-4xl gold-text mb-4">
          OFFERTA LANCIO — Accedi al Gold Profit System per soli 17€
        </h2>
        <p className="text-[#B0B0B0] text-lg mb-8">Sarà l'ultimo "sistema di trading" che comprerai. Perché dopo non te ne serviranno altri</p>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed text-left">
          <p>
            Ho messo dentro tutto quello che ho imparato, tutto quello che uso io stesso ogni giorno, dentro questo sistema. Così puoi saltare anni di errori, di soldi buttati e di strategie che non funzionano — e iniziare direttamente da ciò che funziona davvero.
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
    <section className="py-12 md:py-20 px-4 bg-[#111111] section-glow gold-glow fade-in">
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
    <section className="py-12 md:py-20 px-4 bg-[#0D0D0D] fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-4xl gold-text mb-8">
          Ora la scelta è tua… cosa fai?
        </h2>
        <div className="space-y-6 text-[#B0B0B0] text-base leading-relaxed">
          <p>Ora tocca a te decidere.</p>
          <p>Puoi iniziare a ricevere i segnali operativi sull'oro di uno dei maggiori esperti di trading e geopolitica in Italia... e generare dai 50 ai 300 euro al giorno.</p>
          <p>Oppure puoi chiudere questa pagina e continuare come stai facendo adesso.</p>
          <p><strong className="text-white">Stesse strategie. Stessi risultati. Stessa frustrazione.</strong></p>
          <p>Il prezzo qui non conta.</p>
          <p>Perché tra un secondo capirai che tutto questo non ti costa praticamente niente...</p>
          <p>Anzi. Alla fine dei conti si ripaga da solo. E ti fa guadagnare.</p>
          <p>Pensaci.</p>
          <p>Ti sto dando accesso allo stesso sistema di segnali che ha già permesso a più di 1.000 persone di generare dai 100 ai 300 euro al giorno.</p>
          <p>Persone normali. Come te. Che non sapevano niente di trading.</p>
          <p>E il tutto è coperto da una garanzia di 30 giorni soddisfatto o rimborsato.</p>
          <p>Quindi la vera domanda NON è se puoi permettertelo...</p>
          <p>Perché dai... <strong className="text-white">stiamo parlando di 17 euro.</strong></p>
          <p>Li spendi senza pensarci per una pizza e una birra il sabato sera.</p>
          <p>Quei 17 euro li spenderai comunque.</p>
          <p><strong className="text-white">La vera domanda è: per cosa?</strong></p>
          <p>Per l'ennesima cavolata su Amazon che finisce nel cassetto dopo due giorni...</p>
          <p>…Oppure per qualcosa che può farti guadagnare soldi veri e cambiarti la situazione finanziaria per sempre?</p>
          <p className="text-white font-semibold text-lg">Clicca il pulsante qui sotto e accedi adesso a Gold Profit System.</p>
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
      <section className="py-10 md:py-16 px-4 bg-[#0D0D0D] fade-in">
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
      <section className="py-10 md:py-16 px-4 bg-[#111111] fade-in">
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
      <section className="py-10 md:py-16 px-4 bg-[#0D0D0D] fade-in">
        <CtaBox id="cta-final" />
      </section>
      
      <Footer />
    </div>
  )
}
