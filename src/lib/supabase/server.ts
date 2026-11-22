import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export async function createSupabaseServerClient() {
  const publicEnv = getSupabasePublicEnv();
  if (!publicEnv) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(publicEnv.url, publicEnv.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — ignore.
        }
      },
    },
  });
}
