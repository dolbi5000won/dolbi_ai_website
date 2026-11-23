type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="hero-canvas relative overflow-hidden text-white">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
        {eyebrow ? <p className="eyebrow eyebrow-light">{eyebrow}</p> : null}
        <h1
          className={`max-w-3xl text-[2.25rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[3.5rem] ${
            eyebrow ? "mt-5" : ""
          }`}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}
