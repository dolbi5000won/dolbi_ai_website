import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { FormMessage } from "@/components/forms/FormMessage";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import { Button } from "@/components/ui/Button";
import { COURSES, getCourseBySlug } from "@/lib/content/academy";
import { buildPageMetadata } from "@/lib/seo";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "교육 과정" };
  return buildPageMetadata({
    title: course.title,
    description: course.summary,
    path: `/academy/${course.slug}`,
  });
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero
        eyebrow="AI Academy"
        title={course.title}
        description={course.summary}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-sm text-slate-500">대상</p>
            <p className="mt-2 font-medium text-brand-navy">
              {course.targetAudience}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-sm text-slate-500">기간</p>
            <p className="mt-2 font-medium text-brand-navy">{course.duration}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-sm text-slate-500">난이도</p>
            <p className="mt-2 font-medium text-brand-navy">
              {course.difficulty}
            </p>
          </div>
        </div>
      </section>

      <SectionBlock eyebrow="Curriculum" title="커리큘럼">
        <ol className="space-y-3">
          {course.curriculum.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 rounded-2xl border border-line bg-white px-5 py-4"
            >
              <span className="text-sm font-medium text-brand-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-7 text-brand-navy sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        eyebrow="Outcomes"
        title="기대 결과"
        description="수강 후 바로 업무에 적용할 수 있는 산출물을 목표로 합니다."
        tone="surface"
      >
        <ul className="grid gap-3 md:grid-cols-3">
          {course.outcomes.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-line bg-white px-5 py-5 text-sm leading-7 text-slate-600"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/academy" variant="secondary" size="lg">
            다른 과정 보기
          </Button>
        </div>
      </SectionBlock>

      <SectionBlock
        id="apply"
        eyebrow="Apply"
        title="교육 신청"
        description="아래 폼으로 신청해 주세요. 개인정보는 교육 안내 목적에 한해 최소 수집합니다."
      >
        {!configured ? (
          <FormMessage tone="info">
            교육 신청 DB가 아직 연결되지 않았습니다. Supabase 환경변수와
            SQL 적용(supabase/APPLY.md) 후 접수할 수 있습니다.
          </FormMessage>
        ) : null}
        <div className="mt-6 max-w-3xl rounded-2xl border border-line bg-white p-6 sm:p-8">
          <CourseApplicationForm
            courseSlug={course.slug}
            courseTitle={course.title}
          />
        </div>
        <p className="mt-4 text-sm text-slate-500">
          <Link href="/privacy" className="text-brand-blue hover:underline">
            개인정보처리방침
          </Link>
          을 확인한 뒤 동의해 주세요.
        </p>
      </SectionBlock>

      <PageCta
        title="기업 맞춤 교육이 필요하신가요?"
        description="방문·온라인 맞춤 과정도 상담 가능합니다."
        primaryHref="/contact"
        primaryLabel="교육 문의"
        secondaryHref="/academy"
        secondaryLabel="전체 과정"
      />
    </>
  );
}
