import { ScreenSplash } from '@/components/screens/screen-splash'
import { ScreenDashboard } from '@/components/screens/screen-dashboard'
import { ScreenShare } from '@/components/screens/screen-share'
import { ScreenAI } from '@/components/screens/screen-ai'

const SCREENS = [
  { label: 'Screen 1 — Splash / Onboarding', component: ScreenSplash },
  { label: 'Screen 2 — Home Dashboard', component: ScreenDashboard },
  { label: 'Screen 3 — Share Card Generator', component: ScreenShare },
  { label: 'Screen 4 — AI Chat', component: ScreenAI },
]

export default function ShowcasePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center py-16 px-4"
      style={{ background: '#040404' }}
    >
      {/* Page header */}
      <div className="flex flex-col items-center mb-14">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#484848] mb-3">
          UI Kit Showcase
        </p>
        <h1
          className="text-[48px] font-black tracking-[-3px] text-white leading-none mb-3"
          style={{ textShadow: '0 0 80px rgba(139,92,246,0.2)' }}
        >
          Youu
        </h1>
        <p className="text-[16px] text-[#606060] font-medium text-center max-w-[320px] leading-relaxed">
          Know your channel.{' '}
          <span className="text-[#888888]">Own your growth.</span>
        </p>

        {/* Accent palette chips */}
        <div className="flex items-center gap-2 mt-6">
          {[
            { color: '#FF6B6B', label: 'Coral' },
            { color: '#00D4AA', label: 'Teal' },
            { color: '#8B5CF6', label: 'Purple' },
            { color: '#F59E0B', label: 'Amber' },
            { color: '#3B82F6', label: 'Blue' },
          ].map((c) => (
            <div key={c.color} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}80` }} />
              <span className="text-[11px] text-[#606060] font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Screens stack */}
      <div className="flex flex-col items-center gap-10 w-full">
        {SCREENS.map(({ label, component: Screen }) => (
          <div key={label} className="flex flex-col items-center gap-3 w-full">
            {/* Screen label */}
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#484848] self-center">
              {label}
            </p>
            {/* Device shell */}
            <div className="screen-shell" style={{ width: 390 }}>
              <Screen />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col items-center gap-2">
        <p className="text-[11px] text-[#2a2a2a] font-medium tracking-widest uppercase">
          Youu · 2026
        </p>
      </div>
    </main>
  )
}
