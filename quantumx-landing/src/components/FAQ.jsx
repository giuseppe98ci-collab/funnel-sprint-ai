import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { 
    q: "Il metodo funziona anche per chi ha poco tempo?", 
    a: "Assolutamente sì. Il sistema è progettato per essere semi-automatico o automatico. Richiede meno di 15 minuti al giorno per la gestione." 
  },
  { 
    q: "Serve esperienza pregressa?", 
    a: "No. Il Metodo Magnitudo è un sistema completo che ti guida passo dopo passo. Anche i principianti ottengono risultati." 
  },
  { 
    q: "Quanto capitale serve per iniziare?", 
    a: "Puoi iniziare anche con conti piccoli (500€). La gestione del rischio è scalabile per adattarsi a qualsiasi dimensione di portafoglio." 
  },
  { 
    q: "Come accedo alla demo?", 
    a: "Clicca sul pulsante 'Prenota la Demo', compila il modulo e verrai contattato per fissare un appuntamento gratuito di 30 minuti con un nostro esperto." 
  }
];

const AccordionItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex items-center justify-between group hover:text-[#FBC737] transition-colors"
      >
        <span className="text-xl font-medium pr-8">{q}</span>
        <span className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#FBC737]' : 'rotate-0 text-[#BCD2EE]'}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#BCD2EE] leading-relaxed pr-8 border-l-2 border-[#FBC737] pl-4 ml-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <section className="py-24 px-4 bg-[#010B32]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Domande <span className="text-[#FBC737]">Frequenti</span>
        </h2>
        <div className="bg-[#1A2346] rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/5">
          {faqs.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
