import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { STOPS_A, REST_STOPS } from '../../data/itinerary'
import { buildGoogleMapsUrl } from '../../lib/maps'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})


// Build the ordered list of points for a leg, including any via waypoints
function legPoints(from, to) {
  return [from, ...(to.via ?? []), to]
}

function getFallback(stops) {
  return stops.slice(0, -1).map((from, i) => {
    const pts = legPoints(from, stops[i + 1])
    return pts.map(p => [p.lat, p.lng])
  })
}

function cacheKey(stops) {
  return 'osrm_' + stops.map(s => {
    const via = s.via ? s.via.map(v => `${v.lat},${v.lng}`).join('+') : ''
    return `${s.lat},${s.lng}${via ? '|' + via : ''}`
  }).join('|')
}

async function fetchLeg(from, to) {
  const pts = legPoints(from, to)
  const coords = pts.map(p => `${p.lng},${p.lat}`).join(';')
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    )
    if (!res.ok) return null
    const json = await res.json()
    const geom = json.routes?.[0]?.geometry?.coordinates
    if (!geom) return null
    // GeoJSON uses [lng, lat]; Leaflet needs [lat, lng]
    return geom.map(([lng, lat]) => [lat, lng])
  } catch {
    return null
  }
}

async function fetchAllLegs(routeStops) {
  const key = cacheKey(routeStops)
  try {
    const cached = sessionStorage.getItem(key)
    if (cached) return JSON.parse(cached)
  } catch { /* ignore */ }

  const results = await Promise.all(
    routeStops.slice(0, -1).map((from, i) => fetchLeg(from, routeStops[i + 1]))
  )
  const fallback = getFallback(routeStops)
  const segments = results.map((seg, i) => seg ?? fallback[i])

  try { sessionStorage.setItem(key, JSON.stringify(segments)) } catch { /* ignore */ }
  return segments
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function divIcon(html, size = 32) {
  return L.divIcon({ className: '', html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

const hotelIcon = (selected) => divIcon(`
  <div style="width:32px;height:32px;background:${selected ? '#f97316' : '#fff'};
    border:2px solid ${selected ? '#f97316' : '#cbd5e1'};border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;font-family:system-ui,sans-serif;
    color:${selected ? '#fff' : '#64748b'};box-shadow:0 2px 8px rgba(0,0,0,0.12);">H</div>`)

const endpointIcon = (label, color = '#f97316') => divIcon(`
  <div style="width:32px;height:32px;background:${color};border-radius:8px;
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;font-family:system-ui,sans-serif;color:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.2);">${label}</div>`, 32)

const warningIcon = () => divIcon(`
  <div style="width:26px;height:26px;background:#fff1f2;border:1.5px solid #ef4444;
    border-radius:6px;display:flex;align-items:center;justify-content:center;
    font-size:13px;font-weight:800;font-family:system-ui,sans-serif;color:#ef4444;
    box-shadow:0 1px 4px rgba(0,0,0,0.1);">!</div>`, 26)

const fuelIcon = (critical = false) => divIcon(`
  <div style="width:22px;height:22px;
    background:${critical ? '#fffbeb' : '#f8fafc'};
    border:1.5px solid ${critical ? '#f59e0b' : '#cbd5e1'};
    border-radius:6px;display:flex;align-items:center;justify-content:center;
    font-size:12px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">⛽</div>`, 22)

// ── Map controller: fly to selected day's bounds ───────────────────────────────

function MapController({ selectedDay, segments, stops }) {
  const map = useMap()
  const prev = useRef(null)

  useEffect(() => {
    if (!selectedDay || selectedDay === prev.current) return
    prev.current = selectedDay

    const seg = segments?.[selectedDay - 1]
    const fromStop = stops[selectedDay - 1]
    const toStop   = stops[selectedDay]
    const pts = seg?.length >= 2 ? seg : (
      fromStop && toStop
        ? [[fromStop.lat, fromStop.lng], [toStop.lat, toStop.lng]]
        : null
    )

    if (!pts) return

    try {
      const validPts = pts.filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng))
      if (validPts.length < 2) return
      const bounds = L.latLngBounds(validPts.map(([lat, lng]) => L.latLng(lat, lng)))
      if (bounds.isValid()) map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 })
    } catch (e) {
      console.warn('flyToBounds error:', e)
    }
  }, [map, selectedDay, segments])

  return null
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function TripMap({ days, hotels, warningMarkers = [], restStops = REST_STOPS, selectedDayNumber, onHotelClick, height = '100%', routeStops = STOPS_A }) {
  const [segments, setSegments] = useState(null)
  const start = days[0].from
  const end = days[days.length - 1].to

  useEffect(() => {
    setSegments(null)
    fetchAllLegs(routeStops).then(setSegments)
  }, [routeStops])

  const displaySegments = segments ?? getFallback(routeStops)

  const getColor = (dayNum) => {
    if (!selectedDayNumber) return '#f97316'
    return dayNum === selectedDayNumber ? '#f97316' : '#cbd5e1'
  }

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <MapContainer
        center={[44.5, -97]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        zoomControl
        attributionControl
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        {displaySegments.map((pts, i) => {
          const dayNum = i + 1
          const cleanPts = pts?.filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng)) ?? []
          if (cleanPts.length < 2) return null
          return (
            <Polyline
              key={dayNum}
              positions={cleanPts}
              color={getColor(dayNum)}
              weight={selectedDayNumber === dayNum ? 4 : 2.5}
              opacity={selectedDayNumber && selectedDayNumber !== dayNum ? 0.35 : 0.9}
              dashArray={selectedDayNumber === dayNum ? undefined : '6 4'}
            />
          )
        })}

        <Marker position={[start.lat, start.lng]} icon={endpointIcon('S')}>
          <Popup><b>Start:</b> {start.name}</Popup>
        </Marker>

        <Marker position={[end.lat, end.lng]} icon={endpointIcon('E', '#22c55e')}>
          <Popup><b>Destination:</b> {end.name}</Popup>
        </Marker>

        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.lat, hotel.lng]}
            icon={hotelIcon(hotel.day === selectedDayNumber)}
            eventHandlers={{ click: () => onHotelClick?.(hotel.day) }}
          >
            <Popup>
              <div style={{ minWidth: '160px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Night {hotel.day}</div>
                <div>{hotel.name}</div>
                <div style={{ color: '#f59e0b', fontSize: '11px', marginTop: '2px' }}>★ {hotel.rating}</div>
                {hotel.petFriendly && <div style={{ color: '#ec4899', fontSize: '11px' }}>Pet Friendly</div>}
                <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>Check-in {hotel.checkInTime}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {warningMarkers.map((w) => (
          <Marker key={w.id} position={[w.lat, w.lng]} icon={warningIcon()}>
            <Popup>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{w.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{w.sublabel}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {restStops.map((rs) => (
          <Marker key={rs.id} position={[rs.lat, rs.lng]} icon={fuelIcon(rs.critical)}>
            <Popup>
              <div style={{ minWidth: '170px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>⛽ {rs.name}</div>
                <div style={{ color: '#64748b', fontSize: '11px', lineHeight: '1.4', marginBottom: '6px' }}>{rs.note}</div>
                <a
                  href={`https://maps.google.com/maps?q=${rs.lat},${rs.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#2563eb',
                    textDecoration: 'none',
                    padding: '3px 8px',
                    background: '#eff6ff',
                    borderRadius: '6px',
                  }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController selectedDay={selectedDayNumber} segments={segments} stops={routeStops} />
      </MapContainer>

      {/* Google Maps button */}
      <a
        href={buildGoogleMapsUrl(routeStops)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ zIndex: 1000 }}
        className="absolute bottom-8 right-2 flex items-center gap-1.5 bg-white border border-[#e2e8f0] rounded-xl px-3 py-1.5 shadow-sm text-[11px] font-semibold text-[#0f172a] hover:border-[#f97316] hover:text-[#f97316] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Open in Google Maps
      </a>
    </div>
  )
}
