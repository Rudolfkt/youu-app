import { channelData } from '@/lib/dashboard-data'

export function ChannelHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-14 pb-2">
      {/* Left: Avatar + Channel info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-orange-600 flex items-center justify-center ring-2 ring-primary/30"
            aria-label={`${channelData.name} channel avatar`}
          >
            <span className="text-[15px] font-black text-white tracking-tight select-none">
              {channelData.avatarInitials}
            </span>
          </div>
          {/* Online dot */}
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-background"
            aria-hidden="true"
          />
        </div>

        {/* Channel name + subscribers */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[15px] font-bold text-foreground leading-none tracking-tight">
            {channelData.name}
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-semibold text-foreground/80">
              {channelData.subscribers}
            </span>
            <div className="flex items-center gap-0.5">
              {/* Green up arrow */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 2L8.5 7H1.5L5 2Z" fill="#4ADE80" />
              </svg>
              <span className="text-[11px] font-semibold text-green-400">
                {channelData.subscriberChange}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Week badge + notification bell */}
      <div className="flex items-center gap-2.5">
        {/* Week badge */}
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
          {/* Pulsing dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">
            {channelData.weekBadge}
          </span>
        </div>

        {/* Notification bell */}
        <button
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative"
          aria-label="Notifications"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2C5.79 2 4 3.79 4 6V9L2.5 10.5V11H13.5V10.5L12 9V6C12 3.79 10.21 2 8 2Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 12.5C6.5 13.33 7.17 14 8 14C8.83 14 9.5 13.33 9.5 12.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          {/* Unread badge */}
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  )
}
