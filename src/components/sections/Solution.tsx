'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sprout, BadgeCheck, Wallet, RefreshCw, Users } from 'lucide-react';

export function Solution() {
  const steps = [
    {
      title: 'Register with Your Co-op',
      desc: 'Join through your local farming cooperative. No bank account or smartphone required.',
      icon: Users,
      color: 'border-brand-green-500/30 text-brand-green-600 dark:text-brand-green-500 bg-brand-green-500/5',
    },
    {
      title: 'Harvest Gets Certified',
      desc: 'A co-op inspector visits your farm, weighs your crop, and confirms everything is in order.',
      icon: BadgeCheck,
      color: 'border-brand-amber-500/30 text-brand-amber-600 dark:text-brand-amber-500 bg-brand-amber-500/5',
    },
    {
      title: 'Loan is Approved',
      desc: 'Your certified harvest acts as your guarantee. No land deed or salary slip needed.',
      icon: Sprout,
      color: 'border-brand-lisk/30 text-sky-600 dark:text-brand-lisk bg-brand-lisk/5',
    },
    {
      title: 'Cash to Your Phone',
      desc: 'Money arrives in your Mobile Money wallet in minutes — MTN, Telecel, or AT Money.',
      icon: Wallet,
      color: 'border-brand-cyan/30 text-cyan-700 dark:text-brand-cyan bg-brand-cyan/5',
    },
    {
      title: 'Harvest Sold, Loan Settled',
      desc: 'At harvest time, the co-op sells your crop. The loan is settled automatically — any surplus goes directly to you.',
      icon: RefreshCw,
      color: 'border-brand-green-500/30 text-brand-green-600 dark:text-brand-green-500 bg-brand-green-500/5',
    },
  ];

  return (
    <section className="py-20 bg-neutral-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500">HOW IT WORKS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
            Your Harvest, Your Loan — In 5 Simple Steps
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            From crop to cash in your pocket — here's the journey, start to finish. No paperwork, no bank queues.
          </p>
        </motion.div>

        {/* Process Timeline Card Flow */}
        <div className="relative">
          
          {/* Horizontal line for desktop, hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-neutral-border/60 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  key={idx}
                  className="bg-neutral-card border border-neutral-border p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 text-xs font-mono font-bold text-text-muted">
                    0{idx + 1}
                  </div>

                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-text-primary text-base">{step.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Flow Arrow (For non-last items) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-neutral-card border border-neutral-border items-center justify-center text-brand-green-500 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
