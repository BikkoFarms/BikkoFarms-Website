'use client';

import React from 'react';
import { InteractivePreview } from '../marketing/InteractivePreview';
import { PhoneCall, CheckSquare, Coins } from 'lucide-react';

export function HowItWorks() {
  const stepsText = [
    {
      title: '1. Register',
      desc: 'Sign up through your local cooperative or simply dial our shortcode on any phone. No data connection needed.',
      icon: PhoneCall,
    },
    {
      title: '2. Get Verified',
      desc: 'Your cooperative confirms your crop amount and quality. The whole process is handled on your behalf — nothing technical for you to do.',
      icon: CheckSquare,
    },
    {
      title: '3. Receive Cash',
      desc: 'Once verified, Cedis land in your Mobile Money wallet in minutes. No bank visit, no paperwork, no waiting.',
      icon: Coins,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-neutral-card/10 border-y border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">WORKS ON ANY PHONE</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Access Your Loan From Any Phone
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            No bank visit. No paperwork. Whether you have a smartphone or a basic feature phone, BikkoChain works for you.
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
