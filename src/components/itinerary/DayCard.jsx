import { useRef } from 'react'
import { useTripStore } from '../../store/tripStore'
import HotelCard from './HotelCard'

const SEVERITY_STYLES = {
  info:    'bg-[#eff6ff] border-[#93c5fd] text-[#1d4ed8]',
  caution: 'bg-[#fffbeb] border-[#fcd34d] text-[#92400e]',
  warning: 'bg-[#fef2f2] border-[#fca5a5] text-[#b91c1c]',
}

function WarningBadge({ warning }) {
  return (
    <div className={`flex gap-2 rounded-lg border px-3 py-2 text-xs leading-snug ${SEVERITY_STYLES[warning.severity]}`}>
      <span className="shrink-0 text-sm">{warning.icon}</span>
      <span>{warning.message}</span>
    </div>
  )
}

function StopItem({ stop }) {
  return (
    <div className="flex gap-3 py-2 border-b border-[#e2e8f0] last:border-0">
      <span className="text-base shrink-0">{stop.icon}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#0f172a]">{stop.name}</span>
          {stop.detour && (
            <span className="text-[10px] bg-[#fff7ed] text-[#f97316] border border-[#fed7aa] px-1.5 py-0.5 rounded-full">
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
        rounded-xl border cursor-pointer transition-all duration-200
        ${isSelected
          ? 'border-[#f97316] bg-white shadow-[0_4px_16px_rgba(249,115,22,0.12)]'
          : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1] shadow-sm'}
        ${isCompleted ? 'opacity-60' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold
            ${isSelected ? 'bg-[#f97316] text-white' : 'bg-[#fff7ed] text-[#f97316]'}`}>
            {isCompleted ? '✓' : `D${day.number}`}
          </div>

          <div className="min-w-0">
            <div className="font-mono text-xs text-[#64748b] truncate">
              {day.from.name.split(',')[0]} → {day.to.name.split(',')[0]}
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="font-mono text-sm font-bold text-[#0f172a]">{day.miles} mi</span>
              <span className="text-[#cbd5e1] text-xs">·</span>
              <span className="text-xs text-[#64748b]">~{day.estimatedHours} hrs</span>
              {warnings.length > 0 && (
                <>
                  <span className="text-[#cbd5e1] text-xs">·</span>
                  <span className="text-xs text-[#d97706]">⚠️ {warnings.length}</span>
                </>
              )}
              {stops.length > 0 && (
                <>
                  <span className="text-[#cbd5e1] text-xs">·</span>
                  <span className="text-xs text-[#64748b]">📍 {stops.length}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleComplete(day.number) }}
          className="shrink-0 w-11 h-11 flex items-center justify-center text-lg rounded-lg transition-colors hover:bg-[#f1f5f9]"
          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted ? '✅' : '⬜'}
        </button>
      </div>

      {/* Expanded content */}
      {isSelected && (
        <div
          className="px-4 pb-4 space-y-4 border-t border-[#e2e8f0] pt-3"
          onClick={(e) => e.stopPropagation()}
        >
          {warnings.length > 0 && (
            <div className="space-y-2">
              {warnings.map(w => <WarningBadge key={w.id} warning={w} />)}
            </div>
          )}

          {stops.length > 0 && (
            <div className="bg-[#f8fafc] rounded-xl p-3 border border-[#e2e8f0]">
              <p className="text-xs text-[#94a3b8] mb-2 font-medium tracking-wide uppercase">Along the route</p>
              {stops.map(s => <StopItem key={s.id} stop={s} />)}
            </div>
          )}

          {hotel && <HotelCard hotel={hotel} />}

          <div>
            <label className="block text-xs text-[#94a3b8] mb-1.5">📝 Day {day.number} notes</label>
            <textarea
              ref={noteRef}
              defaultValue={note}
              onBlur={handleNoteBlur}
              placeholder={`Notes for Day ${day.number}...`}
              rows={3}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-lg px-3 py-2.5 text-[#0f172a] placeholder-[#94a3b8] resize-none outline-none transition-colors"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
