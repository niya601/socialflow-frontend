import React from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { FeaturesSection } from '../components/landing/FeaturesSection';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <div className="pt-20">
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};