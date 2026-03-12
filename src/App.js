import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { FOUNDER_EMAIL, AVATARS, KID_EMOJIS, HOODS, AGE_GROUPS, PORTLAND_VENUES, TOWNS_NEARBY, VENUE_TYPES, VENUE_PERKS, ALL_NEIGHBORHOODS, PLAYDATES, HOOD_PIN_DEFAULTS, pinColor } from './constants';
import { FONT, styles } from './styles/index';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { AboutYouScreen } from './components/onboarding/AboutYouScreen';
import { YourKidsScreen } from './components/onboarding/YourKidsScreen';
import { WaitlistScreen } from './components/onboarding/WaitlistScreen';
import { MyDatesView } from './components/MyDatesView';
import { SuccessPage } from './components/SuccessPage';

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function loadSession() {
  try {
    const saved = localStorage.getItem("ppd_beta_session");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        obStep: parsed.obStep || 0,
        profile: parsed.profile || { name: "", hood: "", avatar: "" },
        kids: parsed.kids || [],
      };
    }
  } catch (e) {
    // ignore parse errors
  }
  return {
    obStep: 0,
    profile: { name: "", hood: "", avatar: "" },
    kids: [],
  };
}

function MainApp({
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
}) {
  // ── ONBOARDING ──
  if (obStep === 0) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><WelcomeScreen onNext={() => setObStep(1)} /></>;
  if (obStep === 1) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><AboutYouScreen onNext={() => setObStep(2)} onBack={() => setObStep(0)} profile={profile} setProfile={setProfile} /></>;
  if (obStep === 2) return <><style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} /><YourKidsScreen onDone={() => setObStep(3)} onBack={() => setObStep(1)} profile={profile} kids={kids} setKids={setKids} /></>;
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
                  window.location.reload();
                }}
              >
                Reset
              </button>
              <button className="user-avatar-btn" title="Profile">{profile.avatar || "👩"}</button>
            </div>
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
          {[{id:"dates",icon:"📅",label:"My Dates"},{id:"profile",icon:profile.avatar||"👩",label:"Profile"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => {
                setActiveNav(n.id);
                if (n.id === "profile") setObStep(1);
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

        {showPreviewModal && (
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
            </div>
          </div>
        )}

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
                    <button type="button" key={v.name} className={`venue-suggestion ${selectedVenue===v.name?"selected":""}`} onClick={() => { setSelectedVenue(v.name); setShowAddVenue(false); }}>
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
                  <button type="button" className="add-venue-trigger" onClick={() => setShowAddVenue(true)}>
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
                          <button type="button" key={t.type} className={`venue-type-btn ${newVenue.type===t.type?"selected":""}`}
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
                          <button type="button" key={p} className={`perk-chip ${newVenue.perks.includes(p)?"selected":""}`}
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
                      <button type="button" style={{flex:"0 0 auto",background:"var(--border)",color:"var(--muted)",border:"none",borderRadius:12,padding:"10px 14px",fontFamily:"DM Sans,sans-serif",fontSize:13,cursor:"pointer"}}
                        onClick={() => setShowAddVenue(false)}>Cancel</button>
                      <button type="button" className="save-venue-btn" disabled={!newVenue.name||!newVenue.addr||!newVenue.type} onClick={saveNewVenue}>
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
                  {AGE_GROUPS.map(a => (
                    <button
                      type="button"
                      key={a}
                      className={`age-chip ${selectedAges.includes(a) ? "selected" : ""}`}
                      onClick={() =>
                        setSelectedAges(p => (p.includes(a) ? p.filter(x => x !== a) : [...p, a]))
                      }
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              {isCreateDisabled && submitHelper && (
                <div className="submit-helper">{submitHelper}</div>
              )}
              <button className="submit-btn" disabled={isCreateDisabled} onClick={handleCreate}>
                Post Playdate →
              </button>
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

export default function PortlandPlayDates() {

  // Onboarding state
  const [obStep, setObStep] = useState(() => loadSession().obStep); // 0=welcome, 1=about, 2=kids, 3=waitlist, 4=app
  const [profile, setProfile] = useState(() => loadSession().profile);
  const [kids, setKids] = useState(() => loadSession().kids);
  const [showTallySuccess, setShowTallySuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
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

  useEffect(() => {
    if (obStep >= 3) {
      localStorage.setItem(
        "ppd_beta_session",
        JSON.stringify({ obStep, profile, kids })
      );
    }
  }, [obStep, profile, kids]);

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
    const hoodName = v?.hood || profile.hood || "Portland";
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
      />} />
    </Routes>
  );
}
