import { useState } from 'react'
import {
  ArrowRight, Fuel, UtensilsCrossed, Coffee, MapPin,
  Phone, PhoneCall, ChevronLeft, ChevronRight, ChevronDown, Navigation, AlertTriangle, Tag,
} from 'lucide-react'
import { DAYS, DAYS_B, HOTELS, HOTELS_B } from '../data/itinerary'
import WeatherBadge from '../components/WeatherBadge'
import { useTheme } from '../context/ThemeContext'

const DEPARTURE = '2026-03-22'

const PLANS = {
  A: { label: 'Plan A', sublabel: 'Original',  days: DAYS,   hotels: HOTELS   },
  B: { label: 'Plan B', sublabel: '+1hr/day',  days: DAYS_B, hotels: HOTELS_B },
}

function getCurrentDay() {
  const today = new Date()
  const dep   = new Date(DEPARTURE)
  const diff  = Math.floor((today - dep) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 1
  if (diff >= 5) return 5
  return diff + 1
}

function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const dh = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${dh}:${String(m).padStart(2, '0')} ${suffix}`
}

function calcArrival(departureTime, hours) {
  const [h, m] = departureTime.split(':').map(Number)
  const total  = h * 60 + m + Math.round(hours * 60)
  const arrH   = Math.floor(total / 60) % 24
  const arrM   = total % 60
  return fmtTime(`${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`)
}

const FIND_AHEAD = [
  { label: 'Gas',       icon: Fuel,             query: 'gas station',  color: '#f97316' },
  { label: 'Food',      icon: UtensilsCrossed,  query: 'restaurant',   color: '#22c55e' },
  { label: 'Coffee',    icon: Coffee,           query: 'coffee shop',  color: '#92400e' },
  { label: 'Rest Area', icon: MapPin,           query: 'rest area',    color: '#3b82f6' },
]

function openMaps(query) {
  window.open(`https://maps.google.com/maps?q=${encodeURIComponent(query + ' near me')}`, '_blank', 'noopener,noreferrer')
}

function openNavigation(address) {
  window.open(`https://maps.google.com/maps?daddr=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer')
}

const WARN_STYLE = {
  info:    { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  caution: { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
}

const EMERGENCY_NUMBERS = [
  {
    id: 'uhaul',
    label: 'UHaul Roadside Assistance',
    badge: '24/7',
    phone: '18005280355',
    phoneDisplay: '1-800-528-0355',
    notes: [
      'For flat tires, breakdowns, or getting stuck.',
      'Have your contract number and exact location ready.',
      'Avg. wait time after claim: ~2–2.5 hrs — plan ahead in remote areas.',
    ],
    extra: 'Also: UHaul app or uhaul.com/help to submit photos and track your request.',
  },
  {
    id: 'leasing',
    label: 'Leasing Office',
    badge: null,
    phone: '5097693877',
    phoneDisplay: '509-769-3877',
    notes: [],
    extra: null,
  },
]

function HotelSection({ hotel, accent }) {
  const [altOpen, setAltOpen] = useState(false)
  const hasAlts = hotel.alternatives?.length > 0

  return (
    <div className="card-enter bg-white rounded-2xl border border-[#e2e8f0] p-4" style={{ animationDelay: '130ms' }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-0.5">Tonight's Stay</p>
          <h3 className="text-sm font-semibold text-[#0f172a] leading-snug">{hotel.name}</h3>
          <p className="text-xs text-[#94a3b8] mt-0.5">Check-in {hotel.checkInTime}</p>
        </div>
        <WeatherBadge lat={hotel.lat} lng={hotel.lng} day={hotel.day} />
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-[#e2e8f0]">
        <a
          href={`tel:${hotel.phone}`}
          className="flex items-center gap-1.5 text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors min-h-[44px]"
        >
          <Phone size={13} />
          {hotel.phone}
        </a>
      </div>
      <button
        onClick={() => openNavigation(hotel.address)}
        className="flex items-center gap-1.5 mt-1 text-left hover:text-[#2563eb] transition-colors group"
      >
        <MapPin size={11} className="text-[#94a3b8] shrink-0 group-hover:text-[#2563eb]" />
        <p className="text-xs text-[#94a3b8] group-hover:text-[#2563eb] underline underline-offset-2">{hotel.address}</p>
      </button>

      {hasAlts && (
        <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
          <button
            onClick={() => setAltOpen(v => !v)}
            className="flex items-center gap-1.5 w-full text-left"
          >
            <Tag size={11} style={{ color: accent }} className="shrink-0" />
            <span className="text-xs font-semibold flex-1" style={{ color: accent }}>
              Budget Alternatives
            </span>
            <ChevronDown
              size={13}
              className="text-[#94a3b8] transition-transform duration-200 shrink-0"
              style={{ transform: altOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          {altOpen && (
            <div className="mt-2 space-y-2">
              {hotel.alternatives.map(alt => (
                <div key={alt.id} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-[#0f172a] leading-snug flex-1">{alt.name}</span>
                    <span className="text-[10px] font-bold text-[#22c55e] shrink-0 ml-1">{alt.priceRange}</span>
                  </div>
                  <p className="text-[11px] text-[#ec4899] leading-relaxed mb-2">{alt.petNotes}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${alt.phone}`}
                      className="flex items-center gap-1 text-[11px] text-[#2563eb] min-h-[36px]"
                    >
                      <Phone size={11} />
                      {alt.phone.replace(/^\+1/, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                    </a>
                  </div>
                  <button
                    onClick={() => openNavigation(alt.address)}
                    className="flex items-center gap-1 mt-0.5 text-left group"
                  >
                    <MapPin size={10} className="text-[#94a3b8] shrink-0 group-hover:text-[#2563eb]" />
                    <span className="text-[11px] text-[#94a3b8] group-hover:text-[#2563eb] underline underline-offset-2">{alt.address}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function EmergencyNumbers() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl border border-[#fecaca] overflow-hidden" style={{ background: '#fff5f5' }}>
      {/* Header row */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3"
      >
        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#ef4444' }}>
          <PhoneCall size={13} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-[#0f172a] flex-1 text-left">Emergency Numbers</span>
        <ChevronDown
          size={16}
          className="text-[#94a3b8] transition-transform duration-200 shrink-0"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Always-visible call buttons */}
      <div className="px-4 pb-3 flex flex-col gap-2">
        {EMERGENCY_NUMBERS.map(item => (
          <a
            key={item.id}
            href={`tel:${item.phone}`}
            className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-[#fecaca] active:scale-[0.98] transition-transform"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fef2f2' }}>
              <Phone size={14} style={{ color: '#ef4444' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#0f172a]">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#ef4444', color: '#fff' }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-mono text-sm font-bold" style={{ color: '#ef4444' }}>{item.phoneDisplay}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Expandable notes */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#fecaca] pt-3">
          {EMERGENCY_NUMBERS.filter(n => n.notes.length > 0 || n.extra).map(item => (
            <div key={item.id}>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-1.5">{item.label}</p>
              <ul className="space-y-1">
                {item.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-[#64748b]">
                    <span className="mt-0.5 shrink-0" style={{ color: '#ef4444' }}>•</span>
                    {note}
                  </li>
                ))}
              </ul>
              {item.extra && (
                <p className="text-xs text-[#94a3b8] mt-1.5 italic">{item.extra}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DrivePage() {
  const { accent } = useTheme()
  const [planKey,      setPlanKey]      = useState('A')
  const [dayNum,       setDayNum]       = useState(getCurrentDay)
  const [customTimes,  setCustomTimes]  = useState({})

  const plan  = PLANS[planKey]
  const day   = plan.days[dayNum - 1]
  const hotel = plan.hotels.find(h => h.day === dayNum) ?? null

  const timeKey       = `${planKey}-${dayNum}`
  const departureTime = customTimes[timeKey] ?? day.departureTime
  const setDepartureTime = (val) =>
    setCustomTimes(prev => ({ ...prev, [timeKey]: val }))

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-3">

      {/* Plan toggle */}
      <div className="flex gap-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-0.5">
        {Object.entries(PLANS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setPlanKey(key)}
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg text-xs font-semibold transition-all ${
              planKey === key ? 'bg-white shadow-sm border border-[#e2e8f0]' : 'text-[#94a3b8]'
            }`}
            style={planKey === key ? { color: accent } : {}}
          >
            <span>{p.label}</span>
            <span className={`text-[10px] font-normal mt-0.5 ${planKey === key ? 'text-[#64748b]' : 'text-[#cbd5e1]'}`}>
              {p.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Day selector */}
      <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-[#e2e8f0]">
        <button
          onClick={() => setDayNum(d => Math.max(1, d - 1))}
          disabled={dayNum === 1}
          className="p-1.5 rounded-lg text-[#94a3b8] disabled:opacity-30 hover:bg-[#f8fafc] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div key={dayNum} className="day-pop text-3xl font-bold font-mono leading-none" style={{ color: accent }}>Day {dayNum}</div>
          <div className="text-xs text-[#94a3b8] mt-1">of 5</div>
        </div>
        <button
          onClick={() => setDayNum(d => Math.min(5, d + 1))}
          disabled={dayNum === 5}
          className="p-1.5 rounded-lg text-[#94a3b8] disabled:opacity-30 hover:bg-[#f8fafc] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Route + stats — keyed so cards re-stagger on day/plan change */}
      <div key={`${planKey}-${dayNum}`} className="contents">

      <div className="card-enter bg-white rounded-2xl border border-[#e2e8f0] p-4 space-y-3" style={{ animationDelay: '30ms' }}>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748b] truncate flex-1 text-right">{day.from.name}</span>
          <ArrowRight size={14} className="shrink-0" style={{ color: accent }} />
          <span className="text-xs font-semibold text-[#0f172a] truncate flex-1">{day.to.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
            <div className="font-mono font-bold text-sm text-[#0f172a]">{day.miles}</div>
            <div className="text-[10px] text-[#94a3b8] mt-0.5">miles</div>
          </div>
          <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
            <div className="font-mono font-bold text-sm text-[#0f172a]">{day.estimatedHours}h</div>
            <div className="text-[10px] text-[#94a3b8] mt-0.5">driving</div>
          </div>
          <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
            <input
              type="time"
              value={departureTime}
              onChange={e => setDepartureTime(e.target.value)}
              className="font-mono font-bold text-sm bg-transparent border-none outline-none text-center w-full cursor-pointer"
              style={{ color: accent }}
            />
            <div className="text-[10px] text-[#94a3b8] mt-0.5">depart</div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-[#e2e8f0]">
          <Navigation size={13} className="text-[#22c55e] shrink-0" />
          <span className="text-xs text-[#64748b]">Estimated arrival</span>
          <span className="text-xs font-mono font-bold text-[#0f172a] ml-auto">
            {calcArrival(departureTime, day.estimatedHours)}
          </span>
        </div>
      </div>

      {/* Warnings */}
      {day.warnings.length > 0 && (
        <div className="card-enter space-y-2" style={{ animationDelay: '80ms' }}>
          {day.warnings.map(w => {
            const c = WARN_STYLE[w.severity] ?? WARN_STYLE.info
            return (
              <div
                key={w.id}
                className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-xs"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              >
                <AlertTriangle size={13} style={{ color: c.text }} className="shrink-0 mt-0.5" />
                <span style={{ color: c.text }}>{w.message}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Tonight's hotel */}
      {hotel ? (
        <HotelSection hotel={hotel} accent={accent} />
      ) : (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-5 text-center">
          <p className="text-sm font-semibold text-[#15803d]">You've arrived!</p>
          <p className="text-xs text-[#16a34a] mt-1">Welcome to Spokane, WA 🎉</p>
        </div>
      )}

      </div> {/* end keyed stagger wrapper */}

      {/* Find Ahead */}
      <div className="card-enter" style={{ animationDelay: '180ms' }}>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2 px-1">Find Ahead</p>
        <div className="grid grid-cols-4 gap-2">
          {FIND_AHEAD.map(({ label, icon: Icon, query, color }) => (
            <button
              key={label}
              onClick={() => openMaps(query)}
              className="flex flex-col items-center gap-1.5 bg-white border border-[#e2e8f0] rounded-2xl py-3 text-xs font-medium text-[#64748b] hover:border-[#f97316] hover:text-[#f97316] active:scale-95 transition-all"
            >
              <Icon size={20} style={{ color }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Day note */}
      {day.note ? (
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl px-4 py-3 text-xs text-[#64748b] italic">
          {day.note}
        </div>
      ) : null}

      {/* Emergency Numbers */}
      <EmergencyNumbers />

    </div>
  )
}
