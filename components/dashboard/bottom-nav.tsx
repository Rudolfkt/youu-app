'use client'

import { useState } from 'react'
import { NavTab } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface NavItem {
  id: NavTab
  label: string
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9.5Z"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.15 : 0}
    />
  </svg>
)

const StatsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="3" y="13" width="3.5" height="7" rx="1"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}
    />
    <rect x="9.25" y="8" width="3.5" height="12" rx="1"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}
    />
    <rect x="15.5" y="3" width="3.5" height="17" rx="1"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}
    />
  </svg>
)

const AIIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="16" height="12" rx="3"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}
    />
    <path d="M7 9H15M7 13H11" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" />
    <path d="M8 17L6 20" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" />
    <path d="M14 17L16 20" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="8" r="3.5"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5}
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}
    />
    <path d="M4 19C4 15.69 7.13 13 11 13C14.87 13 18 15.69 18 19"
      stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round"
    />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

export function BottomNav() {
  const [activeTab, setActiveTab] = useState<NavTab>('home')

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'stats', label: 'Stats' },
    { id: 'ai', label: 'AI Chat' },
    { id: 'profile', label: 'Profile' },
  ]

  const IconMap: Record<NavTab, React.ComponentType<{ active: boolean }>> = {
    home: HomeIcon,
    stats: StatsIcon,
    ai: AIIcon,
    profile: ProfileIcon,
  }

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
      aria-label="Main navigation"
    >
      {/* Frosted glass bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#0A0A0A]/75 backdrop-blur-2xl border-t border-white/[0.06]" />
        <div className="relative flex items-center justify-around px-2 pt-2 pb-7">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            const Icon = IconMap[item.id]
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex flex-col items-center gap-1 min-w-[60px] px-3 py-1.5 rounded-2xl transition-all duration-200 relative',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground/50'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon active={isActive} />
                <span className={cn(
                  'text-[10px] font-semibold tracking-wide transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
