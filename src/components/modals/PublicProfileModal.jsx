import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function PublicProfileModal({ userId, onClose, currentUserId }) {
  const [pub, setPub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from("profiles")
          .select("name, avatar, tone, avatar_url, town, hood, bio, role")
          .eq("id", userId)
          .maybeSingle();

        const { data: kidsData } = await supabase
          .from("kids")
          .select("name, age, emoji")
          .eq("profile_id", userId);

        const { data: playdatesData } = await supabase
          .from("playdates")
          .select("id, title, venue, date, time, emoji")
          .eq("host_id", userId)
          .order("date", { ascending: true })
          .limit(3);

        if (!cancelled) {
          if (!data) {
            setPub(null);
          } else {
            setPub({
              ...data,
              kids: kidsData || [],
              playdates: playdatesData || [],
            });
          }
        }
      } catch (e) {
        console.error("Failed to load public profile:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="pub-profile-sheet"
        onClick={e => e.stopPropagation()}
      >
        {loading ? (
          <div className="pub-profile-loading">Loading...</div>
        ) : !pub ? (
          <div className="pub-profile-loading">
            Profile not found
          </div>
        ) : (
          <>
            <div className="pub-profile-header">
              <div className="pub-profile-avatar">
                {pub.avatar_url ? (
                  <img
                    src={pub.avatar_url}
                    alt=""
                    className="pub-profile-avatar-img"
                  />
                ) : (
                  ((pub.avatar || "") + (pub.tone || "")) || "👤"
                )}
              </div>
              <div className="pub-profile-name">
                {pub.name || "Parent"}
              </div>
              <div className="pub-profile-meta">
                {[pub.role, pub.hood, pub.town]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
              {pub.bio ? (
                <div className="pub-profile-bio">{pub.bio}</div>
              ) : null}
            </div>

            {pub.kids?.length > 0 && (
              <div className="pub-profile-section">
                <div className="pub-profile-section-label">
                  Kids
                </div>
                {pub.kids.map((k, i) => (
                  <div key={i} className="pub-profile-kid-row">
                    <span>{k.emoji}</span>
                    <span>{k.name} ({k.age})</span>
                  </div>
                ))}
              </div>
            )}

            {pub.playdates?.length > 0 && (
              <div className="pub-profile-section">
                <div className="pub-profile-section-label">
                  Upcoming playdates
                </div>
                {pub.playdates.map((pd, i) => (
                  <div key={i} className="pub-profile-pd-row">
                    <span>{pd.emoji}</span>
                    <div>
                      <div className="pub-profile-pd-title">
                        {pd.title}
                      </div>
                      <div className="pub-profile-pd-meta">
                        {pd.venue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="pub-profile-close"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
