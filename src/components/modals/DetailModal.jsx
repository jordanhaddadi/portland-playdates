export function DetailModal({ showDetail, setShowDetail, joined, setJoined }) {
  if (!showDetail) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowDetail(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="detail-img" style={{background:showDetail.bg}}>{showDetail.emoji}</div>
        <div className="card-tags" style={{marginBottom:10}}>
          <span className="tag tag-age">👶 {showDetail.ages}</span>
          <span className="tag tag-venue">📍 {showDetail.hood}</span>
        </div>
        <div className="detail-title">{showDetail.title}</div>
        <div className="detail-host">Hosted by {showDetail.host}</div>
        <div className="detail-row"><span className="detail-icon">🕐</span><span>{showDetail.date}</span></div>
        <div className="detail-row"><span className="detail-icon">📍</span><div><div>{showDetail.venue}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{showDetail.addr}</div></div></div>
        <div className="detail-row"><span className="detail-icon">🌤</span><span>{showDetail.weather}</span></div>
        <div className="detail-row"><span className="detail-icon">💬</span><span>{showDetail.description}</span></div>
        <div className="detail-row"><span className="detail-icon">👥</span><div><div>{showDetail.count} Portland parents going</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Public meetup · Kid-friendly venue</div></div></div>
        <button className={`rsvp-btn ${joined[showDetail.id]?"going":""}`}
          onClick={() => { setJoined(j=>({...j,[showDetail.id]:!j[showDetail.id]})); setShowDetail(null); }}>
          {joined[showDetail.id]?"✓ You're Going! 🎉":"RSVP — I'm In! 🙌"}
        </button>
      </div>
    </div>
  );
}

