import { useState } from 'react'
import { Trash2, X } from 'lucide-react'
import { CATEGORY_MAP } from '../../data/categories'
import { useExpenseStore } from '../../store/expenseStore'
import { useReceiptStore } from '../../store/receiptStore'

export default function ExpenseRow({ expense }) {
  const { deleteExpense } = useExpenseStore()
  const { getReceiptUrl } = useReceiptStore()
  const [swiped, setSwiped] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [lightbox, setLightbox] = useState(false)

  const cat = CATEGORY_MAP[expense.category] ?? { label: 'Misc', color: '#6b7280' }

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const delta = touchStartX - e.changedTouches[0].clientX
    if (delta > 60) setSwiped(true)
    else if (delta < -20) setSwiped(false)
    setTouchStartX(null)
  }

  return (
    <>
      <div
        className="expense-row relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={() => deleteExpense(expense.id)}
          className="absolute right-0 top-0 bottom-0 bg-[#ef4444] text-white flex items-center justify-center px-5 rounded-r-2xl transition-transform duration-200 z-10"
          style={{ transform: swiped ? 'translateX(0)' : 'translateX(100%)' }}
        >
          <Trash2 size={16} />
        </button>

        <div
          className={`flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm transition-transform duration-200 ${swiped ? '-translate-x-20' : 'translate-x-0'}`}
          onClick={() => swiped && setSwiped(false)}
        >
          <div
            className="w-1 self-stretch rounded-full shrink-0"
            style={{ backgroundColor: cat.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0f172a] truncate">
              {expense.merchant || expense.description || cat.label}
            </p>
            {expense.description && expense.merchant && (
              <p className="text-xs text-[#94a3b8] truncate">{expense.description}</p>
            )}
            <p className="text-xs text-[#94a3b8] mt-0.5">
              <span className="text-[10px] font-semibold tracking-wide uppercase text-[#cbd5e1] mr-1">{cat.label}</span>
              {expense.day ? `Day ${expense.day}` : 'Pre/Post'}
              {expense.isEstimate && ' · Est.'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {expense.receiptId && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox(true) }}
                className="w-10 h-10 rounded-xl overflow-hidden border border-[#e2e8f0] shrink-0"
              >
                <img
                  src={getReceiptUrl(expense.receiptId)}
                  alt="Receipt"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
            <span className="font-mono text-sm font-bold text-[#0f172a]">
              ${expense.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {lightbox && expense.receiptId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={getReceiptUrl(expense.receiptId)}
            alt="Receipt"
            className="max-w-full max-h-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            onClick={() => setLightbox(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  )
}
