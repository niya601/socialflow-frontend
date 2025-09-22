import React from 'react';
import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <div className="flex items-center space-x-1 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Streamline Your
            <span className="block bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Social Media
            </span>
            Management
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create, schedule, and publish content across Instagram, TikTok, and YouTube 
            from one powerful platform. Save time and grow your audience faster.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              'Multi-platform publishing',
              'AI-powered scheduling',
              'Advanced analytics',
              'Team collaboration'
            ].map((benefit) => (
              <div key={benefit} className="flex items-center space-x-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/register"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-white/60 text-sm mb-6">No credit card required • 14-day free trial • Cancel anytime</p>
            
            {/* Mock Company Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['TechCorp', 'StartupCo', 'MediaGroup', 'BrandStudio', 'CreativeAgency'].map((company) => (
                <div key={company} className="text-white/40 font-semibold text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};