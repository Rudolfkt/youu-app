'use client'

import { useState } from 'react'

// Mini sparkline for share card
function MiniSparkline({ color }: { color: string }) {
  const pts = [40, 55, 48, 70, 65, 85, 78, 95, 88, 100, 112]
  const w = 320
  const h = 28
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const range = max - min || 1
  const step = w / (pts.length - 1)
  const coords = pts.map((p, i) => ({
    x: i * step,
    y: h - ((p - min) / range) * (h - 6) - 3,
  }))
  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="shareSparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#shareSparkGrad)" />
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const STYLES = [
  {
    id: 'dark',
    label: 'Dark',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 50%, #0a1a1a 100%)',
    accent: '#8B5CF6',
    textColor: 'white',
    sparkColor: '#8B5CF6',
  },
  {
    id: 'neon',
    label: 'Neon',
    bg: 'linear-gradient(135deg, #001a0d 0%, #000d1a 50%, #0d0020 100%)',
    accent: '#00D4AA',
    textColor: 'white',
    sparkColor: '#00D4AA',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    bg: 'linear-gradient(135deg, #141414 0%, #0f0f0f 100%)',
    accent: '#F5F5F5',
    textColor: 'white',
    sparkColor: '#888888',
  },
]

export function ScreenShare() {
  const [activeStyle, setActiveStyle] = useState('dark')
  const style = STYLES.find((s) => s.id === activeStyle) ?? STYLES[0]

  return (
    <div className="relative w-full bg-[#080808] flex flex-col overflow-hidden" style={{ height: 812 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0">
        <div>
          <p className="text-[11px] font-semibold text-[#606060] uppercase tracking-widest mb-0.5">Creator Tools</p>
          <p className="text-[20px] font-black text-white tracking-[-0.5px]">Share Your Week</p>
        </div>
        <button
          className="w-9 h-9 rounded-full bg-[#161616] border border-[#1E1E1E] flex items-center justify-center"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="#888" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {/* SHAREABLE CARD PREVIEW */}
        <div
          className="rounded-[20px] overflow-hidden mb-5 relative"
          style={{
            aspectRatio: '1 / 1',
            background: style.bg,
            border: `1px solid ${style.accent}25`,
            boxShadow: `0 8px 48px rgba(0,0,0,0.6), 0 0 60px ${style.accent}14`,
          }}
        >
          {/* Ambient orb top-right */}
          <div
            className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${style.accent}20 0%, transparent 65%)`,
              transform: 'translate(25%, -25%)',
            }}
          />
          {/* Ambient orb bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${style.accent}12 0%, transparent 65%)`,
              transform: 'translate(-20%, 20%)',
            }}
          />

          {/* Card inner content */}
          <div className="relative z-10 p-6 flex flex-col h-full">
            {/* Top row: avatar + channel + week */}
            <div className="flex items-center justify-between mb-auto">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }}
                >
                  <span className="text-[14px] font-black text-white">D</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white tracking-[-0.3px]">The Daily Plate</p>
                  <p className="text-[11px]" style={{ color: `${style.accent}cc` }}>Week 8 · 2026</p>
                </div>
              </div>
              {/* Youu watermark */}
              <span
                className="text-[11px] font-black tracking-[-0.5px]"
                style={{ color: `${style.accent}55` }}
              >
                youu
              </span>
            </div>

            {/* Hero number */}
            <div className="flex flex-col items-center justify-center flex-1 py-4">
              <p
                className="font-black leading-none tracking-[-5px] text-white"
                style={{
                  fontSize: 80,
                  textShadow: `0 0 60px ${style.accent}30, 0 0 120px ${style.accent}10`,
                }}
              >
                1.24M
              </p>
              <p className="text-[14px] font-medium mt-2" style={{ color: `${style.accent}bb` }}>
                Total Views
              </p>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Watch Time', value: '86.4K hrs' },
                { label: 'New Subs', value: '+2,847' },
                { label: 'CTR', value: '6.8%' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <div
                    className="w-full h-px mb-2 rounded-full"
                    style={{ background: `linear-gradient(to right, transparent, ${style.accent}60, transparent)` }}
                  />
                  <p className="text-[15px] font-black text-white tracking-[-0.5px]">{s.value}</p>
                  <p className="text-[9px] font-medium uppercase tracking-wider mt-0.5" style={{ color: `${style.accent}80` }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Sparkline */}
            <div className="opacity-70">
              <MiniSparkline color={style.sparkColor} />
            </div>
          </div>
        </div>

        {/* STYLE SELECTOR */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider mb-3">Card Style</p>
          <div className="flex gap-3">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStyle(s.id)}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-[12px] relative overflow-hidden"
                  style={{
                    height: 56,
                    background: s.bg,
                    border: activeStyle === s.id ? `2px solid ${s.accent}` : '2px solid #1E1E1E',
                    boxShadow: activeStyle === s.id ? `0 0 16px ${s.accent}40` : 'none',
                  }}
                >
                  {/* Mini card preview marks */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <div className="w-8 h-1 rounded-full opacity-60" style={{ background: s.accent }} />
                    <div className="w-5 h-0.5 rounded-full opacity-30" style={{ background: s.accent }} />
                  </div>
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: activeStyle === s.id ? '#F5F5F5' : '#606060' }}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pb-8">
          <button
            className="w-full h-[54px] rounded-full font-bold text-[15px] text-white tracking-[-0.2px]"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              boxShadow: '0 6px 24px rgba(255,107,107,0.3)',
            }}
          >
            Save to Camera Roll
          </button>
          <button
            className="w-full h-[54px] rounded-full font-bold text-[15px] tracking-[-0.2px]"
            style={{
              background: 'transparent',
              border: '1.5px solid #1E1E1E',
              color: '#F5F5F5',
            }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
