import posthog from 'posthog-js'

/**
 * Generate a unique event ID for Meta deduplication.
 */
function generateEventId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Send event to Meta CAPI server-side endpoint.
 */
function sendToCAPI(eventName, eventId, customData = {}, userData = {}) {
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: customData,
      user_data: userData,
    }),
  }).catch(() => {})
}

/**
 * Centralized tracking helper.
 * Calls PostHog, Meta Pixel (fbq), and Meta CAPI.
 */
export function trackEvent(eventName, properties = {}) {
  // PostHog
  if (posthog.__loaded) {
    posthog.capture(eventName, properties)
  }
}

/**
 * Track a standard Meta Pixel event with CAPI dedup.
 * @param {string} metaEventName - Standard Meta event name (e.g. 'Purchase', 'ViewContent')
 * @param {object} customData - Custom data (value, currency, etc.)
 * @param {object} userData - User data for CAPI (email, phone, fn, ln — raw, will be hashed server-side)
 */
export function trackMetaEvent(metaEventName, customData = {}, userData = {}) {
  const eventId = generateEventId()

  // Browser-side fbq
  if (typeof window.fbq === 'function') {
    window.fbq('track', metaEventName, customData, { eventID: eventId })
  }

  // Server-side CAPI
  sendToCAPI(metaEventName, eventId, customData, userData)
}
