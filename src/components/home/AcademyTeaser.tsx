import Link from "next/link";
import { getCourseBySlug } from "@/lib/content/academy";
import { ACADEMY_PROGRAMS } from "@/lib/home-content";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function AcademyTeaser() {
  return (
    <section className="hero-canvas relative overflow-hidden text-white">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              tone="dark"
              eyebrow="AI Academy"
              title="교육 프로그램"
              description="전국 온라인과 기업 방문 교육으로, 바로 업무에 쓰는 AI 역량을 키웁니다."
            />
            <Button href="/academy" variant="light" size="lg">
              교육 상세 보기
              <ArrowIcon />
            </Button>
          </div>
        </Reveal>

        <ul className="mt-12 border-t border-white/10">
          {ACADEMY_PROGRAMS.map((program, index) => {
            const course = getCourseBySlug(program.slug);
            return (
              <Reveal as="li" key={program.slug} className="border-b border-white/10">
                  <Link
                    href={`/academy/${program.slug}`}
                    className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-colors sm:grid-cols-[3rem_1.3fr_1fr_auto] lg:grid-cols-[3rem_1.3fr_1fr_14rem_auto] sm:gap-x-6"
                  >
                    <span className="font-mono text-sm text-white/35 transition-colors group-hover:text-brand-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand-cyan sm:text-xl">
                      {program.title}
                    </span>
                    <span className="col-start-2 row-start-2 text-sm text-white/50 sm:col-start-auto sm:row-start-auto">
                      {program.audience}
                    </span>
                    <span className="hidden text-sm text-white/50 lg:block">
                      {course ? `${course.difficulty} · ${course.duration}` : ""}
                    </span>
                    <span className="col-start-3 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-navy sm:col-start-auto sm:row-span-1 sm:row-start-auto">
                      <ArrowIcon />
                    </span>
                  </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
