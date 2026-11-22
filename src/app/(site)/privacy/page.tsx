import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionBlock } from "@/components/site/SectionBlock";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "개인정보처리방침",
  description: "DOLBI 개인정보 수집·이용·보관·삭제에 관한 안내입니다.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="개인정보처리방침"
        description="DOLBI는 상담·교육 신청에 필요한 최소한의 개인정보만 수집하며, 목적 외 이용을 하지 않습니다."
      />

      <SectionBlock title="수집 항목">
        <ul className="max-w-3xl space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
          <li>
            · 상담 신청: 이름, 회사명(선택), 이메일, 연락처, 문의 유형, 제목,
            문의 내용, 동의 여부
          </li>
          <li>
            · 교육 신청: 이름, 이메일, 연락처, 회사명(선택), 인원, 희망일,
            요청 사항, 동의 여부
          </li>
        </ul>
      </SectionBlock>

      <SectionBlock title="이용 목적" tone="surface">
        <ul className="max-w-3xl space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
          <li>· 상담 및 교육 신청 접수·회신</li>
          <li>· 일정 조율 및 서비스 안내</li>
          <li>· 관련 법령에 따른 기록 보관</li>
        </ul>
      </SectionBlock>

      <SectionBlock title="보관 및 삭제">
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          신청 데이터는 목적 달성 후, 또는 내부 보관 기간(기본 안내: 상담·교육
          종료 후 최대 1년, 법령상 보존이 필요한 경우 해당 기간)이 지나면
          삭제·파기합니다. 구체적 파기 절차는 관리자 운영 정책에서 관리하며,
          요청 시 관련 법령에 따라 처리합니다.
        </p>
      </SectionBlock>

      <SectionBlock title="제3자 제공 및 처리 위탁" tone="surface">
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          접수 확인·관리자 알림을 위해 이메일 발송 서비스(Resend)와 데이터
          저장(Supabase)을 사용할 수 있습니다. 서비스 역할 키와 API 키는
          서버에서만 관리합니다.
        </p>
      </SectionBlock>
    </>
  );
}