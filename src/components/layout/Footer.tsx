'use client';

import React from 'react';
import { Sprout, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useAnalytics } from '../shared/Analytics';

export function Footer() {
  const { trackEvent } = useAnalytics();
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Onboarding', href: '#' },
      { name: 'Harvest Tokenization', href: '#' },
      { name: 'Lending Escrow', href: '#' },
      { name: 'USSD Directory', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Impact Report', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Lending Disclosures', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const handleLinkClick = (name: string) => {
    trackEvent({
      action: `click_footer_${name.toLowerCase().replace(/\s+/g, '_')}`,
      category: 'Navigation',
    });
  };

  return (
    <footer className="bg-neutral-bg border-t border-neutral-border py-16 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-green-500/5 glow-blur -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-green-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-text-primary">
                Bikko<span className="text-brand-green-500 font-sans">Chain</span>
              </span>
            </div>
            
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              Enabling smallholder cocoa and coffee farmers in Ghana to secure instant agricultural micro-loans using tokenized future harvests as collateral.
            </p>
            
            {/* Lisk Badge */}
            <div className="inline-flex items-center gap-2 border border-neutral-border/60 bg-neutral-card/30 px-3.5 py-2 rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-lisk animate-pulse" />
              <span className="text-xs font-semibold text-text-secondary">
                Powered by <span className="text-brand-lisk font-bold">Lisk L2</span> Ecosystem
              </span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4 font-mono">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.name)}
                    className="text-sm text-text-secondary hover:text-brand-green-500 transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4 font-mono">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.name)}
                    className="text-sm text-text-secondary hover:text-brand-green-500 transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4 font-mono">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-brand-green-500 flex-shrink-0" />
                <span className="truncate">hello@bikkochain.org</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-brand-green-500 flex-shrink-0" />
                <span>+233 30 200 9000</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-brand-green-500 flex-shrink-0 mt-0.5" />
                <span>Kumasi Agritech Hub, Ashanti Region, Ghana</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimers */}
        <div className="border-t border-neutral-border/60 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong className="font-semibold text-text-primary">Lending Disclosure:</strong> Loans issued through the BikkoChain protocol are collateralized by certified crop agreements verified by cooperative inspectors. Interest rates are determined dynamically on-chain and disburse in Cedis through licensed local mobile money operators.
            </p>
            <p className="text-[10px] text-text-muted">
              © {currentYear} BikkoChain Organization. All rights reserved. Registered agritech microfinance provider under GHS Ministry of Food and Agriculture (MoFA) pilot registries.
            </p>
            <div className="flex flex-wrap gap-4 text-[9px] text-text-muted font-semibold tracking-wider uppercase font-mono pt-1">
              <span>Licensed Pilot Operator (MoFA GH)</span>
              <span>•</span>
              <span>EUDR Forest Canopy Traceable</span>
              <span>•</span>
              <span>SEC RWA sandboxes compliant</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {links.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.name)}
                className="text-[11px] text-text-secondary hover:text-brand-green-500 transition-colors focus-ring rounded"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
