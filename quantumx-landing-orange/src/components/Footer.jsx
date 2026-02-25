export default function Footer() {
  return (
    <footer className="py-12 bg-[#00051a] border-t border-white/5 text-center text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Termini e Condizioni</a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Disclaimer</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} QuantumX Agent. Tutti i diritti riservati.
        </div>
      </div>
      <p className="mt-8 text-xs max-w-4xl mx-auto px-4 leading-relaxed opacity-50">
        Questo sito non è parte del sito Facebook o Facebook Inc. Inoltre, questo sito non è approvato da Facebook in alcun modo. FACEBOOK è un marchio di FACEBOOK, Inc.
        I risultati possono variare. Non garantiamo guadagni specifici. Il trading comporta rischi.
      </p>
    </footer>
  );
}
