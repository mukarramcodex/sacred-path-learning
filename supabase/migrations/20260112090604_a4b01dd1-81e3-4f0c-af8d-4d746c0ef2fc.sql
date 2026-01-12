-- Drop existing overly permissive INSERT policies and replace with constrained ones

-- 1. Drop and recreate newsletter_subscribers INSERT policy with email validation
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email IS NOT NULL
  AND email <> ''
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- 2. Drop and recreate contacts INSERT policy with required field validation
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
CREATE POLICY "Anyone can submit contact form"
ON public.contacts
FOR INSERT
WITH CHECK (
  name IS NOT NULL
  AND name <> ''
  AND email IS NOT NULL
  AND email <> ''
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND subject IS NOT NULL
  AND subject <> ''
  AND message IS NOT NULL
  AND message <> ''
);

-- 3. Drop and recreate admissions INSERT policy with required field validation
DROP POLICY IF EXISTS "Anyone can submit admission application" ON public.admissions;
CREATE POLICY "Anyone can submit admission application"
ON public.admissions
FOR INSERT
WITH CHECK (
  student_name IS NOT NULL
  AND student_name <> ''
  AND email IS NOT NULL
  AND email <> ''
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND phone IS NOT NULL
  AND phone <> ''
  AND age > 0
  AND gender IS NOT NULL
  AND gender <> ''
  AND country IS NOT NULL
  AND country <> ''
  AND course_interest IS NOT NULL
  AND course_interest <> ''
);