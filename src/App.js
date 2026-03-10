import { useState } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONT}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FDF8F2;
    --warm-white: #FEFCF9;
    --ocean: #2A5F7A;
    --ocean-light: #A8CADB;
    --ocean-pale: #EAF3F8;
    --terracotta: #C4583A;
    --terracotta-light: #EDB99E;
    --terracotta-pale: #FDF0E8;
    --sage: #6B9E6F;
    --sage-light: #BDD4BE;
    --charcoal: #1E2B2F;
    --muted: #7A8C90;
    --border: #E4ECF0;
  }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--charcoal); min-height: 100vh; }
  .app { max-width: 420px; margin: 0 auto; background: var(--cream); min-height: 100vh; position: relative; overflow: hidden; }

  /* ── ONBOARDING ── */
  .ob-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    animation: obFadeIn 0.4s ease;
  }
  @keyframes obFadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* WELCOME */
  .ob-welcome {
    background: var(--charcoal);
    position: relative;
    overflow: hidden;
  }
  .ob-welcome-art {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 40px 40px;
    position: relative;
    z-index: 1;
  }
  .ob-blob1 { position: absolute; top: -60px; right: -60px; width: 240px; height: 240px; background: radial-gradient(circle, var(--terracotta) 0%, transparent 65%); opacity: 0.25; border-radius: 50%; }
  .ob-blob2 { position: absolute; bottom: 40px; left: -40px; width: 180px; height: 180px; background: radial-gradient(circle, var(--ocean) 0%, transparent 65%); opacity: 0.3; border-radius: 50%; }
  .ob-blob3 { position: absolute; top: 50%; left: 50%; width: 120px; height: 120px; background: radial-gradient(circle, var(--sage) 0%, transparent 65%); opacity: 0.2; border-radius: 50%; transform: translate(-50%,-50%); }
  .ob-welcome-logo { text-align: center; }
  .ob-welcome-city { font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ocean-light); margin-bottom: 8px; }
  .ob-welcome-name { font-family: 'Fraunces', serif; font-size: 52px; font-weight: 700; color: white; letter-spacing: -1px; line-height: 1; margin-bottom: 4px; }
  .ob-welcome-name span { color: var(--terracotta-light); }
  .ob-welcome-anchor { font-size: 32px; margin-bottom: 20px; }
  .ob-welcome-tagline { font-family: 'Fraunces', serif; font-size: 18px; font-style: italic; color: rgba(255,255,255,0.6); line-height: 1.4; }
  .ob-welcome-bottom {
    background: var(--cream);
    border-radius: 32px 32px 0 0;
    padding: 32px 28px 48px;
    position: relative;
    z-index: 1;
  }
  .ob-welcome-bottom h3 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500; margin-bottom: 8px; color: var(--charcoal); }
  .ob-welcome-bottom p { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 28px; }
  .ob-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .ob-feature { display: flex; align-items: center; gap: 12px; }
  .ob-feature-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .ob-feature-text { font-size: 14px; color: var(--charcoal); font-weight: 500; }
  .ob-feature-sub { font-size: 12px; color: var(--muted); }

  /* SAFETY BANNER */
  .safety-banner {
    background: linear-gradient(135deg, #1A3A2A, #0F2820);
    border-radius: 18px;
    padding: 18px 18px 16px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .safety-banner-glow {
    position: absolute;
    top: -20px; right: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(107,158,111,0.4) 0%, transparent 70%);
    border-radius: 50%;
  }
  .safety-banner-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .safety-shield {
    width: 34px; height: 34px;
    background: rgba(107,158,111,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .safety-banner-title {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 500;
    color: white;
    line-height: 1.2;
  }
  .safety-banner-title span {
    color: #8FD4A0;
  }
  .safety-pillars {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .safety-pillar {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255,255,255,0.75);
  }
  .safety-pillar-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #8FD4A0;
    flex-shrink: 0;
  }
  .safety-pledge {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    text-align: center;
    letter-spacing: 0.3px;
  }

  /* PROGRESS BAR */
  .ob-progress { display: flex; gap: 6px; padding: 0 28px; margin-bottom: 28px; }
  .ob-progress-dot { flex: 1; height: 4px; border-radius: 100px; background: var(--border); transition: background 0.3s; }
  .ob-progress-dot.done { background: var(--terracotta); }
  .ob-progress-dot.active { background: var(--ocean); }

  /* SHARED ONBOARDING CARD STYLES */
  .ob-card { flex: 1; display: flex; flex-direction: column; padding: 56px 28px 40px; }
  .ob-back { background: none; border: none; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; margin-bottom: 32px; padding: 0; }
  .ob-step-label { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--terracotta); margin-bottom: 8px; }
  .ob-title { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 500; color: var(--charcoal); line-height: 1.2; margin-bottom: 8px; }
  .ob-title em { font-style: italic; color: var(--ocean); }
  .ob-subtitle { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 32px; }

  /* AVATAR PICKER */
  .avatar-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 24px; }
  .avatar-option { width: 100%; aspect-ratio: 1; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; border: 2.5px solid var(--border); background: white; transition: all 0.15s; }
  .avatar-option.selected { border-color: var(--ocean); background: var(--ocean-pale); transform: scale(1.08); }

  /* FORM FIELDS */
  .ob-field { margin-bottom: 18px; }
  .ob-label { font-size: 11px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; display: block; }
  .ob-input { width: 100%; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--charcoal); outline: none; transition: border-color 0.15s; }
  .ob-input:focus { border-color: var(--ocean); }
  .ob-select { width: 100%; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--charcoal); outline: none; appearance: none; cursor: pointer; }
  .ob-select:focus { border-color: var(--ocean); }

  /* KIDS */
  .kid-card { background: white; border-radius: 18px; border: 1.5px solid var(--border); padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 14px; animation: obFadeIn 0.3s ease; }
  .kid-avatar { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .kid-info { flex: 1; }
  .kid-name { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 500; color: var(--charcoal); }
  .kid-age { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .kid-remove { background: none; border: none; cursor: pointer; font-size: 18px; color: var(--muted); padding: 4px; }

  .add-kid-btn { width: 100%; background: white; border: 2px dashed var(--border); border-radius: 18px; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: var(--ocean); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s; margin-bottom: 12px; }
  .add-kid-btn:hover { border-color: var(--ocean); background: var(--ocean-pale); }

  .add-kid-form { background: white; border-radius: 18px; border: 1.5px solid var(--ocean); padding: 16px; margin-bottom: 12px; animation: obFadeIn 0.25s ease; }
  .add-kid-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .kid-emoji-row { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
  .kid-emoji-opt { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; border: 2px solid var(--border); background: white; transition: all 0.15s; }
  .kid-emoji-opt.selected { border-color: var(--ocean); background: var(--ocean-pale); transform: scale(1.1); }
  .form-row-btns { display: flex; gap: 8px; }
  .save-kid-btn { flex: 1; background: var(--ocean); color: white; border: none; border-radius: 12px; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; }
  .cancel-kid-btn { background: var(--border); color: var(--muted); border: none; border-radius: 12px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; }

  /* PRIMARY BUTTON */
  .ob-btn-primary { width: 100%; background: var(--charcoal); color: white; border: none; border-radius: 18px; padding: 18px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.15s, transform 0.1s; margin-top: auto; }
  .ob-btn-primary:hover { background: var(--terracotta); transform: scale(1.01); }
  .ob-btn-primary:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; transform: none; }

  /* ── MAIN APP ── */
  .topbar { padding: 52px 24px 14px; background: var(--cream); position: sticky; top: 0; z-index: 10; }
  .topbar-inner { display: flex; align-items: center; justify-content: space-between; }
  .logo-city { font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--ocean); margin-bottom: 2px; }
  .logo-name { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--charcoal); letter-spacing: -0.5px; }
  .logo-name span { color: var(--terracotta); }
  .user-avatar-btn { width: 42px; height: 42px; border-radius: 50%; border: 2.5px solid var(--ocean-light); background: var(--ocean-pale); cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; }

  /* PERSONALIZED GREETING */
  .greeting-bar { margin: 0 24px 18px; background: white; border-radius: 18px; border: 1.5px solid var(--border); padding: 14px 18px; display: flex; align-items: center; gap: 14px; }
  .greeting-avatar { width: 44px; height: 44px; border-radius: 14px; background: var(--ocean-pale); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .greeting-text { flex: 1; }
  .greeting-name { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 500; color: var(--charcoal); }
  .greeting-kids { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .greeting-edit { font-size: 12px; color: var(--ocean); font-weight: 500; cursor: pointer; background: none; border: none; }

  .view-toggle { display: flex; margin: 0 24px 18px; background: white; border-radius: 14px; border: 1.5px solid var(--border); overflow: hidden; }
  .toggle-btn { flex: 1; padding: 10px; border: none; background: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--muted); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.18s; }
  .toggle-btn.active { background: var(--charcoal); color: white; border-radius: 11px; margin: 3px; }

  .map-container { position: relative; margin: 0 24px; border-radius: 24px; overflow: hidden; border: 1.5px solid var(--border); background: #D4E8EF; height: 340px; }
  .map-svg { width: 100%; height: 100%; }
  .map-pin { cursor: pointer; }
  .pin-bubble { filter: drop-shadow(0 3px 8px rgba(30,43,47,0.25)); }
  .pin-pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:0.6; transform:scale(1); } 50% { opacity:0.2; transform:scale(1.5); } }
  .map-card-peek { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px; background: linear-gradient(transparent, rgba(212,232,239,0.3) 20%, #D4E8EF 40%); }
  .peek-card { background: white; border-radius: 18px; padding: 14px 16px; border: 1.5px solid var(--border); box-shadow: 0 4px 20px rgba(30,43,47,0.12); cursor: pointer; animation: slideUpCard 0.25s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes slideUpCard { from { transform:translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
  .peek-row { display: flex; align-items: center; gap: 12px; }
  .peek-emoji { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .peek-title { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 500; color: var(--charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .peek-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .peek-join { background: var(--terracotta); color: white; border: none; border-radius: 100px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; flex-shrink: 0; }
  .peek-join.joined { background: var(--sage); }
  .map-count-badge { position: absolute; top: 14px; left: 14px; background: white; border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 600; color: var(--charcoal); box-shadow: 0 2px 10px rgba(30,43,47,0.15); }
  .map-legend { display: flex; gap: 10px; padding: 12px 24px 0; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); font-weight: 500; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }

  .location-bar { padding: 0 24px 16px; }
  .location-pill { display: inline-flex; align-items: center; gap: 6px; background: var(--ocean-pale); border: 1.5px solid var(--ocean-light); border-radius: 100px; padding: 6px 14px; font-size: 13px; font-weight: 500; color: var(--ocean); cursor: pointer; }
  .weather-banner { margin: 0 24px 18px; background: var(--ocean-pale); border: 1.5px solid var(--ocean-light); border-radius: 16px; padding: 11px 16px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ocean); }
  .hero { margin: 0 24px 24px; background: var(--charcoal); border-radius: 24px; padding: 24px 28px 22px; position: relative; overflow: hidden; }
  .hero-wave { position: absolute; bottom: 0; right: 0; width: 180px; height: 100px; background: radial-gradient(ellipse at bottom right, var(--ocean) 0%, transparent 65%); opacity: 0.4; }
  .hero-blob { position: absolute; top: -20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, var(--terracotta) 0%, transparent 70%); opacity: 0.3; border-radius: 50%; }
  .hero-label { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ocean-light); margin-bottom: 8px; }
  .hero h2 { font-family: 'Fraunces', serif; font-size: 25px; font-weight: 500; color: white; line-height: 1.25; margin-bottom: 6px; position: relative; z-index: 1; }
  .hero h2 em { font-style: italic; color: var(--terracotta-light); }
  .hero-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 18px; position: relative; z-index: 1; }
  .hero-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--terracotta); color: white; border: none; border-radius: 100px; padding: 11px 20px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; position: relative; z-index: 1; transition: transform 0.15s; }
  .hero-cta:hover { transform: scale(1.03); }
  .hood-row { display: flex; gap: 8px; padding: 0 24px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none; }
  .hood-row::-webkit-scrollbar { display: none; }
  .hood-chip { flex-shrink: 0; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--border); background: white; color: var(--muted); transition: all 0.15s; }
  .hood-chip.active { background: var(--ocean); color: white; border-color: var(--ocean); }

  /* TOWNS MODAL */
  .towns-modal { width: 100%; max-width: 420px; background: var(--warm-white); border-radius: 28px 28px 0 0; padding: 12px 24px 48px; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); max-height: 82vh; overflow-y: auto; }
  .towns-section-label { font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--muted); margin: 16px 0 10px; }
  .towns-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px; }
  .town-btn { padding: 12px 14px; border-radius: 14px; border: 1.5px solid var(--border); background: white; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--charcoal); cursor: pointer; text-align: left; display: flex; flex-direction: column; transition: all 0.15s; }
  .town-btn:hover { border-color: var(--ocean); background: var(--ocean-pale); }
  .town-btn.active { border-color: var(--ocean); background: var(--ocean-pale); color: var(--ocean); }
  .town-distance { font-size: 11px; color: var(--muted); margin-top: 2px; font-weight: 400; }
  .town-btn.active .town-distance { color: var(--ocean-light); }

  /* ADD VENUE FORM */
  .add-venue-trigger { width: 100%; background: white; border: 2px dashed var(--ocean-light); border-radius: 14px; padding: 13px 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--ocean); cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.15s; margin-top: 8px; }
  .add-venue-trigger:hover { border-color: var(--ocean); background: var(--ocean-pale); }
  .add-venue-form { background: var(--ocean-pale); border: 1.5px solid var(--ocean-light); border-radius: 16px; padding: 16px; margin-top: 8px; animation: obFadeIn 0.25s ease; }
  .venue-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; margin-bottom: 12px; }
  .venue-type-btn { padding: 9px 6px; border-radius: 11px; border: 1.5px solid var(--ocean-light); background: white; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; cursor: pointer; text-align: center; color: var(--muted); transition: all 0.15s; display: flex; flex-direction: column; align-items: center; gap: 3px; }
  .venue-type-btn.selected { background: var(--ocean); color: white; border-color: var(--ocean); }
  .venue-perks { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; }
  .perk-chip { padding: 6px 12px; border-radius: 100px; border: 1.5px solid var(--ocean-light); background: white; font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--muted); cursor: pointer; transition: all 0.15s; }
  .perk-chip.selected { background: var(--ocean); color: white; border-color: var(--ocean); }
  .pending-badge { display: inline-flex; align-items: center; gap: 4px; background: #FFF8E8; border: 1px solid #F0C84A; border-radius: 100px; padding: 2px 8px; font-size: 10px; font-weight: 600; color: #9A7000; }
  .save-venue-btn { width: 100%; background: var(--ocean); color: white; border: none; border-radius: 12px; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; }
  .save-venue-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; }

  .section-header { display: flex; align-items: center; justify-content: space-between; padding: 0 24px; margin-bottom: 12px; }
  .section-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 500; }
  .see-all { font-size: 13px; font-weight: 500; color: var(--terracotta); cursor: pointer; background: none; border: none; }
  .cards { padding: 0 24px; display: flex; flex-direction: column; gap: 13px; margin-bottom: 100px; }
  .card { background: white; border-radius: 20px; overflow: hidden; border: 1.5px solid var(--border); cursor: pointer; transition: transform 0.18s, box-shadow 0.18s; }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(30,43,47,0.1); }
  .card-img { width: 100%; height: 110px; display: flex; align-items: center; justify-content: center; font-size: 42px; position: relative; }
  .card-weather { position: absolute; top: 10px; right: 12px; background: rgba(255,255,255,0.9); border-radius: 100px; padding: 3px 10px; font-size: 11px; font-weight: 500; }
  .card-body { padding: 14px 17px 16px; }
  .card-tags { display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap; }
  .tag { font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 100px; }
  .tag-age { background: var(--terracotta-pale); color: var(--terracotta); }
  .tag-venue { background: var(--ocean-pale); color: var(--ocean); }
  .tag-hood { background: #EEF4EF; color: var(--sage); }
  .card h3 { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 500; color: var(--charcoal); margin-bottom: 4px; line-height: 1.3; }
  .card-meta { font-size: 12px; color: var(--muted); margin-bottom: 12px; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .attendees { display: flex; align-items: center; gap: 8px; }
  .avatar-stack { display: flex; }
  .avatar-sm { width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; margin-left: -5px; font-size: 11px; display: flex; align-items: center; justify-content: center; }
  .avatar-sm:first-child { margin-left: 0; }
  .attendee-text { font-size: 12px; color: var(--muted); }
  .join-btn { background: var(--terracotta); color: white; border: none; border-radius: 100px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
  .join-btn:hover { background: #B04830; }
  .join-btn.joined { background: var(--sage); }

  .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 420px; background: rgba(253,248,242,0.94); backdrop-filter: blur(12px); border-top: 1.5px solid var(--border); display: flex; align-items: center; padding: 12px 8px 24px; z-index: 20; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; padding: 6px; border-radius: 12px; border: none; background: none; transition: background 0.15s; }
  .nav-item:hover { background: var(--ocean-pale); }
  .nav-icon { font-size: 20px; line-height: 1; }
  .nav-label { font-size: 10px; font-weight: 500; color: var(--muted); letter-spacing: 0.3px; }
  .nav-item.active .nav-label { color: var(--ocean); }
  .add-btn { width: 52px; height: 52px; background: var(--terracotta); border-radius: 16px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; box-shadow: 0 4px 16px rgba(196,88,58,0.4); transition: transform 0.15s; margin-top: -20px; }
  .add-btn:hover { transform: scale(1.08); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(30,43,47,0.5); z-index: 50; display: flex; align-items: flex-end; justify-content: center; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
  .modal { width: 100%; max-width: 420px; background: var(--warm-white); border-radius: 28px 28px 0 0; padding: 12px 24px 48px; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); max-height: 88vh; overflow-y: auto; }
  .modal-handle { width: 40px; height: 4px; background: var(--border); border-radius: 100px; margin: 0 auto 22px; }
  .modal h2 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 500; margin-bottom: 20px; }
  .form-field { margin-bottom: 16px; }
  .form-label { font-size: 11px; font-weight: 500; letter-spacing: 0.9px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; display: block; }
  .form-input { width: 100%; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--charcoal); outline: none; transition: border-color 0.15s; }
  .form-input:focus { border-color: var(--ocean); }
  .venue-suggestions { display: flex; flex-direction: column; gap: 8px; }
  .venue-suggestion { display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 10px 14px; cursor: pointer; text-align: left; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .venue-suggestion:hover, .venue-suggestion.selected { border-color: var(--ocean); background: var(--ocean-pale); }
  .venue-emoji { font-size: 20px; }
  .venue-name { font-size: 13px; font-weight: 500; color: var(--charcoal); }
  .venue-addr { font-size: 11px; color: var(--muted); }
  .age-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
  .age-chip { padding: 10px 6px; border-radius: 12px; border: 1.5px solid var(--border); background: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; text-align: center; color: var(--muted); transition: all 0.15s; }
  .age-chip.selected { background: var(--ocean-pale); border-color: var(--ocean); color: var(--ocean); }
  .submit-btn { width: 100%; background: var(--charcoal); color: white; border: none; border-radius: 16px; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer; margin-top: 8px; transition: background 0.15s; }
  .submit-btn:hover { background: var(--terracotta); }
  .detail-img { width: 100%; height: 140px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 54px; margin-bottom: 16px; }
  .detail-title { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 500; margin-bottom: 4px; line-height: 1.2; }
  .detail-host { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
  .detail-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
  .detail-icon { font-size: 16px; margin-top: 1px; }
  .rsvp-btn { width: 100%; background: var(--terracotta); color: white; border: none; border-radius: 16px; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer; margin-top: 20px; transition: background 0.15s; }
  .rsvp-btn:hover { background: #B04830; }
  .rsvp-btn.going { background: var(--sage); }
`;

const AVATARS = ["👩","👨","👩‍🦱","👨‍🦱","👩‍🦰","👨‍🦰","👩‍🦳","👨‍🦳","🧑","👶"];
const KID_EMOJIS = ["🧒","👦","👧","🧒‍♂️","🧒‍♀️","⭐","🌟","🦊","🐻","🦁"];
const HOODS = ["All","East End","West End","Downtown","Back Cove","Bayside"];
const AGE_GROUPS = ["0–1","1–2","2–3","3–4","4–5","5–6","6–8","8–10"];
const PORTLAND_VENUES = [
  { emoji:"🌊", name:"Eastern Prom Playground", addr:"Eastern Promenade, Munjoy Hill" },
  { emoji:"🌳", name:"Deering Oaks Park", addr:"Park Ave, West End" },
  { emoji:"🛝", name:"Payson Park Playground", addr:"Baxter Blvd, Back Cove" },
  { emoji:"📚", name:"Portland Public Library", addr:"5 Monument Square, Downtown" },
  { emoji:"☕", name:"Bayside American Cafe", addr:"98 Portland St, Bayside", town:"Portland", type:"Café" },
  { emoji:"🌿", name:"Smalls Café", addr:"28 Brackett St, West End", town:"Portland", type:"Café" },
  { emoji:"🏖️", name:"Willard Beach", addr:"Shore Rd, South Portland", town:"South Portland", type:"Beach" },
  { emoji:"🌲", name:"Fort Williams Park", addr:"Shore Rd, Cape Elizabeth", town:"Cape Elizabeth", type:"Park" },
  { emoji:"🛝", name:"Mill Creek Park", addr:"Cottage Rd, South Portland", town:"South Portland", type:"Park" },
  { emoji:"📚", name:"Falmouth Memorial Library", addr:"5 Lunt Rd, Falmouth", town:"Falmouth", type:"Library" },
  { emoji:"🧁", name:"Coffee By Design", addr:"620 Congress St, Portland", town:"Portland", type:"Café" },
  { emoji:"🎨", name:"Children's Museum of Maine", addr:"142 Free St, Portland", town:"Portland", type:"Indoor" },
  { emoji:"🏖️", name:"Ferry Beach State Park", addr:"95 Bayview Rd, Saco", town:"Saco", type:"Beach" },
  { emoji:"🛝", name:"Rotary Park", addr:"Beach St, Saco", town:"Saco", type:"Park" },
  { emoji:"📚", name:"Dyer Library", addr:"371 Main St, Saco", town:"Saco", type:"Library" },
  { emoji:"🎳", name:"Funtown Splashtown", addr:"774 Portland Rd, Saco", town:"Saco", type:"Indoor" },
  { emoji:"🌊", name:"Hills Beach", addr:"Hills Beach Rd, Biddeford", town:"Biddeford", type:"Beach" },
  { emoji:"☕", name:"Element Coffee", addr:"184 Main St, Biddeford", town:"Biddeford", type:"Café" },
];

const TOWNS_NEARBY = [
  { id:"south-portland", name:"South Portland", sub:"Willard Beach, Mill Creek", dist:"~3 mi" },
  { id:"cape-elizabeth", name:"Cape Elizabeth", sub:"Fort Williams, Two Lights", dist:"~6 mi" },
  { id:"falmouth", name:"Falmouth", sub:"Mackworth Island, Town Landing", dist:"~7 mi" },
  { id:"scarborough", name:"Scarborough", sub:"Pine Point Beach, Higgins Beach", dist:"~8 mi" },
  { id:"yarmouth", name:"Yarmouth", sub:"Royal River Park, Merrill Library", dist:"~12 mi" },
  { id:"westbrook", name:"Westbrook", sub:"Walker Library, Saccarappa Park", dist:"~6 mi" },
  { id:"gorham", name:"Gorham", sub:"Village Park, Baxter Library", dist:"~14 mi" },
  { id:"saco", name:"Saco / Biddeford", sub:"Ferry Beach, Rotary Park, Dyer Library", dist:"~15 mi" },
];

const VENUE_TYPES = [
  { type:"Park", icon:"🌳" }, { type:"Beach", icon:"🏖️" }, { type:"Library", icon:"📚" },
  { type:"Café", icon:"☕" }, { type:"Indoor", icon:"🏠" }, { type:"Trail", icon:"🥾" },
];
const VENUE_PERKS = ["🚗 Free parking","🚽 Bathrooms","👶 Stroller-friendly","☕ Café nearby","🌳 Shade","🔒 Fenced","🐶 Dog-friendly"];

const ALL_NEIGHBORHOODS = {
  "Portland": ["East End","Munjoy Hill","West End","Downtown","Back Cove","Bayside","East Deering","Woodfords","Stroudwater","Parkside"],
  "South Portland": ["Knightville","Willard","Mill Creek","Pleasantdale"],
  "Cape Elizabeth": ["Cape Elizabeth Village","Spurwink","Pond Cove"],
  "Falmouth": ["Falmouth Foreside","West Falmouth"],
  "Scarborough": ["Pine Point","Higgins Beach","Oak Hill"],
  "Yarmouth": ["Yarmouth Village","Royal River"],
  "Saco": ["Saco Island","Camp Ellis","Ferry Beach","Milliken Mills"],
  "Biddeford": ["Downtown Biddeford","Hills Beach","Biddeford Pool","Guinea Road"],
};

const PLAYDATES = [
  { id:1, emoji:"🌊", bg:"linear-gradient(135deg,#EAF3F8,#C8DFE8)", title:"East End Morning Meetup", venue:"Eastern Prom Playground", addr:"Eastern Promenade, East End", hood:"East End", ages:"2–5 yrs", date:"Sat, Mar 14 · 10am", weather:"🌤 38°F", attendees:["🧡","💙","💛"], count:7, host:"Sarah M.", description:"Bundled-up playground fun with ocean views! Bring a thermos, parking on the street.", x:310, y:135 },
  { id:2, emoji:"🌳", bg:"linear-gradient(135deg,#EEF4EF,#C8DBC9)", title:"Deering Oaks Duck Pond", venue:"Deering Oaks Park", addr:"Park Ave, West End", hood:"West End", ages:"1–4 yrs", date:"Sun, Mar 15 · 11am", weather:"🌥 42°F", attendees:["💜","🧡","💚"], count:5, host:"Jamie & Priya", description:"Feeding the ducks, running the paths, toddler chaos. We grab coffee after!", x:148, y:178 },
  { id:3, emoji:"📚", bg:"linear-gradient(135deg,#FDF5EC,#EADCC8)", title:"Library Story Time + Hangout", venue:"Portland Public Library", addr:"5 Monument Square, Downtown", hood:"Downtown", ages:"0–4 yrs", date:"Tue, Mar 11 · 10:30am", weather:"🏛 Indoor", attendees:["💛","💙"], count:8, host:"Mia T.", description:"After story time we stay on the kids' floor to let littles play. Totally free!", x:195, y:228 },
  { id:4, emoji:"🛝", bg:"linear-gradient(135deg,#F8F0EC,#E8D4C8)", title:"Payson Park + Back Cove Stroll", venue:"Payson Park Playground", addr:"Baxter Blvd, Back Cove", hood:"Back Cove", ages:"3–7 yrs", date:"Wed, Mar 12 · 9am", weather:"☀️ 45°F", attendees:["💛","💚","💙","🧡"], count:10, host:"Alex R.", description:"Fenced playground then optional Back Cove trail stroll. Chill pace for everyone.", x:130, y:75 },
  { id:5, emoji:"☕", bg:"linear-gradient(135deg,#FDF8F0,#EDE0CC)", title:"Bayside Café Parent Coffee", venue:"Bayside American Cafe", addr:"98 Portland St, Bayside", hood:"Bayside", ages:"0–3 yrs", date:"Thu, Mar 13 · 8:30am", weather:"☕ Indoor", attendees:["💜","🧡"], count:6, host:"Dana K.", description:"Parents sip great coffee while babies & toddlers hang out. High chairs available!", x:235, y:148 },
];

const pinColor = hood => ({ "East End":"#2A5F7A","West End":"#6B9E6F","Downtown":"#C4583A","Back Cove":"#8B6DB0","Bayside":"#D4993A","Portland":"#C4583A" }[hood] || "#C4583A");

// ─── ONBOARDING SCREENS ───────────────────────────────────────────────────────

function WelcomeScreen({ onNext }) {
  return (
    <div className="ob-screen ob-welcome">
      <div className="ob-blob1" /><div className="ob-blob2" /><div className="ob-blob3" />
      <div className="ob-welcome-art">
        <div className="ob-welcome-logo">
          <div className="ob-welcome-anchor">⚓</div>
          <div className="ob-welcome-city">Portland, Maine</div>
          <div className="ob-welcome-name">Play<span>Dates</span></div>
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
        <button className="ob-btn-primary" onClick={onNext}>Get Started →</button>
      </div>
    </div>
  );
}

function AboutYouScreen({ onNext, onBack, profile, setProfile }) {
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

function YourKidsScreen({ onDone, onBack, profile, kids, setKids }) {
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
          <button className="ob-btn-primary" onClick={onDone}>
            {kids.length > 0 ? `Let's find playdates! 🎉` : "Skip for now →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function PortlandPlayDates() {
  // Onboarding state
  const [obStep, setObStep] = useState(0); // 0=welcome, 1=about, 2=kids, 3=done
  const [profile, setProfile] = useState({ name: "", hood: "", avatar: "" });
  const [kids, setKids] = useState([]);

  // App state
  const [view, setView] = useState("list");
  const [activeHood, setActiveHood] = useState("All");
  const [activePin, setActivePin] = useState(null);
  const [showDetail, setShowDetail] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showTowns, setShowTowns] = useState(false);
  const [activeTowns, setActiveTowns] = useState(["portland"]);
  const [joined, setJoined] = useState({});
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [newVenue, setNewVenue] = useState({ name:"", addr:"", type:"", perks:[] });
  const [userVenues, setUserVenues] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", time: "" });
  const [created, setCreated] = useState([]);
  const [activeNav, setActiveNav] = useState("home");

  const allVenues = [...PORTLAND_VENUES, ...userVenues];
  const allDates = [...created, ...PLAYDATES];
  const filtered = activeHood === "All" ? allDates : allDates.filter(p => p.hood === activeHood);
  const activePd = activePin != null ? allDates.find(p => p.id === activePin) : null;

  const toggleTown = id => setActiveTowns(t => t.includes(id) ? (t.length > 1 ? t.filter(x=>x!==id) : t) : [...t, id]);

  const townLabel = activeTowns.length === 1 && activeTowns[0] === "portland"
    ? `📍 ${profile.hood || "Portland, ME"}`
    : `📍 ${activeTowns.length} areas selected`;

  const saveNewVenue = () => {
    if (newVenue.name && newVenue.addr && newVenue.type) {
      const vt = VENUE_TYPES.find(v => v.type === newVenue.type);
      setUserVenues(v => [...v, { ...newVenue, emoji: vt?.icon || "📍", pending: true, town:"Greater Portland" }]);
      setSelectedVenue(newVenue.name);
      setNewVenue({ name:"", addr:"", type:"", perks:[] });
      setShowAddVenue(false);
    }
  };

  const handleCreate = () => {
    if (formData.title && selectedVenue) {
      const v = allVenues.find(v => v.name === selectedVenue);
      setCreated(p => [{ id:Date.now(), emoji:v?.emoji||"🌟", bg:"linear-gradient(135deg,#FDF0E8,#EDB99E)", title:formData.title, venue:v?.name||selectedVenue, addr:v?.addr||"", hood:"Portland", ages:selectedAges.join(", ")||"All ages", date:`${formData.date} · ${formData.time}`, weather:"📍 Your event", attendees:["🧡"], count:1, host:profile.name||"You", description:"New playdate!", x:200+Math.random()*80, y:150+Math.random()*80 }, ...p]);
    }
    setShowCreate(false);
    setFormData({ title:"", date:"", time:"" });
    setSelectedAges([]);
    setSelectedVenue(null);
    setShowAddVenue(false);
  };

  // ── ONBOARDING ──
  if (obStep === 0) return <><style>{styles}</style><WelcomeScreen onNext={() => setObStep(1)} /></>;
  if (obStep === 1) return <><style>{styles}</style><AboutYouScreen onNext={() => setObStep(2)} onBack={() => setObStep(0)} profile={profile} setProfile={setProfile} /></>;
  if (obStep === 2) return <><style>{styles}</style><YourKidsScreen onDone={() => setObStep(3)} onBack={() => setObStep(1)} profile={profile} kids={kids} setKids={setKids} /></>;

  // ── MAIN APP ──
  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-inner">
            <div>
              <div className="logo-city">⚓ Portland, Maine</div>
              <div className="logo-name">Play<span>Dates</span></div>
            </div>
            <button className="user-avatar-btn" title="Profile">{profile.avatar || "👩"}</button>
          </div>
        </div>

        {/* PERSONALIZED GREETING */}
        <div className="greeting-bar">
          <div className="greeting-avatar">{profile.avatar || "👩"}</div>
          <div className="greeting-text">
            <div className="greeting-name">Hey, {profile.name || "there"}! 👋</div>
            <div className="greeting-kids">
              {kids.length > 0
                ? kids.map(k => `${k.emoji} ${k.name} (${k.age})`).join(" · ")
                : `${profile.hood || "Portland"} · Tap to add kids`}
            </div>
          </div>
          <button className="greeting-edit" onClick={() => setObStep(1)}>Edit</button>
        </div>

        {/* VIEW TOGGLE */}
        <div className="view-toggle">
          <button className={`toggle-btn ${view==="list"?"active":""}`} onClick={() => setView("list")}>☰ List</button>
          <button className={`toggle-btn ${view==="map"?"active":""}`} onClick={() => { setView("map"); setActiveNav("search"); }}>🗺️ Map</button>
        </div>

        {/* ── MAP VIEW ── */}
        {view === "map" && (
          <div style={{ paddingBottom: 100 }}>
            <div className="map-container">
              <svg viewBox="0 0 420 360" className="map-svg">
                <rect width="420" height="360" fill="#C8E0EA" />
                {[1,2,3].map(i=><ellipse key={i} cx="370" cy="80" rx={40+i*25} ry={20+i*12} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
                <path d="M 80 40 L 340 40 L 360 70 L 370 110 L 355 160 L 330 200 L 300 240 L 270 275 L 240 300 L 200 315 L 160 310 L 130 290 L 100 265 L 75 235 L 60 200 L 55 160 L 60 110 L 70 70 Z" fill="#DDE8D0" stroke="white" strokeWidth="2"/>
                {/* East End — eastern peninsula */}
                <path d="M 265 55 L 355 65 L 370 110 L 355 160 L 320 200 L 290 180 L 275 130 L 265 80 Z" fill="rgba(42,95,122,0.13)"/>
                {/* West End — western side */}
                <path d="M 60 120 L 155 120 L 158 210 L 130 255 L 75 235 L 60 200 L 55 160 Z" fill="rgba(107,158,111,0.13)"/>
                {/* Downtown — center/south */}
                <path d="M 155 190 L 290 185 L 295 255 L 240 290 L 175 280 L 158 230 Z" fill="rgba(196,88,58,0.09)"/>
                {/* Back Cove neighborhood — northwest */}
                <path d="M 65 48 L 210 48 L 215 115 L 155 120 L 100 115 L 68 85 Z" fill="rgba(139,109,176,0.11)"/>
                {/* Bayside — the triangle between Back Cove water, Downtown & East End */}
                <path d="M 210 115 L 290 120 L 295 185 L 225 190 L 215 150 Z" fill="rgba(212,153,58,0.13)"/>
                <path d="M 75 185 L 345 175" stroke="white" strokeWidth="2.5" opacity="0.7"/>
                <path d="M 120 50 L 100 180" stroke="white" strokeWidth="2" opacity="0.6"/>
                <path d="M 130 290 L 310 250" stroke="white" strokeWidth="2" opacity="0.6"/>
                <path d="M 80 105 L 280 90" stroke="white" strokeWidth="2" opacity="0.5"/>
                <path d="M 140 120 L 150 240" stroke="white" strokeWidth="2" opacity="0.5"/>
                <path d="M 200 160 L 195 295" stroke="white" strokeWidth="2" opacity="0.5"/>
                <path d="M 260 60 L 290 185" stroke="white" strokeWidth="2" opacity="0.5"/>
                <ellipse cx="152" cy="182" rx="22" ry="14" fill="#A8C8A0" opacity="0.7"/>
                <text x="152" y="186" textAnchor="middle" fontSize="8" fill="white" fontWeight="500">Deering Oaks</text>
                <ellipse cx="320" cy="145" rx="20" ry="12" fill="#A8C8A0" opacity="0.7"/>
                <text x="320" y="149" textAnchor="middle" fontSize="7" fill="white" fontWeight="500">E. Prom</text>
                <ellipse cx="178" cy="78" rx="30" ry="14" fill="rgba(200,224,234,0.6)" stroke="rgba(42,95,122,0.3)" strokeWidth="1"/>
                <text x="178" y="82" textAnchor="middle" fontSize="7.5" fill="#2A5F7A" fontWeight="500">Back Cove</text>
                <text x="368" y="55" textAnchor="middle" fontSize="9" fill="rgba(42,95,122,0.7)" fontStyle="italic">Casco Bay</text>
                {/* East End — eastern peninsula above waterfront */}
                <text x="315" y="88" textAnchor="middle" fontSize="9" fill="rgba(42,95,122,0.9)" fontWeight="600">East End</text>
                {/* West End — western side */}
                <text x="88" y="190" textAnchor="middle" fontSize="8.5" fill="rgba(107,158,111,0.9)" fontWeight="600">West End</text>
                {/* Downtown — center/south Congress St area */}
                <text x="200" y="225" textAnchor="middle" fontSize="9" fill="rgba(196,88,58,0.8)" fontWeight="600">Downtown</text>
                {/* Back Cove neighborhood label — north, distinct from the water */}
                <text x="135" y="62" textAnchor="middle" fontSize="8.5" fill="rgba(139,109,176,0.8)" fontWeight="600">Back Cove</text>
                {/* Bayside — between Downtown, Back Cove & East End (the correct location) */}
                <text x="228" y="168" textAnchor="middle" fontSize="8.5" fill="rgba(212,153,58,0.95)" fontWeight="600">Bayside</text>
                {allDates.map(pd => {
                  const isActive = activePin === pd.id;
                  const color = pinColor(pd.hood);
                  return (
                    <g key={pd.id} className="map-pin" onClick={() => setActivePin(isActive ? null : pd.id)}
                      style={{ transform:`translate(${pd.x}px,${pd.y + (isActive?-4:0)}px) scale(${isActive?1.2:1})`, transformOrigin:"0 0", transition:"transform 0.2s" }}>
                      {isActive && <circle cx="0" cy="-20" r="18" fill={color} opacity="0.2" className="pin-pulse"/>}
                      <ellipse cx="1" cy="4" rx="9" ry="4" fill="rgba(0,0,0,0.15)"/>
                      <path d="M 0 0 C -12 -10 -12 -30 0 -34 C 12 -30 12 -10 0 0" fill={color} className="pin-bubble"/>
                      <circle cx="0" cy="-22" r="10" fill={color}/>
                      <circle cx="0" cy="-22" r="7" fill="white" opacity="0.95"/>
                      <text x="0" y="-18.5" textAnchor="middle" fontSize="9" dominantBaseline="middle">{pd.emoji}</text>
                      <circle cx="8" cy="-34" r="7" fill="white" stroke={color} strokeWidth="1.5"/>
                      <text x="8" y="-34" textAnchor="middle" fontSize="7" dominantBaseline="middle" fill={color} fontWeight="700">{pd.count}</text>
                    </g>
                  );
                })}
                <circle cx="205" cy="188" r="8" fill="rgba(42,95,122,0.15)"/>
                <circle cx="205" cy="188" r="5" fill="white" stroke="#2A5F7A" strokeWidth="2"/>
                <circle cx="205" cy="188" r="2.5" fill="#2A5F7A"/>
              </svg>
              <div className="map-count-badge">📍 {allDates.length} playdates</div>
              {activePd && (
                <div className="map-card-peek">
                  <div className="peek-card" onClick={() => setShowDetail(activePd)}>
                    <div className="peek-row">
                      <div className="peek-emoji" style={{ background: activePd.bg }}>{activePd.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="peek-title">{activePd.title}</div>
                        <div className="peek-meta">🕐 {activePd.date} · {activePd.count} going</div>
                      </div>
                      <button className={`peek-join ${joined[activePd.id]?"joined":""}`}
                        onClick={e => { e.stopPropagation(); setJoined(j => ({...j,[activePd.id]:!j[activePd.id]})); }}>
                        {joined[activePd.id]?"✓":"Join"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="map-legend">
              {[["East End","#2A5F7A"],["West End","#6B9E6F"],["Downtown","#C4583A"],["Back Cove","#8B6DB0"],["Bayside","#D4993A"]].map(([n,c]) => (
                <div key={n} className="legend-item"><div className="legend-dot" style={{background:c}}/>{n}</div>
              ))}
            </div>
            <div style={{ padding:"20px 24px 0" }}>
              <div className="section-title" style={{ marginBottom:14 }}>All Playdates</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10, paddingBottom:100 }}>
                {allDates.map(pd => (
                  <div key={pd.id} style={{ display:"flex", alignItems:"center", gap:12, background:"white", borderRadius:16, padding:"12px 14px", border:`1.5px solid ${activePin===pd.id?pinColor(pd.hood):"var(--border)"}`, cursor:"pointer", transition:"border-color 0.15s" }}
                    onClick={() => { setActivePin(pd.id); window.scrollTo({top:0,behavior:"smooth"}); }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:pd.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{pd.emoji}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:"Fraunces,serif", fontSize:14, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pd.title}</div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{pd.date} · {pd.count} going</div>
                    </div>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:pinColor(pd.hood), flexShrink:0 }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <>
            <div className="location-bar">
              <div className="location-pill" onClick={() => setShowTowns(true)}>
                {townLabel} · {activeTowns.length > 1 ? "Greater Portland" : "5 mi radius"} ›
              </div>
            </div>
            <div className="weather-banner">
              <span style={{fontSize:22}}>🌤</span>
              <span><strong>This weekend:</strong> 38–45°F, mostly clear. Great bundled-up park weather!</span>
            </div>
            <div className="hero">
              <div className="hero-blob"/><div className="hero-wave"/>
              <div className="hero-label">⚓ {allDates.length} playdates near you</div>
              <h2>Hey {profile.name||"there"}!<br /><em>Ready to play?</em></h2>
              <div className="hero-sub">
                {kids.length > 0 ? `Showing matches for ${kids.map(k=>k.name).join(" & ")}` : "From Munjoy Hill to Back Cove"}
              </div>
              <button className="hero-cta" onClick={() => setShowCreate(true)}>+ Host a playdate</button>
            </div>
            <div className="section-header">
              <div className="section-title">Nearby Playdates</div>
              <button className="see-all" onClick={() => setView("map")}>🗺️ Map →</button>
            </div>
            <div className="hood-row">
              {HOODS.map(h => <button key={h} className={`hood-chip ${activeHood===h?"active":""}`} onClick={() => setActiveHood(h)}>{h}</button>)}
            </div>
            <div className="cards">
              {filtered.map(pd => (
                <div key={pd.id} className="card" onClick={() => setShowDetail(pd)}>
                  <div className="card-img" style={{background:pd.bg}}>{pd.emoji}<div className="card-weather">{pd.weather}</div></div>
                  <div className="card-body">
                    <div className="card-tags">
                      <span className="tag tag-age">👶 {pd.ages}</span>
                      <span className="tag tag-venue">📍 {pd.venue}</span>
                      {pd.hood && pd.hood!=="Portland" && <span className="tag tag-hood">{pd.hood}</span>}
                    </div>
                    <h3>{pd.title}</h3>
                    <div className="card-meta">🕐 {pd.date}</div>
                    <div className="card-footer">
                      <div className="attendees">
                        <div className="avatar-stack">
                          {pd.attendees.slice(0,3).map((a,i) => <div key={i} className="avatar-sm" style={{background:["#EAF3F8","#EEF4EF","#FDF0E8"][i%3]}}>{a}</div>)}
                        </div>
                        <span className="attendee-text">{pd.count} going</span>
                      </div>
                      <button className={`join-btn ${joined[pd.id]?"joined":""}`}
                        onClick={e => { e.stopPropagation(); setJoined(j=>({...j,[pd.id]:!j[pd.id]})); }}>
                        {joined[pd.id]?"✓ Going!":"Join"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length===0 && (
                <div style={{textAlign:"center",padding:"36px 0",color:"var(--muted)"}}>
                  <div style={{fontSize:38,marginBottom:10}}>🌲</div>
                  <div style={{fontFamily:"Fraunces,serif",fontSize:17,marginBottom:5}}>No playdates here yet</div>
                  <div style={{fontSize:13}}>Be the first to host one in {activeHood}!</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
          {[{id:"home",icon:"🏠",label:"Home"},{id:"search",icon:"🗺️",label:"Map"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => { setActiveNav(n.id); if(n.id==="search") setView("map"); else setView("list"); }}>
              <span className="nav-icon">{n.icon}</span><span className="nav-label">{n.label}</span>
            </button>
          ))}
          <div style={{flex:1,display:"flex",justifyContent:"center"}}>
            <button className="add-btn" onClick={() => setShowCreate(true)}>＋</button>
          </div>
          {[{id:"dates",icon:"📅",label:"My Dates"},{id:"profile",icon:profile.avatar||"👩",label:"Profile"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => { setActiveNav(n.id); if(n.id==="profile") setObStep(1); }}>
              <span className="nav-icon">{n.icon}</span><span className="nav-label">{n.label}</span>
            </button>
          ))}
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="modal-overlay" onClick={() => { setShowCreate(false); setShowAddVenue(false); }}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <h2>Host a Playdate ⚓</h2>
              <div className="form-field">
                <label className="form-label">Playdate name</label>
                <input className="form-input" placeholder="e.g. Deering Oaks Duck Walk"
                  value={formData.title} onChange={e => setFormData(f=>({...f,title:e.target.value}))}/>
              </div>
              <div className="form-field">
                <label className="form-label">Choose a venue</label>
                <div className="venue-suggestions">
                  {allVenues.map(v => (
                    <button key={v.name} className={`venue-suggestion ${selectedVenue===v.name?"selected":""}`} onClick={() => { setSelectedVenue(v.name); setShowAddVenue(false); }}>
                      <span className="venue-emoji">{v.emoji}</span>
                      <div style={{flex:1}}>
                        <div className="venue-name" style={{display:"flex",alignItems:"center",gap:6}}>
                          {v.name}
                          {v.pending && <span className="pending-badge">⏳ Pending</span>}
                        </div>
                        <div className="venue-addr">{v.addr}{v.town && v.town !== "Portland" ? ` · ${v.town}` : ""}</div>
                      </div>
                      {selectedVenue===v.name && <span style={{color:"var(--ocean)",fontWeight:600,flexShrink:0}}>✓</span>}
                    </button>
                  ))}
                </div>

                {/* ADD NEW VENUE */}
                {!showAddVenue ? (
                  <button className="add-venue-trigger" onClick={() => setShowAddVenue(true)}>
                    ＋ Don't see your spot? Add it
                  </button>
                ) : (
                  <div className="add-venue-form">
                    <div style={{fontFamily:"Fraunces,serif",fontSize:16,fontWeight:500,marginBottom:14,color:"var(--ocean)"}}>Add a new venue 📍</div>
                    <div className="form-field" style={{marginBottom:12}}>
                      <label className="form-label">Venue name</label>
                      <input className="form-input" placeholder="e.g. Mackworth Island Trail"
                        value={newVenue.name} onChange={e => setNewVenue(v=>({...v,name:e.target.value}))} style={{fontSize:14}}/>
                    </div>
                    <div className="form-field" style={{marginBottom:12}}>
                      <label className="form-label">Address or area</label>
                      <input className="form-input" placeholder="e.g. Andrews Ave, Falmouth"
                        value={newVenue.addr} onChange={e => setNewVenue(v=>({...v,addr:e.target.value}))} style={{fontSize:14}}/>
                    </div>
                    <div className="form-field" style={{marginBottom:12}}>
                      <label className="form-label">Type of space</label>
                      <div className="venue-type-grid">
                        {VENUE_TYPES.map(t => (
                          <button key={t.type} className={`venue-type-btn ${newVenue.type===t.type?"selected":""}`}
                            onClick={() => setNewVenue(v=>({...v,type:t.type}))}>
                            <span style={{fontSize:18}}>{t.icon}</span>
                            {t.type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-field" style={{marginBottom:14}}>
                      <label className="form-label">Parent-friendly perks</label>
                      <div className="venue-perks">
                        {VENUE_PERKS.map(p => (
                          <button key={p} className={`perk-chip ${newVenue.perks.includes(p)?"selected":""}`}
                            onClick={() => setNewVenue(v=>({...v,perks:v.perks.includes(p)?v.perks.filter(x=>x!==p):[...v.perks,p]}))}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"var(--ocean)",marginBottom:12,lineHeight:1.5}}>
                      ⏳ Your venue will show as <strong>pending</strong> until 2 other parents use it for a playdate — then it's official!
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button style={{flex:"0 0 auto",background:"var(--border)",color:"var(--muted)",border:"none",borderRadius:12,padding:"10px 14px",fontFamily:"DM Sans,sans-serif",fontSize:13,cursor:"pointer"}}
                        onClick={() => setShowAddVenue(false)}>Cancel</button>
                      <button className="save-venue-btn" disabled={!newVenue.name||!newVenue.addr||!newVenue.type} onClick={saveNewVenue}>
                        Submit Venue →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                <div className="form-field" style={{marginBottom:0}}>
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" value={formData.date} onChange={e => setFormData(f=>({...f,date:e.target.value}))}/>
                </div>
                <div className="form-field" style={{marginBottom:0}}>
                  <label className="form-label">Time</label>
                  <input type="time" className="form-input" value={formData.time} onChange={e => setFormData(f=>({...f,time:e.target.value}))}/>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Kids' ages welcome</label>
                <div className="age-grid">
                  {AGE_GROUPS.map(a => <button key={a} className={`age-chip ${selectedAges.includes(a)?"selected":""}`} onClick={() => setSelectedAges(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a])}>{a}</button>)}
                </div>
              </div>
              <button className="submit-btn" onClick={handleCreate}>Post Playdate →</button>
            </div>
          </div>
        )}

        {/* TOWNS MODAL */}
        {showTowns && (
          <div className="modal-overlay" onClick={() => setShowTowns(false)}>
            <div className="towns-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:500,marginBottom:6}}>Your area ⚓</div>
              <div style={{fontSize:13,color:"var(--muted)",marginBottom:4}}>Select all the towns you want to see playdates from.</div>

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

              <div style={{marginTop:20,padding:"14px 16px",background:"var(--ocean-pale)",borderRadius:14,fontSize:13,color:"var(--ocean)",lineHeight:1.5}}>
                🗺️ <strong>{activeTowns.length} area{activeTowns.length!==1?"s":""} selected.</strong> Playdates from all selected towns will appear in your feed and on the map.
              </div>

              <button className="ob-btn-primary" style={{marginTop:20}} onClick={() => setShowTowns(false)}>
                Save — Show me playdates →
              </button>
            </div>
          </div>
        )}

        {/* DETAIL MODAL */}
        {showDetail && (
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
        )}
      </div>
    </>
  );
}
