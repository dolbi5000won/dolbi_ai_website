import { PROJECT_TEASER } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ProjectsTeaser() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="PROJECT"
              title={PROJECT_TEASER.title}
              description={PROJECT_TEASER.description}
            />
            <Button href={PROJECT_TEASER.href} variant="secondary">
              {PROJECT_TEASER.cta}
            </Button>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 sm:px-8">
            <p className="text-sm leading-7 text-slate-600">
              {PROJECT_TEASER.note}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              검증된 사례가 준비되면 문제점, 해결 방법, 적용 기술, 구현 화면을
              이곳에 게시합니다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
