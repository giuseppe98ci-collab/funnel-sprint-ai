import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Clock, Target, BadgeEuro } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { y: -30, opacity: 0, duration: 0.6 })
        .from('.hero-headline', { y: 50, opacity: 0, duration: 0.9 }, '-=0.3')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-vsl', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.3')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-proof', { opacity: 0, duration: 0.5 }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-8 pb-28 sm:pt-16 sm:pb-32">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010B32] via-[#010B32] to-[#0a1545] z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#10B981]/[0.03] rounded-full blur-[120px] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 sm:space-y-8">
        {/* Warning Badge */}
        <div className="hero-badge">
          <div className="warning-pulse inline-block bg-[#AF0505] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider border border-red-400/30">
            ATTENZIONE: NON SI TRATTA DI NESSUN CORSO, INVESTIMENTO O TRAINING
          </div>
        </div>

        {/* Headline with gold underline decoration on key phrases */}
        <h1 className="hero-headline text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] px-0 w-full">
          Il primo sistema di trading{' '}
          <span className="underline decoration-[#10B981] decoration-4 underline-offset-4">100% automatico</span>{' '}
          che opera in <strong className="text-[#10B981]">pilota automatico</strong> e trasforma ogni{' '}
          <span className="underline decoration-[#10B981] decoration-4 underline-offset-4">crollo di mercato</span> in profitto sistematico
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-base sm:text-xl md:text-2xl text-[#BCD2EE] max-w-3xl mx-auto leading-relaxed">
          Attiva il sistema, imposta i parametri e lascia che il{' '}
          <em>Metodo Magnitudo</em> lavori per te -- <strong className="text-white">24 ore su 24</strong>,{' '}
          senza intervento manuale, senza stress.
        </p>

        {/* VSL Cover / Video Placeholder */}
        <div className="hero-vsl w-full max-w-3xl mx-auto">
          <div className="relative aspect-video bg-[#1A2346] rounded-2xl border border-white/10 overflow-hidden group cursor-pointer shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A2346] to-[#010B32]" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10B981] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#010B32] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center z-10">
              <span className="text-xs sm:text-sm text-white/50 font-medium">Scopri Come Funziona il Sistema Automatico</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-cta flex flex-col items-center gap-4 pt-2">
          <Button className="w-full sm:w-auto text-lg sm:text-xl md:text-2xl px-8 sm:px-14 py-5 sm:py-6 cta-glow font-extrabold tracking-wide">
            PRENOTA LA TUA DEMO GRATUITA
          </Button>
          <p className="text-xs sm:text-sm text-[#BCD2EE]/60 flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Solo 30 minuti</span>
            <span className="inline-flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Dimostrazione pratica</span>
            <span className="inline-flex items-center gap-1"><BadgeEuro className="w-3.5 h-3.5" /> 300EUR di sconto incluso</span>
          </p>
        </div>

        {/* Social Proof */}
        <div className="hero-proof flex flex-col items-center gap-1 pt-2">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="text-sm text-white/70 ml-2 font-semibold">4.9/5</span>
          </div>
          <span className="text-xs text-white/40">371 clienti già usano con profitto QuantumX</span>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 w-full bg-[#010B32]/90 backdrop-blur-sm border-t border-white/5 py-4 sm:py-5 overflow-hidden z-10">
        <div className="flex justify-center items-center gap-8 sm:gap-14 opacity-30 hover:opacity-50 transition-opacity duration-500">
          {['Bloomberg', 'Forbes', 'Yahoo! Finance', 'NASDAQ', 'Wall Street Journal'].map((name) => (
            <span key={name} className="text-sm sm:text-base font-bold whitespace-nowrap tracking-wider uppercase">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
