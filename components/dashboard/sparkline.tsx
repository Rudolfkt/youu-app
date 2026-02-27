'use client'

import { SparkPoint } from '@/lib/dashboard-data'

interface SparklineProps {
  data: SparkPoint[]
  trend: 'up' | 'down' | 'neutral'
  width?: number
  height?: number
}

export function Sparkline({ data, trend, width = 120, height = 36 }: SparklineProps) {
  if (!data || data.length < 2) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const padding = 3
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  const points = values.map((v, i) => {
    const x = padding + (i / (values.length - 1)) * innerWidth
    const y = padding + innerHeight - ((v - min) / range) * innerHeight
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`

  // Area fill path (close beneath the line)
  const lastX = padding + innerWidth
  const firstX = padding
  const bottomY = padding + innerHeight
  const areaD = `M ${firstX},${bottomY} L ${points.join(' L ')} L ${lastX},${bottomY} Z`

  const strokeColor = trend === 'up' ? '#FF6B6B' : trend === 'down' ? '#6B7280' : '#FF6B6B'
  const fillColor = trend === 'up' ? 'rgba(255,107,107,0.08)' : 'rgba(107,114,128,0.06)'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Area fill */}
      <path d={areaD} fill={fillColor} />
      {/* Line */}
      <path
        d={pathD}
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* End dot */}
      <circle
        cx={points[points.length - 1].split(',')[0]}
        cy={points[points.length - 1].split(',')[1]}
        r={2.5}
        fill={strokeColor}
      />
    </svg>
  )
}
