import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";

type PageCtaProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageCtaProps) {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="hero-canvas relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-7 py-14 text-white sm:px-14 sm:py-16">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.025em] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/65">{description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} size="lg" variant="light">
              {primaryLabel}
              <ArrowIcon />
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} size="lg" variant="ghost">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
