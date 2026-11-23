import { PROJECT_DETAIL_SECTIONS } from "@/lib/content/projects";
import { PROJECT_TEASER } from "@/lib/home-content";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ProjectsTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Project"
            title={PROJECT_TEASER.title}
            description={PROJECT_TEASER.description}
          />
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-500">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            {PROJECT_TEASER.note}
          </p>
          <Button href={PROJECT_TEASER.href} variant="secondary" size="lg" className="mt-8">
            {PROJECT_TEASER.cta}
            <ArrowIcon />
          </Button>
        </Reveal>

        <Reveal>
          <div className="relative rounded-3xl border border-line bg-surface p-3">
            <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-slate-400">
                  CASE TEMPLATE
                </span>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                  게시 준비 중
                </span>
              </div>
              <p className="mt-5 text-lg font-bold text-brand-navy">
                사례 상세 페이지 구성
              </p>
              <ol className="mt-6 space-y-2.5">
                {PROJECT_DETAIL_SECTIONS.map((section, index) => (
                  <li
                    key={section}
                    className="flex items-center gap-4 rounded-xl border border-line px-4 py-3"
                  >
                    <span className="font-mono text-xs text-brand-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-brand-navy">
                      {section}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto h-1.5 rounded-full bg-slate-100"
                      style={{ width: `${28 + ((index * 17) % 40)}%` }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
