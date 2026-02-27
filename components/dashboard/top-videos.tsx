import { topVideos } from '@/lib/dashboard-data'
import { VideoItem } from './video-item'

export function TopVideos() {
  return (
    <section aria-label="This week's top videos">
      <div className="flex items-center justify-between px-5 mb-1">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {"This Week's Top Videos"}
        </h2>
        <button className="text-[11px] font-semibold text-primary/80 hover:text-primary transition-colors">
          View all
        </button>
      </div>

      <div className="mx-5 card-glow rounded-2xl bg-card px-4">
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
