-- Migration: Enable magic link auth + deixis_artists table
-- Run this in the Supabase SQL editor

-- 1. Ensure the Email auth provider has magic link enabled
-- This is toggled in the Supabase Dashboard under Authentication > Providers > Email > Magic Link
-- No SQL migration is needed for this — it's a project setting.

-- 2. Create the deixis_artists table (idempotent)
CREATE TABLE IF NOT EXISTS deixis_artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  email text,
  bio text,
  avatar_url text,
  status text NOT NULL DEFAULT 'applied',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Enable row-level security
ALTER TABLE deixis_artists ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies
-- Artists can read their own row
CREATE POLICY "artists_read_own" ON deixis_artists
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

-- Artists can insert their own row (first sign-in)
CREATE POLICY "artists_insert_own" ON deixis_artists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth_user_id = auth.uid());

-- Service role can do everything (for admin operations)
CREATE POLICY "service_role_all" ON deixis_artists
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_deixis_artists_updated_at ON deixis_artists;
CREATE TRIGGER update_deixis_artists_updated_at
  BEFORE UPDATE ON deixis_artists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
