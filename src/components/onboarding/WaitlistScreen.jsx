import { useState, useEffect } from "react";

export function WaitlistScreen({ profile, onPreview, onFormSubmitted, showTallySuccess }) {
  const firstName = (profile?.name || "").trim().split(" ")[0] || "friend";
  const avatar = (profile?.avatar || "") + (profile?.tone || "") || "👩";
  const [showFaq, setShowFaq] = useState(false);

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

  const FAQS = [
    {
      q: "Is it safe?",
      a: "Every meetup is at a park, library, or cafe. Never private homes. Public spaces only is a core design principle, not an afterthought."
    },
    {
      q: "Who is it for?",
      a: "Parents, nannies, grandparents, homeschool families and mamas-to-be. All caregivers with young kids are welcome."
    },
    {
      q: "What towns are included?",
      a: "Greater Portland is our home base and where we are starting. We are actively expanding and would love to know where you are! Sign up and let us know your town and you will be among the first to know when your area goes live."
    },
    {
      q: "When does it launch?",
      a: "This spring. Founding families get first access and help shape what gets built next."
    },
    {
      q: "Do I need to download an app?",
      a: "No download needed yet. Portland PlayDates works right in your browser and is best experienced on mobile."
    },
  ];

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
              Spots are limited. Be one of the first 100 founding families.
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
                className="waitlist-faq-toggle"
                onClick={() => setShowFaq(f => !f)}
              >
                {showFaq ? "Hide common questions ↑" : "Have questions? ↓"}
              </button>
              {showFaq && (
                <div className="waitlist-faq">
                  {FAQS.map(faq => (
                    <div key={faq.q} className="waitlist-faq-item">
                      <div className="waitlist-faq-q">{faq.q}</div>
                      <div className="waitlist-faq-a">{faq.a}</div>
                    </div>
                  ))}
                </div>
              )}
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

