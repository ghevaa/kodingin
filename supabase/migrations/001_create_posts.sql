-- =============================================
-- Blog Posts Table Migration
-- =============================================
-- Run this SQL in your Supabase SQL Editor to create the posts table
-- Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts(slug);

-- Create index for published posts queries
CREATE INDEX IF NOT EXISTS posts_published_idx ON public.posts(published, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Row Level Security Policies
-- =============================================

-- Policy: Anyone can read published posts
CREATE POLICY "Public can view published posts"
  ON public.posts
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can view all posts (including drafts)
CREATE POLICY "Authenticated users can view all posts"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can update their own posts
CREATE POLICY "Authors can update own posts"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can delete their own posts
CREATE POLICY "Authors can delete own posts"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- =============================================
-- Updated At Trigger
-- =============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on update
DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- Optional: Create admin role for broader access
-- =============================================
-- Uncomment if you want certain users to manage all posts:
--
-- CREATE POLICY "Admins can manage all posts"
--   ON public.posts
--   FOR ALL
--   TO authenticated
--   USING (
--     EXISTS (
--       SELECT 1 FROM auth.users
--       WHERE auth.users.id = auth.uid()
--       AND auth.users.raw_user_meta_data->>'role' = 'admin'
--     )
--   );
