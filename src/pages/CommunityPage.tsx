import React from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { Users, MessageCircle, Calendar, Award, ExternalLink } from 'lucide-react';

const communityStats = [
  { icon: Users, value: '15,000+', label: 'Community Members' },
  { icon: MessageCircle, value: '500+', label: 'Daily Discussions' },
  { icon: Calendar, value: '50+', label: 'Monthly Events' },
  { icon: Award, value: '100+', label: 'Expert Contributors' },
];

const communityChannels = [
  {
    name: 'Discord Server',
    description: 'Join our active Discord community for real-time discussions, tips, and networking.',
    members: '8,500+',
    link: '#',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Facebook Group',
    description: 'Connect with fellow marketers and share your success stories in our Facebook group.',
    members: '4,200+',
    link: '#',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'LinkedIn Community',
    description: 'Professional networking and industry insights with social media professionals.',
    members: '2,800+',
    link: '#',
    color: 'from-blue-600 to-blue-700',
  },
];

const upcomingEvents = [
  {
    title: 'Social Media Strategy Workshop',
    date: '2025-01-25',
    time: '2:00 PM PST',
    type: 'Workshop',
    description: 'Learn advanced strategies for creating engaging social media content.',
  },
  {
    title: 'Community Q&A with Experts',
    date: '2025-01-30',
    time: '11:00 AM PST',
    type: 'Q&A Session',
    description: 'Get your questions answered by industry experts and SocialFlow team.',
  },
  {
    title: 'Monthly Success Stories',
    date: '2025-02-05',
    time: '3:00 PM PST',
    type: 'Showcase',
    description: 'Hear from community members about their social media wins.',
  },
];

export const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Connect with thousands of social media professionals, share insights, and grow together in our vibrant community.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Channels</h2>
            <p className="text-xl text-gray-600">Choose your preferred platform to connect with fellow marketers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 bg-gradient-to-r ${channel.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{channel.name}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{channel.members} members</span>
                  <a
                    href={channel.link}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Join Now
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Don't miss these exciting community events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {event.type}
                  </span>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                    {event.time}
                  </div>
                </div>
                
                <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-pink-600 transition-all">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
            <p className="text-xl text-gray-600">Help us maintain a positive and supportive environment</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Be Respectful</h3>
                <p className="text-gray-600">Treat all community members with respect and kindness. No harassment, discrimination, or offensive language.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Knowledge</h3>
                <p className="text-gray-600">Help others by sharing your experiences, insights, and expertise. We're all here to learn and grow together.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay On Topic</h3>
                <p className="text-gray-600">Keep discussions relevant to social media marketing, SocialFlow, and related topics.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Spam</h3>
                <p className="text-gray-600">Avoid excessive self-promotion, spam, or irrelevant content. Quality over quantity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};