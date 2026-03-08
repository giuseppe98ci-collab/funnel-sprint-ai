import { useState } from 'react'

const FAQS = [
  {
    q: "Devo avere esperienza di trading per usare Gold Profit System?",
    a: "No, assolutamente. Il sistema è progettato per chi parte da zero. Ricevi segnali pronti da copiare — non devi analizzare grafici, studiare pattern o avere competenze tecniche. Se sai usare uno smartphone, puoi farlo."
  },
  {
    q: "Quanto tempo ci vuole ogni giorno?",
    a: "30 minuti al giorno, massimo. Ricevi il segnale, apri l'operazione, imposti stop loss e take profit, e vai avanti con la tua giornata. Molti membri lo fanno durante la pausa pranzo."
  },
  {
    q: "Quanto capitale mi serve per iniziare?",
    a: "Puoi iniziare anche con 100-200€. Uno dei bonus inclusi ('Piccolo Capitale, Grandi Risultati') è specificamente pensato per chi parte con cifre ridotte. Non servono migliaia di euro."
  },
  {
    q: "Il trading sull'oro non è rischioso?",
    a: "Ogni forma di trading comporta rischi, ma il Gold Profit System include lo 'Zero Risk Protocol' — un sistema di gestione del rischio che protegge il tuo capitale. Non opererai mai alla cieca."
  },
  {
    q: "Come ricevo i segnali?",
    a: "Tramite la Sala Segnali Gold, accessibile dal telefono o dal computer. Ricevi notifiche in tempo reale con entry point, stop loss e take profit già calcolati. Devi solo copiare."
  },
  {
    q: "Posso fare trading dal telefono?",
    a: "Sì, il BONUS 1 'Trading da Telefono' ti mostra esattamente come operare comodamente dal tuo smartphone, ovunque tu sia."
  },
  {
    q: "C'è una garanzia?",
    a: "Sì, hai una garanzia Soddisfatto o Rimborsato di 30 giorni. Se il sistema non fa per te, scrivi una email e ricevi il rimborso completo. Zero rischi."
  },
  {
    q: "Perché costa solo 17€ invece di 97€?",
    a: "È un'offerta di lancio a tempo limitato. Vogliamo che il maggior numero possibile di persone provi il sistema e veda i risultati. Il prezzo tornerà a 97€ presto."
  }
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-20 px-4 bg-[#0D0D0D] gold-glow">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-12">
          Domande Frequenti
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-semibold text-white text-base">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#C4A95B] shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`faq-answer ${openIdx === i ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-[#B0B0B0] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
