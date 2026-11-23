type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-surface px-6 py-14 text-center sm:px-8">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white text-brand-blue">
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3l2 2h6A2.5 2.5 0 0 1 20 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="mt-5 text-lg font-bold text-brand-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}
