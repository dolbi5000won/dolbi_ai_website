"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveInsight } from "@/app/actions/admin-content";
import { FormMessage } from "@/components/forms/FormMessage";
import { Button } from "@/components/ui/Button";

type InsightEditorProps = {
  initial?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string;
    content: string;
    thumbnail: string | null;
    is_published: boolean;
  };
};

export function InsightEditor({ initial }: InsightEditorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [values, setValues] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? "AI 기술 정보",
    summary: initial?.summary ?? "",
    content: initial?.content ?? "",
    thumbnail: initial?.thumbnail ?? "",
    is_published: initial?.is_published ?? false,
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const result = await saveInsight({
            id: initial?.id,
            ...values,
          });
          if (!result.ok) {
            setMessage(result.message);
            return;
          }
          router.push("/admin/insights");
          router.refresh();
        });
      }}
    >
      {message ? <FormMessage tone="error">{message}</FormMessage> : null}
      <Field label="제목">
        <input className={inputClass} value={values.title} onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))} required />
      </Field>
      <Field label="슬러그">
        <input className={inputClass} value={values.slug} onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))} required />
      </Field>
      <Field label="카테고리">
        <input className={inputClass} value={values.category} onChange={(e) => setValues((v) => ({ ...v, category: e.target.value }))} required />
      </Field>
      <Field label="요약">
        <textarea className={inputClass} rows={3} value={values.summary} onChange={(e) => setValues((v) => ({ ...v, summary: e.target.value }))} required />
      </Field>
      <Field label="본문">
        <textarea className={inputClass} rows={10} value={values.content} onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))} required />
      </Field>
      <Field label="썸네일 URL (선택)">
        <input className={inputClass} value={values.thumbnail} onChange={(e) => setValues((v) => ({ ...v, thumbnail: e.target.value }))} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={values.is_published} onChange={(e) => setValues((v) => ({ ...v, is_published: e.target.checked }))} />
        공개
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-brand-navy">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";
