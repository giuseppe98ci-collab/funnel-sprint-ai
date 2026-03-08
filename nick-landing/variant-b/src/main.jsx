import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { initPostHog } from './posthog.js'

function Root() {
  useEffect(() => {
    initPostHog()
  }, [])

  return (
    <StrictMode>
      <App />
      <Analytics />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)