import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[0.08em] text-brand-navy">
              {BRAND.name}
            </p>
            <p className="mt-2 text-sm text-slate-600">{BRAND.sloganKo}</p>
            <p className="mt-1 text-sm text-slate-500">{BRAND.sloganEn}</p>
          </div>

          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-col gap-2 sm:items-end">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {BRAND.name}. Operated by {BRAND.company}.
          </p>
          <p>AI Automation · AI Development · AI Academy</p>
        </div>
      </div>
    </footer>
  );
}
