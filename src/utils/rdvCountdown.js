/** @param {string} iso YYYY-MM-DD */
export function daysFromToday(iso) {
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return null;
  }
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = target.getTime() - t0.getTime();
  return Math.round(diffMs / (24 * 60 * 60 * 1000));
}

/** @param {string} iso YYYY-MM-DD */
export function formatRdvCountdown(iso) {
  const n = daysFromToday(iso);
  if (n === null) {
    return "";
  }
  if (n < 0) {
    return `il y a ${-n} jour${-n > 1 ? "s" : ""}`;
  }
  if (n === 0) {
    return "aujourd’hui";
  }
  if (n === 1) {
    return "demain";
  }
  return `dans ${n} jours`;
}

/** @param {string} iso YYYY-MM-DD */
export function formatRdvLongDate(iso) {
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return "";
  }
  const [y, mo, day] = iso.split("-").map(Number);
  const dt = new Date(y, mo - 1, day);
  const raw = dt.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return raw.length ? raw.charAt(0).toUpperCase() + raw.slice(1) : "";
}
