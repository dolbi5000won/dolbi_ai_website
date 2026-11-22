import type { Metadata } from "next";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { SectionBlock } from "@/components/site/SectionBlock";
import { AUTOMATION_PAGE } from "@/lib/content/automation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI 업무자동화",
  description: AUTOMATION_PAGE.description,
  path: "/automation",
});

export default function AutomationPage() {
  return (
    <>
      <PageHero
        eyebrow={AUTOMATION_PAGE.eyebrow}
        title={AUTOMATION_PAGE.title}
        description={AUTOMATION_PAGE.description}
      />
      <SectionBlock
        eyebrow="Services"
        title="자동화 서비스 영역"
        description="보고서부터 지식검색까지, 반복 업무를 줄이는 기능을 중심으로 구성합니다."
      >
        <FeatureGrid items={AUTOMATION_PAGE.features} />
      </SectionBlock>
      <SectionBlock
        eyebrow="Process"
        title="기업 도입 절차"
        description="진단부터 확장까지, 리스크를 낮추며 단계적으로 도입합니다."
        tone="surface"
      >
        <ProcessSteps steps={AUTOMATION_PAGE.process} />
      </SectionBlock>
      <PageCta
        title="업무자동화 도입을 상담하세요"
        description="현재 반복 업무와 데이터 환경을 기준으로 파일럿 범위를 함께 정합니다."
        primaryHref="/contact"
        primaryLabel="기업 상담 신청"
        secondaryHref="/academy"
        secondaryLabel="관련 교육 보기"
      />
    </>
  );
}
