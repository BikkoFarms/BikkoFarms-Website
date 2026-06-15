'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sprout, ShieldCheck, Cpu, Wallet, RefreshCw } from 'lucide-react';

export function Solution() {
  const steps = [
    {
      title: 'Harvest Yield',
      desc: 'Farmer contracts crop quantities with certified local cooperatives.',
      icon: Sprout,
      color: 'border-brand-green-500/30 text-brand-green-500 bg-brand-green-500/5',
    },
    {
      title: 'Mint NFT Collateral',
      desc: 'Co-op supervisor verifies yield quality and mints crop metadata as an ERC-721 token.',
      icon: ShieldCheck,
      color: 'border-brand-amber-500/30 text-brand-amber-500 bg-brand-amber-500/5',
    },
    {
      title: 'Smart Contract Lock',
      desc: 'The NFT collateral is locked securely in BikkoChain lending escrows.',
      icon: Cpu,
      color: 'border-brand-lisk/30 text-brand-lisk bg-brand-lisk/5',
    },
    {
      title: 'Mobile Payout',
      desc: 'Stablecoins are bridged and disburse local Cedis to MTN/Telecel wallets.',
      icon: Wallet,
      color: 'border-brand-cyan/30 text-brand-cyan bg-brand-cyan/5',
    },
    {
      title: 'Repayment & Burn',
      desc: 'Co-op sells harvest to buyers; loan settles, and collateral token is released.',
      icon: RefreshCw,
      color: 'border-brand-green-500/30 text-brand-green-500 bg-brand-green-500/5',
    },
  ];

  return (
    <section className="py-20 bg-neutral-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500">THE PROTOCOL LAYER</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            How BikkoChain Bridges the Gap
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            By turning future physical harvests into digital collateral assets, we connect smallholder coffee and cocoa farmers directly to global liquidity protocols in a five-step secure pipeline.
          </p>
        </motion.div>

        {/* Process Timeline Card Flow */}
        <div className="relative">
          
          {/* Horizontal line for desktop, hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-neutral-border/60 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  key={idx}
                  className="bg-neutral-card border border-neutral-border p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 text-xs font-mono font-bold text-text-muted">
                    0{idx + 1}
                  </div>

                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-text-primary text-base">{step.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Flow Arrow (For non-last items) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-neutral-card border border-neutral-border items-center justify-center text-brand-green-500 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
