import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  <>Identifica con precisione i <strong className="text-white">punti di ingresso</strong> durante i crolli</>,
  <>Evita le <em>trappole emotive</em> che fanno perdere denaro</>,
  <>Gestisci il rischio come le <span className="underline decoration-[#FBC737] underline-offset-2">istituzioni finanziarie</span></>,
  <>Mantieni il <strong className="text-white">controllo completo</strong> dei tuoi fondi</>,
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-img', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        x: -60, opacity: 0, duration: 1, ease: 'power2.out',
      });
      gsap.from('.about-text', {
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 bg-[#010B32] relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
        {/* Image */}
        <div className="about-img relative order-2 md:order-1">
          <div className="absolute inset-0 bg-[#FBC737]/10 blur-3xl rounded-full" />
          <img
            src="https://assets.cdn.filesafe.space/CpX4gKwB6buyGxFgkoA1/media/a3161f4b-9633-4d9b-99d9-689e7ab5151d.png"
            alt="Antonio Vida"
            className="relative z-10 w-full max-w-sm mx-auto md:max-w-none rounded-2xl border border-[#FBC737]/20 shadow-[0_0_40px_rgba(251,199,55,0.15)]"
            loading="lazy"
          />
          <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:-right-4 bg-[#1A2346] px-4 py-3 rounded-xl border border-white/10 shadow-xl z-20">
            <p className="font-bold text-[#FBC737] text-sm sm:text-base">Antonio Vida</p>
            <p className="text-xs sm:text-sm text-gray-400">Ex Stratega Merrill Lynch</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8 order-1 md:order-2">
          <h2 className="about-text text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            Da <span className="underline decoration-[#FBC737] decoration-4 underline-offset-4">Wall Street</span> al Tuo Conto di Trading
          </h2>

          <div className="about-text space-y-4 text-[#BCD2EE] text-base sm:text-lg leading-relaxed">
            <p>
              Dopo aver trascorso anni in <strong className="text-white">Merrill Lynch</strong>, Antonio ha notato qualcosa di preoccupante: i framework matematici utilizzati dagli <em>investitori istituzionali</em> erano completamente diversi da quelli disponibili ai trader retail.
            </p>
            <blockquote className="border-l-4 border-[#FBC737] pl-4 italic text-white/90 text-base sm:text-lg">
              "Ho visto le principali società utilizzare <span className="underline decoration-[#FBC737] underline-offset-2">approcci sistematici</span> per identificare opportunità durante i cali del mercato, mentre i trader di tutti i giorni seguivano strategie obsolete."
            </blockquote>
            <p>
              Il <strong className="text-white">"Metodo Magnitudo"</strong> è un framework matematico perfezionato in <span className="underline decoration-[#FBC737] underline-offset-2">26 anni</span> che identifica in autonomia i migliori punti di ingresso.
            </p>
          </div>

          <ul className="about-text space-y-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FBC737]/20 flex items-center justify-center text-[#FBC737] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base text-[#BCD2EE]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
