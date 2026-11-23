import { BRAND } from "@/lib/constants";

type LogoProps = {
  className?: string;
};

/** Wordmark with a small mark: a node feeding into a block — "AI that works". */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        aria-hidden
        viewBox="0 0 28 28"
        className="h-7 w-7 shrink-0"
        fill="none"
      >
        <rect width="28" height="28" rx="8" fill="url(#dolbi-mark)" />
        <path
          d="M9 8h5.2a6 6 0 0 1 0 12H9z"
          stroke="white"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="14.2" cy="14" r="2" fill="white" />
        <defs>
          <linearGradient id="dolbi-mark" x1="0" y1="0" x2="28" y2="28">
            <stop stopColor="#65C7F3" />
            <stop offset="1" stopColor="#2878E5" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[17px] font-bold tracking-tight">
        {BRAND.name}
      </span>
    </span>
  );
}
