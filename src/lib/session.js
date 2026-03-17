import { supabase } from "./supabase";

export const getDefaultProfile = () => ({
  name: "",
  hood: "",
  avatar: "",
  town: "",
  tone: "",
});

export const getDefaultSession = () => ({
  obStep: 0,
  profile: getDefaultProfile(),
  kids: [],
});

export function loadSession() {
  const base = getDefaultSession();
  try {
    const saved = localStorage.getItem("ppd_beta_session");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...base,
        ...parsed,
        profile: {
          ...base.profile,
          ...(parsed.profile || {}),
        },
        kids: Array.isArray(parsed.kids) ? parsed.kids : [],
      };
    }
  } catch (e) {
    // ignore parse errors
  }
  return base;
}

export async function getCurrentUser() {
  return await supabase.auth.getUser();
}

export async function fetchProfileAndKids(userId) {
  const profileRes = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (profileRes.error) {
    throw profileRes.error;
  }

  const kidsRes = await supabase
    .from("kids")
    .select("*")
    .eq("profile_id", userId);

  if (kidsRes.error) {
    throw kidsRes.error;
  }

  return { profile: profileRes.data || null, kids: kidsRes.data || [] };
}

export async function upsertProfile(userId, profile) {
  const payload = {
    id: userId,
    name: profile?.name || "",
    town: profile?.town || "",
    hood: profile?.hood || "",
    avatar: profile?.avatar || "",
    tone: profile?.tone || "",
    bio: profile?.bio || "",
  };

  const res = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (res.error) {
    throw res.error;
  }
  return res.data;
}

export async function replaceKids(userId, kids) {
  const delRes = await supabase
    .from("kids")
    .delete()
    .eq("profile_id", userId);

  if (delRes.error) {
    throw delRes.error;
  }

  const rows = (kids || []).map(k => ({
    profile_id: userId,
    name: k.name,
    age: k.age,
    emoji: k.emoji,
  }));

  if (rows.length === 0) {
    return [];
  }

  const insRes = await supabase
    .from("kids")
    .insert(rows);

  if (insRes.error) {
    throw insRes.error;
  }

  return insRes.data;
}

