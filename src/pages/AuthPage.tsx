import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../auth/LoginForm';
import { RegisterForm } from '../auth/RegisterForm';

interface AuthPageProps {
  mode: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot-password'>(mode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="flex flex-col items-center">
                <img 
                  src="/socialflow-icon.png" 
                  alt="SocialFlow" 
                  className="h-12 w-12 mx-auto mb-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500">
                  SocialFlow
                </h1>
              </div>
            </Link>
            <p className="text-gray-600 mt-2">
              {authMode === 'login' ? 'Welcome back!' : 
               authMode === 'register' ? 'Create your account' : 
               'Reset your password'}
            </p>
          </div>

          {/* Auth Forms */}
          {authMode === 'login' && (
            <LoginForm
              onSwitchToRegister={() => setAuthMode('register')}
              onForgotPassword={() => setAuthMode('forgot-password')}
            />
          )}
          
          {authMode === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
          
          {authMode === 'forgot-password' && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Password reset functionality will be implemented with backend integration.
              </p>
              <button
                onClick={() => setAuthMode('login')}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Back to login
              </button>
            </div>
          )}

          {/* Back to Home Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};