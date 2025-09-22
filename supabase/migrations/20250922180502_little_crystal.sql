/*
  # Create newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, validated format)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)
      - `unsubscribe_token` (uuid for future unsubscribe functionality)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for anonymous users to insert newsletter subscriptions
    - Add policy for authenticated users to read their own subscriptions
    - Add policy for service role to read all subscriptions

  3. Indexes
    - Index on email for fast lookups
    - Index on active subscriptions
    - Index on subscription date for analytics
*/

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  unsubscribe_token uuid DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add email format validation constraint
ALTER TABLE newsletter_subscriptions 
ADD CONSTRAINT IF NOT EXISTS valid_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscriptions(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to read their own newsletter subscription
CREATE POLICY "Users can read their own newsletter subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

-- Policy: Allow service role to read all newsletter subscriptions
CREATE POLICY "Service role can read all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO service_role
  USING (true);