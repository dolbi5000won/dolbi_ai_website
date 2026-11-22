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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
            {item.description}
          </p>
          {item.points && item.points.length > 0 ? (
            <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-sm text-slate-500 before:mr-2 before:text-brand-blue before:content-['·']"
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
