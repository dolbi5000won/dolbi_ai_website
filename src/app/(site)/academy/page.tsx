import type { Metadata } from "next";
import { CourseCard } from "@/components/site/CourseCard";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import { ACADEMY_PAGE, COURSES } from "@/lib/content/academy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI 교육",
  description: ACADEMY_PAGE.description,
  path: "/academy",
});

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow={ACADEMY_PAGE.eyebrow}
        title={ACADEMY_PAGE.title}
        description={ACADEMY_PAGE.description}
      />
      <SectionBlock
        eyebrow="Programs"
        title="교육 과정"
        description="개인 수강과 기업 맞춤 교육 모두 가능합니다. 상세 커리큘럼은 각 과정에서 확인하세요."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </SectionBlock>
      <PageCta
        title="교육 신청 및 맞춤 과정을 상담하세요"
        description="공개 과정은 각 상세 페이지에서 신청하고, 기업 맞춤 교육은 상담으로 문의해 주세요."
        primaryHref="/contact"
        primaryLabel="교육 문의하기"
        secondaryHref="/automation"
        secondaryLabel="업무자동화 보기"
      />
    </>
  );
}
