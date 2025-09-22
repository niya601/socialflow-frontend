/*
  # Create newsletter subscription table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `subscribed_at` (timestamp with timezone, default now())
      - `is_active` (boolean, default true)
      - `unsubscribe_token` (uuid, for future unsubscribe functionality)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for public insert (anyone can subscribe)
    - Add policy for authenticated users to read their own subscriptions

  3. Indexes
    - Add index on email for fast lookups
    - Add index on subscribed_at for sorting
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  unsubscribe_token uuid DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own subscriptions
CREATE POLICY "Users can read their own newsletter subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow service role to read all subscriptions (for admin purposes)
CREATE POLICY "Service role can read all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscriptions(subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active) WHERE is_active = true;

-- Add email validation constraint
ALTER TABLE newsletter_subscriptions 
ADD CONSTRAINT valid_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');