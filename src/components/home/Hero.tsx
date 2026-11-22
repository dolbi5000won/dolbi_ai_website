import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(40,120,229,0.38),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(101,199,243,0.16),_transparent_48%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-10">
        <div className="hero-copy flex flex-col">
          <p className="text-4xl font-semibold tracking-[0.14em] sm:text-5xl lg:text-6xl">
            {BRAND.name}
          </p>
          <h1 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {BRAND.sloganEn}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {BRAND.sloganKo}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              기업 상담 문의
            </Button>
            <Button
              href="/academy"
              size="lg"
              variant="ghost"
              className="border border-white/25"
            >
              교육 살펴보기
            </Button>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
