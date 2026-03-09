const PRODUCTS = [
  {
    title: "Gold Profit System",
    tag: "PRODOTTO PRINCIPALE",
    desc: "Sala segnali Gold — I segnali operativi di Nick sull'oro, ogni giorno, direttamente sul tuo telefono. Corso \"Le basi del trading\" + Ebook \"La mia strategia\" inclusi.",
    value: "Valore: 497€",
    image: "/sala-gold.png",
  },
  {
    title: "Trading da telefono",
    tag: "BONUS #1 — GRATIS",
    desc: "Come fare trading ovunque tu sia senza stare ore davanti al computer. Configuri tutto una volta e operi in 2 minuti dal telefono ovunque tu sia.",
    value: "Valore: 97€",
    image: "/corso-trading.png",
  },
  {
    title: "Zero Risk Protocol",
    tag: "BONUS #2 — GRATIS",
    desc: "Come fare trading azzerando la probabilità di bruciare il conto. Le regole di gestione del rischio che il 90% dei trader non conosce (e non conoscerà)",
    value: "Valore: 197€",
    image: "/bonus-zerorisk.png",
  },
  {
    title: "Piccolo capitale, Grandi risultati",
    tag: "BONUS #3 — GRATIS",
    desc: "Come iniziare con 100€ e moltiplicarli nel tempo. Esempi reali di quanto puoi generare grazie all'interesse composto anche partendo da cifre minime.",
    value: "Valore: 97€",
    image: "/bonus-piccolo-capitale.png",
  },
]

function ProductMockup({ image }) {
  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#1A1A1A] border border-[rgba(196,169,91,0.2)]">
      <img src={image} alt="Product" className="w-full h-full object-cover" />
    </div>
  )
}

export default function ValueStack() {
  return (
    <section className="py-20 px-4 bg-[#0D0D0D] gold-glow">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl gold-text text-center mb-4">
          ECCO COSA RICEVI + 3 BONUS GRATUITI
        </h2>
        <p className="text-center text-white text-lg mb-2">Gold Profit System</p>
        <p className="text-center text-[#B0B0B0] mb-12 text-base">
          Tutto quello che ti serve per iniziare a fare trading da zero (in profitto) sull'oro
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${i === 0 ? 'bg-[#C4A95B]/20 text-[#C4A95B]' : 'bg-white/10 text-white/80'}`}>
                {p.tag}
              </span>
              <ProductMockup image={p.image} />
              <h3 className="font-headline text-xl text-white">{p.title}</h3>
              <p className="text-[#B0B0B0] text-sm leading-relaxed">{p.desc}</p>
              <p className="text-[#C4A95B] text-sm font-semibold">{p.value}</p>
            </div>
          ))}
        </div>
        
        {/* ECCO COSA SARAI IN GRADO DI FARE */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl gold-text text-center mb-8">
            ECCO COSA SARAI IN GRADO DI FARE:
          </h3>
          <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed">
            <p>💰 Ricevere segnali operativi sull'oro e copiarli sul tuo conto broker in pochi minuti;</p>
            <p>💰 Generare dai 50 ai 300€ al giorno seguendo le indicazioni di un esperto con 3+ anni di risultati verificati;</p>
            <p>💰 Operare con sicurezza anche se non sai nemmeno cos'è un grafico, grazie al corso base incluso;</p>
            <p>💰 Proteggere il tuo capitale con il protocollo di gestione del rischio che usa Nick stesso;</p>
            <p>💰 Fare trading ovunque ti trovi, direttamente dal telefono, senza dover stare incollato a un computer;</p>
            <p>💰 Iniziare con un piccolo capitale e moltiplicarlo nel tempo man mano che copi le operazioni di Nick;</p>
            <p>💰 E molto altro…</p>
          </div>
        </div>
      </div>
    </section>
  )
}
