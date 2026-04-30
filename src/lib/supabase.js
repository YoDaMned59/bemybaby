import { createClient } from "@supabase/supabase-js";

/** Vercel + Vite : préférer VITE_* ; sinon noms fournis par l’intégration Supabase (NEXT_PUBLIC_*). */
const url =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const anon =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const disabled = import.meta.env.VITE_DISABLE_SUPABASE === "true";

/** @type {import("@supabase/supabase-js").SupabaseClient | null} */
let client = null;

export function isSupabaseConfigured() {
  return Boolean(url && anon && !disabled);
}

/** @returns {import("@supabase/supabase-js").SupabaseClient | null} */
export function getSupabase() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!client) {
    client = createClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
