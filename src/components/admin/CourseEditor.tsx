"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveCourse } from "@/app/actions/admin-content";
import { FormMessage } from "@/components/forms/FormMessage";
import { Button } from "@/components/ui/Button";

type CourseEditorProps = {
  initial?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    target_audience: string;
    curriculum: string[];
    duration: string;
    difficulty: string;
    price: number | null;
    is_active: boolean;
  };
};

export function CourseEditor({ initial }: CourseEditorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [values, setValues] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    target_audience: initial?.target_audience ?? "",
    curriculumText: (initial?.curriculum ?? []).join("\n"),
    duration: initial?.duration ?? "",
    difficulty: initial?.difficulty ?? "입문",
    price: initial?.price?.toString() ?? "",
    is_active: initial?.is_active ?? true,
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const result = await saveCourse({
            id: initial?.id,
            ...values,
          });
          if (!result.ok) {
            setMessage(result.message);
            return;
          }
          router.push("/admin/courses");
          router.refresh();
        });
      }}
    >
      {message ? <FormMessage tone="error">{message}</FormMessage> : null}
      <Field label="제목">
        <input
          className={inputClass}
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          required
        />
      </Field>
      <Field label="슬러그">
        <input
          className={inputClass}
          value={values.slug}
          onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))}
          required
        />
      </Field>
      <Field label="설명">
        <textarea
          className={inputClass}
          rows={4}
          value={values.description}
          onChange={(e) =>
            setValues((v) => ({ ...v, description: e.target.value }))
          }
          required
        />
      </Field>
      <Field label="대상">
        <input
          className={inputClass}
          value={values.target_audience}
          onChange={(e) =>
            setValues((v) => ({ ...v, target_audience: e.target.value }))
          }
          required
        />
      </Field>
      <Field label="커리큘럼 (줄바꿈 구분)">
        <textarea
          className={inputClass}
          rows={5}
          value={values.curriculumText}
          onChange={(e) =>
            setValues((v) => ({ ...v, curriculumText: e.target.value }))
          }
          required
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="기간">
          <input
            className={inputClass}
            value={values.duration}
            onChange={(e) =>
              setValues((v) => ({ ...v, duration: e.target.value }))
            }
            required
          />
        </Field>
        <Field label="난이도">
          <select
            className={inputClass}
            value={values.difficulty}
            onChange={(e) =>
              setValues((v) => ({ ...v, difficulty: e.target.value }))
            }
          >
            {["입문", "중급", "실전", "맞춤"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="가격(원, 선택)">
          <input
            className={inputClass}
            inputMode="numeric"
            value={values.price}
            onChange={(e) => setValues((v) => ({ ...v, price: e.target.value }))}
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={values.is_active}
          onChange={(e) =>
            setValues((v) => ({ ...v, is_active: e.target.checked }))
          }
        />
        활성 과정
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-brand-navy">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";
