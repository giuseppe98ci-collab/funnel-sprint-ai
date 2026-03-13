export default function CtaButton({ text, subtext, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <a
        href="#checkout"
        className="inline-block w-full max-w-lg bg-cta-primary hover:bg-cta-hover text-white font-bold text-lg md:text-xl px-8 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        style={{ animation: 'pulse-cta 2.5s ease-in-out infinite' }}
      >
        {text}
      </a>
      {subtext && (
        <p className="mt-3 text-sm text-text-secondary">{subtext}</p>
      )}
    </div>
  )
}
