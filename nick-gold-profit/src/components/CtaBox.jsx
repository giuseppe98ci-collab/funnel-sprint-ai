import { useState, useEffect } from 'react'

export default function CtaBox({ id }) {
  const [email, setEmail] = useState('')
  const [savedEmail, setSavedEmail] = useState('')

  // Carica email salvata dal localStorage
  useEffect(() => {
    const stored = localStorage.getItem('gpt_user_email')
    if (stored) setSavedEmail(stored)
  }, [])

  // Salva email nel localStorage
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value.includes('@')) {
      localStorage.setItem('gpt_user_email', value)
      setSavedEmail(value)
    }
  }

  const checkoutUrl = email ? `/checkout?email=${encodeURIComponent(email)}` : '/checkout'

  return (
    <div id={id} className="glass-card gold-glow p-6 md:p-10 max-w-2xl mx-auto text-center space-y-6">
      {/* Price */}
      <div>
        <p className="font-headline text-5xl md:text-6xl gold-text">SOLO 17€</p>
        <p className="text-lg text-[#B0B0B0] mt-2">Prezzo intero: <span className="price-old">97€</span></p>
        <p className="text-[#22C55E] font-semibold mt-1">Risparmi 80€ — Offerta limitata</p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <p className="text-sm text-[#B0B0B0]">Inserisci la tua email per accedere:</p>
        <input
          type="email"
          placeholder="lamiaemail@email.com"
          value={email || savedEmail}
          onChange={handleEmailChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#666] focus:border-[#C4A95B] focus:outline-none transition-colors"
        />
      </div>

      {/* CTA */}
      <a 
        href={checkoutUrl} 
        className="cta-btn cta-pulse block w-full text-lg md:text-xl py-4"
      >
        ACCEDI ORA A SOLI 17€ →
      </a>

      {/* Stripe Badge (grayscale) */}
      <div className="pt-2">
        <img 
          src="/stripe-badge.png" 
          alt="Guaranteed safe & secure checkout - Powered by Stripe" 
          className="w-full max-w-sm mx-auto h-auto grayscale opacity-70" 
        />
      </div>

      {/* Safe Checkout Badges */}
      <div>
        <img 
          src="/safe-checkout.png" 
          alt="Guaranteed SAFE Checkout - Visa, Mastercard, PayPal, McAfee Secure" 
          className="w-full max-w-md mx-auto h-auto" 
        />
      </div>

      {/* Garanzia mini */}
      <p className="text-xs text-[#777] flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Garanzia Soddisfatto o Rimborsato 30 Giorni
      </p>
    </div>
  )
}
