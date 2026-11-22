import { DIFFERENTIATORS } from "@/lib/home-content";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function Differentiators() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Why DOLBI"
            title="DOLBI AI 차별점"
            description="기술이 아니라, 일하는 방식이 바뀌는 도입을 목표로 합니다."
          />
        </Reveal>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {DIFFERENTIATORS.map((item, index) => (
            <Reveal key={item.title}>
              <li className="border-t border-brand-navy/15 pt-5">
                <span className="text-sm font-medium text-brand-blue">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
