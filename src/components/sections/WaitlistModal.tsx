'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Sprout, Phone, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { trackEvent } = useAnalytics();
  const [step, setStep] = React.useState<'form' | 'success'>('form');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('farmer');
  const [region, setRegion] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!phone.trim() && !email.trim()) { setError('Please enter your phone number or email.'); return; }

    setLoading(true);
    trackEvent({ action: 'waitlist_submit', category: 'Conversions', label: `Role: ${role} | Region: ${region}` });

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() || null, email: email.trim() || null, role, region: region || null }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStep('success');
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('form'); setName(''); setPhone(''); setEmail(''); setRegion(''); setError(''); }, 400);
  };

  const roles = [
    { id: 'farmer', label: 'I am a Farmer', icon: Sprout },
    { id: 'coop', label: 'I run a Co-op', icon: Users },
    { id: 'partner', label: 'Partner / Supporter', icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-0 flex items-center justify-center z-[70] px-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-neutral-card border border-neutral-border rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative">

              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-amber-500" />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-bg border border-neutral-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus-ring z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ── FORM STATE ── */}
                  {step === 'form' && (
                    <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      {/* Header */}
                      <div className="mb-6 space-y-1.5">
                        <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-brand-green-600 dark:text-brand-green-400 bg-brand-green-500/10 border border-brand-green-500/20 px-3 py-1 rounded-full mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 animate-pulse" />
                          EARLY ACCESS — FREE
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-primary leading-tight">
                          Be among the first farmers to get a loan with BikkoChain
                        </h2>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          Join our waitlist and we will reach out to you personally when we launch in your region. No fees, no commitment.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Your Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Kofi Mensah"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                            aria-label="Full name"
                          />
                        </div>

                        {/* Role selector */}
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">I am a…</label>
                          <div className="grid grid-cols-3 gap-2">
                            {roles.map((r) => {
                              const Icon = r.icon;
                              return (
                                <button
                                  key={r.id}
                                  type="button"
                                  onClick={() => setRole(r.id)}
                                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer focus-ring ${
                                    role === r.id
                                      ? 'border-brand-green-500 bg-brand-green-500/10 text-brand-green-600 dark:text-brand-green-400'
                                      : 'border-neutral-border bg-neutral-bg text-text-secondary hover:border-brand-green-500/40'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="text-center leading-tight">{r.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Phone Number (Mobile Money)</label>
                          <input
                            type="tel"
                            placeholder="+233 XX XXX XXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                            aria-label="Phone number"
                          />
                        </div>

                        {/* Email (optional) */}
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                            Email <span className="text-text-muted font-normal">(optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                            aria-label="Email address"
                          />
                        </div>

                        {/* Region */}
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Your Region in Ghana</label>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-hidden focus:border-brand-green-500 transition-colors cursor-pointer"
                            aria-label="Region"
                          >
                            <option value="">Select your region…</option>
                            <option>Ashanti Region</option>
                            <option>Western Region</option>
                            <option>Eastern Region</option>
                            <option>Central Region</option>
                            <option>Brong-Ahafo Region</option>
                            <option>Northern Region</option>
                            <option>Other Region</option>
                          </select>
                        </div>

                        {error && <p className="text-xs text-brand-amber-500 font-semibold">{error}</p>}

                        <Button
                          type="submit"
                          className="w-full justify-center h-12 text-base"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Joining…
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Join the Waitlist — It's Free
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          )}
                        </Button>

                        <p className="text-center text-[11px] text-text-muted">
                          By joining you agree to be contacted by our team when BikkoChain launches in your region. We never share your details.
                        </p>
                      </form>
                    </motion.div>
                  )}

                  {/* ── SUCCESS STATE ── */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 space-y-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-brand-green-500/15 border-2 border-brand-green-500/30 flex items-center justify-center mx-auto"
                      >
                        <CheckCircle2 className="w-10 h-10 text-brand-green-500" />
                      </motion.div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-text-primary">
                          You're on the list, {name.split(' ')[0]}! 🎉
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                          Thank you for joining BikkoChain. We will personally reach out when we launch in your region. Keep farming strong!
                        </p>
                      </div>
                      <div className="bg-brand-green-500/5 border border-brand-green-500/20 rounded-2xl p-4 text-sm text-text-secondary space-y-1">
                        <p className="font-semibold text-text-primary">What happens next?</p>
                        <p>✓ Our team will contact you via {phone ? 'phone/WhatsApp' : 'email'}</p>
                        <p>✓ You'll be first to access loans in your region</p>
                        <p>✓ No paperwork needed — just your harvest</p>
                      </div>
                      <Button variant="outline" onClick={handleClose} className="w-full justify-center">
                        Close
                      </Button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
