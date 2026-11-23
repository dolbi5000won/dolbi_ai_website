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
      className={`scroll-mt-16 ${tone === "surface" ? "bg-surface" : "bg-white"}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2
            className={`text-[1.75rem] leading-tight font-bold tracking-[-0.025em] text-brand-navy sm:text-[2.25rem] ${
              eyebrow ? "mt-4" : ""
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
