import { PillCardData } from '@/lib/dashboard-data'
import { Sparkline } from './sparkline'

interface PillCardProps {
  data: PillCardData
}

export function PillCard({ data }: PillCardProps) {
  return (
    <article
      className="relative flex-shrink-0 w-[154px] rounded-[22px] overflow-hidden p-px"
      aria-label={`${data.label}: ${data.value}`}
    >
      {/* Gradient border shell */}
      <div
        className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${data.gradient} opacity-70`}
        aria-hidden="true"
      />

      {/* Inner card */}
      <div className="relative rounded-[21px] bg-[#111111] p-4 flex flex-col gap-3 h-full">
        {/* Ambient glow */}
        <div
          className="absolute -top-6 -left-4 w-28 h-20 rounded-full blur-2xl pointer-events-none"
          style={{ background: data.glowColor }}
          aria-hidden="true"
        />

        {/* Value row */}
        <div className="relative flex flex-col gap-0.5">
          <p className="text-[22px] font-black text-foreground leading-none tracking-tight">
            {data.value}
          </p>
          <div className="flex items-center gap-1">
            <svg
              width="8" height="8" viewBox="0 0 8 8" fill="none"
              aria-hidden="true"
              className={data.trendUp ? 'text-green-400' : 'text-muted-foreground'}
            >
              {data.trendUp
                ? <path d="M4 1L7 5.5H1L4 1Z" fill="currentColor" />
                : <path d="M4 7L7 2.5H1L4 7Z" fill="currentColor" />
              }
            </svg>
            <span
              className={`text-[11px] font-semibold ${data.trendUp ? 'text-green-400' : 'text-muted-foreground'}`}
            >
              {data.trendValue}
            </span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="relative">
          <Sparkline
            data={data.sparkline}
            color="rgba(255,255,255,0.8)"
            fillColor="rgba(255,255,255,0.07)"
            width={118}
            height={28}
          />
        </div>

        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 leading-none">
          {data.label}
        </p>
      </div>
    </article>
  )
}
