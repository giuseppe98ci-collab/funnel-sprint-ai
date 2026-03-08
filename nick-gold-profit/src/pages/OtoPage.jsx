import { useEffect } from 'react'
import Header from '../components/Header'
import CountdownTimer from '../components/CountdownTimer'

export default function OtoPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Confetti / Success */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#22C55E] to-[#4ADE80] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-headline text-3xl md:text-5xl gold-text mb-4">
              Congratulazioni, ce l'hai fatta!
            </h1>
            <p className="text-[#B0B0B0] text-lg max-w-xl mx-auto">
              Il tuo accesso al Gold Profit System è confermato. Ma prima di andare alla tua area riservata, ho un'opportunità esclusiva per te...
            </p>
          </div>

          {/* Timer */}
          <div className="mb-10">
            <p className="text-[#C4A95B] text-sm uppercase tracking-widest mb-3">Questa offerta scade tra</p>
            <CountdownTimer />
          </div>

          {/* OTO Offer */}
          <div className="glass-card p-8 md:p-10 text-left border-[rgba(196,169,91,0.4)] mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C4A95B]/20 text-[#C4A95B] mb-4">
              OFFERTA ESCLUSIVA — SOLO PER TE
            </span>
            
            <h2 className="font-headline text-2xl md:text-3xl gold-text mb-6">
              Cerebro Room Exclusive
            </h2>

            <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed mb-8">
              <p>
                Hai appena fatto il primo passo con il Gold Profit System. Ora immagina di avere accesso alla <strong className="text-white">stanza operativa privata</strong> di Nick — quella dove condivide le analisi avanzate, le strategie macro, e le operazioni più aggressive che non pubblica da nessun'altra parte.
              </p>
              <p>
                La <strong className="text-white">Cerebro Room</strong> è il livello successivo. Non è per tutti — è per chi vuole andare oltre i segnali base e capire <strong className="text-white">perché</strong> il mercato si muove in un certo modo.
              </p>
              <p>Ecco cosa include:</p>
              <ul className="space-y-3">
                {[
                  "Analisi macro giornaliera di Nick sul mercato dell'oro",
                  "Operazioni avanzate con rapporto rischio/rendimento superiore",
                  "Sessioni live settimanali di Q&A con Nick",
                  "Accesso al gruppo ristretto Cerebro (max 100 membri)",
                  "Strategie su altri asset correlati all'oro (argento, dollaro, bond)",
                  "Priority support — risposte entro 24h direttamente da Nick",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C4A95B] mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Il prezzo normale della Cerebro Room è <span className="price-old text-lg">197€</span>. Ma siccome hai appena acquistato il Gold Profit System, hai accesso a questa offerta irripetibile:
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-[#777] text-sm mb-1">Prezzo normale: <span className="price-old">197€</span></p>
              <p className="font-headline text-5xl md:text-6xl gold-text">SOLO 67€</p>
              <p className="text-[#22C55E] font-semibold mt-2">Risparmi 130€ — Solo in questa pagina</p>
            </div>

            {/* Mockup */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[#C4A95B]/20 to-[#E5D4A1]/10 border border-[rgba(196,169,91,0.2)] flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="gold-text font-headline text-lg">Cerebro Room</p>
                <p className="text-[#777] text-sm mt-1">Accesso Esclusivo</p>
              </div>
            </div>

            {/* CTA */}
            <button className="cta-btn cta-pulse w-full text-xl py-5 mb-4">
              AGGIUNGI CEREBRO ROOM — 67€ →
            </button>
          </div>

          {/* Skip */}
          <a href="#" className="text-[#777] text-sm underline hover:text-[#999] transition">
            No grazie, preferisco operare solo sull'oro →
          </a>
        </div>
      </div>
    </div>
  )
}
