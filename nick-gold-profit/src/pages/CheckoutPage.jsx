import { useState, useEffect } from 'react'
import Header from '../components/Header'

export default function CheckoutPage() {
  const [bump, setBump] = useState(false)
  const total = bump ? 44 : 17

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl gold-text text-center mb-2">
            Completa il tuo ordine
          </h1>
          <p className="text-center text-[#B0B0B0] mb-10">Sei a un passo dall'accedere al Gold Profit System</p>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT — Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact */}
              <div className="glass-card p-6">
                <h2 className="text-white font-headline text-lg mb-4">Informazioni di contatto</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#B0B0B0] mb-1">Nome</label>
                      <input type="text" placeholder="Il tuo nome" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#B0B0B0] mb-1">Cognome</label>
                      <input type="text" placeholder="Il tuo cognome" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-1">Email</label>
                    <input type="email" placeholder="la-tua@email.com" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-1">Telefono</label>
                    <input type="tel" placeholder="+39 000 000 0000" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                  </div>
                </div>
              </div>

              {/* Bump Offer */}
              <div 
                className="bump-box cursor-pointer" 
                onClick={() => setBump(!bump)}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded border-2 mt-0.5 flex items-center justify-center transition ${bump ? 'bg-[#C4A95B] border-[#C4A95B]' : 'border-[#C4A95B]/50'}`}>
                    {bump && (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">
                      SÌ! Aggiungi anche la Sala Crypto (BTC & ETH) per soli 27€ invece di <span className="price-old">97€</span>
                    </p>
                    <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed">
                      Oltre all'oro, vuoi ricevere anche segnali operativi su Bitcoin ed Ethereum? La Sala Crypto ti dà accesso ai segnali sulle due criptovalute più importanti al mondo, con lo stesso formato della Sala Gold: entry point, stop loss e take profit pronti da copiare. Aggiungi questa opportunità al tuo ordine per soli 27€ (invece di 97€) e diversifica i tuoi profitti.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="glass-card p-6">
                <h2 className="text-white font-headline text-lg mb-4">Metodo di pagamento</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 rounded-lg bg-[#C4A95B]/10 border border-[#C4A95B]/50 text-[#C4A95B] font-semibold text-sm">
                      💳 Carta di Credito
                    </button>
                    <button className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-[#B0B0B0] font-semibold text-sm">
                      PayPal
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-1">Numero carta</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#B0B0B0] mb-1">Scadenza</label>
                      <input type="text" placeholder="MM/AA" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#B0B0B0] mb-1">CVV</label>
                      <input type="text" placeholder="000" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:border-[#C4A95B] focus:outline-none transition" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button className="cta-btn cta-pulse w-full text-xl py-5">
                COMPLETA L'ORDINE — {total}€ →
              </button>

              {/* Trust */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#777]">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Pagamento Sicuro SSL 256-bit
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Garanzia 30 Giorni
                </span>
              </div>
            </div>

            {/* RIGHT — Summary */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="text-white font-headline text-lg mb-4">Riepilogo Ordine</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>Gold Profit System</span>
                    <span className="text-white">17€</span>
                  </div>
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>• Sala Segnali Gold</span>
                    <span className="text-[#22C55E]">Incluso</span>
                  </div>
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>• Trading da Telefono</span>
                    <span className="text-[#22C55E]">BONUS</span>
                  </div>
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>• Zero Risk Protocol</span>
                    <span className="text-[#22C55E]">BONUS</span>
                  </div>
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>• Piccolo Capitale, Grandi Risultati</span>
                    <span className="text-[#22C55E]">BONUS</span>
                  </div>
                  
                  {bump && (
                    <>
                      <div className="border-t border-white/10 my-2" />
                      <div className="flex justify-between text-[#B0B0B0]">
                        <span>Sala Crypto (BTC & ETH)</span>
                        <span className="text-white">27€</span>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t border-[rgba(196,169,91,0.3)] pt-3 mt-3">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Totale</span>
                      <span className="gold-text">{total}€</span>
                    </div>
                    <div className="flex justify-between text-[#777] text-xs mt-1">
                      <span>Prezzo pieno</span>
                      <span className="price-old">{bump ? '194€' : '97€'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
                  <p className="text-[#22C55E] text-sm font-semibold text-center">
                    🎉 Risparmi {bump ? '150€' : '80€'} con l'offerta di oggi!
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[#777] text-xs">
                    🔒 I tuoi dati sono protetti con crittografia SSL 256-bit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
