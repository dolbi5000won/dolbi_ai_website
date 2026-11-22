import Link from "next/link";
import type { Insight } from "@/lib/content/insights";

type InsightCardProps = {
  insight: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insight/${insight.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-blue"
    >
      <p className="text-sm font-medium text-brand-blue">{insight.category}</p>
      <h2 className="mt-3 text-xl font-semibold text-brand-navy transition-colors group-hover:text-brand-blue">
        {insight.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {insight.summary}
      </p>
      <span className="mt-5 text-sm font-medium text-brand-navy group-hover:text-brand-blue">
        글 읽기 →
      </span>
    </Link>
  );
}
