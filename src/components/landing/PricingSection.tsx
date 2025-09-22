import React, { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for individuals getting started',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    popular: false,
    features: [
      '10 posts per month',
      '1 social platform',
      'Basic scheduling',
      'Standard support',
      'Basic analytics',
    ],
    limitations: [
      'No team collaboration',
      'No advanced analytics',
      'Limited scheduling options',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 290 },
    description: 'Ideal for growing businesses and teams',
    icon: Zap,
    color: 'from-blue-500 to-pink-500',
    bgColor: 'from-blue-50 to-pink-50',
    borderColor: 'border-blue-200',
    popular: true,
    features: [
      'Unlimited posts',
      'All social platforms',
      'Advanced scheduling',
      'Priority support',
      'Advanced analytics',
      'Team collaboration (5 users)',
      'Content calendar',
      'Bulk upload',
      'Custom branding',
    ],
    limitations: [],
  },
  {
    name: 'Enterprise',
    price: { monthly: 99, yearly: 990 },
    description: 'For large organizations with advanced needs',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    popular: false,
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'White-label solution',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced security',
      'Custom reporting',
      'SLA guarantee',
    ],
    limitations: [],
  },
];

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                !isYearly
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                isYearly
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const monthlyPrice = isYearly ? plan.price.yearly / 12 : plan.price.monthly;
            
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.borderColor} p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">${Math.round(monthlyPrice)}</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  
                  {isYearly && plan.price.yearly > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      ${price}/year (save ${(plan.price.monthly * 12) - plan.price.yearly})
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center opacity-50">
                      <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/register"
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all transform hover:scale-105 block ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white hover:from-blue-600 hover:to-pink-600 shadow-lg hover:shadow-blue-500/25'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Free' ? 'Start Free' : `Start ${plan.name} Trial`}
                </Link>
                
                {plan.name !== 'Free' && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    14-day free trial • No credit card required
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change plans anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'What happens after the free trial?',
                answer: 'Your account will automatically switch to the Free plan. You can upgrade anytime.',
              },
              {
                question: 'Do you offer refunds?',
                answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.',
              },
              {
                question: 'Is there a setup fee?',
                answer: 'No setup fees, no hidden costs. You only pay for your chosen plan.',
              },
            ].map((faq, index) => (
              <div key={index} className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};