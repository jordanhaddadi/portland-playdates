import { useState, useEffect } from "react";

export function WaitlistScreen({ profile, onPreview, onFormSubmitted, showTallySuccess }) {
  const firstName = (profile?.name || "").trim().split(" ")[0] || "friend";
  const avatar = (profile?.avatar || "") + (profile?.tone || "") || "👩";

  useEffect(() => {
    if (document.getElementById("tally-js")) {
      window.Tally?.loadEmbeds?.();
      return;
    }
    const script = document.createElement("script");
    script.id = "tally-js";
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => window.Tally?.loadEmbeds?.();
    document.body.appendChild(script);
  }, []);

  return (
    <div className="ob-screen ob-welcome">
      <div className="ob-blob1" /><div className="ob-blob2" /><div className="ob-blob3" />
      <div className="waitlist-wrap">
        <div className="waitlist-top">
          <div className="waitlist-avatar">{avatar}</div>
          <div className="waitlist-name">Hey, {firstName}!</div>
        </div>

        {showTallySuccess ? (
          <div className="tally-success-card">
            <span className="tally-success-emoji">🎉</span>
            <div className="tally-success-headline">You're in!</div>
            <div className="tally-success-sub">
              Jordan will be in touch within 48 hours.
            </div>
            <button className="ob-btn-primary" onClick={onPreview}>
              Preview the app →
            </button>
          </div>
        ) : (
          <div className="waitlist-card">
            <div className="waitlist-headline">You're on the list!</div>
            <div className="waitlist-subtext">
              Portland PlayDates is in private beta. Jordan will personally review your signup and reach out within 48 hours to confirm your spot.
            </div>

            <div className="waitlist-pill-row">
              <span className="tag tag-venue">Public spaces only</span>
              <span className="tag tag-age">Age-matched</span>
              <span className="tag tag-hood">Portland area</span>
            </div>

            <div style={{ fontSize:13, color:"var(--muted)", textAlign:"center", marginBottom:20, lineHeight:1.5 }}>
              Spots are limited. Be one of the first 50 Portland families.
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <button
                style={{
                  width:"100%",
                  background:"var(--terracotta)",
                  color:"white",
                  border:"none",
                  borderRadius:100,
                  padding:16,
                  fontSize:16,
                  fontWeight:600,
                  fontFamily:"DM Sans, sans-serif",
                  cursor:"pointer",
                }}
                data-tally-open="44kz95"
                data-tally-width="400"
                data-tally-overlay="1"
                data-tally-emoji-text="🎉"
                data-tally-emoji-animation="wave"
                data-tally-hide-title="1"
              >
                Reserve My Spot 🎉
              </button>
              <button
                style={{
                  width:"100%",
                  background:"transparent",
                  border:"none",
                  color:"var(--muted)",
                  fontSize:14,
                  fontWeight:400,
                  padding:10,
                  fontFamily:"DM Sans, sans-serif",
                  cursor:"pointer",
                }}
                onClick={onPreview}
              >
                Preview the app first →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

