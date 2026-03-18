import { useExpenseStore } from '../store/expenseStore'
import { useTripStore } from '../store/tripStore'
import { useJournalStore } from '../store/journalStore'
import { TRIP_SUMMARY, DAYS } from '../data/itinerary'
import { EXPENSE_CATEGORIES } from '../data/itinerary'

const MOODS = { great: '😄', good: '🙂', tired: '😴', rough: '😤' }

export default function SummaryPage() {
  const { expenses, budget, getTotals } = useExpenseStore()
  const { completedDays, avgMpg, gasPricePerGallon } = useTripStore()
  const { entries } = useJournalStore()

  const totals = getTotals()
  const fuelCost = (TRIP_SUMMARY.totalMiles / avgMpg) * gasPricePerGallon

  return (
    <div className="px-4 pt-4 pb-8 space-y-4">
      <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Trip Summary</h1>

      {/* Trip stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Total Miles',    value: TRIP_SUMMARY.totalMiles.toLocaleString(), unit: 'mi',                         color: '#f97316' },
          { label: 'Days Complete',  value: `${completedDays.length}/${TRIP_SUMMARY.totalDays}`, unit: 'days',             color: '#22c55e' },
          { label: 'Total Spent',    value: `$${totals.total.toFixed(0)}`,  unit: `of $${budget.total}`,                  color: totals.total > budget.total ? '#ef4444' : '#0f172a' },
          { label: 'Est. Fuel Cost', value: `$${fuelCost.toFixed(0)}`,      unit: `@ ${avgMpg} mpg`,                      color: '#f59e0b' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
            <div className="font-mono text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[#94a3b8] mt-0.5">{stat.unit}</div>
            <div className="text-xs text-[#64748b] mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Spending by category */}
      {expenses.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-4">Spending by Category</p>
          <div className="space-y-3">
            {EXPENSE_CATEGORIES.map(cat => {
              const spent = totals.byCategory[cat.id] ?? 0
              const budgeted = budget.byCategory[cat.id] ?? 0
              const pct = budgeted > 0 ? Math.min((spent / budgeted) * 100, 100) : 0
              if (spent === 0) return null
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#64748b] font-medium">{cat.label}</span>
                    <span className="font-mono text-xs font-bold text-[#0f172a]">${spent.toFixed(0)}</span>
                  </div>
                  <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mood timeline */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-4">Mood Timeline</p>
        <div className="flex gap-3">
          {DAYS.map(day => {
            const entry = entries[day.number]
            const mood = entry?.mood
            return (
              <div key={day.number} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="text-2xl">{mood ? MOODS[mood] : '—'}</div>
                <div className={`w-full h-1 rounded-full ${completedDays.includes(day.number) ? 'bg-[#22c55e]' : 'bg-[#e2e8f0]'}`} />
                <span className="font-mono text-[10px] text-[#94a3b8]">D{day.number}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Journal highlights */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-4">Journal</p>
        <div className="space-y-3">
          {DAYS.map(day => {
            const text = entries[day.number]?.text
            if (!text) return (
              <div key={day.number} className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-[#f97316] shrink-0">D{day.number}</span>
                <span className="text-xs text-[#94a3b8] italic">No entry</span>
              </div>
            )
            return (
              <div key={day.number} className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-[#f97316] shrink-0">D{day.number}</span>
                <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">{text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
