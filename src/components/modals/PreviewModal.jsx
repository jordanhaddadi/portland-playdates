import { useState } from "react";

export function PreviewModal({ showPreviewModal, setShowPreviewModal }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Portland PlayDates",
      text: "Find your village in Greater Portland. Join the beta!",
      url: "https://www.portlandplaydates.com",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // user cancelled, do nothing
      }
    } else {
      navigator.clipboard.writeText("https://www.portlandplaydates.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!showPreviewModal) return null;

  return (
    <div className="modal-overlay"
      onClick={() => setShowPreviewModal(false)}>
      <div className="preview-modal"
        onClick={e => e.stopPropagation()}>
        <span className="preview-modal-emoji">👀</span>
        <div className="preview-modal-title">
          You're previewing<br />PlayDates
        </div>
        <div className="preview-modal-sub">
          Poke around and get a feel for what's coming
          to Portland this spring. Everything here is
          a preview — playdates are not live yet.
        </div>
        <div className="preview-modal-pills">
          {[
            { icon:"🗺️", text:"Browse the map", sub:"See where playdates will happen" },
            { icon:"🛝", text:"Explore venues", sub:"Parks, libraries, and cafés near you" },
            { icon:"📅", text:"Host a playdate", sub:"Try creating one to see how it works" },
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
          Let's explore 🌊
        </button>
        <div className="preview-modal-share">
          <div className="preview-modal-share-text">
            Invite 3 parent friends so there are more families
            in your neighborhood when we launch.
          </div>
          <button
            className="preview-modal-share-btn"
            onClick={handleShare}
          >
            {copied ? "Link copied!" : "Share Portland PlayDates"}
          </button>
        </div>
      </div>
    </div>
  );
}

