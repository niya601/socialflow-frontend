export interface User {
  id: string;
  email: string;
  company_name: string;
  subscription_plan: 'Free' | 'Pro';
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  platforms: Platform[];
  media_url?: string;
  media_metadata?: CloudinaryMetadata;
  scheduled_date?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Platform {
  name: 'Instagram' | 'TikTok' | 'YouTube';
  connected: boolean;
  token_expires?: string;
  last_sync?: string;
}

export interface CloudinaryMetadata {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: 'image' | 'video';
  width: number;
  height: number;
  bytes: number;
  duration?: number;
}

export interface OAuthConnection {
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  connected: boolean;
  access_token?: string;
  refresh_token?: string;
  expires_at?: string;
  user_info?: {
    id: string;
    username: string;
    profile_picture?: string;
  };
}

export interface DashboardStats {
  total_posts: number;
  scheduled_posts: number;
  published_posts: number;
  engagement_rate: string;
  followers_count: number;
  reach: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}