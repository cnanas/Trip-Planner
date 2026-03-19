import { Sun, Cloud, CloudSun, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'
import { useWeather, getCondition } from '../hooks/useWeather'

const DEPARTURE = '2026-03-22'

export function hotelDate(day) {
  const d = new Date(DEPARTURE)
  d.setDate(d.getDate() + day - 1)
  return d.toISOString().split('T')[0]
}

const ICON_MAP = {
  'sun':       Sun,
  'cloud-sun': CloudSun,
  'cloud':     Cloud,
  'fog':       CloudFog,
  'drizzle':   CloudDrizzle,
  'rain':      CloudRain,
  'snow':      CloudSnow,
  'thunder':   CloudLightning,
}

const ICON_COLOR = {
  'sun':       '#f59e0b',
  'cloud-sun': '#f59e0b',
  'cloud':     '#94a3b8',
  'fog':       '#94a3b8',
  'drizzle':   '#60a5fa',
  'rain':      '#3b82f6',
  'snow':      '#93c5fd',
  'thunder':   '#7c3aed',
}

export default function WeatherBadge({ lat, lng, day }) {
  const date = hotelDate(day)
  const { weather, loading } = useWeather(lat, lng, date)

  if (loading) {
    return <div className="skeleton h-10 w-32 rounded-xl" />
  }

  if (!weather) return null

  const { label, icon } = getCondition(weather.code)
  const Icon = ICON_MAP[icon] ?? Cloud
  const color = ICON_COLOR[icon] ?? '#94a3b8'

  return (
    <div className="flex items-center gap-2.5 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2">
      <Icon size={18} style={{ color }} className="shrink-0" />
      <div>
        <p className="text-[10px] text-[#94a3b8] leading-none">{label}</p>
        <p className="text-xs font-mono font-bold text-[#0f172a] mt-0.5">
          {weather.high}° / {weather.low}°
        </p>
      </div>
    </div>
  )
}
