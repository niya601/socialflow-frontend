import React, { useState } from 'react';
import { Calendar, Clock, Send, Save, Instagram, Hash, Youtube, Check, AlertCircle } from 'lucide-react';
import { CloudinaryUpload } from '../cloudinary/CloudinaryUpload';
import { CloudinaryUploadResult } from '../cloudinary/types';
import { Post, Platform } from '../../types';
import { getCharacterLimit, isOverLimit } from '../../utils/helpers';

interface CreatePostFormProps {
  onSubmit: (postData: Partial<Post>) => Promise<void>;
  loading?: boolean;
  connectedPlatforms: Platform[];
}

const platformConfig = {
  Instagram: {
    icon: Instagram,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  TikTok: {
    icon: Hash,
    color: 'text-gray-900',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
  YouTube: {
    icon: Youtube,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onSubmit,
  loading = false,
  connectedPlatforms,
}) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [media, setMedia] = useState<CloudinaryUploadResult | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isDraft, setIsDraft] = useState(false);

  const availablePlatforms = connectedPlatforms.filter(p => p.connected);

  const handlePlatformToggle = (platformName: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || selectedPlatforms.length === 0) {
      return;
    }

    const postData: Partial<Post> = {
      content: content.trim(),
      platforms: selectedPlatforms.map(name => ({ name: name as any, connected: true })),
      media_url: media?.secure_url,
      media_metadata: media,
      scheduled_date: scheduledDate && scheduledTime ? `${scheduledDate}T${scheduledTime}` : undefined,
      status: isDraft ? 'draft' : (scheduledDate ? 'scheduled' : 'published'),
    };

    await onSubmit(postData);
    
    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setMedia(null);
    setScheduledDate('');
    setScheduledTime('');
    setIsDraft(false);
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); // Minimum 5 minutes from now
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
        <p className="text-gray-600 mt-1">Compose and schedule your social media content</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            placeholder="What's happening?"
            required
          />
          
          {/* Character Count */}
          {selectedPlatforms.length > 0 && (
            <div className="mt-2 space-y-1">
              {selectedPlatforms.map((platformName) => {
                const limit = getCharacterLimit(platformName as keyof typeof getCharacterLimit);
                const count = content.length;
                const overLimit = isOverLimit(content, platformName as any);
                
                return (
                  <div key={platformName} className="flex justify-between text-sm">
                    <span className="text-gray-600">{platformName}:</span>
                    <span className={overLimit ? 'text-red-500 font-medium' : 'text-gray-500'}>
                      {count}/{limit}
                      {overLimit && (
                        <AlertCircle className="w-4 h-4 inline ml-1" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Platforms
          </label>
          
          {availablePlatforms.length === 0 ? (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-700">
                  No platforms connected. Please connect your social media accounts first.
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availablePlatforms.map((platform) => {
                const config = platformConfig[platform.name];
                const Icon = config.icon;
                const isSelected = selectedPlatforms.includes(platform.name);
                
                return (
                  <label
                    key={platform.name}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? `${config.borderColor} ${config.bgColor}` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePlatformToggle(platform.name)}
                      className="sr-only"
                    />
                    <Icon className={`w-5 h-5 mr-3 ${config.color}`} />
                    <div>
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      <p className="text-xs text-gray-500">
                        {getCharacterLimit(platform.name as any)} chars max
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-teal-600 absolute top-2 right-2" />
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media Upload
          </label>
          <CloudinaryUpload
            onUpload={setMedia}
            onRemove={() => setMedia(null)}
            currentMedia={media}
            disabled={loading}
          />
        </div>

        {/* Scheduling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="scheduledDate"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="scheduledTime"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={!scheduledDate}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        {selectedPlatforms.length > 0 && content && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
            <div className="space-y-3">
              {selectedPlatforms.map((platformName) => {
                const config = platformConfig[platformName as keyof typeof platformConfig];
                const Icon = config.icon;
                
                return (
                  <div key={platformName} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className="text-sm font-medium text-gray-700">{platformName}</span>
                    </div>
                    <p className="text-gray-900 text-sm whitespace-pre-wrap">{content}</p>
                    {media && (
                      <div className="mt-2">
                        {media.resource_type === 'image' ? (
                          <img 
                            src={media.secure_url} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <video 
                            src={media.secure_url} 
                            className="w-20 h-20 object-cover rounded-lg"
                            muted
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isDraft}
              onChange={(e) => setIsDraft(e.target.checked)}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-600">Save as draft</span>
          </label>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                setContent('');
                setSelectedPlatforms([]);
                setMedia(null);
                setScheduledDate('');
                setScheduledTime('');
                setIsDraft(false);
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            
            <button
              type="submit"
              disabled={loading || !content.trim() || selectedPlatforms.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  {isDraft ? (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Draft
                    </>
                  ) : scheduledDate ? (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Post
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Publish Now
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};