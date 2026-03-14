import { CheckCircle, ArrowRight, Mail, Download, Play } from 'lucide-react'

const BOOKING_URL = '#prenota' // Giuseppe inserirà il link reale

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-green-50 border-b border-green-200 px-4 py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Congratulazioni! Sei Dentro.
          </h1>
          <p className="text-lg text-gray-600">
            Il tuo accesso a <strong>Funnel Sprint AI</strong> è confermato. Ecco i prossimi step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">I tuoi prossimi 4 step:</h2>

          <div className="space-y-5 mb-12">
            {[
              {
                icon: <Mail size={20} />,
                step: '1',
                title: 'Controlla la tua email',
                desc: 'Riceverai un\'email con il link per accedere a tutto il materiale. Controlla anche spam e promozioni.',
              },
              {
                icon: <Download size={20} />,
                step: '2',
                title: 'Scarica il Business DNA Template',
                desc: 'È il primo documento da compilare. Dedica 30-45 minuti — è il fondamento di tutto il sistema.',
              },
              {
                icon: <Play size={20} />,
                step: '3',
                title: 'Guarda il corso e configura i 5 Bot',
                desc: 'Segui le lezioni e configura ogni bot sulla piattaforma che preferisci (Poe, ChatGPT o Claude). 10-15 minuti per bot.',
              },
              {
                icon: <ArrowRight size={20} />,
                step: '4',
                title: 'Genera il tuo primo materiale',
                desc: 'Inizia dal Bot Analisi Mercato. Poi procedi con gli altri in ordine. In un weekend avrai tutto il marketing pronto.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-gray-50 rounded-xl p-5 md:p-6">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{item.title}</p>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Backend CTA - Prenotazione */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3">
              Vuoi che facciamo tutto noi?
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Se preferisci che il nostro team configuri i bot, compili il Business DNA e crei il tuo primo funnel completo — abbiamo un servizio Done-For-You.
            </p>
            <a
              href={BOOKING_URL}
              className="inline-block py-4 px-8 rounded-xl font-bold text-lg text-gray-900 transition-all duration-200 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #d4a843, #c9952e, #b8860b)' }}
            >
              Prenota una Call Gratuita — Servizio €997
            </a>
            <p className="mt-3 text-sm text-gray-400">30 minuti · Senza impegno · Solo su appuntamento</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 px-4 py-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Funnel Sprint AI — Il primo sistema AI che ti dà un team marketing completo in 5 bot.
        </p>
        <p className="mt-1 text-xs text-gray-400">© 2026 — Tutti i diritti riservati.</p>
      </footer>
    </main>
  )
}
