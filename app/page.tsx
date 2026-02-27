import { ChannelHeader } from '@/components/dashboard/channel-header'
import { HeroStat } from '@/components/dashboard/hero-stat'
import { StatCardsRow } from '@/components/dashboard/stat-cards-row'
import { WeeklySummary } from '@/components/dashboard/weekly-summary'
import { QuickInsights } from '@/components/dashboard/quick-insights'
import { TopVideos } from '@/components/dashboard/top-videos'
import { BottomNav } from '@/components/dashboard/bottom-nav'

export default function DashboardPage() {
  return (
    <div className="flex justify-center bg-[#050505] min-h-screen">
      <main
        className="relative w-full max-w-[390px] min-h-screen bg-background flex flex-col overflow-x-hidden"
        aria-label="Creator analytics dashboard"
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-28">

          {/* 1. Top bar */}
          <ChannelHeader />

          {/* 2. Hero stat — giant number + emotional headline */}
          <HeroStat />

          {/* 3. Pill cards — scrollable row with vivid gradients */}
          <StatCardsRow />

          <div className="h-6" />

          {/* 4. Performance Pulse — glowing ring */}
          <WeeklySummary />

          <div className="h-6" />

          {/* 5. Top Videos — trending section */}
          <TopVideos />

          <div className="h-6" />

          {/* 6. Quick Insights */}
          <QuickInsights />

          <div className="h-4" />
        </div>

        {/* 7. Fixed frosted-glass bottom nav */}
        <BottomNav />
      </main>
    </div>
  )
}
