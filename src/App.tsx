import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Bell,
  User,
  Upload,
  Facebook,
  Youtube,
  Hash,
  Image,
  Video,
  Eye,
  EyeOff,
  X,
  Check,
  AlertCircle,
  Menu,
  Home,
  PlusCircle,
  TrendingUp,
  Clock,
  Heart,
  Share2,
  Play,
  Camera
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  company: string;
  avatar: string;
}

interface Post {
  id: string;
  content: string;
  platforms: string[];
  media?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'create'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Excited to announce our new product launch! 🚀',
      platforms: ['Instagram', 'TikTok'],
      status: 'scheduled',
      scheduledDate: '2025-01-15T14:30'
    },
    {
      id: '2', 
      content: 'Behind the scenes of our creative process 🎨',
      platforms: ['YouTube'],
      status: 'published'
    }
  ]);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });

  // Post creation states
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const platforms = [
    { name: 'Instagram', icon: Camera, limit: 2200, color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', icon: Hash, limit: 150, color: 'from-black to-gray-800' },
    { name: 'YouTube', icon: Youtube, limit: 5000, color: 'from-red-500 to-red-600' }
  ];

  const addNotification = (type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.email && formData.password) {
      setUser({
        name: 'John Doe',
        email: formData.email,
        company: 'Tech Startup Inc.',
        avatar: '/api/placeholder/40/40'
      });
      setCurrentView('dashboard');
      addNotification('success', 'Welcome back! You\'ve successfully logged in.');
    } else {
      addNotification('error', 'Please fill in all fields');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      addNotification('error', 'Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (formData.email && formData.password && formData.name && formData.company) {
      setUser({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        avatar: '/api/placeholder/40/40'
      });
      setCurrentView('dashboard');
      addNotification('success', 'Account created successfully! Welcome to SocialFlow.');
    } else {
      addNotification('error', 'Please fill in all fields');
    }
    setLoading(false);
  };

  const handleOAuthLogin = (provider: string) => {
    setLoading(true);
    addNotification('info', `Connecting to ${provider}...`);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setLoading(false);
      addNotification('success', `Successfully connected to ${provider}!`);
    }, 2000);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() || selectedPlatforms.length === 0) {
      addNotification('error', 'Please add content and select at least one platform');
      return;
    }

    setLoading(true);
    
    const newPost: Post = {
      id: Date.now().toString(),
      content: postContent,
      platforms: selectedPlatforms,
      media: mediaUrl,
      scheduledDate: scheduledDate && scheduledTime ? `${scheduledDate}T${scheduledTime}` : undefined,
      status: scheduledDate ? 'scheduled' : 'published'
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPosts(prev => [newPost, ...prev]);
    setPostContent('');
    setSelectedPlatforms([]);
    setScheduledDate('');
    setScheduledTime('');
    setMediaUrl('');
    setLoading(false);
    
    addNotification('success', `Post ${scheduledDate ? 'scheduled' : 'published'} successfully!`);
    setCurrentView('dashboard');
  };

  const handleMediaUpload = () => {
    // Simulate Cloudinary widget
    addNotification('info', 'Opening media upload...');
    setTimeout(() => {
      setMediaUrl('https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400');
      addNotification('success', 'Media uploaded successfully!');
    }, 1500);
  };

  const getCharacterCount = (platform: string) => {
    const platformData = platforms.find(p => p.name === platform);
    return platformData ? platformData.limit : 280;
  };

  const AuthScreen = () => {
    const isLogin = currentView === 'login';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                SocialFlow
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </p>
            </div>

            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      aria-label="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter your company name"
                      aria-label="Company Name"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  aria-label="Email Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    aria-label="Confirm Password"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                aria-label={isLogin ? "Sign in" : "Create account"}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleOAuthLogin('Facebook')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  aria-label="Sign in with Facebook"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleOAuthLogin('TikTok')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  aria-label="Sign in with TikTok"
                >
                  <Hash className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={() => handleOAuthLogin('YouTube')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  aria-label="Sign in with YouTube"
                >
                  <Youtube className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentView(isLogin ? 'register' : 'login')}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            SocialFlow
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 border border-teal-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Go to dashboard"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('create')}
            className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-colors ${
              currentView === 'create' 
                ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 border border-teal-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Create new post"
          >
            <PlusCircle className="w-5 h-5 mr-3" />
            Create Post
          </button>
          <button className="w-full flex items-center px-4 py-3 text-left rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5 mr-3" />
            Calendar
          </button>
          <button className="w-full flex items-center px-4 py-3 text-left rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </button>
          <button className="w-full flex items-center px-4 py-3 text-left rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.company}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900 capitalize">
          {currentView}
        </h2>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );

  const Dashboard = () => {
    const stats = {
      totalPosts: posts.length,
      scheduledPosts: posts.filter(p => p.status === 'scheduled').length,
      engagementRate: '4.2%'
    };

    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.scheduledPosts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Calendar className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600">Next: Today 2:30 PM</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.engagementRate}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+0.8% from last week</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      {post.platforms.map((platform) => {
                        const platformData = platforms.find(p => p.name === platform);
                        const Icon = platformData?.icon || MessageSquare;
                        return (
                          <div key={platform} className="flex items-center space-x-1">
                            <Icon className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500">{platform}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : post.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {post.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CreatePost = () => {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
              <p className="text-gray-600 mt-1">Compose and schedule your social media content</p>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="What's happening?"
                  aria-label="Post content"
                />
                
                {selectedPlatforms.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedPlatforms.map((platform) => {
                      const limit = getCharacterCount(platform);
                      const count = postContent.length;
                      const isOverLimit = count > limit;
                      
                      return (
                        <div key={platform} className="flex justify-between text-sm">
                          <span className="text-gray-600">{platform}:</span>
                          <span className={isOverLimit ? 'text-red-500' : 'text-gray-500'}>
                            {count}/{limit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Platforms
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.name);
                    
                    return (
                      <label
                        key={platform.name}
                        className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-teal-500 bg-teal-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPlatforms(prev => [...prev, platform.name]);
                            } else {
                              setSelectedPlatforms(prev => prev.filter(p => p !== platform.name));
                            }
                          }}
                          className="sr-only"
                        />
                        <Icon className="w-5 h-5 mr-3 text-gray-700" />
                        <div>
                          <p className="font-medium text-gray-900">{platform.name}</p>
                          <p className="text-xs text-gray-500">{platform.limit} chars</p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-teal-600 absolute top-2 right-2" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media Upload
                  </label>
                  <button
                    type="button"
                    onClick={handleMediaUpload}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-400 transition-colors group"
                  >
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 group-hover:text-teal-600">
                      Click to upload media
                    </p>
                  </button>

                  {mediaUrl && (
                    <div className="mt-4">
                      <img
                        src={mediaUrl}
                        alt="Uploaded media"
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setMediaUrl('')}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove media
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Post (Optional)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {selectedPlatforms.length > 0 && postContent && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
                  <div className="space-y-3">
                    {selectedPlatforms.map((platform) => (
                      <div key={platform} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          {(() => {
                            const platformData = platforms.find(p => p.name === platform);
                            const Icon = platformData?.icon || MessageSquare;
                            return <Icon className="w-4 h-4 text-gray-600" />;
                          })()}
                          <span className="text-sm font-medium text-gray-700">{platform}</span>
                        </div>
                        <p className="text-gray-900 text-sm">{postContent}</p>
                        {mediaUrl && (
                          <img 
                            src={mediaUrl} 
                            alt="Preview" 
                            className="mt-2 w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setPostContent('');
                    setSelectedPlatforms([]);
                    setScheduledDate('');
                    setScheduledTime('');
                    setMediaUrl('');
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={loading || !postContent.trim() || selectedPlatforms.length === 0}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : null}
                  {scheduledDate ? 'Schedule Post' : 'Publish Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest('.notification-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-0">
        <Header />
        
        <main className="overflow-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'create' && <CreatePost />}
        </main>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <span className="text-gray-900 font-medium">Processing...</span>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className={`max-w-sm w-full bg-white shadow-lg rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ${
              notification.type === 'success' ? 'border-l-4 border-green-500' :
              notification.type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.type === 'success' && <Check className="h-5 w-5 text-green-400" />}
                  {notification.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
                  {notification.type === 'info' && <Bell className="h-5 w-5 text-blue-400" />}
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;