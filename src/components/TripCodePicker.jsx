import { useState, useRef, useEffect } from 'react'
import { Tag, Check, X } from 'lucide-react'
import { useTripCode } from '../context/TripCodeContext'
import { useTheme } from '../context/ThemeContext'

export default function TripCodePicker({ compact = false }) {
  const { tripCode, setTripCode } = useTripCode()
  const { accent } = useTheme()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function startEdit() {
    setValue(tripCode)
    setEditing(true)
  }

  function save() {
    setTripCode(value)
    setEditing(false)
  }

  function cancel() {
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
          placeholder="trip-name"
          className="text-xs border border-[#e2e8f0] rounded-lg px-2 py-1 w-28 focus:outline-none focus:ring-1"
          style={{ focusRingColor: accent }}
        />
        <button
          onClick={save}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-white transition-all active:scale-90"
          style={{ background: accent }}
          title="Save trip code"
        >
          <Check size={11} strokeWidth={2.5} />
        </button>
        <button
          onClick={cancel}
          className="w-6 h-6 rounded-lg flex items-center justify-center border border-[#e2e8f0] text-[#94a3b8] hover:text-[#64748b] transition-all active:scale-90"
          title="Cancel"
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      </div>
    )
  }

  if (compact) {
    return (
      <button
        onClick={startEdit}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:border-current hover:text-[#0f172a] transition-all active:scale-95 text-xs"
        title="Change trip code"
      >
        <Tag size={11} />
        <span className="max-w-[80px] truncate">{tripCode || 'default'}</span>
      </button>
    )
  }

  return (
    <button
      onClick={startEdit}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a] transition-colors group"
      title="Change trip code"
    >
      <Tag size={15} strokeWidth={1.5} />
      <span className="flex-1 text-left truncate">{tripCode || 'default'}</span>
      <span className="text-xs text-[#cbd5e1] group-hover:text-[#94a3b8] transition-colors">edit</span>
    </button>
  )
}
