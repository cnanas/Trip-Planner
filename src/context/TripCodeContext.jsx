import { createContext, useContext, useState, useCallback } from 'react'
import { getTripCode, setTripCode as persistTripCode } from '../lib/tripCode'

const Ctx = createContext(null)

export function TripCodeProvider({ children }) {
  const [tripCode, setTripCodeState] = useState(getTripCode)

  const setTripCode = useCallback((raw) => {
    const code = persistTripCode(raw)
    setTripCodeState(code)
    return code
  }, [])

  return <Ctx.Provider value={{ tripCode, setTripCode }}>{children}</Ctx.Provider>
}

export function useTripCode() {
  return useContext(Ctx)
}
