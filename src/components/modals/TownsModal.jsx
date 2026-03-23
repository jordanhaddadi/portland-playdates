import { TOWNS_NEARBY } from "../../constants";

export function TownsModal({ showTowns, setShowTowns, activeTowns, toggleTown, setActiveTowns }) {
  if (!showTowns) return null;
  const allTownIds = ["portland", ...TOWNS_NEARBY.map(t => t.id)];
  const allSelected = allTownIds.every(id => activeTowns.includes(id));

  return (
    <div className="modal-overlay" onClick={() => setShowTowns(false)}>
      <div className="towns-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="towns-modal-scroll">
          <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:500,marginBottom:6}}>Your area ⚓</div>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:4}}>Select all the towns you want to see playdates from.</div>
          <div className="towns-select-all-row">
            <button
              className="towns-select-btn"
              onClick={() => setActiveTowns(allTownIds)}
              disabled={allSelected}
            >
              Select all
            </button>
            <button
              className="towns-select-btn"
              onClick={() => setActiveTowns(["portland"])}
              disabled={activeTowns.length <= 1}
            >
              Clear all
            </button>
          </div>

          <div className="towns-section-label">Portland</div>
          <div className="towns-grid">
            <button className={`town-btn ${activeTowns.includes("portland")?"active":""}`}
              onClick={() => toggleTown("portland")}>
              <span>📍 Portland</span>
              <span className="town-distance">City neighborhoods</span>
            </button>
          </div>

          <div className="towns-section-label">Nearby Towns</div>
          <div className="towns-grid">
            {TOWNS_NEARBY.map(t => (
              <button key={t.id} className={`town-btn ${activeTowns.includes(t.id)?"active":""}`}
                onClick={() => toggleTown(t.id)}>
                <span>{t.name}</span>
                <span className="town-distance">{t.dist} · {t.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="towns-modal-footer">
          <div className="towns-modal-summary">
            🗺️ <strong>{activeTowns.length} area{activeTowns.length!==1?"s":""} selected.</strong> Playdates from all selected towns will appear in your feed and on the map.
          </div>

          <button className="ob-btn-primary towns-modal-save" onClick={() => setShowTowns(false)}>
            Save · Show me playdates →
          </button>
        </div>
      </div>
    </div>
  );
}

