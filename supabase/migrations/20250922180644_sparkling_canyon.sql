/*
  # Fix Newsletter RLS Policy

  1. Security Updates
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to subscribe
    - Ensure proper permissions for newsletter subscriptions

  This migration fixes the RLS policy violation that prevents anonymous users
  from subscribing to the newsletter.
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscriptions;

-- Create a new policy that properly allows anonymous users to insert
CREATE POLICY "Allow anonymous newsletter subscription"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the policy for reading own subscriptions still exists
DROP POLICY IF EXISTS "Users can read their own newsletter subscription" ON newsletter_subscriptions;

CREATE POLICY "Users can read their own newsletter subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'::text));

-- Ensure service role can still read all subscriptions
DROP POLICY IF EXISTS "Service role can read all newsletter subscriptions" ON newsletter_subscriptions;

CREATE POLICY "Service role can read all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO service_role
  USING (true);