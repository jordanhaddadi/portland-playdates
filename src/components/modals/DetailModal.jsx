import { useState } from "react";
import { PublicProfileModal } from "./PublicProfileModal";

export function DetailModal({ showDetail, setShowDetail, joined, setJoined, onToggleJoin, currentUserId }) {
  const [viewingProfile, setViewingProfile] = useState(null);

  if (!showDetail && !viewingProfile) return null;

  return (
    <>
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="detail-img" style={{background:showDetail.bg}}>{showDetail.emoji}</div>
            <div className="card-tags" style={{marginBottom:10}}>
              <span className="tag tag-age">👶 {showDetail.ages}</span>
              <span className="tag tag-venue">📍 {showDetail.hood}</span>
            </div>
            <div className="detail-title">{showDetail.title}</div>
            <div
              style={{
                fontSize: 13,
                color: "var(--muted)",
                marginTop: 6,
              }}
            >
              Hosted by {showDetail.hostName || showDetail.host || "Host"}
            </div>
            <div className="detail-row"><span className="detail-icon">🕐</span><span>{showDetail.date}</span></div>
            <div className="detail-row"><span className="detail-icon">📍</span><div><div>{showDetail.venue}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{showDetail.addr}</div></div></div>
            <div className="detail-row"><span className="detail-icon">🌤</span><span>{showDetail.weather}</span></div>
            <div className="detail-row"><span className="detail-icon">💬</span><span>{showDetail.description}</span></div>
            <div className="detail-row">
              <span className="detail-icon">👥</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div className="avatar-stack">
                    {(showDetail.allAttendees || showDetail.attendees || []).slice(0,3).map((a,i) => (
                      <div
                        key={i}
                        className="avatar-sm"
                        style={{background:["#EAF3F8","#EEF4EF","#FDF0E8"][i%3]}}
                      >
                        {a && a.photoUrl ? (
                          <img
                            src={a.photoUrl}
                            alt="attendee"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          a.emoji || a
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {(showDetail.allAttendees?.length ?? showDetail.attendees?.length ?? showDetail.count ?? 0)} Portland parents going
                  </div>
                </div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Public meetup · Kid-friendly venue</div>
              </div>
            </div>

            <div className="detail-attendees">
              <div className="detail-attendees-label">
                {(showDetail.allAttendees?.length ?? showDetail.attendees?.length ?? 0)} going
              </div>
              {(showDetail.allAttendees || showDetail.attendees || []).map((a, i) => (
                <div
                  key={i}
                  className="detail-attendee-row"
                  style={{ cursor: a.profileId ? "pointer" : "default" }}
                  onClick={() => {
                    if (a.profileId) {
                      setViewingProfile(a.profileId);
                    }
                  }}
                >
                  <div className="detail-attendee-avatar">
                    {a.photoUrl ? (
                      <img
                        src={a.photoUrl}
                        alt=""
                        className="detail-attendee-photo"
                      />
                    ) : (
                      a.emoji || "👤"
                    )}
                  </div>
                  <div className="detail-attendee-info">
                    <div className="detail-attendee-name">
                      {a.name || "Parent"}
                      {i === 0 && (
                        <span className="attendee-host-badge">Hosting</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className={`rsvp-btn ${(showDetail._isDb ? showDetail._joined : joined[showDetail.id]) ? "going" : ""}`}
              onClick={() => {
                if (showDetail._isDb && onToggleJoin) {
                  onToggleJoin(showDetail.id);
                } else {
                  setJoined(j=>({...j,[showDetail.id]:!j[showDetail.id]}));
                }
                setShowDetail(null);
              }}>
              {(showDetail._isDb ? showDetail._joined : joined[showDetail.id]) ? "✓ You're Going! 🎉" : "RSVP - I'm In! 🙌"}
            </button>
          </div>
        </div>
      )}

      {viewingProfile && (
        <PublicProfileModal
          userId={viewingProfile}
          currentUserId={currentUserId}
          onClose={() => setViewingProfile(null)}
        />
      )}
    </>
  );
}
