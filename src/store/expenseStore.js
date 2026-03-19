import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_BUDGET } from '../data/itinerary'
import { loadState, saveState } from '../lib/db'

const sync = (get) =>
  saveState('expenses', { expenses: get().expenses, budget: get().budget })

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      expenses: [],
      budget: DEFAULT_BUDGET,

      init: async () => {
        const data = await loadState('expenses')
        if (data) set({
          expenses: data.expenses ?? [],
          budget: data.budget ?? DEFAULT_BUDGET,
        })
      },

      addExpense: (expense) => {
        set((state) => ({ expenses: [expense, ...state.expenses] }))
        sync(get)
      },

      updateExpense: (id, updates) => {
        set((state) => ({
          expenses: state.expenses.map((e) => e.id === id ? { ...e, ...updates } : e),
        }))
        sync(get)
      },

      deleteExpense: (id) => {
        set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }))
        sync(get)
      },

      setBudget: (budget) => {
        set({ budget })
        sync(get)
      },

      getTotals: () => {
        const { expenses } = get()
        const byDay = {}
        const byCategory = {}

        for (const e of expenses) {
          if (e.day != null) byDay[e.day] = (byDay[e.day] || 0) + e.amount
          byCategory[e.category] = (byCategory[e.category] || 0) + e.amount
        }

        return {
          total: expenses.reduce((sum, e) => sum + e.amount, 0),
          byDay,
          byCategory,
          estimated: expenses.filter((e) => e.isEstimate).reduce((sum, e) => sum + e.amount, 0),
          actual: expenses.filter((e) => !e.isEstimate).reduce((sum, e) => sum + e.amount, 0),
        }
      },
    }),
    { name: 'trip-expenses' }
  )
)
