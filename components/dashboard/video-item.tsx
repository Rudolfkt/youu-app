import { VideoData } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface VideoItemProps {
  video: VideoData
  isLast: boolean
}

export function VideoItem({ video, isLast }: VideoItemProps) {
  const retentionClass =
    video.retention >= 85
      ? 'bg-green-400/10 text-green-400 border-green-400/20'
      : video.retention >= 70
      ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
      : 'bg-muted text-muted-foreground border-border'

  return (
    <>
      <article className="flex items-start gap-3 py-4">
        {/* Gradient left accent bar */}
        <div
          className="flex-shrink-0 w-[3px] self-stretch rounded-full mt-0.5"
          style={{ background: video.accentColor }}
          aria-hidden="true"
        />

        {/* Thumbnail */}
        <div
          className={cn(
            'relative flex-shrink-0 w-[100px] h-[56px] rounded-xl overflow-hidden bg-gradient-to-br',
            video.thumbnailGradient
          )}
          aria-label={video.thumbnailAlt}
        >
          {/* Duration */}
          <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <span className="text-[9px] font-semibold text-white tracking-wide">
              {video.duration}
            </span>
          </div>
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
                <path d="M1 1L8 5.5L1 10V1Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
          {/* Top video badge */}
          {video.isTop && (
            <div className="absolute top-1.5 left-1.5 bg-primary/90 rounded px-1.5 py-0.5">
              <span className="text-[8px] font-black text-white tracking-wide">#1</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <h3 className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2 tracking-tight">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-muted-foreground font-medium">{video.views}</span>
            <span
              className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide',
                retentionClass
              )}
            >
              {video.retention}% kept
            </span>
          </div>
        </div>
      </article>
      {!isLast && <div className="h-px bg-border ml-4" />}
    </>
  )
}
