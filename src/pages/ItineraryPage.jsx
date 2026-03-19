import { useState, lazy, Suspense } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { DAYS, HOTELS, STOPS, TRIP_SUMMARY, WARNING_MARKERS } from '../data/itinerary'
import RouteTimeline from '../components/itinerary/RouteTimeline'

const TripMap = lazy(() => import('../components/itinerary/TripMap'))

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [mapExpanded, setMapExpanded] = useState(true)

  const handleDaySelect = (dayNum) => {
    setSelectedDay(dayNum)
    if (dayNum) setMapExpanded(true)
  }

  return (
    <div className="flex flex-col h-full md:flex-row md:h-screen">
      {/* ── Trip summary strip (mobile) ── */}
      <div className="md:hidden px-4 pt-3 pb-1">
        <div className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 border border-[#e2e8f0] shadow-sm">
          <div className="text-center">
            <div className="font-mono text-sm font-bold text-[#f97316]">{TRIP_SUMMARY.totalMiles.toLocaleString()}</div>
            <div className="text-[10px] text-[#94a3b8]">miles</div>
          </div>
          <div className="w-px h-8 bg-[#e2e8f0]" />
          <div className="text-center">
            <div className="font-mono text-sm font-bold text-[#0f172a]">{TRIP_SUMMARY.totalDays}</div>
            <div className="text-[10px] text-[#94a3b8]">days</div>
          </div>
          <div className="w-px h-8 bg-[#e2e8f0]" />
          <div className="text-center">
            <div className="font-mono text-sm font-bold text-[#ec4899]">{TRIP_SUMMARY.petFriendlyStops}</div>
            <div className="text-[10px] text-[#94a3b8]">pet stops</div>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] text-[#94a3b8]">MA → WA</span>
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
                days={DAYS}
                hotels={HOTELS}
                warningMarkers={WARNING_MARKERS}
                selectedDayNumber={selectedDay}
                onHotelClick={handleDaySelect}
                height="100%"
              />
            </Suspense>
          </div>
        )}
      </div>

      {/* ── Desktop map (left panel) ── */}
      <div className="hidden md:flex md:flex-col md:w-1/2 md:border-r md:border-[#e2e8f0]">
        <div className="flex items-center gap-6 px-5 py-3 border-b border-[#e2e8f0] bg-white">
          <span className="text-xs text-[#64748b]">Sunderland, MA → Spokane, WA</span>
          <span className="font-mono text-xs text-[#f97316] font-bold">{TRIP_SUMMARY.totalMiles.toLocaleString()} mi</span>
          <span className="text-xs text-[#64748b]">{TRIP_SUMMARY.totalDays} days</span>
          <span className="text-xs text-[#ec4899]">{TRIP_SUMMARY.petFriendlyStops} pet stops</span>
        </div>

        <div className="flex-1">
          <Suspense fallback={<div className="skeleton w-full h-full" />}>
            <TripMap
              days={DAYS}
              hotels={HOTELS}
              warningMarkers={WARNING_MARKERS}
              selectedDayNumber={selectedDay}
              onHotelClick={handleDaySelect}
              height="100%"
            />
          </Suspense>
        </div>
      </div>

      {/* ── Day timeline ── */}
      <div className="flex-1 overflow-y-auto md:w-1/2">
        <RouteTimeline
          days={DAYS}
          hotels={HOTELS}
          stops={STOPS}
          selectedDayNumber={selectedDay}
          onDaySelect={handleDaySelect}
        />
      </div>
    </div>
  )
}
