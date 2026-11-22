type PagePlaceholderProps = {
  title: string;
  description: string;
  phaseNote?: string;
};

export function PagePlaceholder({
  title,
  description,
  phaseNote = "콘텐츠는 이후 단계에서 구현됩니다.",
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-brand-blue">
        DOLBI
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
      <p className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        {phaseNote}
      </p>
    </section>
  );
}
