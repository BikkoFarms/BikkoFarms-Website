'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Coins, CheckCircle, Leaf } from 'lucide-react';
import { useAnalytics } from '../shared/Analytics';

export function Impact() {
  const { trackEvent } = useAnalytics();
  const [selectedRegion, setSelectedRegion] = React.useState<number>(0);

  const regions = [
    {
      name: 'Ashanti Region',
      stats: { farmers: '6,450+', volume: '720 Tons', disbursed: '5.2M GHS', defaults: '0.8%' },
      x: '55%',
      y: '65%',
      desc: 'Our primary pilot zone containing the highest density of aggregated cocoa co-ops.',
    },
    {
      name: 'Western Region',
      stats: { farmers: '4,200+', volume: '510 Tons', disbursed: '3.6M GHS', defaults: '1.2%' },
      x: '30%',
      y: '80%',
      desc: 'Rich forest canopy zones, optimized for verified deforestation-free cocoa tracking.',
    },
    {
      name: 'Eastern Region',
      stats: { farmers: '1,850+', volume: '220 Tons', disbursed: '1.4M GHS', defaults: '0.5%' },
      x: '75%',
      y: '70%',
      desc: 'Coffee farming cooperatives exploring microfinance tokenization testbeds.',
    },
  ];

  const handleRegionClick = (idx: number) => {
    trackEvent({
      action: `select_region_${regions[idx].name.toLowerCase().replace(/\s+/g, '_')}`,
      category: 'Interaction',
      label: `User selected pilot region: ${regions[idx].name}`,
    });
    setSelectedRegion(idx);
  };

  return (
    <section id="impact" className="py-24 relative bg-neutral-card/10 border-b border-neutral-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Mission & Geographic Stats (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">PILOT HUBS</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight leading-tight">
              Real-World Outcomes in Ghana
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              BikkoChain operates in active partnerships with registered crop cooperatives in the Ashanti, Western, and Eastern regions of Ghana. Click on the pilot region pins in the interactive map to review localized volumes, loan statistics, and default rates.
            </p>

            {/* Display statistic detail boxes of the active region */}
            <div className="bg-neutral-card border border-neutral-border p-5 rounded-2xl space-y-4 shadow-sm relative">
              <h4 className="font-serif font-bold text-text-primary text-lg border-b border-neutral-border/30 pb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-green-500" />
                {regions[selectedRegion].name}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {regions[selectedRegion].desc}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Users className="w-3.5 h-3.5 text-brand-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Farmers</span>
                  </div>
                  <p className="text-base font-bold text-text-primary">{regions[selectedRegion].stats.farmers}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Leaf className="w-3.5 h-3.5 text-brand-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Tonnage</span>
                  </div>
                  <p className="text-base font-bold text-text-primary">{regions[selectedRegion].stats.volume}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Coins className="w-3.5 h-3.5 text-brand-lisk" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Disbursed</span>
                  </div>
                  <p className="text-base font-bold text-text-primary">{regions[selectedRegion].stats.disbursed}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Defaults</span>
                  </div>
                  <p className="text-base font-bold text-brand-green-500">{regions[selectedRegion].stats.defaults}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Pilots Map (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-neutral-card border border-neutral-border p-6 rounded-3xl h-[420px] flex items-center justify-center relative overflow-hidden shadow-md"
          >
            {/* Visual satellite radar grid line overrides */}
            <div className="absolute inset-0 bg-linear-to-b from-brand-green-500/0 via-brand-green-500/0 to-brand-green-500/2 z-0" />
            <div className="absolute top-0 left-0 w-full h-full border border-neutral-border/20 grid grid-cols-6 grid-rows-6 pointer-events-none z-0">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-neutral-border/10" />
              ))}
            </div>

            {/* Ghana Simple SVG Map mock outline */}
            <div className="w-[300px] h-[340px] relative z-10">
              <svg className="w-full h-full text-neutral-border/60 dark:text-neutral-border/30 hover:text-neutral-border transition-colors duration-300" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Asymmetric stylized Ghanaian map paths */}
                <path d="M25,20 L40,15 L60,18 L75,25 L80,45 L72,65 L85,85 L65,105 L50,100 L30,110 L20,95 L22,75 L15,55 L18,35 Z" fill="currentColor" fillOpacity="0.05" />
              </svg>

              {/* Pulsing geopin anchors */}
              {regions.map((reg, idx) => {
                const isSelected = selectedRegion === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleRegionClick(idx)}
                    style={{ left: reg.x, top: reg.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-ring rounded-full p-2 z-10"
                    aria-label={`Select ${reg.name} stats`}
                  >
                    <span className="relative flex h-4 w-4">
                      {/* Pulse */}
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-brand-green-500' : 'bg-brand-amber-500'
                      }`} />
                      
                      {/* Pin Dot */}
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-neutral-card shadow-sm ${
                        isSelected ? 'bg-brand-green-500' : 'bg-brand-amber-500'
                      }`} />
                    </span>
                    
                    {/* Floating text badge */}
                    <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-neutral-bg border text-[9px] font-mono font-bold transition-all whitespace-nowrap ${
                      isSelected
                        ? 'border-brand-green-500 text-brand-green-500'
                        : 'border-neutral-border text-text-secondary group-hover:text-text-primary'
                    }`}>
                      {reg.name}
                    </span>
                  </button>
                );
              })}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
