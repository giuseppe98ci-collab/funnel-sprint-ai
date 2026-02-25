import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Brain, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Il Vantaggio Matematico di Wall Street',
    desc: <>Formula collaudata per <strong className="text-white">26 anni</strong> finalmente disponibile. Mentre tutti usavano gli stessi schemi grafici, le grandi società di Wall Street usavano qualcosa di <span className="underline decoration-[#10B981] underline-offset-2">completamente diverso</span>.</>,
    accent: '#10B981',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Trading di Precisione Senza Emozioni',
    desc: <>Il sistema <strong className="text-white">elimina l'errore umano</strong>. Niente più FOMO, niente più panic selling. Solo <em>esecuzione matematica</em> basata su dati storici e volatilità in tempo reale.</>,
    accent: '#38488F',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Setup Istituzionale per Tutti',
    desc: <>Replica le <span className="underline decoration-[#10B981] underline-offset-2">strategie dei grandi fondi hedge</span> direttamente sul tuo conto retail. Non serve capitale milionario, serve solo la <strong className="text-white">strategia giusta</strong>.</>,
    accent: '#00b67a',
  },
];

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8,
      });
      gsap.from('.feat-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y: 80, opacity: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 bg-[#010B32] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="feat-title text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Come <span className="underline decoration-[#10B981] decoration-4 underline-offset-4">QuantumX</span> cambia TUTTO
          </h2>
          <p className="feat-title text-[#BCD2EE] text-base sm:text-xl max-w-2xl mx-auto">
            Non è solo un altro indicatore. È un <strong className="text-white">cambio di paradigma</strong> completo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feat-card group bg-[#1A2346]/70 border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-[#10B981]/30 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${f.accent}20`, color: f.accent }}
              >
                {f.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-[#10B981] transition-colors">
                {f.title}
              </h3>
              <p className="text-sm sm:text-base text-[#BCD2EE] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
