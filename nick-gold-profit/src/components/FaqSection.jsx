import { useState } from 'react'

const FAQS = [
  {
    q: "Perché costa così poco? Qual è il trucco?",
    a: "Il prezzo è così basso perché si tratta di una promozione di lancio per renderlo accessibile al maggior numero di persone possibile. Non dipendo dalla vendita di questo prodotto per vivere — ho già le mie entrate dal trading e dalla gestione di oltre 17 milioni di dollari in conti finanziati. Il mio obiettivo è farti entrare nel mondo del trading sull'oro nel modo giusto, senza farti spendere una fortuna."
  },
  {
    q: "Cos'è esattamente il Gold Profit System?",
    a: "Il Gold Profit System è un pacchetto completo che include: la sala segnali Gold dove ricevi i miei segnali operativi sull'oro ogni giorno, il corso \"Le basi del trading\" per chi parte da zero, e il mio ebook \"La mia strategia\" dove ti spiego il metodo che uso personalmente. In più ricevi 3 bonus gratuiti per proteggerti, operare dal telefono e iniziare anche con poco capitale."
  },
  {
    q: "È l'ennesimo \"sistema per fare soldi facili\"?",
    a: "No. Non ti prometto milioni dal giorno alla notte. Ti do accesso ai segnali operativi di un trader con più di 3 anni di risultati verificati, 17 milioni gestiti e oltre 1.000 persone che stanno già generando risultati concreti. I risultati dipendono da te e dal tuo impegno. Ma gli strumenti che ti do sono gli stessi che uso io. Ogni giorno."
  },
  {
    q: "Per chi è questo sistema?",
    a: "Per chiunque voglia iniziare a guadagnare con il trading sull'oro senza dover diventare un analista finanziario. Che tu sia un dipendente che vuole un'entrata extra, uno studente, un imprenditore, o qualcuno che ha già provato e ha fallito. Il motivo? Il Gold Profit System funziona perché il lavoro lo faccio io. Tu copi."
  },
  {
    q: "In cosa è diverso da tutti gli altri corsi di trading?",
    a: "Non ti sto vendendo un corso teorico da guardare e dimenticare. Ti sto dando accesso ai miei segnali operativi REALI — quelli su cui metto i miei soldi. In più hai la formazione base per capire cosa stai facendo e tre bonus strategici per proteggerti, operare ovunque e partire anche con poco."
  },
  {
    q: "C'è supporto o assistenza?",
    a: "Sì. All'interno della sala segnali hai accesso alla community dove puoi fare domande, ricevere supporto e confrontarti con altri che stanno facendo lo stesso percorso. Compreso me medesimo (Nick Parodi)."
  },
  {
    q: "Quanto tempo ci vuole per vedere i risultati?",
    a: "I segnali li ricevi da subito, quindi puoi iniziare a operare già dal primo giorno. I risultati concreti dipendono dal tuo capitale, dalla tua disciplina e dal tuo impegno. Ma gli strumenti per generare profitti li hai in mano dal momento in cui accedi."
  },
  {
    q: "C'è una Garanzia di Rimborso?",
    a: "Sì, certamente. Ecco come funziona… Accedi al Gold Profit System, prova tutto, applica i segnali. Se non sei completamente soddisfatto, mandaci un messaggio entro 30 giorni e ti rimborsiamo tutto. Senza fare domande."
  }
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-20 px-4 bg-[#0D0D0D] gold-glow">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-4">
          Domande frequenti
        </h2>
        <p className="text-center text-[#B0B0B0] mb-12">Hai bisogno di aiuto? <a href="mailto:support@nickparodi.com" className="text-[#C4A95B] hover:underline">support@nickparodi.com</a></p>
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
