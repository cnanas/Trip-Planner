import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loadState, saveState } from '../lib/db'

const sync = (get) => saveState('trip', {
  userNotes: get().userNotes,
  completedDays: get().completedDays,
  avgMpg: get().avgMpg,
  gasPricePerGallon: get().gasPricePerGallon,
  departureDate: get().departureDate,
  departureTimes: get().departureTimes,
})

export const useTripStore = create(
  persist(
    (set, get) => ({
      userNotes: {},
      completedDays: [],
      avgMpg: 9,
      gasPricePerGallon: 3.50,
      departureDate: null,
      departureTimes: {},

      init: async () => {
        const data = await loadState('trip')
        set({
          userNotes: data?.userNotes ?? {},
          completedDays: data?.completedDays ?? [],
          avgMpg: data?.avgMpg ?? 9,
          gasPricePerGallon: data?.gasPricePerGallon ?? 3.50,
          departureDate: data?.departureDate ?? null,
          departureTimes: data?.departureTimes ?? {},
        })
      },

      setNote: (day, note) => {
        set((state) => ({ userNotes: { ...state.userNotes, [day]: note } }))
        sync(get)
      },

      toggleComplete: (day) => {
        set((state) => ({
          completedDays: state.completedDays.includes(day)
            ? state.completedDays.filter((d) => d !== day)
            : [...state.completedDays, day],
        }))
        sync(get)
      },

      setAvgMpg: (mpg) => { set({ avgMpg: mpg }); sync(get) },
      setGasPrice: (price) => { set({ gasPricePerGallon: price }); sync(get) },
      setDepartureDate: (date) => { set({ departureDate: date }); sync(get) },

      setDepartureTime: (day, time) => {
        set((state) => ({ departureTimes: { ...state.departureTimes, [day]: time } }))
        sync(get)
      },
    }),
    { name: 'trip-itinerary' }
  )
)
