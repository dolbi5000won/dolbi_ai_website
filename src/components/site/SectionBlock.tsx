import type { ReactNode } from "react";

type SectionBlockProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "white" | "surface";
};

export function SectionBlock({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "white",
}: SectionBlockProps) {
  return (
    <section
      id={id}
      className={
        tone === "surface"
          ? "border-b border-slate-200 bg-surface"
          : "border-b border-slate-200 bg-white"
      }
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-sm font-medium tracking-wide text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={`text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl ${
              eyebrow ? "mt-2" : ""
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
