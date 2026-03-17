import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircle, ShieldCheck, Lock, ArrowRight, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const stripePromise = loadStripe('pk_live_51T5j0PPbCvQnn6IOvN7DaXtZZVFLQfXuVlPbJfvHhHkHTbfYeJcbMqOg7VJB8kYZSG3bL1Y1HBUr7zNzZVxe2oeK00UOdpRqcW')

const BUMP_PRICE = 19
const BASE_PRICE = 17

function CheckoutForm({ paymentIntentId }) {
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

  // Update PaymentIntent amount when bump changes
  useEffect(() => {
    if (!paymentIntentId) return
    fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bumpAdded, paymentIntentId }),
    }).catch(() => {})
  }, [bumpAdded, paymentIntentId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    // Validate form fields
    if (!firstName || !lastName || !email || !phone) {
      setError('Compila tutti i campi obbligatori.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Save form data for redirect recovery
      localStorage.setItem('fsa_checkout_form', JSON.stringify({ firstName, lastName, email, phone, bumpAdded }))
      localStorage.setItem('fsa_email', email)

      // 1. Confirm payment with Stripe via PaymentElement
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`,
              email,
              phone,
            },
          },
          return_url: `${window.location.origin}/checkout?pi=${paymentIntentId}`,
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message)
        setLoading(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 2. Confirm order in GHL
        await fetch('/api/confirm-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            firstName,
            lastName,
            email,
            phone,
            bumpAdded,
          }),
        })

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
        <div className="flex flex-col md:grid md:grid-cols-5 gap-8">

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

            {/* Stripe PaymentElement — shows Card, Apple Pay, Google Pay, etc. */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <CreditCard size={16} /> Metodo di pagamento
              </label>
              <PaymentElement options={{
                layout: 'tabs',
                wallets: { applePay: 'auto', googlePay: 'auto' },
              }} />
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

          {/* RIGHT — Product Showcase Sidebar */}
          <div className="md:col-span-2 md:order-2">
            <div className="rounded-2xl p-6 md:sticky md:top-8 text-center space-y-6 bg-white border border-gray-200">

              {/* 1. Product Mockup Display */}
              <div>
                <img
                  src="/mockup-main.png"
                  alt="Funnel Sprint AI"
                  className="mx-auto w-56 drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 24px rgba(212,168,67,0.18))' }}
                />
                <div className="flex items-center justify-center gap-2 mt-4">
                  {['/mockup-analisi-mercato.png', '/mockup-vsl-writer.png', '/mockup-ads-creator.png', '/mockup-landing-copy.png', '/mockup-email-sequences.png'].map((src) => (
                    <img key={src} src={src} alt="" className="w-10 h-10 rounded-lg object-cover opacity-80 hover:opacity-100 transition-opacity" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
              </div>

              {/* 2. ECCO COSA OTTERRAI */}
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-wider mb-4" style={{ color: '#D4A843' }}>
                  Ecco cosa otterrai
                </h3>
                <ul className="text-left space-y-3 text-sm">
                  {[
                    { name: 'Corso Funnel Sprint AI (5 Moduli Video)', desc: 'Il sistema completo per creare il tuo marketing con l\'AI in un weekend' },
                    { name: 'Bot #1 — Analisi Mercato AI', desc: 'Analizza competitor, pain point e opportunità in 2 minuti' },
                    { name: 'Bot #2 — VSL Writer AI', desc: 'Genera script video di vendita pronti da registrare' },
                    { name: 'Bot #3 — Ads Creator AI', desc: '6-10 varianti ads Facebook/Instagram pronte per il testing' },
                    { name: 'Bot #4 — Landing Page Copy AI', desc: 'Copy completo per la tua sales page, ottimizzato per mobile' },
                    { name: 'Bot #5 — Email Sequence AI', desc: '5-7 email pronte per il tuo autoresponder' },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-2">
                      <span className="text-green-500 text-base mt-0.5 shrink-0">✅</span>
                      <div>
                        <span className="font-bold block" style={{ color: '#D4A843' }}>{item.name}</span>
                        <span className="italic text-gray-500 text-xs">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Savings Banner */}
              <div className="rounded-xl py-4 px-5" style={{ background: 'linear-gradient(135deg, #D4A843 0%, #B8860B 100%)' }}>
                <p className="text-sm text-white/80">
                  Valore totale: <span className="line-through">€782</span>
                </p>
                <p className="text-3xl font-black text-white mt-1">Oggi solo €17</p>
              </div>

              {/* 4. Social Proof Bar */}
              <div className="flex items-center justify-center gap-3 rounded-full py-2 px-4 mx-auto bg-gray-100">
                <div className="flex -space-x-2">
                  {['M', 'A', 'L', 'S', 'G'].map((initial, i) => (
                    <div
                      key={initial}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                      style={{
                        backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'][i],
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-gray-600 text-xs">847 marketer hanno già il loro sistema AI</span>
              </div>

              {/* 5. Testimonial */}
              <div className="px-2">
                <p className="italic text-sm leading-relaxed text-gray-700">
                  &ldquo;Prima perdevo 3 giorni a scrivere copy per i miei clienti. Ora con i bot di Giuseppe genero tutto in 2 ore. Il ROI? Ho venduto €4.200 di servizi nel primo mese usando i materiali generati.&rdquo;
                </p>
                <div className="mt-3">
                  <p className="font-bold text-gray-900 text-sm">— Andrea M.</p>
                  <p className="italic text-gray-500 text-xs">Digital Marketer</p>
                  <p className="text-xs mt-1" style={{ color: '#16A34A' }}>
                    <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: '#16A34A' }}></span>
                    Cliente Verificato
                  </p>
                </div>
              </div>

              {/* 6. Guarantee Badge */}
              <div className="flex items-center justify-center gap-2 rounded-lg py-3 px-4 mx-auto border" style={{ borderColor: '#D4A843', backgroundColor: 'rgba(212,168,67,0.06)' }}>
                <ShieldCheck size={22} style={{ color: '#D4A843' }} />
                <span className="text-sm font-semibold" style={{ color: '#D4A843' }}>30 giorni soddisfatto o rimborsato</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState(null)
  const [paymentIntentId, setPaymentIntentId] = useState(null)
  const [initError, setInitError] = useState('')

  useEffect(() => {
    // Check if returning from a redirect (e.g. 3DS)
    const params = new URLSearchParams(window.location.search)
    const piFromUrl = params.get('pi')
    const redirectStatus = params.get('redirect_status')

    if (piFromUrl && redirectStatus === 'succeeded') {
      // Returning from redirect — confirm order in GHL
      const email = localStorage.getItem('fsa_email') || ''
      const savedForm = JSON.parse(localStorage.getItem('fsa_checkout_form') || '{}')
      fetch('/api/confirm-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: piFromUrl,
          firstName: savedForm.firstName || 'N/A',
          lastName: savedForm.lastName || 'N/A',
          email: savedForm.email || email || 'N/A',
          phone: savedForm.phone || 'N/A',
          bumpAdded: savedForm.bumpAdded || false,
        }),
      }).finally(() => {
        window.location.href = `/oto?email=${encodeURIComponent(savedForm.email || email)}`
      })
      return
    }

    // Create PaymentIntent on mount
    fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bumpAdded: false }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
          setPaymentIntentId(data.paymentIntentId)
        } else {
          setInitError('Errore inizializzazione pagamento. Ricarica la pagina.')
        }
      })
      .catch(() => setInitError('Errore di connessione. Ricarica la pagina.'))
  }, [])

  if (initError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-6 py-4 max-w-md text-center">
          {initError}
        </div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Caricamento checkout...</div>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#0D9488',
          fontFamily: 'Inter, system-ui, sans-serif',
          borderRadius: '8px',
        },
      },
    }}>
      <CheckoutForm paymentIntentId={paymentIntentId} />
    </Elements>
  )
}
