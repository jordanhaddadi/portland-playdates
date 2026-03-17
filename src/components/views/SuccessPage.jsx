import { FONT, styles } from '../../styles/index';

export function SuccessPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ob-screen ob-welcome">
        <div className="ob-blob1" />
        <div className="ob-blob2" />
        <div className="ob-blob3" />
        <div className="waitlist-wrap">
          <div className="tally-success-card">
            <span className="tally-success-emoji">🎉</span>
            <div className="tally-success-headline">You're in!</div>
            <div className="tally-success-sub">
              Jordan will be in touch within 48 hours 
              to confirm your spot.
            </div>
            <button
              className="ob-btn-primary"
              onClick={() => {
                const existing = JSON.parse(localStorage.getItem("ppd_beta_session") || "{}");
                localStorage.setItem("ppd_beta_session", JSON.stringify({
                  obStep: 4,
                  profile: existing.profile || { name: "", hood: "", avatar: "", town: "", tone: "" },
                  kids: existing.kids || [],
                }));
                localStorage.setItem("ppd_show_preview", "true");
                window.location.href = "/";
              }}
            >
              Preview the app →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

