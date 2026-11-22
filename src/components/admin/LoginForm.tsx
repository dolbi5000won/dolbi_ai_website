"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/actions/admin-auth";
import { FormMessage } from "@/components/forms/FormMessage";
import { Button } from "@/components/ui/Button";

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError ?? "");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setError("");
        startTransition(async () => {
          const result = await adminLogin(email, password);
          if (!result.ok) {
            setError(result.message);
            return;
          }
          router.replace("/admin");
          router.refresh();
        });
      }}
    >
      {error ? <FormMessage tone="error">{error}</FormMessage> : null}
      <label className="block text-sm font-medium text-brand-navy">
        이메일
        <input
          type="email"
          autoComplete="username"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm font-medium text-brand-navy">
        비밀번호
        <input
          type="password"
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "로그인 중..." : "관리자 로그인"}
      </Button>
    </form>
  );
}
