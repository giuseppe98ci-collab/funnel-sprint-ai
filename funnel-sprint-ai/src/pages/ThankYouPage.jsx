import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="bg-bg-accent px-5 py-16 md:py-24 text-center">
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-14 h-14 text-success" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
            Congratulazioni! Il Tuo Acquisto È Confermato.
          </h1>
          <p className="text-lg text-text-secondary">
            Benvenuto in Funnel Sprint AI. Stai per avere il tuo team marketing personale.
          </p>
        </div>
      </section>

      {/* Accesso */}
      <section className="px-5 py-16 md:py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Ecco i prossimi step:</h2>

          <div className="space-y-4 mb-12">
            {[
              {
                step: '1',
                title: 'Controlla la tua email',
                desc: 'Riceverai un\'email con il link per accedere a tutto il materiale. Controlla anche la cartella spam.',
              },
              {
                step: '2',
                title: 'Scarica il Business DNA Template',
                desc: 'È il primo documento da compilare. Dedica 30-45 minuti a rispondere a tutte le domande — è il fondamento di tutto il sistema.',
              },
              {
                step: '3',
                title: 'Configura i 5 Bot',
                desc: 'Segui i tutorial per configurare ogni bot sulla piattaforma che preferisci (Poe, ChatGPT o Claude). 10-15 minuti per bot.',
              },
              {
                step: '4',
                title: 'Genera il tuo primo materiale',
                desc: 'Inizia dal Bot Analisi Mercato — è il fondamento. Poi procedi con gli altri in ordine. In un weekend avrai tutto.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-bg-secondary rounded-xl p-5 md:p-6 text-left">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-text-primary text-lg">{item.title}</p>
                  <p className="text-text-secondary mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Soft CTA */}
          <div className="bg-bg-accent border border-blue-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Vuoi che facciamo tutto noi?</h3>
            <p className="text-text-secondary text-lg mb-6">
              Se preferisci che il nostro team configuri i bot, compili il Business DNA e crei il tuo primo funnel completo — abbiamo un servizio Done-For-You.
            </p>
            <a
              href="#prenota-call"
              className="inline-block bg-accent hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Prenota una Call Gratuita — Servizio €997
            </a>
            <p className="mt-3 text-sm text-text-secondary">30 minuti · Senza impegno · Solo su appuntamento</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-secondary px-5 py-8 text-center">
        <p className="text-sm text-text-secondary italic">
          Funnel Sprint AI — Il primo sistema AI italiano che ti dà un team marketing completo in 5 bot.
        </p>
        <p className="mt-2 text-xs text-text-secondary">© 2026 — Tutti i diritti riservati.</p>
      </footer>
    </main>
  )
}
