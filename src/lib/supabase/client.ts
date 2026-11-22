import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  const publicEnv = getSupabasePublicEnv();
  if (!publicEnv) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return createBrowserClient<Database>(publicEnv.url, publicEnv.anonKey);
}
