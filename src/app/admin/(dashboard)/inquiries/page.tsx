import type { Metadata } from "next";
import { InquiryStatusSelect } from "@/components/admin/InquiryStatusSelect";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { INQUIRY_TYPE_OPTIONS } from "@/lib/validation/inquiry";

export const metadata: Metadata = {
  title: "상담 내역",
};

function typeLabel(value: string) {
  return (
    INQUIRY_TYPE_OPTIONS.find((item) => item.value === value)?.label ?? value
  );
}

export default async function AdminInquiriesPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-semibold">상담 내역</h1>
      <p className="mt-2 text-sm text-slate-600">
        최근 100건까지 조회하며 상태를 변경할 수 있습니다.
      </p>
      {error ? (
        <p className="mt-6 text-sm text-red-600">목록을 불러오지 못했습니다.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">접수</th>
                <th className="px-4 py-3 font-medium">유형</th>
                <th className="px-4 py-3 font-medium">신청자</th>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-slate-100 align-top">
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(row.created_at).toLocaleString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">{typeLabel(row.inquiry_type)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{row.name}</p>
                    <p className="text-slate-500">{row.email}</p>
                    <p className="text-slate-500">{row.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{row.subject}</p>
                    <p className="mt-1 max-w-md whitespace-pre-wrap text-slate-600">
                      {row.message}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <InquiryStatusSelect id={row.id} value={row.status} />
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    접수된 상담이 없습니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
