'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

export function CTASection() {
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('Cooperative');
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    trackEvent({
      action: 'submit_demo_request',
      category: 'Conversions',
      label: `Email: ${email} | Role: ${role}`,
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-green-500/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-green-500/10 glow-blur -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-neutral-card border border-neutral-border p-8 md:p-12 rounded-3xl shadow-xl space-y-8 relative">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500 font-mono">GET STARTED</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
              Empower Your Harvest Today
            </h2>
            <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Join the future of agricultural microfinance. Request a demo for your cooperative or partner with us as an impact investor.
            </p>
          </div>

          {submitted ? (
            <div className="bg-brand-green-500/5 border border-brand-green-500/30 p-6 rounded-2xl max-w-md mx-auto space-y-3 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-brand-green-500 mx-auto" />
              <h4 className="font-serif font-bold text-text-primary text-lg">Thank You!</h4>
              <p className="text-xs text-text-secondary">
                We have received your demo request for <strong>{email}</strong> ({role} view). Our regional integration team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* Email field */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow h-11 px-4 rounded-lg bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                  aria-label="Email address"
                />

                {/* Role select dropdown */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-11 px-3 rounded-lg bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors cursor-pointer"
                  aria-label="Your Role"
                >
                  <option value="Cooperative">Co-op Leader</option>
                  <option value="Investor">Impact Investor</option>
                  <option value="Farmer">Farming Member</option>
                  <option value="Developer">Developer / Judge</option>
                </select>

              </div>

              {error && (
                <p className="text-xs text-brand-amber-500 text-left font-semibold">{error}</p>
              )}

              {/* Submit trigger */}
              <Button type="submit" className="w-full justify-center">
                Submit Request
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

            </form>
          )}

          <p className="text-[10px] text-text-muted">
            By submitting, you agree to our regional data protection regulations and privacy policies.
          </p>

        </div>
      </div>
    </section>
  );
}
