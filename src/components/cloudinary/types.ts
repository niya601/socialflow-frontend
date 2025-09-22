export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: 'image' | 'video';
  width: number;
  height: number;
  bytes: number;
  duration?: number;
  created_at: string;
}

export interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  sources: string[];
  multiple: boolean;
  maxFiles: number;
  maxFileSize: number;
  maxImageWidth: number;
  maxImageHeight: number;
  maxVideoFileSize: number;
  resourceType: 'auto' | 'image' | 'video';
  clientAllowedFormats: string[];
  cropping: boolean;
  croppingAspectRatio?: number;
  showSkipCropButton: boolean;
  folder?: string;
  tags?: string[];
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryWidgetOptions,
        callback: (error: any, result: { event: string; info: CloudinaryUploadResult }) => void
      ) => CloudinaryWidget;
    };
  }
}