import "server-only";

import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type AdminSession = {
  userId: string;
  email: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  await connection();
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const { data: adminRow, error } = await supabase
    .from("admin_users")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !adminRow) return null;

  return { userId: user.id, email: adminRow.email };
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireAdminAction(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
