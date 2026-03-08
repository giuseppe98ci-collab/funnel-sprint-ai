export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0D0D0D]/80 border-b border-[rgba(196,169,91,0.2)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="gold-text font-headline text-xl md:text-2xl">
          Gold Profit System
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-[#B0B0B0]">
          <svg className="w-4 h-4 text-[#C4A95B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Serve aiuto? supporto@goldprofitsystem.com
        </div>
      </div>
    </header>
  )
}
