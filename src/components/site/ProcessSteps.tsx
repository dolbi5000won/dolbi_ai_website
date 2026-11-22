type Step = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: readonly Step[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="border-t border-brand-navy/15 pt-5"
        >
          <span className="text-sm font-medium text-brand-blue">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-brand-navy">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
