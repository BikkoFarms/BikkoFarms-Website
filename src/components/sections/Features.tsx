'use client';

import React from 'react';
import { MessageSquare, Phone, Sprout, Zap, Wallet, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export function Features() {
  const featuresList = [
    {
      title: 'WhatsApp Onboarding',
      desc: 'Simple interactive chatbot allows co-op agents and farmers to register, upload documents, and submit yield estimations.',
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Zero-Data USSD Access',
      desc: 'Farmers can check loan balances, apply for funding, and confirm money transfers on basic feature phones dialing *384*22#.',
      icon: Phone,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'Harvest Tokenization',
      desc: 'Transforms physical crop volumes into digital crop certificates (NFTs) that act as verifiable financial collateral.',
      icon: Sprout,
      color: 'text-brand-green-500 bg-brand-green-500/10',
    },
    {
      title: 'Instant Loan Approvals',
      desc: 'Automated contract risk check handles validation immediately. Funds are triggered for distribution in under 2 minutes.',
      icon: Zap,
      color: 'text-yellow-500 bg-yellow-500/10',
    },
    {
      title: 'Mobile Money Rails',
      desc: 'No bank account required. Integrated directly into MTN Mobile Money and Telecel Cash via Kotani Pay APIs.',
      icon: Wallet,
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      title: 'Transparent Audit Trails',
      desc: 'Every loan application, harvest valuation, and loan repayment event is cryptographically indexed on the Lisk ledger.',
      icon: ShieldCheck,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'EUDR Traceability',
      desc: 'Meets European Union Deforestation Regulation standards. Polygon geolocations of farms are logged directly inside harvest tokens.',
      icon: Globe,
      color: 'text-brand-lisk bg-brand-lisk/10',
    },
    {
      title: 'Ultra-Low Gas Fees',
      desc: 'Powered by the Lisk Layer-2 network, ensuring on-chain transactions cost less than $0.01 for maximum protocol yield.',
      icon: BarChart3,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
  ];

  return (
    <section id="features" className="py-20 relative bg-neutral-bg border-b border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">TECHNICAL SPECIFICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Built for Scale and Field Resiliency
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Combining state-of-the-art blockchain technology with the existing mobile interfaces agricultural communities use daily.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-card border border-neutral-border p-6 rounded-2xl space-y-4 shadow-sm hover:border-brand-green-500/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-text-primary text-base tracking-tight">{feature.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
