// src/data/itinerary.js
// Seed data for Sunderland, MA → Spokane, WA — 5-Day Moving Trip via I-90

export const TRIP_META = {
  title: "Sunderland, MA → Spokane, WA",
  totalMiles: 2480,
  totalDays: 5,
  avgMilesPerDay: 496,
  vehicle: "15' UHaul + Auto Transport Trailer",
  pets: 2,
  route: "I-90 W (nearly end-to-end)",
}

// Alias for components that use TRIP_SUMMARY
export const TRIP_SUMMARY = {
  totalMiles: 2480,
  totalDays: 5,
  avgMilesPerDay: 496,
  longestDay: { day: 1, miles: 550 },
  shortestDay: { day: 5, miles: 400 },
  petFriendlyStops: 4,
}

// ---------------------------------------------------------------------------
// DAYS (warnings embedded per day)
// ---------------------------------------------------------------------------

export const DAYS = [
  {
    number: 1,
    from: { name: "Sunderland, MA", lat: 42.4648, lng: -72.5723, state: "MA" },
    to:   { name: "Cleveland, OH",  lat: 41.4993, lng: -81.6944, state: "OH" },
    miles: 550,
    estimatedHours: 9.5,
    departureTime: "06:00",
    hotelId: "hotel-1",
    warnings: [
      {
        id: "warn-1-1",
        day: 1,
        type: "toll",
        severity: "info",
        message: "New York Thruway tolls (~$20–30 depending on exits)",
        icon: "🛣️",
      },
      {
        id: "warn-1-2",
        day: 1,
        type: "toll",
        severity: "info",
        message: "Ohio Turnpike tolls (~$5–10)",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 2,
    from: { name: "Cleveland, OH", lat: 41.4993, lng: -81.6944, state: "OH" },
    to:   { name: "Madison, WI",   lat: 43.0731, lng: -89.4012, state: "WI" },
    miles: 530,
    estimatedHours: 9.0,
    departureTime: "06:00",
    hotelId: "hotel-2",
    warnings: [
      {
        id: "warn-2-1",
        day: 2,
        type: "traffic",
        severity: "warning",
        message: "Chicago metro — aim to pass through before 7 AM or after 9 AM. Rush hour with a UHaul + trailer can cost 2+ hours.",
        icon: "⚠️",
      },
      {
        id: "warn-2-2",
        day: 2,
        type: "toll",
        severity: "info",
        message: "Illinois Tollway (~$5)",
        icon: "🛣️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 3,
    from: { name: "Madison, WI", lat: 43.0731, lng: -89.4012, state: "WI" },
    to:   { name: "Murdo, SD",   lat: 43.8861, lng: -100.7163, state: "SD" },
    miles: 450,
    estimatedHours: 7.5,
    departureTime: "07:00",
    hotelId: "hotel-3",
    warnings: [
      {
        id: "warn-3-1",
        day: 3,
        type: "fuel",
        severity: "caution",
        message: "Gas stations become sparse past Sioux Falls. Fill up before leaving the city.",
        icon: "⛽",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 4,
    from: { name: "Murdo, SD",   lat: 43.8861, lng: -100.7163, state: "SD" },
    to:   { name: "Billings, MT", lat: 45.7833, lng: -108.5007, state: "MT" },
    miles: 550,
    estimatedHours: 9.0,
    departureTime: "06:00",
    hotelId: "hotel-4",
    warnings: [
      {
        id: "warn-4-1",
        day: 4,
        type: "fuel",
        severity: "caution",
        message: "Long fuel gaps past Rapid City into Wyoming. Keep tank above half at all times.",
        icon: "⛽",
      },
      {
        id: "warn-4-2",
        day: 4,
        type: "elevation",
        severity: "caution",
        message: "Bighorn Mountains near Sheridan, WY reach ~8,000 ft. Take grades slow with trailer.",
        icon: "⛰️",
      },
    ],
    note: "",
    completed: false,
  },
  {
    number: 5,
    from: { name: "Billings, MT", lat: 45.7833, lng: -108.5007, state: "MT" },
    to:   { name: "Spokane, WA",  lat: 47.6588, lng: -117.426,  state: "WA" },
    miles: 400,
    estimatedHours: 6.5,
    departureTime: "07:00",
    hotelId: null,
    warnings: [],
    note: "",
    completed: false,
  },
]

// ---------------------------------------------------------------------------
// HOTELS
// ---------------------------------------------------------------------------

export const HOTELS = [
  {
    id: "hotel-1",
    day: 1,
    name: "La Quinta Inn & Suites by Wyndham Cleveland Macedonia",
    address: "268 Highland Rd, Macedonia, OH 44056",
    lat: 41.2988,
    lng: -81.517,
    rating: 3.9,
    ratingCount: 1215,
    petFriendly: true,
    petNotes: "Dogs allowed. Note: this location has a 2-dog limit and may charge a pet fee. Call ahead to confirm.",
    phone: "+13304685400",
    chains: ["La Quinta", "Wyndham"],
    tags: ["breakfast", "dog-friendly", "highway-access"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-2",
    day: 2,
    name: "AmericInn by Wyndham Madison West",
    address: "516 Grand Canyon Dr, Madison, WI 53719",
    lat: 43.0553,
    lng: -89.4981,
    rating: 4.1,
    ratingCount: 1378,
    petFriendly: true,
    petNotes: "Pet-friendly property. Highly rated breakfast. Quiet area with easy highway access.",
    phone: "+16085354712",
    chains: ["AmericInn", "Wyndham"],
    tags: ["breakfast", "dog-friendly", "highly-rated", "quiet"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-3",
    day: 3,
    name: "Best Western Graham's",
    address: "301 5th St, Murdo, SD 57559",
    lat: 43.886,
    lng: -100.716,
    rating: 4.4,
    ratingCount: 843,
    petFriendly: true,
    petNotes: "Staff have been reported to have a dog treat bag ready at check-in! Excellent hot breakfast. Renovated retro property.",
    phone: "+16056692441",
    chains: ["Best Western"],
    tags: ["breakfast", "dog-friendly", "dog-treats", "gem", "retro", "highly-rated"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
  {
    id: "hotel-4",
    day: 4,
    name: "Best Western Yellowstone Crossing",
    address: "205 SE 4th St, Laurel, MT 59044",
    lat: 45.6658,
    lng: -108.769,
    rating: 4.0,
    ratingCount: 823,
    petFriendly: true,
    petNotes: "Dedicated outdoor green space for pets. Dog-traveling reviewers specifically praised this property. Just east of Billings on I-90.",
    phone: "+14066286888",
    chains: ["Best Western"],
    tags: ["breakfast", "dog-friendly", "pet-area", "near-billings"],
    checkInTime: "15:00",
    checkOutTime: "11:00",
    websiteUrl: null,
  },
]

// ---------------------------------------------------------------------------
// MAP
// ---------------------------------------------------------------------------

export const MAP_MARKERS = [
  { id: "start",         type: "start",       label: "Start — Sunderland, MA",               lat: 42.4648, lng: -72.5723, day: null },
  { id: "hotel-marker-1", type: "hotel",      label: "Night 1 — La Quinta Cleveland",         lat: 41.2988, lng: -81.517,  day: 1, hotelId: "hotel-1" },
  { id: "hotel-marker-2", type: "hotel",      label: "Night 2 — AmericInn Madison",           lat: 43.0553, lng: -89.4981, day: 2, hotelId: "hotel-2" },
  { id: "hotel-marker-3", type: "hotel",      label: "Night 3 — Best Western Graham's Murdo", lat: 43.886,  lng: -100.716, day: 3, hotelId: "hotel-3" },
  { id: "hotel-marker-4", type: "hotel",      label: "Night 4 — BW Yellowstone Crossing",     lat: 45.6658, lng: -108.769, day: 4, hotelId: "hotel-4" },
  { id: "destination",    type: "destination", label: "Home! — Spokane, WA",                  lat: 47.6588, lng: -117.426, day: null },
]

export const WARNING_MARKERS = [
  {
    id: "wmarker-chicago",
    type: "warning",
    label: "⚠️ Chicago Traffic",
    sublabel: "Time carefully — before 7 AM or after 9 AM",
    lat: 41.8827,
    lng: -87.6233,
    day: 2,
  },
  {
    id: "wmarker-bighorn",
    type: "elevation",
    label: "⛰️ Bighorn Mountains",
    sublabel: "~8,000 ft grades — take it slow with trailer",
    lat: 44.6,
    lng: -107.4,
    day: 4,
  },
  {
    id: "wmarker-fuel-wy",
    type: "fuel",
    label: "⛽ Fuel Gap Warning",
    sublabel: "Fill up in Gillette, WY — long gap ahead",
    lat: 44.2998,
    lng: -105.5091,
    day: 4,
  },
]

export const ROUTE_WAYPOINTS = [
  [42.4648, -72.5723],   // Sunderland, MA (Start)
  [42.3601, -71.0589],   // Boston, MA
  [42.1015, -72.5898],   // Springfield, MA
  [42.6526, -73.7562],   // Albany, NY
  [43.0481, -76.1474],   // Syracuse, NY
  [42.8864, -78.8784],   // Buffalo, NY
  [42.1292, -80.0851],   // Erie, PA
  [41.4993, -81.6944],   // Cleveland, OH
  [41.2988, -81.5170],   // Macedonia, OH (Hotel Night 1)
  [41.6776, -83.5556],   // Toledo, OH
  [41.8827, -87.6233],   // Chicago, IL ⚠️
  [43.0731, -89.4012],   // Madison, WI
  [43.0553, -89.4981],   // Madison West (Hotel Night 2)
  [43.9695, -91.2396],   // La Crosse, WI
  [44.0121, -92.4802],   // Rochester, MN
  [43.5473, -96.7283],   // Sioux Falls, SD
  [43.8861, -100.7163],  // Murdo, SD (Hotel Night 3)
  [44.0805, -103.2310],  // Rapid City, SD
  [44.2998, -105.5091],  // Gillette, WY ⛽
  [44.7972, -106.9562],  // Sheridan, WY
  [44.6,    -107.4000],  // Bighorn Mountains ⛰️
  [45.7833, -108.5007],  // Billings, MT
  [45.6658, -108.7690],  // Laurel, MT (Hotel Night 4)
  [45.9999, -110.5267],  // Livingston, MT
  [46.5958, -112.0270],  // Helena, MT
  [46.8721, -113.9940],  // Missoula, MT
  [47.6741, -116.7800],  // Coeur d'Alene, ID
  [47.6588, -117.4260],  // Spokane, WA (Destination)
]

export const DAY_SEGMENTS = {
  1: [0, 8],
  2: [8, 13],
  3: [13, 16],
  4: [16, 22],
  5: [22, 27],
}

// ---------------------------------------------------------------------------
// NOTABLE STOPS / ATTRACTIONS
// ---------------------------------------------------------------------------

export const STOPS = [
  { id: 'stop-1-albany',  day: 1, name: 'Albany, NY',          type: 'city',       icon: '🏙️', note: 'Good fuel & food stop ~2.5 hrs in. Empire State Plaza if you have 20 min.', detour: false },
  { id: 'stop-1-buffalo', day: 1, name: 'Buffalo, NY',          type: 'city',       icon: '🦬', note: 'Fuel & stretch. ~30 min from Niagara Falls if you want the detour.',         detour: false },
  { id: 'stop-1-niagara', day: 1, name: 'Niagara Falls, NY',    type: 'attraction', icon: '💦', note: "~30 min off I-90. Worth it if you've never seen it — dogs love it too.",     detour: true  },
  { id: 'stop-2-depart',  day: 2, name: 'Cleveland (depart)',   type: 'city',       icon: '☕', note: 'Aim to leave before 5 AM to clear Chicago by 7 AM. Fuel up before I-90 W.', detour: false },
  { id: 'stop-2-chicago', day: 2, name: 'Chicago, IL',          type: 'city',       icon: '🌃', note: "Don't stop unless you're early. Lou Malnati's opens at 11 if timing works.", detour: false },
  { id: 'stop-2-milw',    day: 2, name: 'Milwaukee, WI',        type: 'city',       icon: '🏙️', note: 'Good fuel stop after Chicago. Lake Michigan views from I-94.',              detour: false },
  { id: 'stop-3-moa',     day: 3, name: 'Mall of America, MN',  type: 'attraction', icon: '🛍️', note: '~10 min off route near Bloomington. Huge rest stop + dog walk area.',       detour: true  },
  { id: 'stop-3-sf',      day: 3, name: 'Sioux Falls, SD',      type: 'city',       icon: '💧', note: 'Fuel up here — last major city before wide-open SD. Falls Park allows dogs.', detour: false },
  { id: 'stop-3-badlands',day: 3, name: 'Badlands National Park',type: 'attraction', icon: '🏜️', note: '~15 min off I-90 at Exit 131. Dogs allowed on paved paths. Stunning views.', detour: true  },
  { id: 'stop-4-rushmore',day: 4, name: 'Mount Rushmore, SD',   type: 'attraction', icon: '🗿', note: '~30 min detour near Rapid City. Dogs allowed in parking areas. Worth it.',   detour: true  },
  { id: 'stop-4-devils',  day: 4, name: "Devil's Tower, WY",    type: 'attraction', icon: '🗼', note: "~25 min north of I-90 at Moorcroft. Dogs allowed on trails. Iconic.",        detour: true  },
  { id: 'stop-4-sheridan',day: 4, name: 'Sheridan, WY',         type: 'city',       icon: '⛽', note: "FUEL HERE. Last reliable stop before the Bighorns. King's Saddlery nearby.", detour: false },
  { id: 'stop-4-bighorn', day: 4, name: 'Bighorn National Forest',type: 'attraction',icon: '⛰️', note: 'I-90 climbs to 8,950 ft. Pull-offs have incredible views. Slow with trailer.', detour: false },
  { id: 'stop-5-missoula',day: 5, name: 'Missoula, MT',         type: 'city',       icon: '🏔️', note: 'Great fuel + coffee stop. Dog-friendly parks near the Clark Fork River.',    detour: false },
  { id: 'stop-5-cda',     day: 5, name: "Coeur d'Alene, ID",    type: 'attraction', icon: '🏞️', note: 'Stunning lake right off the highway. ~45 min from Spokane. Worth a stop.',  detour: false },
]

// ---------------------------------------------------------------------------
// EXPENSE / BUDGET
// ---------------------------------------------------------------------------

export const EXPENSE_CATEGORIES = [
  { id: "fuel",    label: "Fuel",           icon: "⛽", color: "#F59E0B" },
  { id: "lodging", label: "Lodging",        icon: "🏨", color: "#6366F1" },
  { id: "food",    label: "Food & Drink",   icon: "🍔", color: "#10B981" },
  { id: "pet",     label: "Pet Costs",      icon: "🐾", color: "#EC4899" },
  { id: "truck",   label: "Truck/Trailer",  icon: "🚛", color: "#8B5CF6" },
  { id: "tolls",   label: "Tolls",          icon: "🛣️",  color: "#EF4444" },
  { id: "misc",    label: "Miscellaneous",  icon: "📦", color: "#6B7280" },
]

export const DEFAULT_BUDGET = {
  total: 1640,
  byCategory: {
    fuel:    620,   // 2,480 mi ÷ 9 mpg × $3.50/gal
    lodging: 600,   // 4 nights × ~$150/night
    food:    200,   // ~$20/meal × 2 meals × 5 days
    pet:      80,   // pet fees
    truck:     0,   // pre-paid rental
    tolls:    40,   // NY Thruway + Ohio Turnpike + Illinois
    misc:    100,   // buffer
  },
}

export const FUEL_DEFAULTS = {
  mpg: 9,
  gasPricePerGallon: 3.50,
  totalMiles: 2480,
}

// ---------------------------------------------------------------------------
// JOURNAL
// ---------------------------------------------------------------------------

export const DOG_LOG_TYPES = [
  { id: "walk",     label: "Walk",     icon: "🚶" },
  { id: "water",    label: "Water",    icon: "💧" },
  { id: "food",     label: "Food",     icon: "🍖" },
  { id: "bathroom", label: "Bathroom", icon: "🚽" },
  { id: "rest",     label: "Rest",     icon: "😴" },
]

export const MILESTONE_PRESETS = [
  "Left Massachusetts! 🏠",
  "Crossed into New York!",
  "Passed through Buffalo!",
  "Made it through Chicago! 🙌",
  "Crossed into Wisconsin!",
  "Crossed into Minnesota!",
  "Crossed into South Dakota!",
  "Halfway there! 🎉",
  "Crossed into Wyoming!",
  "Crossed into Montana! 🏔️",
  "Crossed into Idaho!",
  "Crossed into Washington!",
  "Arrived in Spokane! 🏠✨",
]
