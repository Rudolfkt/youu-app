export function WeeklySummary() {
  return (
    <section className="mx-5" aria-label="Weekly performance summary">
      <div className="card-glow rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/10 p-4 flex items-center justify-between gap-4 overflow-hidden relative">
        {/* Decorative coral blur blob */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/8 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-1 z-10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            Performance Score
          </p>
          <div className="flex items-end gap-2">
            <span className="text-[42px] font-black text-foreground leading-none glow-coral">
              94
            </span>
            <span className="text-[14px] font-bold text-primary mb-1">/100</span>
          </div>
          <p className="text-[12px] text-muted-foreground font-medium">
            Your best week in 3 months
          </p>
        </div>

        {/* Right side radial progress */}
        <div className="relative flex-shrink-0 z-10" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Background track */}
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="6"
            />
            {/* Progress arc — 94% of 2πr */}
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 32 * 0.94} ${2 * Math.PI * 32 * 0.06}`}
              strokeDashoffset={2 * Math.PI * 32 * 0.25}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,107,107,0.5))' }}
            />
            <text
              x="40"
              y="36"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#F5F5F5"
              fontSize="14"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              94%
            </text>
            <text
              x="40"
              y="51"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#6B6B6B"
              fontSize="8"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              SCORE
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
