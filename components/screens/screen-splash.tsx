'use client'

import { signIn } from 'next-auth/react'

export function ScreenSplash() {
  return (
    <div className="relative w-full bg-[#060606] flex flex-col overflow-hidden" style={{ height: '100dvh', minHeight: 844 }}>
      {/* Subtle warm radial at top — no purple */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[45%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255,107,107,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Noise / grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-between flex-1 px-6 pt-32 pb-10">
        {/* Top section — wordmark + tagline */}
        <div className="flex flex-col items-center splash-fade-up" style={{ animationDelay: '0ms' }}>
          {/* Wordmark */}
          <h1 className="text-[72px] font-black tracking-[-4px] text-white leading-none mb-5">
            Youu
          </h1>

          {/* Tagline */}
          <p className="text-[18px] text-[#666666] font-medium text-center tracking-[-0.3px] leading-relaxed max-w-[280px]">
            Know your channel.{' '}
            <span className="text-[#E0E0E0]">Own your growth.</span>
          </p>
        </div>

        {/* Middle — spacer keeps CTA at bottom third */}
        <div className="flex-1" />

        {/* Bottom section — CTA + social proof */}
        <div className="w-full flex flex-col items-center gap-8">
          {/* CTA button */}
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full h-[58px] rounded-full font-bold text-[17px] tracking-[-0.3px] text-white flex items-center justify-center gap-3 splash-fade-up active:scale-[0.97] transition-transform"
            style={{
              background: '#FF6B6B',
              boxShadow: '0 8px 32px rgba(255,107,107,0.25), 0 2px 8px rgba(255,107,107,0.15)',
              animationDelay: '200ms',
            }}
          >
            Get Started
          </button>

          {/* Social proof — minimal */}
          <div className="flex items-center gap-3 splash-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="flex -space-x-2">
              {['#FF6B6B', '#00D4AA', '#3B82F6', '#F59E0B'].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-[1.5px] border-[#060606] flex items-center justify-center"
                  style={{ background: color }}
                >
                  <span className="text-[8px] font-bold text-white">
                    {['A', 'K', 'M', 'J'][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[13px] text-[#444444]">
              Trusted by <span className="text-[#777777] font-semibold">10,000+</span> creators
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
