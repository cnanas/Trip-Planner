import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useJournalStore } from '../store/journalStore'
import { DOG_LOG_TYPES, MILESTONE_PRESETS } from '../data/itinerary'

const MOODS = [
  { id: 'great', label: 'Great', emoji: '😄' },
  { id: 'good',  label: 'Good',  emoji: '🙂' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'rough', label: 'Rough', emoji: '😤' },
]

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function JournalPage() {
  const [activeDay, setActiveDay] = useState(1)
  const { entries, dogs, updateEntry, addDogLog, addMilestone, deleteMilestone } = useJournalStore()
  const [newMilestone, setNewMilestone] = useState('')

  const entry = entries[activeDay]

  const handleNoteChange = (e) => {
    updateEntry(activeDay, { text: e.target.value, createdAt: entry.createdAt || new Date().toISOString() })
  }

  const handleMoodSet = (mood) => {
    updateEntry(activeDay, { mood: entry.mood === mood ? null : mood })
  }

  const handleEnergySet = (level) => {
    updateEntry(activeDay, { energyLevel: entry.energyLevel === level ? null : level })
  }

  const handleDogLog = (dogId, type) => {
    const now = new Date()
    addDogLog(activeDay, {
      id: generateId(),
      day: activeDay,
      time: now.toTimeString().slice(0, 5),
      type,
      notes: '',
      dogId,
    })
  }

  const handleAddMilestone = (text) => {
    if (!text.trim()) return
    addMilestone(activeDay, {
      id: generateId(),
      day: activeDay,
      text: text.trim(),
      lat: null,
      lng: null,
      timestamp: new Date().toISOString(),
    })
    setNewMilestone('')
  }

  return (
    <div className="flex flex-col pb-4">
      {/* Day tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-3 overflow-x-auto no-scrollbar">
        {[1, 2, 3, 4, 5].map(d => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`shrink-0 flex flex-col items-center gap-0.5 w-14 py-2.5 rounded-2xl border transition-colors ${
              activeDay === d
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#f97316]'
            }`}
          >
            <span className="font-mono text-xs font-bold">D{d}</span>
            {entries[d]?.mood && <span className="text-sm leading-none">{MOODS.find(m => m.id === entries[d].mood)?.emoji}</span>}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {/* Notes */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2.5">
            Day {activeDay} Notes
          </label>
          <textarea
            value={entry.text}
            onChange={handleNoteChange}
            placeholder={`How's Day ${activeDay} going?`}
            rows={5}
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-xl px-3 py-2.5 text-sm text-[#0f172a] placeholder-[#94a3b8] resize-none outline-none transition-colors"
            style={{ fontSize: '16px' }}
          />
        </div>

        {/* Mood + Energy */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-3">Mood</p>
          <div className="grid grid-cols-4 gap-2">
            {MOODS.map(m => (
              <button
                key={m.id}
                onClick={() => handleMoodSet(m.id)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-colors ${
                  entry.mood === m.id
                    ? 'border-[#f97316] bg-[#fff7ed]'
                    : 'border-[#e2e8f0] bg-[#f8fafc] hover:border-[#f97316]'
                }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-[10px] text-[#64748b] font-medium">{m.label}</span>
              </button>
            ))}
          </div>

          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mt-4 mb-2">Energy</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => handleEnergySet(n)}
                className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${
                  (entry.energyLevel ?? 0) >= n
                    ? 'bg-[#f97316] border-[#f97316] text-white'
                    : 'bg-[#f8fafc] border-[#e2e8f0] text-[#94a3b8]'
                }`}
              >
                ●
              </button>
            ))}
          </div>
        </div>

        {/* Dog Log */}
        {dogs.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-3">Dog Log</p>
            {dogs.map(dog => (
              <div key={dog.id} className="mb-3">
                <p className="text-sm font-semibold text-[#0f172a] mb-2">{dog.name}</p>
                <div className="grid grid-cols-5 gap-2">
                  {DOG_LOG_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => handleDogLog(dog.id, type.id)}
                      className="flex flex-col items-center gap-1 py-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#ec4899] transition-colors active:bg-[#fce7f3] min-h-[56px]"
                    >
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-[9px] text-[#64748b] font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {entry.dogLogs.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-40 overflow-y-auto">
                {[...entry.dogLogs].reverse().map(log => {
                  const dog = dogs.find(d => d.id === log.dogId)
                  const type = DOG_LOG_TYPES.find(t => t.id === log.type)
                  return (
                    <div key={log.id} className="flex items-center gap-2 text-xs text-[#64748b]">
                      <span className="font-mono text-[#94a3b8]">{log.time}</span>
                      <span>{dog?.name} · {type?.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-3">Milestones</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {MILESTONE_PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => handleAddMilestone(preset)}
                className="text-xs bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] px-3 py-1.5 rounded-full hover:border-[#f97316] hover:text-[#f97316] transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMilestone}
              onChange={e => setNewMilestone(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddMilestone(newMilestone)}
              placeholder="Custom milestone..."
              className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-xl px-3 py-2.5 text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors"
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={() => handleAddMilestone(newMilestone)}
              className="w-11 h-11 bg-[#f97316] rounded-xl flex items-center justify-center text-white shrink-0 hover:bg-[#ea6c0e] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          {entry.milestones.length > 0 && (
            <div className="mt-3 space-y-2">
              {entry.milestones.map(m => (
                <div key={m.id} className="flex items-center gap-2 bg-[#f8fafc] rounded-xl px-3 py-2.5 border border-[#e2e8f0]">
                  <span className="text-sm text-[#0f172a] flex-1">{m.text}</span>
                  <button
                    onClick={() => deleteMilestone(activeDay, m.id)}
                    className="text-[#94a3b8] hover:text-[#ef4444] w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
