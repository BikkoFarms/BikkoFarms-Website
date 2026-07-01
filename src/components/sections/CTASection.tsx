'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sprout, Phone, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';
import { WaitlistModal } from './WaitlistModal';

export function CTASection() {
  const { trackEvent } = useAnalytics();
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    trackEvent({ action: 'open_waitlist_modal', category: 'Conversions', label: 'Bottom CTA Section' });
    setModalOpen(true);
  };

  const perks = [
    { icon: Sprout, text: 'First access when we launch in your region' },
    { icon: CheckCircle2, text: 'No fees, no commitment — completely free to join' },
    { icon: Phone, text: "Personal call from our team when you're up next" },
    { icon: Users, text: 'Be part of a community of 12,500+ farmers' },
  ];

  return (
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="contact" className="py-28 relative overflow-hidden bg-neutral-card/20 border-t border-neutral-border/40">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-green-500/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green-500/6 glow-blur z-0 animate-pulse" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — the ask */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-brand-green-500/10 border border-brand-green-500/20 px-3 py-1.5 rounded-full text-xs font-bold font-mono text-brand-green-600 dark:text-brand-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 animate-pulse" />
                  EARLY ACCESS OPEN NOW
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary leading-tight">
                  Ready for <span className="gradient-text-green">your</span> harvest to work for you?
                </h2>
                <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                  Join thousands of farmers already on the BikkoChain waitlist. 
                  When we launch in your region, you will be first in line — 
                  with fair loans, fast cash, and a team that actually cares.
                </p>
              </div>

              {/* Perks list */}
              <ul className="space-y-3.5">
                {perks.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <div className="w-7 h-7 rounded-lg bg-brand-green-500/10 border border-brand-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-brand-green-600 dark:text-brand-green-400" />
                      </div>
                      <span>{perk.text}</span>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Testimonial snippet */}
              <div className="border-l-4 border-brand-amber-500 pl-5 py-2 space-y-1">
                <p className="text-sm italic text-text-secondary leading-relaxed">
                  "I dialed the shortcode on my basic phone and received ₵2,500 in my MTN wallet in two minutes. 
                  My harvest this year is 30% better than last."
                </p>
                <p className="text-xs font-semibold text-text-primary">— Grace Osei, Cocoa Farmer, Kumasi</p>
              </div>
            </motion.div>

            {/* Right — the action card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="bg-neutral-card border border-neutral-border rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-amber-500" />

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-text-primary">Join the Waitlist</h3>
                  <p className="text-sm text-text-secondary">
                    Secure your spot now. Launching in Ashanti, Western, and Eastern regions first.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-neutral-border/50">
                  {[
                    { val: '12.5k+', label: 'On waitlist' },
                    { val: '3', label: 'Regions' },
                    { val: 'Free', label: 'To join' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl font-serif font-bold text-text-primary">{s.val}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Big CTA button */}
                <Button
                  onClick={openModal}
                  className="w-full h-14 text-base justify-center shadow-lg shadow-brand-green-600/20 hover:shadow-brand-green-600/30 transition-shadow"
                >
                  Secure My Spot — Join Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Secondary options */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <a
                    href="https://wa.me/233302009000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 border border-neutral-border rounded-xl text-xs font-semibold text-text-secondary hover:border-brand-green-500/40 hover:text-brand-green-600 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+233302009000"
                    className="flex items-center justify-center gap-2 p-3 border border-neutral-border rounded-xl text-xs font-semibold text-text-secondary hover:border-brand-green-500/40 hover:text-brand-green-600 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Us Directly
                  </a>
                </div>

                <p className="text-center text-[11px] text-text-muted">
                  Free to join. We will never spam or share your details.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
