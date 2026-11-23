import Link from "next/link";
import { BRAND, FOOTER_LINKS, MAIN_NAV } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const SERVICE_LINKS = MAIN_NAV.filter((item) =>
  ["/automation", "/development", "/academy"].includes(item.href),
);

const EXPLORE_LINKS = MAIN_NAV.filter((item) =>
  ["/project", "/insight"].includes(item.href),
);

export function Footer() {
  const columns = [
    { title: "Services", links: SERVICE_LINKS },
    { title: "Explore", links: EXPLORE_LINKS },
    { title: "Company", links: FOOTER_LINKS },
  ];

  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white">
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              {BRAND.sloganKo}
              <br />
              {BRAND.company}가 운영하는 AI 전문 브랜드입니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={`푸터 ${column.title}`}>
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/75 transition-colors hover:text-brand-cyan"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none whitespace-nowrap text-[15vw] leading-[0.85] font-bold tracking-[-0.04em] text-white/[0.05] lg:text-[9.5rem]"
        >
          {BRAND.sloganEn}
        </p>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {BRAND.name}. Operated by {BRAND.company}.
          </p>
          <p className="font-mono tracking-wide">
            AI Automation · AI Development · AI Academy
          </p>
        </div>
      </div>
    </footer>
  );
}
