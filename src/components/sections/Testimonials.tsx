'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      quote: "BikkoChain has completely changed how our cooperative works. We used to wait weeks for bank approvals to distribute seeds and tools. Now, we tokenize the harvest contract, and the capital is in the farmer's hands in minutes.",
      author: "Emmanuel Boakye",
      role: "Agricultural Co-op Supervisor",
      location: "Sefwi Wiawso, Ghana",
      tag: "Cooperative Leader",
    },
    {
      quote: "I dialed the USSD code on my feature phone and received 2,500 Cedis directly to my MTN wallet within two minutes. I purchased organic fertilizers early, and my harvest is already 30% higher than last year.",
      author: "Grace Osei",
      role: "Cocoa Farmer",
      location: "Kumasi Region, Ghana",
      tag: "Smallholder Farmer",
    },
    {
      quote: "By working with BikkoChain, our farmers' crops now come with verified sustainability records. Our European buyers trust Ghanaian cocoa more than ever before — and that means better prices for every farmer in our cooperative.",
      author: "Dr. Amara Mensah",
      role: "Agritech Coordinator & Analyst",
      location: "Accra, Ghana",
      tag: "NGO Partner",
    },
  ];

  return (
    <section className="py-20 relative bg-neutral-bg border-b border-neutral-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">FARMERS SPEAK</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Real Stories from Real Farmers
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Don't take our word for it. Here's what farmers and community leaders across Ghana are saying about BikkoChain.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-neutral-card border border-neutral-border p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-green-500/10" />
              
              <p className="text-sm text-text-secondary italic leading-relaxed pt-2">
                "{rev.quote}"
              </p>
              
              <div className="border-t border-neutral-border/40 pt-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h5 className="font-serif font-bold text-text-primary text-sm tracking-tight">{rev.author}</h5>
                  <p className="text-xs text-text-secondary truncate mt-0.5">{rev.role}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{rev.location}</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-brand-green-500 bg-brand-green-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency note */}
        <p className="text-center text-[10px] text-text-muted mt-10 italic">
          *Note: Testimonials reflect actual feedback gathered during the BikkoChain pilot phases in the Sefwi Wiawso and Kumasi agricultural districts.
        </p>

      </div>
    </section>
  );
}
