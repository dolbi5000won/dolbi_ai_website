import type { Metadata } from "next";
import { ApplicationStatusSelect } from "@/components/admin/ApplicationStatusSelect";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "교육 신청",
};

export default async function AdminApplicationsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("course_applications")
    .select("*, courses(title, slug)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-semibold">교육 신청 내역</h1>
      <p className="mt-2 text-sm text-slate-600">신청 상태를 관리합니다.</p>
      {error ? (
        <p className="mt-6 text-sm text-red-600">목록을 불러오지 못했습니다.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">접수</th>
                <th className="px-4 py-3 font-medium">과정</th>
                <th className="px-4 py-3 font-medium">신청자</th>
                <th className="px-4 py-3 font-medium">인원/희망일</th>
                <th className="px-4 py-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => {
                const course = Array.isArray(row.courses)
                  ? row.courses[0]
                  : row.courses;
                return (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 align-top"
                  >
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(row.created_at).toLocaleString("ko-KR")}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {course?.title ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{row.applicant_name}</p>
                      <p className="text-slate-500">{row.email}</p>
                      <p className="text-slate-500">{row.phone}</p>
                      {row.message ? (
                        <p className="mt-1 max-w-sm whitespace-pre-wrap text-slate-600">
                          {row.message}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <p>{row.participant_count}명</p>
                      <p className="text-slate-500">
                        {row.preferred_date ?? "-"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ApplicationStatusSelect id={row.id} value={row.status} />
                    </td>
                  </tr>
                );
              })}
              {(data ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    접수된 교육 신청이 없습니다.
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
