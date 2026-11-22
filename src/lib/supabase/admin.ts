import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import {
  getSupabasePublicEnv,
  getSupabaseServiceKey,
} from "@/lib/supabase/env";

export function createAdminClient() {
  const publicEnv = getSupabasePublicEnv();
  const serviceKey = getSupabaseServiceKey();

  if (!publicEnv || !serviceKey) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return createClient<Database>(publicEnv.url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
