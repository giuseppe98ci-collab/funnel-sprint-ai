import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, BarChart3, BadgeEuro } from 'lucide-react';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#010B32] to-[#0a1545] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/[0.06] blur-[100px] rounded-full pointer-events-none" />

      <div className="cta-content max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Assicurati il Tuo Vantaggio{' '}
          <span className="underline decoration-[#FF6B00] decoration-4 underline-offset-4">Prima del Prossimo Calo</span>
        </h2>

        <p className="text-base sm:text-lg text-[#BCD2EE] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Ogni crollo del mercato è una <em>potenziale opportunità</em>, ma solo se hai il giusto framework in atto <strong className="text-white">PRIMA</strong> che accada.
        </p>

        <div className="bg-[#1A2346]/60 border border-white/5 rounded-2xl p-6 sm:p-8 mb-8">
          <p className="text-sm sm:text-base text-[#BCD2EE] mb-6">
            Prenota la tua <strong className="text-white">demo gratuita di 30 minuti</strong> e scopri come il{' '}
            <span className="underline decoration-[#FF6B00] underline-offset-2">Metodo Magnitudo</span> potrebbe trasformare il tuo approccio ai mercati.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base text-[#FF6B00] font-semibold mb-6">
            <span className="inline-flex items-center gap-1.5"><Target className="w-4 h-4" /> Demo Pratica</span>
            <span className="inline-flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> ROI Personalizzato</span>
            <span className="inline-flex items-center gap-1.5"><BadgeEuro className="w-4 h-4" /> 300EUR di Sconto</span>
          </div>

          <Button className="w-full sm:w-auto text-lg sm:text-2xl px-8 sm:px-14 py-5 sm:py-6 cta-glow font-extrabold tracking-wide">
            PRENOTA LA DEMO GRATUITA ORA
          </Button>

          <p className="text-xs text-white/30 mt-4">
            Posti limitati — Nessun impegno — 100% gratuita
          </p>
        </div>
      </div>
    </section>
  );
}
