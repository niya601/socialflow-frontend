import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'SocialFlow has completely transformed our social media strategy. We\'ve seen a 300% increase in engagement and saved 15 hours per week on content management.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder & CEO',
    company: 'Creative Studio',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'The analytics insights are incredible. We can now make data-driven decisions about our content strategy and see exactly what resonates with our audience.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Social Media Manager',
    company: 'Fashion Brand Co.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Managing multiple clients across different platforms used to be a nightmare. SocialFlow made it simple and efficient. Our clients love the results!',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Digital Marketing Lead',
    company: 'E-commerce Plus',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'The scheduling features are a game-changer. We can plan our entire month\'s content in advance and the AI suggestions help optimize posting times.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Lifestyle Brand',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Customer support is outstanding. They helped us migrate from our old platform seamlessly and provided training for our entire team.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Growth Marketer',
    company: 'SaaS Startup',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'ROI tracking and performance metrics help us justify our social media spend. SocialFlow pays for itself with the time and results it delivers.',
    rating: 5,
  },
];

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '50M+', label: 'Posts Scheduled' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Customer Rating' },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Marketing Teams
            </span>
            Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of businesses that trust SocialFlow to manage their social media presence and drive real results.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-teal-500" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Start your free trial today and see why thousands of businesses choose SocialFlow for their social media management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
              >
                Schedule Demo
              </a>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};