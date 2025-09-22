/*
  # Comprehensive Newsletter RLS Policy Fix

  This migration completely resets and properly configures the RLS policies
  for the newsletter_subscriptions table to allow anonymous subscriptions.

  1. Drop all existing policies
  2. Create new policies with proper permissions
  3. Ensure anonymous users can insert newsletter subscriptions
*/

-- Drop all existing policies on newsletter_subscriptions table
DROP POLICY IF EXISTS "Allow anonymous newsletter subscription" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Users can read their own newsletter subscription" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Service role can read all newsletter subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON newsletter_subscriptions;

-- Ensure RLS is enabled
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert newsletter subscriptions
CREATE POLICY "Allow anonymous newsletter subscription"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow users to read their own subscription
CREATE POLICY "Users can read their own newsletter subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'::text));

-- Create policy to allow service role to read all subscriptions (for admin purposes)
CREATE POLICY "Service role can read all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO service_role
  USING (true);