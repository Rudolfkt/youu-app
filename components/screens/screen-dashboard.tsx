'use client'

import { useState, useEffect } from 'react'

// --- Mini sparkline SVG ---
function Sparkline({ color = 'white', points }: { color?: string; points: number[] }) {
  const w = 120
  const h = 32
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = w / (points.length - 1)
  const coords = points.map((p, i) => ({
    x: i * step,
    y: h - ((p - min) / range) * (h - 6) - 3,
  }))
  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`
  const id = `spark-${color.replace('#', '')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${id})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const HERO_POINTS = [42, 58, 51, 74, 68, 89, 95, 88, 102, 110, 124]
const STAT_PILLS = [
  { label: 'Watch Time', value: '86.4K hrs', sub: '+14%', from: '#00D4AA', to: '#059669', glow: 'rgba(0,212,170,0.25)' },
  { label: 'Subscribers', value: '+2,847', sub: '+3.2%', from: '#FF6B6B', to: '#FF8E53', glow: 'rgba(255,107,107,0.25)' },
  { label: 'Avg Duration', value: '8:42', sub: '+0:38', from: '#8B5CF6', to: '#6366F1', glow: 'rgba(139,92,246,0.25)' },
  { label: 'CTR', value: '6.8%', sub: '+0.4%', from: '#3B82F6', to: '#06B6D4', glow: 'rgba(59,130,246,0.25)' },
]
const QUICK_INSIGHTS = [
  { label: 'Best day', value: 'Thursday' },
  { label: 'Peak hour', value: '7–9 PM' },
  { label: 'Viral score', value: '8.4/10' },
]
const TOP_VIDEOS = [
  {
    rank: 1,
    title: 'The Perfect Beef Wellington',
    views: '284K views',
    retention: '72% kept',
    accent: '#FF6B6B',
    duration: '14:22',
  },
  {
    rank: 2,
    title: 'My Knife Sharpening Secrets',
    views: '187K views',
    retention: '68% kept',
    accent: '#8B5CF6',
    duration: '9:55',
  },
]

export function ScreenDashboard() {
  const [channel, setChannel] = useState<{
    channelName: string
    avatar: string
    subscriberCount: number
  } | null>(null)

  useEffect(() => {
    fetch('/api/youtube/channel')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setChannel(data)
      })
      .catch(err => console.error('Failed to fetch channel:', err))
  }, [])

  return (
    <div className="relative w-full flex-1 min-h-0 bg-[#080808] flex flex-col overflow-hidden">
      {/* Ambient top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 100%)' }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28 px-5 pt-5">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
          <div
              className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"
              style={{ boxShadow: '0 0 16px rgba(255,107,107,0.3)' }}
            >
              {channel?.avatar ? (
                <img
                  src={channel.avatar}
                  alt="Channel avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
                >
                  <span className="text-[17px] font-black text-white">
                    {channel?.channelName?.[0] ?? 'Y'}
                  </span>
                </div>
              )}
            </div>
            <div>
            <p className="text-[15px] font-bold text-white tracking-[-0.3px]">
                {channel?.channelName ?? 'Loading...'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[13px] text-[#888888]">
                  {channel?.subscriberCount
                    ? `${channel.subscriberCount.toLocaleString()} subscribers`
                    : 'Loading...'}
                </span>
                <span
                  className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}
                >
                  +3.2%
                </span>
              </div>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#161616] border border-[#1E1E1E] flex items-center justify-center">
            <BellIcon />
          </button>
        </div>

        {/* HERO CARD — purple to blue gradient */}
        <div
          className="rounded-[20px] p-5 mb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a0a3e 0%, #0d1a3a 60%, #081428 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.06)',
          }}
        >
          {/* Background orb */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[13px] text-[#8888aa] font-medium tracking-wide uppercase mb-1">Views this week</p>
                <p
                  className="text-[72px] font-black text-white tracking-[-4px] leading-none"
                  style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}
                >
                  1.24M
                </p>
              </div>
              <span
                className="text-[13px] font-bold px-2.5 py-1 rounded-full mt-2"
                style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}
              >
                +12%
              </span>
            </div>
            <p className="text-[13px] text-[#8888aa] mb-4">Best week in 3 months</p>
            {/* Sparkline */}
            <div className="opacity-60">
              <Sparkline color="#8B5CF6" points={HERO_POINTS} />
            </div>
          </div>
        </div>

        {/* STAT PILL CARDS — horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-5 -mx-1 px-1">
          {STAT_PILLS.map((pill) => (
            <div
              key={pill.label}
              className="flex-shrink-0 rounded-[20px] p-4 relative overflow-hidden"
              style={{
                width: 140,
                background: `linear-gradient(135deg, ${pill.from}22 0%, ${pill.to}11 100%)`,
                border: `1px solid ${pill.from}30`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 32px ${pill.glow}`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${pill.from}20 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
              />
              <p className="text-[11px] font-semibold tracking-wide uppercase mb-2" style={{ color: pill.from }}>
                {pill.label}
              </p>
              <p className="text-[22px] font-black text-white tracking-[-1px] leading-none mb-1">{pill.value}</p>
              <p className="text-[12px] font-medium" style={{ color: '#4ADE80' }}>{pill.sub}</p>
            </div>
          ))}
        </div>

        {/* PERFORMANCE RING */}
        <div
          className="rounded-[20px] p-5 mb-4 flex items-center gap-5"
          style={{
            background: '#111111',
            border: '1px solid #1E1E1E',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Ring SVG */}
          <div className="relative flex-shrink-0" style={{ width: 88, height: 88 }}>
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
              <circle cx="44" cy="44" r="36" stroke="#1E1E1E" strokeWidth="6" />
              <circle
                cx="44" cy="44" r="36"
                stroke="url(#ringGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="226"
                strokeDashoffset="23"
                transform="rotate(-90 44 44)"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,107,0.7)) drop-shadow(0 0 20px rgba(255,107,107,0.3))' }}
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#FF8E53" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[26px] font-black text-white tracking-[-2px] leading-none">94</span>
              <span className="text-[10px] text-[#606060] font-medium">/100</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#606060] mb-1">Performance</p>
            <p className="text-[20px] font-black text-white tracking-[-0.5px] leading-tight mb-1">
              Crushing it
            </p>
            <p className="text-[13px] text-[#888888]">Best week in 3 months</p>
          </div>
        </div>

        {/* QUICK INSIGHTS ROW */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {QUICK_INSIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] p-3 flex flex-col gap-1"
              style={{ background: '#111111', border: '1px solid #1E1E1E' }}
            >
              <p className="text-[10px] font-medium text-[#606060] uppercase tracking-wider">{item.label}</p>
              <p className="text-[14px] font-bold text-white tracking-[-0.3px] leading-tight">{item.value}</p>
            </div>
          ))}
        </div>

        {/* TOP VIDEOS */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-bold text-white tracking-[-0.3px]">Top Videos</p>
            <span className="text-[12px] text-[#606060]">This week</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {TOP_VIDEOS.map((v) => (
              <div
                key={v.rank}
                className="rounded-[16px] p-3.5 flex items-center gap-3 relative overflow-hidden"
                style={{ background: '#111111', border: '1px solid #1E1E1E' }}
              >
                {/* Left gradient bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[16px]"
                  style={{ background: `linear-gradient(to bottom, ${v.accent}, ${v.accent}44)` }}
                />
                {/* Thumbnail placeholder */}
                <div
                  className="w-16 h-11 rounded-[10px] flex-shrink-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${v.accent}22, ${v.accent}08)`, border: `1px solid ${v.accent}20` }}
                >
                  <PlayIcon color={v.accent} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white tracking-[-0.2px] leading-tight truncate mb-1">{v.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#888888]">{v.views}</span>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${v.accent}22`, color: v.accent }}
                    >
                      {v.retention}
                    </span>
                  </div>
                </div>
                <span className="text-[12px] text-[#484848] flex-shrink-0">{v.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Icon components ---
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9V15L3 17V18H21V17L19 15V9C19 5.13 15.87 2 12 2Z"
        stroke="#606060" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20"
        stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={`${color}22`} />
      <path d="M10 8L16 12L10 16V8Z" fill={color} />
    </svg>
  )
}
