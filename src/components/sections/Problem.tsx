'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Coins, Ban } from 'lucide-react';

export function Problem() {
  const painPoints = [
    {
      title: 'Exorbitant Interest Rates',
      desc: 'Local microfinance and loan sharks charge interest rates exceeding 45–60% APY, trapping smallholder families in permanent debt.',
      icon: Coins,
    },
    {
      title: 'No Traditional Collateral',
      desc: 'Commercial banks demand property deeds, motor vehicles, or salary statements. Smallholder farmers own land collectively without deeds, blocking access.',
      icon: Ban,
    },
    {
      title: 'Delayed Disbursals',
      desc: 'Standard agricultural credit applications take 4 to 8 weeks. By the time loans are approved, planting cycles have passed, and yield margins are lost.',
      icon: AlertTriangle,
    },
  ];

  return (
    <section id="story" className="py-24 relative bg-neutral-card/20 border-t border-neutral-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Layout grid: Storytelling vs Painpoints list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Storytelling - Kofi's Journey */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-brand-amber-600 dark:text-brand-amber-500 bg-brand-amber-500/10 border border-brand-amber-500/20 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              THE REALITY FOR 500M SMALLHOLDERS
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight leading-tight">
              {"Kofi's Cycle: A Story of Credit Exclusion"}
            </h2>
            
            <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
              <p>
                Meet <strong className="font-semibold text-text-primary">Kofi Mensah</strong>, a cocoa farmer in the Ashanti region of Ghana. Every May, before the crop harvesting season begins, Kofi needs capital to purchase fertilizer, organic pesticides, and hire additional labor to ensure a healthy yield.
              </p>
              <p>
                Kofi does not own a car or have a formal salary. His farm is family-owned and lacks a single land registry deed. When he asks commercial banks for a small $150 credit to purchase farming supplies, he is immediately turned away.
              </p>
              <p>
                Left with no choice, Kofi borrows from informal lenders at <strong className="font-semibold text-text-primary">55% APY</strong>. When his cocoa is finally sold, over half of his total earnings are paid back in high interest, leaving him unable to save or invest for the next cycle.
              </p>
            </div>

            {/* Quick quote block */}
            <div className="border-l-4 border-brand-amber-500 pl-4 py-1 italic text-text-primary text-sm font-medium">
              "We work hard all season, but the high interest takes everything. We borrow just to buy seeds, but we cannot grow."
              <span className="block text-xs text-text-secondary mt-1 font-sans not-italic font-semibold">— Kofi Mensah, Ashanti Cocoa Farmer</span>
            </div>
          </motion.div>

          {/* Pain points grid & Comparison Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="bg-neutral-card border border-neutral-border p-5 rounded-xl space-y-3 shadow-sm hover:border-brand-amber-500/30 transition-all duration-300 hover:scale-[1.01]">
                    <div className="w-9 h-9 rounded-lg bg-brand-amber-500/10 border border-brand-amber-500/20 flex items-center justify-center text-brand-amber-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm tracking-tight">{point.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{point.desc}</p>
                  </div>
                );
              })}
              
              {/* Financial comparison visual stats */}
              <div className="bg-neutral-card border border-neutral-border p-6 rounded-xl space-y-6 shadow-sm sm:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand-amber-500/5 glow-blur" />
                
                <h4 className="font-semibold text-text-primary text-sm tracking-tight border-b border-neutral-border/40 pb-2">The Financial Contrast</h4>
                
                <div className="space-y-4">
                  {/* Predatory rates bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-text-secondary">Informal / Predatory APY</span>
                      <span className="text-brand-amber-500">55% APY</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-border/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '55%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-brand-amber-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Commercial bank rate bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-text-secondary">Commercial Bank APY (Requires Collateral)</span>
                      <span className="text-text-primary">35% APY</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-border/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '35%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-text-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* BikkoChain rates bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-brand-green-600 dark:text-brand-green-500">
                      <span>BikkoChain Protocol APY (Yield Collateralized)</span>
                      <span>15% APY</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-border/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '15%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-brand-green-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
