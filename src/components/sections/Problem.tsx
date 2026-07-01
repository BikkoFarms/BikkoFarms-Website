'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Coins, Ban, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { WaitlistModal } from './WaitlistModal';
import { useAnalytics } from '../shared/Analytics';

export function Problem() {
  const { trackEvent } = useAnalytics();
  const [modalOpen, setModalOpen] = React.useState(false);

  const storyBeats = [
    {
      time: 'Every May',
      text: "Kofi Mensah walks to the nearest bank in Kumasi. He needs ₵2,000 to buy fertilizer before the planting window closes. He's been farming cocoa for 15 years. His farm is healthy. His harvest is good. He just needs a small loan to get started.",
      mood: 'hopeful',
    },
    {
      time: 'The Bank Says No',
      text: "The loan officer asks for a land deed. Kofi's family has farmed this land for three generations — but it has no formal title. Without a deed, there's no loan. Kofi walks home empty-handed. The planting season is already slipping away.",
      mood: 'hard',
    },
    {
      time: 'The Only Option Left',
      text: "Kofi finds a local moneylender. The terms: 55% interest. He has no choice. He borrows anyway. When the cocoa finally sells in November, more than half of everything he earned goes straight back. After 15 years of farming, he finishes the season with almost nothing to show for it.",
      mood: 'dark',
    },
    {
      time: 'With BikkoChain',
      text: "This year is different. Kofi's cooperative uses BikkoChain. His harvest is verified and accepted as security. Within minutes, ₵2,000 lands in his MTN wallet. He plants on time. The harvest is his best in years. The loan repays automatically when the crop sells — at 15% interest, not 55%.",
      mood: 'bright',
    },
  ];

  const moodStyles: Record<string, string> = {
    hopeful: 'border-brand-green-500/30 bg-brand-green-500/5',
    hard: 'border-brand-amber-500/30 bg-brand-amber-500/5',
    dark: 'border-red-500/20 bg-red-500/4',
    bright: 'border-brand-green-500/50 bg-brand-green-500/10',
  };

  const moodTimeStyles: Record<string, string> = {
    hopeful: 'text-brand-green-600 dark:text-brand-green-400',
    hard: 'text-brand-amber-600 dark:text-brand-amber-500',
    dark: 'text-red-500 dark:text-red-400',
    bright: 'text-brand-green-600 dark:text-brand-green-400',
  };

  return (
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="story" className="py-28 relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-amber-500/3 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-20"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-brand-amber-600 dark:text-brand-amber-500 bg-brand-amber-500/10 border border-brand-amber-500/20 px-3 py-1.5 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5" />
              🌾 A STORY REPEATED 500 MILLION TIMES A YEAR
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary leading-tight tracking-tight">
              {"Kofi's Story"}
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              His story is not unusual. It is the story of almost every smallholder farmer in Ghana. Until now.
            </p>
          </motion.div>

          {/* Story Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green-500/30 via-brand-amber-500/30 to-brand-green-500/50 hidden md:block" />

            <div className="space-y-8">
              {storyBeats.map((beat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="md:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center ${
                    beat.mood === 'bright' ? 'border-brand-green-500 bg-brand-green-500' : 'border-neutral-border bg-neutral-card'
                  }`}>
                    {beat.mood === 'bright' && <span className="text-white text-[8px]">✓</span>}
                  </div>

                  <div className={`border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-md ${moodStyles[beat.mood]}`}>
                    <p className={`text-xs font-bold font-mono uppercase tracking-widest mb-3 ${moodTimeStyles[beat.mood]}`}>
                      {beat.time}
                    </p>
                    <p className={`text-base md:text-lg leading-relaxed ${
                      beat.mood === 'bright' ? 'text-text-primary font-medium' : 'text-text-secondary'
                    }`}>
                      {beat.text}
                    </p>
                    {beat.mood === 'bright' && (
                      <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Button
                          onClick={() => {
                            trackEvent({ action: 'open_waitlist_modal', category: 'Conversions', label: "Kofi's Story CTA" });
                            setModalOpen(true);
                          }}
                          className="text-sm"
                        >
                          This should be your story too — Join the Waitlist
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* The contrast bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 bg-neutral-card border border-neutral-border rounded-3xl p-8 space-y-6"
          >
            <h3 className="text-center text-xl font-serif font-bold text-text-primary">The Difference BikkoChain Makes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Coins, before: 'Loan sharks: 55%+ interest', after: 'BikkoChain: 15% fair rate', color: 'text-brand-amber-500' },
                { icon: Ban, before: 'Banks: Land deed required', after: 'BikkoChain: Your harvest is enough', color: 'text-red-400' },
                { icon: AlertTriangle, before: 'Traditional loans: 4–8 weeks', after: 'BikkoChain: Under 2 minutes', color: 'text-brand-amber-600' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider font-mono">Before</span>
                    </div>
                    <p className="text-sm text-text-secondary line-through opacity-70">{item.before}</p>
                    <div className="h-px bg-neutral-border/40" />
                    <p className="text-sm font-semibold text-brand-green-600 dark:text-brand-green-400">✓ {item.after}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
