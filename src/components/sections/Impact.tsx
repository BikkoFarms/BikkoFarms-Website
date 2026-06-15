'use client';

import React from 'react';
import { Leaf, Award, Globe2, ShieldCheck } from 'lucide-react';

export function Impact() {
  const highlights = [
    {
      title: 'Farmer Income Growth',
      metric: '+25%',
      desc: 'By avoiding predatory interest cycles, farmers keep more profit to reinvest in crop quality and family savings.',
      icon: Leaf,
    },
    {
      title: 'Operational Cost Savings',
      metric: '70%',
      desc: 'BikkoChain’s 15% APY protocol interest rates reduce borrowing charges by over two-thirds compared to local micro-lenders.',
      icon: Award,
    },
    {
      title: 'Total Disbursed Capital',
      metric: '$1.4M',
      desc: 'Funding cocoa and coffee co-op members throughout Ashanti and Eastern regions during piloting phases.',
      icon: Globe2,
    },
    {
      title: 'Environmental Auditing',
      metric: '100%',
      desc: 'Enforcing EUDR crop origins tracking, validating that tokenized yields are produced without forest degradation.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="impact" className="py-20 relative bg-neutral-card/10 border-b border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mission & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">MISSION OUTCOMES</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight leading-tight">
              Real-World Results in Agritech Microfinance
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              BikkoChain is not just a blockchain concept; it is actively transforming agricultural economics in Ghana. By offering fair, instant liquidity backed by crops, we unlock prosperity for farming households and support sustainable supply chains.
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Our integration with local cooperatives ensures capital is directly tied to verified physical assets, creating a low-risk environment for global impact investors.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-neutral-card border border-neutral-border p-6 rounded-2xl shadow-sm hover:border-brand-green-500/20 transition-all duration-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-brand-green-600/10 flex items-center justify-center text-brand-green-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold font-serif text-brand-green-500">{item.metric}</span>
                  </div>
                  <h4 className="font-serif font-bold text-text-primary text-base tracking-tight">{item.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
