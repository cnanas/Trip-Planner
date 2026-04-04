// src/data/itinerary.js
// Trip-code router — selects the correct itinerary at module load time based on
// the active trip code stored in localStorage. Changing the trip code takes effect
// on the next page load (the TripCodePicker triggers a reload automatically).

import * as maWa from './itineraries/ma-wa'
import * as njGa from './itineraries/nj-ga'

// Map trip codes → itinerary modules. Add new trips here.
const ITINERARIES = {
  'nj-ga': njGa,
}

const code = typeof localStorage !== 'undefined'
  ? (localStorage.getItem('rtp-trip-code') || '')
  : ''

const trip = ITINERARIES[code] ?? maWa

export const {
  PLAN_LABELS,
  TRIP_META,
  TRIP_SUMMARY,
  DAYS,
  DAYS_B,
  HOTELS,
  HOTELS_B,
  MAP_MARKERS,
  WARNING_MARKERS,
  REST_STOPS,
  ROUTE_WAYPOINTS,
  DAY_SEGMENTS,
  STOPS,
  STOPS_A,
  STOPS_B,
  EXPENSE_CATEGORIES,
  DEFAULT_BUDGET,
  FUEL_DEFAULTS,
  DOG_LOG_TYPES,
  MILESTONE_PRESETS,
  EMERGENCY_NUMBERS,
} = trip
