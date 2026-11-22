import type { Metadata } from "next";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { SectionBlock } from "@/components/site/SectionBlock";
import { DEVELOPMENT_PAGE } from "@/lib/content/development";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI 시스템 개발",
  description: DEVELOPMENT_PAGE.description,
  path: "/development",
});

export default function DevelopmentPage() {
  return (
    <>
      <PageHero
        eyebrow={DEVELOPMENT_PAGE.eyebrow}
        title={DEVELOPMENT_PAGE.title}
        description={DEVELOPMENT_PAGE.description}
      />
      <SectionBlock
        eyebrow="Solutions"
        title="개발 서비스 영역"
        description="사내 시스템에 AI 검색·작성·에이전트를 포함한 구조로 접근합니다."
      >
        <FeatureGrid items={DEVELOPMENT_PAGE.features} />
      </SectionBlock>
      <SectionBlock
        eyebrow="Process"
        title="개발 진행 방식"
        description="문제 정의부터 인수·개선까지 명확한 단계로 진행합니다."
        tone="surface"
      >
        <ProcessSteps steps={DEVELOPMENT_PAGE.process} />
      </SectionBlock>
      <PageCta
        title="AI 네이티브 시스템 구축을 문의하세요"
        description="업무 흐름과 연동 범위를 기준으로 프로토타입부터 설계합니다."
        primaryHref="/contact"
        primaryLabel="개발 상담 신청"
        secondaryHref="/project"
        secondaryLabel="프로젝트 보기"
      />
    </>
  );
}
