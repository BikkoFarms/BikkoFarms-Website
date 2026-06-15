'use client';

import React from 'react';
import { Accordion } from '../ui/accordion';

export function Faq() {
  const faqItems = [
    {
      title: 'How does harvest collateral work?',
      content: (
        <p>
          Instead of physical deeds or assets, BikkoChain uses verified crop yield agreements. When a cooperative inspector validates your estimated harvest volume (e.g., 20 bags of cocoa), this contract is minted as a digital token (NFT) on the Lisk network. The token is locked in a lending escrow smart contract, securing the value of your loan.
        </p>
      ),
    },
    {
      title: 'Do farmers need a smartphone to use BikkoChain?',
      content: (
        <p>
          No. We recognize that internet access can be limited. Farmers can register, apply for loans, and confirm payouts using a basic feature phone by dialing a standard USSD code (<strong>*384*22#</strong>). For users with entry-level smartphones, we also offer an interactive, zero-data WhatsApp chatbot.
        </p>
      ),
    },
    {
      title: 'How quickly are loans approved and disbursed?',
      content: (
        <p>
          Once your cooperative inspector uploads the crop yield certificate, the on-chain risk engine verifies the parameters and approves the loan automatically. Payouts are triggered instantly, converting stablecoins into local Cedis and depositing them directly to your Mobile Money wallet in less than 2 minutes.
        </p>
      ),
    },
    {
      title: 'Is blockchain secure for agricultural finance?',
      content: (
        <p>
          Yes. BikkoChain is deployed on Lisk, a secure, EVM-compatible Layer-2 blockchain anchored to Ethereum. Every transaction, collateral lock, and repayment event is permanently written to the ledger. This cryptographic transparency prevents fraud and allows global impact investors to fund loans with high confidence.
        </p>
      ),
    },
    {
      title: 'Which mobile money providers are supported in Ghana?',
      content: (
        <p>
          Our integration with Kotani Pay supports all major mobile money carriers in Ghana, including <strong>MTN Mobile Money</strong>, <strong>Telecel (Vodafone) Cash</strong>, and <strong>AT (AirtelTigo) Money</strong>. Funds are sent directly to the phone number linked during registration.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 relative bg-neutral-card/10 border-b border-neutral-border/40">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">COMMON INQUIRIES</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Everything you need to know about the BikkoChain protocol, lending metrics, and mobile wallets.
          </p>
        </div>

        {/* Collapsible items */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl p-6 md:p-8 shadow-sm">
          <Accordion items={faqItems} />
        </div>

      </div>
    </section>
  );
}
