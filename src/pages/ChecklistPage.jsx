import { useState, useRef } from 'react'
import { RotateCcw, CheckSquare, Square, Plus, Trash2, ChevronDown } from 'lucide-react'
import { useChecklistStore } from '../store/checklistStore'
import { CHECKLIST_PHASES, CHECKLIST_TIMELINE } from '../data/itinerary'
import { useTheme } from '../context/ThemeContext'

const TAG_STYLES = {
  action:   'bg-[#fff7ed] text-[#f97316]',
  form:     'bg-[#eff6ff] text-[#2563eb]',
  deadline: 'bg-[#fffbeb] text-[#d97706]',
  optional: 'bg-[#f8fafc] text-[#64748b]',
  money:    'bg-[#f0fdf4] text-[#16a34a]',
  done:     'bg-[#f0fdf4] text-[#16a34a]',
}

// ── Built-in checklist components ─────────────────────────────────────────────

function TimelineNode({ node }) {
  const dotColors = {
    today:     'border-[#f97316] bg-[#fff7ed]',
    departure: 'border-[#2563eb] bg-[#eff6ff]',
    arrive:    'border-[#16a34a] bg-[#f0fdf4]',
    deadline:  'border-[#d97706] bg-[#fffbeb]',
    default:   'border-[#e2e8f0] bg-white',
  }
  const dateColors = {
    today:     'text-[#f97316]',
    departure: 'text-[#2563eb]',
    arrive:    'text-[#16a34a]',
    deadline:  'text-[#d97706]',
    default:   'text-[#0f172a]',
  }
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 ${dotColors[node.type]}`}>
        <div className={`w-2 h-2 rounded-full ${node.type === 'today' ? 'bg-[#f97316]' : 'bg-[#e2e8f0]'}`} />
      </div>
      <div className="text-center">
        <p className={`text-xs font-semibold ${dateColors[node.type]}`}>{node.date}</p>
        <p className="text-[10px] text-[#94a3b8] leading-tight mt-0.5">{node.label}</p>
      </div>
    </div>
  )
}

function CheckItem({ item }) {
  const { isChecked, toggle } = useChecklistStore()
  const checked = isChecked(item.id)

  return (
    <button
      onClick={() => toggle(item.id)}
      className={`w-full flex items-start gap-3 text-left px-4 py-3.5 rounded-2xl border transition-all ${
        checked
          ? 'bg-[#f8fafc] border-[#e2e8f0] opacity-50'
          : 'bg-white border-[#e2e8f0] shadow-sm hover:border-[#f97316]/40'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {checked
          ? <CheckSquare size={18} className="text-[#22c55e]" />
          : <Square size={18} className="text-[#cbd5e1]" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${checked ? 'line-through text-[#94a3b8]' : 'text-[#0f172a]'}`}>
          {item.title}
        </p>
        {!checked && item.note && (
          <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{item.note}</p>
        )}
        {item.tag && (
          <span className={`inline-block mt-2 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${TAG_STYLES[item.tag.type]}`}>
            {item.tag.label}
          </span>
        )}
      </div>
    </button>
  )
}

// ── Custom section components ─────────────────────────────────────────────────

function CustomItem({ sectionId, item }) {
  const { isChecked, toggle, deleteItem } = useChecklistStore()
  const checked = isChecked(item.id)

  return (
    <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
      checked ? 'bg-[#f8fafc] border-[#e2e8f0] opacity-50' : 'bg-white border-[#e2e8f0] shadow-sm'
    }`}>
      <button onClick={() => toggle(item.id)} className="shrink-0">
        {checked
          ? <CheckSquare size={17} className="text-[#22c55e]" />
          : <Square size={17} className="text-[#cbd5e1]" />
        }
      </button>
      <span className={`flex-1 text-sm leading-snug ${checked ? 'line-through text-[#94a3b8]' : 'text-[#0f172a]'}`}>
        {item.title}
      </span>
      <button
        onClick={() => deleteItem(sectionId, item.id)}
        className="shrink-0 p-1 rounded-lg text-[#cbd5e1] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

function AddItemRow({ sectionId }) {
  const { addItem } = useChecklistStore()
  const { accent } = useTheme()
  const [value, setValue] = useState('')
  const inputRef = useRef()

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    addItem(sectionId, trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        placeholder="Add item..."
        className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-sm text-[#0f172a] placeholder-[#cbd5e1] outline-none focus:border-current transition-colors"
        style={{ '--tw-ring-color': accent }}
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-all active:scale-90"
        style={{ background: accent }}
      >
        <Plus size={15} strokeWidth={2.5} />
      </button>
    </div>
  )
}

function CustomSection({ section }) {
  const { renameSection, deleteSection } = useChecklistStore()
  const { isChecked } = useChecklistStore()
  const { accent } = useTheme()
  const [editing, setEditing] = useState(false)
  const [titleVal, setTitleVal] = useState(section.title)
  const [collapsed, setCollapsed] = useState(false)

  const done = section.items.filter((it) => isChecked(it.id)).length

  function saveTitle() {
    const trimmed = titleVal.trim()
    if (trimmed) renameSection(section.id, trimmed)
    else setTitleVal(section.title)
    setEditing(false)
  }

  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
      {/* Section header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#f1f5f9]">
        {editing ? (
          <input
            autoFocus
            value={titleVal}
            onChange={(e) => setTitleVal(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') { setTitleVal(section.title); setEditing(false) } }}
            className="flex-1 text-sm font-semibold text-[#0f172a] bg-transparent border-b border-current outline-none"
            style={{ color: accent }}
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex-1 text-left text-sm font-semibold text-[#0f172a] hover:text-current transition-colors"
            style={{ '--hover-color': accent }}
            title="Click to rename"
          >
            {section.title}
          </button>
        )}
        <span className="text-xs font-mono text-[#94a3b8] shrink-0">{done}/{section.items.length}</span>
        <button
          onClick={() => setCollapsed(v => !v)}
          className="p-1 rounded-lg text-[#94a3b8] hover:bg-[#f8fafc] transition-colors"
        >
          <ChevronDown size={14} className="transition-transform" style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} />
        </button>
        <button
          onClick={() => { if (window.confirm(`Delete "${section.title}"?`)) deleteSection(section.id) }}
          className="p-1 rounded-lg text-[#cbd5e1] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 py-3 space-y-2">
          {section.items.map((item) => (
            <CustomItem key={item.id} sectionId={section.id} item={item} />
          ))}
          <AddItemRow sectionId={section.id} />
        </div>
      )}
    </div>
  )
}

function AddSectionButton() {
  const { addSection } = useChecklistStore()
  const { accent } = useTheme()
  const [adding, setAdding] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef()

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    addSection(trimmed)
    setValue('')
    setAdding(false)
  }

  if (!adding) {
    return (
      <button
        onClick={() => { setAdding(true); setTimeout(() => inputRef.current?.focus(), 0) }}
        className="flex items-center gap-2 w-full px-4 py-3 rounded-2xl border-2 border-dashed border-[#e2e8f0] text-[#94a3b8] hover:border-current hover:text-current transition-colors text-sm font-medium"
        style={{ '--tw-border-opacity': 1 }}
      >
        <Plus size={15} />
        Add section
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-current" style={{ borderColor: accent }}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') { setValue(''); setAdding(false) } }}
        placeholder="Section name..."
        className="flex-1 text-sm font-semibold text-[#0f172a] bg-transparent outline-none placeholder-[#cbd5e1]"
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="shrink-0 px-3 py-1 rounded-lg text-white text-xs font-semibold disabled:opacity-30 transition-all"
        style={{ background: accent }}
      >
        Add
      </button>
      <button onClick={() => { setValue(''); setAdding(false) }} className="text-[#94a3b8] hover:text-[#64748b] text-xs">
        Cancel
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChecklistPage() {
  const { checked, customSections, reset } = useChecklistStore()
  const { accent } = useTheme()

  const builtInTotal = CHECKLIST_PHASES.reduce((n, p) => n + p.items.length, 0)
  const customTotal  = customSections.reduce((n, s) => n + s.items.length, 0)
  const total = builtInTotal + customTotal

  const builtInDone = CHECKLIST_PHASES.reduce(
    (n, p) => n + p.items.filter((it) => checked[it.id]).length, 0
  )
  const customDone = customSections.reduce(
    (n, s) => n + s.items.filter((it) => checked[it.id]).length, 0
  )
  const done = builtInDone + customDone
  const pct  = total > 0 ? (done / total) * 100 : 0

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Checklist</h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #2563eb)` }}
            />
          </div>
          <span className="text-xs font-semibold text-[#64748b] shrink-0">{done} / {total}</span>
        </div>
      </div>

      {/* Timeline (only shown if the itinerary provides one) */}
      {CHECKLIST_TIMELINE.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-4">Timeline</p>
          <div className="relative flex">
            <div className="absolute top-[17px] left-[18px] right-[18px] h-px bg-[#e2e8f0]" />
            {CHECKLIST_TIMELINE.map((node) => (
              <TimelineNode key={node.label} node={node} />
            ))}
          </div>
        </div>
      )}

      {/* Built-in phases */}
      {CHECKLIST_PHASES.map((phase) => {
        const phaseDone = phase.items.filter((item) => checked[item.id]).length
        return (
          <div key={phase.id}>
            <div
              className="flex items-start justify-between px-4 py-3 rounded-2xl mb-2"
              style={{ backgroundColor: phase.accentBg, borderLeft: `3px solid ${phase.accent}` }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: phase.accent }}>{phase.title}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{phase.subtitle}</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#94a3b8] shrink-0 ml-3 mt-0.5">
                {phaseDone}/{phase.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {phase.items.map((item) => (
                <CheckItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Custom sections */}
      {customSections.length > 0 && (
        <div className="space-y-3">
          {CHECKLIST_PHASES.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2e8f0]" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8]">My Lists</span>
              <div className="h-px flex-1 bg-[#e2e8f0]" />
            </div>
          )}
          {customSections.map((section) => (
            <CustomSection key={section.id} section={section} />
          ))}
        </div>
      )}

      {/* Add section */}
      <AddSectionButton />

      {/* Reset */}
      {total > 0 && (
        <button
          onClick={() => { if (window.confirm('Reset all checkboxes and delete custom sections?')) reset() }}
          className="flex items-center gap-2 mx-auto text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors py-2"
        >
          <RotateCcw size={13} />
          Reset all
        </button>
      )}
    </div>
  )
}
