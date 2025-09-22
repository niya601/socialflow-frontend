import { useState, useCallback } from 'react';
import { OAuthConnection } from '../types';

export const useOAuth = () => {
  const [connections, setConnections] = useState<OAuthConnection[]>([
    { platform: 'Instagram', connected: false },
    { platform: 'TikTok', connected: false },
    { platform: 'YouTube', connected: false },
  ]);
  const [loading, setLoading] = useState<string | null>(null);

  const generateState = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const connectInstagram = useCallback(async () => {
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = `${import.meta.env.VITE_APP_URL}/oauth/callback/instagram`;
    const state = generateState();
    
    // Store state in localStorage for verification
    localStorage.setItem('oauth_state', state);
    localStorage.setItem('oauth_platform', 'Instagram');
    
    const scope = 'instagram_basic,instagram_content_publish';
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&state=${state}`;
    
    setLoading('Instagram');
    window.location.href = authUrl;
  }, []);

  const connectTikTok = useCallback(async () => {
    const clientKey = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    const redirectUri = `${import.meta.env.VITE_APP_URL}/oauth/callback/tiktok`;
    const state = generateState();
    
    localStorage.setItem('oauth_state', state);
    localStorage.setItem('oauth_platform', 'TikTok');
    
    const scope = 'user.info.basic,video.list,video.upload';
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    
    setLoading('TikTok');
    window.location.href = authUrl;
  }, []);

  const connectYouTube = useCallback(async () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_APP_URL}/oauth/callback/youtube`;
    const state = generateState();
    
    localStorage.setItem('oauth_state', state);
    localStorage.setItem('oauth_platform', 'YouTube');
    
    const scope = 'https://www.googleapis.com/auth/youtube.upload';
    const authUrl = `https://accounts.google.com/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&state=${state}`;
    
    setLoading('YouTube');
    window.location.href = authUrl;
  }, []);

  const handleOAuthCallback = useCallback((platform: string, code: string, state: string) => {
    // Verify state parameter
    const storedState = localStorage.getItem('oauth_state');
    const storedPlatform = localStorage.getItem('oauth_platform');
    
    if (state !== storedState || platform !== storedPlatform) {
      console.error('OAuth state mismatch');
      return false;
    }
    
    // Clean up localStorage
    localStorage.removeItem('oauth_state');
    localStorage.removeItem('oauth_platform');
    
    // In a real app, you would exchange the code for an access token
    // For now, we'll just mark the platform as connected
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, connected: true, access_token: 'mock_token_' + Date.now() }
          : conn
      )
    );
    
    setLoading(null);
    return true;
  }, []);

  const disconnectPlatform = useCallback((platform: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { platform: conn.platform, connected: false }
          : conn
      )
    );
  }, []);

  const getConnection = useCallback((platform: string) => {
    return connections.find(conn => conn.platform === platform);
  }, [connections]);

  return {
    connections,
    loading,
    connectInstagram,
    connectTikTok,
    connectYouTube,
    handleOAuthCallback,
    disconnectPlatform,
    getConnection,
  };
};