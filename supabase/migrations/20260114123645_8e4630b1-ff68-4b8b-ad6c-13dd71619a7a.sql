-- Create a public-safe view that excludes sensitive fields (email, phone)
CREATE VIEW public.teachers_public
WITH (security_invoker = on) AS
SELECT
  id,
  name,
  title,
  specialization,
  bio,
  avatar_url,
  experience_years,
  total_students,
  rating,
  is_active,
  created_at,
  updated_at
FROM public.teachers
WHERE is_active = true;

-- Drop the existing overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view active teachers" ON public.teachers;

-- Create a restrictive policy that only allows admins to directly query the base table
-- This prevents unauthenticated users from accessing email/phone directly
CREATE POLICY "Only admins can directly access teachers table"
ON public.teachers FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));