import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useJournalStore = create(
  persist(
    (set, get) => ({
      entries: {
        1: defaultEntry(1),
        2: defaultEntry(2),
        3: defaultEntry(3),
        4: defaultEntry(4),
        5: defaultEntry(5),
      },
      dogs: [
        { id: 'dog-1', name: 'Dog 1', breed: '', notes: '' },
      ],

      updateEntry: (day, updates) =>
        set(state => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              ...updates,
              updatedAt: new Date().toISOString(),
            },
          },
        })),

      addDogLog: (day, log) =>
        set(state => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              dogLogs: [...state.entries[day].dogLogs, log],
            },
          },
        })),

      addMilestone: (day, milestone) =>
        set(state => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              milestones: [...state.entries[day].milestones, milestone],
            },
          },
        })),

      deleteMilestone: (day, milestoneId) =>
        set(state => ({
          entries: {
            ...state.entries,
            [day]: {
              ...state.entries[day],
              milestones: state.entries[day].milestones.filter(m => m.id !== milestoneId),
            },
          },
        })),

      updateDog: (id, updates) =>
        set(state => ({
          dogs: state.dogs.map(d => d.id === id ? { ...d, ...updates } : d),
        })),

      addDog: (dog) =>
        set(state => ({ dogs: [...state.dogs, dog] })),
    }),
    { name: 'trip-journal' }
  )
)
