import { HERO_FLOW } from "@/lib/home-content";

/*
 * Illustrative workflow diagram for the hero — not a client screenshot.
 * Nodes are positioned in the same 400×340 coordinate space as the SVG
 * connectors, so lines and labels stay aligned at every width.
 */
const W = 400;
const H = 340;
const COLS = [72, 200, 328];
const IN_Y = 56;
const AGENT_Y = 170;
const OUT_Y = 284;

const pos = (x: number, y: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
});

export function HeroVisual() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_-40px_rgba(40,120,229,0.6)] backdrop-blur-sm"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[11px] tracking-wider text-white/45">
          dolbi / workflow
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          live
        </span>
      </div>

      <div className="relative mx-auto aspect-[400/340] w-full max-w-[520px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="flow-in" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#65C7F3" stopOpacity="0.25" />
              <stop offset="1" stopColor="#65C7F3" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="flow-out" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#2878E5" stopOpacity="0.9" />
              <stop offset="1" stopColor="#2878E5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {COLS.map((x) => (
            <path
              key={`in-${x}`}
              className="flow-line"
              d={`M${x} ${IN_Y + 18} C${x} ${IN_Y + 70}, 200 ${AGENT_Y - 70}, 200 ${AGENT_Y - 30}`}
              stroke="url(#flow-in)"
              strokeWidth="1.5"
            />
          ))}
          {COLS.map((x) => (
            <path
              key={`out-${x}`}
              className="flow-line"
              d={`M200 ${AGENT_Y + 30} C200 ${AGENT_Y + 70}, ${x} ${OUT_Y - 70}, ${x} ${OUT_Y - 18}`}
              stroke="url(#flow-out)"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {HERO_FLOW.inputs.map((label, i) => (
          <span
            key={label}
            style={pos(COLS[i], IN_Y)}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-brand-navy/80 px-2.5 py-1.5 text-[10.5px] text-white/75 sm:px-3.5 sm:text-[13px]"
          >
            {label}
          </span>
        ))}

        <div
          style={pos(200, AGENT_Y)}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <span className="pulse-ring absolute top-1/2 left-1/2 -mt-[30px] -ml-[30px] h-[60px] w-[60px] rounded-full border border-brand-cyan/50 sm:-mt-[38px] sm:-ml-[38px] sm:h-[76px] sm:w-[76px]" />
          <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue shadow-[0_0_40px_rgba(101,199,243,0.45)] sm:h-[76px] sm:w-[76px]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white sm:h-7 sm:w-7" fill="none">
              <path
                d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1m-7.2 7.2-2.1 2.1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </span>
        </div>
        <span
          style={pos(300, AGENT_Y)}
          className="absolute -translate-y-1/2 whitespace-nowrap text-[10.5px] font-medium text-brand-cyan sm:text-[13px]"
        >
          {HERO_FLOW.agent}
        </span>

        {HERO_FLOW.outputs.map((label, i) => (
          <span
            key={label}
            style={pos(COLS[i], OUT_Y)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg border border-brand-blue/40 bg-brand-blue/15 px-2.5 py-1.5 text-[10.5px] font-medium text-white sm:px-3.5 sm:text-[13px]"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-brand-cyan" fill="none">
              <path d="m2.5 6.2 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[10.5px] text-white/45 sm:px-5 sm:text-[11px]">
        <span>Capture → Automate → Deliver</span>
        <span className="hidden font-sans sm:inline">사람 승인 단계 포함</span>
      </div>
    </div>
  );
}
