import { Star } from 'lucide-react'

export default function Testimonial({ title, quote, name, role }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex gap-0.5 text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
      </div>
      <p className="font-bold text-text-primary text-lg mb-3">{title}</p>
      <p className="text-text-secondary italic leading-relaxed mb-4">"{quote}"</p>
      <p className="font-semibold text-text-primary">— {name}</p>
      <p className="text-sm text-text-secondary">{role}</p>
    </div>
  )
}
