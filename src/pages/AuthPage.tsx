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
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              SocialFlow
            </h1>
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