function isPast(pd) {
  if (!pd.dateStr) return false;
  const d = new Date(`${pd.dateStr}T12:00:00`);
  return d < new Date();
}

export function MyDatesView({
  tab,
  setTab,
  goingDates,
  hostingDates,
  pastDates,
  onOpenDetail,
  onBrowsePlaydates,
  onHostOne,
  onCancelGoing,
  onRemoveHosting,
}) {
  const goingCount = goingDates.length;
  const hostingCount = hostingDates.length;
  const pastCount = pastDates.length;

  const activeDates =
    tab === "going"
      ? goingDates
      : tab === "hosting"
        ? hostingDates
        : pastDates;

  const emptyEmoji =
    tab === "going" ? "🌳" : tab === "hosting" ? "🌟" : "📜";
  const emptyTitle =
    tab === "going"
      ? "No upcoming playdates"
      : tab === "hosting"
        ? "You have not hosted yet!"
        : "No past playdates yet";
  const emptySub =
    tab === "going"
      ? "When you join a playdate it will show up here. Check the Past tab to see your history."
      : tab === "hosting"
        ? "Ready to bring Portland parents together?"
        : "Playdates you joined or hosted will show here after they happen.";
  const sectionLabel =
    tab === "going"
      ? "Your upcoming playdates"
      : tab === "hosting"
        ? "Playdates you are hosting"
        : "Past playdates";

  return (
    <>
      <div className="dates-tabs">
        <div className="dates-tabs-inner">
          <button className={`dates-tab ${tab === "going" ? "active" : ""}`} onClick={() => setTab("going")}>
            Going <span className="dates-count">({goingCount})</span>
          </button>
          <button className={`dates-tab ${tab === "hosting" ? "active" : ""}`} onClick={() => setTab("hosting")}>
            Hosting <span className="dates-count">({hostingCount})</span>
          </button>
          <button className={`dates-tab ${tab === "past" ? "active" : ""}`} onClick={() => setTab("past")}>
            Past <span className="dates-count">({pastCount})</span>
          </button>
        </div>
      </div>

      {activeDates.length === 0 ? (
        <div className="dates-empty">
          <div className="dates-empty-emoji">{emptyEmoji}</div>
          <div className="dates-empty-title">{emptyTitle}</div>
          <div className="dates-empty-sub">{emptySub}</div>
          <div className="dates-empty-actions">
            <button className="pill-cta browse" onClick={onBrowsePlaydates}>Browse Playdates</button>
            <button className="pill-cta host" onClick={onHostOne}>Host One</button>
          </div>
        </div>
      ) : (
        <div className="dates-section">
          <div className="section-title" style={{ marginBottom: 12 }}>{sectionLabel}</div>
          {activeDates.map(pd => (
            <div
              key={pd.id}
              className="date-row"
              onClick={() => onOpenDetail(pd)}
              style={{
                ...(tab === "hosting" && isPast(pd) ? { opacity: 0.5 } : {}),
                ...(tab === "past" ? { opacity: 0.6 } : {}),
              }}
            >
              <div className="date-emoji" style={{ background: pd.bg }}>{pd.emoji}</div>
              <div className="date-mid">
                <div className="date-title">{pd.title}</div>
                <div className="date-meta">{pd.date}</div>
                <div className="date-venue">{pd.venue}</div>
              </div>
              {tab === "going" ? (
                <button className="ghost-btn" onClick={e => { e.stopPropagation(); onCancelGoing(pd.id); }}>
                  Cancel
                </button>
              ) : tab === "hosting" ? (
                isPast(pd) ? (
                  <span className="dates-happened-label">
                    Happened
                  </span>
                ) : (
                  <button className="ghost-btn" onClick={e => { e.stopPropagation(); onRemoveHosting(pd.id); }}>
                    Remove
                  </button>
                )
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
