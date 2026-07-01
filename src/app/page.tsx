import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { FloatingWaitlistBar } from '../components/layout/FloatingWaitlistBar';
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

      {/* Scroll-triggered floating waitlist bar */}
      <FloatingWaitlistBar />

      <main className="flex-grow">
        {/* Story-first Hero with waitlist CTA */}
        <Hero />

        {/* Brand Partnerships & Trust Badging */}
        <TrustSignals />

        {/* Kofi's Story — Narrative Timeline */}
        <Problem />

        {/* Five Step Process */}
        <Solution />

        {/* How It Works & Phone Demo */}
        <HowItWorks />

        {/* Feature Grid */}
        <Features />

        {/* Regional Impact Map */}
        <Impact />

        {/* Farmer Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <Faq />

        {/* Final Waitlist CTA — two-column story card */}
        <CTASection />
      </main>

      {/* Structured Site Footer */}
      <Footer />
    </>
  );
}
