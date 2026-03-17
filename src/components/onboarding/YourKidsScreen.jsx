import { useState, useEffect } from "react";
import { KID_EMOJIS } from "../../constants";

export function YourKidsScreen({
  onDone,
  onBack,
  profile,
  kids,
  setKids,
  isEditingKids,
  onSaveKids,
}) {
  const [showForm, setShowForm] = useState(false);
  const [newKid, setNewKid] = useState({ name: "", age: "", emoji: "🧒" });

  const saveKid = () => {
    if (newKid.name && newKid.age) {
      setKids(k => [...k, { ...newKid, id: Date.now() }]);
      setNewKid({ name: "", age: "", emoji: "🧒" });
      setShowForm(false);
    }
  };

  return (
    <div className="ob-screen" style={{ background: "var(--cream)" }}>
      <div className="ob-card">
        <button className="ob-back" onClick={onBack}>← Back</button>
        <div className="ob-progress">
          <div className="ob-progress-dot done" />
          <div className="ob-progress-dot done" />
          <div className="ob-progress-dot active" />
        </div>
        <div className="ob-step-label">Step 2 of 2</div>
        <div className="ob-title">Your <em>little ones.</em></div>
        <div className="ob-subtitle">Add your kids so we can match you with the right playdates. You can always edit this later.</div>

        {/* Existing kids */}
        {kids.map(k => (
          <div key={k.id} className="kid-card">
            <div className="kid-avatar" style={{ background: "var(--ocean-pale)" }}>{k.emoji}</div>
            <div className="kid-info">
              <div className="kid-name">{k.name}</div>
              <div className="kid-age">{k.age} old</div>
            </div>
            <button className="kid-remove" onClick={() => setKids(ks => ks.filter(x => x.id !== k.id))}>✕</button>
          </div>
        ))}

        {/* Add kid form */}
        {showForm ? (
          <div className="add-kid-form">
            <div className="ob-label" style={{ marginBottom: 10 }}>Pick an emoji</div>
            <div className="kid-emoji-row">
              {KID_EMOJIS.map(e => (
                <button key={e} className={`kid-emoji-opt ${newKid.emoji === e ? "selected" : ""}`}
                  onClick={() => setNewKid(k => ({ ...k, emoji: e }))}>{e}</button>
              ))}
            </div>
            <div className="add-kid-form-row">
              <div>
                <div className="ob-label">Nickname</div>
                <input className="ob-input" style={{ fontSize: 14, padding: "10px 12px" }} placeholder="e.g. Lily"
                  value={newKid.name} onChange={e => setNewKid(k => ({ ...k, name: e.target.value }))} />
              </div>
              <div>
                <div className="ob-label">Age</div>
                <select className="ob-select" style={{ fontSize: 14, padding: "10px 12px" }}
                  value={newKid.age} onChange={e => setNewKid(k => ({ ...k, age: e.target.value }))}>
                  <option value="">Age…</option>
                  {["0–6 mo","6–12 mo","1 yr","2 yrs","3 yrs","4 yrs","5 yrs","6 yrs","7 yrs","8 yrs","9 yrs","10 yrs"].map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row-btns">
              <button className="cancel-kid-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="save-kid-btn" disabled={!newKid.name || !newKid.age} onClick={saveKid}>Save Kid ✓</button>
            </div>
          </div>
        ) : (
          <button className="add-kid-btn" onClick={() => setShowForm(true)}>＋ Add a child</button>
        )}

        <div style={{ marginTop: "auto" }}>
          {kids.length === 0 && (
            <div style={{ textAlign: "center", padding: "12px 0 20px", fontSize: 13, color: "var(--muted)" }}>
              You can skip this and add kids later from your profile.
            </div>
          )}
          <button
            className="ob-btn-primary"
            onClick={isEditingKids ? onSaveKids : onDone}
          >
            {isEditingKids
              ? (kids.length > 0 ? "Save kids" : "Save and continue")
              : (kids.length > 0 ? `Let's find playdates! 🎉` : "Skip for now →")}
          </button>
        </div>
      </div>
    </div>
  );
}

