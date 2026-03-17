import { supabase } from "./supabase";

export const getDefaultProfile = () => ({
  name: "",
  hood: "",
  avatar: "",
  avatar_url: "",
  town: "",
  tone: "",
  role: "",
  goals: "",
  referral_source: "",
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
    email: profile?.email || "",
    name: profile?.name || "",
    town: profile?.town || "",
    hood: profile?.hood || "",
    avatar: profile?.avatar || "",
    avatar_url: profile?.avatar_url || "",
    tone: profile?.tone || "",
    bio: profile?.bio || "",
    role: profile?.role || "",
    goals: profile?.goals || "",
    referral_source: profile?.referral_source || "",
  };

  const res = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (res.error) {
    throw res.error;
  }
  return res.data;
}

export async function uploadAvatar(userId, file) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (updateError) throw updateError;

  return publicUrl;
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

export async function createPlaydate(userId, form) {
  const payload = {
    ...form,
    host_id: userId,
  };

  const res = await supabase
    .from("playdates")
    .insert(payload)
    .select("*")
    .single();

  if (res.error) {
    throw res.error;
  }

  return res.data;
}

export async function fetchPlaydates() {
  const res = await supabase
    .from("playdates")
    .select(`
      *,
      host:profiles!playdates_host_id_fkey(
        name,
        avatar,
        tone
      ),
      rsvps(
        id,
        profile_id,
        profiles(
          name,
          avatar,
          tone
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (res.error) {
    throw res.error;
  }

  return res.data || [];
}

export async function fetchRsvps() {
  const res = await supabase
    .from("rsvps")
    .select(`
      *,
      profiles:profile_id (
        id,
        name,
        avatar,
        tone
      )
    `);

  if (res.error) {
    throw res.error;
  }

  return res.data || [];
}

export async function joinPlaydate(playdateId, userId) {
  const res = await supabase
    .from("rsvps")
    .insert({
      playdate_id: playdateId,
      profile_id: userId,
    })
    .select("*");

  if (res.error) throw res.error;
  return res.data;
}

export async function leavePlaydate(playdateId, userId) {
  const res = await supabase
    .from("rsvps")
    .delete()
    .eq("playdate_id", playdateId)
    .eq("profile_id", userId);

  if (res.error) {
    throw res.error;
  }

  return res.data;
}

export async function fetchVenues(userId) {
  const res = await supabase
    .from("venues")
    .select("*")
    .or(`status.eq.approved,and(status.eq.pending,submitted_by.eq.${userId})`)
    .order("created_at", { ascending: false });

  if (res.error) throw res.error;
  return res.data || [];
}

export async function createVenueSubmission(userId, venue) {
  const venueTown = venue?.town || "Portland";
  const payload = {
    name: venue?.name || "",
    addr: venue?.addr || "",
    town: venueTown,
    hood: venueTown === "Portland" ? (venue?.hood || "") : "",
    emoji: venue?.emoji || "📍",
    submitted_by: userId,
    status: "pending",
  };

  const res = await supabase
    .from("venues")
    .insert(payload)
    .select("*")
    .single();

  if (res.error) throw res.error;
  return res.data;
}

