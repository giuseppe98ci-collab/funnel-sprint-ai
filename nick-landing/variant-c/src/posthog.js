import posthog from 'posthog-js'

const POSTHOG_KEY = 'phc_d4gQQa5rkwJ6oDHQp3EGpDNCooVeciaqchj9gHK6rG8'
const POSTHOG_HOST = 'https://us.i.posthog.com'

let initialized = false

export function initPostHog() {
  if (initialized || typeof window === 'undefined') return
  
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
  
  initialized = true
}

export function trackEvent(eventName, properties = {}) {
  if (!initialized) initPostHog()
  posthog.capture(eventName, properties)
}

export function trackCTA(variant, location) {
  trackEvent('cta_clicked', { variant, location, project: 'nick-landing' })
}

export function trackPageView(variant) {
  trackEvent('pageview', { variant, project: 'nick-landing' })
}