import React, { useEffect, useRef, useState } from 'react';
import { Upload, X, Image, Video, Loader2 } from 'lucide-react';
import { CloudinaryUploadResult, CloudinaryWidget } from './types';

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

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

  // Check if Cloudinary is properly configured (API key is optional for unsigned uploads)
  const isConfigured = cloudName && uploadPreset && cloudName !== 'your_cloudinary_cloud_name' && uploadPreset !== 'your_upload_preset';
  const useSignedUpload = apiKey && apiKey !== 'your_cloudinary_api_key_here';

  useEffect(() => {
    // Load Cloudinary widget script only if properly configured
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

  const openWidget = () => {
    if (!isConfigured) {
      setError('Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.');
      return;
    }

    if (!window.cloudinary) {
      setError('Cloudinary widget is not loaded');
      return;
    }

    setError(null);
    setLoading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        ...(useSignedUpload ? { apiKey } : { uploadPreset }),
        sources: ['local', 'url', 'camera'],
        multiple: maxFiles > 1,
        maxFiles,
        maxFileSize: 10000000, // 10MB
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        maxVideoFileSize: 50000000, // 50MB
        resourceType,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
        // Enhanced editing capabilities
        cropping: true,
        showSkipCropButton: true,
        
        // Image editing features
        ...(useSignedUpload && {
          // Advanced editing features only available with signed uploads
          imageEditingMode: 'advanced',
          showImageEditingOptions: true,
          imageEditingOptions: {
            crop: true,
            resize: true,
            rotate: true,
            flip: true,
            filters: true,
            adjustments: true,
            effects: true,
            overlays: true,
            text: true,
            background: true
          },
          showAdvancedOptions: true,
          croppingAspectRatio: null,
          croppingDefaultSelectionRatio: 1,
          croppingShowDimensions: true,
          croppingCoordinatesMode: 'custom',
        }),
        
        // Advanced transformation options
        eager: [
          { width: 400, height: 400, crop: 'fill', quality: 'auto' },
          { width: 800, height: 600, crop: 'fit', quality: 'auto' }
        ],
        
        // Enable all editing tools
        use_filename: true,
        unique_filename: true,
        showPoweredBy: false,
        
        folder,
        tags,
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
              Cloudinary Not Configured
            </p>
            <p className="text-xs text-yellow-700 mb-4">
              To enable media uploads, add these to your .env file:
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg text-left text-xs font-mono text-yellow-800">
              VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name<br/>
              VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
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
          {currentMedia.resource_type === 'image' && (
            <button
              onClick={openWidget}
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
          <p className="text-xs text-gray-400 mt-1">
            Includes cropping, filters, and editing tools
          </p>
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