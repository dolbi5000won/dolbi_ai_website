import Link from "next/link";
import { ACADEMY_PROGRAMS } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function AcademyTeaser() {
  return (
    <section className="border-b border-slate-200 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="AI Academy"
              title="교육 프로그램"
              description="전국 온라인과 기업 방문 교육으로, 바로 업무에 쓰는 AI 역량을 키웁니다."
            />
            <Button href="/academy">교육 상세 보기</Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY_PROGRAMS.map((program) => (
            <Reveal key={program.slug}>
              <Link
                href={`/academy/${program.slug}`}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white px-5 py-5 transition-colors hover:border-brand-blue"
              >
                <h3 className="text-base font-semibold text-brand-navy">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{program.audience}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
