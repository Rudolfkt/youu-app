'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LogOut, Youtube, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [channelData, setChannelData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (status !== 'authenticated') {
      setLoading(false)
      return
    }
    fetch('/api/youtube/channel')
      .then(res => res.json())
      .then(data => { if (!data.error) setChannelData(data) })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [status])

  const formatCount = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }

  if (status === 'loading' || loading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-[#606060] text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="relative w-full bg-[#080808] flex flex-col overflow-hidden min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <p className="text-[20px] font-black text-white tracking-[-0.5px]">Profile</p>
      </div>

      <div className="flex-1 px-5 pb-10">

        {/* Channel Card */}
        <div
          className="rounded-[20px] p-5 mb-6"
          style={{ background: '#111111', border: '1px solid #1E1E1E' }}
        >
          <div className="flex items-center gap-4">
            {channelData?.avatar ? (
              <Image
                src={channelData.avatar}
                alt="Channel avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: '#1E1E1E' }}
              >
                <User size={24} color="#606060" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[18px] font-black text-white tracking-tight truncate">
                {channelData?.channelName ?? session?.user?.name ?? 'Loading...'}
              </p>
              <p className="text-[13px] text-[#606060] font-medium mt-0.5 truncate">
                {channelData?.handle ?? session?.user?.email ?? ''}
              </p>
            </div>
          </div>

          {/* Stats row */}
          {channelData && (
            <div className="flex gap-4 mt-5 pt-5" style={{ borderTop: '1px solid #1E1E1E' }}>
              <div className="flex-1 text-center">
                <p className="text-[20px] font-black text-white tracking-tight">
                  {formatCount(channelData.subscriberCount)}
                </p>
                <p className="text-[11px] text-[#606060] font-medium uppercase tracking-wider mt-0.5">Subscribers</p>
              </div>
              <div className="w-px bg-[#1E1E1E]" />
              <div className="flex-1 text-center">
                <p className="text-[20px] font-black text-white tracking-tight">
                  {formatCount(channelData.totalViews)}
                </p>
                <p className="text-[11px] text-[#606060] font-medium uppercase tracking-wider mt-0.5">Total Views</p>
              </div>
              <div className="w-px bg-[#1E1E1E]" />
              <div className="flex-1 text-center">
                <p className="text-[20px] font-black text-white tracking-tight">
                  {channelData.videoCount}
                </p>
                <p className="text-[11px] text-[#606060] font-medium uppercase tracking-wider mt-0.5">Videos</p>
              </div>
            </div>
          )}
        </div>

        {/* Connected Account */}
        <p className="text-[11px] font-semibold text-[#484848] uppercase tracking-wider mb-3">Connected Account</p>
        <div
          className="rounded-[16px] mb-6 overflow-hidden"
          style={{ background: '#111111', border: '1px solid #1E1E1E' }}
        >
          <div className="flex items-center gap-4 px-5 py-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#1E1E1E' }}
            >
              <Youtube size={16} color="#FF6B6B" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-white">YouTube</p>
              <p className="text-[12px] text-[#606060] font-medium truncate">
                {session?.user?.email ?? ''}
              </p>
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B' }}
            >
              Connected
            </div>
          </div>
        </div>

        {/* App Section */}
        <p className="text-[11px] font-semibold text-[#484848] uppercase tracking-wider mb-3">App</p>
        <div
          className="rounded-[16px] mb-6 overflow-hidden"
          style={{ background: '#111111', border: '1px solid #1E1E1E' }}
        >
          <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #1E1E1E' }}>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-white">Version</p>
            </div>
            <p className="text-[13px] text-[#606060] font-medium">1.0.0</p>
          </div>
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1">
              <p className="text-[14px] font-bold text-white">Data refreshes</p>
            </div>
            <p className="text-[13px] text-[#606060] font-medium">On every visit</p>
          </div>
        </div>

        {/* Appearance */}
        <p className="text-[11px] font-semibold text-[#484848] uppercase tracking-wider mb-3">Appearance</p>
        <div
          className="rounded-[16px] mb-6 overflow-hidden"
          style={{ background: '#111111', border: '1px solid #1E1E1E' }}
        >
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1">
              <p className="text-[14px] font-bold text-white">Theme</p>
              <p className="text-[12px] text-[#606060] font-medium mt-0.5">
                {mounted ? (theme === 'dark' ? 'Dark mode' : 'Light mode') : ''}
              </p>
            </div>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-12 h-7 rounded-full relative transition-colors duration-300"
                style={{ background: theme === 'dark' ? '#FF6B6B' : '#1E1E1E' }}
              >
                <div
                  className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300"
                  style={{ left: theme === 'dark' ? '24px' : '4px' }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Sign Out */}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full h-[56px] rounded-full flex items-center justify-center gap-2 font-bold text-[16px] transition-transform active:scale-95"
          style={{ background: '#161616', border: '1px solid #1E1E1E', color: '#FF6B6B' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>

      </div>
    </div>
  )
}