"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { BRAND, MAIN_NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const menuId = useId();
  const isHome = pathname === "/";

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={
        isHome
          ? "sticky top-0 z-50 border-b border-white/10 bg-brand-navy text-white"
          : "sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-brand-navy backdrop-blur"
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-[0.08em]"
          aria-label={`${BRAND.name} 홈`}
        >
          {BRAND.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {MAIN_NAV.filter((item) => item.href !== "/").map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isHome
                    ? `rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/75 hover:bg-white/5 hover:text-white"
                      }`
                    : `rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
                      }`
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/contact"
            size="md"
            variant={isHome ? "ghost" : "primary"}
            className={
              isHome
                ? "hidden border border-white/25 sm:inline-flex"
                : "hidden sm:inline-flex"
            }
          >
            상담 신청
          </Button>

          <button
            type="button"
            className={
              isHome
                ? "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
                : "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-brand-navy lg:hidden"
            }
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-white/10 bg-brand-navy lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8"
            aria-label="모바일 메뉴"
          >
            {MAIN_NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-base ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-3 w-full" size="lg">
              상담 신청
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
