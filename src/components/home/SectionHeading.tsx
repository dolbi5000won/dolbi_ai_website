type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
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
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
