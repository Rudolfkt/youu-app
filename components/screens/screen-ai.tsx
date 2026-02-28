'use client'

import { useState } from 'react'

const PROMPTS = [
  'Why did my last video underperform?',
  'What should I post next week?',
  'How do I compare to my niche?',
]

export function ScreenAI() {
  const [inputValue, setInputValue] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  return (
    <div className="relative w-full bg-[#080808] flex flex-col overflow-hidden" style={{ height: 812 }}>
      {/* Ambient purple top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 100%)',
        }}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          {/* Purple AI avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              boxShadow: '0 0 16px rgba(139,92,246,0.4)',
            }}
          >
            <span className="text-[14px] text-white font-black">✦</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-white tracking-[-0.3px] leading-none">Youu AI</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* Animated live dot */}
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#8B5CF6', boxShadow: '0 0 6px rgba(139,92,246,0.8)' }}
              />
              <span className="text-[11px] text-[#606060] font-medium">Active · knows your channel</span>
            </div>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-[#161616] border border-[#1E1E1E] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2" fill="#606060" />
            <circle cx="19" cy="12" r="2" fill="#606060" />
            <circle cx="5" cy="12" r="2" fill="#606060" />
          </svg>
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4 relative z-10">

        {/* Date divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] text-[#484848] font-medium px-2">Today</span>
          <div className="flex-1 h-px bg-[#1E1E1E]" />
        </div>

        {/* AI FIRST MESSAGE */}
        <div
          className="rounded-[20px] p-4 mb-4 relative overflow-hidden"
          style={{
            background: '#111111',
            border: '1px solid #1E1E1E',
            borderLeft: '3px solid #FF6B6B',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Subtle coral ambient */}
          <div
            className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,107,0.04) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-start gap-3 relative z-10">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                boxShadow: '0 0 10px rgba(139,92,246,0.35)',
              }}
            >
              <span className="text-[11px] text-white font-black">✦</span>
            </div>
            <div>
              <p className="text-[14px] text-white font-medium leading-relaxed tracking-[-0.1px]">
                Hey <span className="font-bold text-[#F5F5F5]">The Daily Plate</span> — your channel had a{' '}
                <span
                  className="font-bold"
                  style={{ color: '#FF6B6B' }}
                >
                  strong week
                </span>
                . Want to know what&apos;s working?
              </p>
              <p className="text-[11px] text-[#484848] mt-2 font-medium">Youu AI · just now</p>
            </div>
          </div>
        </div>

        {/* SUGGESTED PROMPT CHIPS */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-[#484848] uppercase tracking-wider mb-3">
            Suggested questions
          </p>
          <div className="flex flex-col gap-2">
            {PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setSelectedPrompt(selectedPrompt === prompt ? null : prompt)}
                className="text-left px-4 py-3 rounded-full flex items-center justify-between gap-3 transition-all"
                style={{
                  background: selectedPrompt === prompt ? 'rgba(139,92,246,0.12)' : '#111111',
                  border: selectedPrompt === prompt ? '1.5px solid rgba(139,92,246,0.4)' : '1.5px solid #1E1E1E',
                  boxShadow: selectedPrompt === prompt ? '0 0 16px rgba(139,92,246,0.1)' : 'none',
                }}
              >
                <span
                  className="text-[13px] font-medium leading-snug"
                  style={{ color: selectedPrompt === prompt ? '#F5F5F5' : '#888888' }}
                >
                  {prompt}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                    stroke={selectedPrompt === prompt ? '#8B5CF6' : '#484848'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* EMPTY STATE — implied conversation space */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                fill="#8B5CF6"
                opacity="0.5"
              />
            </svg>
          </div>
          <p className="text-[13px] text-[#484848] text-center leading-relaxed max-w-[220px]">
            Ask anything about your channel — growth, strategy, content ideas
          </p>
        </div>
      </div>

      {/* FIXED FROSTED GLASS INPUT BAR */}
      <div
        className="glass border-t border-[#1E1E1E] px-4 flex-shrink-0 relative z-10"
        style={{ paddingBottom: 32, paddingTop: 12 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center gap-3 px-4 h-[50px] rounded-full"
            style={{ background: '#161616', border: '1.5px solid #1E1E1E' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your channel..."
              className="flex-1 bg-transparent text-[14px] text-white placeholder:text-[#484848] outline-none font-medium tracking-[-0.1px]"
            />
          </div>
          {/* Send button */}
          <button
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: inputValue
                ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
                : '#161616',
              border: inputValue ? 'none' : '1.5px solid #1E1E1E',
              boxShadow: inputValue ? '0 4px 16px rgba(255,107,107,0.35)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                stroke={inputValue ? 'white' : '#484848'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
