import { DIFFERENTIATORS } from "@/lib/home-content";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function Differentiators() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why DOLBI"
              title="DOLBI AI 차별점"
              description="기술이 아니라, 일하는 방식이 바뀌는 도입을 목표로 합니다."
            />
          </div>
        </Reveal>

        <ol className="space-y-4">
          {DIFFERENTIATORS.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              className="group grid gap-4 rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-brand-blue/40 hover:bg-white sm:grid-cols-[5rem_1fr] sm:p-8"
            >
                <span className="text-5xl leading-none font-bold tracking-tighter text-brand-blue/20 transition-colors duration-300 group-hover:text-brand-blue">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
