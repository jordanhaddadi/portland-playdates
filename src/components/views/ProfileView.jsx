function ProfileView({ profile, kids, onEditProfile, onEditKids, onLogout, showLogout }) {
  return (
    <div style={{ padding: 24, paddingBottom: 120 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48 }}>
          {profile.avatar + (profile.tone || "") || "👩"}
        </div>

        <div style={{
          fontFamily: "Fraunces, serif",
          fontSize: 24,
          marginTop: 10
        }}>
          {profile.name || "Your profile"}
        </div>

        <div style={{
          fontSize: 13,
          color: "var(--muted)",
          marginTop: 4
        }}>
          {profile.hood ? `${profile.hood} · ` : ""}{profile.town || "Portland"}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="section-title" style={{ marginBottom: 10 }}>
          Kids
        </div>

        {kids.length === 0 ? (
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            No kids added yet
          </div>
        ) : (
          kids.map((k, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8
            }}>
              <div style={{ fontSize: 20 }}>{k.emoji}</div>
              <div>{k.name} ({k.age})</div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="hero-cta"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          onClick={onEditProfile}
        >
          Edit Profile
        </button>

        <button className="pill-cta browse" onClick={onEditKids}>
          Edit Kids
        </button>
      </div>

      {showLogout && (
        <div style={{ marginTop: 40 }}>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: "10px 16px",
              background: "white",
              fontSize: 13
            }}
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export { ProfileView };

