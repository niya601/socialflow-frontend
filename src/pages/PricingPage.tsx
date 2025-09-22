import React from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { PricingSection } from '../components/landing/PricingSection';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <div className="pt-20">
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
};