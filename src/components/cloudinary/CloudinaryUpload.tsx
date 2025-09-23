import React, { useEffect, useRef, useState } from 'react';
import { Upload, X, Image, Video, Loader2 } from 'lucide-react';
import { CloudinaryUploadResult, CloudinaryWidget } from './types';
import { supabase } from '../../utils/supabase';

interface CloudinaryUploadProps {
  onUpload: (result: CloudinaryUploadResult) => void;
  onRemove?: () => void;
  currentMedia?: CloudinaryUploadResult | null;
  disabled?: boolean;
  maxFiles?: number;
  resourceType?: 'auto' | 'image' | 'video';
  folder?: string;
  tags?: string[];
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUpload,
  onRemove,
  currentMedia,
  disabled = false,
  maxFiles = 1,
  resourceType = 'auto',
  folder = 'socialflow',
  tags = ['socialflow', 'post'],
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const [signatureData, setSignatureData] = useState<{
    signature: string;
    timestamp: number;
    api_key: string;
    cloud_name: string;
  } | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Check if Cloudinary is properly configured
  const isConfigured = cloudName && uploadPreset && 
    cloudName !== 'your_cloudinary_cloud_name' && 
    uploadPreset !== 'your_upload_preset';

  useEffect(() => {
    // Load Cloudinary widget script
    if (isConfigured && !window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, [isConfigured]);

  const getSignature = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('cloudinary-signature', {
        body: {
          folder,
          tags,
          resource_type: resourceType,
          upload_preset: uploadPreset,
          use_filename: true,
          unique_filename: false,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to get signature');
      }

      return data;
    } catch (error: any) {
      console.error('Error getting Cloudinary signature:', error);
      throw new Error(`Failed to get upload signature: ${error.message}`);
    }
  };

  const openWidget = () => {
    if (!isConfigured) {
      setError('Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file, and ensure the Supabase Edge Function is deployed with proper secrets.');
      return;
    }

    if (!window.cloudinary) {
      setError('Cloudinary widget is not loaded');
      return;
    }

    const initializeWidget = async () => {
      try {
        setError(null);
        setLoading(true);

        // Get signature from Supabase Edge Function
        const signature = await getSignature();
        setSignatureData(signature);

        const widget = window.cloudinary.createUploadWidget(
          {
            cloudName: signature.cloud_name,
            apiKey: signature.api_key,
            signature: signature.signature,
            timestamp: signature.timestamp,
            uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: maxFiles > 1,
            maxFiles,
            maxFileSize: 10000000, // 10MB
            maxImageWidth: 2000,
            maxImageHeight: 2000,
            maxVideoFileSize: 50000000, // 50MB
            resourceType,
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
            
            // Enhanced editing capabilities for signed uploads
            cropping: true,
            showSkipCropButton: true,
            
            // Advanced editing features for signed uploads
            showAdvancedOptions: true,
            croppingAspectRatio: null,
            croppingDefaultSelectionRatio: 1,
            croppingShowDimensions: true,
            croppingCoordinatesMode: 'custom',
            
            // Advanced transformation options
            eager: [
              { width: 400, height: 400, crop: 'fill', quality: 'auto' },
              { width: 800, height: 600, crop: 'fit', quality: 'auto' }
            ],
            
            // Enable all editing tools
            showPoweredBy: false,
          },
          (error, result) => {
            setLoading(false);
            
            if (error) {
              console.error('Cloudinary upload error:', error);
              setError(error.message || 'Upload failed. Please check your Cloudinary configuration.');
              return;
            }

            if (result.event === 'success') {
              console.log('Upload successful:', result.info);
              onUpload(result.info);
            }
          }
        );

        widgetRef.current = widget;
        widget.open();
      } catch (error: any) {
        setLoading(false);
        setError(error.message || 'Failed to initialize upload widget');
      }
    };

    initializeWidget();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show configuration message if not properly set up
  if (!isConfigured) {
    return (
      <div className="space-y-4">
        <div className="p-6 border-2 border-dashed border-yellow-300 rounded-xl bg-yellow-50">
          <div className="flex flex-col items-center text-center">
            <Upload className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-sm text-yellow-800 font-medium mb-2">
              Cloudinary Upload Not Available
            </p>
            <p className="text-xs text-yellow-700 mb-4">
              To enable media uploads, ensure you have:
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg text-left text-xs font-mono text-yellow-800">
              1. VITE_CLOUDINARY_CLOUD_NAME in .env<br/>
              2. VITE_CLOUDINARY_UPLOAD_PRESET in .env<br/>
              3. Supabase Edge Function deployed<br/>
              4. Cloudinary secrets in Supabase
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentMedia) {
    return (
      <div className="space-y-4">
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          {currentMedia.resource_type === 'image' ? (
            <img
              src={currentMedia.secure_url}
              alt="Uploaded media"
              className="w-full h-48 object-cover"
            />
          ) : (
            <video
              src={currentMedia.secure_url}
              className="w-full h-48 object-cover"
              controls
            />
          )}
          
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove media"
          >
            <X className="w-4 h-4" />
          </button>
          
          {/* Edit button for images */}
          {currentMedia.resource_type === 'image' && !loading && (
            <button
              onClick={openWidget}
              disabled={loading}
              className="absolute top-2 left-2 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              aria-label="Edit media"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            {currentMedia.resource_type === 'image' ? (
              <Image className="w-4 h-4 text-gray-600" />
            ) : (
              <Video className="w-4 h-4 text-gray-600" />
            )}
            <span className="text-sm font-medium text-gray-900">
              {currentMedia.format.toUpperCase()} • {formatFileSize(currentMedia.bytes)}
            </span>
            {currentMedia.duration && (
              <span className="text-sm text-gray-600">
                • {formatDuration(currentMedia.duration)}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {currentMedia.width} × {currentMedia.height}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openWidget}
        disabled={disabled || loading}
        className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-400 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center">
          {loading ? (
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-teal-500 mb-2 transition-colors" />
          )}
          <p className="text-sm text-gray-600 group-hover:text-teal-600 transition-colors">
            {loading ? 'Uploading...' : 'Click to upload media'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports images (10MB) and videos (50MB)
          </p>
          {isConfigured && (
            <p className="text-xs text-gray-400 mt-1">
              Includes cropping, filters, and editing tools
            </p>
          )}
        </div>
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};