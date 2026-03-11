'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Download, Share2, X } from 'lucide-react'
import { toPng } from 'html-to-image'

// ────────────────────────────────────────────
// Types
// ────────────────────────────────────────────

interface VideoData {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount: number
  likeCount: number
  duration: string
}

interface CardMeta {
  theme: 'dark' | 'light'
  render: () => React.ReactNode
}

// ────────────────────────────────────────────
// Mock Data (channel cards)
// ────────────────────────────────────────────

const MOCK_DATA = {
  month: 'February',
  subscribers: { current: 953, nextMilestone: 1_000 },
  subscriberGrowth: { thisWeek: 48, lastWeek: 31 },
  watchTimeHours: 97.7,
  watchTimeLastWeekHours: 64.2,
  totalViews: '124.5K',
  uniqueViewers: '89.2K',
  bestVideoEver: {
    title: 'I tried building a mechanical keyboard from scratch',
    views: '284K',
    date: 'Jan 8, 2026',
  },
  topVideosByViews: [
    { title: 'I tried building a mechanical keyboard from scratch', views: '45.2K' },
    { title: 'Desk Setup Tour 2026 (Minimalist)', views: '38.1K' },
    { title: 'Why I stopped using notion.', views: '22.9K' },
    { title: 'My favorite VS Code extensions', views: '11.4K' },
    { title: 'Day in the life of a designer', views: '6.9K' },
  ],
  topVideosByLikes: [
    { title: 'I tried building a mechanical keyboard from scratch', likes: '12.4K' },
    { title: 'Desk Setup Tour 2026 (Minimalist)', likes: '9.8K' },
    { title: 'Day in the life of a designer', likes: '7.1K' },
    { title: 'Why I stopped using notion.', likes: '5.6K' },
    { title: 'My favorite VS Code extensions', likes: '3.2K' },
  ],
  topCountries: [
    { flag: '🇺🇸', name: 'United States', percent: 38 },
    { flag: '🇬🇧', name: 'United Kingdom', percent: 18 },
    { flag: '🇯🇵', name: 'Japan', percent: 14 },
    { flag: '🇩🇪', name: 'Germany', percent: 9 },
    { flag: '🇧🇷', name: 'Brazil', percent: 7 },
  ],
  bestDays: [
    { date: 'Feb 14', views: '18.2K' },
    { date: 'Feb 3', views: '15.8K' },
    { date: 'Jan 28', views: '14.1K' },
    { date: 'Jan 12', views: '12.7K' },
    { date: 'Feb 21', views: '11.9K' },
  ],
  audienceLoyalty: { avd: '4:24', ctr: '6.8%', talkScore: '2,340' },
}

// ────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ────────────────────────────────────────────
// Card Header (shared)
// ────────────────────────────────────────────

function CardHeader({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <span className={`text-[14px] font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'}`}>
        youu
      </span>
      <Sparkles size={16} className={theme === 'dark' ? 'text-white/80' : 'text-black/40'} />
    </div>
  )
}

// ────────────────────────────────────────────
// Channel Card Renderers (1-9)
// ────────────────────────────────────────────

function renderChannelCard1(): React.ReactNode {
  const { current, nextMilestone } = MOCK_DATA.subscribers
  const away = nextMilestone - current
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-4">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Subscriber<br />Milestone</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[72px] font-black text-white tracking-tighter leading-none mb-3">
          {current.toLocaleString()}
        </h1>
        <p className="text-[22px] font-bold text-amber-400 tracking-tight leading-snug">
          {away} away from {nextMilestone.toLocaleString()} 🎉
        </p>
      </div>
      <div className="mt-auto">
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-400"
            style={{ width: `${(current / nextMilestone) * 100}%` }}
          />
        </div>
        <p className="text-[12px] text-white/40 mt-2 font-medium">
          {Math.round((current / nextMilestone) * 100)}% to {nextMilestone.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

function renderChannelCard2(): React.ReactNode {
  const { thisWeek, lastWeek } = MOCK_DATA.subscriberGrowth
  const change = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0
  const isUp = change >= 0
  return (
    <div className="h-full flex flex-col p-8">
      <CardHeader theme="light" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Subscriber<br />Growth</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div>
          <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">This Week</p>
          <p className="text-[56px] font-black text-[#1C1C1E] tracking-tighter leading-none">+{thisWeek}</p>
        </div>
        <div>
          <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Last Week</p>
          <p className="text-[36px] font-black text-[#8E8E93] tracking-tighter leading-none">+{lastWeek}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <span className={`text-[32px] font-black tracking-tight ${isUp ? 'text-green-600' : 'text-red-500'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-[14px] font-medium text-[#8E8E93]">vs last week</span>
      </div>
    </div>
  )
}

function renderChannelCard3(): React.ReactNode {
  const hrs = MOCK_DATA.watchTimeHours
  const lastHrs = MOCK_DATA.watchTimeLastWeekHours
  const multiplier = lastHrs > 0 ? (hrs / lastHrs).toFixed(1) : '—'
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-4">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Watch<br />Time</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[64px] font-black text-white tracking-tighter leading-none mb-4">
          {hrs}h
        </h1>
        <p className="text-[18px] font-bold text-white/80 leading-relaxed tracking-tight max-w-[90%]">
          Your audience spent {hrs} hours watching you — that&apos;s {multiplier}x more than last week.
        </p>
      </div>
      <div className="mt-auto border-t border-white/10 pt-6 flex gap-8">
        <div>
          <p className="text-[12px] font-medium text-white/50 uppercase tracking-wider mb-1">Total Views</p>
          <p className="text-[20px] font-bold text-white">{MOCK_DATA.totalViews}</p>
        </div>
        <div>
          <p className="text-[12px] font-medium text-white/50 uppercase tracking-wider mb-1">Unique Viewers</p>
          <p className="text-[20px] font-bold text-white">{MOCK_DATA.uniqueViewers}</p>
        </div>
      </div>
    </div>
  )
}

function renderChannelCard4(): React.ReactNode {
  const v = MOCK_DATA.bestVideoEver
  return (
    <div className="h-full flex flex-col p-8">
      <CardHeader theme="light" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Best Video<br />Ever</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">All Time</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="w-full aspect-video rounded-2xl bg-[#E8E4DA] border border-black/5" />
        <div>
          <p className="text-[18px] font-black text-[#1C1C1E] tracking-tight leading-snug mb-2">{v.title}</p>
          <p className="text-[14px] font-medium text-[#8E8E93]">{v.date}</p>
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-[48px] font-black text-[#1C1C1E] tracking-tighter leading-none">{v.views}</p>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1">views</p>
      </div>
    </div>
  )
}

function renderChannelCard5(): React.ReactNode {
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Top Videos<br />This Week</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">By Views</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5">
        {MOCK_DATA.topVideosByViews.map((v, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-white/40 w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-white truncate tracking-tight">{v.title}</p>
            </div>
            <span className="text-[14px] font-bold text-amber-400 flex-shrink-0">{v.views}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderChannelCard6(): React.ReactNode {
  return (
    <div className="h-full flex flex-col p-8">
      <CardHeader theme="light" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Most Liked<br />Videos</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">By Likes</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5">
        {MOCK_DATA.topVideosByLikes.map((v, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#8E8E93] w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#1C1C1E] truncate tracking-tight">{v.title}</p>
            </div>
            <span className="text-[14px] font-bold text-[#1C1C1E] flex-shrink-0">♥ {v.likes}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderChannelCard7(): React.ReactNode {
  const maxPercent = Math.max(...MOCK_DATA.topCountries.map((c) => c.percent))
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Top<br />Countries</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5">
        {MOCK_DATA.topCountries.map((c, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[20px] leading-none">{c.flag}</span>
                <span className="text-[15px] font-bold text-white tracking-tight">{c.name}</span>
              </div>
              <span className="text-[14px] font-bold text-white/60">{c.percent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${(c.percent / maxPercent) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderChannelCard8(): React.ReactNode {
  return (
    <div className="h-full flex flex-col p-8">
      <CardHeader theme="light" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Best Single<br />Days Ever</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">All Time</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5">
        {MOCK_DATA.bestDays.map((d, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#8E8E93] w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#1C1C1E] tracking-tight">{d.date}</p>
            </div>
            <span className="text-[14px] font-bold text-[#1C1C1E] flex-shrink-0">{d.views} views</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderChannelCard9(): React.ReactNode {
  const stats = MOCK_DATA.audienceLoyalty
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Audience<br />Loyalty</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5">
        <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Avg View Duration</p>
          <p className="text-[36px] font-black text-white tracking-tight leading-none">{stats.avd}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 rounded-2xl border border-white/10 p-5 bg-white/5">
            <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">CTR</p>
            <p className="text-[28px] font-black text-white tracking-tight leading-none">{stats.ctr}</p>
          </div>
          <div className="flex-1 rounded-2xl border border-white/10 p-5 bg-white/5">
            <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Talk Score</p>
            <p className="text-[28px] font-black text-amber-400 tracking-tight leading-none">{stats.talkScore}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
// Channel cards array
// ────────────────────────────────────────────

const CHANNEL_CARDS: CardMeta[] = [
  { theme: 'dark', render: renderChannelCard1 },
  { theme: 'light', render: renderChannelCard2 },
  { theme: 'dark', render: renderChannelCard3 },
  { theme: 'light', render: renderChannelCard4 },
  { theme: 'dark', render: renderChannelCard5 },
  { theme: 'light', render: renderChannelCard6 },
  { theme: 'dark', render: renderChannelCard7 },
  { theme: 'light', render: renderChannelCard8 },
  { theme: 'dark', render: renderChannelCard9 },
]

// ────────────────────────────────────────────
// Video Card Renderer
// ────────────────────────────────────────────

function renderVideoCard(video: VideoData): React.ReactNode {
  const engagement = video.viewCount > 0 ? Math.round((video.likeCount / video.viewCount) * 100) : 0
  return (
    <div className="h-full flex flex-col relative z-10 p-8">
      <CardHeader theme="dark" />
      <div className="mt-2">
        <p className="text-[15px] font-bold text-white/80 leading-snug tracking-tight mb-6 line-clamp-2">
          {video.title}
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-1">Views</p>
        <h1 className="text-[64px] font-black text-white tracking-tighter leading-none mb-6">
          {formatCount(video.viewCount)}
        </h1>
        <div className="flex gap-6">
          <div>
            <p className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-1">Likes</p>
            <p className="text-[24px] font-black text-white tracking-tight leading-none">
              {formatCount(video.likeCount)}
            </p>
          </div>
          <div>
            <p className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-1">Engagement</p>
            <p className="text-[24px] font-black text-amber-400 tracking-tight leading-none">{engagement}%</p>
          </div>
        </div>
      </div>
      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="text-[13px] font-medium text-white/50">Uploaded {formatDate(video.publishedAt)}</p>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
// CardPreview — fullscreen long-press overlay
// ────────────────────────────────────────────

function CardPreview({
  cardRef,
  onClose,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
}) {
  const [saving, setSaving] = useState(false)

  const exportPng = useCallback(async () => {
    if (!cardRef.current) return
    setSaving(true)
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
      const link = document.createElement('a')
      link.download = 'youu-card.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed', err)
    } finally {
      setSaving(false)
    }
  }, [cardRef])

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return
    setSaving(true)
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const file = new File([blob], 'youu-card.png', { type: 'image/png' })

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Youu Card' })
      } else {
        // Fallback to download
        const link = document.createElement('a')
        link.download = 'youu-card.png'
        link.href = dataUrl
        link.click()
      }
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') {
        console.error('Share failed', err)
      }
    } finally {
      setSaving(false)
    }
  }, [cardRef])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-12 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        aria-label="Close preview"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Prevent card click from closing */}
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[340px] px-4" />

      {/* Action buttons */}
      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 px-6 anim-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={exportPng}
          disabled={saving}
          className="flex-1 max-w-[180px] h-[52px] rounded-full bg-white text-black font-bold text-[15px] flex items-center justify-center gap-2 press-scale disabled:opacity-50"
        >
          <Download size={18} />
          {saving ? 'Saving…' : 'Save to Device'}
        </button>
        <button
          onClick={handleShare}
          disabled={saving}
          className="flex-1 max-w-[180px] h-[52px] rounded-full bg-white/15 text-white font-bold text-[15px] flex items-center justify-center gap-2 press-scale disabled:opacity-50 border border-white/20"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
// VideoSelector — horizontal thumbnail list
// ────────────────────────────────────────────

function VideoSelector({
  videos,
  selectedId,
  onSelect,
}: {
  videos: VideoData[]
  selectedId: string
  onSelect: (v: VideoData) => void
}) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 py-3">
      {videos.map((v) => {
        const isActive = v.id === selectedId
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="flex-shrink-0 flex flex-col gap-1.5 w-[120px] text-left"
          >
            <div
              className="w-[120px] h-[68px] rounded-xl bg-cover bg-center border-2 transition-all"
              style={{
                backgroundImage: v.thumbnail ? `url(${v.thumbnail})` : undefined,
                backgroundColor: v.thumbnail ? undefined : '#1A1A1A',
                borderColor: isActive ? '#F59E0B' : 'transparent',
                opacity: isActive ? 1 : 0.6,
              }}
            />
            <p
              className="text-[11px] font-medium leading-tight line-clamp-2"
              style={{ color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)' }}
            >
              {v.title}
            </p>
          </button>
        )
      })}
    </div>
  )
}

// ────────────────────────────────────────────
// ScrollableCards — snap-scroll container
// ────────────────────────────────────────────

function ScrollableCards({
  cards,
  activeIdx,
  onActiveChange,
  cardRef,
  onLongPress,
}: {
  cards: CardMeta[]
  activeIdx: number
  onActiveChange: (idx: number) => void
  cardRef: React.RefObject<HTMLDivElement | null>
  onLongPress: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync scroll → active index via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const children = Array.from(container.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = children.indexOf(entry.target as HTMLElement)
            if (idx >= 0) onActiveChange(idx)
          }
        }
      },
      { root: container, threshold: 0.6 }
    )
    children.forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [cards.length, onActiveChange])

  const handlePointerDown = () => {
    longPressTimer.current = setTimeout(onLongPress, 500)
  }
  const handlePointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-5 overflow-x-auto no-scrollbar px-5 py-2"
      style={{ scrollSnapType: 'x mandatory' }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          ref={idx === activeIdx ? cardRef : undefined}
          className="flex-shrink-0 relative shadow-2xl"
          style={{
            width: 'min(300px, 78vw)',
            aspectRatio: '9/16',
            borderRadius: '24px',
            backgroundColor: card.theme === 'dark' ? '#000000' : '#F5F0E6',
            overflow: 'hidden',
            scrollSnapAlign: 'start',
          }}
        >
          {card.theme === 'dark' && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.25), transparent 60%)' }}
            />
          )}
          {card.render()}
        </div>
      ))}
    </div>
  )
}

// ────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────

type Tab = 'channel' | 'video'

export function ScreenShare() {
  // Tab state
  const [tab, setTab] = useState<Tab>('channel')

  // Channel cards
  const [channelIdx, setChannelIdx] = useState(0)
  const channelCardRef = useRef<HTMLDivElement>(null)

  // Video tab
  const [videos, setVideos] = useState<VideoData[]>([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [videosError, setVideosError] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [videoCardIdx, setVideoCardIdx] = useState(0)
  const videoCardRef = useRef<HTMLDivElement>(null)

  // Preview overlay
  const [showPreview, setShowPreview] = useState(false)

  // Fetch videos once when switching to video tab
  useEffect(() => {
    if (tab !== 'video' || videos.length > 0 || videosLoading) return
    setVideosLoading(true)
    setVideosError(false)

    fetch('/api/youtube/channel')
      .then((r) => r.json())
      .then((ch) => {
        if (ch.error) throw new Error(ch.error)
        return fetch(`/api/youtube/videos?channelId=${ch.channelId}`)
      })
      .then((r) => r.json())
      .then((data: VideoData[]) => {
        if (!Array.isArray(data)) throw new Error('Invalid response')
        setVideos(data)
        if (data.length > 0) setSelectedVideo(data[0])
      })
      .catch(() => setVideosError(true))
      .finally(() => setVideosLoading(false))
  }, [tab, videos.length, videosLoading])

  // Build video cards array from the single selected video
  const videoCards: CardMeta[] = selectedVideo
    ? [{ theme: 'dark' as const, render: () => renderVideoCard(selectedVideo) }]
    : []

  const activeCardRef = tab === 'channel' ? channelCardRef : videoCardRef
  const activeIdx = tab === 'channel' ? channelIdx : videoCardIdx
  const activeCards = tab === 'channel' ? CHANNEL_CARDS : videoCards

  return (
    <div className="flex flex-col h-[100dvh] bg-background text-foreground overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex items-center gap-1 mx-5 mt-4 mb-2 p-1 rounded-full bg-muted">
        <button
          onClick={() => setTab('channel')}
          className="flex-1 h-9 rounded-full text-[13px] font-bold tracking-tight transition-all"
          style={{
            background: tab === 'channel' ? 'var(--foreground)' : 'transparent',
            color: tab === 'channel' ? 'var(--background)' : 'var(--muted-foreground)',
          }}
        >
          Channel
        </button>
        <button
          onClick={() => setTab('video')}
          className="flex-1 h-9 rounded-full text-[13px] font-bold tracking-tight transition-all"
          style={{
            background: tab === 'video' ? 'var(--foreground)' : 'transparent',
            color: tab === 'video' ? 'var(--background)' : 'var(--muted-foreground)',
          }}
        >
          Videos
        </button>
      </div>

      {/* Channel Tab */}
      {tab === 'channel' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex items-center min-h-0">
            <ScrollableCards
              cards={CHANNEL_CARDS}
              activeIdx={channelIdx}
              onActiveChange={setChannelIdx}
              cardRef={channelCardRef}
              onLongPress={() => setShowPreview(true)}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 pb-4 pt-3 px-5">
            {CHANNEL_CARDS.map((_, idx) => (
              <span
                key={idx}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: idx === channelIdx ? 24 : 8,
                  background: idx === channelIdx ? 'var(--foreground)' : 'var(--foreground)',
                  opacity: idx === channelIdx ? 1 : 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Video Tab */}
      {tab === 'video' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Video selector — loading / error / list */}
          {videosLoading && (
            <div className="flex gap-3 px-5 py-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 flex flex-col gap-1.5 w-[120px]">
                  <div className="w-[120px] h-[68px] rounded-xl bg-muted animate-pulse" />
                  <div className="w-20 h-3 rounded bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          )}
          {videosError && (
            <div className="px-5 py-4">
              <p className="text-[13px] text-muted-foreground">Could not load videos. Please try again later.</p>
            </div>
          )}
          {!videosLoading && !videosError && videos.length > 0 && selectedVideo && (
            <VideoSelector videos={videos} selectedId={selectedVideo.id} onSelect={setSelectedVideo} />
          )}

          {/* Video stat card */}
          <div className="flex-1 flex items-center min-h-0">
            {selectedVideo ? (
              <ScrollableCards
                cards={videoCards}
                activeIdx={videoCardIdx}
                onActiveChange={setVideoCardIdx}
                cardRef={videoCardRef}
                onLongPress={() => setShowPreview(true)}
              />
            ) : (
              !videosLoading && (
                <div className="flex-1 flex items-center justify-center px-5">
                  <p className="text-[14px] text-muted-foreground text-center">
                    {videosError ? 'Failed to load videos.' : 'Select a video above to see stats.'}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Single dot for video */}
          {selectedVideo && (
            <div className="flex justify-center pb-4 pt-3">
              <span className="h-2 w-6 rounded-full" style={{ background: 'var(--foreground)' }} />
            </div>
          )}
        </div>
      )}

      {/* Long-press hint */}
      <p className="text-center text-[11px] text-muted-foreground pb-8">
        Long-press any card to save or share
      </p>

      {/* Fullscreen Preview */}
      {showPreview && <CardPreview cardRef={activeCardRef} onClose={() => setShowPreview(false)} />}
    </div>
  )
}