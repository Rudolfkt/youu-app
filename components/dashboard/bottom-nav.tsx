'use client'

import { useState } from 'react'
import { NavTab } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface NavItem {
  id: NavTab
  label: string
  icon: React.ReactNode
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M3 9.5L11 3L19 9.5V19C19 19.5523 18.5523 20 18 20H14V14H8V20H4C3.44772 20 3 19.5523 3 19V9.5Z"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
  </svg>
)

const StatsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect
      x="3"
      y="13"
      width="3.5"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <rect
      x="9.25"
      y="8"
      width="3.5"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <rect
      x="15.5"
      y="3"
      width="3.5"
      height="17"
      rx="1"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
  </svg>
)

const AIIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 3C11 3 14 6 14 11C14 16 11 19 11 19C11 19 8 16 8 11C8 6 11 3 11 3Z"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <path
      d="M3 11H19"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
    />
    <circle
      cx="11"
      cy="11"
      r="2.5"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.3 : 0}
    />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle
      cx="11"
      cy="8"
      r="3.5"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <path
      d="M4 19C4 15.6863 7.13401 13 11 13C14.866 13 18 15.6863 18 19"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
    />
  </svg>
)

export function BottomNav() {
  const [activeTab, setActiveTab] = useState<NavTab>('home')

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon active={activeTab === 'home'} /> },
    { id: 'stats', label: 'Stats', icon: <StatsIcon active={activeTab === 'stats'} /> },
    { id: 'ai', label: 'AI Chat', icon: <AIIcon active={activeTab === 'ai'} /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon active={activeTab === 'profile'} /> },
  ]

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
      aria-label="Main navigation"
    >
      {/* Glassmorphism bar */}
      <div className="relative mx-0 px-2 pb-safe-area-bottom">
        {/* Blur backdrop */}
        <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-border" />
        <div className="relative flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex flex-col items-center gap-1 min-w-[60px] px-2 py-1 rounded-xl transition-all duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground/60'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                <span
                  className={cn(
                    'text-[10px] font-semibold tracking-wide transition-all duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
