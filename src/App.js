import { supabase } from './lib/supabase';
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { FOUNDER_EMAIL, AVATARS, KID_EMOJIS, HOODS, AGE_GROUPS, PORTLAND_VENUES, TOWNS_NEARBY, VENUE_TYPES, VENUE_PERKS, ALL_NEIGHBORHOODS, PLAYDATES, HOOD_PIN_DEFAULTS, pinColor } from './constants';
import { FONT, styles } from './styles/index';
import { loadSession, fetchProfileAndKids, getDefaultProfile, upsertProfile, replaceKids } from './lib/session';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { AboutYouScreen } from './components/onboarding/AboutYouScreen';
import { YourKidsScreen } from './components/onboarding/YourKidsScreen';
import { WaitlistScreen } from './components/onboarding/WaitlistScreen';
import { AuthScreen } from "./components/onboarding/AuthScreen";
import { MyDatesView } from './components/MyDatesView';
import { SuccessPage } from './components/SuccessPage';
import { CreateModal } from './components/modals/CreateModal';
import { DetailModal } from './components/modals/DetailModal';
import { TownsModal } from './components/modals/TownsModal';
import { PreviewModal } from './components/modals/PreviewModal';

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function MainApp({
  session,
  enableAuth,
  authReady,
  loadingProfile,
  isEditingProfile,
  setIsEditingProfile,
  handleSaveProfile,
  isEditingKids,
  setIsEditingKids,
  handleSaveKids,
  obStep, setObStep, profile, setProfile, kids, setKids,
  showTallySuccess, setShowTallySuccess, showPreviewModal, setShowPreviewModal,
  view, setView, activeHood, setActiveHood, activePin, setActivePin,
  showDetail, setShowDetail, showCreate, setShowCreate, showTowns, setShowTowns,
  activeTowns, toggleTown, townLabel, joined, setJoined,
  selectedAges, setSelectedAges, selectedVenue, setSelectedVenue,
  showAddVenue, setShowAddVenue, newVenue, setNewVenue, setUserVenues,
  formData, setFormData, created, setCreated, activeNav, setActiveNav,
  myDatesTab, setMyDatesTab, showToast, setShowToast,
  allVenues, allDates, filtered, activePd, goingDates, hostingDates,
  isCreateDisabled, submitHelper, handleCreate, saveNewVenue,
  handleShare, topbarCopied,
}) {
  if (enableAuth && !authReady) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="ob-screen ob-welcome">
          <div className="ob-blob1" />
          <div className="ob-blob2" />
          <div className="ob-blob3" />
          <div className="auth-wrap">
            <div className="auth-card auth-card-otp">
              <div className="auth-logo auth-logo-mail">⚓</div>
              <h2 className="auth-title">Loading…</h2>
              <p className="auth-sub">Checking your session.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (enableAuth && !session) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <AuthScreen onSuccess={() => {}} />
      </>
    );
  }

  if (session && loadingProfile) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="ob-screen ob-welcome">
          <div className="ob-blob1" /><div className="ob-blob2" />
          <div className="ob-blob3" />
          <div className="ob-card" style={{ justifyContent: "center" }}>
            <div className="ob-title" style={{ textAlign: "center" }}>Loading your profile...</div>
          </div>
        </div>
      </>
    );
  }

  // ── ONBOARDING ──
  if (obStep === 0) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><WelcomeScreen onNext={() => setObStep(1)} /></>;
  if (obStep === 1) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><AboutYouScreen
        onNext={() => setObStep(2)}
        onBack={isEditingProfile
          ? () => {
            setIsEditingProfile(false);
            setObStep(4);
          }
          : () => setObStep(0)}
        profile={profile}
        setProfile={setProfile}
        isEditingProfile={isEditingProfile}
        onSaveProfile={handleSaveProfile}
      /></>;
  if (obStep === 2) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><YourKidsScreen
        onDone={() => setObStep(3)}
        onBack={isEditingKids
          ? () => {
            setIsEditingKids(false);
            setIsEditingProfile(true);
            setObStep(1);
          }
          : () => setObStep(1)}
        profile={profile}
        kids={kids}
        setKids={setKids}
        isEditingKids={isEditingKids}
        onSaveKids={handleSaveKids}
      /></>;
  if (obStep === 3) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><WaitlistScreen profile={profile} onPreview={() => setObStep(4)} onFormSubmitted={() => setShowTallySuccess(true)} showTallySuccess={showTallySuccess} /></>;

  // ── MAIN APP ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="app">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-inner">
            <div>
              <div className="logo-city">⚓ Portland, Maine</div>
              <div className="logo-name">PlayDates <span className="beta-badge">Beta</span></div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button
                className="topbar-share-btn"
                onClick={handleShare}
              >
                {topbarCopied ? "Copied!" : "Share"}
              </button>
              {enableAuth && (
                <>
                  <button
                    style={{
                      fontSize:10,
                      color:"var(--muted)",
                      background:"none",
                      border:"1px solid var(--border)",
                      borderRadius:100,
                      padding:"4px 10px",
                      cursor:"pointer",
                      fontFamily:"DM Sans, sans-serif",
                    }}
                    onClick={() => {
                      localStorage.removeItem("ppd_beta_session");
                      localStorage.removeItem("ppd_show_preview");
                      setObStep(0);
                      setProfile(getDefaultProfile());
                      setKids([]);
                      setShowPreviewModal(false);
                    }}
                  >
                    Restart
                  </button>
                  <button
                    style={{
                      fontSize:10,
                      color:"var(--muted)",
                      background:"none",
                      border:"1px solid var(--border)",
                      borderRadius:100,
                      padding:"4px 10px",
                      cursor:"pointer",
                      fontFamily:"DM Sans, sans-serif",
                    }}
                    onClick={async () => {
                      localStorage.removeItem("ppd_beta_session");
                      localStorage.removeItem("ppd_show_preview");
                      try {
                        await supabase.auth.signOut();
                      } catch (e) {
                        console.error("Failed to sign out:", e);
                      }
                      window.location.reload();
                    }}
                  >
                    Reset
                  </button>
                </>
              )}
              <button className="user-avatar-btn" title="Profile">{profile.avatar + (profile.tone || "") || "👩"}</button>
            </div>
          </div>
        </div>

        {/* PERSONALIZED GREETING */}
        <div className="greeting-bar">
          <div className="greeting-avatar">{profile.avatar + (profile.tone || "") || "👩"}</div>
          <div className="greeting-text">
            <div className="greeting-name">Hey, {profile.name || "there"}! 👋</div>
            <div className="greeting-kids">
              {kids.length > 0
                ? kids.map(k => `${k.emoji} ${k.name} (${k.age})`).join(" · ")
                : `${profile.town || "Portland"}${profile.hood ? ` (${profile.hood})` : ""} · Tap to add kids`}
            </div>
          </div>
          <button className="greeting-edit" onClick={() => {
            setIsEditingProfile(true);
            setObStep(1);
          }}>Edit</button>
        </div>

        {/* VIEW TOGGLE */}
        {activeNav !== "dates" && (
          <div className="view-toggle">
            <button className={`toggle-btn ${view==="list"?"active":""}`} onClick={() => setView("list")}>☰ List</button>
            <button className={`toggle-btn ${view==="map"?"active":""}`} onClick={() => { setView("map"); setActiveNav("search"); }}>🗺️ Map</button>
          </div>
        )}

        {/* ── MY DATES VIEW ── */}
        {activeNav === "dates" && (
          <MyDatesView
            tab={myDatesTab}
            setTab={setMyDatesTab}
            goingDates={goingDates}
            hostingDates={hostingDates}
            onOpenDetail={pd => setShowDetail(pd)}
            onBrowsePlaydates={() => { setActiveNav("home"); setView("list"); }}
            onHostOne={() => setShowCreate(true)}
            onCancelGoing={id => setJoined(j => ({ ...j, [id]: false }))}
            onRemoveHosting={id => setCreated(p => p.filter(x => x.id !== id))}
          />
        )}

        {/* ── MAP VIEW ── */}
        {activeNav !== "dates" && view === "map" && (
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
                        {joined[activePd.id] ? "✓" : "Join"}
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
            <div style={{
              fontSize: 11,
              color: "var(--muted)",
              textAlign: "center",
              padding: "6px 24px 0",
              lineHeight: 1.5
            }}>
              Map shows Portland area only during beta.
              Full Greater Portland map coming soon.
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
        {activeNav !== "dates" && view === "list" && (
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
                {kids.length > 0 ? `Showing matches for ${kids.map(k=>k.name).join(" & ")}` : "From the East End to North Deering and more"}
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
                  <div className="card-img" style={{background:pd.bg}}>
                    {pd.emoji}
                    {pd.comingSoon && <div className="card-comingsoon">Coming Soon</div>}
                    <div className="card-weather">{pd.weather}</div>
                  </div>
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
                      <button
                        className={`join-btn ${joined[pd.id] ? "joined" : ""}`}
                        onClick={e => {
                          e.stopPropagation();
                          setJoined(j => ({ ...j, [pd.id]: !j[pd.id] }));
                        }}
                      >
                        {joined[pd.id] ? "✓ Going!" : "Join"}
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
          {[{id:"dates",icon:"📅",label:"My Dates"},{id:"profile",icon:profile.avatar + (profile.tone || "") || "👩",label:"Profile"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => {
                setActiveNav(n.id);
                if (n.id === "profile") {
                  setIsEditingProfile(true);
                  setObStep(1);
                }
                if (n.id === "dates") setMyDatesTab("going");
              }}>
              <span className="nav-icon">{n.icon}</span><span className="nav-label">{n.label}</span>
            </button>
          ))}
        </div>

        {showToast && (
          <div className="toast">
            Playdate posted! Check My Dates to see it.
          </div>
        )}

        <PreviewModal
          showPreviewModal={showPreviewModal}
          setShowPreviewModal={setShowPreviewModal}
          handleShare={handleShare}
          topbarCopied={topbarCopied}
        />

        <CreateModal
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          showAddVenue={showAddVenue}
          setShowAddVenue={setShowAddVenue}
          formData={formData}
          setFormData={setFormData}
          allVenues={allVenues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          newVenue={newVenue}
          setNewVenue={setNewVenue}
          saveNewVenue={saveNewVenue}
          selectedAges={selectedAges}
          setSelectedAges={setSelectedAges}
          isCreateDisabled={isCreateDisabled}
          submitHelper={submitHelper}
          handleCreate={handleCreate}
        />

        <TownsModal
          showTowns={showTowns}
          setShowTowns={setShowTowns}
          activeTowns={activeTowns}
          toggleTown={toggleTown}
        />

        <DetailModal
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          joined={joined}
          setJoined={setJoined}
        />
      </div>
    </>
  );
}

export default function App() {

  const enableAuth = process.env.REACT_APP_ENABLE_AUTH === "true";

  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Onboarding state
  const [obStep, setObStep] = useState(() => loadSession().obStep); // 0=welcome, 1=about, 2=kids, 3=waitlist, 4=app
  const [profile, setProfile] = useState(() => loadSession().profile);
  const [kids, setKids] = useState(() => loadSession().kids);
  const [showTallySuccess, setShowTallySuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [topbarCopied, setTopbarCopied] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingKids, setIsEditingKids] = useState(false);
  const isFirstRender = useRef(true);

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
  const [myDatesTab, setMyDatesTab] = useState("going");
  const [showToast, setShowToast] = useState(false);

  const allVenues = [...PORTLAND_VENUES, ...userVenues];
  const allDates = [...created, ...PLAYDATES];
  const filtered = activeHood === "All" ? allDates : allDates.filter(p => p.hood === activeHood);
  const activePd = activePin != null ? allDates.find(p => p.id === activePin) : null;
  const isPreviewingApp = obStep === 4;
  const goingDates = allDates.filter(pd => joined[pd.id] === true);
  const hostingDates = created;

  const toggleTown = id => setActiveTowns(t => t.includes(id) ? (t.length > 1 ? t.filter(x=>x!==id) : t) : [...t, id]);

  const townLabel = activeTowns.length === 1 && activeTowns[0] === "portland"
    ? `📍 ${profile.town || "Portland, ME"}${profile.hood ? ` (${profile.hood})` : ""}`
    : `📍 ${activeTowns.length} areas selected`;

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
      navigator.clipboard.writeText(
        "https://www.portlandplaydates.com"
      );
      setTopbarCopied(true);
      setTimeout(() => setTopbarCopied(false), 2000);
    }
  };

  const handleSaveProfile = async () => {
    setProfile(p => ({ ...p }));
    try {
      if (session?.user?.id) {
        await upsertProfile(session.user.id, profile);
      }

      localStorage.setItem(
        "ppd_beta_session",
        JSON.stringify({
          obStep: 4,
          profile,
          kids,
        })
      );

      setIsEditingProfile(false);
      setIsEditingKids(true);
      setObStep(2);
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
  };

  const handleSaveKids = async () => {
    try {
      if (session?.user?.id) {
        await replaceKids(session.user.id, kids);
      }

      localStorage.setItem(
        "ppd_beta_session",
        JSON.stringify({
          obStep: 4,
          profile,
          kids,
        })
      );

      setIsEditingKids(false);
      setObStep(4);
    } catch (e) {
      console.error("Failed to save kids:", e);
    }
  };

  const saveNewVenue = () => {
    if (newVenue.name && newVenue.addr && newVenue.type) {
      const vt = VENUE_TYPES.find(v => v.type === newVenue.type);
      setUserVenues(v => [...v, { ...newVenue, emoji: vt?.icon || "📍", pending: true, town:"Greater Portland" }]);
      setSelectedVenue(newVenue.name);
      setNewVenue({ name:"", addr:"", type:"", perks:[] });
      setShowAddVenue(false);
    }
  };

  useEffect(() => {
    if (obStep >= 3) {
      localStorage.setItem(
        "ppd_beta_session",
        JSON.stringify({ obStep, profile, kids })
      );
    }
  }, [obStep, profile, kids]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthReady(true);
    });
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setAuthReady(true);
      });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady) {
      return;
    }
    if (!session) {
      setHasProfile(false);
      setLoadingProfile(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoadingProfile(true);
      try {
        const { profile: remoteProfile, kids: remoteKids } = await fetchProfileAndKids(session.user.id);
        if (cancelled) return;

        if (remoteProfile) {
          setProfile(p => ({
            ...p,
            name: remoteProfile.name || "",
            town: remoteProfile.town || "",
            hood: remoteProfile.hood || "",
            avatar: remoteProfile.avatar || "",
            tone: remoteProfile.tone || "",
            bio: remoteProfile.bio || p.bio || "",
          }));
          setKids((remoteKids || []).map(k => ({
            name: k.name,
            age: k.age,
            emoji: k.emoji,
          })));
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      } catch (e) {
        console.error("Supabase profile load failed", e);
        setHasProfile(false);
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, session]);

  useEffect(() => {
    if (!session) return;
    if (hasProfile) return;
    if (obStep !== 3) return;

    (async () => {
      try {
        await upsertProfile(session.user.id, profile);
        await replaceKids(session.user.id, kids);
        setHasProfile(true);
      } catch (e) {
        console.error("Supabase profile save failed", e);
      }
    })();
  }, [session, hasProfile, obStep, profile, kids]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (obStep === 4) {
      setShowPreviewModal(true);
    }
  }, [obStep]);

  useEffect(() => {
    const shouldShowPreview = localStorage.getItem("ppd_show_preview") === "true";
    if (shouldShowPreview) {
      localStorage.removeItem("ppd_show_preview");
      setShowPreviewModal(true);
    }
  }, []);

  const isCreateDisabled = !formData.title || !selectedVenue;
  let submitHelper = "";
  if (!formData.title && !selectedVenue) {
    submitHelper = "Add a name and choose a venue to continue";
  } else if (!formData.title) {
    submitHelper = "Add a playdate name to continue";
  } else if (!selectedVenue) {
    submitHelper = "Choose a venue to continue";
  }

  const handleCreate = () => {
    if (!formData.title || !selectedVenue) {
      return;
    }
    const v = allVenues.find(v => v.name === selectedVenue);
    const hoodName = v?.hood || profile.town || profile.hood || "Portland";
    const pin = HOOD_PIN_DEFAULTS[hoodName] || HOOD_PIN_DEFAULTS.default;
    setCreated(p => [
      {
        id: Date.now(),
        emoji: v?.emoji || "🌟",
        bg: "linear-gradient(135deg,#FDF0E8,#EDB99E)",
        title: formData.title,
        venue: v?.name || selectedVenue,
        addr: v?.addr || "",
        hood: hoodName,
        ages: selectedAges.join(", ") || "All ages",
        date: `${formData.date} · ${formData.time}`,
        weather: "📍 Your event",
        attendees: ["🧡"],
        count: 1,
        host: profile.name || "You",
        description: "New playdate!",
        x: pin.x,
        y: pin.y,
      },
      ...p,
    ]);
    setShowCreate(false);
    setFormData({ title:"", date:"", time:"" });
    setSelectedAges([]);
    setSelectedVenue(null);
    setShowAddVenue(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<MainApp
        session={session}
        enableAuth={enableAuth}
        authReady={authReady}
        loadingProfile={loadingProfile}
        isEditingProfile={isEditingProfile}
        setIsEditingProfile={setIsEditingProfile}
        handleSaveProfile={handleSaveProfile}
        isEditingKids={isEditingKids}
        setIsEditingKids={setIsEditingKids}
        handleSaveKids={handleSaveKids}
        obStep={obStep}
        setObStep={setObStep}
        profile={profile}
        setProfile={setProfile}
        kids={kids}
        setKids={setKids}
        showTallySuccess={showTallySuccess}
        setShowTallySuccess={setShowTallySuccess}
        showPreviewModal={showPreviewModal}
        setShowPreviewModal={setShowPreviewModal}
        view={view}
        setView={setView}
        activeHood={activeHood}
        setActiveHood={setActiveHood}
        activePin={activePin}
        setActivePin={setActivePin}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        showTowns={showTowns}
        setShowTowns={setShowTowns}
        activeTowns={activeTowns}
        toggleTown={toggleTown}
        townLabel={townLabel}
        joined={joined}
        setJoined={setJoined}
        selectedAges={selectedAges}
        setSelectedAges={setSelectedAges}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
        showAddVenue={showAddVenue}
        setShowAddVenue={setShowAddVenue}
        newVenue={newVenue}
        setNewVenue={setNewVenue}
        setUserVenues={setUserVenues}
        formData={formData}
        setFormData={setFormData}
        created={created}
        setCreated={setCreated}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        myDatesTab={myDatesTab}
        setMyDatesTab={setMyDatesTab}
        showToast={showToast}
        setShowToast={setShowToast}
        allVenues={allVenues}
        allDates={allDates}
        filtered={filtered}
        activePd={activePd}
        goingDates={goingDates}
        hostingDates={hostingDates}
        isCreateDisabled={isCreateDisabled}
        submitHelper={submitHelper}
        handleCreate={handleCreate}
        saveNewVenue={saveNewVenue}
        handleShare={handleShare}
        topbarCopied={topbarCopied}
      />} />
    </Routes>
  );
}
