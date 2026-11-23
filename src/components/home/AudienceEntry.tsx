import Link from "next/link";
import { AUDIENCE_ENTRIES } from "@/lib/home-content";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function AudienceEntry() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="시작하기"
            title="누구를 위한 서비스인가요?"
            description="기업 도입과 개인·팀 역량 강화, 목적에 맞는 진입로를 선택하세요."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {AUDIENCE_ENTRIES.map((item, index) => {
            const dark = index === 0;
            return (
              <Reveal key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 sm:p-10 ${
                    dark
                      ? "hero-canvas text-white"
                      : "border border-line bg-surface text-brand-navy hover:border-brand-blue/40"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute -right-6 -bottom-10 text-[9rem] leading-none font-bold tracking-tighter ${
                      dark ? "text-white/[0.05]" : "text-brand-navy/[0.04]"
                    }`}
                  >
                    {dark ? "B2B" : "EDU"}
                  </span>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      dark
                        ? "bg-white/10 text-brand-cyan"
                        : "bg-brand-blue/10 text-brand-blue"
                    }`}
                  >
                    {item.label}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-sm flex-1 text-[15px] leading-7 ${
                      dark ? "text-white/65" : "text-slate-600"
                    }`}
                  >
                    {item.description}
                  </p>
                  <span
                    className={`relative mt-8 inline-flex items-center gap-3 text-sm font-semibold ${
                      dark ? "text-white" : "text-brand-navy"
                    }`}
                  >
                    {item.cta}
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
                        dark ? "bg-brand-blue text-white" : "bg-brand-navy text-white"
                      }`}
                    >
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
