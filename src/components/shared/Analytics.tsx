'use client';

import * as React from 'react';

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = React.useCallback(({ action, category, label, value }: AnalyticsEvent) => {
    // Console log events in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c[Analytics] ${category} > ${action} ${label ? `(${label})` : ''} ${value !== undefined ? `[Val: ${value}]` : ''}`,
        'color: #10b981; font-weight: bold; font-family: monospace;'
      );
    }

    // Window global analytics pushes (Google Analytics / PostHog placeholders)
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.gtag) {
        win.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
      if (win.posthog) {
        win.posthog.capture(`${category}_${action}`, {
          label,
          value,
        });
      }
    }
  }, []);

  return { trackEvent };
};

export function AnalyticsTracker() {
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    // Track page views
    trackEvent({ action: 'pageview', category: 'General', label: 'BikkoChain Landing Page' });

    // Track scroll depth thresholds (25%, 50%, 75%, 100%)
    let scrollThresholds = [25, 50, 75, 95];
    const loggedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPos = window.scrollY;
      const pct = Math.round((scrollPos / scrollHeight) * 100);

      scrollThresholds.forEach((thresh) => {
        if (pct >= thresh && !loggedThresholds.has(thresh)) {
          loggedThresholds.add(thresh);
          trackEvent({
            action: `scroll_${thresh}`,
            category: 'Engagement',
            label: `User scrolled down ${thresh}%`,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  return null;
}
