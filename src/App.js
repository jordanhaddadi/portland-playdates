import { supabase } from './lib/supabase';
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { FOUNDER_EMAIL, AVATARS, KID_EMOJIS, HOODS, AGE_GROUPS, PORTLAND_VENUES, TOWNS_NEARBY, VENUE_TYPES, VENUE_PERKS, ALL_NEIGHBORHOODS, PLAYDATES, HOOD_PIN_DEFAULTS, pinColor } from './constants';
import { FONT, styles } from './styles/index';
import { loadSession, fetchProfileAndKids, getDefaultProfile, upsertProfile, replaceKids, createPlaydate, fetchPlaydates, fetchRsvps, joinPlaydate, leavePlaydate, fetchVenues, createVenueSubmission, uploadAvatar, uploadPlaydateCover } from './lib/session';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { AboutYouScreen } from './components/onboarding/AboutYouScreen';
import { YourKidsScreen } from './components/onboarding/YourKidsScreen';
import { WaitlistScreen } from './components/onboarding/WaitlistScreen';
import { AboutCaregiverScreen } from "./components/onboarding/AboutCaregiverScreen";
import { AuthScreen } from "./components/onboarding/AuthScreen";
import { MyDatesView } from './components/views/MyDatesView';
import { ProfileView } from "./components/views/ProfileView";
import { SuccessPage } from './components/views/SuccessPage';
import { PrivacyPage } from './components/views/PrivacyPage';
import { CreateModal } from './components/modals/CreateModal';
import { DetailModal } from './components/modals/DetailModal';
import { TownsModal } from './components/modals/TownsModal';
import { PreviewModal } from './components/modals/PreviewModal';
import { PublicProfileModal } from "./components/modals/PublicProfileModal";

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function formatPlaydateDate(dateStr) {
  if (!dateStr) return "";

  const today = new Date();
  const target = new Date(`${dateStr}T12:00:00`);

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const tomorrowMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const targetMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  if (targetMidnight.getTime() === todayMidnight.getTime()) {
    return "Today";
  }

  if (targetMidnight.getTime() === tomorrowMidnight.getTime()) {
    return "Tomorrow";
  }

  return target.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatPlaydateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return "";

  const d = new Date(`${dateStr}T${timeStr}:00`);

  const datePart = formatPlaydateDate(dateStr);

  const timePart = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${datePart} · ${timePart}`;
}

const getWeekendWeatherSummary = (cache) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
  const daysUntilSun = (0 - dayOfWeek + 7) % 7 || 7;

  const toDateStr = (d) => d.toISOString().split("T")[0];
  const sat = toDateStr(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSat)
  );
  const sun = toDateStr(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSun)
  );

  const satWeather = cache[sat];
  const sunWeather = cache[sun];

  if (satWeather && sunWeather) return `${satWeather} Sat · ${sunWeather} Sun`;
  if (satWeather) return `${satWeather} this Saturday`;
  if (sunWeather) return `${sunWeather} this Sunday`;
  return null;
};

function CardAttendees({ pd }) {
  const [showAttendees, setShowAttendees] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(null);

  return (
    <>
      <div
        className="card-attendees-wrap"
        onClick={e => {
          e.stopPropagation();
          setShowAttendees(s => !s);
        }}
      >
        {showAttendees && (
          <div className="card-attendees-popover">
            {(pd.allAttendees || []).map((a, i) => (
              <div
                key={i}
                className="card-attendees-popover-row"
                style={{ cursor: a.profileId ? "pointer" : "default" }}
                onClick={e => {
                  e.stopPropagation();
                  if (a.profileId) setViewingProfile(a.profileId);
                }}
              >
                <span>
                  {a && a.photoUrl ? (
                    <img
                      src={a.photoUrl}
                      className="popover-avatar-img"
                      alt=""
                    />
                  ) : (
                    (a && a.emoji) || a
                  )}
                </span>
                <span>{a?.name || "Parent"}</span>
              </div>
            ))}
          </div>
        )}

        <div className="avatar-stack">
          {pd.attendees.slice(0,3).map((a,i) => (
            <div
              key={i}
              className="avatar-sm"
              style={{background:["#EAF3F8","#EEF4EF","#FDF0E8"][i%3]}}
            >
              {a && a.photoUrl ? (
                <img
                  src={a.photoUrl}
                  alt="attendee"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                a.emoji || a
              )}
            </div>
          ))}
        </div>
      </div>
      {viewingProfile && (
        <PublicProfileModal
          userId={viewingProfile}
          currentUserId={pd._hostId}
          onClose={() => setViewingProfile(null)}
        />
      )}
    </>
  );
}

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
  handleToggleJoin,
  obStep, setObStep, profile, setProfile, kids, setKids,
  showTallySuccess, setShowTallySuccess, showPreviewModal, setShowPreviewModal,
  view, setView, activeHood, setActiveHood, activePin, setActivePin,
  showDetail, setShowDetail, showCreate, setShowCreate, showTowns, setShowTowns,
  activeTowns, setActiveTowns, toggleTown, townLabel, selectedTownNames, joined, setJoined,
  selectedAges, setSelectedAges, selectedVenue, setSelectedVenue,
  showAddVenue, setShowAddVenue, newVenue, setNewVenue, setUserVenues,
  coverPhoto, setCoverPhoto, coverPhotoPreview, setCoverPhotoPreview,
  isRecurring, setIsRecurring, recurringFrequency, setRecurringFrequency,
  formData, setFormData, created, setCreated, activeNav, handleSetActiveNav,
  myDatesTab, setMyDatesTab, showToast, setShowToast,
  setDbPlaydates,
  setDbRsvps,
  allVenues, featuredVenues, allDates, filtered, upcomingFiltered, pastFiltered, farAwayFiltered, activePd, goingDates, hostingDates, pastDates,
  isCreateDisabled, submitHelper, handleCreate, saveNewVenue,
  handleShare, topbarCopied,
  handleRestart,
  weatherCache,
  installPrompt,
  showInstallBanner,
  setShowInstallBanner,
  showIosBanner,
  setShowIosBanner,
}) {
  const isAuthed = !!session?.user?.id;
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
  if (obStep === 3) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <AboutCaregiverScreen
        onDone={async () => {
          try {
            if (session?.user?.id) {
              await upsertProfile(session.user.id, {
                ...profile,
                email: session?.user?.email || "",
              });
              await replaceKids(session.user.id, kids);
            }
            localStorage.setItem(
              "ppd_beta_session",
              JSON.stringify({ obStep: 4, profile, kids })
            );
          } catch (e) {
            console.error("Failed to save profile on onboarding complete:", e);
          }
          setObStep(4);
        }}
        onBack={() => setObStep(profile?.name ? 4 : 2)}
        profile={profile}
        setProfile={setProfile}
      />
    </>
  );

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
              {enableAuth && process.env.NODE_ENV === "development" && (
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
                    onClick={handleRestart}
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
              <button
                className="user-avatar-btn"
                title="Profile"
                onClick={() => handleSetActiveNav("profile")}
              >
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="avatar"
                    className="topbar-avatar-photo"
                  />
                ) : (
                  profile.avatar + (profile.tone || "") || "👩"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* PERSONALIZED GREETING (HOME FEED ONLY) */}
        {activeNav === "home" && view === "list" && (
          <div className="greeting-bar">
            <div className="greeting-avatar">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="greeting-avatar-photo"
                />
              ) : (
                profile.avatar + (profile.tone || "") || "👩"
              )}
            </div>
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
        )}

        {/* VIEW TOGGLE */}
        {activeNav !== "dates" && activeNav !== "profile" && (
          <div className="view-toggle">
            <button className={`toggle-btn ${view==="list"?"active":""}`} onClick={() => setView("list")}>☰ List</button>
            <button className={`toggle-btn ${view==="map"?"active":""}`} onClick={() => { setView("map"); handleSetActiveNav("search"); }}>🗺️ Map</button>
          </div>
        )}

        {/* ── MY DATES VIEW ── */}
        {activeNav === "dates" && (
          <MyDatesView
            tab={myDatesTab}
            setTab={setMyDatesTab}
            goingDates={goingDates}
            hostingDates={hostingDates}
            pastDates={pastDates}
            onOpenDetail={pd => setShowDetail(pd)}
            onBrowsePlaydates={() => { handleSetActiveNav("home"); setView("list"); }}
            onHostOne={() => setShowCreate(true)}
            onCancelGoing={async (id) => {
              if (!session?.user?.id) return;
              try {
                await leavePlaydate(id, session.user.id);
                const refreshedRsvps = await fetchRsvps();
                setDbRsvps(refreshedRsvps);
                setJoined(j => ({ ...j, [id]: false }));
              } catch (e) {
                console.error("Failed to cancel RSVP:", e);
              }
            }}
            onRemoveHosting={async (id) => {
              if (!session?.user?.id) return;
              try {
                await supabase
                  .from("playdates")
                  .delete()
                  .eq("id", id)
                  .eq("host_id", session.user.id);
                const [pds, rsvps] = await Promise.all([
                  fetchPlaydates(),
                  fetchRsvps(),
                ]);
                setDbPlaydates(pds);
                setDbRsvps(rsvps);
                setCreated(p => p.filter(x => x.id !== id));
              } catch (e) {
                console.error("Failed to remove hosting:", e);
              }
            }}
          />
        )}

        {activeNav === "profile" && (
          <ProfileView
            profile={profile}
            kids={kids}
            session={session}
            setProfile={setProfile}
            onAvatarUpload={async (file) => {
              if (!session?.user?.id) return;
              const url = await uploadAvatar(session.user.id, file);
              setProfile(p => ({ ...p, avatar_url: url }));
              return url;
            }}
            hostedCount={hostingDates.length}
            joinedCount={goingDates.length}
            showLogout={enableAuth && isAuthed}
            onEditProfile={() => {
              setIsEditingProfile(true);
              handleSetActiveNav("profile");
              setObStep(1);
            }}
            onEditKids={() => {
              setIsEditingKids(true);
              handleSetActiveNav("profile");
              setObStep(2);
            }}
            onEditCaregiver={() => setObStep(3)}
            onLogout={async () => {
              try {
                localStorage.removeItem("ppd_beta_session");
                localStorage.removeItem("ppd_show_preview");
                sessionStorage.removeItem("ppd_active_nav");
                await supabase.auth.signOut();
              } catch (e) {
                console.error("Failed to log out:", e);
              }
              window.location.reload();
            }}
          />
        )}

        {/* ── MAP VIEW ── */}
        {activeNav !== "dates" && activeNav !== "profile" && view === "map" && (
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
              {filtered.map(pd => {
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
              <div className="map-count-badge">📍 {filtered.length} playdates</div>
              {activePd && (
                <div className="map-card-peek">
                  <div className="peek-card" onClick={() => setShowDetail(activePd)}>
                    <div className="peek-row">
                      <div className="peek-emoji" style={{ background: activePd.bg }}>{activePd.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="peek-title">{activePd.title}</div>
                        <div className="peek-meta">🕐 {activePd.date} · {activePd.count} going</div>
                      </div>
                      <button
                        className={`peek-join ${((activePd._isDb && activePd._hostId === session?.user?.id) || (activePd._isDb ? activePd._joined : joined[activePd.id])) ? "joined" : ""}`}
                        onClick={e => {
                          e.stopPropagation();
                          if (activePd._isDb) {
                            if (activePd._hostId === session?.user?.id) return;
                            handleToggleJoin(activePd.id);
                          } else {
                            setJoined(j => ({...j,[activePd.id]:!j[activePd.id]}));
                          }
                        }}
                      >
                        {(activePd._isDb && activePd._hostId === session?.user?.id)
                          ? "Hosting"
                          : ((activePd._isDb ? activePd._joined : joined[activePd.id]) ? "✓" : "Join")}
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
                {filtered.map(pd => (
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
        {activeNav !== "dates" && activeNav !== "profile" && view === "list" && (
          <>
            <div className="location-bar">
              <div className="location-pill" onClick={() => setShowTowns(true)}>
                {townLabel} ›
              </div>
            </div>
            {/* {featuredVenues.length > 0 && (
              <div className="featured-venues-section">
                <div className="featured-venues-label">
                  ⭐ Partner Venues
                </div>
                <div className="featured-venues-scroll">
                  {featuredVenues.map(v => (
                    <div key={v.name} className="featured-venue-card">
                      <div className="featured-venue-emoji">{v.emoji}</div>
                      <div className="featured-venue-name">{v.name}</div>
                      <div className="featured-venue-town">{v.town}</div>
                      <button
                        className="featured-venue-cta"
                        onClick={() => setShowCreate(true)}
                      >
                        Host here
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            {(() => {
              const today = new Date();
              const toDateStr = (d) => d.toISOString().split("T")[0];
              const dayOfWeek = today.getDay();
              const sat = toDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((6 - dayOfWeek + 7) % 7 || 7)));
              const sun = toDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((0 - dayOfWeek + 7) % 7 || 7)));
              const satW = weatherCache[sat];
              const sunW = weatherCache[sun];
              if (!satW && !sunW) return null;
              const primary = satW || sunW;
              const desc = primary.split(" · ")[1] || "";
              const blurb =
                desc.includes("Snow") || desc.includes("Shower") || desc.includes("Rain") ? "Bundle up and get out there!" :
                desc.includes("Sunny") ? "Perfect playdate weather!" :
                desc.includes("Cloudy") ? "Great bundled-up park weather!" :
                "Get outside this weekend!";
              const parts = [
                satW ? `Sat: ${satW}` : null,
                sunW ? `Sun: ${sunW}` : null
              ].filter(Boolean).join(" | ");
              return (
                <div className="weather-banner">
                  <div>
                    <div><strong>This weekend:</strong> {parts}</div>
                    <div style={{fontSize:12, marginTop:3, opacity:0.8}}>{blurb}</div>
                  </div>
                </div>
              );
            })()}
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
            <div className="cards">
              {upcomingFiltered.map(pd => (
                <div key={pd.id} className="card" onClick={() => setShowDetail(pd)}>
                  <div className="card-img" style={{
                    background: pd.cover_photo_url ? "none" : pd.bg
                  }}>
                    {pd.cover_photo_url ? (
                      <img
                        src={pd.cover_photo_url}
                        alt={pd.title}
                        className="card-cover-photo"
                      />
                    ) : (
                      <div className="card-emoji">{pd.emoji}</div>
                    )}
                    {pd.comingSoon && <div className="card-comingsoon">Coming Soon</div>}
                    {pd.isPartnerVenue && (
                      <div className="card-partner-badge">
                        ⭐ Partner venue
                      </div>
                    )}
                    {pd.isReal && !pd.comingSoon && (
                      <div className="card-weather card-real-badge">
                        {weatherCache[pd.dateStr]
                          ? weatherCache[pd.dateStr]
                          : `📍 ${(() => {
                              const venueMatch = allVenues.find(
                                v => v.name?.toLowerCase() === pd.venue?.toLowerCase()
                              );
                              return venueMatch?.town || pd.town || "Greater Portland";
                            })()}`
                        }
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-tags">
                      <span className="tag tag-age">👶 Ages {pd.ages.replace("Ages ", "")}</span>
                      <span className="tag tag-venue">📍 {pd.venue}</span>
                    </div>
                    <h3>{pd.title}</h3>
                    {pd._isDb && (
                      <div className="card-host-line">
                        Hosted by {pd.hostName || "Host"}
                      </div>
                    )}
                    <div className="card-meta">🕐 {pd.date}</div>
                    <div className="card-footer">
                      <div className="attendees">
                        <CardAttendees pd={pd} />
                        <span className="attendee-text">{pd.count} going</span>
                      </div>
                      <button
                        className={`join-btn ${((pd._isDb && pd._hostId === session?.user?.id) || (pd._isDb ? pd._joined : joined[pd.id])) ? "joined" : ""}`}
                        onClick={e => {
                          e.stopPropagation();
                          if (pd._isDb) {
                            if (pd._hostId === session?.user?.id) return;
                            handleToggleJoin(pd.id);
                          } else {
                            setJoined(j => ({ ...j, [pd.id]: !j[pd.id] }));
                          }
                        }}
                      >
                        {(pd._isDb && pd._hostId === session?.user?.id)
                          ? "Hosting"
                          : ((pd._isDb ? pd._joined : joined[pd.id]) ? "✓ Going!" : "Join")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingFiltered.length === 0 && (
                <div style={{textAlign:"center",padding:"36px 0",color:"var(--muted)"}}>
                  <div style={{fontSize:38,marginBottom:10}}>🌲</div>
                  <div style={{fontFamily:"Fraunces,serif",fontSize:17,marginBottom:5}}>
                    No upcoming playdates
                  </div>
                  <div style={{fontSize:13}}>
                    Be the first to host one!
                  </div>
                </div>
              )}
            </div>

            {farAwayFiltered.length > 0 && (
              <>
                <div className="section-header" style={{ marginTop: 28 }}>
                  <div className="worth-drive-header">
                    <div>
                      <div className="section-title">
                        Worth the drive
                      </div>
                      <div className="worth-drive-sub">
                        A little further but worth it
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cards worth-drive-cards">
                  {farAwayFiltered.map(pd => (
                    <div key={pd.id} className="card" onClick={() => setShowDetail(pd)}>
                      <div className="card-img" style={{
                        background: pd.cover_photo_url ? "none" : pd.bg
                      }}>
                        {pd.cover_photo_url ? (
                          <img
                            src={pd.cover_photo_url}
                            alt={pd.title}
                            className="card-cover-photo"
                          />
                        ) : (
                          <div className="card-emoji">{pd.emoji}</div>
                        )}
                        {pd.comingSoon && <div className="card-comingsoon">Coming Soon</div>}
                        {pd.isPartnerVenue && (
                          <div className="card-partner-badge">
                            ⭐ Partner venue
                          </div>
                        )}
                        {pd.isReal && !pd.comingSoon && (
                          <div className="card-weather card-real-badge">
                            {weatherCache[pd.dateStr]
                              ? weatherCache[pd.dateStr]
                              : `📍 ${(() => {
                                  const venueMatch = allVenues.find(
                                    v => v.name?.toLowerCase() === pd.venue?.toLowerCase()
                                  );
                                  return venueMatch?.town || pd.town || "Greater Portland";
                                })()}`
                            }
                          </div>
                        )}
                      </div>
                      <div className="card-body">
                        <div className="card-tags">
                          <span className="tag tag-age">👶 Ages {pd.ages.replace("Ages ", "")}</span>
                          <span className="tag tag-venue">📍 {pd.venue}</span>
                        </div>
                        <h3>{pd.title}</h3>
                        {pd._isDb && (
                          <div className="card-host-line">
                            Hosted by {pd.hostName || "Host"}
                          </div>
                        )}
                        <div className="card-meta">🕐 {pd.date}</div>
                        <div className="card-footer">
                          <div className="attendees">
                            <CardAttendees pd={pd} />
                            <span className="attendee-text">{pd.count} going</span>
                          </div>
                          <button
                            className={`join-btn ${((pd._isDb && pd._hostId === session?.user?.id) || (pd._isDb ? pd._joined : joined[pd.id])) ? "joined" : ""}`}
                            onClick={e => {
                              e.stopPropagation();
                              if (pd._isDb) {
                                if (pd._hostId === session?.user?.id) return;
                                handleToggleJoin(pd.id);
                              } else {
                                setJoined(j => ({ ...j, [pd.id]: !j[pd.id] }));
                              }
                            }}
                          >
                            {(pd._isDb && pd._hostId === session?.user?.id)
                              ? "Hosting"
                              : ((pd._isDb ? pd._joined : joined[pd.id]) ? "✓ Going!" : "Join")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {pastFiltered.length > 0 && (
              <>
                <div className="section-header" style={{ marginTop: 48 }}>
                  <div className="section-title" style={{ color: "var(--muted)" }}>
                    Past playdates
                  </div>
                </div>
                <div className="cards past-cards">
                  {pastFiltered.map(pd => (
                    <div key={pd.id} className="card card-past" onClick={() => setShowDetail(pd)}>
                      <div className="card-img" style={{
                        background: pd.cover_photo_url ? "none" : pd.bg
                      }}>
                        {pd.cover_photo_url ? (
                          <img
                            src={pd.cover_photo_url}
                            alt={pd.title}
                            className="card-cover-photo"
                          />
                        ) : (
                          <div className="card-emoji">{pd.emoji}</div>
                        )}
                        {pd.comingSoon && <div className="card-comingsoon">Coming Soon</div>}
                        {pd.isPartnerVenue && (
                          <div className="card-partner-badge">
                            ⭐ Partner venue
                          </div>
                        )}
                        {pd.isReal && !pd.comingSoon && (
                          <div className="card-weather card-real-badge">
                            {weatherCache[pd.dateStr]
                              ? weatherCache[pd.dateStr]
                              : `📍 ${(() => {
                                  const venueMatch = allVenues.find(
                                    v => v.name?.toLowerCase() === pd.venue?.toLowerCase()
                                  );
                                  return venueMatch?.town || pd.town || "Greater Portland";
                                })()}`
                            }
                          </div>
                        )}
                      </div>
                      <div className="card-body">
                        <div className="card-tags">
                          <span className="tag tag-age">👶 Ages {pd.ages.replace("Ages ", "")}</span>
                          <span className="tag tag-venue">📍 {pd.venue}</span>
                        </div>
                        <h3>{pd.title}</h3>
                        {pd._isDb && (
                          <div className="card-host-line">
                            Hosted by {pd.hostName || "Host"}
                          </div>
                        )}
                        <div className="card-meta">🕐 {pd.date}</div>
                        <div className="card-footer">
                          <div className="attendees">
                            <CardAttendees pd={pd} />
                            <span className="attendee-text">{pd.count} going</span>
                          </div>
                          <button
                            className={`join-btn ${((pd._isDb && pd._hostId === session?.user?.id) || (pd._isDb ? pd._joined : joined[pd.id])) ? "joined" : ""}`}
                            onClick={e => {
                              e.stopPropagation();
                              if (pd._isDb) {
                                if (pd._hostId === session?.user?.id) return;
                                handleToggleJoin(pd.id);
                              } else {
                                setJoined(j => ({ ...j, [pd.id]: !j[pd.id] }));
                              }
                            }}
                          >
                            {(pd._isDb && pd._hostId === session?.user?.id)
                              ? "Hosting"
                              : ((pd._isDb ? pd._joined : joined[pd.id]) ? "✓ Going!" : "Join")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {showInstallBanner && (
          <div className="install-banner">
            <div className="install-banner-text">
              <strong>Add to Home Screen</strong>
              <span>Get the full app experience</span>
            </div>
            <div className="install-banner-actions">
              <button
                type="button"
                className="install-btn"
                onClick={async () => {
                  if (installPrompt) {
                    await installPrompt.prompt();
                    setShowInstallBanner(false);
                  }
                }}
              >
                Install
              </button>
              <button
                type="button"
                className="install-dismiss"
                onClick={() => setShowInstallBanner(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {showIosBanner && (
          <div className="install-banner">
            <div className="install-banner-text">
              <strong>Add to Home Screen ⚓</strong>
              <span>
                {`Tap the share icon below then "Add to Home Screen"`}
              </span>
            </div>
            <button
              type="button"
              className="install-dismiss"
              onClick={() => {
                localStorage.setItem("ppd_ios_install_dismissed", "true");
                setShowIosBanner(false);
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
          {[{id:"home",icon:"🏠",label:"Home"},{id:"search",icon:"🗺️",label:"Map"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => { handleSetActiveNav(n.id); if(n.id==="search") setView("map"); else setView("list"); }}>
              <span className="nav-icon">{n.icon}</span><span className="nav-label">{n.label}</span>
            </button>
          ))}
          <div style={{flex:1,display:"flex",justifyContent:"center"}}>
            <button className="add-btn" onClick={() => setShowCreate(true)}>＋</button>
          </div>
          {[{id:"dates",icon:"📅",label:"My Dates"},{id:"profile",icon:(profile.avatar + (profile.tone || "") || "👩"),label:"Profile"}].map(n => (
            <button key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`}
              onClick={() => {
                handleSetActiveNav(n.id);
                if (n.id === "dates") setMyDatesTab("going");
              }}>
              <span className="nav-icon">
                {n.id === "profile" && profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="avatar"
                    className="nav-avatar-photo"
                  />
                ) : (
                  n.icon
                )}
              </span>
              <span className="nav-label">{n.label}</span>
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
          coverPhoto={coverPhoto}
          setCoverPhoto={setCoverPhoto}
          coverPhotoPreview={coverPhotoPreview}
          setCoverPhotoPreview={setCoverPhotoPreview}
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
          recurringFrequency={recurringFrequency}
          setRecurringFrequency={setRecurringFrequency}
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
          setActiveTowns={setActiveTowns}
        />

        <DetailModal
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          joined={joined}
          setJoined={setJoined}
          onToggleJoin={handleToggleJoin}
          currentUserId={session?.user?.id}
          weatherCache={weatherCache}
        />
      </div>
    </>
  );
}

export default function App() {

  const enableAuth = process.env.REACT_APP_ENABLE_AUTH === "true";

  const [session, setSession] = useState(null);
  const isAuthed = !!session?.user?.id;
  const [authReady, setAuthReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [weatherCache, setWeatherCache] = useState({});

  // Onboarding state
  const [obStep, setObStep] = useState(() => loadSession().obStep); // 0=welcome, 1=about, 2=kids, 3=caregiver, 4=app, 5=waitlist (not in active flow)
  const [profile, setProfile] = useState(() => loadSession().profile);
  const [kids, setKids] = useState(() => loadSession().kids);
  const [showTallySuccess, setShowTallySuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [topbarCopied, setTopbarCopied] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingKids, setIsEditingKids] = useState(false);
  // App state
  const [view, setView] = useState("list");
  const [activeHood, setActiveHood] = useState("All");
  const [activePin, setActivePin] = useState(null);
  const [showDetail, setShowDetail] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showTowns, setShowTowns] = useState(false);
  const [activeTowns, setActiveTowns] = useState(() => {
    const allTownIds = [
      "portland",
      ...TOWNS_NEARBY.map(t => t.id)
    ];
    return allTownIds;
  });
  const [joined, setJoined] = useState({});
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [newVenue, setNewVenue] = useState({ name:"", addr:"", type:"", perks:[] });
  const [userVenues, setUserVenues] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", time: "", description: "" });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("weekly");
  const [created, setCreated] = useState([]);
  const [dbPlaydates, setDbPlaydates] = useState([]);
  const [dbRsvps, setDbRsvps] = useState([]);
  const [dbVenues, setDbVenues] = useState([]);
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window === "undefined") return "home";
    return sessionStorage.getItem("ppd_active_nav") || "home";
  });
  const [myDatesTab, setMyDatesTab] = useState("going");
  const [showToast, setShowToast] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showIosBanner, setShowIosBanner] = useState(false);
  const hasFetchedRef = useRef(false);
  const hasLoadedProfileRef = useRef(false);
  const isCreatingRef = useRef(false);

  const weatherCodeToEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 2) return "⛅";
    if (code <= 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 57) return "🌧️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "🌨️";
    if (code <= 99) return "⛈️";
    return "🌤️";
  };

  const weatherDescFromCode = (code) => {
    if (code === 0) return "Sunny";
    if (code <= 2) return "Partly cloudy";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 57) return "Light rain";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Showers";
    if (code <= 86) return "Snow showers";
    if (code <= 99) return "Thunderstorms";
    return "Mostly clear";
  };

  const handleSetActiveNav = (nav) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ppd_active_nav", nav);
    }
    setActiveNav(nav);
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("ppd_ios_install_dismissed");
    if (isIos && !isStandalone && !dismissed) {
      setShowIosBanner(true);
    }
  }, []);

  const mappedDbVenues = dbVenues.map(v => ({
    name: v.name,
    addr: v.addr,
    town: v.town,
    hood: v.hood || "",
    emoji: v.emoji || "📍",
    pending: v.status === "pending",
  }));

  const allVenues = [...PORTLAND_VENUES, ...mappedDbVenues, ...userVenues];
  const featuredVenues = dbVenues.filter(v => v.featured === true);
  const mappedDbPlaydates = dbPlaydates.map(pd => {
    const rsvpsForDate = dbRsvps.filter(r => r.playdate_id === pd.id);
    const isJoined = session?.user?.id
      ? rsvpsForDate.some(r => r.profile_id === session.user.id)
      : false;

    const pin = HOOD_PIN_DEFAULTS[pd.hood] || HOOD_PIN_DEFAULTS.default;
    const hostAttendee = {
      emoji: `${pd.host?.avatar || "👤"}${pd.host?.tone || ""}`,
      photoUrl: pd.host?.avatar_url || null,
      name: pd.host?.name || "Someone",
      profileId: pd.host_id,
    };

    const rsvpAttendees = rsvpsForDate
      .filter(r => r.profile_id !== pd.host_id)
      .map(r => {
        const p = r.profiles;
        return {
          emoji: p ? `${p.avatar || "👤"}${p.tone || ""}` : "👤",
          photoUrl: p?.avatar_url || null,
          name: p?.name || "Parent",
          profileId: r.profile_id,
        };
      });

    const attendeeAvatars = [
      hostAttendee,
      ...rsvpAttendees.filter(a => a.emoji !== hostAttendee.emoji)
    ].slice(0, 3);

    return {
      id: pd.id,
      town: pd.town || "Portland",
      emoji: pd.emoji || "🌟",
      bg: "linear-gradient(135deg,#FDF0E8,#EDB99E)",
      title: pd.title,
      venue: pd.venue || "TBD venue",
      addr: pd.addr || "",
      hood: pd.town?.includes("FARTHER")
        ? (pd.addr?.split(",")[1]?.trim() || "Further away")
        : (pd.hood || pd.town || "Portland"),
      ages: pd.ages || "All ages",
      date: formatPlaydateTime(pd.date, pd.time),
      dateStr: pd.date,
      timeStr: pd.time,
      weather: weatherCache[pd.date] || "",
      attendees: attendeeAvatars,
      allAttendees: [hostAttendee, ...rsvpAttendees],
      count: [hostAttendee, ...rsvpAttendees].length,
      host: profile.name || "Host",
      hostName:
        pd.host?.name ||
        (pd.host_id === session?.user?.id ? profile.name : null) ||
        "Someone",
      hostAvatar: hostAttendee.emoji,
      cover_photo_url: pd.cover_photo_url || null,
      isReal: true,
      isPartnerVenue: dbVenues.some(
        v =>
          v.featured === true &&
          (v.name || "").toLowerCase() === (pd.venue || "").toLowerCase()
      ),
      description: pd.description || "",
      event_link: pd.event_link || null,
      x: pin.x,
      y: pin.y,
      comingSoon: false,
      _isDb: true,
      _joined: isJoined,
      _hostId: pd.host_id,
    };
  });

  const townNameToId = {
    portland: "portland",
    ...Object.fromEntries(
      TOWNS_NEARBY.map(t => [t.name.toLowerCase().trim(), t.id])
    ),
  };

  const normalizeTownId = town => {
    if (!town) return "portland";
    const value = String(town).toLowerCase().trim();
    return townNameToId[value] || value;
  };

  const isLocalTown = (town) => {
    if (!town) return false;
    const normalized = town.toLowerCase().trim();
    const localTowns = [
      "portland",
      ...TOWNS_NEARBY.map(t => t.name.toLowerCase().trim()),
      ...TOWNS_NEARBY.map(t => t.id.toLowerCase().trim()),
    ];
    return localTowns.some(t => normalized.includes(t) || t.includes(normalized));
  };

  const allDates =
    mappedDbPlaydates.length > 0
      ? [...mappedDbPlaydates, ...created]
      : [...mappedDbPlaydates, ...created, ...PLAYDATES];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allUpcoming = allDates.filter(pd => {
    const isFartherTag =
      pd.town === "*FARTHER AWAY*" || pd.town?.includes("FARTHER");
    if (isFartherTag) return false;
    if (!pd.dateStr) return true;
    const pdDate = new Date(`${pd.dateStr}T12:00:00`);
    return pdDate >= today;
  });

  const upcomingFiltered = allUpcoming.filter(pd =>
    activeTowns.includes(normalizeTownId(pd.town)) &&
    isLocalTown(pd.town)
  );

  const farAwayFiltered = allUpcoming.filter(pd =>
    !isLocalTown(pd.town) &&
    pd.dateStr
  );

  const filtered = allDates.filter(pd => {
    const isFartherTag =
      pd.town === "*FARTHER AWAY*" || pd.town?.includes("FARTHER");
    if (isFartherTag) return false;
    const townId = normalizeTownId(pd.town);
    return activeTowns.includes(townId) && isLocalTown(pd.town);
  });

  const pastFiltered = filtered
    .filter(pd => {
      if (!pd.dateStr) return false;
      const pdDate = new Date(`${pd.dateStr}T12:00:00`);
      return pdDate < today;
    })
    .reverse();

  const activePd = activePin != null ? filtered.find(p => p.id === activePin) : null;
  const isPreviewingApp = obStep === 4;
  const goingDates = allDates.filter(pd => {
    const isGoing = joined[pd.id] === true || pd._joined;
    if (!isGoing) return false;
    if (!pd.dateStr) return true;
    const pdDate = new Date(`${pd.dateStr}T12:00:00`);
    return pdDate >= today;
  });
  const hostingDates = allDates.filter(pd => pd._hostId === session?.user?.id || created.some(c => c.id === pd.id));

  const pastDates = allDates
    .filter(pd => {
      if (!pd.dateStr) return false;
      const pdDate = new Date(`${pd.dateStr}T12:00:00`);
      if (pdDate >= today) return false;
      const imGoing = joined[pd.id] === true || pd._joined;
      const imHosting =
        pd._hostId === session?.user?.id || created.some(c => c.id === pd.id);
      return imGoing || imHosting;
    })
    .sort((a, b) => String(b.dateStr).localeCompare(String(a.dateStr)));

  const toggleTown = id => setActiveTowns(t => t.includes(id) ? (t.length > 1 ? t.filter(x=>x!==id) : t) : [...t, id]);

  const selectedTownNames = activeTowns.map(id => {
    if (id === "portland") return "Portland";
    const match = TOWNS_NEARBY.find(t => t.id === id);
    return match ? match.name : id;
  });

  const totalTowns = 1 + TOWNS_NEARBY.length;
  const townLabel =
    activeTowns.length === 1
      ? `📍 ${selectedTownNames[0]}`
      : activeTowns.length >= totalTowns
      ? `📍 All areas`
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

  const handleRestart = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Failed to sign out:", e);
    }

    localStorage.removeItem("ppd_beta_session");
    localStorage.removeItem("ppd_preview_seen");
    localStorage.removeItem("ppd_show_preview");
    localStorage.removeItem("ppd_seen_preview_modal");
    sessionStorage.removeItem("ppd_active_nav");

    setSession(null);
    setProfile(getDefaultProfile());
    setKids([]);
    setHasProfile(false);
    setShowPreviewModal(false);
    setLoadingProfile(false);

    setObStep(enableAuth ? 0 : 0);
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

  const handleToggleJoin = async (playdateId) => {
    if (!session?.user?.id) return;

    const alreadyJoined = dbRsvps.some(
      r => r.playdate_id === playdateId && r.profile_id === session.user.id
    );

    try {
      if (alreadyJoined) {
        await leavePlaydate(playdateId, session.user.id);
      } else {
        await joinPlaydate(playdateId, session.user.id);
      }

      const refreshedRsvps = await fetchRsvps();
      setDbRsvps(refreshedRsvps);

      setJoined(j => ({
        ...j,
        [playdateId]: !alreadyJoined,
      }));
    } catch (e) {
      console.error("Failed to toggle RSVP:", e);
    }
  };

  const saveNewVenue = () => {
    if (newVenue.name && newVenue.addr && newVenue.type) {
      const ALLOWED_TOWNS = [
        "Portland",
        "South Portland",
        "Cape Elizabeth",
        "Falmouth",
        "Scarborough",
        "Yarmouth",
        "Westbrook",
        "Gorham",
        "Saco / Biddeford",
      ];

      const venueTownCheck = newVenue.town || profile.town || "Portland";
      if (!ALLOWED_TOWNS.some(t => t.toLowerCase() === venueTownCheck.toLowerCase())) {
        alert(
          "We are currently focused on Greater Portland venues only. " +
          "If your venue is outside this area, please email jordan@portlandplaydates.com " +
          "and we will be in touch!"
        );
        return;
      }

      if (session?.user?.id) {
        (async () => {
          try {
            const vt = VENUE_TYPES.find(v => v.type === newVenue.type);

            const venueTown = newVenue.town || profile.town || "Portland";
            const venuePayload = {
              ...newVenue,
              town: venueTown,
              hood: venueTown === "Portland" ? (newVenue.hood || profile.hood || "") : "",
              emoji: vt?.icon || "📍",
            };

            const savedVenue = await createVenueSubmission(session.user.id, venuePayload);
            setDbVenues(v => [savedVenue, ...v]);

            setSelectedVenue(savedVenue.name);
            setNewVenue({ name:"", addr:"", type:"", perks:[] });
            setShowAddVenue(false);

            try {
              await fetch("/api/venue-submission-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: savedVenue.name,
                  addr: savedVenue.addr,
                  town: savedVenue.town,
                  hood: savedVenue.hood,
                  submittedBy: session.user.email,
                }),
              });
            } catch (e) {
              console.error("Venue email notification failed:", e);
            }
          } catch (e) {
            console.error("Failed to submit venue:", e);
          }
        })();
        return;
      }

      const vt = VENUE_TYPES.find(v => v.type === newVenue.type);
      const venueTown = newVenue.town || profile.town || "Portland";
      const venueHood = venueTown === "Portland" ? (newVenue.hood || profile.hood || "") : "";
      setUserVenues(v => [...v, { ...newVenue, emoji: vt?.icon || "📍", pending: true, town: venueTown, hood: venueHood }]);
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
        if (_event === "TOKEN_REFRESHED") return;
        setSession(session);
        setAuthReady(true);
      });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!enableAuth) {
      console.warn("Auth is disabled. App is running in preview/local-only mode.");
    }
  }, [enableAuth]);

  useEffect(() => {
    if (!authReady || !session?.user?.id) return;

    (async () => {
      try {
        const venues = await fetchVenues(session.user.id);
        setDbVenues(venues);
      } catch (e) {
        console.error("Failed to load venues:", e);
      }
    })();
  }, [authReady, session?.user?.id]);

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
            avatar_url: remoteProfile.avatar_url || "",
            email: session?.user?.email || "",
            tone: remoteProfile.tone || "",
            bio: remoteProfile.bio || "",
            role: remoteProfile.role || "",
            goals: remoteProfile.goals || "",
            referral_source: remoteProfile.referral_source || "",
          }));
          setKids((remoteKids || []).map(k => ({
            name: k.name,
            age: k.age,
            emoji: k.emoji,
          })));
          setHasProfile(true);
          setObStep(4);
        } else {
          setHasProfile(false);
          setObStep(0);
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
  }, [authReady, session?.user?.id]);

  useEffect(() => {
    if (!session) return;
    if (hasProfile) return;
    if (obStep !== 5) return;

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
    if (!authReady) return;
    if (!session?.user?.id) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    (async () => {
      try {
        const [pds, rsvps] = await Promise.all([
          fetchPlaydates(),
          fetchRsvps()
        ]);
        setDbPlaydates(pds);
        setDbRsvps(rsvps);
      } catch (e) {
        console.error("Failed to load playdates or RSVPs:", e);
      }
    })();
  }, [authReady, session]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const map = {};
    for (const r of dbRsvps) {
      if (r.profile_id === session.user.id) {
        map[r.playdate_id] = true;
      }
    }
    setJoined(j => ({ ...j, ...map }));
  }, [dbRsvps, session]);

  useEffect(() => {
    const hasSeenPreviewModal = localStorage.getItem("ppd_seen_preview_modal") === "true";
    if (!hasSeenPreviewModal && obStep === 4) {
      setShowPreviewModal(true);
      localStorage.setItem("ppd_seen_preview_modal", "true");
    }
  }, []);

  useEffect(() => {
    const shouldShowPreview = localStorage.getItem("ppd_show_preview") === "true";
    if (shouldShowPreview) {
      localStorage.removeItem("ppd_show_preview");
      setShowPreviewModal(true);
    }
  }, []);

  useEffect(() => {
    if (!authReady) return;
    (async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=43.6615&longitude=-70.2553&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=14"
        );
        const data = await res.json();
        const cache = {};
        (data.daily.time || []).forEach((date, i) => {
          const code = data.daily.weathercode[i];
          const high = Math.round(data.daily.temperature_2m_max[i]);
          const low = Math.round(data.daily.temperature_2m_min[i]);
          const emoji = weatherCodeToEmoji(code);
          cache[date] = `${emoji} ${high}°F · ${weatherDescFromCode(code)}`;
        });
        setWeatherCache(cache);
      } catch (e) {
        console.error("Weather fetch failed:", e);
      }
    })();
  }, [authReady]);

  const isCreateDisabled = !formData.title || !selectedVenue;
  let submitHelper = "";
  if (!formData.title && !selectedVenue) {
    submitHelper = "Add a name and choose a venue to continue";
  } else if (!formData.title) {
    submitHelper = "Add a playdate name to continue";
  } else if (!selectedVenue) {
    submitHelper = "Choose a venue to continue";
  }

  const formatAgeRange = (ages) => {
    if (!ages || ages.length === 0) return "All ages";
    if (ages.length === 1) return `Ages ${ages[0]}`;

    const parsed = ages
      .map(label => {
        const match = label.match(/(\d+)\D+(\d+)/);
        if (!match) return null;
        return {
          min: Number(match[1]),
          max: Number(match[2]),
        };
      })
      .filter(Boolean);

    if (parsed.length === 0) return `Ages ${ages.join(", ")}`;

    const min = Math.min(...parsed.map(a => a.min));
    const max = Math.max(...parsed.map(a => a.max));

    return `Ages ${min}–${max}`;
  };

  const handleCreate = async () => {
    if (isCreatingRef.current) return;
    isCreatingRef.current = true;

    try {
    if (!formData.title || !selectedVenue) {
      return;
    }
    const v = allVenues.find(v => v.name === selectedVenue);
    const venueTown = v?.town || profile.town || "Portland";
    const venueHood =
      venueTown === "Portland"
        ? (v?.hood || profile.hood || "")
        : "";
    const hoodNameForPin = venueHood || venueTown || "Portland";
    const pin = HOOD_PIN_DEFAULTS[hoodNameForPin] || HOOD_PIN_DEFAULTS.default;

    if (session?.user?.id) {
      const playdatePayload = {
        title: formData.title,
        venue: v?.name || selectedVenue,
        addr: v?.addr || "",
        town: venueTown,
        hood: venueHood,
        date: formData.date,
        time: formData.time,
        ages: formatAgeRange(selectedAges),
        description: formData.description || "",
        emoji: v?.emoji || "🌟",
        max_kids: null
      };

      const generateDates = (startDate, frequency, count) => {
        if (!startDate) return [];
        const base = new Date(`${startDate}T12:00:00`);
        if (isNaN(base.getTime())) return [];
        const dates = [];
        for (let i = 0; i < count; i++) {
          const d = new Date(
            base.getFullYear(),
            base.getMonth() + (frequency === "monthly" ? i : 0),
            base.getDate() + (frequency === "weekly" ? i * 7 :
                              frequency === "biweekly" ? i * 14 : 0)
          );
          dates.push(d.toISOString().split("T")[0]);
        }
        return dates;
      };

      try {
        if (isRecurring) {
          if (!formData.date) {
            alert("Please add a start date for recurring playdates.");
            return;
          }
          const recurringDates = generateDates(
            formData.date, recurringFrequency, 3
          );
          if (!recurringDates.length) {
            alert("Could not generate dates. Please check the start date.");
            return;
          }
          for (const date of recurringDates) {
            const newPd = await createPlaydate(session.user.id, {
              ...playdatePayload,
              date,
            });
            if (coverPhoto && newPd?.id) {
              try {
                await uploadPlaydateCover(newPd.id, coverPhoto);
              } catch (e) {
                console.error("Failed to upload cover photo:", e);
              }
            }
            try {
              await joinPlaydate(newPd.id, session.user.id);
            } catch (e) {
              console.error("Failed to auto-RSVP:", e);
            }
          }
        } else {
          const newPd = await createPlaydate(session.user.id, playdatePayload);
          if (coverPhoto && newPd?.id) {
            try {
              await uploadPlaydateCover(newPd.id, coverPhoto);
            } catch (e) {
              console.error("Failed to upload cover photo:", e);
            }
          }
          try {
            await joinPlaydate(newPd.id, session.user.id);
          } catch (e) {
            console.error("Failed to auto-RSVP:", e);
          }
        }
      } catch (e) {
        console.error("Failed to create playdate:", e);
        return;
      }

      try {
        const [pds, rsvps] = await Promise.all([fetchPlaydates(), fetchRsvps()]);
        setDbPlaydates(pds);
        setDbRsvps(rsvps);
      } catch (e) {
        console.error("Failed to refresh playdates after create:", e);
      }

      setShowCreate(false);
      setFormData({ title:"", date:"", time:"", description: "" });
      setCoverPhoto(null);
      setCoverPhotoPreview(null);
      setIsRecurring(false);
      setRecurringFrequency("weekly");
      setSelectedAges([]);
      setSelectedVenue(null);
      setShowAddVenue(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setCreated(p => [
      {
        id: Date.now(),
        town: venueTown,
        emoji: v?.emoji || "🌟",
        bg: "linear-gradient(135deg,#FDF0E8,#EDB99E)",
        title: formData.title,
        venue: v?.name || selectedVenue,
        addr: v?.addr || "",
        hood: venueHood || "",
        ages: formatAgeRange(selectedAges),
        date: formatPlaydateTime(formData.date, formData.time),
        weather: "📍 Your event",
        attendees: ["🧡"],
        count: 1,
        host: profile.name || "You",
        description: formData.description || "",
        x: pin.x,
        y: pin.y,
      },
      ...p,
    ]);
    setShowCreate(false);
    setFormData({ title:"", date:"", time:"", description: "" });
    setCoverPhoto(null);
    setCoverPhotoPreview(null);
    setIsRecurring(false);
    setRecurringFrequency("weekly");
    setSelectedAges([]);
    setSelectedVenue(null);
    setShowAddVenue(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    } finally {
      isCreatingRef.current = false;
    }
  };

  return (
    <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
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
        handleToggleJoin={handleToggleJoin}
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
        setActiveTowns={setActiveTowns}
        toggleTown={toggleTown}
        townLabel={townLabel}
        selectedTownNames={selectedTownNames}
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
        coverPhoto={coverPhoto}
        setCoverPhoto={setCoverPhoto}
        coverPhotoPreview={coverPhotoPreview}
        setCoverPhotoPreview={setCoverPhotoPreview}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        recurringFrequency={recurringFrequency}
        setRecurringFrequency={setRecurringFrequency}
        formData={formData}
        setFormData={setFormData}
        created={created}
        setCreated={setCreated}
        activeNav={activeNav}
        handleSetActiveNav={handleSetActiveNav}
        myDatesTab={myDatesTab}
        setMyDatesTab={setMyDatesTab}
        showToast={showToast}
        setShowToast={setShowToast}
        setDbPlaydates={setDbPlaydates}
        setDbRsvps={setDbRsvps}
        allVenues={allVenues}
        featuredVenues={featuredVenues}
        allDates={allDates}
        filtered={filtered}
        upcomingFiltered={upcomingFiltered}
        pastFiltered={pastFiltered}
        farAwayFiltered={farAwayFiltered}
        activePd={activePd}
        goingDates={goingDates}
        hostingDates={hostingDates}
        pastDates={pastDates}
        isCreateDisabled={isCreateDisabled}
        submitHelper={submitHelper}
        handleCreate={handleCreate}
        saveNewVenue={saveNewVenue}
        handleShare={handleShare}
        topbarCopied={topbarCopied}
        handleRestart={handleRestart}
        weatherCache={weatherCache}
        installPrompt={installPrompt}
        showInstallBanner={showInstallBanner}
        setShowInstallBanner={setShowInstallBanner}
        showIosBanner={showIosBanner}
        setShowIosBanner={setShowIosBanner}
      />} />
    </Routes>
  );
}
