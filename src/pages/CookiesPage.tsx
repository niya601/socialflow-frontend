import React, { useState } from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { Cookie, Settings, Shield, BarChart3 } from 'lucide-react';

export const CookiesPage: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookieSettings(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="min-h-screen">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cookie
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Learn about how we use cookies and similar technologies to improve your experience.
          </p>
        </div>
      </section>

      {/* Cookie Settings */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Preferences</h2>
            <p className="text-gray-600 mb-8">
              Manage your cookie preferences below. Essential cookies are required for the website to function properly.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  key: 'essential' as const,
                  title: 'Essential Cookies',
                  description: 'Required for basic website functionality, security, and user authentication.',
                  icon: Shield,
                  required: true,
                },
                {
                  key: 'analytics' as const,
                  title: 'Analytics Cookies',
                  description: 'Help us understand how visitors interact with our website to improve user experience.',
                  icon: BarChart3,
                  required: false,
                },
                {
                  key: 'preferences' as const,
                  title: 'Preference Cookies',
                  description: 'Remember your settings and preferences to provide a personalized experience.',
                  icon: Settings,
                  required: false,
                },
                {
                  key: 'marketing' as const,
                  title: 'Marketing Cookies',
                  description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
                  icon: Cookie,
                  required: false,
                },
              ].map((cookie) => {
                const Icon = cookie.icon;
                return (
                  <div key={cookie.key} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{cookie.title}</h3>
                        <p className="text-gray-600">{cookie.description}</p>
                        {cookie.required && (
                          <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        onClick={() => handleCookieToggle(cookie.key)}
                        disabled={cookie.required}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cookieSettings[cookie.key] 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : 'bg-gray-200'
                        } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cookieSettings[cookie.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-pink-600 transition-all">
                Save Preferences
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Accept All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> January 15, 2025
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-8">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember information about your visit, which can make it easier to 
                visit the site again and make the site more useful to you.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 mb-6">
                SocialFlow uses cookies for several purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Authentication:</strong> To keep you logged in and secure your account</li>
                <li><strong>Preferences:</strong> To remember your settings and customizations</li>
                <li><strong>Analytics:</strong> To understand how you use our service and improve it</li>
                <li><strong>Performance:</strong> To optimize loading times and functionality</li>
                <li><strong>Security:</strong> To protect against fraud and abuse</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-600 mb-6">
                These cookies are necessary for the website to function properly. They enable core 
                functionality such as security, network management, and accessibility.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 mb-6">
                We use Google Analytics and other tools to collect information about how visitors 
                use our website. This helps us improve our service and user experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preference Cookies</h3>
              <p className="text-gray-600 mb-6">
                These cookies allow our website to remember choices you make and provide enhanced, 
                more personal features.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
              <p className="text-gray-600 mb-8">
                These cookies are used to deliver advertisements more relevant to you and your interests. 
                They may be set by us or by third-party providers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-6">
                We may use third-party services that set cookies on your device:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Cloudinary:</strong> For image and video optimization</li>
                <li><strong>Supabase:</strong> For authentication and database services</li>
                <li><strong>Social Media Platforms:</strong> For integration and sharing features</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-600 mb-6">
                You can control cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li>Use our cookie preference center above</li>
                <li>Adjust your browser settings to block or delete cookies</li>
                <li>Use browser extensions that manage cookies</li>
                <li>Opt out of specific third-party services</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Retention</h2>
              <p className="text-gray-600 mb-8">
                Different cookies have different retention periods. Session cookies are deleted when 
                you close your browser, while persistent cookies remain until they expire or you delete them. 
                Most of our cookies expire within 1-2 years.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 mb-8">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@socialflow.com<br />
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};