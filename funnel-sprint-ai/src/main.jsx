import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import posthog from 'posthog-js'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import SalesPage from './pages/SalesPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OtoPage from './pages/OtoPage.jsx'
import ThankYouPage from './pages/ThankYouPage.jsx'

// PostHog init
posthog.init('phc_d4gQQa5rkwJ6oDHQp3EGpDNCooVeciaqchj9gHK6rG8', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: true,
  capture_pageleave: true,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/oto" element={<OtoPage />} />
        <Route path="/grazie" element={<ThankYouPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)
