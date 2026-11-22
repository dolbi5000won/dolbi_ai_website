import type { Metadata } from "next";
import Link from "next/link";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { SectionBlock } from "@/components/site/SectionBlock";
import { Button } from "@/components/ui/Button";
import { ABOUT_PAGE } from "@/lib/content/about";
import { BRAND } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ABOUT",
  description: ABOUT_PAGE.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_PAGE.eyebrow}
        title={ABOUT_PAGE.title}
        description={ABOUT_PAGE.description}
      />

      <SectionBlock
        eyebrow="Brand"
        title={`${BRAND.name}이 하는 일`}
        description={`${BRAND.sloganKo} ${BRAND.company}가 운영하는 AI 전문 브랜드입니다.`}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "AI 업무자동화",
              href: "/automation",
              text: "보고서·문서·메일·에이전트·지식검색",
            },
            {
              title: "AI 시스템 개발",
              href: "/development",
              text: "업무·그룹웨어·문서·사내 웹앱",
            },
            {
              title: "AI 교육",
              href: "/academy",
              text: "생성형 AI · Cursor · Claude Code · 바이브 코딩",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-blue"
            >
              <h3 className="text-lg font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Philosophy"
        title="사업 철학"
        description="기술이 아니라 일하는 방식이 바뀌는 도입을 지향합니다."
        tone="surface"
      >
        <ProcessSteps steps={ABOUT_PAGE.philosophy} />
      </SectionBlock>

      <SectionBlock eyebrow="Team" title={ABOUT_PAGE.representative.title}>
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          {ABOUT_PAGE.representative.description}
        </p>
      </SectionBlock>

      <SectionBlock
        eyebrow="Contact"
        title={ABOUT_PAGE.contact.title}
        tone="surface"
      >
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          {ABOUT_PAGE.contact.description}
        </p>
        <div className="mt-6">
          <Button href={ABOUT_PAGE.contact.href} size="lg">
            CONTACT로 이동
          </Button>
        </div>
      </SectionBlock>

      <PageCta
        title="DOLBI와 다음 단계를 이야기해 보세요"
        description="기업 도입, 개발, 교육 문의를 환영합니다."
        primaryHref="/contact"
        primaryLabel="상담 신청"
        secondaryHref="/"
        secondaryLabel="홈으로"
      />
    </>
  );
}
