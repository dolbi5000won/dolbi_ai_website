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
    <section className="bg-brand-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-7 text-white/70">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button
              href={secondaryHref}
              size="lg"
              variant="ghost"
              className="border border-white/25"
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
