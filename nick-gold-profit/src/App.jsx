import { Routes, Route } from 'react-router-dom'
import SalesPage from './pages/SalesPage'
import CheckoutPage from './pages/CheckoutPage'
import OtoPage from './pages/OtoPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SalesPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/offerta-speciale" element={<OtoPage />} />
    </Routes>
  )
}
