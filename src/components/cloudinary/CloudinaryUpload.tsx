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

  useEffect(() => {
    // Load Cloudinary widget script
    if (!window.cloudinary) {
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
  }, []);

  const openWidget = () => {
    if (!cloudName || !uploadPreset) {
      setError('Cloudinary configuration is missing');
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
        cropping: true,
        showSkipCropButton: true,
        folder,
        tags,
      },
      (error, result) => {
        setLoading(false);
        
        if (error) {
          setError(error.message || 'Upload failed');
          return;
        }

        if (result.event === 'success') {
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
            Supports images and videos up to 10MB
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