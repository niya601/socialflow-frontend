import React from 'react';
import { Calendar, Instagram, Hash, Youtube, MoreHorizontal, Eye, Heart, MessageCircle } from 'lucide-react';
import { Post } from '../../types';
import { formatDate } from '../../utils/helpers';

interface RecentPostsProps {
  posts: Post[];
  loading?: boolean;
}

const platformIcons = {
  Instagram: Instagram,
  TikTok: Hash,
  YouTube: Youtube,
};

const platformColors = {
  Instagram: 'text-pink-600',
  TikTok: 'text-gray-900',
  YouTube: 'text-red-600',
};

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex space-x-4">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          View All
        </button>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h4>
          <p className="text-gray-600 mb-4">Create your first post to get started</p>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all">
            Create Post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-start space-x-4">
                {post.media_url && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={post.media_url}
                      alt="Post media"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-2">
                      {post.platforms.map((platform) => {
                        const Icon = platformIcons[platform.name];
                        return (
                          <div key={platform.name} className="flex items-center space-x-1">
                            <Icon className={`w-4 h-4 ${platformColors[platform.name]}`} />
                            <span>{platform.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {post.scheduled_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.scheduled_date)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>1.2k</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>89</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>12</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : post.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : post.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {post.status}
                      </div>
                      
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};