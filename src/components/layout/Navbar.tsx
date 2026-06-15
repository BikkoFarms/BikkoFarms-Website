'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sprout, Activity } from 'lucide-react';
import { ThemeToggle } from '../ui/theme-toggle';
import { Button } from '../ui/button';
import { useAnalytics } from '../shared/Analytics';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Kofi's Story", href: '#story' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Impact', href: '#impact' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleDemoClick = () => {
    trackEvent({
      action: 'click_request_demo_nav',
      category: 'Conversions',
      label: 'Request Demo from Navbar Header',
    });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-bg/80 backdrop-blur-md border-b border-neutral-border shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-ring rounded-lg"
            onClick={() => trackEvent({ action: 'click_logo', category: 'Navigation' })}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green-600 flex items-center justify-center text-white shadow-md shadow-brand-green-600/20 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-serif tracking-tight text-text-primary">
              Bikko<span className="text-brand-green-500 font-sans">Chain</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() =>
                  trackEvent({
                    action: `click_nav_${link.name.toLowerCase().replace(/\s+/g, '_')}`,
                    category: 'Navigation',
                  })
                }
                className="text-text-secondary hover:text-brand-green-600 font-medium text-sm transition-colors focus-ring rounded px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => {
              trackEvent({ action: 'click_partner_nav', category: 'Conversions' });
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Partner With Us
            </Button>
            <Button size="sm" onClick={handleDemoClick}>
              Request a Demo
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-neutral-border text-text-primary focus-ring cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-neutral-bg/95 backdrop-blur-lg z-40 md:hidden flex flex-col justify-between p-8 border-t border-neutral-border/60"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    trackEvent({
                      action: `click_mobile_nav_${link.name.toLowerCase().replace(/\s+/g, '_')}`,
                      category: 'Navigation',
                    });
                    setIsOpen(false);
                  }}
                  className="text-2xl font-serif text-text-primary hover:text-brand-green-600 transition-colors py-2 border-b border-neutral-border/40"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pb-12">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  trackEvent({ action: 'click_mobile_partner', category: 'Conversions' });
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
              >
                Partner With Us
              </Button>
              <Button className="w-full justify-center" onClick={handleDemoClick}>
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
