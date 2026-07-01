'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { WaitlistModal } from '../sections/WaitlistModal';
import { useAnalytics } from '../shared/Analytics';

export function FloatingWaitlistBar() {
  const { trackEvent } = useAnalytics();
  const [visible, setVisible] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~60% of the viewport
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[55] w-full max-w-md px-4"
          >
            <div className="bg-neutral-card/90 backdrop-blur-xl border border-neutral-border shadow-2xl shadow-black/20 rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">Ready to join BikkoChain?</p>
                <p className="text-xs text-text-muted">12,500+ farmers on the waitlist</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  trackEvent({ action: 'open_waitlist_modal', category: 'Conversions', label: 'Floating Bar CTA' });
                  setModalOpen(true);
                }}
                className="flex-shrink-0 shadow-md shadow-brand-green-600/20"
              >
                Join Free
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
