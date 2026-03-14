import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import SalesPage from './pages/SalesPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OtoPage from './pages/OtoPage.jsx'
import ThankYouPage from './pages/ThankYouPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/oto" element={<OtoPage />} />
        <Route path="/grazie" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
