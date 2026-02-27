import { pillCards } from '@/lib/dashboard-data'
import { PillCard } from './pill-card'

export function StatCardsRow() {
  return (
    <section aria-label="Key metrics this week">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          This Week
        </h2>
        <button className="text-[11px] font-semibold text-primary/70 hover:text-primary transition-colors">
          See all
        </button>
      </div>
      <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
        {pillCards.map((card) => (
          <PillCard key={card.id} data={card} />
        ))}
      </div>
    </section>
  )
}
