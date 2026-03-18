import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircle, ShieldCheck, Lock, ArrowRight, Clock } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { trackEvent } from '../utils/tracking'

const stripePromise = loadStripe('pk_live_51T5j0PPbCvQnn6IOymUqHQ4NBjqOaIOeKze37kK0TkjBnz5pUUndjIhmUSOS0MMltcsWBgKafA5FiTGm5l9WrrQD00TxlMDlkd')

function OtoCheckoutForm({ paymentIntentId }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/grazie-oto?pi=${paymentIntentId}`,
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message)
        setLoading(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        trackEvent('oto_payment_success', { amount: 9700, product: 'revisione-esperta' })
        navigate(`/grazie-oto?pi=${paymentIntent.id}`)
      }
    } catch (err) {
      setError(err.message || 'Si è verificato un errore. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <CheckCircle size={16} /> Dati di pagamento
        </label>
        <PaymentElement options={{ layout: 'accordion' }} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
      >
        <Lock size={18} />
        {loading ? 'Elaborazione...' : 'PAGA €97 E Prenota la Call'}
        {!loading && <ArrowRight size={18} />}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500" /> Pagamento sicuro</div>
        <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500" /> Garanzia 30 giorni</div>
      </div>
    </form>
  )
}

export default function OtoCheckoutPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || localStorage.getItem('fsa_email') || ''
  const [clientSecret, setClientSecret] = useState(null)
  const [paymentIntentId, setPaymentIntentId] = useState(null)
  const [initError, setInitError] = useState('')

  useEffect(() => {
    trackEvent('oto_checkout_started')
    
    // Create PaymentIntent for €97
    fetch('/api/oto-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
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
  }, [email])

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
    <main className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-green-600 text-white py-3 px-4 text-center">
        <p className="font-bold text-sm flex items-center justify-center gap-2">
          <Clock size={18} /> Offerta esclusiva: Call di Revisione Esperta
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            ✅ Hai già Funnel Sprint AI
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            Aggiungi la Call di Revisione Esperta
          </h1>
          <p className="text-gray-600">
            Pagamento unico di <span className="font-bold text-gray-900">€97</span>. Dopo il pagamento prenoti subito la tua call 1-to-1.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Completa il pagamento</h2>
          
          <Elements stripe={stripePromise} options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: { colorPrimary: '#22c55e', fontFamily: 'Inter, system-ui, sans-serif' },
            },
          }}>
            <OtoCheckoutForm paymentIntentId={paymentIntentId} />
          </Elements>
        </div>

        {/* Riepilogo */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3">Riepilogo</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Call di Revisione Esperta 1-to-1</span>
            <span className="font-bold text-gray-900">€97</span>
          </div>
          <div className="flex justify-between items-center py-2 font-bold text-lg">
            <span>Totale</span>
            <span className="text-green-600">€97</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Pagamento unico. Nessun abbonamento.</p>
        </div>
      </div>
    </main>
  )
}
