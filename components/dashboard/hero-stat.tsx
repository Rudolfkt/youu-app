import { heroStat } from '@/lib/dashboard-data'

export function HeroStat() {
  return (
    <section className="px-5 pt-2 pb-6 relative" aria-label="Hero weekly stat">
      {/* Greeting line */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
        Good evening
      </p>

      {/* Emotional headline */}
      <h2 className="text-[26px] font-extrabold text-foreground leading-tight tracking-tight text-balance mb-6">
        Your channel is{' '}
        <span className="text-primary">on fire</span>{' '}
        this week.
      </h2>

      {/* Giant hero number */}
      <div className="relative flex flex-col items-start">
        {/* Ambient coral glow behind the number */}
        <div
          className="absolute -top-4 left-0 w-52 h-24 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,107,107,0.18) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="text-[80px] font-black text-foreground leading-none tracking-tighter glow-hero select-none">
            {heroStat.value}
          </p>
          <p className="text-[14px] font-medium text-muted-foreground mt-1 tracking-wide">
            {heroStat.label}
          </p>
        </div>

        {/* WoW badge */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 1.5L8 6H2L5 1.5Z" fill="#4ADE80" />
            </svg>
            <span className="text-[12px] font-bold text-green-400">{heroStat.weekOverWeek}</span>
          </div>
          <span className="text-[12px] text-muted-foreground font-medium">
            {heroStat.weekOverWeekLabel}
          </span>
        </div>
      </div>
    </section>
  )
}
