import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "프로젝트",
};

export default async function AdminProjectsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">프로젝트</h1>
          <p className="mt-2 text-sm text-slate-600">
            검증된 사례만 공개로 전환하세요.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-blue px-5 text-sm font-medium text-white hover:bg-[#1f6ad0]"
        >
          새 프로젝트
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
                <th className="px-4 py-3 font-medium">카테고리</th>
                <th className="px-4 py-3 font-medium">공개</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{row.title}</td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">
                    {row.is_published ? "공개" : "비공개"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/projects/${row.id}`}
                      className="text-brand-blue hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    등록된 프로젝트가 없습니다.
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
