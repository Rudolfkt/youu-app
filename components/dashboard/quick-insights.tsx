interface InsightItem {
  icon: React.ReactNode
  label: string
  value: string
  sublabel: string
}

const insights: InsightItem[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2L9.5 6H14L10.5 8.5L12 12.5L8 10L4 12.5L5.5 8.5L2 6H6.5L8 2Z"
          stroke="#FF6B6B" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Best Day',
    value: 'Thursday',
    sublabel: '2.1× avg views',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5" stroke="#4ADE80" strokeWidth="1.3" />
        <path d="M8 5.5V8L10 9.5" stroke="#4ADE80" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    label: 'Peak Hour',
    value: '7–9 PM',
    sublabel: 'EST · weekdays',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 12C4 8 6 4 8 6C10 8 12 2 14 4" stroke="#FF6B6B"
          strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="4" r="1.5" fill="#FF6B6B" />
      </svg>
    ),
    label: 'Viral Score',
    value: '8.4/10',
    sublabel: 'Beef Wellington',
  },
]

export function QuickInsights() {
  return (
    <section className="px-5" aria-label="Quick insights">
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Quick Insights
      </h2>
      <div className="grid grid-cols-3 gap-2.5">
        {insights.map((item) => (
          <div
            key={item.label}
            className="card-glow bg-card rounded-xl p-3 flex flex-col gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground leading-tight">{item.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">
                {item.sublabel}
              </p>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
