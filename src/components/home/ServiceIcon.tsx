type ServiceIconProps = {
  name: "automation" | "development" | "academy";
  className?: string;
};

/** Simple line icons for the three core services. */
export function ServiceIcon({ name, className }: ServiceIconProps) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      {name === "automation" ? (
        <>
          <path d="M4 7h9m0 0-3-3m3 3-3 3" {...common} />
          <path d="M20 17h-9m0 0 3-3m-3 3 3 3" {...common} />
          <circle cx="18" cy="7" r="2" {...common} />
          <circle cx="6" cy="17" r="2" {...common} />
        </>
      ) : name === "development" ? (
        <>
          <rect x="3" y="4" width="18" height="16" rx="3" {...common} />
          <path d="M3 9h18M9.5 13.5 7.5 15.5l2 2M14.5 13.5l2 2-2 2" {...common} />
        </>
      ) : (
        <>
          <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" {...common} />
          <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" {...common} />
        </>
      )}
    </svg>
  );
}
