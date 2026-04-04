// src/data/itineraries/nj-ga.js
// Upper Black Eddy, PA → Dahlonega, GA — Baby-friendly road trip
// Trip code: "nj-ga"
//
// Plan A (Easy):   3 days, ~3.5–4h driving/day
//   Day 1: Upper Black Eddy → Fredericksburg, VA  (~215 mi)
//   Day 2: Fredericksburg  → Burlington, NC        (~250 mi)
//   Day 3: Burlington      → Dahlonega, GA         (~200 mi)
//
// Plan B (Medium): 2 days, ~5.5–6.5h driving/day
//   Day 1: Upper Black Eddy → Durham, NC           (~390 mi)
//   Day 2: Durham           → Dahlonega, GA        (~275 mi)

export const PLAN_LABELS = {
  A: { label: 'Plan A', sublabel: 'Easy · 3 days',   totalMiles: 665, finalDaySummary: '~200 mi · 3.5h' },
  B: { label: 'Plan B', sublabel: 'Medium · 2 days', totalMiles: 665, finalDaySummary: '~275 mi · 4.5h' },
}

export const TRIP_META = {
  title: "Upper Black Eddy, PA → Dahlonega, GA",
  totalMiles: 665,
  totalDays: 3,
  avgMilesPerDay: 222,
  vehicle: "Car",
  pets: 0,
  route: "I-95 S → I-85 S → US-129/GA-60 N",
}

export const TRIP_SUMMARY = {
  totalMiles: 665,
  totalDays: 3,
  avgMilesPerDay: 222,
  longestDay: { day: 1, miles: 215 },
  shortestDay: { day: 3, miles: 200 },
  petFriendlyStops: 0,
}

// ---------------------------------------------------------------------------
// PLAN A — Easy (3 days, ~3.5–4h driving/day)
// ---------------------------------------------------------------------------

export const DAYS = [
  {
    number: 1,
    from: { name: "Upper Black Eddy, PA", lat: 40.5417, lng: -75.0674, state: "PA" },
    to:   { name: "Fredericksburg, VA",   lat: 38.3032, lng: -77.4605, state: "VA" },
    miles: 215,
    estimatedHours: 3.5,
    departureTime: "08:00",
    elevationGainFt: 400,
    elevationLossFt: 550,
    hotelId: "hotel-a1",
    warnings: [
      {
        id: "a-warn-1-1",
        day: 1,
        type: "traffic",
        severity: "warning",
        message: "Baltimore I-695 beltway (~115 miles in): aim to pass before 8:30 AM or after 10 AM. Heavy stop-and-go with a baby in the car is rough.",
        icon: "⚠️",
      },
      {
        id: "a-warn-1-2",
        day: 1,
        type: "info",
        severity: "info",
        message: "Maryland House Service Area (~115 miles in) — best first baby stop on the entire route. Nursing lounge, family restrooms, Starbucks. Plan 20–30 min here.",
        icon: "👶",
      },
      {
        id: "a-warn-1-3",
        day: 1,
        type: "toll",
        severity: "info",
        message: "Delaware Turnpike + Memorial Bridge tolls (~$4–6).",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Fredericksburg, VA", lat: 38.3032, lng: -77.4605, state: "VA" },
    to:   { name: "Burlington, NC",     lat: 36.0956, lng: -79.4378, state: "NC" },
    miles: 250,
    estimatedHours: 4.0,
    departureTime: "08:30",
    elevationGainFt: 600,
    elevationLossFt: 450,
    hotelId: "hotel-a2",
    warnings: [
      {
        id: "a-warn-2-1",
        day: 2,
        type: "info",
        severity: "info",
        message: "Smooth day on I-95 S through Richmond and Petersburg, then I-85 S into NC. Cracker Barrels every 60–80 miles — great relaxed baby stops with high chairs and rocking chairs on the porch.",
        icon: "✅",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 3,
    from: { name: "Burlington, NC", lat: 36.0956, lng: -79.4378, state: "NC" },
    to:   { name: "Dahlonega, GA",  lat: 34.5325, lng: -83.9854, state: "GA" },
    miles: 200,
    estimatedHours: 3.5,
    departureTime: "09:00",
    elevationGainFt: 1800,
    elevationLossFt: 300,
    hotelId: null,
    warnings: [
      {
        id: "a-warn-3-1",
        day: 3,
        type: "elevation",
        severity: "caution",
        message: "Last 35 miles to Dahlonega are winding mountain roads. Feed, change, and settle the baby before this section — stop in Gainesville, GA.",
        icon: "⛰️",
      },
    ],
    note: "Short, beautiful final day. You'll arrive well before noon with plenty of energy!",
    completed: false,
  },
]

// ---------------------------------------------------------------------------
// PLAN B — Medium (2 days, ~5.5–6.5h driving/day)
// ---------------------------------------------------------------------------

export const DAYS_B = [
  {
    number: 1,
    from: { name: "Upper Black Eddy, PA", lat: 40.5417, lng: -75.0674, state: "PA" },
    to:   { name: "Durham, NC",           lat: 35.9940, lng: -78.8986, state: "NC" },
    miles: 390,
    estimatedHours: 6.25,
    departureTime: "07:00",
    elevationGainFt: 800,
    elevationLossFt: 1000,
    hotelId: "hotel-b1",
    warnings: [
      {
        id: "b-warn-1-1",
        day: 1,
        type: "traffic",
        severity: "warning",
        message: "Baltimore I-695 beltway (~115 miles in): aim to pass before 8:30 AM. Leaving at 7 AM puts you there around 9 AM — consider a Maryland House stop to time this right.",
        icon: "⚠️",
      },
      {
        id: "b-warn-1-2",
        day: 1,
        type: "info",
        severity: "info",
        message: "Maryland House Service Area (~115 miles in) — nursing lounge, family restrooms, Starbucks. Best first baby stop. Plan 20–30 min here.",
        icon: "👶",
      },
      {
        id: "b-warn-1-3",
        day: 1,
        type: "info",
        severity: "caution",
        message: "Big driving day. Plan 2–3 baby stops of 20–30 min each. Durham/RTP area has a Trader Joe's, Target, and Whole Foods nearby if you need to restock supplies.",
        icon: "⏰",
      },
      {
        id: "b-warn-1-4",
        day: 1,
        type: "toll",
        severity: "info",
        message: "Delaware Turnpike + Memorial Bridge tolls (~$4–6).",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Durham, NC",   lat: 35.9940, lng: -78.8986, state: "NC" },
    to:   { name: "Dahlonega, GA", lat: 34.5325, lng: -83.9854, state: "GA" },
    miles: 275,
    estimatedHours: 4.5,
    departureTime: "08:30",
    elevationGainFt: 1900,
    elevationLossFt: 350,
    hotelId: null,
    warnings: [
      {
        id: "b-warn-2-1",
        day: 2,
        type: "elevation",
        severity: "caution",
        message: "Last 35 miles to Dahlonega are winding mountain roads. Stop in Gainesville, GA to feed and change baby before the mountain section.",
        icon: "⛰️",
      },
    ],
    note: "Comfortable final day — mostly easy I-85 S through Charlotte and into Georgia.",
    completed: false,
  },
]

// ---------------------------------------------------------------------------
// HOTELS — Plan A
// ---------------------------------------------------------------------------

export const HOTELS = [
  {
    id: "hotel-a1",
    day: 1,
    name: "TownePlace Suites by Marriott Fredericksburg",
    address: "3212 Plank Rd, Fredericksburg, VA 22401",
    lat: 38.3050,
    lng: -77.4892,
    rating: 4.2,
    ratingCount: 480,
    petFriendly: false,
    petNotes: "Studio suite with full kitchen — stovetop, microwave, full fridge. Perfect for warming bottles and storing baby food. Easy I-95 access.",
    phone: "+15406027010",
    chains: ["TownePlace Suites", "Marriott"],
    tags: ["kitchen-suite", "baby-friendly", "highway-access"],
    checkInTime: "15:00",
    checkOutTime: "12:00",
    websiteUrl: null,
  },
  {
    id: "hotel-a2",
    day: 2,
    name: "Hampton Inn Burlington",
    address: "2444 Maple Ave, Burlington, NC 27215",
    lat: 36.0942,
    lng: -79.4553,
    rating: 4.1,
    ratingCount: 620,
    petFriendly: false,
    petNotes: "Complimentary hot breakfast — high chairs available. Quiet location off I-85 with easy access. Great spot to re-establish baby's nighttime routine before the final short day.",
    phone: "+13365854100",
    chains: ["Hampton Inn", "Hilton"],
    tags: ["breakfast", "baby-friendly", "quiet", "highway-access"],
    checkInTime: "15:00",
    checkOutTime: "12:00",
    websiteUrl: null,
  },
]

// ---------------------------------------------------------------------------
// HOTELS — Plan B
// ---------------------------------------------------------------------------

export const HOTELS_B = [
  {
    id: "hotel-b1",
    day: 1,
    name: "Residence Inn Durham Research Triangle Park",
    address: "4919 S Miami Blvd, Durham, NC 27703",
    lat: 35.9670,
    lng: -78.8870,
    rating: 4.3,
    ratingCount: 590,
    petFriendly: false,
    petNotes: "Full kitchen suite (stovetop, full fridge, microwave, dishwasher) — ideal for baby routines. Hot breakfast buffet included. Right off I-40/RTP interchange, easy on/off.",
    phone: "+19194015900",
    chains: ["Residence Inn", "Marriott"],
    tags: ["breakfast", "kitchen-suite", "baby-friendly", "family-friendly"],
    checkInTime: "16:00",
    checkOutTime: "12:00",
    websiteUrl: null,
  },
]

// ---------------------------------------------------------------------------
// MAP
// ---------------------------------------------------------------------------

export const MAP_MARKERS = [
  { id: "start",          type: "start",       label: "Start — Upper Black Eddy, PA",                  lat: 40.5417, lng: -75.0674, day: null },
  { id: "hotel-marker-a1",type: "hotel",       label: "Night 1 (Easy) — TownePlace Suites Fredericksburg", lat: 38.3050, lng: -77.4892, day: 1, hotelId: "hotel-a1" },
  { id: "hotel-marker-a2",type: "hotel",       label: "Night 2 (Easy) — Hampton Inn Burlington",       lat: 36.0942, lng: -79.4553, day: 2, hotelId: "hotel-a2" },
  { id: "hotel-marker-b1",type: "hotel",       label: "Night 1 (Medium) — Residence Inn Durham RTP",   lat: 35.9670, lng: -78.8870, day: 1, hotelId: "hotel-b1" },
  { id: "destination",    type: "destination", label: "Home! — Dahlonega, GA",                         lat: 34.5325, lng: -83.9854, day: null },
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
    sublabel: "Winding roads — prep baby in Gainesville first",
    lat: 34.4800,
    lng: -83.9200,
    day: 3,
  },
]

// ---------------------------------------------------------------------------
// REST STOPS (baby-focused, same for both plans)
// ---------------------------------------------------------------------------

export const REST_STOPS = [
  {
    id: 'rs-maryland-house',
    name: 'Maryland House Service Area, MD (I-95)',
    lat: 39.466,
    lng: -76.386,
    note: 'Best first baby stop on the route (~115 miles in). Nursing lounge, family restrooms, Starbucks, Burger King. Plan 20–30 min here.',
    critical: true,
  },
  {
    id: 'rs-fredericksburg-welcome',
    name: 'Virginia Welcome Center, Fredericksburg (I-95)',
    lat: 38.303,
    lng: -77.461,
    note: 'VA welcome center just south of Fredericksburg (~215 miles from start). Picnic tables, clean restrooms.',
    critical: false,
  },
  {
    id: 'rs-henderson',
    name: 'Henderson, NC (I-85 Exit 214)',
    lat: 36.329,
    lng: -78.400,
    note: 'First fuel and food after the VA/NC line. Good for a quick diaper change.',
    critical: false,
  },
  {
    id: 'rs-durham-rtp',
    name: 'Durham / RTP, NC (I-85/I-40 interchange)',
    lat: 35.988,
    lng: -78.902,
    note: 'Plan B Night 1 stop. Also a great midway break for Plan A Day 2 — Target, Whole Foods, and Trader Joe\'s nearby for baby supplies.',
    critical: false,
  },
  {
    id: 'rs-gainesville',
    name: 'Gainesville, GA (last stop before mountains)',
    lat: 34.296,
    lng: -83.826,
    note: 'CRITICAL: Last stop with full amenities before 35 miles of winding mountain roads. Feed baby, change diaper, fill gas tank here.',
    critical: true,
  },
]

// ---------------------------------------------------------------------------
// ROUTE WAYPOINTS (single polyline for full route)
// ---------------------------------------------------------------------------

export const ROUTE_WAYPOINTS = [
  [40.5417, -75.0674],   // 0:  Upper Black Eddy, PA (Start)
  [40.2201, -74.7559],   // 1:  Near Trenton/Yardley — connect to I-95 S
  [39.7333, -75.5491],   // 2:  Wilmington, DE
  [39.6850, -75.5270],   // 3:  Delaware Memorial Bridge
  [39.5110, -76.1640],   // 4:  Aberdeen, MD
  [39.4660, -76.3860],   // 5:  Maryland House Service Area
  [39.3290, -76.6207],   // 6:  Baltimore, MD (I-695 bypass)
  [38.8970, -77.0360],   // 7:  Springfield, VA (I-95/I-495)
  [38.3032, -77.4605],   // 8:  Fredericksburg, VA — Plan A Night 1
  [37.5407, -77.4360],   // 9:  Richmond, VA
  [37.2296, -77.4013],   // 10: Petersburg, VA — I-85 junction
  [36.3290, -78.4000],   // 11: Henderson, NC
  [35.9940, -78.8986],   // 12: Durham, NC — Plan B Night 1
  [36.0956, -79.4378],   // 13: Burlington, NC — Plan A Night 2
  [35.5070, -80.6130],   // 14: Concord, NC
  [35.0710, -81.6500],   // 15: Gaffney, SC (I-85 S)
  [34.9460, -81.9320],   // 16: Spartanburg, SC
  [34.8440, -82.4010],   // 17: Greenville, SC
  [34.5030, -82.6500],   // 18: Anderson, SC
  [34.4400, -83.1080],   // 19: Lavonia/Hartwell, GA
  [34.2960, -83.8260],   // 20: Gainesville, GA (critical baby stop)
  [34.4800, -83.9200],   // 21: Mountain approach (US-129/GA-60)
  [34.5325, -83.9854],   // 22: Dahlonega, GA (Destination)
]

// Plan A segments (3 days)
export const DAY_SEGMENTS = {
  1: [0,  8],   // Upper Black Eddy → Fredericksburg VA
  2: [8,  13],  // Fredericksburg → Burlington NC
  3: [13, 22],  // Burlington → Dahlonega GA
}

// Plan B segments (2 days)
export const DAY_SEGMENTS_B = {
  1: [0,  12],  // Upper Black Eddy → Durham NC
  2: [12, 22],  // Durham → Dahlonega GA
}

// ---------------------------------------------------------------------------
// MAP ROUTE STOPS (for OSRM routing in TripMap)
// ---------------------------------------------------------------------------

export const STOPS_A = [
  { lat: 40.5417, lng: -75.0674 },   // Upper Black Eddy, PA
  { lat: 38.3032, lng: -77.4605 },   // Fredericksburg, VA (Night 1)
  { lat: 36.0956, lng: -79.4378 },   // Burlington, NC (Night 2)
  { lat: 34.5325, lng: -83.9854 },   // Dahlonega, GA
]

export const STOPS_B = [
  { lat: 40.5417, lng: -75.0674 },   // Upper Black Eddy, PA
  { lat: 35.9940, lng: -78.8986 },   // Durham, NC (Night 1)
  { lat: 34.5325, lng: -83.9854 },   // Dahlonega, GA
]

// ---------------------------------------------------------------------------
// NOTABLE STOPS
// ---------------------------------------------------------------------------

export const STOPS = [
  { id: 'stop-1-mdhouse',    day: 1, name: 'Maryland House Service Area', type: 'rest',       icon: '👶', note: 'Best first baby stop. Nursing lounge, family restrooms, Starbucks. ~115 miles in. Plan 20–30 min.', detour: false },
  { id: 'stop-1-baltimore',  day: 1, name: 'Baltimore, MD',               type: 'city',       icon: '🦀', note: 'Pass on I-695 bypass — avoid 7–9 AM rush. If ahead of schedule, Inner Harbor is a beautiful drive-by.', detour: false },
  { id: 'stop-1-fredburg',   day: 1, name: 'Fredericksburg, VA',          type: 'city',       icon: '🏛️', note: 'Day 1 overnight (Plan A). Great Cracker Barrel on Plank Rd near the hotel for a slow, easy dinner with the baby.', detour: false },
  { id: 'stop-2-richmond',   day: 2, name: 'Richmond, VA',                type: 'city',       icon: '🏙️', note: 'Good stretch stop ~45 miles into Day 2 (Plan A). Multiple rest stops, Starbucks easy off I-95.', detour: false },
  { id: 'stop-2-henderson',  day: 2, name: 'Henderson, NC',               type: 'city',       icon: '⛽', note: 'First NC stop with good fuel and food options. Easy on/off I-85.', detour: false },
  { id: 'stop-2-durham',     day: 2, name: 'Durham / RTP, NC',            type: 'city',       icon: '🔬', note: 'Plan B Night 1 overnight. Also a great mid-Day 2 stop for Plan A — Target and baby supply stores nearby.', detour: false },
  { id: 'stop-2-burlington', day: 2, name: 'Burlington, NC',              type: 'city',       icon: '🌿', note: 'Day 2 overnight (Plan A). Quiet area with easy I-85 access. Good baby dinner spot nearby.', detour: false },
  { id: 'stop-3-charlotte',  day: 3, name: 'Charlotte area (Concord)',    type: 'city',       icon: '🏙️', note: 'Good fuel and baby stop ~100 miles into final day. Huge rest stop amenities at Concord Mills area.', detour: false },
  { id: 'stop-3-gainesville',day: 3, name: 'Gainesville, GA',             type: 'city',       icon: '👶', note: 'CRITICAL: Last full-service stop before 35 miles of mountain roads. Feed baby, diaper change, fill the tank.', detour: false },
  { id: 'stop-3-dahlonega',  day: 3, name: 'Downtown Dahlonega, GA',      type: 'attraction', icon: '⛏️', note: 'Historic gold rush town square — great for a stroller walk once settled. Excellent first-night dinner options.', detour: false },
]

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
  total: 750,
  byCategory: {
    fuel:    120,   // ~665 mi ÷ 28 mpg × $5.00/gal
    lodging: 420,   // 2 nights × ~$210/night (suite hotels)
    food:    140,   // ~$25/meal × 2 meals × 3 days + snacks
    baby:     40,   // diapers, wipes, snacks, formula for the road
    tolls:    25,   // DE Turnpike + Memorial Bridge
    misc:      5,   // buffer
  },
}

export const FUEL_DEFAULTS = {
  mpg: 28,
  gasPricePerGallon: 5.00,
  totalMiles: 665,
}

// ---------------------------------------------------------------------------
// JOURNAL — Baby activity log (replaces dog log)
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
  "Through Durham!",
  "Crossed into South Carolina!",
  "Crossed into Georgia! 🍑",
  "Almost there — Gainesville!",
  "Arrived in Dahlonega! 🏡✨",
]
