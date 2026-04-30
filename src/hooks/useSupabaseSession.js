import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "../lib/supabase";

export function useSupabaseSession() {
  const supabase = useMemo(() => getSupabase(), []);
  const [[session, loading], setSessionAndLoading] = useState(() =>
    supabase ? [null, true] : [null, false]
  );

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) {
        return;
      }
      setSessionAndLoading([data.session ?? null, false]);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSessionAndLoading([sess ?? null, false]);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { supabase, session, loading };
}
