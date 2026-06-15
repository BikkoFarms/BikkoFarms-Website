'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sprout, Lock, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

export function InteractivePreview() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const { trackEvent } = useAnalytics();

  const steps = [
    {
      title: 'Farmer Profile',
      icon: User,
      desc: 'Verify registry details on-chain',
      color: 'text-brand-green-600 dark:text-brand-green-500 bg-brand-green-500/10 border-brand-green-500/30',
    },
    {
      title: 'Tokenize Harvest',
      icon: Sprout,
      desc: 'Co-op verifies yield & mints NFT',
      color: 'text-brand-amber-600 dark:text-brand-amber-500 bg-brand-amber-500/10 border-brand-amber-500/30',
    },
    {
      title: 'Lock Collateral',
      icon: Lock,
      desc: 'Smart contract secures the yield',
      color: 'text-sky-600 dark:text-brand-lisk bg-brand-lisk/10 border-brand-lisk/30',
    },
    {
      title: 'Instant Cash-out',
      icon: Wallet,
      desc: 'Stablecoins converted to Mobile Money',
      color: 'text-cyan-700 dark:text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30',
    },
  ];

  const handleStepClick = (idx: number) => {
    trackEvent({
      action: `preview_step_${idx}`,
      category: 'Interaction',
      label: `User clicked preview step: ${steps[idx].title}`,
    });
    setIsLoading(true);
    setTimeout(() => {
      setActiveStep(idx);
      setIsLoading(false);
    }, 450);
  };

  const handleNext = () => {
    const nextIdx = (activeStep + 1) % steps.length;
    handleStepClick(nextIdx);
  };

  return (
    <div className="w-full bg-neutral-card border border-neutral-border rounded-2xl shadow-xl overflow-hidden relative p-6 md:p-8">
      {/* Background glow blur */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-green-500/5 glow-blur z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-lisk/5 glow-blur z-0" />

      <div className="relative z-10 w-full h-full">
        {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-border/40 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500">Live Simulation</span>
          <h3 className="text-2xl font-serif text-text-primary mt-1 font-bold">The Borrowing Journey</h3>
        </div>
        <div className="flex items-center gap-2 text-xs bg-neutral-bg border border-neutral-border px-3 py-1.5 rounded-full font-mono text-text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-green-500" />
          Lisk Sepolia Testnet Active
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 no-scrollbar">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`flex-shrink-0 flex items-center gap-4 text-left p-4 rounded-xl border transition-all duration-300 w-64 lg:w-full cursor-pointer focus-ring ${
                  isSelected
                    ? 'bg-neutral-bg border-brand-green-500 shadow-md'
                    : 'bg-transparent border-neutral-border/40 hover:border-neutral-border hover:bg-neutral-bg/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${step.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-text-primary tracking-tight">{step.title}</span>
                  <span className="text-xs text-text-secondary truncate mt-0.5">{step.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dashboard Visualizer */}
        <div className="lg:col-span-7 bg-neutral-bg/60 border border-neutral-border/60 rounded-xl p-5 md:p-6 min-h-[340px] flex flex-col justify-between relative">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-bg/90 backdrop-blur-xs flex flex-col items-center justify-center z-10 rounded-xl gap-3"
              >
                <div className="w-8 h-8 rounded-full border-2 border-brand-green-500 border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-text-secondary">Syncing ledger records...</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="w-full">
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-green-500" />
                    <span className="text-xs font-mono font-semibold text-text-secondary">FARMER REGISTRY</span>
                  </div>
                  <span className="text-xs font-semibold text-brand-green-600 dark:text-brand-green-500 bg-brand-green-500/10 px-2 py-0.5 rounded-md">MTN VERIFIED</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">Farmer Name</label>
                    <p className="text-sm font-semibold text-text-primary">Kofi Mensah</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">Location</label>
                    <p className="text-sm font-semibold text-text-primary">Ashanti Region, Ghana</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">Primary Crop</label>
                    <p className="text-sm font-semibold text-text-primary">Grade-A Cocoa</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">Farm Size</label>
                    <p className="text-sm font-semibold text-text-primary">4.2 Hectares</p>
                  </div>
                </div>

                <div className="bg-neutral-card/60 border border-neutral-border/40 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-green-500/10 flex items-center justify-center text-brand-green-600 dark:text-brand-green-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-text-primary">Biometric ID & Mobile Money Link</p>
                    <p className="text-text-secondary mt-0.5">Linked to MTN MoMo Wallet: 054 •••• 591</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-amber-500" />
                    <span className="text-xs font-mono font-semibold text-text-secondary">MINT COOP CERTIFICATE</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-brand-amber-500">NFT ERC-721</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-neutral-card/60 p-3 border border-neutral-border/40 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted">MINT STATUS</span>
                      <span className="text-xs font-semibold text-text-primary">Contract Mint Success</span>
                    </div>
                    <span className="text-[11px] font-mono bg-neutral-border/30 px-2 py-0.5 rounded text-brand-amber-600 dark:text-brand-amber-500">#BK-CC-109</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-card/40 p-3 rounded-lg">
                    <div>
                      <span className="text-text-secondary">Yield Estimate:</span>
                      <span className="font-semibold text-text-primary ml-1.5">18 Bags (1.1 Tons)</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Expected Price:</span>
                      <span className="font-semibold text-text-primary ml-1.5">32,400 GHS</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Moisture Index:</span>
                      <span className="font-semibold text-brand-green-600 dark:text-brand-green-500 ml-1.5">6.8% (Optimal)</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Traceability ID:</span>
                      <span className="font-semibold text-sky-600 dark:text-brand-lisk ml-1.5 font-mono">EUDR-09x4a</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-lisk" />
                    <span className="text-xs font-mono font-semibold text-text-secondary">EVM ESCROW SECURED</span>
                  </div>
                  <span className="text-xs font-semibold text-sky-600 dark:text-brand-lisk bg-brand-lisk/10 px-2 py-0.5 rounded-md">LOCKED</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs bg-neutral-card/60 p-3 border border-neutral-border/40 rounded-lg">
                    <span className="text-text-secondary">Locked Collateral NFT:</span>
                    <span className="font-mono font-semibold text-text-primary">#BK-CC-109</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-neutral-card/40 p-2.5 rounded-lg border border-neutral-border/30">
                      <p className="text-[10px] text-text-secondary font-semibold">Max Loan Value</p>
                      <p className="text-sm font-bold text-brand-green-600 dark:text-brand-green-500 mt-1">16,200 GHS</p>
                    </div>
                    <div className="bg-neutral-card/40 p-2.5 rounded-lg border border-neutral-border/30">
                      <p className="text-[10px] text-text-secondary font-semibold">Interest Rate</p>
                      <p className="text-sm font-bold text-brand-amber-600 dark:text-brand-amber-500 mt-1">15% APY</p>
                    </div>
                    <div className="bg-neutral-card/40 p-2.5 rounded-lg border border-neutral-border/30">
                      <p className="text-[10px] text-text-secondary font-semibold">Duration</p>
                      <p className="text-sm font-bold text-sky-600 dark:text-brand-lisk mt-1">6 Months</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-cyan" />
                    <span className="text-xs font-mono font-semibold text-text-secondary">STABLECOIN BRIDGE DISBURSE</span>
                  </div>
                  <span className="text-xs font-semibold text-cyan-700 dark:text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md">COMPLETED</span>
                </div>

                <div className="space-y-3">
                  <div className="border border-brand-green-500/20 bg-brand-green-500/5 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-brand-green-600 dark:text-brand-green-500 mx-auto" />
                    <div>
                      <p className="text-xs font-semibold text-text-secondary">Mobile money alert</p>
                      <h4 className="text-lg font-bold text-text-primary mt-0.5">+10,000.00 GHS</h4>
                    </div>
                    <p className="text-[10px] text-text-secondary">Sent to MTN MoMo Wallet (+233 54 •••• 591)</p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-text-muted px-1">
                    <span>Tx: 0x8a92...a34d</span>
                    <span>Fee: &lt; $0.005 USD (Lisk L2)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center justify-between border-t border-neutral-border/30 pt-4 mt-6">
            <span className="text-xs text-text-secondary">
              Step <span className="font-semibold font-mono text-text-primary">{activeStep + 1}</span> of {steps.length}
            </span>
            <Button size="sm" onClick={handleNext} className="h-9 px-4 text-xs font-semibold">
              Next Step
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
