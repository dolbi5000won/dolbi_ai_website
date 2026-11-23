type Feature = {
  title: string;
  description: string;
  points?: readonly string[];
};

type FeatureGridProps = {
  items: readonly Feature[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_24px_60px_-30px_rgba(16,29,53,0.3)]"
        >
          <span className="font-mono text-xs tracking-wider text-brand-blue">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-brand-navy">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
            {item.description}
          </p>
          {item.points && item.points.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
