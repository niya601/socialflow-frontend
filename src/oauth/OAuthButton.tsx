import React from 'react';
import { Instagram, Hash, Youtube, Loader2, Check, AlertCircle } from 'lucide-react';
import { OAuthConnection } from '../types';

interface OAuthButtonProps {
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  connection: OAuthConnection | undefined;
  onConnect: () => void;
  onDisconnect: () => void;
  loading: boolean;
}

const platformConfig = {
  Instagram: {
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
    bgColor: 'bg-gradient-to-r from-pink-50 to-purple-50',
    textColor: 'text-pink-700',
    description: 'Connect your Instagram Business account',
  },
  TikTok: {
    icon: Hash,
    color: 'from-black to-gray-800',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    description: 'Connect your TikTok for Business account',
  },
  YouTube: {
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    description: 'Connect your YouTube channel',
  },
};

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  platform,
  connection,
  onConnect,
  onDisconnect,
  loading,
}) => {
  const config = platformConfig[platform];
  const Icon = config.icon;
  const isConnected = connection?.connected || false;

  return (
    <div className={`p-6 rounded-xl border-2 transition-all ${
      isConnected 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${config.color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{platform}</h3>
            <p className="text-sm text-gray-600">{config.description}</p>
            {isConnected && connection?.user_info && (
              <p className="text-xs text-green-600 mt-1">
                Connected as @{connection.user_info.username}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <div className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Connected</span>
              </div>
              <button
                onClick={onDisconnect}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={onConnect}
              disabled={loading}
              className={`px-4 py-2 bg-gradient-to-r ${config.color} text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect'
              )}
            </button>
          )}
        </div>
      </div>
      
      {connection?.expires_at && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-700">
              Token expires on {new Date(connection.expires_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};