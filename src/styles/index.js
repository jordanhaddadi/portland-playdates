export const FONT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap');`;

export const styles = `
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
  .beta-badge { background: var(--terracotta); color: white; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; vertical-align: middle; margin-left: 6px; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; }
  .beta-badge-onboarding { background: rgba(196,88,58,0.2); color: var(--terracotta-light); }
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
  .avatar-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 24px; }
  .avatar-option { width: auto; height: 64px; padding: 0; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; border: 2.5px solid var(--border); background: white; transition: all 0.15s; }
  .avatar-option.selected { border-color: var(--ocean); background: var(--ocean-pale); transform: scale(1.08); }

  /* FORM FIELDS */
  .ob-field { margin-bottom: 18px; }
  .ob-label { font-size: 11px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; display: block; }
  .ob-input { width: 100%; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--charcoal); outline: none; transition: border-color 0.15s; }
  .ob-input:focus { border-color: var(--ocean); }
  .ob-select { width: 100%; background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--charcoal); outline: none; appearance: none; cursor: pointer; }
  .ob-select:focus { border-color: var(--ocean); }
  .town-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  }
  .town-chip {
    padding: 8px 16px;
    border-radius: 100px;
    border: 1.5px solid var(--border);
    background: white;
    color: var(--charcoal);
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }
  .town-chip.active {
    background: var(--ocean);
    color: white;
    border-color: var(--ocean);
  }
  .hood-select-label {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 6px;
    display: block;
  }
  .hood-picker-wrap {
    margin-top: 4px;
  }
  .town-chip-sm {
    padding: 6px 12px;
    font-size: 12px;
  }
  .caregiver-notice {
    background: var(--ocean-pale);
    border: 1.5px solid var(--ocean-light);
    border-radius: 14px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--ocean);
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .caregiver-role-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .caregiver-goals-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .tone-picker-wrap {
    margin-top: 16px;
    animation: obFadeIn 0.2s ease;
  }
  .tone-picker-label {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
    display: block;
  }
  .tone-picker-row {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .tone-dot {
    width: 28px;
    height: 28px;
    border-radius: 100px;
    border: 2.5px solid transparent;
    cursor: pointer;
    transition: transform 0.15s ease;
  }
  .tone-dot:nth-child(1) { background: #FFDBB4; }
  .tone-dot:nth-child(2) { background: #F5C99A; }
  .tone-dot:nth-child(3) { background: #D4A574; }
  .tone-dot:nth-child(4) { background: #A0714F; }
  .tone-dot:nth-child(5) { background: #5C3D2E; }
  .tone-dot.active {
    border-color: var(--ocean);
    transform: scale(1.2);
  }

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
  .ob-error {
    font-size: 13px;
    color: var(--terracotta);
    text-align: center;
    margin-top: 8px;
    font-family: 'DM Sans', sans-serif;
  }
  .ob-btn-secondary {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    padding: 8px;
    width: 100%;
    text-align: center;
    margin-top: 4px;
  }

  .auth-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    z-index: 2;
  }

  .auth-card {
    width: 100%;
    max-width: 430px;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.55);
    border-radius: 28px;
    padding: 28px 22px 22px;
    box-shadow: 0 20px 60px rgba(14,35,45,0.18);
  }

  .auth-card-otp {
    text-align: center;
  }

  .auth-beta-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(42,95,122,0.10);
    color: var(--ocean);
    border: 1px solid rgba(42,95,122,0.14);
    border-radius: 100px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 18px;
  }

  .auth-brand {
    text-align: center;
    margin-bottom: 18px;
  }

  .auth-logo {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .auth-logo-mail {
    margin-bottom: 14px;
  }

  .auth-city {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 11px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 6px;
  }

  .auth-name {
    font-family: 'Fraunces', serif;
    font-size: 34px;
    line-height: 1;
    color: var(--charcoal);
  }

  .auth-title {
    font-family: 'Fraunces', serif;
    font-size: 32px;
    line-height: 1.08;
    color: var(--charcoal);
    text-align: center;
    margin: 0 0 12px;
  }

  .auth-sub {
    font-size: 15px;
    line-height: 1.6;
    color: var(--muted);
    text-align: center;
    margin: 0 0 22px;
    font-family: 'DM Sans', sans-serif;
  }

  .auth-field {
    margin-bottom: 16px;
  }

  .auth-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 8px;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
  }

  .auth-input-wrap {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 0 14px;
  }

  .auth-input {
    width: 100%;
    height: 54px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
  }

  .auth-input::placeholder,
  .auth-code-input::placeholder {
    color: #97A4AA;
  }

  .auth-code-input {
    width: 100%;
    height: 58px;
    border: 1.5px solid var(--border);
    border-radius: 16px;
    background: white;
    text-align: center;
    font-size: 28px;
    letter-spacing: 8px;
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    outline: none;
  }

  .auth-code-input:focus,
  .auth-input-wrap:focus-within {
    border-color: var(--ocean);
    box-shadow: 0 0 0 3px rgba(42,95,122,0.08);
  }

  .auth-primary-btn {
    width: 100%;
    margin-top: 4px;
  }

  .auth-secondary-btn {
    margin-top: 10px;
  }

  .auth-link-btn {
    width: 100%;
    background: none;
    border: none;
    color: var(--ocean);
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    padding: 8px 0;
    margin-top: 4px;
  }

  .auth-link-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .auth-helper {
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    margin-top: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  .auth-consent {
    font-size: 11px;
    color: var(--muted);
    text-align: center;
    line-height: 1.5;
    margin: 8px 0 0;
    padding: 0 8px;
  }

  .auth-consent-link {
    color: var(--ocean);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .auth-pillars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 18px;
  }

  .auth-pillar {
    font-size: 12px;
    color: var(--charcoal);
    background: rgba(255,255,255,0.75);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 7px 10px;
    font-family: 'DM Sans', sans-serif;
  }

  @media (max-width: 480px) {
    .auth-wrap {
      padding: 18px;
    }

    .auth-card {
      padding: 24px 18px 20px;
      border-radius: 24px;
    }

    .auth-name {
      font-size: 30px;
    }

    .auth-title {
      font-size: 28px;
    }

    .auth-sub {
      font-size: 14px;
    }

    .auth-code-input {
      font-size: 24px;
      letter-spacing: 6px;
    }
  }

  /* ── MAIN APP ── */
  .topbar { padding: 52px 24px 14px; background: var(--cream); position: sticky; top: 0; z-index: 10; }
  .topbar-inner { display: flex; align-items: center; justify-content: space-between; }
  .logo-city { font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--ocean); margin-bottom: 2px; }
  .logo-name { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--charcoal); letter-spacing: -0.5px; }
  .logo-name > span:not(.beta-badge) { color: var(--terracotta); }
  .user-avatar-btn { width: 42px; height: 42px; border-radius: 50%; border: 2.5px solid var(--ocean-light); background: var(--ocean-pale); cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; }
  .topbar-share-btn {
    font-size: 10px;
    color: var(--ocean);
    background: var(--ocean-pale);
    border: 1px solid var(--ocean-light);
    border-radius: 100px;
    padding: 4px 10px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
  }

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
  .featured-venues-section {
    padding: 0 16px 4px;
  }
  .featured-venues-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 10px;
  }
  .featured-venues-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
  }
  .featured-venues-scroll::-webkit-scrollbar {
    display: none;
  }
  .featured-venue-card {
    flex-shrink: 0;
    background: white;
    border-radius: 16px;
    padding: 14px 16px;
    border: 1.5px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 120px;
    text-align: center;
  }
  .featured-venue-emoji {
    font-size: 28px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .featured-venue-name {
    font-family: 'Fraunces', serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--charcoal);
  }
  .featured-venue-town {
    font-size: 11px;
    color: var(--muted);
  }
  .featured-venue-cta {
    margin-top: 6px;
    background: var(--ocean);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 11px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
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
  .towns-modal { width: 100%; max-width: 420px; background: var(--warm-white); border-radius: 28px 28px 0 0; padding: 12px 24px 48px; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); max-height: 88vh; overflow-y: auto; display: flex; flex-direction: column; }
  .towns-modal-scroll {
    overflow-y: auto;
    padding-bottom: 8px;
  }
  .towns-modal-footer {
    position: sticky;
    bottom: 0;
    background: var(--cream);
    padding-top: 14px;
    margin-top: 10px;
  }
  .towns-modal-summary {
    padding: 14px 16px;
    background: var(--ocean-pale);
    border-radius: 14px;
    font-size: 13px;
    color: var(--ocean);
    line-height: 1.5;
    margin-bottom: 14px;
  }
  .towns-modal-save {
    margin-top: 0;
  }
  .towns-select-all-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .towns-select-btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 100px;
    border: 1.5px solid var(--border);
    background: white;
    color: var(--charcoal);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    font-weight: 500;
  }

  .towns-select-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }
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
  .card-cover-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    display: block;
  }
  .card-weather { position: absolute; top: 10px; right: 12px; background: rgba(255,255,255,0.9); border-radius: 100px; padding: 3px 10px; font-size: 11px; font-weight: 500; }
  .card-partner-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    color: var(--ocean);
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  .card-body { padding: 14px 17px 16px; }
  .card-tags { display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap; }
  .tag { font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 100px; }
  .tag-age { background: var(--terracotta-pale); color: var(--terracotta); }
  .tag-venue { background: var(--ocean-pale); color: var(--ocean); }
  .tag-hood { background: #EEF4EF; color: var(--sage); }
  .card h3 { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 500; color: var(--charcoal); margin-bottom: 4px; line-height: 1.3; }
  .card-host-line {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .card-meta { font-size: 12px; color: var(--muted); margin-bottom: 12px; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .attendees { display: flex; align-items: center; gap: 8px; }
  .avatar-stack { display: flex; }
  .avatar-sm { width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; margin-left: -8px; font-size: 11px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .avatar-sm:first-child { margin-left: 0; }
  .attendee-text { font-size: 12px; color: var(--muted); }
  .card-attendees-wrap {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .card-attendees-popover {
    position: absolute;
    bottom: 32px;
    left: 0;
    background: white;
    border-radius: 12px;
    padding: 8px 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    z-index: 10;
    min-width: 140px;
    animation: obFadeIn 0.15s ease;
  }

  .card-attendees-popover-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--charcoal);
    padding: 4px 0;
    font-family: 'DM Sans', sans-serif;
  }

  .popover-avatar-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
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
  .create-field {
    margin-bottom: 16px;
  }

  .create-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 6px;
  }

  .create-optional {
    font-size: 11px;
    color: var(--muted);
    font-weight: 400;
    margin-left: 6px;
  }

  .create-textarea {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--charcoal);
    resize: none;
    line-height: 1.5;
    background: white;
    box-sizing: border-box;
  }

  .create-textarea:focus {
    outline: none;
    border-color: var(--ocean);
  }

  .recurring-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  }

  .recurring-btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 100px;
    border: 1.5px solid var(--border);
    background: white;
    color: var(--charcoal);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    font-weight: 500;
  }

  .recurring-btn.active {
    background: var(--ocean);
    color: white;
    border-color: var(--ocean);
  }

  .recurring-frequency {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .freq-btn {
    padding: 6px 14px;
    border-radius: 100px;
    border: 1.5px solid var(--border);
    background: white;
    color: var(--charcoal);
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }

  .freq-btn.active {
    background: var(--ocean-pale);
    color: var(--ocean);
    border-color: var(--ocean-light);
  }
  .cover-photo-upload-btn {
    border: 1.5px dashed var(--border);
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    transition: border-color 0.15s;
  }

  .cover-photo-upload-btn:hover {
    border-color: var(--ocean);
    color: var(--ocean);
  }

  .cover-photo-preview-wrap {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
  }

  .cover-photo-preview {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
    border-radius: 14px;
  }

  .cover-photo-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .detail-img { width: 100%; height: 140px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 54px; margin-bottom: 16px; }
  .detail-title { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 500; margin-bottom: 4px; line-height: 1.2; }
  .detail-host { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
  .detail-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
  .detail-attendees {
    margin: 16px 0;
    padding: 16px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .detail-attendees-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 12px;
  }

  .detail-attendee-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
  }

  .detail-attendee-avatar {
    font-size: 24px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail-attendee-photo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .detail-attendee-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
  }
  .attendee-host-badge {
    display: inline-block;
    background: var(--ocean-pale);
    color: var(--ocean);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 2px 8px;
    border-radius: 100px;
    margin-left: 8px;
    font-family: 'DM Sans', sans-serif;
    vertical-align: middle;
  }
  .detail-icon { font-size: 16px; margin-top: 1px; }
  .rsvp-btn { width: 100%; background: var(--terracotta); color: white; border: none; border-radius: 16px; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer; margin-top: 20px; transition: background 0.15s; }
  .rsvp-btn:hover { background: #B04830; }
  .rsvp-btn.going { background: var(--sage); }

  .pub-profile-sheet {
    background: white;
    border-radius: 24px;
    padding: 24px 24px 32px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    width: 88%;
    max-width: 380px;
    margin: auto;
  }

  .pub-profile-loading {
    text-align: center;
    padding: 40px 0;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
  }

  .pub-profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }

  .pub-profile-avatar {
    font-size: 56px;
    line-height: 1;
    margin-bottom: 12px;
  }

  .pub-profile-avatar-img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }

  .pub-profile-name {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--charcoal);
    margin-bottom: 4px;
  }

  .pub-profile-meta {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .pub-profile-bio {
    font-size: 14px;
    color: var(--charcoal);
    line-height: 1.6;
    font-style: italic;
    max-width: 280px;
  }

  .pub-profile-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }

  .pub-profile-section-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 10px;
  }

  .pub-profile-kid-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--charcoal);
    padding: 4px 0;
    font-family: 'DM Sans', sans-serif;
  }

  .pub-profile-pd-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 6px 0;
    font-size: 14px;
  }

  .pub-profile-pd-title {
    font-weight: 500;
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
  }

  .pub-pd-hosting-tag {
    display: inline-block;
    background: var(--ocean-pale);
    color: var(--ocean);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 100px;
    margin-left: 6px;
    font-family: 'DM Sans', sans-serif;
    vertical-align: middle;
  }

  .pub-profile-pd-meta {
    font-size: 12px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .pub-profile-close {
    width: 100%;
    background: var(--cream);
    border: 1.5px solid var(--border);
    border-radius: 100px;
    padding: 12px;
    font-size: 14px;
    color: var(--muted);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    margin-top: 8px;
  }

  /* ── PROFILE VIEW ── */
  .profile-page {
    background: var(--cream);
    max-width: 430px;
    margin: 0 auto;
    padding: 32px 24px 140px;
  }
  .profile-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
  .profile-avatar-large {
    font-size: 72px;
    line-height: 1;
    margin-bottom: 12px;
  }
  .profile-name-large {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--charcoal);
    margin: 0 0 4px;
    text-align: center;
  }
  .profile-meta {
    font-size: 14px;
    color: var(--muted);
    margin: 0;
    text-align: center;
  }
  .profile-stats-row {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
  .profile-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .profile-stat-number {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--charcoal);
  }
  .profile-stat-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
  }
  .profile-bio-card {
    background: transparent;
    padding: 0;
    font-size: 14px;
    color: var(--charcoal);
    line-height: 1.6;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  .profile-bio-empty {
    font-size: 13px;
    color: var(--muted);
    font-style: italic;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .profile-bio-empty-link {
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    width: 100%;
  }
  .profile-bio-empty-link:hover {
    color: var(--ocean);
    text-decoration: underline;
  }
  .bio-edit-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  .bio-save-btn {
    background: var(--terracotta);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .bio-cancel-btn {
    background: transparent;
    color: var(--muted);
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .bio-edit-trigger {
    cursor: pointer;
    color: var(--muted);
    font-size: 13px;
    font-style: italic;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .bio-display {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }
  .bio-edit-link {
    font-size: 12px;
    color: var(--ocean);
    cursor: pointer;
    white-space: nowrap;
    text-decoration: underline;
    text-underline-offset: 3px;
    background: none;
    border: none;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .profile-section-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }
  .profile-kids-list {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .profile-kid-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: var(--charcoal);
    padding: 6px 0;
  }
  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
  }
  .profile-btn {
    width: 100%;
    border: none;
    border-radius: 100px;
    padding: 14px 16px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .profile-btn-primary {
    background: var(--terracotta);
    color: white;
    font-size: 15px;
    font-weight: 600;
  }
  .profile-btn-secondary {
    background: #EAF2F6;
    color: var(--ocean);
    font-size: 15px;
    font-weight: 600;
  }
  .profile-btn-logout {
    background: transparent;
    border: 1.5px solid #ddd;
    color: var(--muted);
    font-size: 14px;
    margin-top: 8px;
  }

  .profile-avatar-wrap {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 12px;
  }

  .profile-avatar-photo {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  }

  .profile-avatar-edit-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    background: white;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    cursor: pointer;
  }

  .profile-avatar-uploading {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .topbar-avatar-photo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .greeting-avatar-photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .nav-avatar-photo {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }
  /* ── BETA BADGE ── */
  .beta-badge { background: var(--terracotta); color: white; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; vertical-align: middle; margin-left: 6px; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; }
  .beta-badge-onboarding { background: rgba(196,88,58,0.2); color: var(--terracotta-light); }

  /* ── CARD COMING SOON ── */
  .card-comingsoon { position: absolute; top: 10px; left: 12px; background: rgba(30,43,47,0.7); color: white; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px; }

  /* ── SUBMIT HELPER ── */
  .submit-helper { font-size: 12px; color: var(--terracotta); text-align: center; margin-bottom: 8px; padding: 8px 12px; background: var(--terracotta-pale); border-radius: 10px; }
  .submit-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; }

  /* ── TOAST ── */
  .toast { position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: var(--charcoal); color: white; padding: 12px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; z-index: 100; white-space: nowrap; box-shadow: 0 4px 20px rgba(30,43,47,0.3); animation: toastIn 0.3s ease; }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  /* ── WAITLIST / SUCCESS ── */
  .waitlist-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; padding: 40px 28px 60px; position: relative; z-index: 1; width: 100%; }
  .waitlist-top { text-align: center; margin-bottom: 28px; }
  .waitlist-avatar { font-size: 52px; margin-bottom: 10px; }
  .waitlist-name { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 500; color: white; }
  .waitlist-card { background: white; border-radius: 24px; padding: 28px 24px; width: 100%; max-width: 380px; }
  .waitlist-headline { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 500; color: var(--charcoal); margin-bottom: 10px; text-align: center; }
  .waitlist-subtext { font-size: 14px; color: var(--muted); line-height: 1.6; text-align: center; margin-bottom: 20px; }
  .waitlist-pill-row { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
  .waitlist-faq-toggle {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    padding: 8px 0;
    width: 100%;
    text-align: center;
  }
  .waitlist-faq {
    margin: 8px 0 16px;
    text-align: left;
    animation: obFadeIn 0.2s ease;
  }
  .waitlist-faq-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }
  .waitlist-faq-item:last-child {
    border-bottom: none;
  }
  .waitlist-faq-q {
    font-size: 13px;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .waitlist-faq-a {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
    font-family: 'DM Sans', sans-serif;
  }
  .tally-success-card { background: white; border-radius: 24px; padding: 32px 24px; width: 100%; max-width: 380px; text-align: center; }
  .tally-success-emoji { font-size: 48px; display: block; margin-bottom: 16px; }
  .tally-success-headline { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 500; color: var(--charcoal); margin-bottom: 8px; }
  .tally-success-sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }

  /* ── MY DATES ── */
  .dates-tabs { padding: 0 24px 18px; }
  .dates-tabs-inner { display: flex; background: white; border-radius: 14px; border: 1.5px solid var(--border); overflow: hidden; }
  .dates-tab { flex: 1; padding: 11px; border: none; background: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--muted); cursor: pointer; transition: all 0.18s; }
  .dates-tab.active { background: var(--charcoal); color: white; border-radius: 11px; margin: 3px; }
  .dates-count { opacity: 0.7; }
  .dates-empty { text-align: center; padding: 60px 32px 40px; }
  .dates-empty-emoji { font-size: 48px; margin-bottom: 16px; }
  .dates-empty-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500; margin-bottom: 8px; color: var(--charcoal); }
  .dates-empty-sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  .dates-empty-actions { display: flex; gap: 10px; justify-content: center; }
  .pill-cta { padding: 10px 20px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: transform 0.15s; }
  .pill-cta.browse { background: var(--ocean-pale); color: var(--ocean); }
  .pill-cta.host { background: var(--terracotta-pale); color: var(--terracotta); }
  .dates-section { padding: 0 24px; }
  .date-row { display: flex; align-items: center; gap: 12px; background: white; border-radius: 18px; border: 1.5px solid var(--border); padding: 14px 16px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.15s; }
  .date-row:hover { border-color: var(--ocean-light); }
  .date-emoji { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .date-mid { flex: 1; min-width: 0; }
  .date-title { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 500; color: var(--charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .date-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .date-venue { font-size: 11px; color: var(--ocean); margin-top: 2px; }
  .ghost-btn { background: none; border: 1.5px solid var(--border); border-radius: 100px; padding: 6px 12px; font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--muted); cursor: pointer; flex-shrink: 0; transition: all 0.15s; }
  .ghost-btn:hover { border-color: var(--terracotta); color: var(--terracotta); }

  /* ── PREVIEW MODAL ── */
  .preview-modal { width: 100%; max-width: 420px; background: var(--warm-white); border-radius: 28px 28px 0 0; padding: 32px 28px 48px; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); text-align: center; }
  .preview-modal-emoji { font-size: 44px; display: block; margin-bottom: 14px; }
  .preview-modal-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 500; color: var(--charcoal); margin-bottom: 10px; line-height: 1.2; }
  .preview-modal-sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  .preview-modal-pills { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; text-align: left; }
  .preview-modal-pill { display: flex; align-items: center; gap: 12px; background: white; border-radius: 14px; border: 1.5px solid var(--border); padding: 12px 16px; font-size: 14px; font-weight: 500; color: var(--charcoal); }
  .preview-modal-pill-icon { font-size: 22px; flex-shrink: 0; }
  .preview-modal-pill-sub { font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 2px; }
  .preview-modal-share {
    margin-top: 16px;
    text-align: center;
  }
  .preview-modal-share-text {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .preview-modal-share-text strong {
    color: var(--charcoal);
    font-weight: 600;
  }
  .preview-modal-share-btn {
    background: var(--ocean-pale);
    color: var(--ocean);
    border: 1.5px solid var(--ocean-light);
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    width: 100%;
  }

`;