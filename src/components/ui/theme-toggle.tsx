'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useAnalytics } from '../shared/Analytics';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { trackEvent } = useAnalytics();

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-neutral-border/10 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    trackEvent({
      action: `toggle_${nextTheme}`,
      category: 'Preferences',
      label: `User toggled color mode to ${nextTheme}`,
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-neutral-border/60 hover:bg-neutral-border/50 text-text-primary focus-ring cursor-pointer transition-colors"
      aria-label={`Toggle theme (currently ${theme})`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-brand-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-brand-green-600" />
      )}
    </button>
  );
}
