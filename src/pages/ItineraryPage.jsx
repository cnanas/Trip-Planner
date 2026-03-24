import { useState, lazy, Suspense } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  DAYS, DAYS_B, DAYS_C,
  HOTELS, HOTELS_B, HOTELS_C,
  STOPS, STOPS as STOPS_NOTABLE,
  STOPS_A, STOPS_B, STOPS_C,
  TRIP_SUMMARY, WARNING_MARKERS,
} from '../data/itinerary'
import RouteTimeline from '../components/itinerary/RouteTimeline'

const TripMap = lazy(() => import('../components/itinerary/TripMap'))

const PLANS = {
  A: { label: 'Plan A', sublabel: 'Original',  days: DAYS,   hotels: HOTELS,   routeStops: STOPS_A, summary: { miles: 2480, day5: '~400 mi · 6.5h' } },
  C: { label: 'Plan C', sublabel: 'Hybrid',    days: DAYS_C, hotels: HOTELS_C, routeStops: STOPS_C, summary: { miles: 2530, day5: '~350 mi · 5.5h' } },
  B: { label: 'Plan B', sublabel: '+1hr/day',  days: DAYS_B, hotels: HOTELS_B, routeStops: STOPS_B, summary: { miles: 2485, day5: '~195 mi · 3.5h' } },
}

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [mapExpanded, setMapExpanded] = useState(true)
  const [planKey, setPlanKey] = useState('A')

  const plan = PLANS[planKey]

  const handleDaySelect = (dayNum) => {
    setSelectedDay(dayNum)
    if (dayNum) setMapExpanded(true)
  }

  const handlePlanSwitch = (key) => {
    setPlanKey(key)
    setSelectedDay(null)
  }

  return (
    <div className="flex flex-col h-full md:flex-row md:h-screen">

      {/* ── Plan toggle + trip summary strip (mobile) ── */}
      <div className="md:hidden px-4 pt-3 pb-1 space-y-2">
        {/* Plan toggle */}
        <div className="flex gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-1">
          {Object.entries(PLANS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handlePlanSwitch(key)}
              className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all text-xs font-semibold ${
                planKey === key
                  ? 'bg-white shadow-sm text-[#f97316] border border-[#e2e8f0]'
                  : 'text-[#94a3b8]'
              }`}
            >
              <span>{p.label}</span>
              <span className={`text-[10px] font-normal mt-0.5 ${planKey === key ? 'text-[#64748b]' : 'text-[#cbd5e1]'}`}>{p.sublabel}</span>
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 border border-[#e2e8f0] shadow-sm">
          <div className="text-center">
            <div className="font-mono text-sm font-bold text-[#f97316]">{plan.summary.miles.toLocaleString()}</div>
            <div className="text-[10px] text-[#94a3b8]">miles</div>
          </div>
          <div className="w-px h-8 bg-[#e2e8f0]" />
          <div className="text-center">
            <div className="font-mono text-sm font-bold text-[#0f172a]">{TRIP_SUMMARY.totalDays}</div>
            <div className="text-[10px] text-[#94a3b8]">days</div>
          </div>
          <div className="w-px h-8 bg-[#e2e8f0]" />
          <div className="flex-1 text-right">
            <div className="font-mono text-xs font-bold text-[#22c55e]">{plan.summary.day5}</div>
            <div className="text-[10px] text-[#94a3b8]">final day</div>
          </div>
        </div>
      </div>

      {/* ── Mobile map toggle ── */}
      <div className="md:hidden px-4 pt-2">
        <button
          onClick={() => setMapExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-[#e2e8f0] rounded-2xl py-2.5 text-sm text-[#64748b] hover:border-[#f97316] hover:text-[#f97316] transition-colors shadow-sm"
        >
          <span>{mapExpanded ? 'Hide Map' : 'Show Map'}</span>
          {mapExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {mapExpanded && (
          <div className="mt-2 rounded-2xl overflow-hidden border border-[#e2e8f0]" style={{ height: '45vw', minHeight: '200px', maxHeight: '300px' }}>
            <Suspense fallback={<div className="skeleton w-full h-full" />}>
              <TripMap
                days={plan.days}
                hotels={plan.hotels}
                warningMarkers={WARNING_MARKERS}
                selectedDayNumber={selectedDay}
                onHotelClick={handleDaySelect}
                routeStops={plan.routeStops}
                height="100%"
              />
            </Suspense>
          </div>
        )}
      </div>

      {/* ── Desktop map (left panel) ── */}
      <div className="hidden md:flex md:flex-col md:w-1/2 md:border-r md:border-[#e2e8f0]">
        {/* Desktop header with plan toggle */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#e2e8f0] bg-white">
          <div className="flex gap-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-0.5">
            {Object.entries(PLANS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => handlePlanSwitch(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  planKey === key
                    ? 'bg-white shadow-sm text-[#f97316] border border-[#e2e8f0]'
                    : 'text-[#94a3b8] hover:text-[#64748b]'
                }`}
              >
                {p.label} <span className="font-normal opacity-70">{p.sublabel}</span>
              </button>
            ))}
          </div>
          <span className="text-xs text-[#64748b] ml-auto">{plan.summary.miles.toLocaleString()} mi · Day 5: {plan.summary.day5}</span>
        </div>

        <div className="flex-1">
          <Suspense fallback={<div className="skeleton w-full h-full" />}>
            <TripMap
              days={plan.days}
              hotels={plan.hotels}
              warningMarkers={WARNING_MARKERS}
              selectedDayNumber={selectedDay}
              onHotelClick={handleDaySelect}
              routeStops={plan.routeStops}
              height="100%"
            />
          </Suspense>
        </div>
      </div>

      {/* ── Day timeline ── */}
      <div className="flex-1 overflow-y-auto md:w-1/2">
        <RouteTimeline
          days={plan.days}
          hotels={plan.hotels}
          stops={STOPS_NOTABLE}
          selectedDayNumber={selectedDay}
          onDaySelect={handleDaySelect}
        />
      </div>
    </div>
  )
}
