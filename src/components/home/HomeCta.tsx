import { PageCta } from "@/components/site/PageCta";

export function HomeCta() {
  return (
    <PageCta
      title="AI로 일하는 방식을 함께 설계합니다"
      description="기업 도입 상담, 개발 프로젝트, 교육 문의 — 목적에 맞는 다음 단계를 안내해 드립니다."
      primaryHref="/contact"
      primaryLabel="상담 신청하기"
      secondaryHref="/about"
      secondaryLabel="DOLBI 소개"
    />
  );
}
