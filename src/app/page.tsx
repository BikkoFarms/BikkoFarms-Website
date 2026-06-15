import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { TrustSignals } from '../components/marketing/TrustSignals';
import { Problem } from '../components/sections/Problem';
import { Solution } from '../components/sections/Solution';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Features } from '../components/sections/Features';
import { Impact } from '../components/sections/Impact';
import { Testimonials } from '../components/sections/Testimonials';
import { Faq } from '../components/sections/Faq';
import { CTASection } from '../components/sections/CTASection';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Sticky Header Nav */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner Grid Section */}
        <Hero />

        {/* Brand Partnerships & Trust Badging */}
        <TrustSignals />

        {/* Problem Story (Kofi Mensah Cocoa Farm) */}
        <Problem />

        {/* Five Step Core Pipeline Timeline Map */}
        <Solution />

        {/* How It Works & Live Interactive Dashboard Simulation */}
        <HowItWorks />

        {/* Feature Grid Catalog */}
        <Features />

        {/* Metrics outcome dashboard */}
        <Impact />

        {/* Pilot user quotes */}
        <Testimonials />

        {/* Expandable FAQs Accordion */}
        <Faq />

        {/* Final Conversion Form Trigger */}
        <CTASection />
      </main>

      {/* Structured Site Footer */}
      <Footer />
    </>
  );
}
