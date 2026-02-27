import { statCards } from '@/lib/dashboard-data'
import { StatCard } from './stat-card'

export function StatCardsRow() {
  return (
    <section aria-label="Key stats this week">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          This Week
        </h2>
        <button className="text-[11px] font-semibold text-primary/80 hover:text-primary transition-colors">
          See all
        </button>
      </div>
      <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
        {statCards.map((card) => (
          <StatCard key={card.id} data={card} />
        ))}
      </div>
    </section>
  )
}
