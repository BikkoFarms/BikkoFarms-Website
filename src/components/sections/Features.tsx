'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Sprout, Zap, Wallet, BarChart3, Globe, ShieldCheck, MapPin } from 'lucide-react';

export function Features() {
  const bentoFeatures = [
    {
      title: 'WhatsApp Onboarding',
      desc: 'Register, upload photos of your harvest, and check your loan status — all through a simple WhatsApp chat. No training needed.',
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      size: 'col-span-1 lg:col-span-2',
    },
    {
      title: 'Works on Basic Phones',
      desc: 'No smartphone? No problem. Dial *384*22# on any feature phone to check your loan or confirm payment — works without internet.',
      icon: Phone,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      size: 'col-span-1 lg:col-span-2',
      highlight: true,
    },
    {
      title: 'Your Harvest is Your Collateral',
      desc: 'No land deeds. No bank accounts. Your certified crop yield is all the security we need to approve your loan.',
      icon: Sprout,
      color: 'text-brand-green-500 bg-brand-green-500/10 border-brand-green-500/20',
      size: 'col-span-1',
    },
    {
      title: 'Money in Minutes',
      desc: 'Once your crop is verified by your co-op, your loan is approved and sent to your phone in under 2 minutes.',
      icon: Zap,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      size: 'col-span-1',
    },
    {
      title: 'Straight to Mobile Money',
      desc: 'Funds go directly to your MTN Mobile Money, Telecel Cash, or AT Money wallet — whichever you already use.',
      icon: Wallet,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      size: 'col-span-1',
    },
    {
      title: 'Eco-Friendly Farming',
      desc: 'We confirm your farm is forest-safe, making your crops eligible for premium international buyers who pay higher prices for sustainable produce.',
      icon: Globe,
      color: 'text-brand-lisk bg-brand-lisk/10 border-brand-lisk/20',
      size: 'col-span-1 lg:col-span-4',
      mapHighlight: true,
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-neutral-bg border-b border-neutral-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">BUILT FOR FARMERS FIRST</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            From any phone to your wallet — we handle the complexity so you can focus on farming.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {bentoFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.05 }}
                key={idx}
                className={`bg-neutral-card border border-neutral-border p-6 rounded-2xl flex flex-col justify-between hover:border-brand-green-500/20 transition-all duration-300 group ${feat.size} relative overflow-hidden`}
              >
                {/* Background soft hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green-500/0 via-brand-green-500/0 to-brand-green-500/2 group-hover:to-brand-green-500/5 transition-all duration-300 z-0" />

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-text-primary text-lg tracking-tight">{feat.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">{feat.desc}</p>
                    </div>
                  </div>

                  {/* Custom highlights for Bento boxes */}
                  {feat.highlight && (
                    <div className="mt-6 bg-neutral-bg/60 border border-neutral-border/40 p-4 rounded-xl font-mono text-[11px] text-text-secondary space-y-1.5 animate-pulse">
                      <p className="text-brand-amber-500 font-bold">Dial: *384*22#</p>
                      <p>Welcome to BikkoChain.</p>
                      <p>1. Check My Loan Status</p>
                      <p>2. Confirm Harvest Submission</p>
                    </div>
                  )}

                  {feat.mapHighlight && (
                    <div className="mt-6 border border-neutral-border/40 rounded-xl overflow-hidden bg-neutral-bg/60 p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-8 flex flex-wrap gap-2 text-[10px] text-text-secondary">
                        <div className="bg-neutral-card border border-neutral-border px-2.5 py-1 rounded-md flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-green-500" />
                          <span>Sefwi Wiawso Farm Plot: OK-028</span>
                        </div>
                        <div className="bg-neutral-card border border-neutral-border px-2.5 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-green-500" />
                          <span>Forest Safe: Confirmed ✓</span>
                        </div>
                      </div>
                      
                      {/* Simulated visual radar */}
                      <div className="md:col-span-4 flex justify-end">
                        <div className="w-16 h-16 rounded-full border border-brand-green-500/30 flex items-center justify-center relative">
                          <div className="w-8 h-8 rounded-full border border-brand-green-500/50 flex items-center justify-center" />
                          <div className="w-2.5 h-2.5 bg-brand-green-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-brand-green-500 rounded-full absolute" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
