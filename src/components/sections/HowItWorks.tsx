'use client';

import React from 'react';
import { InteractivePreview } from '../marketing/InteractivePreview';
import { PhoneCall, CheckSquare, Coins } from 'lucide-react';

export function HowItWorks() {
  const stepsText = [
    {
      title: '1. Register via Mobile',
      desc: 'Farmers onboarding occurs directly through cooperatives using basic USSD codes or interactive WhatsApp chatbot flows.',
      icon: PhoneCall,
    },
    {
      title: '2. Quality Verification',
      desc: 'Cooperatives inspect and certify harvest weight, moisture, and grade parameters, minting a secure digital token on the ledger.',
      icon: CheckSquare,
    },
    {
      title: '3. Collateralized Payout',
      desc: 'Smart contracts lock the token and release Cedis immediately to the farmer’s Mobile Money wallet, circumventing commercial banks.',
      icon: Coins,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-neutral-card/10 border-y border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">PRODUCT PREVIEW</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            How It Works in the Field
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Our platform is designed for low-connectivity agricultural areas in Ghana, providing high-technology blockchain security via simple, zero-data mobile interfaces.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stepsText.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-neutral-card border border-neutral-border p-6 rounded-2xl space-y-4 shadow-sm hover:border-brand-green-500/20 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-green-600/10 border border-brand-green-500/20 flex items-center justify-center text-brand-green-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-text-primary text-base">{step.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Product Preview */}
        <div className="w-full">
          <InteractivePreview />
        </div>

      </div>
    </section>
  );
}
