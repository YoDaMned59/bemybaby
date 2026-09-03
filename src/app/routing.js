/**
 * Helpers URL pour le gate d’auth (hors React).
 */

export function normalizePathname(pathname) {
  if (typeof pathname !== "string" || !pathname) {
    return "/";
  }
  return pathname.replace(/\/+$/, "") || "/";
}

export function isPrivacyPath(pathname) {
  return normalizePathname(pathname) === "/confidentialite";
}

export function isSafeInternalPath(path) {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//")
  );
}
