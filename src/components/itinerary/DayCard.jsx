import { useRef } from 'react'
import { useTripStore } from '../../store/tripStore'
import { AlertTriangle, MapPin, CheckSquare, Square } from 'lucide-react'
import HotelCard from './HotelCard'

const SEVERITY_STYLES = {
  info:    'bg-[#eff6ff] border-[#bfdbfe] text-[#1d4ed8]',
  caution: 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]',
  warning: 'bg-[#fef2f2] border-[#fecaca] text-[#b91c1c]',
}

function WarningBadge({ warning }) {
  return (
    <div className={`flex gap-2 rounded-xl border px-3 py-2.5 text-xs leading-snug ${SEVERITY_STYLES[warning.severity]}`}>
      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
      <span>{warning.message}</span>
    </div>
  )
}

function StopItem({ stop }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-[#f1f5f9] last:border-0">
      <MapPin size={14} className="shrink-0 mt-0.5 text-[#94a3b8]" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#0f172a]">{stop.name}</span>
          {stop.detour && (
            <span className="text-[10px] bg-[#fff7ed] text-[#f97316] border border-[#fed7aa] px-1.5 py-0.5 rounded-full font-medium">
              detour
            </span>
          )}
        </div>
        <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">{stop.note}</p>
      </div>
    </div>
  )
}

export default function DayCard({ day, hotel, warnings = [], stops = [], isSelected, onClick }) {
  const { userNotes, completedDays, setNote, toggleComplete } = useTripStore()
  const noteRef = useRef(null)

  const note = userNotes[day.number] || ''
  const isCompleted = completedDays.includes(day.number)

  const handleNoteBlur = (e) => setNote(day.number, e.target.value)

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border cursor-pointer transition-all duration-200
        ${isSelected
          ? 'border-[#f97316] bg-white shadow-[0_4px_20px_rgba(249,115,22,0.1)]'
          : 'border-[#e2e8f0] bg-white hover:border-[#f97316]/40 shadow-sm'}
        ${isCompleted ? 'opacity-50' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold
            ${isSelected ? 'bg-[#f97316] text-white' : 'bg-[#fff7ed] text-[#f97316]'}`}>
            {isCompleted ? '✓' : `D${day.number}`}
          </div>

          <div className="min-w-0">
            <div className="text-xs text-[#64748b] truncate">
              {day.from.name.split(',')[0]} → {day.to.name.split(',')[0]}
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="font-mono text-sm font-bold text-[#0f172a]">{day.miles} mi</span>
              <span className="text-[#e2e8f0]">·</span>
              <span className="text-xs text-[#64748b]">~{day.estimatedHours} hrs</span>
              {warnings.length > 0 && (
                <>
                  <span className="text-[#e2e8f0]">·</span>
                  <span className="flex items-center gap-1 text-xs text-[#d97706]">
                    <AlertTriangle size={11} />
                    {warnings.length}
                  </span>
                </>
              )}
              {stops.length > 0 && (
                <>
                  <span className="text-[#e2e8f0]">·</span>
                  <span className="flex items-center gap-1 text-xs text-[#64748b]">
                    <MapPin size={11} />
                    {stops.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleComplete(day.number) }}
          className="shrink-0 w-10 h-10 flex items-center justify-center text-[#94a3b8] rounded-xl transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a]"
          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted
            ? <CheckSquare size={20} className="text-[#22c55e]" />
            : <Square size={20} />
          }
        </button>
      </div>

      {/* Expanded content */}
      {isSelected && (
        <div
          className="px-4 pb-4 space-y-3 border-t border-[#f1f5f9] pt-3"
          onClick={(e) => e.stopPropagation()}
        >
          {warnings.length > 0 && (
            <div className="space-y-2">
              {warnings.map(w => <WarningBadge key={w.id} warning={w} />)}
            </div>
          )}

          {stops.length > 0 && (
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-1">Along the route</p>
              {stops.map(s => <StopItem key={s.id} stop={s} />)}
            </div>
          )}

          {hotel && <HotelCard hotel={hotel} />}

          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-1.5">
              Day {day.number} notes
            </label>
            <textarea
              ref={noteRef}
              defaultValue={note}
              onBlur={handleNoteBlur}
              placeholder={`Notes for Day ${day.number}...`}
              rows={3}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-xl px-3 py-2.5 text-sm text-[#0f172a] placeholder-[#94a3b8] resize-none outline-none transition-colors"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
