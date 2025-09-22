import React, { useState } from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { Play, Clock, User, BookOpen, Search, Filter } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with SocialFlow',
    description: 'Learn the basics of setting up your account and connecting your first social media platform.',
    duration: '8 min',
    level: 'Beginner',
    category: 'Getting Started',
    thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 2,
    title: 'Creating Your First Post',
    description: 'Step-by-step guide to creating and scheduling your first social media post.',
    duration: '12 min',
    level: 'Beginner',
    category: 'Content Creation',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 3,
    title: 'Advanced Scheduling Techniques',
    description: 'Master the art of scheduling posts for optimal engagement across different time zones.',
    duration: '15 min',
    level: 'Intermediate',
    category: 'Scheduling',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 4,
    title: 'Understanding Analytics Dashboard',
    description: 'Deep dive into SocialFlow\'s analytics features and how to interpret your data.',
    duration: '20 min',
    level: 'Intermediate',
    category: 'Analytics',
    thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 5,
    title: 'Team Collaboration Features',
    description: 'Learn how to set up team workflows, assign roles, and manage approval processes.',
    duration: '18 min',
    level: 'Advanced',
    category: 'Team Management',
    thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 6,
    title: 'Bulk Content Upload',
    description: 'Efficiently upload and schedule multiple posts at once using our bulk upload feature.',
    duration: '10 min',
    level: 'Intermediate',
    category: 'Content Creation',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 7,
    title: 'API Integration Guide',
    description: 'Technical guide for developers on integrating SocialFlow API into your applications.',
    duration: '25 min',
    level: 'Advanced',
    category: 'API & Integrations',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
  {
    id: 8,
    title: 'Content Calendar Best Practices',
    description: 'Strategies for planning and organizing your social media content calendar effectively.',
    duration: '14 min',
    level: 'Intermediate',
    category: 'Planning',
    thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    videoUrl: '#',
  },
];

const categories = ['All', 'Getting Started', 'Content Creation', 'Scheduling', 'Analytics', 'Team Management', 'API & Integrations', 'Planning'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export const TutorialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || tutorial.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            SocialFlow
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Master SocialFlow with our comprehensive video tutorials and step-by-step guides.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTutorials.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tutorials found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {tutorial.category}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        tutorial.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        tutorial.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tutorial.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {tutorial.level}
                        </div>
                      </div>
                      
                      <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Learning Path</h2>
            <p className="text-xl text-gray-600">Follow this path to master SocialFlow step by step</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: 'Getting Started', description: 'Set up your account and connect platforms' },
                { step: 2, title: 'Content Creation', description: 'Learn to create and schedule posts' },
                { step: 3, title: 'Analytics & Optimization', description: 'Understand your performance data' },
                { step: 4, title: 'Advanced Features', description: 'Master team collaboration and automation' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-6 bg-white rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};