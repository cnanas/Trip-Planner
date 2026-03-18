import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTripStore = create(
  persist(
    (set) => ({
      userNotes: {},       // { [dayNumber]: string }
      completedDays: [],   // [1, 2, ...]
      avgMpg: 9,
      gasPricePerGallon: 3.50,
      departureDate: null, // ISO date string
      departureTimes: {},  // { [dayNumber]: "HH:mm" }

      setNote: (day, note) =>
        set(state => ({ userNotes: { ...state.userNotes, [day]: note } })),

      toggleComplete: (day) =>
        set(state => ({
          completedDays: state.completedDays.includes(day)
            ? state.completedDays.filter(d => d !== day)
            : [...state.completedDays, day],
        })),

      setAvgMpg: (mpg) => set({ avgMpg: mpg }),
      setGasPrice: (price) => set({ gasPricePerGallon: price }),
      setDepartureDate: (date) => set({ departureDate: date }),
      setDepartureTime: (day, time) =>
        set(state => ({ departureTimes: { ...state.departureTimes, [day]: time } })),
    }),
    { name: 'trip-itinerary' }
  )
)
