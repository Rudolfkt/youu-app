interface InsightItem {
  icon: React.ReactNode
  label: string
  value: string
  sublabel: string
  accentColor: string
  bgColor: string
}

const insights: InsightItem[] = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M7.5 1.5L9 5.5H13.5L10 8L11.5 12L7.5 9.5L3.5 12L5 8L1.5 5.5H6L7.5 1.5Z"
          stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"
        />
      </svg>
    ),
    label: 'Best Day',
    value: 'Thursday',
    sublabel: '2.1× avg',
    accentColor: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M7.5 5V7.5L9.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
    label: 'Peak Hour',
    value: '7–9 PM',
    sublabel: 'EST weekdays',
    accentColor: 'text-teal-400',
    bgColor: 'bg-teal-400/10',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M2 11C4 7.5 5.5 4 7.5 5.5C9.5 7 11 2 13 3.5"
          stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
        />
        <circle cx="13" cy="3.5" r="1.5" fill="currentColor" />
      </svg>
    ),
    label: 'Viral Score',
    value: '8.4/10',
    sublabel: 'Beef Wellington',
    accentColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

export function QuickInsights() {
  return (
    <section className="px-5" aria-label="Quick insights">
      <h2 className="text-[15px] font-bold text-foreground mb-3 tracking-tight">
        Quick Insights
      </h2>
      <div className="grid grid-cols-3 gap-2.5">
        {insights.map((item) => (
          <div
            key={item.label}
            className="rounded-[18px] bg-card border border-white/[0.04] card-base p-3.5 flex flex-col gap-2.5"
          >
            <div className={`w-8 h-8 rounded-xl ${item.bgColor} ${item.accentColor} flex items-center justify-center`}>
              {item.icon}
            </div>
            <div>
              <p className="text-[14px] font-bold text-foreground leading-tight">{item.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">
                {item.sublabel}
              </p>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
