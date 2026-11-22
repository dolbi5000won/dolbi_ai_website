type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center sm:px-8">
      <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}
