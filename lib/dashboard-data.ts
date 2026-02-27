// ─── Types ────────────────────────────────────────────────────────────────────

export interface SparkPoint {
  value: number
}

export interface PillCardData {
  id: string
  label: string
  value: string
  trendValue: string
  trendUp: boolean
  gradient: string
  glowColor: string
  sparkline: SparkPoint[]
}

export interface VideoData {
  id: string
  title: string
  thumbnailAlt: string
  thumbnailGradient: string
  accentColor: string
  views: string
  retention: number
  duration: string
  isTop?: boolean
}

export type NavTab = 'home' | 'stats' | 'ai' | 'profile'

// ─── Channel ──────────────────────────────────────────────────────────────────

export const channelData = {
  name: 'The Daily Plate',
  handle: '@thedailyplate',
  subscribers: '284K',
  subscriberChange: '+3.2%',
  avatarInitials: 'DP',
  weekLabel: 'Week 8',
}

// ─── Hero Stat ────────────────────────────────────────────────────────────────

export const heroStat = {
  value: '1.24M',
  label: 'views this week',
  weekOverWeek: '+18.4%',
  weekOverWeekLabel: 'vs last week',
}

// ─── Pill Cards ───────────────────────────────────────────────────────────────

export const pillCards: PillCardData[] = [
  {
    id: 'watchtime',
    label: 'Watch Time',
    value: '86.4K',
    trendValue: '+8%',
    trendUp: true,
    gradient: 'from-teal-500 via-emerald-500 to-cyan-400',
    glowColor: 'rgba(20,184,166,0.35)',
    sparkline: [
      { value: 50 }, { value: 44 }, { value: 60 }, { value: 55 },
      { value: 68 }, { value: 63 }, { value: 72 }, { value: 88 },
    ],
  },
  {
    id: 'subscribers',
    label: 'New Subs',
    value: '+9,120',
    trendValue: '+21%',
    trendUp: true,
    gradient: 'from-rose-500 via-orange-400 to-amber-400',
    glowColor: 'rgba(255,107,107,0.35)',
    sparkline: [
      { value: 30 }, { value: 42 }, { value: 38 }, { value: 50 },
      { value: 55 }, { value: 67 }, { value: 70 }, { value: 84 },
    ],
  },
  {
    id: 'duration',
    label: 'Avg Duration',
    value: '8:42',
    trendValue: '-4%',
    trendUp: false,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-400',
    glowColor: 'rgba(139,92,246,0.35)',
    sparkline: [
      { value: 80 }, { value: 75 }, { value: 70 }, { value: 74 },
      { value: 68 }, { value: 72 }, { value: 62 }, { value: 60 },
    ],
  },
  {
    id: 'ctr',
    label: 'CTR',
    value: '7.8%',
    trendValue: '+0.9%',
    trendUp: true,
    gradient: 'from-blue-500 via-indigo-500 to-sky-400',
    glowColor: 'rgba(99,102,241,0.35)',
    sparkline: [
      { value: 55 }, { value: 60 }, { value: 58 }, { value: 65 },
      { value: 62 }, { value: 70 }, { value: 74 }, { value: 78 },
    ],
  },
]

// ─── Performance Score ────────────────────────────────────────────────────────

export const performanceScore = {
  score: 94,
  maxScore: 100,
  label: 'Your best week in 3 months',
  sublabel: 'Performance Score',
}

// ─── Top Videos ───────────────────────────────────────────────────────────────

export const topVideos: VideoData[] = [
  {
    id: 'v1',
    title: "I Made Gordon Ramsay's Beef Wellington at Home",
    thumbnailAlt: 'Beef Wellington video thumbnail',
    thumbnailGradient: 'from-amber-800 via-orange-700 to-red-800',
    accentColor: '#F97316',
    views: '412K views',
    retention: 87,
    duration: '18:24',
    isTop: true,
  },
  {
    id: 'v2',
    title: '5 Pasta Dishes That Changed My Life',
    thumbnailAlt: 'Pasta dishes video thumbnail',
    thumbnailGradient: 'from-yellow-800 via-amber-600 to-orange-800',
    accentColor: '#EAB308',
    views: '298K views',
    retention: 79,
    duration: '22:07',
  },
]
