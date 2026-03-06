'use client'

import React, { useState, useRef } from 'react'
import { Download, Sparkles, Search, PlaySquare, ExternalLink, Compass, Link2 } from 'lucide-react'
import { toPng } from 'html-to-image'

// --- MOCK DATA ---
const MOCK_DATA = {
  month: 'February',
  watchTimeMinutes: '5,860',
  totalViews: '124.5K',
  uniqueViewers: '89.2K',
  bestDay: { date: 'Feb 14', views: '18.2K' },
  audienceLoyalty: { avd: '4:24', ctr: '6.8%', returnRate: '42%' },
  topCountry: { name: 'Japan', emoji: '🇯🇵', percentage: '14%' },
  topVideos: [
    { id: 1, title: 'I tried building a mechanical keyboard from scratch', views: '45.2K', color: 'bg-blue-200' },
    { id: 2, title: 'Desk Setup Tour 2026 (Minimalist)', views: '38.1K', color: 'bg-orange-200' },
    { id: 3, title: 'Why I stopped using notion.', views: '22.9K', color: 'bg-purple-200' },
    { id: 4, title: 'My favorite VS Code extensions', views: '11.4K', color: 'bg-green-200' },
    { id: 5, title: 'Day in the life of a designer', views: '6.9K', color: 'bg-pink-200' },
  ],
  trafficSources: [
    { name: 'YouTube Search', percent: 45, icon: Search },
    { name: 'Suggested Videos', percent: 28, icon: PlaySquare },
    { name: 'Browse Features', percent: 15, icon: Compass },
    { name: 'External', percent: 8, icon: ExternalLink },
    { name: 'Direct / Unknown', percent: 4, icon: Link2 },
  ]
}

export function ScreenShare() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      // Slight delay to ensure React state updates if needed, though not strictly required here
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        pixelRatio: 3, // High-res export
      })
      const link = document.createElement('a')
      link.download = `youu-replay-${activeIdx + 1}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed', err)
    } finally {
      setIsExporting(false)
    }
  }

  // --- CARD RENDERERS ---

  const renderHeader = (theme: 'light' | 'dark') => (
    <div className="flex justify-between items-center w-full mb-8">
      <span className={`text-[14px] font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'}`}>youu</span>
      <Sparkles size={16} className={theme === 'dark' ? 'text-white/80' : 'text-black/40'} />
    </div>
  )

  const renderCard1 = () => (
    <div className="h-full flex flex-col relative z-10 p-8">
      {renderHeader('dark')}
      <div className="mt-4">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Your Month<br/>in Numbers</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[64px] font-black text-white tracking-tighter leading-none mb-4">{MOCK_DATA.watchTimeMinutes}</h1>
        <p className="text-[20px] font-bold text-white/90 leading-snug tracking-tight max-w-[80%]">
          You gave the world {MOCK_DATA.watchTimeMinutes} minutes this {MOCK_DATA.month}.
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

  const renderCard2 = () => (
    <div className="h-full flex flex-col p-8">
      {renderHeader('light')}
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Top Videos<br/>This Month</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        {MOCK_DATA.topVideos.map((video, i) => (
          <div key={video.id} className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#8E8E93] w-4">{i + 1}</span>
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${video.color} border border-black/5`} />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#1C1C1E] truncate tracking-tight">{video.title}</p>
              <p className="text-[13px] font-medium text-[#8E8E93]">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCard3 = () => (
    <div className="h-full flex flex-col relative z-10 p-8">
      {renderHeader('dark')}
      <div className="mt-4">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Where Your<br/>Audience Lives</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-[80px] leading-none mb-4">{MOCK_DATA.topCountry.emoji}</span>
        <h1 className="text-[48px] font-black text-white tracking-tighter leading-none mb-2">{MOCK_DATA.topCountry.name}</h1>
        <p className="text-[32px] font-bold text-amber-500 tracking-tight">{MOCK_DATA.topCountry.percentage} of views</p>
      </div>
      <div className="mt-auto">
        <p className="text-[16px] font-medium text-white/70 leading-snug tracking-tight">
          Your content is crossing borders. {MOCK_DATA.topCountry.name} was your biggest audience outside home.
        </p>
      </div>
    </div>
  )

  const renderCard4 = () => (
    <div className="h-full flex flex-col p-8">
      {renderHeader('light')}
      <div className="mt-4 mb-8">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Top Traffic<br/>Sources</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6">
        {MOCK_DATA.trafficSources.map((source, i) => {
          const Icon = source.icon
          return (
            <div key={source.name} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-[#8E8E93]" />
                  <span className="text-[15px] font-bold text-[#1C1C1E] tracking-tight">{source.name}</span>
                </div>
                <span className="text-[14px] font-bold text-[#8E8E93]">{source.percent}%</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1C1C1E] rounded-full" 
                  style={{ width: `${source.percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderCard5 = () => (
    <div className="h-full flex flex-col relative z-10 p-8">
      {renderHeader('dark')}
      <div className="mt-4">
        <h2 className="text-[28px] font-black text-white leading-[1.1] tracking-tight">Your<br/>Best Day</h2>
        <p className="text-[14px] font-medium text-white/50 mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[64px] font-black text-white tracking-tighter leading-none mb-2">{MOCK_DATA.bestDay.date}</h1>
        <p className="text-[32px] font-bold text-amber-500 tracking-tight">{MOCK_DATA.bestDay.views} views</p>
      </div>
      <div className="mt-auto">
        <p className="text-[16px] font-medium text-white/70 leading-snug tracking-tight">
          Your audience showed up. This was your most watched day of the entire month.
        </p>
      </div>
    </div>
  )

  const renderCard6 = () => (
    <div className="h-full flex flex-col p-8">
      {renderHeader('light')}
      <div className="mt-4 mb-10">
        <h2 className="text-[28px] font-black text-[#1C1C1E] leading-[1.1] tracking-tight">Audience<br/>Loyalty</h2>
        <p className="text-[14px] font-medium text-[#8E8E93] mt-1 uppercase tracking-widest">{MOCK_DATA.month}</p>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Avg View Duration</p>
          <p className="text-[32px] font-black text-[#1C1C1E] tracking-tight">{MOCK_DATA.audienceLoyalty.avd}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white p-5 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Avg CTR</p>
            <p className="text-[24px] font-black text-[#1C1C1E] tracking-tight">{MOCK_DATA.audienceLoyalty.ctr}</p>
          </div>
          <div className="flex-1 bg-white p-5 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Return %</p>
            <p className="text-[24px] font-black text-[#1C1C1E] tracking-tight">{MOCK_DATA.audienceLoyalty.returnRate}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const cards = [
    { id: 0, theme: 'dark', render: renderCard1 },
    { id: 1, theme: 'light', render: renderCard2 },
    { id: 2, theme: 'dark', render: renderCard3 },
    { id: 3, theme: 'light', render: renderCard4 },
    { id: 4, theme: 'dark', render: renderCard5 },
    { id: 5, theme: 'light', render: renderCard6 },
  ]

  const activeCard = cards[activeIdx]

  return (
    <div className="flex flex-col h-[100dvh] bg-[#080808] text-white">
      {/* Container to center the 9:16 card vertically and horizontally */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        
        {/* The Exportable Card Container */}
        <div 
          ref={cardRef}
          className="relative w-full max-w-[340px] shadow-2xl transition-colors duration-500 ease-in-out"
          style={{ 
            aspectRatio: '9/16', 
            borderRadius: '24px',
            backgroundColor: activeCard.theme === 'dark' ? '#000000' : '#F5F0E6',
            overflow: 'hidden'
          }}
        >
          {/* Dark Theme Amber Glow */}
          {activeCard.theme === 'dark' && (
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.25), transparent 60%)' }}
            />
          )}

          {/* Active Card Content */}
          {activeCard.render()}
        </div>
      </div>

      {/* Navigation Controls & Export */}
      <div className="pb-10 pt-4 px-6 flex flex-col items-center gap-6">
        
        {/* Dots */}
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/20'}`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="w-full max-w-[340px] h-[56px] rounded-full font-bold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          style={{
            background: activeCard.theme === 'light' ? '#1C1C1E' : '#FFFFFF',
            color: activeCard.theme === 'light' ? '#FFFFFF' : '#000000'
          }}
        >
          {isExporting ? (
            <span className="animate-pulse">Preparing image...</span>
          ) : (
            <>
              <Download size={20} />
              Save to Camera Roll
            </>
          )}
        </button>
      </div>
    </div>
  )
}