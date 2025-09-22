import React from 'react';
import { 
  Calendar, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  Instagram,
  Youtube,
  Clock,
  Target,
  TrendingUp,
  Facebook
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-powered optimal posting times based on your audience engagement patterns.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into performance metrics, engagement rates, and audience growth.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless workflow management with role-based permissions and approval processes.',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
  },
  {
    icon: Zap,
    title: 'Bulk Publishing',
    description: 'Create and schedule multiple posts across all platforms simultaneously.',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'from-yellow-50 to-yellow-100',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and advanced data protection.',
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-100',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'Native integrations with Instagram, TikTok, YouTube, and more platforms.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'from-teal-50 to-teal-100',
  },
];

const platforms = [
  { icon: Instagram, name: 'Instagram', color: 'text-pink-600' },
  { icon: Facebook, name: 'Facebook', color: 'text-blue-600' },
  { icon: Globe, name: 'TikTok', color: 'text-gray-900' },
  { icon: Youtube, name: 'YouTube', color: 'text-red-600' },
];

const stats = [
  { icon: Clock, value: '10x', label: 'Faster Content Creation' },
  { icon: Target, value: '85%', label: 'Increase in Engagement' },
  { icon: TrendingUp, value: '3x', label: 'Audience Growth Rate' },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Dominate Social Media
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to streamline your social media workflow and maximize your reach across all platforms.
          </p>
        </div>

        {/* Platform Support */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Supported Platforms</h3>
            <p className="text-gray-600">Connect and manage all your social media accounts in one place</p>
          </div>
          
          <div className="flex justify-center items-center space-x-12">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                    <Icon className={`w-8 h-8 ${platform.color}`} />
                  </div>
                  <span className="font-medium text-gray-900">{platform.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full border border-teal-200 mb-6">
            <Zap className="w-5 h-5 text-teal-600 mr-2" />
            <span className="text-teal-700 font-medium">Ready to get started?</span>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Join thousands of businesses already using SocialFlow
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience the power of streamlined social media management.
          </p>
        </div>
      </div>
    </section>
  );
};