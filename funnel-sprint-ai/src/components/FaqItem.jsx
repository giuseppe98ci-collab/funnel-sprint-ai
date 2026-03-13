import { useState } from 'react'

export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
      >
        <span className="font-semibold text-text-primary pr-4">{question}</span>
        <span className="text-xl text-text-secondary shrink-0">{open ? '−' : '+'}</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '500px' : '0' }}
      >
        <p className="px-6 pb-5 text-text-secondary leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}
