import { AnalyticsEvent } from '../types';
import { getSiteSettings } from './settings';

export function trackEvent(
  type: AnalyticsEvent['type'],
  page: string = window.location.pathname,
  metadata?: string
): void {
  try {
    const newEvent: AnalyticsEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      type,
      page,
      timestamp: new Date().toISOString(),
      metadata
    };

    const existing: AnalyticsEvent[] = JSON.parse(localStorage.getItem('ik_analytics_events') || '[]');
    const updated = [newEvent, ...existing].slice(0, 500); // Keep last 500 events
    localStorage.setItem('ik_analytics_events', JSON.stringify(updated));

    // GA4 Integration if ID present
    const settings = getSiteSettings();
    if (settings.ga4MeasurementId && settings.ga4MeasurementId !== 'G-XXXXXXXXXX' && (window as any).gtag) {
      (window as any).gtag('event', type, {
        event_category: 'Conversion',
        event_label: page,
        value: metadata
      });
    }
  } catch (e) {
    console.warn('Analytics tracking error:', e);
  }
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem('ik_analytics_events') || '[]');
  } catch {
    return [];
  }
}

/**
 * Loads Google Analytics (gtag) after first user interaction or 3s idle, never on initial paint
 */
export function initDeferredAnalytics(): void {
  if (typeof window === 'undefined') return;

  const settings = getSiteSettings();
  const gaId = settings.ga4MeasurementId;
  if (!gaId || gaId === 'G-XXXXXXXXXX') return;

  let loaded = false;
  const loadScript = () => {
    if (loaded) return;
    loaded = true;
    cleanup();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { send_page_view: true });
  };

  const cleanup = () => {
    window.removeEventListener('scroll', loadScript);
    window.removeEventListener('mousemove', loadScript);
    window.removeEventListener('touchstart', loadScript);
    window.removeEventListener('keydown', loadScript);
    clearTimeout(timer);
  };

  window.addEventListener('scroll', loadScript, { passive: true, once: true });
  window.addEventListener('mousemove', loadScript, { passive: true, once: true });
  window.addEventListener('touchstart', loadScript, { passive: true, once: true });
  window.addEventListener('keydown', loadScript, { passive: true, once: true });
  const timer = setTimeout(loadScript, 3000);
}
