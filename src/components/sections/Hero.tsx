'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';
import { WaitlistModal } from './WaitlistModal';

export function Hero() {
  const { trackEvent } = useAnalytics();
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = (label: string) => {
    trackEvent({ action: 'open_waitlist_modal', category: 'Conversions', label });
    setModalOpen(true);
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden text-center px-6">

        {/* Rich ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-green-500/8 glow-blur z-0" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-brand-amber-500/8 glow-blur z-0" />
        <div className="absolute top-1/3 right-1/5 w-[300px] h-[300px] rounded-full bg-brand-green-600/6 glow-blur z-0" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto space-y-7"
        >
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center">
            <div className="inline-flex items-center gap-2 border border-brand-green-500/25 bg-brand-green-500/8 px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-brand-green-500" />
              <span className="text-xs font-bold font-mono text-brand-green-600 dark:text-brand-green-400 tracking-widest uppercase">
                Launching in Ghana — Join the Waitlist
              </span>
            </div>
          </motion.div>

          {/* Main headline — the story hook */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text-primary leading-[1.04] tracking-tight"
          >
            Kofi works hard.<br />
            <span className="gradient-text-amber">The system failed him.</span><br />
            <span className="gradient-text-green">We fixed that.</span>
          </motion.h1>

          {/* Story sub-paragraph */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
          >
            Every harvest season, thousands of Ghanaian farmers like Kofi are turned away by banks — 
            then forced to borrow from loan sharks at crushing rates. 
            <strong className="text-text-primary font-semibold"> BikkoChain changes that.</strong>{' '}
            Get a fair loan in minutes, sent straight to your phone. No bank. No land deed. Just your harvest.
          </motion.p>

          {/* Social proof numbers */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-8 py-2"
          >
            {[
              { value: '12,500+', label: 'Farmers on waitlist' },
              { value: '15%', label: 'Fair interest rate' },
              { value: '< 2 mins', label: 'Money arrives' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-serif font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Primary CTA — THE single goal */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => openModal('Hero Primary CTA')}
              className="text-base px-8 h-14 shadow-lg shadow-brand-green-600/20 hover:shadow-brand-green-600/30 transition-shadow"
            >
              Join the Waitlist — It's Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a
              href="#story"
              className="text-sm text-text-secondary hover:text-brand-green-600 transition-colors flex items-center gap-1.5 font-semibold group"
              onClick={() => trackEvent({ action: 'click_read_story', category: 'Navigation' })}
            >
              Read Kofi's Story
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Waitlist social proof ticker */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-3 bg-neutral-card/60 backdrop-blur-sm border border-neutral-border px-5 py-3 rounded-2xl shadow-sm">
              <div className="flex -space-x-2">
                {['🧑🏿‍🌾', '👩🏾‍🌾', '🧑🏾‍🌾', '👨🏿‍🌾'].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-brand-green-500/10 border-2 border-neutral-card flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-text-primary">Grace just joined from Kumasi</p>
                <p className="text-[10px] text-text-muted">2 minutes ago · 47 farmers joined today</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-text-muted" />
          </motion.div>
        </motion.div>

      </section>
    </>
  );
}
