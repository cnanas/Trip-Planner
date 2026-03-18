import { useExpenseStore } from '../../store/expenseStore'

export default function BudgetBar() {
  const { budget, getTotals } = useExpenseStore()
  const totals = getTotals()
  const pct = Math.min((totals.total / budget.total) * 100, 100)
  const isOver = totals.total > budget.total

  return (
    <div className="bg-white rounded-xl p-4 border border-[#e2e8f0] shadow-sm">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs text-[#64748b]">Trip Budget</span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-sm font-bold text-[#0f172a]">
            ${totals.total.toFixed(0)}
          </span>
          <span className="text-xs text-[#94a3b8]">/ ${budget.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full budget-bar-fill ${isOver ? 'bg-[#ef4444]' : 'bg-[#f97316]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[#94a3b8]">{pct.toFixed(0)}% used</span>
        <span className={`text-xs ${isOver ? 'text-[#dc2626]' : 'text-[#64748b]'}`}>
          {isOver
            ? `$${(totals.total - budget.total).toFixed(0)} over`
            : `$${(budget.total - totals.total).toFixed(0)} remaining`}
        </span>
      </div>
    </div>
  )
}
