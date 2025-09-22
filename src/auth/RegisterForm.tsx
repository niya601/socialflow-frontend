import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Building, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { validateEmail, validatePassword } from '../utils/helpers';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { signUp, loading, error } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    subscriptionPlan: 'Free' as 'Free' | 'Pro',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        errors.password = passwordValidation.message!;
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.companyName) {
      errors.companyName = 'Company name is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await signUp(
      formData.email,
      formData.password,
      formData.companyName,
      formData.subscriptionPlan
    );
    
    if (result.success) {
      navigate('/app');
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            aria-describedby={validationErrors.email ? 'email-error' : undefined}
          />
        </div>
        {validationErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your company name"
            aria-describedby={validationErrors.companyName ? 'company-error' : undefined}
          />
        </div>
        {validationErrors.companyName && (
          <p id="company-error" className="mt-1 text-sm text-red-600">{validationErrors.companyName}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            aria-describedby={validationErrors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {validationErrors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
            aria-describedby={validationErrors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <p id="confirm-password-error" className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Subscription Plan
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
            formData.subscriptionPlan === 'Free' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="subscriptionPlan"
              value="Free"
              checked={formData.subscriptionPlan === 'Free'}
              onChange={(e) => handleInputChange('subscriptionPlan', e.target.value as 'Free' | 'Pro')}
              className="sr-only"
            />
            <span className="font-semibold text-gray-900">Free</span>
            <span className="text-sm text-gray-600">10 posts/month</span>
            <span className="text-sm text-gray-600">1 platform</span>
          </label>
          
          <label className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
            formData.subscriptionPlan === 'Pro' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="subscriptionPlan"
              value="Pro"
              checked={formData.subscriptionPlan === 'Pro'}
              onChange={(e) => handleInputChange('subscriptionPlan', e.target.value as 'Free' | 'Pro')}
              className="sr-only"
            />
            <span className="font-semibold text-gray-900">Pro</span>
            <span className="text-sm text-gray-600">100 posts/month</span>
            <span className="text-sm text-gray-600">All platforms</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};