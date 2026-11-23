import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/site/EmptyState";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import {
  PROJECT_DETAIL_SECTIONS,
  PROJECT_PAGE,
  PROJECTS,
} from "@/lib/content/projects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "PROJECT",
  description: PROJECT_PAGE.description,
  path: "/project",
});

export default function ProjectPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_PAGE.eyebrow}
        title={PROJECT_PAGE.title}
        description={PROJECT_PAGE.description}
      />

      <SectionBlock
        eyebrow="Portfolio"
        title="프로젝트 목록"
        description="각 상세 페이지에는 문제점, 해결 방법, 적용 기술, 구현 내용을 담습니다. 실제 성과는 검증된 경우에만 기재합니다."
      >
        {PROJECTS.length === 0 ? (
          <div className="space-y-6">
            <EmptyState
              title={PROJECT_PAGE.emptyTitle}
              description={PROJECT_PAGE.emptyDescription}
            />
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-medium text-brand-navy">
                상세 페이지에 포함될 항목
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PROJECT_DETAIL_SECTIONS.map((section) => (
                  <li
                    key={section}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-slate-600"
                  >
                    {section}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/project/${project.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand-blue"
              >
                <p className="text-sm font-medium text-brand-blue">
                  {project.category}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-brand-navy group-hover:text-brand-blue">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        )}
      </SectionBlock>

      <PageCta
        title="비슷한 과제가 있다면 상담해 주세요"
        description="업무자동화와 AI 네이티브 개발 문의를 받고 있습니다."
        primaryHref="/contact"
        primaryLabel="프로젝트 상담"
        secondaryHref="/development"
        secondaryLabel="개발 서비스"
      />
    </>
  );
}
