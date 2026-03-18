import { useState } from 'react'
import { CATEGORY_MAP } from '../../data/categories'
import { useExpenseStore } from '../../store/expenseStore'

export default function ExpenseRow({ expense }) {
  const { deleteExpense } = useExpenseStore()
  const [swiped, setSwiped] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const cat = CATEGORY_MAP[expense.category] ?? { icon: '📦', label: 'Misc', color: '#6b7280' }

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const delta = touchStartX - e.changedTouches[0].clientX
    if (delta > 60) setSwiped(true)
    else if (delta < -20) setSwiped(false)
    setTouchStartX(null)
  }

  return (
    <div
      className="expense-row relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={() => deleteExpense(expense.id)}
        className="absolute right-0 top-0 bottom-0 bg-[#ef4444] text-white flex items-center justify-center px-5 rounded-r-xl transition-transform duration-200 text-sm font-medium z-10"
        style={{ transform: swiped ? 'translateX(0)' : 'translateX(100%)' }}
      >
        Delete
      </button>

      <div
        className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-[#e2e8f0] shadow-sm transition-transform duration-200 ${swiped ? '-translate-x-20' : 'translate-x-0'}`}
        onClick={() => swiped && setSwiped(false)}
      >
        <div
          className="w-1 self-stretch rounded-full shrink-0"
          style={{ backgroundColor: cat.color }}
        />
        <span className="text-lg shrink-0">{cat.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#0f172a] truncate">
            {expense.merchant || expense.description || cat.label}
          </p>
          {expense.description && expense.merchant && (
            <p className="text-xs text-[#94a3b8] truncate">{expense.description}</p>
          )}
          <p className="text-xs text-[#94a3b8]">
            {expense.day ? `Day ${expense.day}` : 'Pre/Post trip'}
            {expense.isEstimate && ' · Est.'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {expense.receiptId && <span className="text-[#94a3b8] text-sm">📎</span>}
          <span className="font-mono text-sm font-bold text-[#0f172a]">
            ${expense.amount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
