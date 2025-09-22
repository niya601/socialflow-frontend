export const PLATFORM_LIMITS = {
  Instagram: 2200,
  TikTok: 150,
  YouTube: 5000,
} as const;

export const SUBSCRIPTION_PLANS = {
  Free: {
    name: 'Free',
    posts_per_month: 10,
    platforms: 1,
    scheduling: false,
    analytics: false,
  },
  Pro: {
    name: 'Pro',
    posts_per_month: 100,
    platforms: 3,
    scheduling: true,
    analytics: true,
  },
} as const;

export const OAUTH_SCOPES = {
  Instagram: 'instagram_basic,instagram_content_publish',
  TikTok: 'user.info.basic,video.list,video.upload',
  YouTube: 'https://www.googleapis.com/auth/youtube.upload',
} as const;