'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from '../ui/accordion';
import { useAnalytics } from '../shared/Analytics';

export function Faq() {
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = React.useState<'farmers' | 'coops' | 'partners'>('farmers');

  const tabs = [
    { id: 'farmers', name: 'For Farmers' },
    { id: 'coops', name: 'For Cooperatives' },
    { id: 'partners', name: 'For Partners' },
  ] as const;

  const handleTabChange = (tabId: 'farmers' | 'coops' | 'partners') => {
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
            No — BikkoChain is designed for everyone. You can apply, check your loan, and confirm repayments using any basic phone by dialling <strong>*384*22#</strong>. If you have a smartphone, you can also use our WhatsApp chatbot, which works even on slow internet connections.
          </p>
        ),
      },
      {
        title: 'Which mobile money wallets are supported?',
        content: (
          <p>
            We support all the major mobile money services in Ghana. You can receive your loan directly into your <strong>MTN Mobile Money</strong>, <strong>Telecel Cash</strong>, or <strong>AT Money</strong> wallet — whichever you already use.
          </p>
        ),
      },
      {
        title: 'How quickly do I receive my money?',
        content: (
          <p>
            Once your cooperative confirms your crop, your loan is approved automatically. The money arrives in your mobile wallet in <strong>under 2 minutes</strong>. No waiting days or weeks — it's that fast.
          </p>
        ),
      },
      {
        title: 'Do I need land documents or a bank account?',
        content: (
          <p>
            No. Your certified harvest is your only requirement. We don't need land deeds, salary slips, or a bank account. If your co-op can confirm your crop, you can qualify for a loan.
          </p>
        ),
      },
    ],
    coops: [
      {
        title: 'How does using the harvest as security work?',
        content: (
          <p>
            Instead of requiring physical assets, BikkoChain uses the value of your members' crops as security for their loans. Your cooperative certifies each farmer's crop quantity and quality. That certification is all that's needed to approve a loan — our system handles the rest automatically.
          </p>
        ),
      },
      {
        title: 'What does a Cooperative Supervisor need to do?',
        content: (
          <p>
            Supervisors register member farmers, verify harvest weights during inspection, and confirm crop quality through the BikkoChain app or WhatsApp. When the co-op sells the harvest to buyers, loan repayments are settled automatically — no manual collection needed.
          </p>
        ),
      },
      {
        title: "Is it safe for our members' data?",
        content: (
          <p>
            Yes. All farmer records are handled securely and in line with Ghana's data protection regulations. Only your cooperative and BikkoChain can access member-level information. We never sell or share data with third parties.
          </p>
        ),
      },
    ],
    partners: [
      {
        title: 'Is BikkoChain a regulated service?',
        content: (
          <p>
            Yes. BikkoChain operates as a licensed pilot microfinance service under the Ghana Ministry of Food and Agriculture (MoFA). All lending activities follow regulated frameworks designed to protect farmers and cooperative partners.
          </p>
        ),
      },
      {
        title: 'How is loan risk managed?',
        content: (
          <p>
            Risk is managed through two layers: cooperative-level verification before any loan is issued, and automatic repayment collection when the harvest is sold. In the rare event of a poor harvest season, our team works directly with affected cooperatives to find fair solutions.
          </p>
        ),
      },
      {
        title: 'How can my organisation get involved?',
        content: (
          <p>
            We welcome cooperative unions, NGOs, financial institutions, and sustainability-focused organisations. Use the contact form below to get in touch and our team will reach out within 24 hours to discuss how we can work together.
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
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">GOT QUESTIONS?</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Quick answers to the questions we hear most from farmers, cooperative leaders, and partners.
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
