import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  htmlContent: string;
  textContent?: string;
}

// Add tracking pixel to email content
function addTrackingToEmail(
  htmlContent: string,
  trackingId: string,
  supabaseUrl: string
): string {
  const trackingPixel = `<img src="${supabaseUrl}/functions/v1/track-email?t=${trackingId}&type=open" width="1" height="1" style="display:none;" alt="" />`;
  
  // Add tracking pixel before closing body tag or at the end
  if (htmlContent.includes("</body>")) {
    return htmlContent.replace("</body>", `${trackingPixel}</body>`);
  }
  return htmlContent + trackingPixel;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: "Only admins can send newsletters" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { subject, htmlContent, textContent }: NewsletterRequest = await req.json();

    if (!subject || !htmlContent) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("is_active", true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch subscribers" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ error: "No active subscribers found" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emails = subscribers.map((s) => s.email);

    // Create service role client for campaign tracking
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Create campaign record
    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from("newsletter_campaigns")
      .insert({
        subject,
        content: htmlContent,
        total_recipients: emails.length,
        status: "sending",
      })
      .select()
      .single();

    if (campaignError || !campaign) {
      console.error("Error creating campaign:", campaignError);
      return new Response(
        JSON.stringify({ error: "Failed to create campaign record" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create tracking records for each subscriber
    const trackingRecords = emails.map((email) => ({
      campaign_id: campaign.id,
      subscriber_email: email,
    }));

    const { data: trackingData, error: trackingError } = await supabaseAdmin
      .from("newsletter_tracking")
      .insert(trackingRecords)
      .select();

    if (trackingError) {
      console.error("Error creating tracking records:", trackingError);
    }

    // Map email to tracking ID
    const emailToTrackingId: Record<string, string> = {};
    if (trackingData) {
      trackingData.forEach((t) => {
        emailToTrackingId[t.subscriber_email] = t.id;
      });
    }

    // Send individual emails with tracking
    const results = [];
    let successCount = 0;

    for (const email of emails) {
      const trackingId = emailToTrackingId[email];
      const trackedContent = trackingId
        ? addTrackingToEmail(htmlContent, trackingId, supabaseUrl)
        : htmlContent;

      try {
        const emailResponse = await resend.emails.send({
          from: "Newsletter <onboarding@resend.dev>",
          to: [email],
          subject: subject,
          html: trackedContent,
          text: textContent || undefined,
        });

        results.push({ email, success: true, response: emailResponse });
        successCount++;
      } catch (emailError: any) {
        console.error(`Error sending to ${email}:`, emailError);
        results.push({ email, success: false, error: emailError.message });
      }
    }

    // Update campaign status
    await supabaseAdmin
      .from("newsletter_campaigns")
      .update({ status: "sent" })
      .eq("id", campaign.id);

    console.log(`Newsletter sent: ${successCount}/${emails.length} emails successful`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Newsletter sent to ${successCount} of ${emails.length} subscribers`,
        campaignId: campaign.id,
        details: { successCount, totalRecipients: emails.length },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
