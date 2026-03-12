import { useState, useEffect } from "react";
import { ALL_NEIGHBORHOODS, AVATARS } from "../../constants";

export function AboutYouScreen({ onNext, onBack, profile, setProfile }) {
  return (
    <div className="ob-screen" style={{ background: "var(--cream)" }}>
      <div className="ob-card">
        <button className="ob-back" onClick={onBack}>← Back</button>
        <div className="ob-progress">
          <div className="ob-progress-dot done" />
          <div className="ob-progress-dot active" />
          <div className="ob-progress-dot" />
        </div>
        <div className="ob-step-label">Step 1 of 2</div>
        <div className="ob-title">Hey there! <em>Tell us about you.</em></div>
        <div className="ob-subtitle">Just the basics — this is how other Portland parents will see you.</div>

        <div className="ob-field">
          <label className="ob-label">Your first name</label>
          <input className="ob-input" placeholder="e.g. Sarah" value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
        </div>

        <div className="ob-field">
          <label className="ob-label">Your area & neighborhood</label>
          <select className="ob-select" value={profile.hood}
            onChange={e => setProfile(p => ({ ...p, hood: e.target.value }))}>
            <option value="">Select your neighborhood…</option>
            {Object.entries(ALL_NEIGHBORHOODS).map(([town, hoods]) => (
              <optgroup key={town} label={`— ${town} —`}>
                {hoods.map(h => <option key={h} value={h}>{h}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="ob-field">
          <label className="ob-label">Pick your avatar</label>
          <div className="avatar-grid">
            {AVATARS.map(a => (
              <button key={a} className={`avatar-option ${profile.avatar === a ? "selected" : ""}`}
                onClick={() => setProfile(p => ({ ...p, avatar: a }))}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <button className="ob-btn-primary" disabled={!profile.name || !profile.hood || !profile.avatar}
          onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}

