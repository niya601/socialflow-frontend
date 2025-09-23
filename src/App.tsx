import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './auth/AuthProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CommunityPage } from './pages/CommunityPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { SecurityPage } from './pages/SecurityPage';
import { LandingHeader } from './components/layout/LandingHeader';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { RecentPosts } from './components/dashboard/RecentPosts';
import { CreatePostForm } from './components/post/CreatePostForm';
import { OAuthButton } from './oauth/OAuthButton';
import { useOAuth } from './oauth/useOAuth';
import { Post, DashboardStats as StatsType, Notification, Platform } from './types';
import { generateId } from './utils/helpers';

// Mock data
const mockStats: StatsType = {
  total_posts: 24,
  scheduled_posts: 8,
  published_posts: 16,
  engagement_rate: '4.2%',
  followers_count: 1250,
  reach: 15420,
};

const mockPosts: Post[] = [
  {
    id: '1',
    user_id: 'user1',
    content: 'Excited to announce our new product launch! 🚀 This has been months in the making.',
    platforms: [{ name: 'Instagram', connected: true }, { name: 'TikTok', connected: true }],
    status: 'scheduled',
    scheduled_date: '2025-01-15T14:30',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'user1',
    content: 'Behind the scenes of our creative process 🎨 #creativity #process',
    platforms: [{ name: 'YouTube', connected: true }],
    status: 'published',
    created_at: '2025-01-09T15:30:00Z',
    updated_at: '2025-01-09T15:30:00Z',
  },
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your social media.</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all">
          Create Post
        </button>
      </div>

      <DashboardStats stats={mockStats} loading={loading} />
      <RecentPosts posts={mockPosts} loading={loading} />
    </div>
  );
};

const CreatePost: React.FC<{ onPostCreate: (post: Partial<Post>) => void }> = ({ onPostCreate }) => {
  const { connections } = useOAuth();
  const [loading, setLoading] = useState(false);

  const connectedPlatforms: Platform[] = connections.map(conn => ({
    name: conn.platform as any,
    connected: conn.connected,
  }));

  const handleSubmit = async (postData: Partial<Post>) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPost: Post = {
      id: generateId(),
      user_id: 'user1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...postData,
    } as Post;

    onPostCreate(newPost);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <CreatePostForm
          onSubmit={handleSubmit}
          loading={loading}
          connectedPlatforms={connectedPlatforms}
        />
      </div>
    </div>
  );
};

const Accounts: React.FC = () => {
  const { 
    connections, 
    loading, 
    connectInstagram, 
    connectTikTok, 
    connectYouTube, 
    disconnectPlatform,
    getConnection 
  } = useOAuth();

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>
          <p className="text-gray-600 mt-2">
            Connect your social media accounts to start publishing content across platforms.
          </p>
        </div>

        <div className="space-y-6">
          <OAuthButton
            platform="Instagram"
            connection={getConnection('Instagram')}
            onConnect={connectInstagram}
            onDisconnect={() => disconnectPlatform('Instagram')}
            loading={loading === 'Instagram'}
          />
          
          <OAuthButton
            platform="TikTok"
            connection={getConnection('TikTok')}
            onConnect={connectTikTok}
            onDisconnect={() => disconnectPlatform('TikTok')}
            loading={loading === 'TikTok'}
          />
          
          <OAuthButton
            platform="YouTube"
            connection={getConnection('YouTube')}
            onConnect={connectYouTube}
            onDisconnect={() => disconnectPlatform('YouTube')}
            loading={loading === 'YouTube'}
          />
        </div>
      </div>
    </div>
  );
};

const AppDashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Post Published',
      message: 'Your post has been successfully published to Instagram.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Scheduled Post',
      message: 'Your post is scheduled to go live in 2 hours.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
    },
  ]);

  // Debug logging
  console.log('AppDashboard - authLoading:', authLoading, 'user:', user);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handlePostCreate = (post: Partial<Post>) => {
    addNotification({
      type: 'success',
      title: 'Post Created',
      message: `Your post has been ${post.status === 'scheduled' ? 'scheduled' : 'published'} successfully!`,
    });
    setCurrentView('dashboard');
  };

  if (authLoading) {
    console.log('AppDashboard - showing loading screen');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading SocialFlow...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('AppDashboard - no user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('AppDashboard - rendering dashboard for user:', user.email);
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'create-post':
        return <CreatePost onPostCreate={handlePostCreate} />;
      case 'accounts':
        return <Accounts />;
      case 'schedule':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Schedule View</h2>
              <p className="text-gray-600">Calendar and scheduling interface will be implemented here.</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics View</h2>
              <p className="text-gray-600">Detailed analytics and reporting will be implemented here.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings View</h2>
              <p className="text-gray-600">Account and application settings will be implemented here.</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Help Center</h2>
              <p className="text-gray-600">Documentation and support resources will be implemented here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className="flex-1 lg:ml-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          currentView={currentView}
          notifications={notifications}
          onNotificationRead={markNotificationAsRead}
        />
        
        <main className="overflow-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route 
          path="/" 
          element={
            <div>
              <LandingHeader />
              <LandingPage />
            </div>
          } 
        />
        
        {/* Auth Routes */}
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        
        {/* Static Pages */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        
        {/* App Dashboard Routes */}
        <Route path="/app/*" element={<AppDashboard />} />
        
        {/* Redirect old routes */}
        <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;