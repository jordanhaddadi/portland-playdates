import { useEffect, useState } from "react";
import { upsertProfile } from "../../lib/session";

function ProfileView({
  profile,
  kids,
  onEditProfile,
  onEditKids,
  onEditCaregiver,
  onLogout,
  showLogout,
  session,
  setProfile,
  hostedCount = 0,
  joinedCount = 0,
}) {
  const avatar = (profile.avatar || "") + (profile.tone || "");
  const name = profile.name || "Your profile";
  const role = profile?.role || "";
  const hood = profile?.hood || "";
  const town = profile?.town || "Portland";

  const meta = (() => {
    const r = String(role || "").trim();
    const h = String(hood || "").trim();
    const t = String(town || "").trim();
    if (r && h && t) return `${r} · ${h} · ${t}`;
    if (r && t) return `${r} · ${t}`;
    if (h && t) return `${h} · ${t}`;
    return t || "Portland";
  })();

  const bio = (profile.bio || "").trim();
  const [editingBio, setEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState(profile?.bio || "");

  useEffect(() => {
    setBioValue(profile?.bio || "");
  }, [profile?.bio]);

  const formatKidAge = (age) => {
    if (age == null) return "";
    const text = String(age).trim();
    if (!text) return "";
    const lower = text.toLowerCase();
    if (lower.includes("yr")) return text;
    return `${text} yrs`;
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar-large">{avatar || "👩"}</div>
        <div className="profile-name-large">{name}</div>
        <div className="profile-meta">{meta}</div>
      </div>

      <div className="profile-stats-row">
        <div className="profile-stat">
          <div className="profile-stat-number">{hostedCount}</div>
          <div className="profile-stat-label">Hosted</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-number">{joinedCount}</div>
          <div className="profile-stat-label">Joined</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-number">{kids.length}</div>
          <div className="profile-stat-label">Kids</div>
        </div>
      </div>

      {editingBio ? (
        <div className="profile-bio-card" style={{ borderBottom: "1px solid #eee" }}>
          <textarea
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            style={{
              width: "100%",
              minHeight: 80,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--charcoal)",
              background: "white",
              border: "1.5px solid var(--ocean-light, #a8c8d8)",
              borderRadius: 12,
              padding: "10px 12px",
              resize: "none",
              fontFamily: "DM Sans, sans-serif",
            }}
          />
          <div className="bio-edit-actions">
            <button
              type="button"
              className="bio-save-btn"
              onClick={async () => {
                const newBio = (bioValue || "").trim();
                if (typeof setProfile === "function") {
                  setProfile(p => ({ ...p, bio: newBio }));
                }
                try {
                  if (session?.user?.id) {
                    await upsertProfile(session.user.id, { ...(profile || {}), bio: newBio });
                  }
                } catch (e) {
                  console.error("Failed to save bio:", e);
                }
                setEditingBio(false);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="bio-cancel-btn"
              onClick={() => {
                setBioValue(profile?.bio || "");
                setEditingBio(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : bio ? (
        <div className="profile-bio-card">
          <div className="bio-display">
            <div>{bio}</div>
            <button
              type="button"
              className="bio-edit-link"
              onClick={() => setEditingBio(true)}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div
          className="profile-bio-empty bio-edit-trigger"
          onClick={() => setEditingBio(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setEditingBio(true);
          }}
          style={{ borderBottom: "1px solid #eee" }}
        >
          Tap to add a bio...
        </div>
      )}

      <div className="profile-section-label">Kids</div>
      <div className="profile-kids-list">
        {kids.length === 0 ? (
          <div className="profile-bio-empty" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
            No kids added yet
          </div>
        ) : (
          kids.map((k, i) => (
            <div key={i} className="profile-kid-row">
              <div style={{ fontSize: 20 }}>{k.emoji}</div>
              <div>{k.name} ({formatKidAge(k.age)})</div>
            </div>
          ))
        )}
      </div>

      <div className="profile-actions">
        <button className="profile-btn profile-btn-primary" onClick={onEditProfile}>
          Edit Profile
        </button>
        <button className="profile-btn profile-btn-secondary" onClick={onEditKids}>
          Edit Kids
        </button>
        <button className="profile-btn profile-btn-secondary" onClick={onEditCaregiver}>
          Edit Preferences
        </button>
        {showLogout && (
          <button className="profile-btn profile-btn-logout" onClick={onLogout}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export { ProfileView };

