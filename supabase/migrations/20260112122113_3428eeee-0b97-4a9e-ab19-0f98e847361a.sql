-- Create newsletter_campaigns table for tracking sent campaigns
CREATE TABLE public.newsletter_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_recipients INTEGER NOT NULL DEFAULT 0,
  total_opens INTEGER NOT NULL DEFAULT 0,
  total_clicks INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Only admins can manage campaigns
CREATE POLICY "Admins can manage campaigns"
ON public.newsletter_campaigns
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create newsletter_tracking table for individual email tracking
CREATE TABLE public.newsletter_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_email TEXT NOT NULL,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_tracking ENABLE ROW LEVEL SECURITY;

-- Only admins can view tracking
CREATE POLICY "Admins can manage tracking"
ON public.newsletter_tracking
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow public insert for tracking pixel/link callbacks
CREATE POLICY "Allow public tracking updates"
ON public.newsletter_tracking
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_newsletter_campaigns_updated_at
BEFORE UPDATE ON public.newsletter_campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();