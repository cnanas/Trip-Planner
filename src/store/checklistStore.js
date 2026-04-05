import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loadState, saveState } from '../lib/db'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function sync(get) {
  saveState('checklist', {
    checked: get().checked,
    customSections: get().customSections,
  })
}

export const useChecklistStore = create(
  persist(
    (set, get) => ({
      checked: {},
      customSections: [],

      init: async () => {
        const data = await loadState('checklist')
        if (data && typeof data === 'object') {
          // Handle both old shape (raw checked object) and new shape ({ checked, customSections })
          if ('checked' in data || 'customSections' in data) {
            set({
              checked: data.checked ?? {},
              customSections: data.customSections ?? [],
            })
          } else {
            // Legacy: entire data object was the checked map
            set({ checked: data, customSections: [] })
          }
        } else {
          set({ checked: {}, customSections: [] })
        }
      },

      toggle: (id) => {
        set((s) => ({ checked: { ...s.checked, [id]: !s.checked[id] } }))
        sync(get)
      },

      isChecked: (id) => get().checked[id] === true,

      reset: () => {
        set({ checked: {}, customSections: [] })
        saveState('checklist', { checked: {}, customSections: [] })
      },

      // ── Custom sections ──────────────────────────────────────────────────

      addSection: (title) => {
        const section = { id: `cs-${uid()}`, title, items: [] }
        set((s) => ({ customSections: [...s.customSections, section] }))
        sync(get)
        return section.id
      },

      renameSection: (sectionId, title) => {
        set((s) => ({
          customSections: s.customSections.map((sec) =>
            sec.id === sectionId ? { ...sec, title } : sec
          ),
        }))
        sync(get)
      },

      deleteSection: (sectionId) => {
        set((s) => ({
          customSections: s.customSections.filter((sec) => sec.id !== sectionId),
        }))
        sync(get)
      },

      addItem: (sectionId, title) => {
        const item = { id: `ci-${uid()}`, title }
        set((s) => ({
          customSections: s.customSections.map((sec) =>
            sec.id === sectionId ? { ...sec, items: [...sec.items, item] } : sec
          ),
        }))
        sync(get)
      },

      deleteItem: (sectionId, itemId) => {
        set((s) => ({
          customSections: s.customSections.map((sec) =>
            sec.id === sectionId
              ? { ...sec, items: sec.items.filter((it) => it.id !== itemId) }
              : sec
          ),
        }))
        sync(get)
      },
    }),
    { name: 'rtp-checklist' }
  )
)
