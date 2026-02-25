import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Marco R.',
    date: '2 giorni fa',
    text: 'Incredibile. Ho recuperato le perdite del 2022 in 3 mesi con questo metodo. Il sistema automatico fa tutto da solo, io devo solo controllare.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Giulia B.',
    date: '5 giorni fa',
    text: 'Finalmente qualcosa che funziona anche quando il mercato crolla. Antonio è un genio. La demo gratuita mi ha convinto subito.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Luca V.',
    date: '1 settimana fa',
    text: 'La precisione dei segnali è spaventosa. Non ho mai visto nulla di simile in 10 anni di trading. Il metodo magnitudo è su un altro livello.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Andrea M.',
    date: '2 settimane fa',
    text: 'Ero scettico, ma dopo la demo ho capito che questo è diverso da tutto il resto. Risultati concreti dal primo mese.',
    rating: 5,
    verified: true,
  },
];

function TrustpilotStar({ filled = true }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill={filled ? '#00b67a' : '#dcdce6'} />
      <path
        d="M12 4l2.2 4.5 4.8.7-3.5 3.4.8 4.9L12 15l-4.3 2.5.8-4.9L5 9.2l4.8-.7L12 4z"
        fill="white"
      />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tp-header', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.7,
      });
      gsap.from('.tp-review', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 bg-[#010B32] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Trustpilot Header */}
        <div className="tp-header text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-white">Eccellente</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <TrustpilotStar key={i} />
              ))}
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/50">
            Basato su <strong className="text-white/70">371 recensioni</strong> su{' '}
            <span className="text-[#00b67a] font-bold">★ Trustpilot</span>
          </p>
        </div>

        {/* Reviews — Trustpilot style stacked */}
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="tp-review bg-[#1A2346]/50 border border-white/5 rounded-xl p-5 sm:p-6 hover:border-white/10 transition-colors"
            >
              {/* Stars row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <TrustpilotStar key={j} />
                  ))}
                </div>
                {t.verified && (
                  <span className="text-xs bg-[#00b67a]/10 text-[#00b67a] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Verificata
                  </span>
                )}
              </div>

              {/* Review text */}
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
                {t.text}
              </p>

              {/* Author row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#38488F] flex items-center justify-center text-xs font-bold text-white">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-medium text-white/70">{t.name}</span>
                </div>
                <span className="text-xs text-white/30">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
