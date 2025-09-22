import React from 'react';
import { useState } from 'react';
import { Share2, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNewsletter } from '../../hooks/useNewsletter';

const handleSmoothScroll = (href: string) => {
  if (href.startsWith('#')) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const footerLinks = {
  product: [
    { name: 'Features', href: '/features', type: 'route' },
    { name: 'Pricing', href: '/pricing', type: 'route' },
  ],
  company: [
    { name: 'About Us', href: '/about', type: 'route' },
    { name: 'Blog', href: '/blog', type: 'route' },
    { name: 'Contact', href: '/contact', type: 'route' },
  ],
  resources: [
    { name: 'Community', href: '/community', type: 'route' },
    { name: 'Tutorials', href: '/tutorials', type: 'route' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy', type: 'route' },
    { name: 'Terms of Service', href: '/terms', type: 'route' },
    { name: 'Cookie Policy', href: '/cookies', type: 'route' },
    { name: 'Security', href: '/security', type: 'route' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { subscribe, loading, error } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await subscribe(email);
    
    if (result.success) {
      setSubscriptionStatus('success');
      setEmail(''); // Clear the input
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 5000);
    } else {
      setSubscriptionStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-2">
                <img 
                  src="/image.png" 
                  alt="SocialFlow" 
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400">
                  SocialFlow
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              The all-in-one social media management platform that helps businesses streamline their content creation, scheduling, and analytics across all major platforms.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-teal-400" />
                <span>hello@socialflow.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-teal-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-teal-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300">
                Get the latest social media tips, platform updates, and SocialFlow news delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                <button 
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[120px]"
                >
                  {loading ? (
                    <>
              
              {/* Success/Error Messages */}
              {subscriptionStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 Successfully subscribed! Thank you for joining our newsletter.
                  </p>
                </div>
              )}
              
              {subscriptionStatus === 'error' && error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    ❌ {error}
                  </p>
                </div>
              )}
            </div>
            
            {subscriptionStatus === 'error' && error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">
                  ❌ {error}
                </p>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-white mb-4">Get in Touch</h4>
            <p className="text-gray-300 mb-6">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:hello@socialflow.com"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
              <Link
                to="/register"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SocialFlow. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};