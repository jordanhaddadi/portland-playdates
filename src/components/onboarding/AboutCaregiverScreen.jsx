import { useEffect } from "react";

export function AboutCaregiverScreen({ onDone, onBack, profile, setProfile }) {
  const isExistingUserEditing = !!(profile?.name || "").trim();
  const roleOptions = [
    "Parent",
    "Nanny",
    "Au Pair",
    "Grandparent",
    "Other caregiver",
  ];

  const goalsOptions = [
    "Playdate friends for my kids",
    "Parent community for me",
    "Outdoor activities",
    "Indoor activities",
    "Classes and events",
    "Local recommendations",
  ];

  const referralOptions = [
    "Facebook group",
    "Instagram",
    "Friend or family",
    "Google search",
    "My daycare or school",
    "Other",
  ];

  const selectedGoals = (profile.goals || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const toggleGoal = (goal) => {
    const next = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal];
    setProfile(p => ({ ...p, goals: next.join(", ") }));
  };

  useEffect(() => {
    console.log("AboutCaregiverScreen profile.role:", profile?.role || "");
  }, []);

  return (
    <div className="ob-screen">
      <div className="ob-card">
        <button className="ob-back" onClick={onBack}>← Back</button>
        <div className="ob-step-label">{isExistingUserEditing ? "Preferences" : "Final step"}</div>
        <div className="ob-title">A little about you</div>

        <div className="caregiver-notice">
          🛡️ Portland PlayDates is exclusively for parents, caregivers, nannies,
          grandparents and au pairs. By continuing you confirm you are here in a
          caregiving role.
        </div>

        <div className="ob-field">
          <div className="ob-label">I am a...</div>
          <div className="caregiver-role-chips">
            {roleOptions.map(opt => (
              <button
                key={opt}
                type="button"
                className={`town-chip ${profile.role === opt ? "active" : ""}`}
                onClick={() => {
                  const selectedRole = opt;
                  setProfile(p => ({ ...p, role: selectedRole }));
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="ob-field">
          <div className="ob-label">What are you hoping to find?</div>
          <div className="caregiver-goals-chips">
            {goalsOptions.map(opt => (
              <button
                key={opt}
                type="button"
                className={`town-chip ${selectedGoals.includes(opt) ? "active" : ""}`}
                onClick={() => toggleGoal(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="ob-field">
          <label className="ob-label">How did you hear about Portland PlayDates?</label>
          <select
            className="ob-select"
            value={profile.referral_source || ""}
            onChange={(e) => setProfile(p => ({ ...p, referral_source: e.target.value }))}
          >
            <option value="">Select one (optional)</option>
            {referralOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <button
          className="ob-btn-primary"
          disabled={!profile.role}
          onClick={onDone}
        >
          {isExistingUserEditing ? "Save preferences" : "Let's find playdates! 🎉"}
        </button>
      </div>
    </div>
  );
}

