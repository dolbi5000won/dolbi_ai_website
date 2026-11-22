/** Decorative product atmosphere for the hero — not a client screenshot. */
export function HeroVisual() {
  return (
    <div
      className="hero-visual relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c1629] sm:aspect-[5/4]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(40,120,229,0.22)_0%,transparent_42%,rgba(101,199,243,0.12)_100%)]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute inset-4 flex flex-col gap-3 sm:inset-6">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
          <span className="text-[11px] tracking-wide text-brand-cyan/90 sm:text-xs">
            DOLBI Workflow
          </span>
          <span className="h-2 w-2 rounded-sm bg-brand-blue" />
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
          {["Capture", "Automate", "Deliver"].map((label, index) => (
            <div
              key={label}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.03] p-3"
              style={{ animationDelay: `${0.35 + index * 0.12}s` }}
            >
              <span className="text-[10px] text-white/40 sm:text-xs">
                0{index + 1}
              </span>
              <span className="text-xs font-medium text-white/85 sm:text-sm">
                {label}
              </span>
              <span className="mt-2 h-1 w-full overflow-hidden rounded-sm bg-white/10">
                <span
                  className="hero-bar block h-full rounded-sm bg-brand-cyan/80"
                  style={{ width: `${55 + index * 18}%` }}
                />
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-brand-cyan" />
            <span className="text-[11px] text-white/70 sm:text-xs">
              Agent ready · Report · Mail · Knowledge
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
