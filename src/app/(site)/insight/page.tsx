import type { Metadata } from "next";
import { InsightCard } from "@/components/site/InsightCard";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_PAGE,
  INSIGHTS,
} from "@/lib/content/insights";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "INSIGHT",
  description: INSIGHT_PAGE.description,
  path: "/insight",
});

export default function InsightPage() {
  return (
    <>
      <PageHero
        eyebrow={INSIGHT_PAGE.eyebrow}
        title={INSIGHT_PAGE.title}
        description={INSIGHT_PAGE.description}
      />

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <p className="text-sm text-slate-500">카테고리</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {INSIGHT_CATEGORIES.map((category) => (
              <li
                key={category}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-brand-navy"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionBlock
        eyebrow="Articles"
        title="게시물"
        description="실무에 바로 참고할 수 있는 가이드 중심으로 발행합니다. 미검증 고객 실적은 포함하지 않습니다."
        tone="surface"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {INSIGHTS.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </SectionBlock>

      <PageCta
        title="콘텐츠 주제나 도입 상담이 필요하면"
        description="교육·자동화·개발 문의와 연결해 안내합니다."
        primaryHref="/contact"
        primaryLabel="문의하기"
        secondaryHref="/academy"
        secondaryLabel="교육 보기"
      />
    </>
  );
}
