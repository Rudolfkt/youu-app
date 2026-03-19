'use client'

import { useState, useEffect, useRef } from 'react'

const PROMPTS = [
  'Why did my last video underperform?',
  'What should I post next week?',
  'How do I compare to my niche?',
]

interface Message {
  role: 'ai' | 'user'
  text: string
  time: string
}

export function ScreenAI() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [channelContext, setChannelContext] = useState<any>(null)
  const [channelName, setChannelName] = useState('Creator')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/youtube/channel')
      .then(res => res.json())
      .then(async (channelData) => {
        if (channelData.error) return
        setChannelName(channelData.channelName)
        try {
          const [analyticsData, videosData] = await Promise.all([
            fetch(`/api/youtube/analytics?channelId=${channelData.channelId}`).then(r => r.json()),
            fetch(`/api/youtube/videos?channelId=${channelData.channelId}`).then(r => r.json()),
          ])
          setChannelContext({
            channel: channelData,
            analytics: analyticsData,
            recentVideos: Array.isArray(videosData) ? videosData.slice(0, 5) : [],
          })
        } catch (err) {
          setChannelContext({ channel: channelData })
        }
      })
      .catch(err => console.error('Failed to fetch channel context:', err))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { role: 'user', text, time: now }])
    setInputValue('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, channelContext }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setMessages(prev => [...prev, {
        role: 'ai',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: "Sorry, I couldn't process that right now. Try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full bg-[#080808] flex flex-col overflow-hidden" style={{ height: 812 }}>
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,107,0.06) 0%, transparent 100%)',
        }}
      />
      <div className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              boxShadow: '0 0 16px rgba(255,107,107,0.4)',
            }}
          >
            <span className="text-[14px] text-white font-black">✦</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-white tracking-[-0.3px] leading-none">Youu AI</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#FF6B6B', boxShadow: '0 0 6px rgba(255,107,107,0.8)' }}
              />
              <span className="text-[11px] text-[#606060] font-medium">
                {channelContext ? 'Active · knows your channel' : 'Loading channel data...'}
              </span>
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

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4 relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] text-[#484848] font-medium px-2">Today</span>
          <div className="flex-1 h-px bg-[#1E1E1E]" />
        </div>

        <div
          className="rounded-[20px] p-4 mb-4 relative overflow-hidden"
          style={{ background: '#111111', border: '1px solid #1E1E1E', borderLeft: '3px solid #FF6B6B' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
            >
              <span className="text-[11px] text-white font-black">✦</span>
            </div>
            <div>
              <p className="text-[14px] text-white font-medium leading-relaxed">
                Hey <span className="font-bold">{channelName}</span> — I know your channel inside out. Ask me anything about your growth, content strategy, or what your numbers mean.
              </p>
              <p className="text-[11px] text-[#484848] mt-2 font-medium">Youu AI · just now</p>
            </div>
          </div>
        </div>

        {messages.length === 0 && (
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-[#484848] uppercase tracking-wider mb-3">
              Suggested questions
            </p>
            <div className="flex flex-col gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left px-4 py-3 rounded-full flex items-center justify-between gap-3"
                  style={{ background: '#111111', border: '1.5px solid #1E1E1E' }}
                >
                  <span className="text-[13px] font-medium text-[#888888]">{prompt}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3"
                style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
              >
                <span className="text-[11px] text-white font-black">✦</span>
              </div>
            )}
            <div
              className="max-w-[80%] px-4 py-3 rounded-[18px]"
              style={{
                background: msg.role === 'user' ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' : '#111111',
                border: msg.role === 'ai' ? '1px solid #1E1E1E' : 'none',
              }}
            >
              <p className="text-[14px] text-white font-medium leading-relaxed">{msg.text}</p>
              <p className="text-[10px] mt-1 font-medium" style={{ color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : '#484848' }}>
                {msg.role === 'ai' ? 'Youu AI' : 'You'} · {msg.time}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
            >
              <span className="text-[11px] text-white font-black">✦</span>
            </div>
            <div className="px-4 py-3 rounded-[18px]" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#606060] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#606060] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#606060] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[#1E1E1E] px-4 flex-shrink-0 relative z-10" style={{ paddingBottom: 32, paddingTop: 12 }}>
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center gap-3 px-4 h-[50px] rounded-full"
            style={{ background: '#161616', border: '1.5px solid #1E1E1E' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder="Ask anything about your channel..."
              className="flex-1 bg-transparent text-[14px] text-white placeholder:text-[#484848] outline-none font-medium"
            />
          </div>
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: inputValue.trim() ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' : '#161616',
              border: inputValue.trim() ? 'none' : '1.5px solid #1E1E1E',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke={inputValue.trim() ? 'white' : '#484848'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}