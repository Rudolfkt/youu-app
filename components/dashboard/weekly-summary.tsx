import { performanceScore } from '@/lib/dashboard-data'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const pct = performanceScore.score / performanceScore.maxScore

export function WeeklySummary() {
  return (
    <section className="mx-5" aria-label="Weekly performance score">
      <div className="relative rounded-[24px] bg-card overflow-hidden card-base border border-white/[0.04]">
        {/* Coral ambient bleed — top right */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,107,107,0.22) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        {/* Orange ambient bleed — bottom left */}
        <div
          className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(251,146,60,0.12) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between p-5 gap-4">
          {/* Left: text */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">
              {performanceScore.sublabel}
            </p>
            <div className="flex items-end gap-1.5 leading-none">
              <span className="text-[56px] font-black text-foreground leading-none tracking-tighter">
                {performanceScore.score}
              </span>
              <span className="text-[18px] font-bold text-primary mb-1.5">
                /{performanceScore.maxScore}
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground font-medium leading-snug">
              {performanceScore.label}
            </p>
          </div>

          {/* Right: glowing ring */}
          <div className="flex-shrink-0 relative" aria-hidden="true">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Track */}
              <circle
                cx="60" cy="60" r={RADIUS}
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="8"
              />
              {/* Progress — rotated so it starts at the top */}
              <circle
                cx="60" cy="60" r={RADIUS}
                fill="none"
                stroke="url(#coralGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${CIRCUMFERENCE * pct} ${CIRCUMFERENCE * (1 - pct)}`}
                strokeDashoffset={CIRCUMFERENCE * 0.25}
                className="ring-glow-coral"
              />
              <defs>
                <linearGradient id="coralGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#FB923C" />
                </linearGradient>
              </defs>
              {/* Center label */}
              <text
                x="60" y="55"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#F5F5F5"
                fontSize="18"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
              >
                {performanceScore.score}%
              </text>
              <text
                x="60" y="71"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5A5A5A"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
                letterSpacing="1.5"
              >
                SCORE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
