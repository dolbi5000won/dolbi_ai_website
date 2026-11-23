type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "";
  const dark = tone === "dark";

  return (
    <div className={`flex max-w-2xl flex-col ${alignClass}`}>
      {eyebrow ? (
        <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`text-[1.75rem] leading-tight font-bold tracking-[-0.025em] sm:text-[2.5rem] ${
          dark ? "text-white" : "text-brand-navy"
        } ${eyebrow ? "mt-4" : ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-[17px] sm:leading-8 ${
            dark ? "text-white/60" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
