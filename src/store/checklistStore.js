import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loadState, saveState } from '../lib/db'

export const useChecklistStore = create(
  persist(
    (set, get) => ({
      checked: {},

      init: async () => {
        const data = await loadState('checklist')
        if (data) set({ checked: data })
      },

      toggle: (id) => {
        set((s) => ({ checked: { ...s.checked, [id]: !s.checked[id] } }))
        saveState('checklist', get().checked)
      },

      reset: () => {
        set({ checked: {} })
        saveState('checklist', {})
      },

      isChecked: (id) => get().checked[id] === true,
    }),
    { name: 'rtp-checklist' }
  )
)
