/*
  # Fix Storage RLS Policies for Image Uploads

  1. Storage Configuration
    - Create images bucket with proper configuration
    - Set up RLS policies for authenticated users to upload images
    - Allow public read access for displaying images

  2. Security
    - Enable authenticated users to upload to images bucket
    - Allow public read access for portfolio display
    - Restrict delete/update to authenticated users only
*/

-- First, ensure the images bucket exists and is properly configured
DO $$
BEGIN
  -- Insert the bucket if it doesn't exist
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'images', 
    'images', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  )
  ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
END $$;

-- Create RLS policies for storage.objects using a different approach
-- This uses the storage schema functions which should have proper permissions

-- Policy for authenticated users to upload images
DO $$
BEGIN
  -- Drop existing policies if they exist to avoid conflicts
  DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Allow public read access to images" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated users to update images" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
  
  -- Create new policies
  EXECUTE format('
    CREATE POLICY %I ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = %L)',
    'Allow authenticated users to upload images',
    'images'
  );
  
  EXECUTE format('
    CREATE POLICY %I ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = %L)',
    'Allow public read access to images',
    'images'
  );
  
  EXECUTE format('
    CREATE POLICY %I ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = %L)
    WITH CHECK (bucket_id = %L)',
    'Allow authenticated users to update images',
    'images',
    'images'
  );
  
  EXECUTE format('
    CREATE POLICY %I ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = %L)',
    'Allow authenticated users to delete images',
    'images'
  );
EXCEPTION
  WHEN insufficient_privilege THEN
    -- If we don't have direct access to storage.objects, 
    -- the policies might need to be created through the Supabase dashboard
    RAISE NOTICE 'Could not create storage policies directly. Please create them through the Supabase dashboard.';
END $$;