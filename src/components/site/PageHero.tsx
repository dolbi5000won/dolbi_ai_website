type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-brand-blue">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`max-w-3xl text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl ${
            eyebrow ? "mt-3" : ""
          }`}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
