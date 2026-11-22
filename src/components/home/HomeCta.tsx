import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";

export function HomeCta() {
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                AI로 일하는 방식을 함께 설계합니다
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                기업 도입 상담, 개발 프로젝트, 교육 문의 — 목적에 맞는 다음
                단계를 안내해 드립니다.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                상담 신청하기
              </Button>
              <Button
                href="/about"
                size="lg"
                variant="ghost"
                className="border border-white/25"
              >
                DOLBI 소개
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
