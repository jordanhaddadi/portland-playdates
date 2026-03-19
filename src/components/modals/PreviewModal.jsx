export function PreviewModal({ showPreviewModal, setShowPreviewModal, handleShare, topbarCopied }) {
  if (!showPreviewModal) return null;

  return (
    <div className="modal-overlay"
      onClick={() => setShowPreviewModal(false)}>
      <div className="preview-modal"
        onClick={e => e.stopPropagation()}>
        <span className="preview-modal-emoji">⚓</span>
        <div className="preview-modal-title">
          Welcome to Beta!
        </div>
        <div className="preview-modal-sub">
          Portland PlayDates is officially live. Real profiles,
          real playdates, real neighbors. Your village starts here.
        </div>
        <div className="preview-modal-pills">
          {[
            { icon:"📅", text:"First playdate is live", sub:"Littles & Lattes at Salud, March 28" },
            { icon:"🛝", text:"Find your people", sub:"Browse families in your neighborhood" },
            { icon:"🌟", text:"Host your own", sub:"Create a playdate and bring parents together" },
          ].map(p => (
            <div key={p.text} className="preview-modal-pill">
              <span className="preview-modal-pill-icon">{p.icon}</span>
              <div>
                <div>{p.text}</div>
                <div className="preview-modal-pill-sub">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="ob-btn-primary"
          onClick={() => setShowPreviewModal(false)}
        >
          Let's go! ⚓
        </button>
        <div className="preview-modal-share">
          <div className="preview-modal-share-text">
            Know a Portland parent who needs their village?
            Share Portland PlayDates with one friend.
          </div>
          <button
            className="preview-modal-share-btn"
            onClick={handleShare}
          >
            {topbarCopied ? "Link copied!" : "Share Portland PlayDates"}
          </button>
        </div>
      </div>
    </div>
  );
}