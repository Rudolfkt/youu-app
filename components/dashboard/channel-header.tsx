import { channelData } from '@/lib/dashboard-data'

export function ChannelHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-14 pb-4">
      {/* Left: Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center ring-2 ring-primary/25 ring-offset-2 ring-offset-background"
            aria-label={`${channelData.name} avatar`}
          >
            <span className="text-[13px] font-black text-white tracking-tight select-none">
              {channelData.avatarInitials}
            </span>
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-bold text-foreground leading-none">
            {channelData.name}
          </p>
          <p className="text-[11px] text-muted-foreground font-medium">
            {channelData.handle}
          </p>
        </div>
      </div>

      {/* Right: live badge + bell */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">
            {channelData.weekLabel}
          </span>
        </div>

        <button
          className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path
              d="M8.5 2C6.29 2 4.5 3.79 4.5 6V9.5L3 11V11.5H14V11L12.5 9.5V6C12.5 3.79 10.71 2 8.5 2Z"
              stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M7 12.5C7 13.33 7.67 14 8.5 14C9.33 14 10 13.33 10 12.5"
              stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
