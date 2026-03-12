export function loadSession() {
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

