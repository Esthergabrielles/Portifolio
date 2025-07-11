/*
  # Add Storage Policies for Image Uploads

  1. Storage Policies
    - Allow authenticated users to upload images to 'images' bucket
    - Allow public read access to images in 'images' bucket
    - Allow authenticated users to update their uploaded images
    - Allow authenticated users to delete their uploaded images

  2. Security
    - Enable RLS on storage.objects table (if not already enabled)
    - Add policies for CRUD operations on images bucket
*/

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'images');

-- Allow public read access to images
CREATE POLICY "Allow public read access to images" 
  ON storage.objects 
  FOR SELECT 
  TO public 
  USING (bucket_id = 'images');

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated users to update images" 
  ON storage.objects 
  FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete images" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'images');

-- Create the images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;