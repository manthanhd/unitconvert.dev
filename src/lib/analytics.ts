/**
 * Analytics utility for Plausible
 * Privacy-friendly, GDPR-compliant tracking
 */

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Track a custom event with optional properties
 */
export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

/**
 * Track a conversion event
 */
export function trackConversion(
  fromUnit: string,
  toUnit: string,
  category: string,
  source: 'search' | 'recent' | 'url'
) {
  track('Conversion', {
    from: fromUnit,
    to: toUnit,
    category,
    source,
  });
}

/**
 * Track when a user copies the result
 */
export function trackCopyResult() {
  track('Copy Result');
}

/**
 * Track when a user copies the shareable link
 */
export function trackCopyLink() {
  track('Copy Link');
}

/**
 * Track when share modal is opened
 */
export function trackShareOpen() {
  track('Share Open');
}

/**
 * Track social share clicks
 */
export function trackSocialShare(platform: 'whatsapp' | 'telegram' | 'sms') {
  track('Social Share', { platform });
}

/**
 * Track keyboard shortcut usage
 */
export function trackKeyboardShortcut(shortcut: string) {
  track('Keyboard Shortcut', { shortcut });
}

/**
 * Track when a search yields no results (useful for identifying missing units)
 */
export function trackSearchNoResults(query: string) {
  // Only track if query is meaningful (3+ chars)
  if (query.length >= 3) {
    track('Search No Results', { query: query.substring(0, 50) });
  }
}

/**
 * Track reverse conversion usage (typing in output field)
 */
export function trackReverseConversion() {
  track('Reverse Conversion');
}

/**
 * Track recent conversion click
 */
export function trackRecentClick() {
  track('Recent Click');
}
