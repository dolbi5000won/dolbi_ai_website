import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "대시보드",
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const [inquiries, applications, courses, projects, insights] =
    await Promise.all([
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("course_applications")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("courses")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("projects")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true),
      supabase
        .from("insights")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true),
    ]);

  const cards = [
    {
      href: "/admin/inquiries",
      label: "대기 중 상담",
      value: inquiries.count ?? 0,
    },
    {
      href: "/admin/applications",
      label: "대기 중 교육 신청",
      value: applications.count ?? 0,
    },
    {
      href: "/admin/courses",
      label: "활성 교육 과정",
      value: courses.count ?? 0,
    },
    {
      href: "/admin/projects",
      label: "공개 프로젝트",
      value: projects.count ?? 0,
    },
    {
      href: "/admin/insights",
      label: "공개 인사이트",
      value: insights.count ?? 0,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">대시보드</h1>
      <p className="mt-2 text-sm text-slate-600">
        상담·교육 신청과 콘텐츠를 관리합니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-blue"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-brand-navy">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
