'use client'

import { SparkPoint } from '@/lib/dashboard-data'

interface SparklineProps {
  data: SparkPoint[]
  /** stroke color as hex/rgb string */
  color?: string
  /** fill color as rgba string */
  fillColor?: string
  width?: number
  height?: number
}

export function Sparkline({
  data,
  color = '#ffffff',
  fillColor = 'rgba(255,255,255,0.12)',
  width = 80,
  height = 28,
}: SparklineProps) {
  if (!data || data.length < 2) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const pad = 2
  const iw = width - pad * 2
  const ih = height - pad * 2

  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * iw
    const y = pad + ih - ((v - min) / range) * ih
    return [x, y] as [number, number]
  })

  const linePath = `M ${pts.map(([x, y]) => `${x},${y}`).join(' L ')}`
  const areaPath = `M ${pad},${pad + ih} L ${pts.map(([x, y]) => `${x},${y}`).join(' L ')} L ${pad + iw},${pad + ih} Z`

  const lastPt = pts[pts.length - 1]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={areaPath} fill={fillColor} />
      <path d={linePath} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r={2.5} fill={color} />
    </svg>
  )
}
