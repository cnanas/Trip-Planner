import { useState } from 'react'
import { useExpenseStore } from '../store/expenseStore'
import BudgetBar from '../components/expenses/BudgetBar'
import ExpenseRow from '../components/expenses/ExpenseRow'
import ExpenseForm from '../components/expenses/ExpenseForm'
import { EXPENSE_CATEGORIES } from '../data/itinerary'

export default function ExpensesPage() {
  const { expenses } = useExpenseStore()
  const [showForm, setShowForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState(null)
  const [filterDay, setFilterDay] = useState(null)

  const filtered = expenses.filter(e => {
    if (filterCategory && e.category !== filterCategory) return false
    if (filterDay && e.day !== filterDay) return false
    return true
  })

  return (
    <div className="flex flex-col min-h-full pb-4">
      {/* Summary section */}
      <div className="px-4 pt-4 space-y-3">
        <BudgetBar />

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterCategory(null)}
            className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
              filterCategory === null
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b]'
            }`}
          >
            All
          </button>
          {EXPENSE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(filterCategory === cat.id ? null : cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                filterCategory === cat.id
                  ? 'border-[#f97316] bg-[#fff7ed] text-[#f97316]'
                  : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Expense list */}
      <div className="flex-1 px-4 pt-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">💰</div>
            <p className="text-[#64748b] text-sm">No expenses yet.</p>
            <p className="text-[#94a3b8] text-xs mt-1">Tap + to add your first one.</p>
          </div>
        ) : (
          filtered.map(expense => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed right-4 z-20 w-14 h-14 bg-[#f97316] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#ea6c0e] transition-colors active:scale-95"
        style={{ bottom: 'calc(var(--tab-bar-height) + var(--safe-bottom) + 16px)' }}
        aria-label="Add expense"
      >
        +
      </button>

      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
