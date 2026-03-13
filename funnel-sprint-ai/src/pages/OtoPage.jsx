import CtaButton from '../components/CtaButton'

export default function OtoPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Banner */}
      <section className="bg-price-badge border-b-2 border-yellow-400 px-5 py-6 text-center">
        <p className="text-lg md:text-xl font-bold text-text-primary">
          ⏳ IL TUO ORDINE È IN FASE DI ELABORAZIONE...
        </p>
        <p className="text-sm text-text-secondary mt-1">Non chiudere questa pagina — hai un'opportunità esclusiva qui sotto.</p>
      </section>

      {/* OTO Content */}
      <section className="px-5 py-16 md:py-24">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-6 text-center">
            Vuoi Che Un Esperto Riveda il Tuo Funnel e Ti Dica Esattamente Cosa Migliorare?
          </h1>

          <p className="text-lg text-text-secondary mb-6 text-center">
            Hai appena acquistato il sistema. Ottima scelta. Ma c'è un modo per accelerare i risultati del 300%.
          </p>

          <div className="bg-bg-accent rounded-2xl p-6 md:p-8 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4">Ecco cosa include la Revisione Esperta:</h2>
            <ul className="space-y-3 text-lg text-text-secondary">
              <li>✅ <strong>Revisione completa</strong> del tuo Business DNA — controlliamo che ogni campo sia compilato al massimo</li>
              <li>✅ <strong>Feedback dettagliato</strong> sugli output dei 5 bot — cosa tenere, cosa migliorare, cosa riscrivere</li>
              <li>✅ <strong>Ottimizzazione del funnel</strong> — ti diciamo esattamente cosa cambiare per massimizzare le conversioni</li>
              <li>✅ <strong>Call 1-to-1 di 30 minuti</strong> via Zoom per rispondere a tutte le tue domande</li>
              <li>✅ <strong>Report scritto</strong> con tutte le correzioni e suggerimenti — tuo per sempre</li>
            </ul>
          </div>

          <div className="text-center mb-8">
            <p className="text-text-secondary mb-2">Valore della consulenza:</p>
            <p className="text-danger line-through text-xl font-bold mb-1">€497</p>
            <div className="inline-block bg-price-badge rounded-2xl px-8 py-4">
              <span className="text-4xl md:text-5xl font-black text-text-primary">€147</span>
            </div>
            <p className="mt-3 text-text-secondary">Solo per chi ha appena acquistato Funnel Sprint AI. Non sarà più disponibile a questo prezzo.</p>
          </div>

          <CtaButton
            text="SÌ, AGGIUNGI LA REVISIONE ESPERTA — €147"
            subtext="🔒 Pagamento sicuro · Garanzia 30 giorni · Slot limitati"
          />

          <div className="text-center mt-8">
            <a
              href="/grazie"
              className="text-text-secondary hover:text-text-primary underline text-sm transition-colors"
            >
              No grazie, procedi senza revisione →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
