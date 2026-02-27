import { VideoItem as VideoItemType } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface VideoItemProps {
  video: VideoItemType
  isLast: boolean
}

export function VideoItem({ video, isLast }: VideoItemProps) {
  const retentionColor =
    video.retention >= 85
      ? 'bg-primary/10 text-primary border border-primary/20'
      : video.retention >= 70
      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      : 'bg-muted text-muted-foreground border border-border'

  return (
    <>
      <article className="flex items-start gap-3 py-4">
        {/* Thumbnail */}
        <div
          className={cn(
            'relative flex-shrink-0 w-[104px] h-[58px] rounded-xl overflow-hidden',
            'bg-gradient-to-br',
            video.thumbnailGradient
          )}
          aria-label={video.thumbnailAlt}
        >
          {/* Duration badge */}
          <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <span className="text-[9px] font-semibold text-white tracking-wide">
              {video.duration}
            </span>
          </div>
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                <path d="M1 1L9 6L1 11V1Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5 pt-0.5">
          <h3 className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground font-medium">{video.views}</span>
            <span
              className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide',
                retentionColor
              )}
            >
              {video.retention}% retention
            </span>
          </div>
        </div>

        {/* More icon */}
        <button
          className="flex-shrink-0 mt-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="More options"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="3.5" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="12.5" r="1.2" fill="currentColor" />
          </svg>
        </button>
      </article>

      {/* Divider */}
      {!isLast && <div className="h-px bg-border" />}
    </>
  )
}
