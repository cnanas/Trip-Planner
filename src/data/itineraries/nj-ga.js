// src/data/itineraries/nj-ga.js
// Upper Black Eddy, PA → Dahlonega, GA — 3-Day Trip with Baby
// Trip code: "nj-ga"

export const TRIP_META = {
  title: "Upper Black Eddy, PA → Dahlonega, GA",
  totalMiles: 665,
  totalDays: 3,
  avgMilesPerDay: 222,
  vehicle: "Car",
  pets: 0,
  route: "I-95 S (PA/DE/MD/VA) → I-85 S → US-129/GA-60 N",
}

export const TRIP_SUMMARY = {
  totalMiles: 665,
  totalDays: 3,
  avgMilesPerDay: 222,
  longestDay: { day: 1, miles: 285 },
  shortestDay: { day: 3, miles: 135 },
  petFriendlyStops: 0,
}

// ---------------------------------------------------------------------------
// DAYS
// ---------------------------------------------------------------------------

export const DAYS = [
  {
    number: 1,
    from: { name: "Upper Black Eddy, PA", lat: 40.5417, lng: -75.0674, state: "PA" },
    to:   { name: "Chester, VA",          lat: 37.3531, lng: -77.4397, state: "VA" },
    miles: 285,
    estimatedHours: 4.5,
    departureTime: "07:00",
    elevationGainFt: 500,
    elevationLossFt: 650,
    hotelId: "hotel-1",
    warnings: [
      {
        id: "warn-1-1",
        day: 1,
        type: "traffic",
        severity: "warning",
        message: "Baltimore I-695 beltway: aim to pass before 8:30 AM or after 10 AM to avoid heavy stop-and-go with a baby in the car.",
        icon: "⚠️",
      },
      {
        id: "warn-1-2",
        day: 1,
        type: "toll",
        severity: "info",
        message: "Delaware Turnpike + Memorial Bridge tolls (~$4–6). PA-to-NJ bridge toll may apply depending on your I-95 entry point (~$1–4).",
        icon: "🛣️",
      },
      {
        id: "warn-1-3",
        day: 1,
        type: "info",
        severity: "info",
        message: "Maryland House Service Area (~105 miles in) is the best first baby stop — nursing lounge, family restrooms, Starbucks.",
        icon: "👶",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Chester, VA",   lat: 37.3531, lng: -77.4397, state: "VA" },
    to:   { name: "Charlotte, NC", lat: 35.2271, lng: -80.8431, state: "NC" },
    miles: 245,
    estimatedHours: 3.5,
    departureTime: "08:00",
    elevationGainFt: 900,
    elevationLossFt: 550,
    hotelId: "hotel-2",
    warnings: [
      {
        id: "warn-2-1",
        day: 2,
        type: "info",
        severity: "info",
        message: "Relaxed day — I-85 S through NC is straightforward. Plenty of rest areas and amenities. Cracker Barrels every 60–80 miles if you need a slow, comfortable baby break.",
        icon: "✅",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 3,
    from: { name: "Charlotte, NC",  lat: 35.2271, lng: -80.8431, state: "NC" },
    to:   { name: "Dahlonega, GA",  lat: 34.5325, lng: -83.9854, state: "GA" },
    miles: 135,
    estimatedHours: 2.5,
    departureTime: "09:00",
    elevationGainFt: 1900,
    elevationLossFt: 400,
    hotelId: null,
    warnings: [
      {
        id: "warn-3-1",
        day: 3,
        type: "elevation",
        severity: "caution",
        message: "Last 30–35 miles to Dahlonega are winding mountain roads with elevation gain. Babies can get carsick on curves — feed, change, and settle baby before this section in Gainesville.",
        icon: "⛰️",
      },
    ],
    note: "Short, easy final day. You'll arrive well before noon with plenty of energy to settle in!",
    completed: false,
  },
]

// No Plan B — trip is already short and baby-friendly. DAYS_B mirrors DAYS.
export const DAYS_B = DAYS

// ---------------------------------------------------------------------------
// HOTELS
// ---------------------------------------------------------------------------

export const HOTELS = [
  {
    id: "hotel-1",
    day: 1,
    name: "Homewood Suites by Hilton Richmond-Chester",
    address: "2321 W Hundred Rd, Chester, VA 23831",
    lat: 37.3531,
    lng: -77.4397,
    rating: 4.3,
    ratingCount: 520,
    petFriendly: false,
    petNotes: "Full kitchen suite — microwave, stovetop, fridge for bottles and baby food. Complimentary hot breakfast. Great for re-establishing baby's routine before bed.",
    phone: "+18042524848",
    chains: ["Homewood Suites", "Hilton"],
    tags: ["breakfast", "suite", "kitchen", "baby-friendly", "highway-access"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-2",
    day: 2,
    name: "Residence Inn Charlotte South Park",
    address: "6000 Fairview Rd, Charlotte, NC 28210",
    lat: 35.1516,
    lng: -80.8285,
    rating: 4.2,
    ratingCount: 410,
    petFriendly: false,
    petNotes: "Extended-stay suite with full kitchen — ideal for baby routines. Stovetop and fridge for formula/food. Hot breakfast buffet included. South Charlotte location puts you well-positioned for an easy I-85 S departure toward Dahlonega.",
    phone: "+17045527773",
    chains: ["Residence Inn", "Marriott"],
    tags: ["breakfast", "suite", "kitchen", "baby-friendly", "family-friendly"],
    checkInTime: "16:00",
    checkOutTime: "12:00",
    websiteUrl: null,
  },
]

// No Plan B hotels
export const HOTELS_B = HOTELS

// ---------------------------------------------------------------------------
// MAP
// ---------------------------------------------------------------------------

export const MAP_MARKERS = [
  { id: "start",          type: "start",       label: "Start — Upper Black Eddy, PA",               lat: 40.5417, lng: -75.0674, day: null },
  { id: "hotel-marker-1", type: "hotel",       label: "Night 1 — Homewood Suites Chester, VA",       lat: 37.3531, lng: -77.4397, day: 1, hotelId: "hotel-1" },
  { id: "hotel-marker-2", type: "hotel",       label: "Night 2 — Residence Inn Charlotte South Park", lat: 35.1516, lng: -80.8285, day: 2, hotelId: "hotel-2" },
  { id: "destination",    type: "destination", label: "Home! — Dahlonega, GA",                       lat: 34.5325, lng: -83.9854, day: null },
]

export const WARNING_MARKERS = [
  {
    id: "wmarker-baltimore",
    type: "warning",
    label: "⚠️ Baltimore I-695",
    sublabel: "Pass before 8:30 AM or after 10 AM",
    lat: 39.3290,
    lng: -76.6207,
    day: 1,
  },
  {
    id: "wmarker-mountains",
    type: "elevation",
    label: "⛰️ North Georgia Mountains",
    sublabel: "Winding roads — prep baby before Gainesville",
    lat: 34.4800,
    lng: -83.9200,
    day: 3,
  },
]

// ---------------------------------------------------------------------------
// REST STOPS  (baby-focused)
// ---------------------------------------------------------------------------

export const REST_STOPS = [
  {
    id: 'rs-maryland-house',
    name: 'Maryland House Service Area, MD (I-95 N/S)',
    lat: 39.466,
    lng: -76.386,
    note: 'Best first baby stop — ~115 miles from Upper Black Eddy. Has a dedicated nursing lounge, family restrooms, Starbucks, Burger King, and plenty of room to walk.',
    critical: true,
  },
  {
    id: 'rs-fredericksburg-welcome',
    name: 'Virginia Welcome Center, Fredericksburg (I-95)',
    lat: 38.303,
    lng: -77.461,
    note: 'VA welcome center just south of Fredericksburg (~215 miles in). Picnic tables, clean restrooms, good second stretch stop before Chester.',
    critical: false,
  },
  {
    id: 'rs-stony-creek',
    name: 'Stony Creek Rest Area, VA (I-95)',
    lat: 36.945,
    lng: -77.590,
    note: 'Good first morning stop Day 2 (~45 miles south of Chester) before crossing into NC.',
    critical: false,
  },
  {
    id: 'rs-henderson',
    name: 'Henderson, NC (I-85 Exit 214)',
    lat: 36.329,
    lng: -78.400,
    note: 'First fuel and food stop after the VA/NC line. Fast food row with easy on/off. Good for a quick diaper change.',
    critical: false,
  },
  {
    id: 'rs-durham',
    name: 'Durham / Research Triangle, NC (I-85 Exit 175)',
    lat: 35.988,
    lng: -78.902,
    note: 'Bigger stop in the Research Triangle area — Cracker Barrel, Chick-fil-A, baby supplies easily available. Good midpoint break Day 2.',
    critical: false,
  },
  {
    id: 'rs-gainesville',
    name: 'Gainesville, GA (last stop before mountains)',
    lat: 34.296,
    lng: -83.826,
    note: 'IMPORTANT: Last stop with full amenities before 35 miles of winding mountain roads. Feed baby, change diaper, fill gas tank. Baby in a calm state for mountain approach.',
    critical: true,
  },
]

// ---------------------------------------------------------------------------
// ROUTE WAYPOINTS (polyline for map)
// ---------------------------------------------------------------------------

export const ROUTE_WAYPOINTS = [
  [40.5417, -75.0674],   // 0:  Upper Black Eddy, PA (Start)
  [40.2201, -74.7559],   // 1:  Near Trenton/Yardley — connect to I-95 south
  [39.7333, -75.5491],   // 2:  Wilmington, DE
  [39.6850, -75.5270],   // 3:  Delaware Memorial Bridge
  [39.5110, -76.1640],   // 4:  Aberdeen, MD
  [39.4660, -76.3860],   // 5:  Maryland House Service Area
  [39.3290, -76.6207],   // 6:  Baltimore, MD (I-695 bypass)
  [38.8970, -77.0360],   // 7:  Springfield, VA (I-95/I-495 interchange)
  [38.3032, -77.4605],   // 8:  Fredericksburg, VA
  [37.3531, -77.4397],   // 9:  Chester, VA — Night 1
  [36.9450, -77.5900],   // 10: Stony Creek, VA (rest area)
  [36.3290, -78.4000],   // 11: Henderson, NC
  [35.9880, -78.9020],   // 12: Durham, NC
  [35.5070, -80.6130],   // 13: Concord, NC
  [35.2271, -80.8431],   // 14: Charlotte, NC — Night 2
  [35.0070, -80.9430],   // 15: Fort Mill, SC
  [35.0710, -81.6500],   // 16: Gaffney, SC (I-85 S)
  [34.9460, -81.9320],   // 17: Spartanburg, SC
  [34.8440, -82.4010],   // 18: Greenville, SC
  [34.5030, -82.6500],   // 19: Anderson, SC
  [34.4400, -83.1080],   // 20: Lavonia/Hartwell, GA
  [34.2960, -83.8260],   // 21: Gainesville, GA (critical baby stop)
  [34.4800, -83.9200],   // 22: Mountain approach (US-129/GA-60)
  [34.5325, -83.9854],   // 23: Dahlonega, GA (Destination)
]

export const DAY_SEGMENTS = {
  1: [0,  9],   // Upper Black Eddy → Chester, VA
  2: [9,  14],  // Chester → Charlotte, NC
  3: [14, 23],  // Charlotte → Dahlonega, GA
}

// ---------------------------------------------------------------------------
// NOTABLE STOPS
// ---------------------------------------------------------------------------

export const STOPS = [
  { id: 'stop-1-mdhouse',    day: 1, name: 'Maryland House Service Area',    type: 'rest',       icon: '👶', note: 'Best first baby stop on the whole trip. Nursing lounge, family restrooms, Starbucks. About 115 miles in. Plan 20–30 min here.',                              detour: false },
  { id: 'stop-1-baltimore',  day: 1, name: 'Baltimore, MD',                  type: 'city',       icon: '🦀', note: 'Pass on I-695 bypass (not through downtown). Heavy traffic 7–9 AM — aim to arrive before then. If early, Inner Harbor views from the beltway.',           detour: false },
  { id: 'stop-1-fredburg',   day: 1, name: 'Fredericksburg, VA',             type: 'city',       icon: '🏛️', note: 'Good second stretch ~215 miles in. VA Welcome Center just south of here. Historic downtown if baby will tolerate a 20 min detour.',                       detour: false },
  { id: 'stop-2-chesterbl',  day: 2, name: 'Colonial Heights Cracker Barrel', type: 'city',      icon: '☕', note: 'Great relaxed start to Day 2 — ~5 min from the hotel. Cracker Barrel has comfortable seating, high chairs, and porch rockers to settle a fussy baby.',   detour: false },
  { id: 'stop-2-durham',     day: 2, name: 'Durham / RTP, NC',               type: 'city',       icon: '🔬', note: 'Research Triangle area off I-85 — great food options, Target and Walmart if you need baby supplies. Plan a longer break here (~135 miles from Chester).',  detour: false },
  { id: 'stop-2-charlotte',  day: 2, name: 'Charlotte, NC',                  type: 'city',       icon: '🏙️', note: "Overnight. SouthPark Mall is 5 min from the Residence Inn — great for walking the baby and restocking anything you need.",                              detour: false },
  { id: 'stop-3-gaffney',    day: 3, name: 'Cherokee Outlets, Gaffney, SC',  type: 'attraction', icon: '🛍️', note: 'Large outlet mall right off I-85 Exit 92 — easy parking, wide walkways, good for a stroller lap if baby needs movement.',                               detour: false },
  { id: 'stop-3-gainesville',day: 3, name: 'Gainesville, GA',                type: 'city',       icon: '👶', note: 'CRITICAL STOP: Feed and change baby here — this is your last easy stop before 35 miles of winding mountain roads. Fill up the gas tank too.',            detour: false },
  { id: 'stop-3-dahlonega',  day: 3, name: 'Downtown Dahlonega, GA',         type: 'attraction', icon: '⛏️', note: "Historic gold rush town square — great for a stroller walk once you've settled in. Excellent dinner options for the first night.",                        detour: false },
]

// ---------------------------------------------------------------------------
// MAP ROUTE STOPS (for OSRM routing in TripMap)
// ---------------------------------------------------------------------------

export const STOPS_A = [
  { lat: 40.5417, lng: -75.0674 },   // Upper Black Eddy, PA
  { lat: 37.3531, lng: -77.4397 },   // Chester, VA (Night 1)
  { lat: 35.2271, lng: -80.8431 },   // Charlotte, NC (Night 2)
  { lat: 34.5325, lng: -83.9854 },   // Dahlonega, GA
]

export const STOPS_B = STOPS_A

// ---------------------------------------------------------------------------
// EXPENSE / BUDGET
// ---------------------------------------------------------------------------

export const EXPENSE_CATEGORIES = [
  { id: "fuel",    label: "Fuel",           icon: "⛽", color: "#F59E0B" },
  { id: "lodging", label: "Lodging",        icon: "🏨", color: "#6366F1" },
  { id: "food",    label: "Food & Drink",   icon: "🍔", color: "#10B981" },
  { id: "baby",    label: "Baby Supplies",  icon: "🍼", color: "#EC4899" },
  { id: "tolls",   label: "Tolls",          icon: "🛣️",  color: "#EF4444" },
  { id: "misc",    label: "Miscellaneous",  icon: "📦", color: "#6B7280" },
]

export const DEFAULT_BUDGET = {
  total: 780,
  byCategory: {
    fuel:    120,   // ~665 mi ÷ 28 mpg × $5.00/gal (East Coast average)
    lodging: 420,   // 2 nights × ~$210/night (suite hotels)
    food:    150,   // ~$25/meal × 2 meals × 3 days + snacks
    baby:     50,   // diapers, wipes, formula, snacks for the road
    tolls:    30,   // DE Turnpike + DE Memorial Bridge + possible bridge crossing from PA
    misc:     10,   // buffer
  },
}

export const FUEL_DEFAULTS = {
  mpg: 28,
  gasPricePerGallon: 5.00,
  totalMiles: 665,
}

// ---------------------------------------------------------------------------
// JOURNAL — Baby activity log (replaces dog log for this trip)
// ---------------------------------------------------------------------------

export const DOG_LOG_TYPES = [
  { id: "feeding",  label: "Feeding",  icon: "🍼" },
  { id: "diaper",   label: "Diaper",   icon: "👶" },
  { id: "nap",      label: "Nap",      icon: "😴" },
  { id: "fussy",    label: "Fussy",    icon: "😢" },
  { id: "happy",    label: "Happy",    icon: "😊" },
]

export const MILESTONE_PRESETS = [
  "Left Upper Black Eddy! 🏡",
  "Crossed into New Jersey!",
  "Crossed into Delaware!",
  "Crossed into Maryland! 🦀",
  "Through Baltimore!",
  "Crossed into Virginia!",
  "Halfway there! 🎉",
  "Crossed into North Carolina!",
  "Through Charlotte! 🏙️",
  "Crossed into South Carolina!",
  "Crossed into Georgia! 🍑",
  "Almost there — Gainesville!",
  "Arrived in Dahlonega! 🏡✨",
]
