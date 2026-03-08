const TESTIMONIALS = [
  { name: "Marco R.", city: "Milano", text: "Ho iniziato con 200€ e in 3 settimane ho già recuperato l'investimento iniziale. I segnali sono chiari e facili da seguire.", stars: 5 },
  { name: "Giulia P.", city: "Roma", text: "Non avevo mai fatto trading prima. Con Gold Profit System ci metto letteralmente 15 minuti al giorno. Incredibile.", stars: 5 },
  { name: "Alessandro M.", city: "Torino", text: "Finalmente un sistema trasparente. Nick mostra i risultati, non fa promesse vuote. Sono dentro da 6 mesi e i risultati parlano.", stars: 5 },
  { name: "Francesca L.", city: "Napoli", text: "Lo Zero Risk Protocol mi ha dato la sicurezza di operare senza ansia. So sempre quanto rischio e quanto posso guadagnare.", stars: 5 },
  { name: "Davide S.", city: "Bologna", text: "Ho provato altri corsi da 500€+. Questo a 17€ vale più di tutti messi insieme. La sala segnali è oro puro (letteralmente).", stars: 5 },
  { name: "Sara T.", city: "Firenze", text: "Il bonus 'Trading da Telefono' è stato una svolta. Opero durante la pausa pranzo e la sera dal divano.", stars: 5 },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#C4A95B]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialGrid({ title = "Cosa dicono di Nick" }) {
  return (
    <section className="py-20 px-4 bg-[#111111] section-glow gold-glow">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-12">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card p-6 space-y-3">
              <Stars count={t.stars} />
              <p className="text-[#B0B0B0] text-sm leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4A95B] to-[#E5D4A1] flex items-center justify-center text-black font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#777] text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
