'use client';

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { WaitlistModal } from './WaitlistModal';
import { useAnalytics } from '../shared/Analytics';

export function Testimonials() {
  const { trackEvent } = useAnalytics();
  const [modalOpen, setModalOpen] = React.useState(false);

  const reviews = [
    {
      quote: "BikkoChain has completely changed how our cooperative works. We used to wait weeks for bank approvals. Now, the capital is in the farmer's hands in minutes.",
      author: "Emmanuel Boakye",
      role: "Agricultural Co-op Supervisor",
      location: "Sefwi Wiawso, Ghana",
      tag: "Cooperative Leader",
      avatar: "🧑🏿‍🌾",
    },
    {
      quote: "I dialed the shortcode on my feature phone and received ₵2,500 directly to my MTN wallet within two minutes. I bought fertilizers early and my harvest is 30% higher than last year.",
      author: "Grace Osei",
      role: "Cocoa Farmer",
      location: "Kumasi Region, Ghana",
      tag: "Smallholder Farmer",
      avatar: "👩🏾‍🌾",
      featured: true,
    },
    {
      quote: "Our farmers' crops now come with verified sustainability records. Our European buyers trust Ghanaian cocoa more than ever — and that means better prices for every farmer.",
      author: "Dr. Amara Mensah",
      role: "Agritech Coordinator & Analyst",
      location: "Accra, Ghana",
      tag: "NGO Partner",
      avatar: "👨🏾‍💼",
    },
  ];

  return (
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="py-24 relative bg-neutral-bg border-b border-neutral-border/40">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">FARMERS SPEAK</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
              Real Stories from Real Farmers
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {"Don't take our word for it. Here's what farmers and community leaders across Ghana are saying."}
            </p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className={`bg-neutral-card border rounded-2xl flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
                  rev.featured
                    ? 'border-brand-green-500/40 ring-1 ring-brand-green-500/20'
                    : 'border-neutral-border'
                }`}
              >
                {rev.featured && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-green-600 to-brand-green-400" />
                )}
                <div className="p-6 space-y-4">
                  <Quote className="w-8 h-8 text-brand-green-500/20" />
                  <p className="text-sm text-text-secondary italic leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>
                
                <div className="border-t border-neutral-border/40 px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 flex items-center justify-center text-lg flex-shrink-0">
                      {rev.avatar}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-serif font-bold text-text-primary text-sm tracking-tight">{rev.author}</h5>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{rev.role}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{rev.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-mono text-brand-green-500 bg-brand-green-500/10 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                    {rev.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mid-section waitlist CTA — peak conversion moment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center space-y-4"
          >
            <p className="text-text-secondary text-base">
              <strong className="text-text-primary">Want to be the next success story?</strong>
            </p>
            <Button
              onClick={() => {
                trackEvent({ action: 'open_waitlist_modal', category: 'Conversions', label: 'Testimonials Mid CTA' });
                setModalOpen(true);
              }}
              size="lg"
            >
              Join the Waitlist Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-text-muted italic">
              *Testimonials from BikkoChain pilot phases in Sefwi Wiawso and Kumasi.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
