import React from 'react';

export function TrustSignals() {
  return (
    <section className="border-y border-neutral-border/40 bg-neutral-card/30 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-secondary mb-8">
          Securing Trust with Industry-Leading Infrastructure
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity duration-300">
          
          {/* Lisk Logo */}
          <div className="flex items-center gap-2 group cursor-default">
            <svg className="w-8 h-8 text-brand-lisk group-hover:scale-105 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-text-primary">LISK NETWORK</span>
              <span className="text-[9px] text-brand-lisk font-semibold">EVM Layer-2</span>
            </div>
          </div>

          {/* Kotani Pay Logo */}
          <div className="flex items-center gap-2 group cursor-default">
            <svg className="w-8 h-8 text-brand-amber-500 group-hover:scale-105 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 6v12" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-text-primary">KOTANI PAY</span>
              <span className="text-[9px] text-brand-amber-500 font-semibold">Mobile Money Off-Ramp</span>
            </div>
          </div>

          {/* Chainlink Logo */}
          <div className="flex items-center gap-2 group cursor-default">
            <svg className="w-8 h-8 text-brand-lisk group-hover:scale-105 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l-5.63 3.25v6.5l5.63 3.25 5.63-3.25v-6.5zm0 1.73l4.13 2.38v4.77l-4.13 2.38-4.13-2.38v-4.77zM12 18.69l-5.63 3.25v6.5l5.63 3.25 5.63-3.25v-6.5z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-text-primary">CHAINLINK</span>
              <span className="text-[9px] text-brand-lisk font-semibold">Price & Weather Oracles</span>
            </div>
          </div>

          {/* Mobile Money Integration */}
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 rounded-full bg-brand-green-600/10 flex items-center justify-center text-brand-green-500 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-text-primary">MOBILE MONEY</span>
              <span className="text-[9px] text-brand-green-500 font-semibold">MTN, Telecel & AT Cash</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
