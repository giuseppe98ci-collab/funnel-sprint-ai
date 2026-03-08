const PRODUCTS = [
  {
    title: "Sala Segnali Gold",
    tag: "PRODOTTO PRINCIPALE",
    desc: "Accesso alla sala segnali operativa sull'oro. Ricevi ogni giorno i segnali con entry point, stop loss e take profit già calcolati. Basta copiare.",
    value: "Valore: 497€",
    image: "/sala-gold.png",
  },
  {
    title: "Trading da Telefono",
    tag: "BONUS #1 — GRATIS",
    desc: "Guida completa per operare direttamente dal tuo smartphone. Imposta i trade in 2 minuti, ovunque tu sia.",
    value: "Valore: 97€",
    image: "/corso-trading.png",
  },
  {
    title: "Zero Risk Protocol",
    tag: "BONUS #2 — GRATIS",
    desc: "Il sistema di gestione del rischio che protegge il tuo capitale. Impara a non perdere mai più di quanto puoi permetterti.",
    value: "Valore: 197€",
    image: "/bonus-zerorisk.png",
  },
  {
    title: "Piccolo Capitale, Grandi Risultati",
    tag: "BONUS #3 — GRATIS",
    desc: "Strategie specifiche per chi inizia con 100-500€. Come massimizzare i rendimenti anche con un piccolo capitale iniziale.",
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
        <p className="text-center text-[#B0B0B0] mb-12 text-lg">
          Valore totale: <span className="price-old">888€</span> — Oggi <span className="gold-text font-bold">SOLO 17€</span>
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
      </div>
    </section>
  )
}
