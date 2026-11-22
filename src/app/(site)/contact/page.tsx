import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { CONTACT_PAGE } from "@/lib/content/contact";
import { FormMessage } from "@/components/forms/FormMessage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CONTACT",
  description: CONTACT_PAGE.description,
  path: "/contact",
});

export default function ContactPage() {
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero
        eyebrow={CONTACT_PAGE.eyebrow}
        title={CONTACT_PAGE.title}
        description={CONTACT_PAGE.description}
      />

      <SectionBlock
        eyebrow="Inquiry Types"
        title="문의 유형"
        description="목적에 맞는 유형을 선택한 뒤 아래 폼으로 상담을 신청하세요."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {CONTACT_PAGE.types.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-blue"
            >
              <h2 className="text-lg font-semibold text-brand-navy group-hover:text-brand-blue">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="inquiry"
        eyebrow="Form"
        title="상담 신청"
        description="필수 항목을 입력해 주세요. 개인정보는 상담 목적에 한해 최소 수집합니다."
        tone="surface"
      >
        {!configured ? (
          <FormMessage tone="info">
            상담 접수 DB가 아직 연결되지 않았습니다. Supabase 환경변수 설정과
            SQL 적용(supabase/APPLY.md) 후 이용할 수 있습니다.
          </FormMessage>
        ) : null}
        <div className="mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <InquiryForm />
        </div>
      </SectionBlock>
    </>
  );
}
