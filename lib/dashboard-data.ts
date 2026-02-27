// ─── Types ────────────────────────────────────────────────────────────────────

export interface SparkPoint {
  value: number
}

export interface StatCardData {
  id: string
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  trendValue?: string
  sparkline: SparkPoint[]
}

export interface VideoItem {
  id: string
  title: string
  thumbnailAlt: string
  thumbnailGradient: string
  views: string
  retention: number
  duration: string
}

export type NavTab = 'home' | 'stats' | 'ai' | 'profile'

// ─── Channel ──────────────────────────────────────────────────────────────────

export const channelData = {
  name: 'The Daily Plate',
  handle: '@thedailyplate',
  subscribers: '284K',
  subscriberChange: '+3.2%',
  weekBadge: 'WEEK 8',
  avatarInitials: 'DP',
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

export const statCards: StatCardData[] = [
  {
    id: 'views',
    label: 'Total Views',
    value: '1.24M',
    trend: 'up',
    trendValue: '+12%',
    sparkline: [
      { value: 40 }, { value: 55 }, { value: 48 }, { value: 62 },
      { value: 58 }, { value: 70 }, { value: 65 }, { value: 80 },
      { value: 74 }, { value: 88 }, { value: 82 }, { value: 95 },
    ],
  },
  {
    id: 'watchtime',
    label: 'Watch Time',
    value: '86.4K hrs',
    trend: 'up',
    trendValue: '+8%',
    sparkline: [
      { value: 50 }, { value: 44 }, { value: 60 }, { value: 55 },
      { value: 68 }, { value: 63 }, { value: 72 }, { value: 69 },
      { value: 78 }, { value: 74 }, { value: 85 }, { value: 88 },
    ],
  },
  {
    id: 'subscribers',
    label: 'New Subscribers',
    value: '+9,120',
    trend: 'up',
    trendValue: '+21%',
    sparkline: [
      { value: 30 }, { value: 42 }, { value: 38 }, { value: 50 },
      { value: 46 }, { value: 58 }, { value: 55 }, { value: 67 },
      { value: 63 }, { value: 75 }, { value: 70 }, { value: 84 },
    ],
  },
  {
    id: 'duration',
    label: 'Avg View Duration',
    value: '8:42',
    trend: 'down',
    trendValue: '-4%',
    sparkline: [
      { value: 80 }, { value: 75 }, { value: 82 }, { value: 78 },
      { value: 70 }, { value: 74 }, { value: 68 }, { value: 72 },
      { value: 65 }, { value: 70 }, { value: 62 }, { value: 60 },
    ],
  },
]

// ─── Top Videos ───────────────────────────────────────────────────────────────

export const topVideos: VideoItem[] = [
  {
    id: 'v1',
    title: 'I Made Gordon Ramsay\'s Beef Wellington at Home',
    thumbnailAlt: 'Beef Wellington thumbnail',
    thumbnailGradient: 'from-amber-900 via-orange-800 to-red-900',
    views: '412K views',
    retention: 87,
    duration: '18:24',
  },
  {
    id: 'v2',
    title: '5 Pasta Dishes That Changed My Life (Italian Edition)',
    thumbnailAlt: 'Pasta dishes thumbnail',
    thumbnailGradient: 'from-yellow-900 via-amber-700 to-orange-900',
    views: '298K views',
    retention: 79,
    duration: '22:07',
  },
  {
    id: 'v3',
    title: 'The Perfect Sunday Brunch Board — Step by Step',
    thumbnailAlt: 'Brunch board thumbnail',
    thumbnailGradient: 'from-emerald-900 via-teal-800 to-cyan-900',
    views: '187K views',
    retention: 91,
    duration: '14:53',
  },
]
