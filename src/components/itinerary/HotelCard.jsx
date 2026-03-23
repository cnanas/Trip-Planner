import { useState } from 'react'
import { Phone, MapPin, Tag, ChevronDown } from 'lucide-react'

function openNavigation(address) {
  window.location.href = `https://maps.google.com/maps?daddr=${encodeURIComponent(address)}`
}
import WeatherBadge from '../WeatherBadge'

const TAG_LABELS = {
  breakfast: 'Breakfast',
  'dog-friendly': 'Pet Friendly',
  'dog-treats': 'Dog Treats',
  'pet-area': 'Pet Area',
  pool: 'Pool',
  gym: 'Gym',
  quiet: 'Quiet',
  'highway-access': 'Highway Access',
  'highly-rated': 'Highly Rated',
  gem: 'Hidden Gem',
  retro: 'Retro',
  'near-billings': 'Near Billings',
}

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return raw
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.3
  return (
    <span className="text-[#f59e0b] text-xs tracking-tight">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(Math.max(0, 5 - full - (half ? 1 : 0)))}
    </span>
  )
}

export default function HotelCard({ hotel }) {
  const [altOpen, setAltOpen] = useState(false)
  if (!hotel) return null

  const hasAlts = hotel.alternatives?.length > 0

  return (
    <div className="bg-[#f8fafc] rounded-2xl p-4 border border-[#e2e8f0]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-0.5">Tonight's Stay</p>
          <h3 className="text-sm font-semibold text-[#0f172a] leading-snug">{hotel.name}</h3>
        </div>
        <WeatherBadge lat={hotel.lat} lng={hotel.lng} day={hotel.day} />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <StarRating rating={hotel.rating} />
        <span className="font-mono text-xs text-[#0f172a] font-bold">{hotel.rating}</span>
        {hotel.ratingCount > 0 && (
          <span className="text-xs text-[#94a3b8]">({hotel.ratingCount.toLocaleString()} reviews)</span>
        )}
      </div>

      {hotel.checkInTime && (
        <p className="text-xs text-[#94a3b8] mt-1">
          Check-in {hotel.checkInTime} · Check-out {hotel.checkOutTime}
        </p>
      )}

      {hotel.petNotes && (
        <p className="text-xs text-[#ec4899] mt-2 leading-relaxed">{hotel.petNotes}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-3">
        {hotel.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] bg-white border border-[#e2e8f0] text-[#64748b] px-2 py-0.5 rounded-full"
          >
            {TAG_LABELS[tag] ?? tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#e2e8f0]">
        <a
          href={`tel:${hotel.phone}`}
          className="flex items-center gap-1.5 text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors min-h-[44px]"
        >
          <Phone size={13} />
          <span>{formatPhone(hotel.phone)}</span>
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
            <Tag size={11} className="text-[#f97316] shrink-0" />
            <span className="text-xs font-semibold flex-1 text-[#f97316]">Budget Alternatives</span>
            <ChevronDown
              size={13}
              className="text-[#94a3b8] transition-transform duration-200 shrink-0"
              style={{ transform: altOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          {altOpen && (
            <div className="mt-2 space-y-2">
              {hotel.alternatives.map(alt => (
                <div key={alt.id} className="rounded-xl border border-[#e2e8f0] bg-white p-3">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-[#0f172a] leading-snug flex-1">{alt.name}</span>
                    <span className="text-[10px] font-bold text-[#22c55e] shrink-0 ml-1">{alt.priceRange}</span>
                  </div>
                  <p className="text-[11px] text-[#ec4899] leading-relaxed mb-2">{alt.petNotes}</p>
                  <a
                    href={`tel:${alt.phone}`}
                    className="flex items-center gap-1 text-[11px] text-[#2563eb] min-h-[36px]"
                  >
                    <Phone size={11} />
                    {alt.phone.replace(/^\+1/, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                  </a>
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
