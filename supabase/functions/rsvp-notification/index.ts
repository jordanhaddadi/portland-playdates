import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record?.playdate_id || !record?.profile_id) {
      return new Response("Missing fields", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get playdate + host info
    const { data: playdate } = await supabase
      .from("playdates")
      .select("title, date, venue, host_id, profiles:host_id(name, email)")
      .eq("id", record.playdate_id)
      .single();

    if (!playdate) {
      return new Response("Playdate not found", { status: 404 });
    }

    // Don't notify if host is RSVPing to their own event
    if (playdate.host_id === record.profile_id) {
      return new Response("Host self-RSVP, skipping", { status: 200 });
    }

    // Get attendee profile
    const { data: attendee } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", record.profile_id)
      .single();

    const hostEmail = playdate.profiles?.email;
    const hostName = playdate.profiles?.name || "there";
    const attendeeName = attendee?.name || "Someone";

    if (!hostEmail) {
      return new Response("No host email", { status: 200 });
    }

    // Format date nicely
    const dateStr = playdate.date
      ? new Date(`${playdate.date}T12:00:00`).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      : "";

    // Send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Portland PlayDates <jordan@portlandplaydates.com>",
        to: hostEmail,
        subject: `${attendeeName} just joined your playdate!`,
        html: `
          <div style="font-family:helvetica,arial,sans-serif; max-width:480px; margin:0 auto; padding:32px 24px; background:#FDF8F2; border-radius:16px;">
            <p style="font-size:28px; margin:0 0 16px;">⚓</p>
            <h2 style="font-family:Georgia,serif; font-size:22px; color:#2E2E2E; margin:0 0 8px;">
              New RSVP for your playdate!
            </h2>
            <p style="font-size:15px; color:#5A5A5A; margin:0 0 24px; line-height:1.6;">
              Hi ${hostName}, ${attendeeName} just joined
              <strong>${playdate.title}</strong>
              ${dateStr ? `on ${dateStr}` : ""} at ${playdate.venue}.
            </p>
            <a href="https://www.portlandplaydates.com"
              style="display:inline-block; background:#C4583A; color:white; text-decoration:none; padding:12px 24px; border-radius:100px; font-size:13px; font-weight:700; font-family:helvetica,arial,sans-serif;">
              View your playdate →
            </a>
            <p style="font-size:12px; color:#A0A89A; margin:24px 0 0;">
              Portland PlayDates · portlandplaydates.com
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response("Email failed", { status: 500 });
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("rsvp-notification error:", e);
    return new Response("Error", { status: 500 });
  }
});

