import { BRAND } from "@/lib/constants";
import { HERO_KEYWORDS } from "@/lib/home-content";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section className="hero-canvas relative overflow-hidden text-white">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:min-h-[calc(100dvh-4rem-4.5rem)] lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-16">
        <div className="hero-copy flex flex-col">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            AI 업무자동화 · AI 시스템 개발 · AI 교육
          </p>

          <h1 className="mt-7 text-[3.25rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-7xl lg:text-[5.25rem]">
            Make <span className="text-gradient">AI</span>
            <br />
            Work.
          </h1>

          <p className="mt-7 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {BRAND.sloganKo}
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-white/60 sm:text-base">
            반복 업무 자동화부터 AI 네이티브 사내 시스템, 실무 중심 AI 교육까지 —
            {` ${BRAND.name}`}는 AI가 실제로 일하는 구조를 만듭니다.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              기업 상담 문의
              <ArrowIcon />
            </Button>
            <Button href="/academy" size="lg" variant="ghost">
              교육 살펴보기
            </Button>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <HeroVisual />
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-brand-ink/40">
        <div className="flex overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10" aria-label="제공 분야">
            {[...HERO_KEYWORDS, ...HERO_KEYWORDS].map((keyword, index) => (
              <li
                key={`${keyword}-${index}`}
                aria-hidden={index >= HERO_KEYWORDS.length}
                className="flex items-center gap-10 whitespace-nowrap text-sm text-white/55"
              >
                {keyword}
                <span className="h-1 w-1 rotate-45 bg-brand-cyan/60" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
