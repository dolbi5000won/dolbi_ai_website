"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { BRAND, MAIN_NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const menuId = useId();

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-brand-navy/90 backdrop-blur-md"
          : "border-b border-transparent bg-brand-navy"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${BRAND.name} 홈`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="주요 메뉴">
          {MAIN_NAV.filter((item) => item.href !== "/").map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-brand-cyan"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button href="/contact" size="md" className="h-10">
              상담 신청
            </Button>
          </span>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((value) => !value)}
          >
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
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-brand-navy lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8"
            aria-label="모바일 메뉴"
          >
            {MAIN_NAV.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-4 border-b border-white/[0.07] px-1 py-4 text-lg font-medium ${
                    active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-xs text-brand-cyan/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-6 w-full" size="lg">
              상담 신청
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
