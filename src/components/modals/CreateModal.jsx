import { useRef } from "react";
import { AGE_GROUPS, VENUE_TYPES, VENUE_PERKS } from "../../constants";

export function CreateModal({
  showCreate,
  setShowCreate,
  showAddVenue,
  setShowAddVenue,
  formData,
  setFormData,
  allVenues,
  selectedVenue,
  setSelectedVenue,
  newVenue,
  setNewVenue,
  saveNewVenue,
  coverPhoto,
  setCoverPhoto,
  coverPhotoPreview,
  setCoverPhotoPreview,
  isRecurring,
  setIsRecurring,
  recurringFrequency,
  setRecurringFrequency,
  selectedAges,
  setSelectedAges,
  isCreateDisabled,
  submitHelper,
  handleCreate,
}) {
  const coverInputRef = useRef(null);

  if (!showCreate) return null;

  return (
    <div className="modal-overlay" onClick={() => { setShowCreate(false); setShowAddVenue(false); }}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle"/>
        <h2>Host a Playdate ⚓</h2>
        <div className="create-field">
          <label className="create-label">
            Cover photo
            <span className="create-optional">optional</span>
          </label>

          {coverPhotoPreview ? (
            <div className="cover-photo-preview-wrap">
              <img
                src={coverPhotoPreview}
                alt="Cover preview"
                className="cover-photo-preview"
              />
              <button
                type="button"
                className="cover-photo-remove"
                onClick={() => {
                  setCoverPhoto(null);
                  setCoverPhotoPreview(null);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="cover-photo-upload-btn"
              onClick={() => coverInputRef.current?.click()}
            >
              📷 Add a cover photo
            </div>
          )}

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              setCoverPhoto(file);
              const reader = new FileReader();
              reader.onload = ev => setCoverPhotoPreview(ev.target.result);
              reader.readAsDataURL(file);
              e.target.value = "";
            }}
          />
        </div>
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
        <div className="create-field">
          <label className="create-label">
            Description
            <span className="create-optional">optional</span>
          </label>
          <textarea
            className="create-textarea"
            placeholder="What should parents know? Who is it for, what to expect, anything to bring..."
            value={formData.description}
            onChange={e => setFormData(f => ({
              ...f, description: e.target.value
            }))}
            rows={3}
          />
        </div>

        <div className="create-field">
          <label className="create-label">Repeats</label>
          <div className="recurring-toggle">
            <button
              type="button"
              className={`recurring-btn ${!isRecurring ? "active" : ""}`}
              onClick={() => setIsRecurring(false)}
            >
              One time
            </button>
            <button
              type="button"
              className={`recurring-btn ${isRecurring ? "active" : ""}`}
              onClick={() => setIsRecurring(true)}
            >
              Recurring
            </button>
          </div>
          {isRecurring && (
            <div className="recurring-frequency">
              {["weekly", "biweekly", "monthly"].map(freq => (
                <button
                  key={freq}
                  type="button"
                  className={`freq-btn ${recurringFrequency === freq ? "active" : ""}`}
                  onClick={() => setRecurringFrequency(freq)}
                >
                  {freq === "weekly" ? "Every week" :
                   freq === "biweekly" ? "Every 2 weeks" :
                   "Every month"}
                </button>
              ))}
            </div>
          )}
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
  );
}

