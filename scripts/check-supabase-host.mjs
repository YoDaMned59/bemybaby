/**
 * Lit .env minimal (sans dépendance) et vérifie que l’hôte Supabase résout en DNS.
 * Usage : node scripts/check-supabase-host.mjs
 */
import fs from "node:fs";
import dns from "node:dns/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env");

function extractEnvValue(text, key) {
  const re = new RegExp(
    "^\\s*" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*=\\s*(.*)$",
    "m"
  );
  const m = text.match(re);
  if (!m) {
    return "";
  }
  let v = m[1].trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  const pound = v.indexOf(" #");
  if (pound !== -1) {
    v = v.slice(0, pound).trim();
  }
  return v;
}

function normalizeSupabaseHttpsUrl(raw) {
  let s = raw.replace(/^\ufeff/, "").trim();
  const hash = s.indexOf("#");
  if (hash !== -1 && !s.includes("://")) {
    s = s.slice(0, hash).trim();
  }
  try {
    const u = new URL(s);
    if (u.protocol !== "https:") {
      return null;
    }
    u.hostname = normalizeHostSegment(u.hostname);
    u.pathname = "";
    u.search = "";
    u.hash = "";
    return u.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function normalizeHostSegment(hostname) {
  return hostname.replace(/\u200b|\u200c|\u200d|\ufeff/g, "").toLowerCase();
}

let raw = "";
try {
  raw = fs.readFileSync(envPath, "utf8");
} catch {
  console.error("Fichier .env introuvable à la racine du projet.");
  process.exit(1);
}

let urlStr =
  extractEnvValue(raw, "VITE_SUPABASE_URL") ||
  extractEnvValue(raw, "NEXT_PUBLIC_SUPABASE_URL");

if (!urlStr) {
  console.error(
    "Aucune URL Supabase trouvée (VITE_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_URL)."
  );
  process.exit(1);
}

urlStr = urlStr.trim();

const canonical = normalizeSupabaseHttpsUrl(urlStr);
if (!canonical) {
  console.error(
    "VITE_SUPABASE_URL doit être une URL HTTPS (ex : https://xxxxx.supabase.co), sans parasite sur la ligne."
  );
  console.error("Valeur brute (extrait) :", JSON.stringify(urlStr.slice(0, 140)));
  process.exit(1);
}

const host = normalizeHostSegment(new URL(canonical).hostname);

console.log("URL normalisée :", canonical);
console.log("Hôte DNS testé :", host);

const suffix = ".supabase.co";
if (!host.endsWith(suffix)) {
  console.warn(
    "Hôte différent de *.supabase.co — vérifie domaine perso ou branche dans le tableau."
  );
}

const projectRef = host.endsWith(suffix) ? host.slice(0, -suffix.length) : "";
if (
  projectRef &&
  (!/^[a-z0-9]+$/.test(projectRef) || projectRef.includes("."))
) {
  console.warn(
    "Forme inhabituelle pour la référence projet : « " + projectRef + " »"
  );
}

let v4Ok = false;
let v6Ok = false;
try {
  await dns.resolve4(host);
  v4Ok = true;
} catch {
  //
}
try {
  await dns.resolve6(host);
  v6Ok = true;
} catch {
  //
}

if (v4Ok || v6Ok) {
  console.log("OK — DNS résout ce nom (IPv" + (v4Ok ? "4" : "6") + ").");
  if (!v4Ok && v6Ok) {
    console.log(
      "Note — pas de A (IPv4) ; vérif compat résolveur / docs Supabase (IPv6)."
    );
  }
  process.exit(0);
}

console.error("");
console.error(
  "PROBLÈME : NXDOMAIN — « " + host + " » ne figure pas dans le DNS public."
);
console.error("Chrome → ERR_NAME_NOT_RESOLVED avant même d’atteindre Supabase.");
console.error("");
console.error(
  "Souvent une lettre différente de celle du vrai tableau (copie depuis une capture, I/l/1)."
);
console.error("");
console.error("À faire depuis le tableau (pas depuis une capture) :");
console.error(
  "  • Dans la barre d’URL : …/project/<REF>/… — ce <REF> doit être celui avant .supabase.co"
);
console.error(
  "  • Ou bouton copier à côté de l’« API URL » (Data API) / « Project URL » (API)."
);
console.error(
  '  • Coller uniquement sur la ligne VITE_SUPABASE_URL= puis tester dans Chrome :'
);
console.error("    " + canonical + "/rest/v1/");
console.error("    → erreur réseau / JSON possible ; PAS « Nom d’introuvable » DNS.");
console.error("  • Vérifier projet non pausé (Supabase).");
console.error("");
process.exit(2);
