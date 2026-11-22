"use client";

import { updateInquiryStatus } from "@/app/actions/admin-content";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { InquiryStatus } from "@/lib/supabase/types";

const STATUS_OPTIONS = [
  { value: "pending", label: "대기" },
  { value: "in_progress", label: "진행중" },
  { value: "done", label: "완료" },
  { value: "spam", label: "스팸" },
] as const;

export function InquiryStatusSelect({
  id,
  value,
}: {
  id: string;
  value: InquiryStatus;
}) {
  return (
    <StatusSelect
      value={value}
      options={STATUS_OPTIONS}
      onChange={async (next) => updateInquiryStatus(id, next as InquiryStatus)}
    />
  );
}
