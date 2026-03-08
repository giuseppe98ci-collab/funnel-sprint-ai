import { useEffect } from 'react'

const GHL_CHECKOUT_URL = 'https://pagamenti.markmaker.it/smm-10k-checkout-page'

export default function CheckoutPage() {
  useEffect(() => {
    // Redirect immediato a GHL checkout
    window.location.href = GHL_CHECKOUT_URL
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Reindirizzamento al checkout sicuro...</p>
      </div>
    </div>
  )
}
