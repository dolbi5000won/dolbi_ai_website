import Link from "next/link";
import { CORE_SERVICES } from "@/lib/home-content";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function Services() {
  return (
    <section className="border-b border-slate-200 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Core Services"
            title="3대 핵심 서비스"
            description="자동화, 시스템 개발, 교육으로 AI가 실제로 일하게 만듭니다."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {CORE_SERVICES.map((service) => (
            <Reveal key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-blue sm:p-7"
              >
                <span className="text-sm font-medium tracking-wide text-brand-cyan">
                  {service.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-brand-navy transition-colors group-hover:text-brand-blue">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-slate-500 before:mr-2 before:text-brand-blue before:content-['·']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
