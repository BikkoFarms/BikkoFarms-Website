'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, Clock, ShieldCheck, Sprout, Database, Globe, Smartphone, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

export function Hero() {
  const { trackEvent } = useAnalytics();
  const [interactiveStep, setInteractiveStep] = React.useState(0); // 0: Physical Crop, 1: ERC-721 Token, 2: MoMo Disbursed
  const [animating, setAnimating] = React.useState(false);

  const handlePrimaryClick = () => {
    trackEvent({ action: 'click_hero_primary', category: 'Conversions', label: 'Request Demo' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryClick = () => {
    trackEvent({ action: 'click_hero_secondary', category: 'Conversions', label: 'Partner With Us' });
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerStepTransition = (nextStep: number) => {
    if (animating) return;
    trackEvent({
      action: `hero_visual_step_${nextStep}`,
      category: 'Interaction',
      label: `Triggered Hero Morph Step ${nextStep}`
    });
    setAnimating(true);
    setTimeout(() => {
      setInteractiveStep(nextStep);
      setAnimating(false);
    }, 400);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-brand-green-500/10 glow-blur z-0 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-brand-lisk/10 glow-blur z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Copy Content (Left Column) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 border border-brand-green-500/20 bg-brand-green-500/5 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-brand-green-500" />
            <span className="text-xs font-semibold text-brand-green-500 font-mono tracking-wider">HARVEST COLLATERALIZED LENDING</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary tracking-tight leading-[1.05]"
          >
            Bridge Your <span className="gradient-text-green">Crop Yield</span> Directly to <span className="gradient-text-amber">Liquidity</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed"
          >
            BikkoChain tokenizes future cocoa and coffee harvests, connecting Ghanaian smallholders to EVM lending escrows on the Lisk Network. Unlock micro-loans to your Mobile Money wallet in 2 minutes.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Button size="lg" onClick={handlePrimaryClick}>
              Request a Demo
              <ArrowRight className="w-5 h-5 ml-1.5" />
            </Button>
            <Button variant="outline" size="lg" onClick={handleSecondaryClick}>
              Become a Partner
            </Button>
          </motion.div>

          {/* Simple horizontal mini metrics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-border/40 max-w-lg"
          >
            <div>
              <p className="text-2xl font-serif font-bold text-brand-green-500">15% APY</p>
              <p className="text-[10px] text-text-secondary font-semibold uppercase mt-0.5 tracking-wider">Fixed Protocol Interest</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-text-primary">&lt; 2 mins</p>
              <p className="text-[10px] text-text-secondary font-semibold uppercase mt-0.5 tracking-wider">Payout Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-brand-lisk">12.5k+</p>
              <p className="text-[10px] text-text-secondary font-semibold uppercase mt-0.5 tracking-wider">Farmers Supported</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Morphing Product Preview Panel (Right Column) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative w-full h-[480px] flex items-center justify-center"
        >
          {/* Floating Outer Box */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full bg-neutral-card/60 backdrop-blur-sm border border-neutral-border p-6 rounded-2xl shadow-xl flex flex-col justify-between h-[450px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand-green-500/5 glow-blur" />

            {/* Dashboard header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-border/40">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-green-500" />
                <span className="text-xs font-mono font-bold text-text-secondary">RWA ASSET LOGS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] bg-neutral-bg border border-neutral-border px-2 py-0.5 rounded-full font-semibold text-text-secondary">
                <span className="w-1.5 h-1.5 bg-brand-green-500 rounded-full" />
                Active Testnet
              </div>
            </div>

            {/* Simulated States Container */}
            <div className="flex-grow flex items-center justify-center my-4 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {interactiveStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full space-y-4"
                  >
                    <div className="text-center space-y-1.5">
                      <div className="w-12 h-12 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 flex items-center justify-center text-brand-green-500 mx-auto">
                        <Sprout className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-text-primary text-base">Physical Harvest Contract</h4>
                      <p className="text-xs text-text-secondary max-w-[280px] mx-auto leading-relaxed">
                        Inspector verified crop yields from Kofi Mensah's farm aggregates.
                      </p>
                    </div>

                    <div className="bg-neutral-bg/60 p-4 border border-neutral-border/40 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Harvest Cargo:</span>
                        <span className="font-semibold text-text-primary">Cocoa Pods (Grade-A)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Verified weight:</span>
                        <span className="font-semibold text-text-primary">1.2 Metric Tons (18 Bags)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Est. Value (GHS):</span>
                        <span className="font-semibold text-brand-green-500">32,400 GHS</span>
                      </div>
                    </div>

                    <Button variant="secondary" className="w-full h-10 text-xs font-semibold" onClick={() => triggerStepTransition(1)}>
                      Tokenize Harvest Certificate
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </motion.div>
                )}

                {interactiveStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full space-y-4"
                  >
                    <div className="text-center space-y-1.5">
                      <div className="w-12 h-12 rounded-full bg-brand-amber-500/10 border border-brand-amber-500/20 flex items-center justify-center text-brand-amber-500 mx-auto">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-text-primary text-base">ERC-721 Harvest Token</h4>
                      <p className="text-xs text-text-secondary max-w-[280px] mx-auto leading-relaxed">
                        On-chain collateral minted with geolocations logged.
                      </p>
                    </div>

                    <div className="bg-neutral-bg/60 p-4 border border-brand-amber-500/20 rounded-xl space-y-2.5 text-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-brand-amber-500" />
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary font-mono">TOKEN ID:</span>
                        <span className="font-mono font-bold text-brand-amber-500">#BK-CC-109</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Deforestation Check:</span>
                        <span className="font-semibold text-brand-green-500 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Clean
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Max Borrow Limit:</span>
                        <span className="font-semibold text-text-primary font-mono">16,200 GHS (50% LTV)</span>
                      </div>
                    </div>

                    <Button className="w-full h-10 text-xs font-semibold" onClick={() => triggerStepTransition(2)}>
                      Lock Collateral & Borrow
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </motion.div>
                )}

                {interactiveStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full space-y-4"
                  >
                    <div className="text-center space-y-1.5">
                      <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mx-auto">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-text-primary text-base">Mobile Money Disbursed</h4>
                      <p className="text-xs text-text-secondary max-w-[280px] mx-auto leading-relaxed">
                        USDC converted to local GHS and pushed to MTN wallet.
                      </p>
                    </div>

                    <div className="border border-brand-green-500/20 bg-brand-green-500/5 p-4 rounded-xl text-center space-y-1.5">
                      <CheckCircle2 className="w-7 h-7 text-brand-green-500 mx-auto" />
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary font-mono">MTN WALLET RECEIPT</p>
                        <h5 className="text-base font-bold text-text-primary mt-0.5">+10,000.00 GHS</h5>
                      </div>
                      <p className="text-[10px] text-text-secondary">Reference ID: TXN-MTN-0948</p>
                    </div>

                    <Button variant="outline" className="w-full h-10 text-xs font-semibold" onClick={() => triggerStepTransition(0)}>
                      Restart Simulation Loop
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stepper progress dots */}
            <div className="flex items-center justify-between border-t border-neutral-border/40 pt-4 text-[10px] text-text-secondary">
              <span className="font-mono font-semibold">STAGE {interactiveStep + 1} OF 3</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => triggerStepTransition(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer focus-ring transition-colors ${
                      interactiveStep === i ? 'bg-brand-green-500' : 'bg-neutral-border/80'
                    }`}
                    aria-label={`Go to simulation step ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
