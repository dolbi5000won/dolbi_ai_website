"use client";

import { updateApplicationStatus } from "@/app/actions/admin-content";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { ApplicationStatus } from "@/lib/supabase/types";

const STATUS_OPTIONS = [
  { value: "pending", label: "대기" },
  { value: "confirmed", label: "확정" },
  { value: "cancelled", label: "취소" },
  { value: "completed", label: "완료" },
] as const;

export function ApplicationStatusSelect({
  id,
  value,
}: {
  id: string;
  value: ApplicationStatus;
}) {
  return (
    <StatusSelect
      value={value}
      options={STATUS_OPTIONS}
      onChange={async (next) =>
        updateApplicationStatus(id, next as ApplicationStatus)
      }
    />
  );
}
