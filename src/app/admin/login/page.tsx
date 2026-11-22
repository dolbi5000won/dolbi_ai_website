import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { FormMessage } from "@/components/forms/FormMessage";

export const instant = false;

export const metadata: Metadata = {
  title: "로그인",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const configured = isSupabaseConfigured();
  const initialError =
    params.error === "forbidden"
      ? "관리자 권한이 없는 계정입니다."
      : undefined;

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-5 py-16">
      <p className="text-sm font-semibold tracking-[0.14em] text-brand-navy">
        DOLBI
      </p>
      <h1 className="mt-3 text-2xl font-semibold">관리자 로그인</h1>
      <p className="mt-2 text-sm text-slate-600">
        공개 회원가입은 제공하지 않습니다. 관리자 계정은 별도 발급됩니다.
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        {!configured ? (
          <FormMessage tone="info">
            Supabase 환경변수가 설정되지 않았습니다. .env.local과
            supabase/APPLY.md를 확인해 주세요.
          </FormMessage>
        ) : (
          <LoginForm initialError={initialError} />
        )}
      </div>
    </main>
  );
}
