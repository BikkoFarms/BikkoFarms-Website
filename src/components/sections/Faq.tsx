'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from '../ui/accordion';
import { useAnalytics } from '../shared/Analytics';

export function Faq() {
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = React.useState<'farmers' | 'coops' | 'investors'>('farmers');

  const tabs = [
    { id: 'farmers', name: 'For Farmers' },
    { id: 'coops', name: 'For Cooperatives' },
    { id: 'investors', name: 'For Investors' },
  ] as const;

  const handleTabChange = (tabId: 'farmers' | 'coops' | 'investors') => {
    trackEvent({
      action: `toggle_faq_tab_${tabId}`,
      category: 'Interaction',
      label: `User toggled FAQ tab to: ${tabId}`,
    });
    setActiveTab(tabId);
  };

  const faqData = {
    farmers: [
      {
        title: 'Do I need a smartphone to borrow?',
        content: (
          <p>
            No. We designed BikkoChain for maximum access. Farmers can check loan terms, apply, and verify repayments using a basic feature phone dialing our shortcode <strong>*384*22#</strong>. For entry-level smartphone users, we also offer an interactive WhatsApp chatbot that works on low-bandwidth connections.
          </p>
        ),
      },
      {
        title: 'Which mobile money providers are supported in Ghana?',
        content: (
          <p>
            Our gateway integration with Kotani Pay supports all major mobile money carriers in Ghana. You can receive Cedi payouts directly to your <strong>MTN Mobile Money</strong>, <strong>Telecel (Vodafone) Cash</strong>, or <strong>AT Money</strong> wallet.
          </p>
        ),
      },
      {
        title: 'How quickly are loans disbursed?',
        content: (
          <p>
            Once your cooperative inspector approves your crop certificate and submits it to the ledger, the loan approval triggers instantly. Cedar payouts are deposited to your mobile wallet in under 2 minutes.
          </p>
        ),
      },
    ],
    coops: [
      {
        title: 'How does harvest collateral work?',
        content: (
          <p>
            Instead of physical assets or deeds, BikkoChain uses crop yields as collateral. The cooperative certifies crop quantities (e.g. 18 bags of cocoa), which is minted as a digital token (NFT) on the Lisk L2 network. This token is locked in a secure lending escrow smart contract as collateral.
          </p>
        ),
      },
      {
        title: 'What are the responsibilities of a Cooperative Supervisor?',
        content: (
          <p>
            Supervisors run biometric registrations for member farmers, verify harvest weights and moisture levels, and initiate the on-chain minting transactions. Repayments occur automatically when the co-op aggregates and sells the harvest to commodity buyers.
          </p>
        ),
      },
    ],
    investors: [
      {
        title: 'Is the Lisk Layer-2 network secure?',
        content: (
          <p>
            Yes. BikkoChain is deployed on Lisk, an EVM-compatible Layer-2 ecosystem anchored to Ethereum. This guarantees cryptographically secure escrow smart contracts, full state audit transparency, and gas fees under $0.01 per validation.
          </p>
        ),
      },
      {
        title: 'How is default risk managed?',
        content: (
          <p>
            We manage risks through two key layers: cooperative verification filters and Chainlink weather oracles. Crop yield predictions are physically validated before tokenization, and oracle triggers automatically pause repayment metrics during certified regional droughts or harvest failures.
          </p>
        ),
      },
    ],
  };

  return (
    <section id="faq" className="py-24 relative bg-neutral-card/10 border-b border-neutral-border/40">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">SUPPORT CORE</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Common Inquiries
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Select a category below to review questions regarding mobile cashouts, cooperative structures, and blockchain security.
          </p>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1.5 bg-neutral-bg border border-neutral-border p-1 rounded-xl shadow-sm">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-ring ${
                    isSelected ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFaqTab"
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="absolute inset-0 bg-brand-green-600 rounded-lg shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List container */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl p-6 md:p-8 shadow-sm min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Accordion items={faqData[activeTab]} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
