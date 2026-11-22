"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions/admin-auth";

const LINKS = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/inquiries", label: "상담" },
  { href: "/admin/applications", label: "교육 신청" },
  { href: "/admin/courses", label: "교육 과정" },
  { href: "/admin/projects", label: "프로젝트" },
  { href: "/admin/insights", label: "인사이트" },
] as const;

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="text-sm font-semibold tracking-[0.12em] text-brand-navy">
            DOLBI ADMIN
          </Link>
          <p className="text-xs text-slate-500 lg:hidden">{email}</p>
        </div>
        <nav className="flex flex-wrap gap-1" aria-label="관리자 메뉴">
          {LINKS.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm ${
                  active
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-slate-500 lg:block">{email}</p>
          <form action={adminLogout}>
            <button
              type="submit"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-brand-blue hover:text-brand-blue"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
