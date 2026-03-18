import posthog from 'posthog-js'

/**
 * Centralized tracking helper.
 * Calls PostHog and (when added) Meta Pixel.
 */
export function trackEvent(eventName, properties = {}) {
  // PostHog
  if (posthog.__loaded) {
    posthog.capture(eventName, properties)
  }

  // Meta Pixel — uncomment when fbq is installed via Events Manager
  // if (typeof window.fbq === 'function') {
  //   window.fbq('trackCustom', eventName, properties)
  // }
}
