import Link from "next/link";
import { CORE_SERVICES } from "@/lib/home-content";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { ServiceIcon } from "@/components/home/ServiceIcon";

const ICONS = ["automation", "development", "academy"] as const;

export function Services() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Core Services"
              title="3대 핵심 서비스"
              description="자동화, 시스템 개발, 교육으로 AI가 실제로 일하게 만듭니다."
            />
            <p className="font-mono text-xs tracking-wider text-slate-400 lg:pb-2">
              AUTOMATION / DEVELOPMENT / ACADEMY
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {CORE_SERVICES.map((service, index) => (
            <Reveal key={service.href}>
              <Link
                href={service.href}
                className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_24px_60px_-30px_rgba(16,29,53,0.35)] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-cyan transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <ServiceIcon name={ICONS[index]} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-sm text-slate-300">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-8 text-[1.375rem] font-bold tracking-tight text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm font-semibold text-brand-navy">
                  자세히 보기
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-blue" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
