import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// 1x1 transparent GIF
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b
]);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const trackingId = url.searchParams.get("t");
    const type = url.searchParams.get("type") || "open";
    const redirectUrl = url.searchParams.get("url");

    if (!trackingId) {
      return new Response("Missing tracking ID", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update the tracking record
    if (type === "open") {
      await supabase
        .from("newsletter_tracking")
        .update({ opened_at: new Date().toISOString() })
        .eq("id", trackingId)
        .is("opened_at", null);

      // Increment total_opens in campaign
      const { data: tracking } = await supabase
        .from("newsletter_tracking")
        .select("campaign_id")
        .eq("id", trackingId)
        .single();

      if (tracking?.campaign_id) {
        await supabase.rpc("increment_campaign_opens", {
          campaign_uuid: tracking.campaign_id,
        });
      }

      // Return tracking pixel
      return new Response(TRACKING_PIXEL, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          ...corsHeaders,
        },
      });
    } else if (type === "click" && redirectUrl) {
      await supabase
        .from("newsletter_tracking")
        .update({ clicked_at: new Date().toISOString() })
        .eq("id", trackingId)
        .is("clicked_at", null);

      // Increment total_clicks in campaign
      const { data: tracking } = await supabase
        .from("newsletter_tracking")
        .select("campaign_id")
        .eq("id", trackingId)
        .single();

      if (tracking?.campaign_id) {
        await supabase.rpc("increment_campaign_clicks", {
          campaign_uuid: tracking.campaign_id,
        });
      }

      // Redirect to the actual URL
      return Response.redirect(redirectUrl, 302);
    }

    return new Response("Invalid request", { status: 400 });
  } catch (error: any) {
    console.error("Error in track-email function:", error);
    // Still return pixel/redirect even on error to not break user experience
    return new Response(TRACKING_PIXEL, {
      headers: {
        "Content-Type": "image/gif",
        ...corsHeaders,
      },
    });
  }
};

serve(handler);
