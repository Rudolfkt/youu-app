'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { id: 'dashboard', href: '/dashboard', label: 'Home', icon: HomeIcon },
  { id: 'share', href: '/share', label: 'Share', icon: ShareIcon },
  { id: 'chat', href: '/chat', label: 'Chat', icon: ChatIcon },
  { id: 'stats', href: '/stats', label: 'Stats', icon: StatsIcon },
  { id: 'profile', href: '/profile', label: 'Profile', icon: ProfileIcon },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] glass border-t border-[#1E1E1E] z-50"
      style={{ paddingBottom: 28 }}
    >
      <div className="flex items-center justify-around pt-3 px-4">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = pathname === tab.href
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 relative"
            >
              <Icon active={active} />
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: active ? '#FF6B6B' : '#484848' }}
              >
                {tab.label}
              </span>
              {active && (
                <span
                  className="absolute -bottom-1 w-1 h-1 rounded-full"
                  style={{ background: '#FF6B6B', boxShadow: '0 0 6px rgba(255,107,107,0.8)' }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12L12 3L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
        fill={active ? '#FF6B6B' : 'none'}
        stroke={active ? '#FF6B6B' : '#484848'}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function ShareIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
        stroke={active ? '#FF6B6B' : '#484848'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={active ? '#FF6B6B' : '#484848'}
      />
    </svg>
  )
}
function StatsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="14" width="4" height="6" rx="1" fill={active ? '#FF6B6B' : '#484848'} />
      <rect x="10" y="9" width="4" height="11" rx="1" fill={active ? '#FF6B6B' : '#484848'} opacity={active ? 1 : 0.5} />
      <rect x="16" y="4" width="4" height="16" rx="1" fill={active ? '#FF6B6B' : '#484848'} opacity={active ? 1 : 0.3} />
    </svg>
  )
}
function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#FF6B6B' : '#484848'} strokeWidth="1.8" />
      <path
        d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20"
        stroke={active ? '#FF6B6B' : '#484848'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
