import React from "react";
import { ALL_NEIGHBORHOODS, AVATARS, SKIN_TONES, TOWNS_NEARBY } from "../../constants";

const TOWN_OPTIONS = [
  { name: "Portland" },
  ...TOWNS_NEARBY.filter(t => t.id !== "gorham"),
];

export function AboutYouScreen({
  onNext,
  onBack,
  profile,
  setProfile,
  isEditingProfile,
  onSaveProfile,
}) {
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
        <div className="ob-subtitle">Just the basics. This is how other Portland parents will see you.</div>

        <div className="ob-field">
          <label className="ob-label">Your first name</label>
          <input className="ob-input" placeholder="e.g. Sarah" value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
        </div>

        <div className="ob-field">
          <label className="ob-label">Your town</label>
          <div className="town-chips">
            {TOWN_OPTIONS.map(t => (
              <button
                key={t.id || t.name}
                type="button"
                className={`town-chip ${profile.town === t.name ? "active" : ""}`}
                onClick={() => setProfile(p => ({ ...p, town: t.name, hood: "" }))}
              >
                {t.name}
              </button>
            ))}
          </div>
          {profile.town === "Portland" && (
            <div className="hood-picker-wrap">
              <span className="hood-select-label">
                Neighborhood (optional)
              </span>
              <div className="town-chips">
                {(ALL_NEIGHBORHOODS["Portland"] || []).map(hood => (
                  <button
                    key={hood}
                    type="button"
                    className={
                      "town-chip town-chip-sm" +
                      (profile.hood === hood ? " active" : "")
                    }
                    onClick={() =>
                      setProfile(p => ({
                        ...p,
                        hood: profile.hood === hood ? "" : hood,
                      }))
                    }
                  >
                    {hood}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ob-field">
          <label className="ob-label">Pick your avatar</label>
          <div className="avatar-grid">
            {AVATARS.map(a => (
              <button key={a} className={`avatar-option ${profile.avatar === a ? "selected" : ""}`}
                onClick={() => setProfile(p => ({ ...p, avatar: a }))}>
                {a + (profile.tone || "")}
              </button>
            ))}
          </div>
          {profile.avatar && (
            <div className="tone-picker-wrap">
              <span className="tone-picker-label">
                Pick your skin tone
              </span>
              <div className="tone-picker-row">
                {SKIN_TONES.map(tone => (
                  <button
                    key={tone.label}
                    type="button"
                    className={
                      "tone-dot" +
                      (profile.tone === tone.modifier ? " active" : "")
                    }
                    onClick={() =>
                      setProfile(p => ({ ...p, tone: tone.modifier }))
                    }
                    aria-label={tone.label}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="ob-btn-primary"
          disabled={!profile.name || !profile.town || !profile.avatar}
          onClick={isEditingProfile ? onSaveProfile : onNext}
        >
          {isEditingProfile ? "Save changes" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

