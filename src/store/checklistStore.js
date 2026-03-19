import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChecklistStore = create(
  persist(
    (set, get) => ({
      checked: {},
      toggle: (id) =>
        set((s) => ({ checked: { ...s.checked, [id]: !s.checked[id] } })),
      reset: () => set({ checked: {} }),
      isChecked: (id) => get().checked[id] === true,
    }),
    { name: 'rtp-checklist' }
  )
)
