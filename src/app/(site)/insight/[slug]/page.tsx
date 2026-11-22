import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { INSIGHTS, getInsightBySlug } from "@/lib/content/insights";
import { buildPageMetadata } from "@/lib/seo";

type InsightDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: InsightDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: "INSIGHT" };
  return buildPageMetadata({
    title: insight.title,
    description: insight.summary,
    path: `/insight/${insight.slug}`,
  });
}

export default async function InsightDetailPage({ params }: InsightDetailProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        description={insight.summary}
      />

      <article className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="space-y-6">
            {insight.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-slate-700 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-500">
            <Link href="/insight" className="text-brand-blue hover:underline">
              ← INSIGHT 목록
            </Link>
          </p>
        </div>
      </article>

      <PageCta
        title="관련 교육이나 도입이 필요하다면"
        description="주제와 맞는 교육 과정·상담으로 연결해 드립니다."
        primaryHref="/academy"
        primaryLabel="교육 과정"
        secondaryHref="/contact"
        secondaryLabel="상담 신청"
      />
    </>
  );
}
