-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow public tracking updates" ON public.newsletter_tracking;

-- Create a more restrictive policy that only allows updating specific tracking columns
-- We'll handle tracking via edge function with service role instead