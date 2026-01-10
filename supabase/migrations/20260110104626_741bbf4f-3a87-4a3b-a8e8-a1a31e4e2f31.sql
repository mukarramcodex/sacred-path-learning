-- Create storage buckets for course thumbnails and teacher avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('course-thumbnails', 'course-thumbnails', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('teacher-avatars', 'teacher-avatars', true);

-- Allow public read access to course thumbnails
CREATE POLICY "Anyone can view course thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-thumbnails');

-- Allow admins to upload/update/delete course thumbnails
CREATE POLICY "Admins can upload course thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update course thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'course-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete course thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow public read access to teacher avatars
CREATE POLICY "Anyone can view teacher avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'teacher-avatars');

-- Allow admins to upload/update/delete teacher avatars
CREATE POLICY "Admins can upload teacher avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'teacher-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update teacher avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'teacher-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete teacher avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'teacher-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);