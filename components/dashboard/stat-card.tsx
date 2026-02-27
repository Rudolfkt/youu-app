import { StatCardData } from '@/lib/dashboard-data'
import { Sparkline } from './sparkline'
import { cn } from '@/lib/utils'

interface StatCardProps {
  data: StatCardData
}

const TrendArrow = ({ trend, value }: { trend: StatCardData['trend']; value?: string }) => {
  if (!value) return null

  const isUp = trend === 'up'
  const isDown = trend === 'down'

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 text-[10px] font-semibold tracking-wide',
        isUp && 'text-green-400',
        isDown && 'text-muted-foreground',
        !isUp && !isDown && 'text-muted-foreground'
      )}
    >
      {isUp && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M4 1L7 5H1L4 1Z" fill="currentColor" />
        </svg>
      )}
      {isDown && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M4 7L7 3H1L4 7Z" fill="currentColor" />
        </svg>
      )}
      <span>{value}</span>
    </div>
  )
}

export function StatCard({ data }: StatCardProps) {
  return (
    <article
      className="card-glow-coral flex-shrink-0 w-[148px] rounded-2xl bg-card p-4 flex flex-col gap-3"
      aria-label={`${data.label}: ${data.value}`}
    >
      {/* Value + trend */}
      <div className="flex flex-col gap-1">
        <p
          className={cn(
            'text-[22px] font-extrabold leading-none tracking-tight text-foreground',
            'glow-coral'
          )}
        >
          {data.value}
        </p>
        <TrendArrow trend={data.trend} value={data.trendValue} />
      </div>

      {/* Sparkline */}
      <Sparkline data={data.sparkline} trend={data.trend} width={116} height={34} />

      {/* Label */}
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground leading-none">
        {data.label}
      </p>
    </article>
  )
}
