import React, { useState } from 'react';
import { Share2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthProvider';

export const LandingHeader: React.FC = () => {
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/socialflow-icon.png" 
                alt="SocialFlow" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                SocialFlow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                to="/app"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:via-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:via-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-sm rounded-xl mt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-white/20 pt-3 mt-3">
                {user ? (
                  <Link
                    to="/app"
                    className="block px-3 py-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-lg font-semibold text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-white/90 hover:text-white font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-lg font-semibold text-center mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Start Free Trial
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};