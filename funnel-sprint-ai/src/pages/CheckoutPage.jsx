import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircle, ShieldCheck, Lock, ArrowRight, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const stripePromise = loadStripe('pk_live_51T5j0PPbCvQnn6IOvN7DaXtZZVFLQfXuVlPbJfvHhHkHTbfYeJcbMqOg7VJB8kYZSG3bL1Y1HBUr7zNzZVxe2oeK00UOdpRqcW')

const BUMP_PRICE = 19
const BASE_PRICE = 17

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#dc2626' },
  },
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bumpAdded, setBumpAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = BASE_PRICE + (bumpAdded ? BUMP_PRICE : 0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const savedEmail = params.get('email') || localStorage.getItem('fsa_email') || ''
    setEmail(savedEmail)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      // 1. Create PaymentIntent via our API
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, bumpAdded }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Errore nella creazione del pagamento')

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${firstName} ${lastName}`,
            email,
            phone,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message)
      } else if (paymentIntent.status === 'succeeded') {
        localStorage.setItem('fsa_email', email)
        navigate(`/oto?email=${encodeURIComponent(email)}`)
      }
    } catch (err) {
      setError(err.message || 'Si è verificato un errore. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Funnel Sprint AI</h1>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Lock size={14} /> Checkout sicuro
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-8">

          {/* LEFT — Form + Bump + CTA */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Completa il tuo ordine</h2>

            {/* Contact Fields */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Mario"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cognome *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Rossi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email migliore..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">Riceverai qui l'accesso al corso e ai bonus</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Telefono *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+39 333 123 4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Stripe Card Element */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <CreditCard size={16} /> Dati carta di pagamento
              </label>
              <div className="border border-gray-300 rounded-lg px-4 py-3">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>

            {/* BUMP OFFER */}
            <div
              onClick={() => setBumpAdded(!bumpAdded)}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed p-5 transition-all ${
                bumpAdded
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-yellow-400 bg-amber-50/60 hover:border-yellow-500'
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
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

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* CTA Button */}
            <button
              type="submit"
              disabled={loading || !stripe}
              className="w-full py-4 rounded-full font-bold text-lg text-white transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0D9488' }}
            >
              <Lock size={18} />
              {loading ? 'Elaborazione...' : `PAGA ORA — €${total}`}
              {!loading && <ArrowRight size={18} />}
            </button>

            {/* Trust badges */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Guaranteed safe & secure checkout</span>
                <span className="text-gray-300">|</span>
                <span>Powered by <strong>Stripe</strong></span>
              </div>
              <div className="flex items-center justify-center gap-3 opacity-60">
                <img src="https://img.icons8.com/color/36/visa.png" alt="Visa" className="h-6" />
                <img src="https://img.icons8.com/color/36/mastercard-logo.png" alt="Mastercard" className="h-6" />
                <img src="https://img.icons8.com/color/36/amex.png" alt="Amex" className="h-6" />
                <img src="https://img.icons8.com/color/36/paypal.png" alt="PayPal" className="h-6" />
                <img src="https://img.icons8.com/color/36/apple-pay.png" alt="Apple Pay" className="h-6" />
                <img src="https://img.icons8.com/color/36/google-pay.png" alt="Google Pay" className="h-6" />
              </div>
              <p className="text-xs text-gray-400">Garanzia 30 giorni soddisfatto o rimborsato</p>
            </div>
          </form>

          {/* RIGHT — Order Summary (sticky) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:sticky md:top-8">
              <h3 className="font-extrabold text-gray-900 mb-4 text-lg">Riepilogo ordine</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Corso Funnel Sprint AI</span>
                  <span className="font-bold">€{BASE_PRICE}</span>
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

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
