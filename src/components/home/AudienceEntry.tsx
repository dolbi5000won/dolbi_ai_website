import Link from "next/link";
import { AUDIENCE_ENTRIES } from "@/lib/home-content";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function AudienceEntry() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="시작하기"
            title="누구를 위한 서비스인가요?"
            description="기업 도입과 개인·팀 역량 강화, 목적에 맞는 진입로를 선택하세요."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {AUDIENCE_ENTRIES.map((item) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-surface p-6 transition-colors hover:border-brand-blue sm:p-8"
              >
                <p className="text-sm font-medium text-brand-blue">
                  {item.label}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                  {item.description}
                </p>
                <span className="mt-6 text-sm font-medium text-brand-navy transition-colors group-hover:text-brand-blue">
                  {item.cta} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
