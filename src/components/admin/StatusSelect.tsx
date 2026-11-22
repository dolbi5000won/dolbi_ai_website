"use client";

import { useTransition } from "react";

type StatusSelectProps = {
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => Promise<{ ok: boolean; message?: string }>;
};

export function StatusSelect({ value, options, onChange }: StatusSelectProps) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
      value={value}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value;
        startTransition(async () => {
          const result = await onChange(next);
          if (!result.ok) {
            window.alert(result.message ?? "변경에 실패했습니다.");
          }
        });
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
