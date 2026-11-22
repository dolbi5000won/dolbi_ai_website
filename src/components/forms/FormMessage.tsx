type FormMessageProps = {
  tone?: "success" | "error" | "info";
  children: string;
};

export function FormMessage({ tone = "info", children }: FormMessageProps) {
  const className =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : tone === "error"
        ? "border-red-200 bg-red-50 text-red-800"
        : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <p className={`rounded-lg border px-4 py-3 text-sm leading-6 ${className}`} role="status">
      {children}
    </p>
  );
}
