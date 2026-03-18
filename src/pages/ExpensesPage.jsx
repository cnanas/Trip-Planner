import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useExpenseStore } from '../store/expenseStore'
import BudgetBar from '../components/expenses/BudgetBar'
import ExpenseRow from '../components/expenses/ExpenseRow'
import ExpenseForm from '../components/expenses/ExpenseForm'
import { EXPENSE_CATEGORIES } from '../data/itinerary'

export default function ExpensesPage() {
  const { expenses } = useExpenseStore()
  const [showForm, setShowForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState(null)

  const filtered = expenses.filter(e => {
    if (filterCategory && e.category !== filterCategory) return false
    return true
  })

  return (
    <div className="flex flex-col min-h-full pb-4">
      <div className="px-4 pt-4 space-y-3">
        <BudgetBar />

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterCategory(null)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
              filterCategory === null
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b] hover:border-[#f97316] hover:text-[#f97316]'
            }`}
          >
            All
          </button>
          {EXPENSE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(filterCategory === cat.id ? null : cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                filterCategory === cat.id
                  ? 'border-[#f97316] bg-[#fff7ed] text-[#f97316]'
                  : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b] hover:border-[#f97316] hover:text-[#f97316]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expense list */}
      <div className="flex-1 px-4 pt-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#64748b] text-sm font-medium">No expenses yet</p>
            <p className="text-[#94a3b8] text-xs mt-1">Tap + to log your first one</p>
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
        className="fixed right-4 z-20 w-14 h-14 bg-[#f97316] rounded-2xl flex items-center justify-center text-white shadow-lg hover:bg-[#ea6c0e] transition-colors active:scale-95"
        style={{ bottom: 'calc(var(--tab-bar-height) + var(--safe-bottom) + 16px)' }}
        aria-label="Add expense"
      >
        <Plus size={24} />
      </button>

      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
