import { useState, useEffect } from "react";

export function WelcomeScreen({ onNext }) {
  return (
    <div className="ob-screen ob-welcome">
      <div className="ob-blob1" /><div className="ob-blob2" /><div className="ob-blob3" />
      <div className="ob-welcome-art">
        <div className="ob-welcome-logo">
          <div className="ob-welcome-anchor">⚓</div>
          <div className="ob-welcome-city">Portland, Maine</div>
          <div className="ob-welcome-name">PlayDates <span className="beta-badge beta-badge-onboarding">Beta</span></div>
          <div className="ob-welcome-tagline">Find your kids'<br />people in Portland</div>
        </div>
      </div>
      <div className="ob-welcome-bottom">
        <h3>Real playdates,<br />real communities.</h3>
        <p>Meet Portland parents at parks, cafés, and libraries — with kids the same age as yours. Surrounding communities welcome too.</p>

        {/* PUBLIC SPACES ONLY TRUST BANNER */}
        <div className="safety-banner">
          <div className="safety-banner-glow" />
          <div className="safety-banner-top">
            <div className="safety-shield">🛡️</div>
            <div className="safety-banner-title">
              <span>Public spaces only.</span><br />Always.
            </div>
          </div>
          <div className="safety-pillars">
            {[
              "Every playdate meets at a park, library, or café — never private homes",
              "Phone-verified parents only — real people, real community",
              "Greater Portland parents vouching for each other",
            ].map(p => (
              <div key={p} className="safety-pillar">
                <div className="safety-pillar-dot" />
                {p}
              </div>
            ))}
          </div>
          <div className="safety-pledge">
            Our promise to every Greater Portland family ⚓
          </div>
        </div>

        <div className="ob-features">
          {[
            { icon:"🗺️", bg:"#EAF3F8", text:"Portland & beyond", sub:"The city + surrounding communities" },
            { icon:"👶", bg:"#FDF0E8", text:"Age-matched", sub:"Find kids the same age as yours" },
            { icon:"📱", bg:"#EEF4EF", text:"Verified parents", sub:"Phone number required" },
          ].map(f => (
            <div key={f.text} className="ob-feature">
              <div className="ob-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div>
                <div className="ob-feature-text">{f.text}</div>
                <div className="ob-feature-sub">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="ob-btn-primary" onClick={onNext}>Join the Beta →</button>
      </div>
    </div>
  );
}

