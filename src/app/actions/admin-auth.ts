"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type LoginResult =
  | { ok: true }
  | { ok: false; message: string };

export async function adminLogin(
  email: string,
  password: string,
): Promise<LoginResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "관리자 시스템이 아직 연결되지 않았습니다.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { ok: false, message: "이메일과 비밀번호를 입력해 주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error || !data.user) {
    return { ok: false, message: "로그인에 실패했습니다." };
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    return { ok: false, message: "관리자 권한이 없습니다." };
  }

  return { ok: true };
}

export async function adminLogout() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
