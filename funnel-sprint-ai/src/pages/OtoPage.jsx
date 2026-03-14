import { useState, useEffect } from 'react'
import { Clock, CheckCircle, ShieldCheck, ArrowRight, XCircle } from 'lucide-react'

export default function OtoPage() {
  const [minutes, setMinutes] = useState(14)
  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s === 0) {
          setMinutes(m => m > 0 ? m - 1 : 0)
          return 59
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Banner urgenza */}
      <div className="bg-red-600 text-white py-3 px-4 text-center">
        <p className="font-bold text-sm md:text-base flex items-center justify-center gap-2">
          <Clock size={18} /> ASPETTA — Il tuo ordine è stato completato! Hai un'offerta esclusiva che scade tra {minutes}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            ✅ Pagamento di €17 confermato
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Vuoi Che <span className="text-red-600">Controlliamo Personalmente</span> il Tuo Lavoro e Ti Diciamo Esattamente Cosa Migliorare?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hai il sistema. Hai i bot. Ma se vuoi essere <strong>sicuro al 100%</strong> che stai facendo tutto giusto, questa è la tua occasione.
          </p>
        </div>

        {/* Cosa include */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">Ecco cosa ottieni con la Call di Revisione:</h2>
          <div className="space-y-4">
            {[
              { title: 'Revisione completa del Business DNA', desc: 'Controlliamo che ogni campo sia compilato al massimo per ottenere output migliori dai bot' },
              { title: 'Feedback dettagliato sugli output dei bot', desc: 'Cosa tenere, cosa migliorare, cosa riscrivere — riga per riga' },
              { title: 'Ottimizzazione del funnel', desc: 'Ti diciamo esattamente cosa cambiare nella landing, nelle email, nelle ads per massimizzare le conversioni' },
              { title: 'Call 1-to-1 di 30-45 minuti via Zoom', desc: 'Io e te, faccia a faccia. Rispondiamo a TUTTE le tue domande' },
              { title: 'Report scritto con tutte le correzioni', desc: 'Un documento con ogni suggerimento — tuo per sempre, da consultare quando vuoi' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Senza vs Con */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-red-200 bg-red-50 rounded-xl p-5">
            <h3 className="font-extrabold text-red-600 mb-3 flex items-center gap-2"><XCircle size={20} /> Senza la revisione:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>❌ Rischi di lanciare con errori nel Business DNA</li>
              <li>❌ Copy che "sembra buono" ma non converte</li>
              <li>❌ Nessuno che ti dice cosa migliorare</li>
              <li>❌ Sprechi budget in ads non ottimizzate</li>
            </ul>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <h3 className="font-extrabold text-green-600 mb-3 flex items-center gap-2"><CheckCircle size={20} /> Con la revisione:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Business DNA ottimizzato al 100%</li>
              <li>✅ Copy revisionato da un esperto</li>
              <li>✅ Feedback actionable su ogni pezzo</li>
              <li>✅ Lanci con sicurezza totale</li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-8">
          <p className="text-gray-500 mb-1">Valore della consulenza:</p>
          <p className="text-gray-400 line-through text-xl font-bold">€497</p>
          <div className="inline-block bg-gray-900 rounded-2xl px-10 py-5 mt-2">
            <span className="text-5xl font-black text-white">€97</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">Solo per chi ha appena acquistato Funnel Sprint AI. Non sarà più disponibile a questo prezzo.</p>
        </div>

        {/* CTA */}
        <a
          href="/grazie"
          className="block w-full text-center py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
        >
          SÌ, AGGIUNGI LA REVISIONE ESPERTA — €97 <ArrowRight size={18} className="inline ml-1" />
        </a>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-400"><ShieldCheck size={14} className="text-green-500" /> Pagamento sicuro</div>
          <div className="flex items-center gap-1 text-xs text-gray-400"><ShieldCheck size={14} className="text-green-500" /> Garanzia 30 giorni</div>
        </div>

        {/* Skip */}
        <div className="text-center mt-6">
          <a href="/grazie" className="text-gray-400 hover:text-gray-600 underline text-sm transition-colors">
            No grazie, procedi senza revisione →
          </a>
        </div>
      </div>
    </main>
  )
}
