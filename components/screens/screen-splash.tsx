'use client'

export function ScreenSplash() {
  return (
    <div className="relative w-full bg-[#080808] flex flex-col overflow-hidden" style={{ height: 844 }}>
      {/* Deep purple-to-black gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 140% 80% at 50% 0%, #1a0a2e 0%, #0d0d1a 45%, #080808 100%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient color bleed — top corners */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }}
      />
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', transform: 'translate(40%, -40%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center flex-1 pt-24 px-6">

        {/* Decorative orb / data visualization shape */}
        <div className="relative mb-10" style={{ width: 240, height: 240 }}>
          {/* Outer ambient glow */}
          <div
            className="absolute inset-0 rounded-full orb-glow"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
          />

          {/* Arc rings — SVG */}
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className="absolute inset-0">
            {/* Outermost ring — dim */}
            <circle cx="120" cy="120" r="108" stroke="#1E1E1E" strokeWidth="1" />
            {/* Purple arc — main */}
            <circle
              cx="120" cy="120" r="96"
              stroke="url(#arcGradPurple)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="420 180"
              strokeDashoffset="-60"
              transform="rotate(-90 120 120)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.8)) drop-shadow(0 0 20px rgba(139,92,246,0.4))' }}
            />
            {/* Blue arc — secondary */}
            <circle
              cx="120" cy="120" r="76"
              stroke="url(#arcGradBlue)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="260 220"
              strokeDashoffset="60"
              transform="rotate(-90 120 120)"
              style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.7))' }}
            />
            {/* Coral arc — inner accent */}
            <circle
              cx="120" cy="120" r="56"
              stroke="url(#arcGradCoral)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="140 212"
              strokeDashoffset="20"
              transform="rotate(-90 120 120)"
              style={{ filter: 'drop-shadow(0 0 5px rgba(255,107,107,0.7))' }}
            />
            {/* Center dot */}
            <circle cx="120" cy="120" r="4" fill="#8B5CF6" style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,1))' }} />
            {/* Data dots on outer ring */}
            <circle cx="120" cy="14" r="3" fill="#8B5CF6" opacity="0.8" />
            <circle cx="214" cy="160" r="2.5" fill="#3B82F6" opacity="0.7" />
            <circle cx="47" cy="172" r="2" fill="#FF6B6B" opacity="0.7" />

            <defs>
              <linearGradient id="arcGradPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                <stop offset="40%" stopColor="#8B5CF6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="arcGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#3B82F6" stopOpacity="1" />
                <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="arcGradCoral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0" />
                <stop offset="70%" stopColor="#FF6B6B" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center text inside orb */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#606060]">This week</span>
            <span className="text-2xl font-black text-white tracking-tight leading-none mt-0.5">1.24M</span>
            <span className="text-[10px] text-[#888888] mt-0.5">views</span>
          </div>
        </div>

        {/* App name */}
        <h1
          className="text-[56px] font-black tracking-[-3px] text-white leading-none mb-3"
          style={{ textShadow: '0 0 60px rgba(139,92,246,0.3), 0 0 120px rgba(139,92,246,0.12)' }}
        >
          Youu
        </h1>

        {/* Tagline */}
        <p className="text-[17px] text-[#888888] font-medium text-center tracking-[-0.2px] leading-snug mb-12">
          Know your channel.<br />
          <span className="text-[#F5F5F5]">Own your growth.</span>
        </p>

        {/* CTA button */}
        <button
          className="w-full h-[58px] rounded-full font-bold text-[17px] tracking-[-0.2px] text-white flex items-center justify-center gap-3 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            boxShadow: '0 8px 32px rgba(255,107,107,0.35), 0 2px 8px rgba(255,107,107,0.2)',
          }}
        >
          {/* YouTube icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"/>
          </svg>
          Connect YouTube
        </button>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-8">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {['#FF6B6B','#8B5CF6','#00D4AA','#F59E0B'].map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#080808] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${color}88, ${color})` }}
              >
                <span className="text-[9px] font-bold text-white">{['A','K','M','J'][i]}</span>
              </div>
            ))}
          </div>
          <span className="text-[13px] text-[#606060]">
            Trusted by <span className="text-[#888888] font-semibold">10,000+</span> creators
          </span>
        </div>
      </div>

      {/* Bottom safe area */}
      <div className="h-10" />
    </div>
  )
}
