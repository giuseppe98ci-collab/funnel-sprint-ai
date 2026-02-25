import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, Frown, Clock, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7" />,
    question: <>Ti senti frustrato perché <strong className="text-white">perdi le tue posizioni</strong> e i tuoi guadagni ogni volta che il mercato crolla?</>,
  },
  {
    icon: <Frown className="w-6 h-6 sm:w-7 sm:h-7" />,
    question: <>Stanco di perderti i <span className="underline decoration-[#FBC737] underline-offset-2">migliori punti di ingresso</span> perché lasci che siano le <em>tue emozioni</em> a gestire i tuoi trade?</>,
  },
  {
    icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7" />,
    question: <>Passi <strong className="text-white">ore ad analizzare grafici</strong> per poi fare comunque la mossa sbagliata?</>,
  },
  {
    icon: <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />,
    question: <>Ti stai chiedendo perché gli "esperti" sembrano <span className="underline decoration-[#FBC737] underline-offset-2">trarre vantaggio dalla volatilità</span> mentre tu resti indietro?</>,
  },
];

export default function Problems() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8,
      });
      gsap.from('.problem-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: -60, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out',
      });
      gsap.from('.problem-solution', {
        scrollTrigger: { trigger: '.problem-solution', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.5,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 px-4 bg-[#010B32] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FBC737]/20 to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="problem-title text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-10 sm:mb-14 leading-tight">
          Il problema del{' '}
          <span className="underline decoration-[#FBC737] decoration-4 underline-offset-4">Trading Tradizionale</span>
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className="problem-item flex items-start gap-4 bg-[#1A2346]/60 border border-white/5 rounded-xl p-5 sm:p-6 hover:border-[#FBC737]/20 transition-colors duration-300"
            >
              <div className="flex-shrink-0 mt-0.5 text-[#FBC737]">{p.icon}</div>
              <p className="text-base sm:text-lg text-[#BCD2EE] leading-relaxed">{p.question}</p>
            </div>
          ))}
        </div>

        {/* Solution teaser */}
        <div className="problem-solution mt-10 sm:mt-14 text-center">
          <div className="inline-block bg-[#FBC737]/10 border border-[#FBC737]/20 rounded-2xl px-6 py-5 sm:px-8 sm:py-6">
            <p className="text-lg sm:text-xl font-bold text-white mb-2">
              Non sei tu il problema.
            </p>
            <p className="text-sm sm:text-base text-[#BCD2EE]">
              Il problema è che stai usando gli <strong className="text-white">strumenti sbagliati</strong>. Le grandi istituzioni usano un{' '}
              <span className="underline decoration-[#FBC737] underline-offset-2">approccio completamente diverso</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
