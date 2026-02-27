import { topVideos } from '@/lib/dashboard-data'
import { VideoItem } from './video-item'

export function TopVideos() {
  return (
    <section aria-label="Trending videos this week">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-[15px] font-bold text-foreground tracking-tight">
          Trending This Week 🔥
        </h2>
        <button className="text-[11px] font-semibold text-primary/70 hover:text-primary transition-colors">
          View all
        </button>
      </div>

      <div className="mx-5 rounded-[20px] bg-card border border-white/[0.04] card-base overflow-hidden">
        {topVideos.map((video, index) => (
          <VideoItem
            key={video.id}
            video={video}
            isLast={index === topVideos.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
