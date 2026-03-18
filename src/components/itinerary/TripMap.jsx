import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ROUTE_WAYPOINTS, DAY_SEGMENTS } from '../../data/itinerary'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function divIcon(html, size = 32) {
  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

const hotelIcon = (selected) => divIcon(`
  <div style="width:32px;height:32px;background:${selected ? '#f97316' : '#ffffff'};
    border:2px solid ${selected ? '#f97316' : '#cbd5e1'};border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:14px;
    box-shadow:0 2px 8px rgba(0,0,0,0.15);">🏨</div>`)

const endpointIcon = (emoji, color = '#f97316') => divIcon(`
  <div style="width:36px;height:36px;background:${color};border:2px solid ${color};
    border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;
    box-shadow:0 2px 8px rgba(249,115,22,0.4);">${emoji}</div>`, 36)

const warningIcon = (icon) => divIcon(`
  <div style="width:28px;height:28px;background:#fff1f2;border:1.5px solid #ef4444;
    border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;
    box-shadow:0 1px 4px rgba(0,0,0,0.15);">${icon}</div>`, 28)

// Fly to selected day segment
function MapController({ selectedDay, days }) {
  const map = useMap()
  const prev = useRef(null)

  useEffect(() => {
    if (!selectedDay || selectedDay === prev.current) return
    prev.current = selectedDay

    try {
      const seg = DAY_SEGMENTS[selectedDay]
      if (!seg) return
      const pts = ROUTE_WAYPOINTS.slice(seg[0], seg[1] + 1)
      if (pts.length < 2) return
      // Explicitly convert to L.latLng objects to avoid NaN issues
      const latLngs = pts.map(([lat, lng]) => L.latLng(lat, lng))
      const bounds = L.latLngBounds(latLngs)
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 })
      }
    } catch (e) {
      console.warn('Map flyToBounds error:', e)
    }
  }, [map, selectedDay])

  return null
}

export default function TripMap({ days, hotels, warningMarkers = [], selectedDayNumber, onHotelClick, height = '100%' }) {
  const start = days[0].from
  const end = days[days.length - 1].to

  // Dim non-selected day segments when a day is active
  const getSegmentColor = (dayNum) => {
    if (!selectedDayNumber) return '#f97316'
    return dayNum === selectedDayNumber ? '#f97316' : '#cbd5e1'
  }

  return (
    <MapContainer
      center={[44.5, -97]}
      zoom={4}
      style={{ height, width: '100%' }}
      zoomControl
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {/* Per-day route segments (colored individually) */}
      {Object.entries(DAY_SEGMENTS).map(([dayNum, [start, end]]) => {
        const pts = ROUTE_WAYPOINTS.slice(start, end + 1)
        return (
          <Polyline
            key={dayNum}
            positions={pts}
            color={getSegmentColor(parseInt(dayNum))}
            weight={selectedDayNumber === parseInt(dayNum) ? 4 : 2.5}
            opacity={selectedDayNumber && selectedDayNumber !== parseInt(dayNum) ? 0.4 : 0.9}
            dashArray={selectedDayNumber === parseInt(dayNum) ? undefined : '6 4'}
          />
        )
      })}

      {/* Start */}
      <Marker position={[start.lat, start.lng]} icon={endpointIcon('🏠')}>
        <Popup><b>Start:</b> {start.name}</Popup>
      </Marker>

      {/* Destination */}
      <Marker position={[end.lat, end.lng]} icon={endpointIcon('🏁', '#22c55e')}>
        <Popup><b>Destination:</b> {end.name}</Popup>
      </Marker>

      {/* Hotel markers */}
      {hotels.map(hotel => (
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
              <div style={{ color: '#f59e0b', fontSize: '11px', marginTop: '2px' }}>⭐ {hotel.rating}</div>
              {hotel.petFriendly && <div style={{ color: '#ec4899', fontSize: '11px' }}>🐾 Pet Friendly</div>}
              <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>Check-in {hotel.checkInTime}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Warning markers */}
      {warningMarkers.map(w => (
        <Marker
          key={w.id}
          position={[w.lat, w.lng]}
          icon={warningIcon(w.type === 'elevation' ? '⛰️' : w.type === 'fuel' ? '⛽' : '⚠️')}
        >
          <Popup>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{w.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px' }}>{w.sublabel}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapController selectedDay={selectedDayNumber} days={days} />
    </MapContainer>
  )
}
