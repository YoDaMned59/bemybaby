/**
 * @param {import("@supabase/supabase-js").User | undefined | null} user
 * @returns {boolean}
 */
export function userHasRegisteredEmail(user) {
  const e = user?.email;
  return typeof e === "string" && e.includes("@") && e.trim().length > 0;
}

/**
 * Session « purement anonyme » : pas encore d’email compte relié au même utilisateur.
 * @param {import("@supabase/supabase-js").User | undefined | null} user
 */
export function isLikelyAnonymousUser(user) {
  if (!user) {
    return true;
  }
  if (userHasRegisteredEmail(user)) {
    return false;
  }
  const ids = user.identities;
  if (
    Array.isArray(ids) &&
    ids.some((x) => x && (x.provider === "email" || x.provider === "google"))
  ) {
    return false;
  }
  if (
    Array.isArray(ids) &&
    ids.some((x) => x && x.provider === "anonymous")
  ) {
    return true;
  }
  return true;
}
