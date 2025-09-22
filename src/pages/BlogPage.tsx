import React from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: '10 Social Media Trends to Watch in 2025',
    excerpt: 'Discover the latest trends shaping social media marketing and how to leverage them for your business.',
    author: 'Sarah Johnson',
    date: '2025-01-15',
    category: 'Trends',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'How to Create Engaging Content That Converts',
    excerpt: 'Learn the secrets to creating social media content that not only engages but also drives conversions.',
    author: 'Michael Chen',
    date: '2025-01-12',
    category: 'Content Strategy',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Social Media Analytics',
    excerpt: 'Master the art of social media analytics and turn your data into actionable insights.',
    author: 'Emily Rodriguez',
    date: '2025-01-10',
    category: 'Analytics',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Building a Social Media Team That Delivers Results',
    excerpt: 'Tips and strategies for building and managing a high-performing social media team.',
    author: 'David Park',
    date: '2025-01-08',
    category: 'Team Management',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Instagram vs TikTok: Which Platform is Right for Your Brand?',
    excerpt: 'A comprehensive comparison to help you choose the best platform for your brand\'s goals.',
    author: 'Lisa Thompson',
    date: '2025-01-05',
    category: 'Platform Comparison',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '8 min read',
  },
  {
    id: 6,
    title: 'Automation vs Authenticity: Finding the Right Balance',
    excerpt: 'How to use automation tools while maintaining authentic connections with your audience.',
    author: 'James Wilson',
    date: '2025-01-03',
    category: 'Automation',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    readTime: '5 min read',
  },
];

const categories = ['All', 'Trends', 'Content Strategy', 'Analytics', 'Team Management', 'Platform Comparison', 'Automation'];

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            SocialFlow
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Insights, tips, and strategies to help you master social media marketing and grow your business.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};