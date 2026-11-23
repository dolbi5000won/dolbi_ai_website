import Link from "next/link";
import type { Insight } from "@/lib/content/insights";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type InsightCardProps = {
  insight: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insight/${insight.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_24px_60px_-30px_rgba(16,29,53,0.3)] sm:p-8"
    >
      <p className="w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
        {insight.category}
      </p>
      <h2 className="mt-5 text-xl font-bold tracking-tight text-brand-navy transition-colors group-hover:text-brand-blue sm:text-[1.375rem]">
        {insight.title}
      </h2>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
        {insight.summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-blue">
        글 읽기
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
