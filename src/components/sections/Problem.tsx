'use client';

import React from 'react';
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
    <section id="story" className="py-20 relative bg-neutral-card/20 border-t border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Layout grid: Storytelling vs Painpoints list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Storytelling - Kofi's Journey */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-brand-amber-500 bg-brand-amber-500/10 border border-brand-amber-500/20 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5" />
              THE REALITY FOR 500M SMALLHOLDERS
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight leading-tight">
              Kofi\'s Cycle: A Story of Credit Exclusion
            </h2>
            
            <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
              <p>
                Meet **Kofi Mensah**, a cocoa farmer in the Ashanti region of Ghana. Every May, before the crop harvesting season begins, Kofi needs capital to purchase fertilizer, organic pesticides, and hire additional labor to ensure a healthy yield.
              </p>
              <p>
                Kofi does not own a car or have a formal salary. His farm is family-owned and lacks a single land registry deed. When he asks commercial banks for a small $150 credit to purchase farming supplies, he is immediately turned away.
              </p>
              <p>
                Left with no choice, Kofi borrows from informal lenders at **55% APY**. When his cocoa is finally sold, over half of his total earnings are paid back in high interest, leaving him unable to save or invest for the next cycle.
              </p>
            </div>

            {/* Quick quote block */}
            <div className="border-l-4 border-brand-amber-500 pl-4 py-1 italic text-text-primary text-sm font-medium">
              "We work hard all season, but the high interest takes everything. We borrow just to buy seeds, but we cannot grow."
              <span className="block text-xs text-text-secondary mt-1 font-sans not-italic font-semibold">— Kofi Mensah, Ashanti Cocoa Farmer</span>
            </div>
          </div>

          {/* Pain points grid & Comparison Table */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="bg-neutral-card border border-neutral-border p-5 rounded-xl space-y-3 shadow-sm hover:border-brand-amber-500/30 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-lg bg-brand-amber-500/10 border border-brand-amber-500/20 flex items-center justify-center text-brand-amber-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm tracking-tight">{point.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{point.desc}</p>
                  </div>
                );
              })}
              
              {/* Financial comparison stats */}
              <div className="bg-neutral-card border border-neutral-border p-5 rounded-xl space-y-4 shadow-sm sm:col-span-2">
                <h4 className="font-semibold text-text-primary text-sm tracking-tight border-b border-neutral-border/40 pb-2">The Financial Contrast</h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average Lending Rate (Ghana Banks)</span>
                    <span className="font-mono font-semibold text-text-primary">32% - 38% APY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Microfinance & Informal Lenders</span>
                    <span className="font-mono font-semibold text-brand-amber-500">45% - 60% APY</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-brand-green-500">
                    <span>BikkoChain Protocol Rate</span>
                    <span className="font-mono">15% APY</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
