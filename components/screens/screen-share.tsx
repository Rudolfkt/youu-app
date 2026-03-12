'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Download, Share2, X } from 'lucide-react'
import { toPng } from 'html-to-image'

// ─── Types ──────────────────────────────────────────────

interface VideoData {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount: number
  likeCount: number
  duration: string
}

interface ThemeConfig {
  id: string
  bg: string
  text: string
  textMuted: string
  accent: string
  statBg: string
  statBorder: string
  glowColor: string | null
  swatch: string
  isDark: boolean
}

type Tab = 'channel' | 'video'

// ─── Themes ─────────────────────────────────────────────

const THEMES: ThemeConfig[] = [
  {
    id: 'midnight',
    bg: '#000000',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
    accent: '#FF6B6B',
    statBg: '#161616',
    statBorder: 'rgba(255,255,255,0.08)',
    glowColor: 'rgba(217,119,6,0.2)',
    swatch: '#000000',
    isDark: true,
  },
  {
    id: 'parchment',
    bg: '#F5F0E6',
    text: '#1C1C1E',
    textMuted: '#8E8E93',
    accent: '#FF6B6B',
    statBg: '#FFFFFF',
    statBorder: 'rgba(0,0,0,0.06)',
    glowColor: null,
    swatch: '#F5F0E6',
    isDark: false,
  },
  {
    id: 'ocean',
    bg: '#0A1628',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
    accent: '#00D4FF',
    statBg: '#0F1F35',
    statBorder: 'rgba(0,212,255,0.1)',
    glowColor: 'rgba(0,212,255,0.15)',
    swatch: '#0A1628',
    isDark: true,
  },
  {
    id: 'forest',
    bg: '#0A1A0F',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
    accent: '#00E676',
    statBg: '#0F2416',
    statBorder: 'rgba(0,230,118,0.1)',
    glowColor: 'rgba(0,230,118,0.12)',
    swatch: '#0A1A0F',
    isDark: true,
  },
  {
    id: 'ember',
    bg: '#1A0A00',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
    accent: '#FF6B35',
    statBg: '#241405',
    statBorder: 'rgba(255,107,53,0.1)',
    glowColor: 'rgba(255,107,53,0.15)',
    swatch: '#1A0A00',
    isDark: true,
  },
  {
    id: 'mono',
    bg: '#111111',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
    accent: '#FFFFFF',
    statBg: '#1A1A1A',
    statBorder: 'rgba(255,255,255,0.08)',
    glowColor: null,
    swatch: '#111111',
    isDark: true,
  },
]

// ─── Mock Data ──────────────────────────────────────────

const MOCK_DATA = {
  channelName: 'Creator',
  month: 'March 2026',
  subscribers: { current: 953, nextMilestone: 1_000 },
  subscriberGrowth: { thisWeek: 48, lastWeek: 31 },
  watchTimeHours: 97.7,
  watchTimeLastWeekHours: 64.2,
  totalViews: '124.5K',
  uniqueViewers: '89.2K',
  totalVideos: 42,
  totalMinutes: 5_860,
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

// ─── Constants ──────────────────────────────────────────

const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const CHANNEL_CARD_COUNT = 9

// ─── Helpers ────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── Noise Overlay ──────────────────────────────────────

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.035]"
      style={{ backgroundImage: NOISE_URL, backgroundSize: '128px 128px' }}
    />
  )
}

// ─── Card Identity (top) ────────────────────────────────

function CardIdentity({ t }: { t: ThemeConfig }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: t.accent }}
      >
        <span className="text-[10px] font-bold" style={{ color: t.isDark ? '#000' : '#FFF' }}>
          {MOCK_DATA.channelName[0]}
        </span>
      </div>
      <span className="text-[12px] font-medium tracking-tight" style={{ color: t.textMuted }}>
        {MOCK_DATA.channelName}
      </span>
    </div>
  )
}

// ─── Card Footer (bottom) ───────────────────────────────

function CardFooter({ t }: { t: ThemeConfig }) {
  return (
    <div className="flex justify-between items-center mt-auto pt-4">
      <span className="text-[12px] font-bold tracking-tight" style={{ color: t.textMuted }}>
        youu
      </span>
      <span className="text-[11px] font-medium tracking-wide" style={{ color: t.textMuted }}>
        {MOCK_DATA.month.toLowerCase()}
      </span>
    </div>
  )
}

// ─── Two-Line Title ─────────────────────────────────────

function CardTitle({ line1, line2, t }: { line1: string; line2: string; t: ThemeConfig }) {
  return (
    <h2 className="leading-none tracking-tighter mb-2">
      <span className="block text-[48px] font-black anim-fade-up" style={{ color: t.text }}>
        {line1}
      </span>
      <span
        className="block text-[48px] font-black anim-fade-up"
        style={{ color: t.accent, animationDelay: '80ms' }}
      >
        {line2}
      </span>
    </h2>
  )
}

// ─── Stat Pill ──────────────────────────────────────────

function StatPill({
  label,
  value,
  t,
  valueColor,
}: {
  label: string
  value: string
  t: ThemeConfig
  valueColor?: string
}) {
  return (
    <div
      className="flex-1 rounded-2xl p-4"
      style={{ background: t.statBg, border: `1px solid ${t.statBorder}` }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-wider mb-1"
        style={{ color: t.textMuted }}
      >
        {label}
      </p>
      <p
        className="text-[22px] font-black tracking-tight leading-none"
        style={{ color: valueColor ?? t.text }}
      >
        {value}
      </p>
    </div>
  )
}

// ─── Channel Card Renderers ─────────────────────────────

function renderCard1(t: ThemeConfig): React.ReactNode {
  const { current, nextMilestone } = MOCK_DATA.subscribers
  const away = nextMilestone - current
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="your" line2="subscribers" t={t} />
      <div className="flex-1 flex flex-col justify-center">
        <p
          className="text-[72px] font-black tracking-tighter leading-none mb-3"
          style={{ color: t.text }}
        >
          {current.toLocaleString()}
        </p>
        <p className="text-[18px] font-bold tracking-tight leading-snug" style={{ color: t.accent }}>
          {away} away from {nextMilestone.toLocaleString()} 🎉
        </p>
      </div>
      <div className="flex gap-3 anim-fade-up" style={{ animationDelay: '160ms' }}>
        <StatPill label="Total Views" value={MOCK_DATA.totalViews} t={t} />
        <StatPill label="Videos" value={String(MOCK_DATA.totalVideos)} t={t} />
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard2(t: ThemeConfig): React.ReactNode {
  const { thisWeek, lastWeek } = MOCK_DATA.subscriberGrowth
  const change = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0
  const isUp = change >= 0
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="subscriber" line2="growth" t={t} />
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-wider mb-1"
            style={{ color: t.textMuted }}
          >
            This Week
          </p>
          <p
            className="text-[56px] font-black tracking-tighter leading-none"
            style={{ color: t.text }}
          >
            +{thisWeek}
          </p>
        </div>
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-wider mb-1"
            style={{ color: t.textMuted }}
          >
            Last Week
          </p>
          <p
            className="text-[40px] font-black tracking-tighter leading-none"
            style={{ color: t.textMuted }}
          >
            +{lastWeek}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 anim-fade-up" style={{ animationDelay: '160ms' }}>
        <span className="text-[36px] font-black tracking-tight" style={{ color: t.accent }}>
          {isUp ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-[14px] font-medium" style={{ color: t.textMuted }}>
          vs last week
        </span>
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard3(t: ThemeConfig): React.ReactNode {
  const hrs = MOCK_DATA.watchTimeHours
  const days = (hrs / 24).toFixed(1)
  const avgPerVideo =
    MOCK_DATA.totalVideos > 0
      ? Math.round(MOCK_DATA.totalMinutes / MOCK_DATA.totalVideos)
      : 0
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="watch" line2="time" t={t} />
      <div className="flex-1 flex flex-col justify-center">
        <p
          className="text-[64px] font-black tracking-tighter leading-none mb-4"
          style={{ color: t.text }}
        >
          {hrs}h
        </p>
        <p
          className="text-[17px] font-bold leading-relaxed tracking-tight"
          style={{ color: t.textMuted }}
        >
          Your audience spent {hrs} hours watching you — that&apos;s {days} days of content.
        </p>
      </div>
      <div className="flex gap-3 anim-fade-up" style={{ animationDelay: '160ms' }}>
        <StatPill label="Total Mins" value={MOCK_DATA.totalMinutes.toLocaleString()} t={t} />
        <StatPill label="Avg / Video" value={`${avgPerVideo}m`} t={t} />
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard4(t: ThemeConfig): React.ReactNode {
  const v = MOCK_DATA.bestVideoEver
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="best video" line2="ever" t={t} />
      <div className="flex-1 flex flex-col justify-center gap-5">
        <div
          className="w-full aspect-video rounded-2xl"
          style={{ background: t.statBg, border: `1px solid ${t.statBorder}` }}
        />
        <div>
          <p
            className="text-[17px] font-black tracking-tight leading-snug mb-2 line-clamp-2"
            style={{ color: t.text }}
          >
            {v.title}
          </p>
          <p className="text-[13px] font-medium" style={{ color: t.textMuted }}>
            {v.date}
          </p>
        </div>
        <p
          className="text-[48px] font-black tracking-tighter leading-none"
          style={{ color: t.text }}
        >
          {v.views}
          <span className="text-[16px] font-medium ml-2" style={{ color: t.textMuted }}>
            views
          </span>
        </p>
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard5(t: ThemeConfig): React.ReactNode {
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="top" line2="videos" t={t} />
      <p
        className="text-[12px] font-medium uppercase tracking-widest mb-6"
        style={{ color: t.textMuted }}
      >
        This Week · By Views
      </p>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {MOCK_DATA.topVideosByViews.map((v, i) => (
          <div key={i} className="flex items-center gap-3 relative">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: t.statBg, border: `1px solid ${t.statBorder}` }}
            />
            <div className="flex-1 min-w-0 pr-10">
              <p
                className="text-[14px] font-bold truncate tracking-tight"
                style={{ color: t.text }}
              >
                {v.title}
              </p>
              <p className="text-[12px] font-medium" style={{ color: t.textMuted }}>
                {v.views} views
              </p>
            </div>
            <span
              className="absolute right-0 text-[80px] font-black leading-none select-none"
              style={{ color: t.text, opacity: 0.06 }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard6(t: ThemeConfig): React.ReactNode {
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="most" line2="liked" t={t} />
      <p
        className="text-[12px] font-medium uppercase tracking-widest mb-6"
        style={{ color: t.textMuted }}
      >
        By Likes
      </p>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {MOCK_DATA.topVideosByLikes.map((v, i) => (
          <div key={i} className="flex items-center gap-3 relative">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: t.statBg, border: `1px solid ${t.statBorder}` }}
            />
            <div className="flex-1 min-w-0 pr-10">
              <p
                className="text-[14px] font-bold truncate tracking-tight"
                style={{ color: t.text }}
              >
                {v.title}
              </p>
              <p className="text-[12px] font-medium" style={{ color: t.textMuted }}>
                ♥ {v.likes}
              </p>
            </div>
            <span
              className="absolute right-0 text-[80px] font-black leading-none select-none"
              style={{ color: t.text, opacity: 0.06 }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard7(t: ThemeConfig): React.ReactNode {
  const maxP = Math.max(...MOCK_DATA.topCountries.map((c) => c.percent))
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="your" line2="audience" t={t} />
      <p
        className="text-[12px] font-medium uppercase tracking-widest mb-6"
        style={{ color: t.textMuted }}
      >
        Top Countries
      </p>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {MOCK_DATA.topCountries.map((c, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[20px] leading-none">{c.flag}</span>
                <span className="text-[15px] font-bold tracking-tight" style={{ color: t.text }}>
                  {c.name}
                </span>
              </div>
              <span className="text-[14px] font-bold" style={{ color: t.textMuted }}>
                {c.percent}%
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: t.statBg }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${(c.percent / maxP) * 100}%`, background: t.accent }}
              />
            </div>
          </div>
        ))}
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard8(t: ThemeConfig): React.ReactNode {
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="best" line2="days" t={t} />
      <p
        className="text-[12px] font-medium uppercase tracking-widest mb-6"
        style={{ color: t.textMuted }}
      >
        All Time
      </p>
      <div className="flex-1 flex flex-col justify-center gap-5">
        {MOCK_DATA.bestDays.map((d, i) => (
          <div key={i} className="flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <span
                className="text-[14px] font-bold w-5 text-right"
                style={{ color: t.textMuted }}
              >
                {i + 1}
              </span>
              <span className="text-[16px] font-bold tracking-tight" style={{ color: t.text }}>
                {d.date}
              </span>
            </div>
            <span className="text-[15px] font-bold" style={{ color: t.accent }}>
              {d.views} views
            </span>
          </div>
        ))}
      </div>
      <CardFooter t={t} />
    </div>
  )
}

function renderCard9(t: ThemeConfig): React.ReactNode {
  const s = MOCK_DATA.audienceLoyalty
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <CardTitle line1="audience" line2="loyalty" t={t} />
      <div
        className="flex-1 flex flex-col justify-center gap-4 anim-fade-up"
        style={{ animationDelay: '160ms' }}
      >
        <StatPill label="Avg View Duration" value={s.avd} t={t} />
        <div className="flex gap-3">
          <StatPill label="CTR" value={s.ctr} t={t} />
          <StatPill label="Most Talked" value={s.talkScore} t={t} valueColor={t.accent} />
        </div>
      </div>
      <CardFooter t={t} />
    </div>
  )
}

// ─── Card Render List ───────────────────────────────────

const CARD_RENDERERS = [
  renderCard1,
  renderCard2,
  renderCard3,
  renderCard4,
  renderCard5,
  renderCard6,
  renderCard7,
  renderCard8,
  renderCard9,
]

// ─── Video Card Renderer ────────────────────────────────

function renderVideoCard(video: VideoData, t: ThemeConfig): React.ReactNode {
  const engagement =
    video.viewCount > 0 ? Math.round((video.likeCount / video.viewCount) * 100) : 0
  const words = video.title.split(' ')
  const line1 = words.slice(0, 3).join(' ')
  const line2 = words.length > 3 ? words.slice(3).join(' ') : ''
  return (
    <div className="h-full flex flex-col relative z-10 p-7">
      <CardIdentity t={t} />
      <h2 className="leading-none tracking-tighter mb-4">
        <span className="block text-[36px] font-black" style={{ color: t.text }}>
          {line1}
        </span>
        {line2 && (
          <span
            className="block text-[24px] font-black line-clamp-2 mt-1"
            style={{ color: t.accent }}
          >
            {line2}
          </span>
        )}
      </h2>
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-wider mb-1"
            style={{ color: t.textMuted }}
          >
            Views
          </p>
          <p
            className="text-[64px] font-black tracking-tighter leading-none"
            style={{ color: t.text }}
          >
            {formatCount(video.viewCount)}
          </p>
        </div>
        <div className="flex gap-3">
          <StatPill label="Likes" value={formatCount(video.likeCount)} t={t} />
          <StatPill label="Engagement" value={`${engagement}%`} t={t} valueColor={t.accent} />
        </div>
      </div>
      <div className="mt-auto pt-3">
        <p className="text-[13px] font-medium" style={{ color: t.textMuted }}>
          Uploaded {formatDate(video.publishedAt)}
        </p>
      </div>
      <CardFooter t={t} />
    </div>
  )
}

// ─── Theme Selector ─────────────────────────────────────

function ThemeSelector({
  activeIdx,
  onSelect,
}: {
  activeIdx: number
  onSelect: (idx: number) => void
}) {
  return (
    <div className="flex gap-3 justify-center" onClick={(e) => e.stopPropagation()}>
      {THEMES.map((theme, idx) => (
        <button
          key={theme.id}
          onClick={() => onSelect(idx)}
          className="w-7 h-7 rounded-full transition-all duration-200"
          style={{
            background: theme.swatch,
            boxShadow:
              idx === activeIdx
                ? '0 0 0 2px #080808, 0 0 0 4px #FFFFFF'
                : '0 0 0 1px rgba(255,255,255,0.2)',
          }}
          aria-label={`Theme: ${theme.id}`}
        />
      ))}
    </div>
  )
}

// ─── Share Overlay ──────────────────────────────────────

function ShareOverlay({
  renderCard,
  theme,
  themeIdx,
  onThemeChange,
  onClose,
}: {
  renderCard: (t: ThemeConfig) => React.ReactNode
  theme: ThemeConfig
  themeIdx: number
  onThemeChange: (idx: number) => void
  onClose: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)

  const doExport = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null
    try {
      return await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
    } catch (err) {
      console.error('Export failed', err)
      return null
    }
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    const dataUrl = await doExport()
    if (dataUrl) {
      const link = document.createElement('a')
      link.download = 'youu-card.png'
      link.href = dataUrl
      link.click()
    }
    setSaving(false)
  }, [doExport])

  const handleShare = useCallback(async () => {
    setSaving(true)
    const dataUrl = await doExport()
    if (!dataUrl) {
      setSaving(false)
      return
    }
    try {
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const file = new File([blob], 'youu-card.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Youu Card' })
      } else {
        const link = document.createElement('a')
        link.download = 'youu-card.png'
        link.href = dataUrl
        link.click()
      }
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') console.error('Share failed', err)
    }
    setSaving(false)
  }, [doExport])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(0,0,0,0.8)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-12 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        aria-label="Close"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Card preview rendered inside overlay */}
      <div onClick={(e) => e.stopPropagation()} className="mb-6">
        <div
          ref={cardRef}
          className="relative shadow-2xl"
          style={{
            width: 280,
            aspectRatio: '9/16',
            borderRadius: 24,
            backgroundColor: theme.bg,
            overflow: 'hidden',
            transform: 'scale(1.02)',
            transition: 'background-color 0.2s ease',
          }}
        >
          {theme.glowColor && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[55%] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top, ${theme.glowColor}, transparent 60%)`,
              }}
            />
          )}
          <NoiseOverlay />
          {renderCard(theme)}
        </div>
      </div>

      {/* Controls */}
      <div
        className="flex flex-col items-center gap-5 w-full max-w-[360px] px-6 anim-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <ThemeSelector activeIdx={themeIdx} onSelect={onThemeChange} />
        <div className="flex gap-3 w-full">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-[52px] rounded-full bg-white text-black font-bold text-[15px] flex items-center justify-center gap-2 press-scale disabled:opacity-50"
          >
            <Download size={18} />
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            disabled={saving}
            className="flex-1 h-[52px] rounded-full bg-white/15 text-white font-bold text-[15px] flex items-center justify-center gap-2 press-scale disabled:opacity-50 border border-white/20"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Video Selector ─────────────────────────────────────

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
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 py-3 flex-shrink-0">
      {videos.map((v) => {
        const isActive = v.id === selectedId
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
            style={{
              width: 60,
              height: 60,
              border: isActive ? '2px solid #FF6B6B' : '2px solid transparent',
              opacity: isActive ? 1 : 0.5,
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: v.thumbnail ? `url(${v.thumbnail})` : undefined,
                backgroundColor: v.thumbnail ? undefined : '#1A1A1A',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}

// ─── Channel Cards (vertical scroll) ────────────────────

function ChannelCards({
  theme,
  activeIdx,
  onActiveChange,
  cardRefs,
  onLongPress,
  showOverlay,
}: {
  theme: ThemeConfig
  activeIdx: number
  onActiveChange: (idx: number) => void
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onLongPress: () => void
  showOverlay: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pressing, setPressing] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const items = Array.from(container.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = items.indexOf(entry.target as HTMLElement)
            if (idx >= 0) onActiveChange(idx)
          }
        }
      },
      { root: container, threshold: 0.6 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [onActiveChange])

  const clearTimer = useCallback(() => {
    setPressing(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const handlePointerDown = useCallback(() => {
    setPressing(true)
    longPressTimer.current = setTimeout(() => {
      setPressing(false)
      onLongPress()
    }, 500)
  }, [onLongPress])

  // Progress bar calculation
  const trackH = 96
  const thumbH = trackH / CHANNEL_CARD_COUNT
  const maxTop = trackH - thumbH
  const topPx =
    CHANNEL_CARD_COUNT > 1 ? (activeIdx / (CHANNEL_CARD_COUNT - 1)) * maxTop : 0

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto no-scrollbar"
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
        onPointerDown={handlePointerDown}
        onPointerUp={clearTimer}
        onPointerLeave={clearTimer}
        onPointerCancel={clearTimer}
        onContextMenu={(e) => e.preventDefault()}
      >
        {CARD_RENDERERS.map((renderFn, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center px-6"
            style={{ height: '100%', scrollSnapAlign: 'start', flexShrink: 0 }}
          >
            <div
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              className="relative w-full max-w-[320px] shadow-2xl"
              style={{
                aspectRatio: '9/16',
                borderRadius: 24,
                backgroundColor: theme.bg,
                overflow: 'hidden',
                transform:
                  idx === activeIdx && showOverlay
                    ? 'scale(1.02)'
                    : idx === activeIdx && pressing
                      ? 'scale(0.97)'
                      : 'scale(1)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
              }}
            >
              {theme.glowColor && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[55%] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, ${theme.glowColor}, transparent 60%)`,
                  }}
                />
              )}
              <NoiseOverlay />
              {renderFn(theme)}
            </div>
          </div>
        ))}
      </div>

      {/* Vertical progress indicator */}
      <div
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-[3px] rounded-full pointer-events-none"
        style={{ height: trackH, background: 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="w-full rounded-full absolute transition-all duration-300"
          style={{
            height: thumbH,
            top: topPx,
            background: theme.accent,
          }}
        />
      </div>
    </div>
  )
}

// ─── Video Cards ────────────────────────────────────────

function VideoCards({
  selectedVideo,
  theme,
  cardRef,
  onLongPress,
  showOverlay,
}: {
  selectedVideo: VideoData
  theme: ThemeConfig
  cardRef: React.RefObject<HTMLDivElement | null>
  onLongPress: () => void
  showOverlay: boolean
}) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pressing, setPressing] = useState(false)

  const clearTimer = useCallback(() => {
    setPressing(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const handlePointerDown = useCallback(() => {
    setPressing(true)
    longPressTimer.current = setTimeout(() => {
      setPressing(false)
      onLongPress()
    }, 500)
  }, [onLongPress])

  return (
    <div
      className="flex-1 flex items-center justify-center px-6"
      onPointerDown={handlePointerDown}
      onPointerUp={clearTimer}
      onPointerLeave={clearTimer}
      onPointerCancel={clearTimer}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-[320px] shadow-2xl"
        style={{
          aspectRatio: '9/16',
          borderRadius: 24,
          backgroundColor: theme.bg,
          overflow: 'hidden',
          transform: showOverlay ? 'scale(1.02)' : pressing ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
      >
        {theme.glowColor && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[55%] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top, ${theme.glowColor}, transparent 60%)`,
            }}
          />
        )}
        <NoiseOverlay />
        {renderVideoCard(selectedVideo, theme)}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────

export function ScreenShare() {
  const [tab, setTab] = useState<Tab>('channel')
  const [themeIdx, setThemeIdx] = useState(0)
  const [channelIdx, setChannelIdx] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)

  // Video state
  const [videos, setVideos] = useState<VideoData[]>([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [videosError, setVideosError] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)

  // Refs
  const channelCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoCardRef = useRef<HTMLDivElement>(null)

  // Overlay render function ref
  const overlayRenderFn = useRef<((t: ThemeConfig) => React.ReactNode) | null>(null)

  const theme = THEMES[themeIdx]

  // Fetch videos when switching to video tab
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

  const openOverlay = useCallback(() => {
    if (tab === 'channel') {
      overlayRenderFn.current = CARD_RENDERERS[channelIdx]
    } else if (selectedVideo) {
      const vid = selectedVideo
      overlayRenderFn.current = (t: ThemeConfig) => renderVideoCard(vid, t)
    }
    setShowOverlay(true)
  }, [tab, channelIdx, selectedVideo])

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden" style={{ background: '#080808' }}>
      {/* Tab bar */}
      <div className="flex items-center gap-6 px-6 pt-4 pb-2 flex-shrink-0">
        {(['channel', 'video'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative pb-2 text-[14px] font-bold tracking-tight capitalize transition-colors"
            style={{ color: tab === t ? '#FFFFFF' : '#606060' }}
          >
            {t === 'channel' ? 'Channel' : 'Videos'}
            {tab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: '#FF6B6B' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Channel tab */}
      {tab === 'channel' && (
        <ChannelCards
          theme={theme}
          activeIdx={channelIdx}
          onActiveChange={setChannelIdx}
          cardRefs={channelCardRefs}
          onLongPress={openOverlay}
          showOverlay={showOverlay}
        />
      )}

      {/* Video tab */}
      {tab === 'video' && (
        <div className="flex-1 flex flex-col min-h-0">
          {videosLoading && (
            <div className="flex gap-2.5 px-5 py-3 flex-shrink-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-[60px] h-[60px] rounded-xl bg-[#161616] animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          )}
          {videosError && (
            <div className="px-5 py-4 flex-shrink-0">
              <p className="text-[13px] text-[#606060]">Could not load videos.</p>
            </div>
          )}
          {!videosLoading && !videosError && videos.length > 0 && selectedVideo && (
            <VideoSelector
              videos={videos}
              selectedId={selectedVideo.id}
              onSelect={setSelectedVideo}
            />
          )}
          {selectedVideo ? (
            <VideoCards
              selectedVideo={selectedVideo}
              theme={theme}
              cardRef={videoCardRef}
              onLongPress={openOverlay}
              showOverlay={showOverlay}
            />
          ) : (
            !videosLoading && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[14px] text-[#606060]">
                  {videosError ? 'Failed to load videos.' : 'No videos found.'}
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Hint */}
      <p className="text-center text-[11px] text-[#404040] pb-2 flex-shrink-0">
        Long-press card to save or share
      </p>

      {/* Share overlay */}
      {showOverlay && overlayRenderFn.current && (
        <ShareOverlay
          renderCard={overlayRenderFn.current}
          theme={theme}
          themeIdx={themeIdx}
          onThemeChange={setThemeIdx}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  )
}
