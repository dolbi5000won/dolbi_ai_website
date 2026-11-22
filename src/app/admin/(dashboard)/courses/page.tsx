import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "교육 과정",
};

export default async function AdminCoursesPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">교육 과정</h1>
          <p className="mt-2 text-sm text-slate-600">과정을 등록·수정합니다.</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-blue px-5 text-sm font-medium text-white hover:bg-[#1f6ad0]"
        >
          새 과정
        </Link>
      </div>
      {error ? (
        <p className="mt-6 text-sm text-red-600">목록을 불러오지 못했습니다.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">슬러그</th>
                <th className="px-4 py-3 font-medium">난이도</th>
                <th className="px-4 py-3 font-medium">상태</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{row.title}</td>
                  <td className="px-4 py-3 text-slate-500">{row.slug}</td>
                  <td className="px-4 py-3">{row.difficulty}</td>
                  <td className="px-4 py-3">
                    {row.is_active ? "활성" : "비활성"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/courses/${row.id}`}
                      className="text-brand-blue hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
