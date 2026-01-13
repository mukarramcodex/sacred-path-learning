-- Create function to increment campaign opens
CREATE OR REPLACE FUNCTION public.increment_campaign_opens(campaign_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE newsletter_campaigns
  SET total_opens = total_opens + 1
  WHERE id = campaign_uuid;
END;
$$;

-- Create function to increment campaign clicks
CREATE OR REPLACE FUNCTION public.increment_campaign_clicks(campaign_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE newsletter_campaigns
  SET total_clicks = total_clicks + 1
  WHERE id = campaign_uuid;
END;
$$;