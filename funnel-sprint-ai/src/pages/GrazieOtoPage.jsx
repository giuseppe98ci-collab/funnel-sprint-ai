import { useState, useEffect } from 'react'
import { CheckCircle, Calendar, ArrowRight, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { trackEvent } from '../utils/tracking'

// Calendar config - Trader Boost
const CALENDAR_CONFIG = {
  // Using the Trader Boost calendar integration
  apiUrl: '/api/ghl-booking', // Same API used in Trader Boost funnel
  locationId: '6600KjjI4Q4k8ICFPzFC',
  calendarId: 'keBpo5RxtcJLJzBUJMO3', // ID calendario Giuseppe (da verificare)
}

export default function GrazieOtoPage() {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booked, setBooked] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    trackEvent('oto_thankyou_viewed')
    const savedEmail = localStorage.getItem('fsa_email') || ''
    setEmail(savedEmail)
    
    // Fetch available slots
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      // Get next 7 days of slots
      const res = await fetch(`/api/ghl-slots?calendarId=${CALENDAR_CONFIG.calendarId}&days=7`)
      const data = await res.json()
      setSlots(data.slots || [])
    } catch (err) {
      console.error('Failed to fetch slots:', err)
      setError('Impossibile caricare gli slot. Ricarica la pagina.')
    }
  }

  const handleBook = async () => {
    if (!selectedSlot || !email) return
    
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ghl-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarId: CALENDAR_CONFIG.calendarId,
          slot: selectedSlot,
          email,
          firstName: 'Cliente',
          lastName: 'Revisione',
          phone: '+39333000000',
        }),
      })

      if (res.ok) {
        trackEvent('oto_call_booked', { slot: selectedSlot })
        setBooked(true)
      } else {
        throw new Error('Booking failed')
      }
    } catch (err) {
      setError('Errore nella prenotazione. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  // Format slot for display
  const formatSlot = (slot) => {
    const date = new Date(slot.startTime)
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Pagamento Confermato! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Hai acquistato la <strong>Call di Revisione Esperta</strong>. Ora prenota subito il tuo slot per la call 1-to-1 con me.
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cosa succede ora:</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 font-bold text-sm">1</div>
              <div>
                <p className="font-bold text-gray-900">Prenota il tuo slot qui sotto</p>
                <p className="text-sm text-gray-600">Scegli il giorno e l'orario che preferisci</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 font-bold text-sm">2</div>
              <div>
                <p className="font-bold text-gray-900">Ricevi il link Zoom via email</p>
                <p className="text-sm text-gray-600">Ti arriva subito dopo la prenotazione</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 font-bold text-sm">3</div>
              <div>
                <p className="font-bold text-gray-900">Call 1-to-1 di 30-45 minuti</p>
                <p className="text-sm text-gray-600">Revisioniamo il tuo lavoro e ti dico esattamente cosa migliorare</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Booking */}
        {!booked ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={28} className="text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Prenota la tua call</h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            {slots.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Caricamento slot disponibili...</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">Seleziona un giorno e orario:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-80 overflow-y-auto">
                  {slots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedSlot === slot
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <p className="font-bold text-gray-900">{formatSlot(slot)}</p>
                      <p className="text-xs text-gray-500 mt-1">Disponibile</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleBook}
                  disabled={!selectedSlot || loading}
                  className="w-full py-4 rounded-xl font-bold text-lg text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Prenotazione in corso...' : (
                    <>
                      CONFERMA PRENOTAZIONE <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Call Prenotata! 🎉</h2>
            <p className="text-green-700 mb-4">
              Hai prenotato per <strong>{selectedSlot && formatSlot(selectedSlot)}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Riceverai subito una email con il link Zoom per la call. 
              Se non la trovi, controlla anche nello spam.
            </p>
            <div className="mt-6 p-4 bg-white rounded-xl">
              <p className="text-sm text-gray-500">Hai domande?</p>
              <a href="https://wa.me/393331234567" className="inline-flex items-center gap-2 text-green-600 font-bold mt-2 hover:underline">
                <Phone size={16} /> Scrivimi su WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
