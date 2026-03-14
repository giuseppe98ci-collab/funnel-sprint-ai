import { useState, useEffect } from 'react'
import { CheckCircle, ShieldCheck, Lock, ArrowRight } from 'lucide-react'

const BUMP_PRICE = 19

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [bumpAdded, setBumpAdded] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const savedEmail = params.get('email') || localStorage.getItem('fsa_email') || ''
    setEmail(savedEmail)
  }, [])

  const total = 17 + (bumpAdded ? BUMP_PRICE : 0)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Funnel Sprint AI</h1>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Lock size={14} /> Checkout sicuro
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-5 gap-8">

          {/* Left - Form */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Completa il tuo ordine</h2>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email migliore..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Riceverai qui l'accesso al corso e ai bonus</p>
            </div>

            {/* BUMP OFFER */}
            <div
              onClick={() => setBumpAdded(!bumpAdded)}
              className={`relative cursor-pointer rounded-xl border-2 p-5 mb-6 transition-all ${
                bumpAdded
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-yellow-400 bg-yellow-50 hover:border-yellow-500'
              }`}
            >
              <div className="absolute -top-3 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Offerta Speciale — Solo Ora
              </div>

              <div className="flex gap-4 items-start mt-2">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-1 ${
                  bumpAdded ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
                }`}>
                  {bumpAdded && <CheckCircle size={16} className="text-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <img src="/mockup-creativo-gemini.png" alt="Bot Creativo Gemini" className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg">Aggiungi il Bot Creativo Gemini per Statiche</p>
                      <p className="text-sm text-gray-600">Il tuo designer AI che crea visual ads professionali in 2 minuti</p>
                    </div>
                  </div>

                  <ul className="space-y-1 text-sm text-gray-700 mb-3">
                    <li className="flex items-start gap-1.5"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> Statiche ads professionali — niente più Canva brutto</li>
                    <li className="flex items-start gap-1.5"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> 10-20 reference di design reali incluse</li>
                    <li className="flex items-start gap-1.5"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> Layout ottimizzati per ogni formato ads</li>
                    <li className="flex items-start gap-1.5"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> Template colori e font per brand consistency</li>
                  </ul>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">€97</span>
                    <span className="text-2xl font-black text-green-600">+€{BUMP_PRICE}</span>
                    <span className="text-xs text-gray-500">aggiunti al tuo ordine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              <Lock size={18} /> PAGA ORA — €{total} <ArrowRight size={18} />
            </button>
            <div className="flex items-center justify-center gap-4 mt-3">
              <img src="/secure-checkout.png" alt="Pagamento sicuro" className="max-w-[240px] opacity-80" />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Garanzia 30 giorni soddisfatto o rimborsato</p>
          </div>

          {/* Right - Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-8">
              <h3 className="font-extrabold text-gray-900 mb-4 text-lg">Riepilogo ordine</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Corso Funnel Sprint AI</span>
                  <span className="font-bold">€17</span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs">
                  <span>+ 5 Bot AI Bonus (GRATIS)</span>
                  <span className="line-through">€585</span>
                </div>
                {bumpAdded && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-semibold">+ Bot Creativo Gemini</span>
                    <span className="font-bold">€{BUMP_PRICE}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-extrabold text-gray-900 text-lg">Totale</span>
                  <span className="font-black text-2xl text-green-600">€{total}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Pagamento sicuro con Stripe</div>
                <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Accesso immediato dopo il pagamento</div>
                <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Garanzia 30 giorni soddisfatto o rimborsato</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
