import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useOAuth } from './useOAuth';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { platform } = useParams<{ platform: string }>();
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback } = useOAuth();
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(`OAuth error: ${error}`);
        setTimeout(() => navigate('/dashboard/accounts'), 3000);
        return;
      }

      if (!code || !state || !platform) {
        setStatus('error');
        setMessage('Missing required OAuth parameters');
        setTimeout(() => navigate('/dashboard/accounts'), 3000);
        return;
      }

      try {
        const success = handleOAuthCallback(platform, code, state);
        
        if (success) {
          setStatus('success');
          setMessage(`Successfully connected ${platform}!`);
          setTimeout(() => navigate('/dashboard/accounts'), 2000);
        } else {
          setStatus('error');
          setMessage('OAuth verification failed');
          setTimeout(() => navigate('/dashboard/accounts'), 3000);
        }
      } catch (err) {
        setStatus('error');
        setMessage('An error occurred during OAuth callback');
        setTimeout(() => navigate('/dashboard/accounts'), 3000);
      }
    };

    processCallback();
  }, [searchParams, platform, handleOAuthCallback, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connecting {platform}...
            </h2>
            <p className="text-gray-600">
              Please wait while we complete the connection process.
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connection Successful!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting you back to your accounts...
            </p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connection Failed
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting you back to try again...
            </p>
          </>
        )}
      </div>
    </div>
  );
};