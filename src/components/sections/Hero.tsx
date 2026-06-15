'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, Clock, Sprout } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

export function Hero() {
  const { trackEvent } = useAnalytics();

  const handlePrimaryClick = () => {
    trackEvent({ action: 'click_hero_primary', category: 'Conversions', label: 'Request Demo' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryClick = () => {
    trackEvent({ action: 'click_hero_secondary', category: 'Conversions', label: 'Partner With Us' });
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Motion reveal variants (limited duration for premium restraint)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Premium Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-green-500/10 glow-blur -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-lisk/10 glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Copy Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Tagline pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 border border-brand-green-500/20 bg-brand-green-500/5 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-brand-green-500" />
            <span className="text-xs font-semibold text-brand-green-500 font-mono">LISK L2 BLOCKCHAIN INTEGRATED</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary tracking-tight leading-[1.1]"
          >
            Collateralize Your <span className="gradient-text-green">Harvest</span>, Secure Your <span className="gradient-text-amber">Growth</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            BikkoChain empowers smallholder cocoa and coffee farmers in Ghana to secure instant agricultural micro-loans using tokenized future harvests as collateral. Get paid directly to your mobile money wallet in under 2 minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Button size="lg" onClick={handlePrimaryClick}>
              Request a Demo
              <ArrowRight className="w-5 h-5 ml-1.5" />
            </Button>
            <Button variant="outline" size="lg" onClick={handleSecondaryClick}>
              See How It Works
            </Button>
          </motion.div>
        </motion.div>

        {/* Visual Showcase Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="bg-neutral-card/60 backdrop-blur-sm border border-neutral-border p-6 rounded-2xl shadow-xl space-y-6">
            
            {/* Display header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-border/40">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-text-secondary">LIVE IMPACT NETWORK</span>
              </div>
              <span className="text-xs font-semibold text-text-muted">GHS / USDC</span>
            </div>

            {/* Metrics items */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-bg/40 p-4 border border-neutral-border/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-brand-green-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">SPEED</span>
                </div>
                <p className="text-2xl font-serif font-bold text-text-primary">&lt; 2 Mins</p>
                <p className="text-[10px] text-text-secondary font-medium">Loan Approval & Payout</p>
              </div>

              <div className="bg-neutral-bg/40 p-4 border border-neutral-border/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-brand-amber-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">COST</span>
                </div>
                <p className="text-2xl font-serif font-bold text-text-primary">15% APY</p>
                <p className="text-[10px] text-text-secondary font-medium">vs 50%+ Microfinance</p>
              </div>

              <div className="bg-neutral-bg/40 p-4 border border-neutral-border/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-brand-lisk">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">REPAYMENT</span>
                </div>
                <p className="text-2xl font-serif font-bold text-text-primary">1.8%</p>
                <p className="text-[10px] text-text-secondary font-medium">Protocol Default Rate</p>
              </div>

              <div className="bg-neutral-bg/40 p-4 border border-neutral-border/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-brand-cyan">
                  <Sprout className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">VOLUME</span>
                </div>
                <p className="text-2xl font-serif font-bold text-text-primary">12,500+</p>
                <p className="text-[10px] text-text-secondary font-medium">Smallholders Onboarded</p>
              </div>
            </div>

            {/* Quick alert bar */}
            <div className="bg-brand-green-500/5 border border-brand-green-500/20 px-3.5 py-2.5 rounded-lg text-xs flex items-center gap-2">
              <span className="text-brand-green-500 font-bold font-mono">NEWS</span>
              <p className="text-text-secondary">Ghana Cocoa Board partners with BikkoChain pilots</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
