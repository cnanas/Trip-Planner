import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loadState, saveState } from '../lib/db'

const defaultEntry = (day) => ({
  id: `journal-day-${day}`,
  day,
  createdAt: null,
  updatedAt: null,
  text: '',
  mood: null,
  energyLevel: null,
  milesDriven: null,
  photoIds: [],
  milestones: [],
  dogLogs: [],
})

const DEFAULT_ENTRIES = {
  1: defaultEntry(1),
  2: defaultEntry(2),
  3: defaultEntry(3),
  4: defaultEntry(4),
  5: defaultEntry(5),
}

const DEFAULT_DOGS = [{ id: 'dog-1', name: 'Dog 1', breed: '', notes: '' }]

const sync = (get) =>
  saveState('journal', { entries: get().entries, dogs: get().dogs })

export const useJournalStore = create(
  persist(
    (set, get) => ({
      entries: DEFAULT_ENTRIES,
      dogs: DEFAULT_DOGS,

      init: async () => {
        const data = await loadState('journal')
        set({
          entries: data?.entries ?? DEFAULT_ENTRIES,
          dogs: data?.dogs ?? DEFAULT_DOGS,
        })
      },

      updateEntry: (day, updates) => {
        set((state) => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              ...updates,
              updatedAt: new Date().toISOString(),
            },
          },
        }))
        sync(get)
      },

      addDogLog: (day, log) => {
        set((state) => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              dogLogs: [...state.entries[day].dogLogs, log],
            },
          },
        }))
        sync(get)
      },

      addMilestone: (day, milestone) => {
        set((state) => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              milestones: [...state.entries[day].milestones, milestone],
            },
          },
        }))
        sync(get)
      },

      deleteMilestone: (day, milestoneId) => {
        set((state) => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              milestones: state.entries[day].milestones.filter((m) => m.id !== milestoneId),
            },
          },
        }))
        sync(get)
      },

      updateDog: (id, updates) => {
        set((state) => ({
          dogs: state.dogs.map((d) => d.id === id ? { ...d, ...updates } : d),
        }))
        sync(get)
      },

      addDog: (dog) => {
        set((state) => ({ dogs: [...state.dogs, dog] }))
        sync(get)
      },
    }),
    { name: 'trip-journal' }
  )
)
