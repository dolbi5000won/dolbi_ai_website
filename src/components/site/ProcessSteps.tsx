type Step = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: readonly Step[];
};

/** Numbered timeline: vertical on mobile, horizontal rail on large screens. */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="relative grid gap-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-brand-blue/50 before:to-line before:content-[''] lg:grid-flow-col lg:auto-cols-fr lg:gap-6 lg:before:hidden">
      {steps.map((step, index) => (
        <li key={step.title} className="relative pl-14 lg:pl-0">
          <div className="absolute top-0 left-0 flex items-center lg:static">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/30 bg-white font-mono text-sm font-semibold text-brand-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className="ml-3 hidden h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-line lg:block"
              />
            ) : null}
          </div>
          <h3 className="pt-1.5 text-lg font-bold tracking-tight text-brand-navy lg:mt-6 lg:pt-0">
            {step.title}
          </h3>
          <p className="mt-2 text-[15px] leading-7 text-slate-600">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
