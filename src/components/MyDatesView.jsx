export function MyDatesView({
  tab,
  setTab,
  goingDates,
  hostingDates,
  onOpenDetail,
  onBrowsePlaydates,
  onHostOne,
  onCancelGoing,
  onRemoveHosting,
}) {
  const goingCount = goingDates.length;
  const hostingCount = hostingDates.length;

  const activeDates = tab === "going" ? goingDates : hostingDates;
  const emptyEmoji = tab === "going" ? "🌳" : "🌟";
  const emptyTitle = tab === "going" ? "No playdates yet!" : "You have not hosted yet!";
  const emptySub =
    tab === "going"
      ? "Browse nearby playdates and tap Join to save them here."
      : "Ready to bring Portland parents together?";
  const sectionLabel = tab === "going" ? "Your upcoming playdates" : "Playdates you are hosting";

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
            <div key={pd.id} className="date-row" onClick={() => onOpenDetail(pd)}>
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
              ) : (
                <button className="ghost-btn" onClick={e => { e.stopPropagation(); onRemoveHosting(pd.id); }}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
