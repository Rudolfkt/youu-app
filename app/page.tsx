import { ChannelHeader } from '@/components/dashboard/channel-header'
import { StatCardsRow } from '@/components/dashboard/stat-cards-row'
import { WeeklySummary } from '@/components/dashboard/weekly-summary'
import { TopVideos } from '@/components/dashboard/top-videos'
import { QuickInsights } from '@/components/dashboard/quick-insights'
import { BottomNav } from '@/components/dashboard/bottom-nav'

export default function DashboardPage() {
  return (
    /*
     * Outer wrapper: centers and constrains to 390px on wider screens,
     * keeping the mobile-first appearance intact.
     */
    <div className="flex justify-center bg-[#050505] min-h-screen">
      <main
        className="relative w-full max-w-[390px] min-h-screen bg-background flex flex-col overflow-x-hidden"
        aria-label="Creator dashboard"
      >
        {/* Subtle top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/4 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-28">
          {/* ── Top section ────────────────────────────────────── */}
          <ChannelHeader />

          {/* Greeting */}
          <div className="px-5 pt-4 pb-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Good evening
            </p>
            <h2 className="text-[26px] font-extrabold text-foreground leading-tight tracking-tight text-balance">
              Your channel is{' '}
              <span className="text-primary glow-coral">on fire</span> this week.
            </h2>
          </div>

          {/* ── Stat cards ─────────────────────────────────────── */}
          <StatCardsRow />

          {/* ── Spacing ────────────────────────────────────────── */}
          <div className="h-5" />

          {/* ── Performance score banner ───────────────────────── */}
          <WeeklySummary />

          <div className="h-5" />

          {/* ── Quick insights ─────────────────────────────────── */}
          <QuickInsights />

          <div className="h-5" />

          {/* ── Top Videos ─────────────────────────────────────── */}
          <TopVideos />
        </div>

        {/* ── Fixed Bottom Navigation ────────────────────────── */}
        <BottomNav />
      </main>
    </div>
  )
}
